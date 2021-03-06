<?php
/**********************************************************************
// Creator: Alastair Robertson
// date_:   2013-01-30
// Title:   Dashboard theme renderer
// Free software under GNU GPL
***********************************************************************/
	class renderer
	{
		function get_icon($category)
		{
			global  $path_to_root, $show_menu_category_icons;

			if ($show_menu_category_icons)
				$img = $category == '' ? 'right.gif' : $category.'.png';
			else
				$img = 'right.gif';
			return "<img src='$path_to_root/themes/".user_theme()."/images/$img' style='vertical-align:middle;' border='0'>&nbsp;&nbsp;";
		}

		function wa_header()
		{

		  page(_($help_context = "Main Menu"), false, true);
		}

		function wa_footer()
		{
			end_page(false, true);
		}

		function menu_header($title, $no_menu, $is_index)
		{
                    global $path_to_root, $help_base_url, $db_connections;
                    $pageURL = strtolower($_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]);

                    $arr_link = array(
                        'www.a2000projects.com/accountanttoday/',
                        'a2000projects.com/accountanttoday/',
                        'a2000projects.com/accountanttoday/index.php',
                        'www.a2000projects.com/accountanttoday/index.php',

                        'www.a2000projects.com/AccountantToday/',
                        'a2000projects.com/AccountantToday/',
                        'a2000projects.com/AccountantToday/index.php',
                        'www.a2000projects.com/AccountantToday/index.php'

                        );
                    echo "<div class='page-container'>";
                    echo "<div class='sidebar-menu' style='min-height:2000px;'>
                            
                                <header class='logo-env'>

                                    <!-- logo -->
                                <div class='logo'>
                                        <a href='#'>

                                                <img src='$path_to_root/themes/".user_theme()."/images/logo@2x.png' width='120' >
                                        </a>
                                </div>

                                   			<!-- logo collapse icon -->
						
			<div class='sidebar-collapse'>
				<a href='#' class='sidebar-collapse-icon with-animation'><!-- add class with-animation if you want sidebar to have animation during expanding/collapsing transition -->
					<i class='entypo-menu'></i>
				</a>
			</div>
			
									
			
			<!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
			<div class='sidebar-mobile-menu visible-xs'>
				<a href='#' class='with-animation'><!-- add class 'with-animation' to support animation -->
					<i class='entypo-menu'></i>
				</a>
			</div>
                                </header>";
                    //echo ' <script src="//code.jquery.com/jquery-1.10.2.js"></script>';
                    echo '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
                            <script>
                            $(document).ready(function(){

                                $(".ajaxsubmit").addClass("btn btn-success");
                               $(".navibutton").addClass("btn btn-success");
                            });
                            </script>';

			
            if (!$no_menu) {
                //css
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/jquery-ui-1.10.3.custom.min.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/entypo.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/bootstrap.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/neon-core.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/neon-theme.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/neon-forms.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/custom.css'>";
                echo "<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic'>";
                //jquery
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/jquery-1.11.0.min.js'></script>\n";
                if (isset($_GET['application']) || in_array($pageURL, $arr_link))  echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/script.js'></script>\n";
                
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/jquery-jvectormap-1.2.2.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/rickshaw.min.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/responsive-tables.css'>";
                echo "<link rel='stylesheet' href='$path_to_root/themes/".user_theme()."/css/blue.css'>";

                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/main-gsap.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/jquery-ui-1.10.3.minimal.min.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/bootstrap.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/joinable.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/resizeable.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/neon-api.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/jquery-jvectormap-1.2.2.min.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/jquery-jvectormap-europe-merc-en.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/jquery.sparkline.min.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/d3.v3.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/rickshaw.min.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/raphael-min.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/morris.min.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/toastr.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/neon-chat.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/neon-custom.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/neon-demo.js'></script>\n";
                echo "<script type='text/javascript' src='$path_to_root/themes/".user_theme()."/js/responsive-tables.js'></script>\n";
            }
            
            add_access_extensions();


			if (!$no_menu)
			{
				$applications = $_SESSION['App']->applications;
				$local_path_to_root = $path_to_root;
				
				$himg = "<img src='$local_path_to_root/themes/".user_theme()."/images/help.gif' width='14' height='14' border='0' alt='"._('Help')."'>&nbsp;&nbsp;";
				$sel_app = $_SESSION['sel_app'];

                        

                            echo    "<ul id='main-menu' >";

                                $arr = array();
                               $arr[1] = '<i class="entypo-gauge"></i>';
                               $arr[2] = '<i class="entypo-layout"></i>';
                               $arr[3] = '<i class="entypo-newspaper"></i>';
                               $arr[4] = '<i class="entypo-doc-text"></i>';
                               $arr[5] = '<i class="entypo-bag"></i>';
                               $arr[6] = '<i class="entypo-newspaper"></i>';
                               $arr[7] = '<i class="entypo-flow-tree"></i>'; 
                               $i = 1;
				foreach($applications as $app)
				{
                                     
                                    if ($_SESSION["wa_current_user"]->check_application_access($app))
                                    {
                                            if ($app->id == $app->id) $sel_application = $app;
                                            $acc = access_string($app->name);
                                                echo "<li class='root-level has-sub ".($sel_app == $app->id ? 'opened' : '')."'>";
                                                        echo "<a class='".($sel_app == $app->id ? 'selected' : 'menu_tab')
                                                                ."' href='$local_path_to_root/index.php?application=".$app->id
                                                                ."'$acc[1]>".$arr[$i]."<span>" .$acc[0] . "</span></a>";
                                                   $i++;   
                                               
                                    }
                                       ////////////////////////
                                                   //$first = "id='first'";
                                                    echo "<ul class='".($sel_app == $app->id ? 'visible' : '')."'>";
                                                    foreach ($sel_application->modules as $module)
                                                    {
                                                      					
                                                        echo "<li class='has-sub opened'><a href='#'><span>".$module->name."</span></a>";

                                                        echo "<ul class='".($sel_app == $app->id ? 'visible' : '')."'>";
                                                            $apps = array();
                                                            foreach ($module->lappfunctions as $appfunction)
                                                                $apps[] = $appfunction;
                                                            foreach ($module->rappfunctions as $appfunction)
                                                                $apps[] = $appfunction;
                                                            $application = array();
                                                            foreach ($apps as $application)
                                                            {
                                                                $lnk = access_string($application->label);
                                                                if ($_SESSION["wa_current_user"]->can_access_page($application->access))
                                                                {
                                                                    if ($application->label != "")
                                                                    {
                                                                        echo "<li><a href='".$path_to_root."/".$application->link."'>".$lnk[0]."</a></li>";
                                                                    }
                                                                }
                                                            elseif (!$_SESSION["wa_current_user"]->hide_inaccessible_menu_items())
                                                                echo "<li><a href='#' class='disabled'>".$lnk[0]."</a></li>";
                                                            }
                                                        echo '</ul>';
                                                    }
                                                    echo '</ul>'; 
                                                     echo "</li>";
                                }
		
				
               // $first = "id='first'";
                

            }

			
                        
                       //phan chinh 
                   echo "</ul></div>";
                   echo "<div class='main-content'>";
                        echo "<div class='row'>";
                        ///right
                            echo '<div class="col-md-6 col-sm-8 clearfix">';
                                echo '<ul class="list-inline links-list pull-left">';
                                
                                    echo '<li class="profile-info dropdown">';
                                        echo '<a class="dropdown-toggle" data-toggle="dropdown" href="#">';
                                            echo "<img class='img-circle' width='44' alt='avart' src='$path_to_root/themes/".user_theme()."/images/thumb-1@2x.png'>";
                                            echo  $_SESSION["wa_current_user"]->name; 
                                        echo '</a>';
                                    echo '</li>';
                                    echo '<li class="profile-info dropdown">';
                                        echo '<a class="dropdown-toggle" data-toggle="dropdown" href="#">';
                                                echo  $db_connections[$_SESSION["wa_current_user"]->company]["name"]; 
                                                        $indicator = "$path_to_root/themes/".user_theme(). "/images/ajax-loader.gif";  
                                        echo '</a>';
                                    echo '</li>';
                               // echo '</ul>';
                               //  echo '<ul class="user-info pull-left pull-none-xsm">';
                                    echo '<li class="profile-info dropdown">';
                                        echo '<a class="dropdown-toggle" data-toggle="dropdown" href="#">';
                                            echo  $_SERVER['SERVER_NAME'];
                                        echo '</a>';
                                    echo '</li>';
                              //  echo '</ul>';
                              //   echo '<ul class="user-info pull-left pull-none-xsm">';
                                    
                                echo '</ul>';
                            echo "</div>";
                           ///left 
                           echo '<div class="col-md-6 col-sm-4 clearfix hidden-xs">
		
                                    <ul class="list-inline links-list pull-right">';
                           //help
                           if ($help_base_url != null)
                            {
                                echo     '<li>';
                                    echo "$himg<a target = '_blank' onclick=" .'"'."javascript:openWindow(this.href,this.target); return false;".'" '. "href='". help_url()."'>" . _("Help") . "</a>&nbsp;&nbsp;&nbsp;";
                                echo    '</li>';
                            }
                           //preferences
                           echo     '<li>';
                                            echo " <a class='shortcut' href='$path_to_root/admin/display_prefs.php?'>" . _("Preferences") . "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='entypo-window'></i></a>&nbsp;&nbsp;&nbsp;\n";
                               echo    '</li>';
                           //change pass
                                echo     '<li>';
                                           echo "  <a class='shortcut' href='$path_to_root/admin/change_current_user_password.php?selected_id=" . $_SESSION["wa_current_user"]->username . "'>" . _("Change password") . "&nbsp;&nbsp;&nbsp;<i class='entypo-users'></i></a>&nbsp;&nbsp;&nbsp;\n";
                               echo    '</li>';
                            //logout
                                echo     '<li>';
                                           echo "<a class='shortcut' href='$local_path_to_root/access/logout.php?'>" . _("Logout") . "&nbsp;&nbsp;<i class='entypo-logout right'></i></a>&nbsp;&nbsp;&nbsp;";
                               echo    '</li>';
                               
                            echo    '</ul></div>';
                            
                        echo "</div>";  
                        
                        if ($no_menu) {

			}
			elseif ($title && !$is_index)
			{

                            echo "<h2>$title</h2>"

                            .(user_hints() ? "<span id='hints'></span>" : '');
                            echo '<br>';
			}
            
		}



		function menu_footer($no_menu, $is_index)
		{
			global $version, $allow_demo_mode, $app_title, $power_url,
				$power_by, $path_to_root, $Pagehelp, $Ajax;
			include_once($path_to_root . "/includes/date_functions.inc");
            echo "</div>"; // column
			echo "</td></tr><tr><td colspan='2'>";

			
			echo "</td></tr></table></td>\n";
			echo "</table>\n";
			if ($no_menu == false)
			{
				echo "<table align='center' id='footer'>\n";
                                
                                      
                                
				echo "<tr>\n";
                                      
                                        echo "<td align='center' class='footer'>";
                                        if ($no_menu == false)
                                            {
                                                if (isset($_SESSION['wa_current_user'])) {
                                                        $phelp = implode('; ', $Pagehelp);
                                                        echo " " . Today() . " | " . Now() . " - ";
                                                        $Ajax->addUpdate(true, 'hotkeyshelp', $phelp);
                                                        echo " ".$phelp." - ";
                                                }
                                            } 
                                    echo  "<a target='_blank' href='$power_url'><font color='#666666'>$app_title</font></a></td>\n";
				echo "</tr>\n";
				//echo "<tr>\n";
				//echo "<td align='center' class='footer'><a target='_blank' href='$power_url'><font color='#666666'>$power_by</font></a></td>\n";
				//echo "</tr>\n";
				if ($allow_demo_mode==true)
				{
					echo "<tr>\n";
					echo "</tr>\n";
				}
				echo "</table><br><br>\n";
			}
		}

		function display_applications(&$waapp)
		{
            global $path_to_root, $use_popup_windows;
            include_once("$path_to_root/includes/ui.inc");
            include_once($path_to_root . "/reporting/includes/class.graphic.inc");

			$selected_app = $waapp->get_selected_application(); 
      $head_menu = ltrim( $selected_app->name, '&');
			if (!$_SESSION["wa_current_user"]->check_application_access($selected_app))
				return;

			if (method_exists($selected_app, 'render_index'))
			{
				$selected_app->render_index();
				return;
			}
            // first have a look through the directory,
            // and remove old temporary pdfs and pngs
            $dir = company_path(). '/pdf_files';

            if ($d = @opendir($dir)) {
                while (($file = readdir($d)) !== false) {
                    if (!is_file($dir.'/'.$file) || $file == 'index.php') continue;
                // then check to see if this one is too old
                    $ftime = filemtime($dir.'/'.$file);
                 // seems 3 min is enough for any report download, isn't it?
                    if (time()-$ftime > 180){
                        unlink($dir.'/'.$file);
                    }
                }
                closedir($d);
            }
           

            echo '<div class="row">
    <div class="col-sm-3">
    
        <div class="tile-stats tile-red">
            <div class="icon"><i class="entypo-users"></i></div>
            <div class="num" data-start="0" data-end="83" data-postfix="" data-duration="1500" data-delay="0">0</div>
            
            <h3>Registered users</h3>
            <p>so far in our blog, and our website.</p>
        </div>
        
    </div>
    
    <div class="col-sm-3">
    
        <div class="tile-stats tile-green">
            <div class="icon"><i class="entypo-chart-bar"></i></div>
            <div class="num" data-start="0" data-end="135" data-postfix="" data-duration="1500" data-delay="600">0</div>
            
            <h3>Daily Visitors</h3>
            <p>this is the average value.</p>
        </div>
        
    </div>
    
    <div class="col-sm-3">
    
        <div class="tile-stats tile-aqua">
            <div class="icon"><i class="entypo-mail"></i></div>
            <div class="num" data-start="0" data-end="23" data-postfix="" data-duration="1500" data-delay="1200">0</div>
            
            <h3>New Messages</h3>
            <p>messages per day.</p>
        </div>
        
    </div>
    
    <div class="col-sm-3">
    
        <div class="tile-stats tile-blue">
            <div class="icon"><i class="entypo-rss"></i></div>
            <div class="num" data-start="0" data-end="52" data-postfix="" data-duration="1500" data-delay="1800">0</div>
            
            <h3>Subscribers</h3>
            <p>on our site right now.</p>
        </div>
        
    </div>
</div>

<br />';
         
    echo '<div class="row">
    <div class="col-sm-8">
    
        <div class="panel panel-primary" id="charts_env">
        
            <div class="panel-heading">
                <div class="panel-title">Site Stats</div>
                
                <div class="panel-options">
                    <ul class="nav nav-tabs">
                        <li class=""><a href="#area-chart" data-toggle="tab">Area Chart</a></li>
                        <li class="active"><a href="#line-chart" data-toggle="tab">Line Charts</a></li>
                        <li class=""><a href="#pie-chart" data-toggle="tab">Pie Chart</a></li>
                    </ul>
                </div>
            </div>
    
            <div class="panel-body">
            
                <div class="tab-content">
                
                    <div class="tab-pane" id="area-chart">                          
                        <div id="area-chart-demo" class="morrischart" style="height: 300px"></div>
                    </div>
                    
                    <div class="tab-pane active" id="line-chart">
                        <div id="line-chart-demo" class="morrischart" style="height: 300px"></div>
                    </div>
                    
                    <div class="tab-pane" id="pie-chart">
                        <div id="donut-chart-demo" class="morrischart" style="height: 300px;"></div>
                    </div>
                    
                </div>
                
            </div>

            <table class="table table-bordered table-responsive">

                <thead>
                    <tr>
                        <th width="50%" class="col-padding-1">
                            <div class="pull-left">
                                <div class="h4 no-margin">Pageviews</div>
                                <small>54,127</small>
                            </div>
                            <span class="pull-right pageviews">4,3,5,4,5,6,5</span>
                            
                        </th>
                        <th width="50%" class="col-padding-1">
                            <div class="pull-left">
                                <div class="h4 no-margin">Unique Visitors</div>
                                <small>25,127</small>
                            </div>
                            <span class="pull-right uniquevisitors">2,3,5,4,3,4,5</span>
                        </th>
                    </tr>
                </thead>
                
            </table>
            
        </div>  

    </div>

    <div class="col-sm-4">

        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">
                    <h4>
                        Real Time Stats
                        <br />
                        <small>current server uptime</small>
                    </h4>
                </div>
                
                <div class="panel-options">
                    <a href="#sample-modal" data-toggle="modal" data-target="#sample-modal-dialog-1" class="bg"><i class="entypo-cog"></i></a>
                    <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
                    <a href="#" data-rel="reload"><i class="entypo-arrows-ccw"></i></a>
                    <a href="#" data-rel="close"><i class="entypo-cancel"></i></a>
                </div>
            </div>
        
            <div class="panel-body no-padding">
                <div id="rickshaw-chart-demo">
                    <div id="rickshaw-legend"></div>
                </div>
            </div>
        </div>

    </div>
</div>';

     echo '<div class="row">
    
    <div class="col-sm-4">
        
        <div class="panel panel-primary">
            <table class="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th class="padding-bottom-none text-center">
                            <br />
                            <br />
                            <span class="monthly-sales"></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="panel-heading">
                            <h4>Monthly Sales</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
    
    <div class="col-sm-8">
        
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="panel-title">Latest Updated Profiles</div>
                
                <div class="panel-options">
                    <a href="#sample-modal" data-toggle="modal" data-target="#sample-modal-dialog-1" class="bg"><i class="entypo-cog"></i></a>
                    <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
                    <a href="#" data-rel="reload"><i class="entypo-arrows-ccw"></i></a>
                    <a href="#" data-rel="close"><i class="entypo-cancel"></i></a>
                </div>
            </div>
                
            <table class="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Art Ramadani</td>
                        <td>CEO</td>
                        <td class="text-center"><span class="inlinebar">4,3,5,4,5,6</span></td>
                    </tr>
                    
                    <tr>
                        <td>2</td>
                        <td>Filan Fisteku</td>
                        <td>Member</td>
                        <td class="text-center"><span class="inlinebar-2">1,3,4,5,3,5</span></td>
                    </tr>
                    
                    <tr>
                        <td>3</td>
                        <td>Arlind Nushi</td>
                        <td>Co-founder</td>
                        <td class="text-center"><span class="inlinebar-3">5,3,2,5,4,5</span></td>
                    </tr>

                </tbody>
            </table>
        </div>
        
    </div>
    
</div>

<br />';   
     
     echo '<div class="row">
    
    <div class="col-sm-3">
        <div class="tile-block" id="todo_tasks">
            
            <div class="tile-header">
                <i class="entypo-list"></i>
                
                <a href="#">
                    Tasks
                    <span>To do list, tick one.</span>
                </a>
            </div>
            
            <div class="tile-content">
                
                <input type="text" class="form-control" placeholder="Add Task" />
                
                
                <ul class="todo-list">
                    <li>
                        <div class="checkbox checkbox-replace color-white">
                            <input type="checkbox" />
                            <label>Website Design</label>
                        </div>
                    </li>
                    
                    <li>
                        <div class="checkbox checkbox-replace color-white">
                            <input type="checkbox" id="task-2" checked />
                            <label>Slicing</label>
                        </div>
                    </li>
                    
                    <li>
                        <div class="checkbox checkbox-replace color-white">
                            <input type="checkbox" id="task-3" />
                            <label>WordPress Integration</label>
                        </div>
                    </li>
                    
                    <li>
                        <div class="checkbox checkbox-replace color-white">
                            <input type="checkbox" id="task-4" />
                            <label>SEO Optimize</label>
                        </div>
                    </li>
                    
                    <li>
                        <div class="checkbox checkbox-replace color-white">
                            <input type="checkbox" id="task-5" checked="" />
                            <label>Minify &amp; Compress</label>
                        </div>
                    </li>
                </ul>
                
            </div>
            
            <div class="tile-footer">
                <a href="#">View all tasks</a>
            </div>
            
        </div>
    </div>

    <div class="col-sm-9">
        
        <script type="text/javascript">
            jQuery(document).ready(function($)
            {
                var map = $("#map-2");
                
                map.vectorMap({
                    map: "europe_merc_en",
                    zoomMin: "3",
                    backgroundColor: "#383f47",
                    focusOn: { x: 0.5, y: 0.8, scale: 3 }
                });
            });
        </script>
        
        <div class="tile-group">
            
            <div class="tile-left">
                <div class="tile-entry">
                    <h3>Map</h3>
                    <span>top visitors location</span>
                </div>
                
                <div class="tile-entry">
                    <img src="assets/images/sample-al.png" alt="" class="pull-right op" />
                    
                    <h4>Albania</h4>
                    <span>25%</span>
                </div>
                
                <div class="tile-entry">
                    <img src="assets/images/sample-it.png" alt="" class="pull-right op" />
                    
                    <h4>Italy</h4>
                    <span>18%</span>
                </div>
                
                <div class="tile-entry">
                    <img src="assets/images/sample-au.png" alt="" class="pull-right op" />
                    
                    <h4>Austria</h4>
                    <span>15%</span>
                </div>
            </div>
            
            <div class="tile-right">
                
                <div id="map-2" class="map"></div>
                
            </div>
            
        </div>
        
    </div>

</div>'; 

            $dashboard_app = $waapp->get_application("Dashboard");
            echo '<div id="console" ></div>';

            $userid = $_SESSION["wa_current_user"]->user;
            $sql = "SELECT DISTINCT column_id FROM ".TB_PREF."dashboard_widgets"
                    ." WHERE user_id =".db_escape($userid)
                    ." AND app=".db_escape($selected_app->id)
                    ." ORDER BY column_id";
            $columns=db_query($sql);

            while($column=db_fetch($columns))
              {
                  echo '<div class="column" id="column'.$column['column_id'].'" >';
                  $sql = "SELECT * FROM ".TB_PREF."dashboard_widgets"
                        ." WHERE column_id=".db_escape($column['column_id'])
                        ." AND user_id = ".db_escape($userid)
                        ." AND app=".db_escape($selected_app->id)
                        ." ORDER BY sort_no";
                  $items=db_query($sql);
                  while($item=db_fetch($items))
                  {
                      $widgetData = $dashboard_app->get_widget($item['widget']);
                      echo '
                      <div class="dragbox" id="item'.$item['id'].'">
                          <h2>'.$item['description'].'</h2>
                              <div id="widget_div_'.$item['id'].'" class="dragbox-content" ';
                      if($item['collapsed']==1)
                          echo 'style="display:none;" ';
                      echo '>';
                      if ($widgetData != null) {
                          if ($_SESSION["wa_current_user"]->can_access_page($widgetData->access))
                          {
                              include_once ($path_to_root . $widgetData->path);
                              $className = $widgetData->name;
                              $widgetObject = new $className($item['param']);
                              $widgetObject->render($item['id'],$item['description']);
                          } else {
                              echo "<center><br><br><br><b>";
                              echo _("The security settings on your account do not permit you to access this function");
                              echo "</b>";
                              echo "<br><br><br><br></center>";
                          }
                      }
                      echo '</div></div>';
                  }
                  echo '</div>';
                  echo '</div>';
              }
		}
                
	}

?>