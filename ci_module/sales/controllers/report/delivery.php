<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class SalesReportDelivery  extends ci {
    function __construct() {
        $ci = get_instance();
        $this->ci = $ci;
        $this->input = $ci->input;
//         $this->report = $ci->module_control_load('report',null,true);
        $this->customer_trans_model = $this->model('customer_trans',true);
		$this->sys_model = $this->model('config',true);
		$this->bank_model = $this->model('bank_account',true);
		$this->contact_model = $this->model('crm',true);
		$this->sale_order_model = $this->model('sale_order',true);
		$this->common_model = $this->model('common',true);

		$this->report = module_control_load('report','report');

    }

    function delivery_print($pdf){
        $from = 		$pdf->inputVal('PARAM_0');
        $to = 			$pdf->inputVal('PARAM_1');

        if (! $from || ! $to)
            return;
        $fno = explode ( "-", $from );
        $tno = explode ( "-", $to );
        $from = min ( $fno [0], $tno [0] );
        $to = max ( $fno [0], $tno [0] );

        $trans_where = array();
        $email = 	$pdf->inputVal('PARAM_2');
        $packing_slip = 		$pdf->inputVal('PARAM_3');
        $comments = 	$pdf->inputVal('PARAM_4');
        $orientation = 	$pdf->inputVal('PARAM_5') ? 'L' : 'P' ;

        $start_date =	$pdf->inputVal('PARAM_6');
        if( is_date($start_date) ){
            $trans_where['tran_date >='] = date('Y-m-d',strtotime($start_date));
        }

        $end_date = 	$pdf->inputVal('PARAM_7');
        if( is_date($end_date) ){
            $trans_where['tran_date <='] = date2sql($end_date);
        }

        $reference = $pdf->inputVal('PARAM_8');
        if( $reference ){
            $trans_where['reference'] = $reference;
        }
         $this->rep = $this->report->front_report(_('DELIVERY NOTE'),$this->delivery_report_table);

        $this->rep->SetHeaderType('TemplateInvoice');
        for ($i = $from; $i <= $to; $i++) {

            $cus_trans = $this->customer_trans_model->search_invoice(ST_CUSTDELIVERY,$i,$trans_where);

            if( empty($cus_trans) || !isset($cus_trans->debtor_no) ) {
                continue;
            }

            $this->pdf_print($cus_trans);
        }

        $this->rep->End();
    }

    var $delivery_report_table = array(
        'space1'=>array(' ',2),
        'stock_id'=>array('Item Code',60),
        'description'=>array('Item Description' ,300),
        'qty'=>array('Quantity' ,450,'right'),
        'units'=>array('Units',515,'right'),
    );

    private function pdf_print($tran=NULL){

        $this->rep->params = array(
            "no-price-col"=>true,
            'comments' => input_val('PARAM_5'),
            'bankaccount'=>0,
            'tran_date'=>sql2date($tran->tran_date),
            'reference'=>$tran->reference,
            'payment_terms'=>$tran->payment_terms_name,
            'delivery_info'=>array(
                'Order To'=>$this->rep->print_company(),
                'Deliver To'=>$tran->DebtorName
            ),
            'contact'=>$this->contact_model->get_branch_contacts($tran->branch_code,'invoice',$tran->debtor_no),
            'aux_info' => array (
                "Customer's Reference"          =>  NULL,
                _ ( "Sales Person" )            =>  $this->contact_model->get_salesman($tran->salesman,'salesman_name'),
                _('Your GST no.')               =>  $tran->tax_id,
                _ ( "Tran No." )         =>  $tran->trans_no,
                _ ( "Due Date" )                =>  $tran->due_date ? sql2date($tran->due_date) : null,
            )
        );


        if( strlen($tran->address) > 0 ){
            $this->rep->params['delivery_info']['Deliver To'] .= "\n".$tran->address;
        }

        $customer_ref = null;
        if( $tran->order_ ){
            $this->rep->params['aux_info']["Customer's Reference"] = $this->sale_order_model->get_field($tran->order_,'customer_ref');
        }
        $tran_type = ST_CUSTDELIVERY;

        $items = $this->customer_trans_model->trans_detail('*',array('debtor_trans_type'=>$tran_type,'debtor_trans_no'=>$tran->trans_no),$tran_type);

        if( empty($items) ){
            return;
        } else {

            $this->rep->NewPage();
            $sign = 1;
            $SubTotal = $discountTotal = $shippingTotal = $taxTotal = 0;
            $taxes = array();
            foreach ($items AS $detail){
                $line_price = $detail->unit_price * $detail->quantity;
                $Net = round2($sign * ((1 - $detail->discount_percent) * $line_price), user_price_dec());
                $discountTotal += $line_price -$Net;
                $SubTotal += $Net;

                if( $detail->tax_type_id ){
                    $tax = tax_calculator($detail->tax_type_id,$line_price,$tran->tax_included);

                    if( is_object($tax) ){
                        if( !isset($taxes[$detail->tax_type_id]) ){
                            $taxes[$detail->tax_type_id] = array('name'=>$tax->name ." (".$tax->code." ".$tax->rate."%)" ,'amount'=>0);
                        }
                        $taxes[$detail->tax_type_id]['amount'] += $tax->value;
                        $taxTotal += $tax->value;
                    }


                }


                $this->rep->TextCol(1, 2,	$detail->stock_id, -2);
                $this->rep->TextCol(2, 3, wordwrap($detail->description,40,"\n",true), 0);
                $this->rep->TextCol(3, 4,	number_format2($sign*$detail->quantity,get_qty_dec($detail->stock_id)), -21);
                $this->rep->TextCol(4, 5,	$detail->units, -2);
//                $this->rep->TextCol(5, 6,	number_total($detail->unit_price), -2);
//                $this->rep->TextCol(6, 7,	number_total($detail->discount_percent*100) . "%" , -2);
//                $this->rep->TextCol(7, 8,	number_total($Net));
                $this->rep->NewLine();
            }

            $this->rep->row = $this->rep->bottomMargin + 8.5 * $this->rep->lineHeight;


//            $this->rep->aligns[3] = 'right';

//            $this->rep->TextCol(1, 3,	$this->rep->company['curr_default'].":".price_in_words( $tran->tax_included ? $SubTotal :$SubTotal+$taxTotal ,ST_CUSTPAYMENT));

//            $this->rep->Font('bold');
//            $this->rep->TextCol(3, 4,	_('TOTAL DELIVERY INCL. GST'));
//            $this->rep->TextCol(4, 5,	number_total( $tran->tax_included ? $SubTotal :$SubTotal+$taxTotal ));
//
//
//            $this->rep->NewLine(-1);
//            $this->rep->TextCol(3, 4,	_('TOTAL DELIVERY EX GST'));
//            $this->rep->TextCol(4, 5,	number_total($tran->tax_included ? $SubTotal-$taxTotal: $SubTotal));
//            $this->rep->Font();
//            if( abs($discountTotal) != 0 ){
//                $this->rep->NewLine(-1);
//                $this->rep->TextCol(3, 4,	_('Discount Given'));
//                $this->rep->TextCol(4, 5,	number_total($discountTotal));
//            }



//            if( count($taxes) > 0 ) foreach ($taxes AS $tax){
//                $this->rep->NewLine(-1);
//                $this->rep->TextCol(3, 4,	$tax['name'].' Amount');
//                $this->rep->TextCol(4, 5,	number_total($tax['amount']) );
//
//            }

//            if( abs($shippingTotal) != 0 ){
//                $this->rep->NewLine(-1);
//                $this->rep->TextCol(3, 4,	_('Shipping'));
//                $this->rep->TextCol(4, 5,	number_total($shippingTotal));
//            }
//            $this->rep->NewLine(-1);
//            $this->rep->TextCol(3, 4,	_(' Sub-total'));
//            $this->rep->TextCol(4, 5,	number_total($SubTotal));


        }




    }

}