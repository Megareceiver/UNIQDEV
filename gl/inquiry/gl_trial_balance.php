<?php
/**********************************************************************
    Copyright (C) FrontAccounting, LLC.
	Released under the terms of the GNU General Public License, GPL,
	as published by the Free Software Foundation, either version 3
	of the License, or (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    See the License here <http://www.gnu.org/licenses/gpl-3.0.html>.
***********************************************************************/
$page_security = 'SA_GLANALYTIC';
$path_to_root="../..";

include_once($path_to_root . "/includes/session.inc");

include_once($path_to_root . "/includes/ui.inc");
include_once($path_to_root . "/includes/date_functions.inc");
include_once($path_to_root . "/admin/db/fiscalyears_db.inc");
include_once($path_to_root . "/includes/data_checks.inc");

include_once($path_to_root . "/gl/includes/gl_db.inc");

$js = "";
// if ($use_date_picker)
// 	$js = get_js_date_picker();

page(_($help_context = "Trial Balance"), false, false, "", $js);
$control_ci = module_control_load('inquiry/trial_balance','gl');
$control_ci->view();
end_page();
// gl_inquiry_controls();
// $_POST['TransFromDate'] = '1-1-2015';
// $_POST['TransToDate'] = '31-12-2015';
// $_POST['Balance'] = 1;



?>

