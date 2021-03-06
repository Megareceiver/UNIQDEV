<?php

if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class GeneralLedgerReportTransactions
{

    function __construct()
    {
        // $this->ci = $ci;
        // $this->db = $ci->db;
        $this->model = module_model_load('report_trans');
        $this->account_model = module_model_load('account');
        $this->gl_trans_model = module_model_load('trans');
        // bug($this->model);die(' load model');
    }

    var $rep = NULL;
    var $dimension, $dimension2 = 0;

    private function get_val()
    {
        $this->from = input_val('PARAM_0');
        $this->to = input_val('PARAM_1');
        $this->fromacc = input_val('PARAM_2');
        $this->toacc = input_val('PARAM_3');

        $from = '01-01-2016';
        $from = '31-03-2016';
        $this->fromacc = $this->toacc = 1300;

        $dim = get_company_pref('use_dimension');

        $cols = array(
            0,
            65,
            105,
            125,
            175,
            230,
            290,
            345,
            405,
            465,
            525
        );
        switch ($dim) {
            case 1:
                $this->dimension = input_val('PARAM_4');
                $comments = input_val('PARAM_5');
                $orientation = input_val('PARAM_6');
                $destination = input_val('PARAM_7');

                $headers = array(
                    _('Type'),
                    _('Ref'),
                    _('#'),
                    _('Date'),
                    _('Dimension'),
                    "",
                    _('Person/Item'),
                    _('Debit'),
                    _('Credit'),
                    _('Balance')
                );

                $params = array(
                    0 => $comments,
                    1 => array(
                        'text' => _('Period'),
                        'from' => $from,
                        'to' => $to
                    ),
                    2 => array(
                        'text' => _('Accounts'),
                        'from' => $fromacc,
                        'to' => $toacc
                    ),
                    3 => array(
                        'text' => _('Dimension'),
                        'from' => get_dimension_string($dimension),
                        'to' => ''
                    )
                );
                break;
            case 2:
                $this->dimension = input_val('PARAM_4');
                $this->dimension2 = input_val('PARAM_5');
                $comments = input_val('PARAM_6');
                $orientation = input_val('PARAM_7');
                $destination = input_val('PARAM_8');

                $headers = array(
                    _('Type'),
                    _('Ref'),
                    _('#'),
                    _('Date'),
                    _('Dimension') . " 1",
                    _('Dimension') . " 2",
                    _('Person/Item'),
                    _('Debit'),
                    _('Credit'),
                    _('Balance')
                );

                $params = array(
                    0 => $comments,
                    1 => array(
                        'text' => _('Period'),
                        'from' => $from,
                        'to' => $to
                    ),
                    2 => array(
                        'text' => _('Accounts'),
                        'from' => $fromacc,
                        'to' => $toacc
                    ),
                    3 => array(
                        'text' => _('Dimension') . " 1",
                        'from' => get_dimension_string($dimension),
                        'to' => ''
                    ),
                    4 => array(
                        'text' => _('Dimension') . " 2",
                        'from' => get_dimension_string($dimension2),
                        'to' => ''
                    )
                );
                break;
            default:
                $comments = input_val('PARAM_4');
                $orientation = input_val('PARAM_5');
                $destination = input_val('PARAM_6');

                $headers = array(
                    _('Type'),
                    _('Ref'),
                    _('#'),
                    _('Date'),
                    "",
                    "",
                    _('Person/Item'),
                    _('Debit'),
                    _('Credit'),
                    _('Balance')
                );
                $cols = array(
                    0,
                    65,
                    105,
                    125,
                    175,
                    175,
                    175,
                    345,
                    405,
                    465,
                    525
                );

                $params = array(
                    0 => $comments,
                    1 => array(
                        'text' => _('Period'),
                        'from' => $this->from,
                        'to' => $this->to
                    ),
                    2 => array(
                        'text' => _('Accounts'),
                        'from' => $this->fromacc,
                        'to' => $this->toacc
                    )
                );
                break;
        }

        $path_to_root = ROOT;

        if ($destination)
            include_once (ROOT . "/reporting/includes/excel_report.inc");
        else
            include_once (ROOT . "/reporting/includes/pdf_report.inc");

        $orientation = ($orientation ? 'L' : 'P');

        $rep = new FrontReport(_('GL Account Transactions'), "GLAccountTransactions", user_pagesize(), 9, $orientation);

        $aligns = array(
            'left',
            'left',
            'left',
            'left',
            'left',
            'left',
            'left',
            'right',
            'right',
            'right'
        );

        if ($orientation == 'L')
            recalculate_cols($cols);

        $rep->Font();
        $rep->Info($params, $cols, $headers, $aligns);
        $rep->NewPage();
        $this->rep = $rep;
    }

    function index()
    {
        $this->get_val();
        $dec = user_price_dec();

        $accounts = $this->account_model->get_gl_accounts($this->fromacc, $this->toacc);
        if (count($accounts) > 0)
            foreach ($accounts as $account) {
                if (is_account_balancesheet($account->account_code)) {
                    $begin = "";
                } else {
                    $begin = get_fiscalyear_begin_for_date($this->from);
                    if (date1_greater_date2($this->begin, $this->from))
                        $begin = $this->from;
                    $begin = add_days($this->begin, - 1);
                }

                $prev_balance = $this->gl_trans_model->get_gl_balance_from_to($begin, $this->from, $account->account_code, $this->dimension, $this->dimension2);

                $trans = $this->gl_trans_model->get_gl_transactions($this->from, $this->to, - 1, $account->account_code, $this->dimension, $this->dimension2);
                $rows = db_num_rows($trans);
                if ($prev_balance == 0.0 && $rows == 0)
                    continue;
                $rep->Font('bold');
                $rep->TextCol(0, 4, $account['account_code'] . " " . $account['account_name'], - 2);
                $rep->TextCol(4, 6, _('Opening Balance'));
                if ($prev_balance > 0.0)
                    $rep->AmountCol(7, 8, abs($prev_balance), $dec);
                else
                    $rep->AmountCol(8, 9, abs($prev_balance), $dec);
                $rep->Font();
                $total = $prev_balance;
                $rep->NewLine(2);

                if ($rows > 0) {
                    while ($myrow = db_fetch($trans)) {
                        if (in_array($myrow["type"], array(
                            ST_SALESINVOICE,
                            ST_CUSTCREDIT
                        ))) {
                            $customer_tran = $ci->db->where(array(
                                'trans_no' => $myrow["type_no"],
                                'type' => $myrow["type"]
                            ))
                                ->get('debtor_trans')
                                ->row();
                            if (! is_object($customer_tran)) {
                                $update_model->remove_gl($myrow["type"], $myrow["type_no"]);
                                continue;
                            }
                        } elseif (in_array($myrow["type"], array(
                            ST_SUPPINVOICE,
                            ST_SUPPCREDIT
                        ))) {
                            $supplier_tran = $ci->db->where(array(
                                'trans_no' => $myrow["type_no"],
                                'type' => $myrow["type"]
                            ))
                                ->get('supp_trans')
                                ->row();

                            if (! is_object($supplier_tran)) {
                                $update_model->remove_gl($myrow["type"], $myrow["type_no"]);
                                continue;
                            }
                        }

                        if (in_array($myrow["type"], array(
                            ST_CUSTPAYMENT,
                            ST_SUPPAYMENT
                        ))) {
                            $gl_ob_check = $ci_update->opening_gl_fix($myrow["type"], $myrow["type_no"], $myrow['counter']);

                            if ($gl_ob_check != false) {

                                continue;
                            }
                        }

                        $total += $myrow['amount'];

                        $rep->TextCol(0, 1, $systypes_array[$myrow["type"]], - 2);

                        if ($myrow["type"] == ST_SALESINVOICE) { // || $myrow["type"]==ST_CUSTPAYMENT
                                                               // $ci = get_instance();
                                                               // $invoice = $ci->db->select('reference')->where(array('trans_no'=>$myrow["type_no"],'type'=>$myrow["type"]))->get('debtor_trans')->row();
                                                               // $reference = $invoice->reference;
                            $reference = get_reference($myrow["type"], $myrow["type_no"]);
                        } elseif ($myrow["type"] == ST_BANKPAYMENT) {

                            $invoice = $ci->db->select('ref')
                                ->where(array(
                                'trans_no' => $myrow["type_no"],
                                'type' => $myrow["type"]
                            ))
                                ->get('bank_trans')
                                ->row();
                            $reference = $invoice->ref;
                            // } elseif( $myrow["type"]==ST_SUPPAYMENT ){
                            // $ci = get_instance();
                            // $invoice = $ci->db->select('reference')->where(array('trans_no'=>$myrow["type_no"],'type'=>$myrow["type"]))->get('supp_trans')->row();
                            // $reference = $invoice->reference;
                        } elseif ($myrow["type"] == ST_JOURNAL) {
                            $ref = $ci->ref->get($myrow["type"], $myrow["type_no"]);
                            if (! $ref) {
                                $reference = $ci->ref->get_next($myrow["type"]);
                                $ci->ref->save($myrow["type"], $myrow["type_no"], $reference);
                            } else {
                                $reference = $ref;
                            }
                        } else {
                            $reference = get_reference($myrow["type"], $myrow["type_no"]);
                        }

                        $rep->TextCol(1, 2, $reference);
                        $rep->TextCol(2, 3, $myrow['type_no'], - 2);
                        $rep->DateCol(3, 4, $myrow["tran_date"], true);
                        if ($dim >= 1)
                            $rep->TextCol(4, 5, get_dimension_string($myrow['dimension_id']));
                        if ($dim > 1)
                            $rep->TextCol(5, 6, get_dimension_string($myrow['dimension2_id']));
                        $txt = payment_person_name($myrow["person_type_id"], $myrow["person_id"], false);
                        $memo = $myrow['memo_'];
                        if ($myrow["type"] == ST_CUSTPAYMENT) {
                            bug($myrow);
                            die();
                        }
                        if ($txt != "") {
                            if ($memo != "")
                                $txt = $txt . "/" . $memo;
                        } else
                            $txt = $memo;

                        if (trim($txt) == "") {
                            $txt = get_tran_comment($myrow['type'], $myrow['type_no']);
                        }

                        $rep->TextCol(6, 7, $txt, - 2);
                        if ($myrow['amount'] > 0.0)
                            $rep->AmountCol(7, 8, abs($myrow['amount']), $dec);
                        else
                            $rep->AmountCol(8, 9, abs($myrow['amount']), $dec);
                        $rep->TextCol(9, 10, number_format2($total, $dec));
                        $rep->NewLine();
                        if ($rep->row < $rep->bottomMargin + $rep->lineHeight) {
                            $rep->Line($rep->row - 2);
                            $rep->NewPage();
                        }
                    }
                    $rep->NewLine();
                }
                $rep->Font('bold');
                $rep->TextCol(4, 6, _("Ending Balance"));
                if ($total > 0.0)
                    $rep->AmountCol(7, 8, abs($total), $dec);
                else
                    $rep->AmountCol(8, 9, abs($total), $dec);
                $rep->Font();
                $rep->Line($rep->row - $rep->lineHeight + 4);
                $rep->NewLine(2, 1);
            }

        $rep->End();
        bug($accounts);
        die();
        $ci_update = module_control_load('update', 'maintenance');
        // $ci = get_instance();
        $update_model = module_model_load('update', 'maintenance');

        while ($account = db_fetch($accounts)) {}
        die('aaa');
    }
}