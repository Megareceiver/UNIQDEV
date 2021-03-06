<?php
class renderer
{


    function __construct()
    {
        $this->theme_uri = NULL;
        $this->theme_img_uri = '//' . $_SERVER['HTTP_HOST'] . '/themes/accountanttoday/images';
        $this->add_resource();
        add_document_ready_js("$.map(ajax_fun, function(value, key) { fn = ajax_fun[key]; if(typeof fn === 'function') { fn(); } });");
        $this->setup_wizard = module_control_load('wizard','setup');
        $this->setup_wizard->run();

    }

  function wa_header()
    {
        page(_($help_context = "Main Menu"), false, true);
    }

    function wa_footer()
    {
        end_page(false, true);
    }

    function menu_header($title, $no_menu, $is_index, $button_reload = false)
    {
        global $help_base_url, $db_connections, $power_by;

        $logo = null;
        echo '<div class="page-wrapper">';
        $home = site_url();
        if (!$no_menu) {
            $waapp = $_SESSION['App'];
//             bug($_SESSION['App']->applications['orders']);die;
            module_view('header',array('apps'=>$_SESSION['App']->applications),true, false,'html' );
            $cur = get_company_Pref('coy_name');
            add_access_extensions();

        }

        echo '<div class="page-wrapper-row full-height">';
        echo '<div class="page-wrapper-middle">';
        echo '<div class="page-container">';
        echo '<div class="page-content-wrapper">';

        if ($title && ! $is_index) {
            $page_description = NULL;

            module_view('page_header',array('title'=>$title,'page_description'=>$page_description),true, false,'html' );
        } else {
            echo '<div class="page-head" style="height: 15px;" ></div>';
        }



        echo '<div class="page-content">';
        echo '<div class="container">';
//         module_view('page_breadcrumb',array(),true, false,'html' );
        echo '<div class="page-content-inner">';

        $this->setup_wizard->status_show();

        if (isset($_GET['application']) && $_GET['application'] == 'H') {
            $dashboard = module_control_load('dashboard','dashboard');
            $dashboard->home();
        }





//         if (user_hints())
//             echo "<span id='hints'></span>";

//         module_view('page_faq',array(),true, false,'html' );

    }

    function display_applications($app){

    }

    function menu_footer($no_menu, $is_index)
    {
        global $Pagehelp, $Ajax, $power_url, $power_by, $power_company;

        echo '</div>'; //page-content-inner
        echo '</div>'; //container



        echo '</div>'; //page-content
//         if( !$is_index ){
//             echo '<div class="container text-center" style="margin-bottom: 5px;" >'.anchor(get_instance()->url_back,'<i class="fa fa-rotate-left"></i>  Back','class="btn green" ').'</div>';
//         }

        echo '</div>'; //page-content-wrapper
        echo '</div>'; //page-container
        echo '</div>'; //page-wrapper-middle
        echo '</div>'; //page-wrapper-row full-height

        if ($no_menu == false) {
            $data = array('phelp'=>NULL,'power_url'=>$power_url,'power_by'=>$power_by,'power_company'=>$power_company);
            if (isset($_SESSION['wa_current_user'])) {
                $phelp = implode(' | ', $Pagehelp);
                $Ajax->addUpdate(true, 'hotkeyshelp', $phelp);
                $data['phelp'] = $phelp;
            }
            module_view('page_footer',$data,true, false,'html' );
        }

        echo "</div>"; //page-wrapper
    }


    var $css = array(
        'components-rounded.css',
        'plugins.css',
        'layout.css',
        'default.css',
        'custom.css'
    );

    private function add_resource(){
        global $assets_path, $js_userlib;
        foreach ($this->css as $css) {
            add_css_source($assets_path.'/'.user_theme() . '/css/' . $css);
        }
        add_css_source($assets_path.'plugins/simple-line-icons/simple-line-icons.min.css');
        add_css_source($assets_path.'plugins/datatables/datatables.min.css');
        add_css_source($assets_path.'plugins/datatables/plugins/bootstrap/datatables.bootstrap.css');

        add_js_source($assets_path.'/'.user_theme() . '/global/scripts/app.js');
        add_js_source($assets_path.'/'.user_theme() . '/scripts/layout.js');


        add_js_source($assets_path.'/plugins/bootstrap-table/bootstrap-table.js');
        add_css_source($assets_path.'/plugins/bootstrap-table/bootstrap-table.css');

//         add_js_source($assets_path.'/plugins/bootstrap-switch/js/bootstrap-switch.min.js');

        add_js_source($assets_path.'/plugins/bootstrap-select/js/bootstrap-select.js');
        add_css_source($assets_path.'plugins/bootstrap-select/css/bootstrap-select.css');
//        add_js_source($assets_path.'/plugins/bootstrap-select2/js/select2.js');
//        add_css_source($assets_path.'plugins/bootstrap-select2/css/select2.css');

        add_js_source($assets_path.'/plugins/bootstrap-modal/js/bootstrap-modalmanager.js');
//         add_js_source($assets_path.'/plugins/bootstrap-modal/js/bootstrap-modal.js');
//         add_css_source($assets_path.'plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css');
//         add_css_source($assets_path.'plugins/bootstrap-modal/css/bootstrap-modal.css');

        add_js_source($assets_path.'js/modal.js');


//         add_js_source($assets_path.'/plugins/toastr/toastr.js');
//         add_css_source($assets_path.'plugins/toastr/toastr.css');

//         add_js_source($assets_path.'/plugins/table-fixed/bootstrap-table-fixed-columns.js');
//         add_css_source($assets_path.'/plugins/table-fixed/bootstrap-table-fixed-columns.css');
//         add_js_source($assets_path.'/'.user_theme() . '/scripts/bootstrap-table-fixed-columns.js');
//         bug($js_userlib);die;
    }
}