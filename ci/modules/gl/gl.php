<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Gl {
    function __construct() {
        $this->ci = get_instance();
    }

    function index(){



        if( $this->ci->uri->segment(2)=='dashboard' ){
            $this->dashboard = $this->ci->module_control_load('dashboard',null,true);
            return $this->dashboard();
        } elseif ($this->ci->uri->segment(2)=='tran_view'){
            return $this->trans_view();
        }

    }

    private function dashboard(){

        $graphs = array();
        $graphs[] = (object)array('widget'=>'glreturn','description'=>'Return','graph_type'=>'Table');
        $graphs[] = (object)array('widget'=>'glreturn','description'=>'Return','graph_type'=>'PieChart');
        $graphs[] = (object)array('widget'=>'bankbalances','description'=>'Bank Balances');
        $graphs[] = (object)array('widget'=>'dailybankbalances','description'=>'Daily Current Account Balance','graph_type'=>'ColumnChart','bank_act'=>0);
//         $graphs[] = (object)array('widget'=>'banktransactions','description'=>'Current Account Transactions','days_past'=>15,'days_future'=>15,'bank_act'=>0);
        $this->dashboard->display($graphs,'Cash/GL Dashboard');
//         $this->dashboard->display('GL');
    }

    private function trans_view(){
        $this->page_security = 'SA_GLTRANSVIEW';
        $this->ci->page_title = 'General Ledger Transaction Details';
        $this->model = $this->ci->module_model('gl',null,true);

        $tran_type = $this->ci->input->get('type_id');
        $tran_no = $this->ci->input->get('trans_no');
        $this->table();

        page("General Ledger Transaction Details", true);
        switch ($tran_type){
            case ST_CUSTPAYMENT:
                $this->customer_payment($tran_no);
                break;
            default:  $this->gl_trans($tran_no,$tran_type); break;
        }

        end_page(true, false, false, $tran_type, $tran_no);
    }

    private function table(){
        /*show a table of the transactions returned by the sql */
        $dim = get_company_pref('use_dimension');
        if ($dim == 2){
            $this->table = array(_("Account Code"), _("Account Name"), _("Department")." 1", _("Dimension")." 2",_("Debit"), _("Credit"), _("Memo"));
        }  else if ($dim == 1) {
            $this->table = array(_("Account Code"), _("Account Name"), _("Department"),
                _("Debit"), _("Credit"), _("Memo"));
        } else {
            $this->table = array(
                'account'=>array('title'=>_("Account Code")),
                'account_name'=>array('title'=>_("Account Name")),
                'debit'=>array('title'=>_("Debit")),
                'credit'=>array('title'=>_("Credit")),
                'memo_'=>array('title'=>_("Memo")),
            );
        }

    }


    function customer_payment($tran_no=0){
        global $systypes_array;
        $this->ci->template->layout = 'popup';
        $data = array('table'=>$this->table);

        $trans = $this->model->get_trans($tran_no,ST_CUSTPAYMENT,null,false);

        $data['tran_name'] = $systypes_array[ST_CUSTPAYMENT]." #$tran_no";

        $row = current($trans);
        $data['reference'] = $row->reference;
        $data['tran_date'] = sql2date($row->tran_date);
        $data['person'] = payment_person_name($row->person_type_id,$row->person_id);

        $data['trans'] = $trans;
        //         bug($this->ci->uri->config->config['base_url']); die('aa');
        //         $data['repost'] = base_uri("maintenance/repost/customer_payments/$tran_no");

        $this->ci->temp_view('tran_view',$data,false);

    }

    function gl_trans($tran_no=0,$type=0){
        global $systypes_array;

        $this->ci->template->layout = 'popup';
        $data = array('table'=>$this->table);

        $trans = $this->model->get_trans($tran_no,$type,null,false);

        $data['tran_name'] = $systypes_array[$type]." #$tran_no";

        $row = current($trans);
        $data['reference'] = $row->reference;
        $data['tran_date'] = sql2date($row->tran_date);
        $data['person'] = payment_person_name($row->person_type_id,$row->person_id);

        $data['trans'] = $trans;

        switch ( $type ){
            case ST_CUSTPAYMENT:
                $data['repost'] = site_url("maintenance/repost/customer_payments/$tran_no");
                break;
            case ST_SALESINVOICE:
                $data['repost'] = site_url("maintenance/repost/sale_invoice/$tran_no");
                break;
            default: $data['repost'] = null; break;

        }

        $this->ci->temp_view('tran_view',$data,false);

    }
}