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
$page_security = 'SA_SALESAREA';
$path_to_root = "../..";
include($path_to_root . "/includes/session.inc");
include($path_to_root . "/includes/ui.inc");

$control_ci = module_control_load('manager/area','sales');
page(_($help_context = "Sales Areas"));
simple_page_mode(true);

if ($Mode=='ADD_ITEM' || $Mode=='UPDATE_ITEM')
{

	$input_error = 0;

	if (strlen($_POST['description']) == 0)
	{
		$input_error = 1;
		display_error(_("The area description cannot be empty."));
		set_focus('description');
	}

	if ($input_error != 1)
	{
    	if ($selected_id != -1)
    	{
    		update_sales_area($selected_id, $_POST['description']);
			$note = _('Selected sales area has been updated');
    	}
    	else
    	{
    		add_sales_area($_POST['description']);
			$note = _('New sales area has been added');
    	}

		display_notification($note);
		$Mode = 'RESET';
	}
}

if ($Mode == 'Delete')
{

	$cancel_delete = 0;

	// PREVENT DELETES IF DEPENDENT RECORDS IN 'debtors_master'

	if (key_in_foreign_table($selected_id, 'cust_branch', 'area'))
	{
		$cancel_delete = 1;
		display_error(_("Cannot delete this area because customer branches have been created using this area."));
	}
	if ($cancel_delete == 0)
	{
		delete_sales_area($selected_id);

		display_notification(_('Selected sales area has been deleted'));
	} //end if Delete area
	$Mode = 'RESET';
}

if ($Mode == 'RESET')
{
	$selected_id = -1;
	$sav = get_post('show_inactive');
	unset($_POST);
	$_POST['show_inactive'] = $sav;
}

//-------------------------------------------------------------------------------------------------
$control_ci->id = $selected_id;
$control_ci->mode = $Mode;
$control_ci->index();



end_page();
?>
