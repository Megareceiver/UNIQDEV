<?php if (! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: QuanICT
 * Date: 7/6/2017
 * Time: 12:09 PM
 */
class GlTranBank
{

    var $tran_type, $tran_no = NULL;

    var $dim = 0;

    function __construct()
    {
        $this->tran_no = input_get("trans_no");
        $this->tran_type = input_get("type_id");

        $this->dim = get_company_pref('use_dimension');
        $this->model = module_model_load('trans','gl');
    }

    function deposit(){

        $this->tran_type = ST_BANKDEPOSIT;
// get the pay-to bank payment info
        $result = get_bank_trans($this->tran_type, $this->tran_no);

        if (db_num_rows($result) != 1)
            display_db_error("duplicate payment bank transaction found", "");

        $to_trans = db_fetch($result);

        box_start(_("GL Deposit") . " #$this->tran_no");
        $this->view($to_trans);
        box_end();
    }

    function payment()
    {
        $this->tran_type = ST_BANKPAYMENT;
        $result = get_bank_trans(ST_BANKPAYMENT, $this->tran_no);

        if (db_num_rows($result) != 1){
            display_db_error("duplicate payment bank transaction found", "");
        }
        box_start(_("GL Payment") . " #$this->tran_no");
        $from_trans = module_model_load('trans','bank')->get_bank_trans(ST_BANKPAYMENT, $this->tran_no);
        $this->view($from_trans);
        box_end();

    }

    private function view($transaction=NULL){
        global $bank_transfer_types;
        $company_currency = get_company_currency();

        $show_currencies = ($transaction['bank_curr_code'] != $transaction['settle_curr']) ? true :false;

        start_table(TABLESTYLE, "width=80%");

        if ($show_currencies)
        {
            $colspan1 = 1;
            $colspan2 = 7;
        }
        else
        {
            $colspan1 = 3;
            $colspan2 = 5;
        }


        start_row();
        if ( $this->tran_type == ST_BANKDEPOSIT  ){
            label_cells(_("To Bank Account"), $transaction['bank_account_name'], "class='tableheader2'");
        }else if ($this->tran_type ==ST_BANKPAYMENT){
            label_cells(_("From Bank Account"), $transaction['bank_account_name'], "class='tableheader2'");
        }

        if ($show_currencies)
            label_cells(_("Currency"), $transaction['bank_curr_code'], "class='tableheader2'");
        label_cells(_("Amount"), number_format2($transaction['amount'], user_price_dec()), "class='tableheader2'", "align=right");
        label_cells(_("Date"), sql2date($transaction['trans_date']), "class='tableheader2'");
        end_row();
        start_row();

        if ( $this->tran_type == ST_BANKDEPOSIT  ){
            label_cells(_("From"), payment_person_name($transaction['person_type_id'], $transaction['person_id']), "class='tableheader2'", "colspan=$colspan1");
        }else if ($this->tran_type ==ST_BANKPAYMENT){
            label_cells(_("Pay To"), payment_person_name($transaction['person_type_id'], $transaction['person_id']), "class='tableheader2'", "colspan=$colspan1");
        }

        if ($show_currencies)
        {
            label_cells(_("Settle currency"), $transaction['settle_curr'], "class='tableheader2'");
            label_cells(_("Settled amount"),  number_format2($transaction['settled_amount'], user_price_dec()), "class='tableheader2'");
        }
        if ( $this->tran_type == ST_BANKDEPOSIT  ){
            label_cells(_("Deposit Type"), $bank_transfer_types[$transaction['account_type']], "class='tableheader2'");
        } else if ($this->tran_type ==ST_BANKPAYMENT){
            label_cells(_("Payment Type"), $bank_transfer_types[$transaction['account_type']], "class='tableheader2'");
        }

        end_row();
        start_row();
        label_cells(_("Reference"), $transaction['ref'], "class='tableheader2'", "colspan=$colspan2");
        end_row();
        comments_display_row($this->tran_type, $this->tran_no);

        end_table(1);

        is_voided_display($this->tran_type, $this->tran_no, _("This deposit has been voided."));

        $items = get_gl_trans($this->tran_type, $this->tran_no);

        if ( $this->tran_type == ST_BANKDEPOSIT  ){
            box_start(_("Items for this Deposit"));
        } else if ($this->tran_type ==ST_BANKPAYMENT){
            box_start(_("Items for this Payment"));
        }


        if (db_num_rows($items) == 0)
        {
            display_note(_("There are no items for this deposit."));
        }
        else
        {
            if ($show_currencies)
                display_heading2(_("Item Amounts are Shown in:") . " " . $company_currency);

            start_table(TABLESTYLE, "width=80%");
            $dim = get_company_pref('use_dimension');
            if ($dim == 2)
                $th = array(_("Account Code"), _("Account Description"), _("Department")." 1", _("Department")." 2",
                    _("Amount"), _("Memo"));
            else if ($dim == 1)
                $th = array(_("Account Code"), _("Account Description"), _("Department"),
                    _("Amount"), _("Memo"));
            else
                $th = array(_("Account Code"), _("Account Description"),
                    _("Amount"), _("Memo"));
            table_header($th);

            $k = 0; //row colour counter
            $total_amount = 0;

            while ($item = db_fetch($items))
            {

                if ($item["account"] != $transaction["account_code"])
                {
                    alt_table_row_color($k);

                    label_cell($item["account"]);
                    label_cell($item["account_name"]);
                    if ($dim >= 1)
                        label_cell(get_dimension_string($item['dimension_id'], true));
                    if ($dim > 1)
                        label_cell(get_dimension_string($item['dimension2_id'], true));
                    amount_cell(-$item["amount"]);
                    label_cell($item["memo_"]);
                    end_row();
                    $total_amount += $item["amount"];
                }
            }

            label_row(_("Total"), number_format2(-$total_amount, user_price_dec()),"colspan=".(2+$dim)." align=right", "align=right");

            end_table(1);

            display_allocations_from($transaction['person_type_id'], $transaction['person_id'], 2, $this->tran_no, $transaction['settled_amount']);
        }
    }
}