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
$page_security = 'SA_SALESKIT';
$path_to_root = "../..";
include_once($path_to_root . "/includes/session.inc");

page(_($help_context = "Sales Kits & Alias Codes"));

include_once($path_to_root . "/includes/date_functions.inc");
include_once($path_to_root . "/includes/ui.inc");
include_once($path_to_root . "/includes/data_checks.inc");

include_once($path_to_root . "/includes/manufacturing.inc");

check_db_has_stock_items(_("There are no items defined in the system."));

simple_page_mode(true);

$control_ci = module_control_load('manage/sales_kit','products');

/*
if (isset($_GET['item_code']))
{
	$_POST['item_code'] = $_GET['item_code'];
	$selected_kit =  $_GET['item_code'];
}
*/
//--------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------

function update_component($kit_code, $selected_item)
{
	global $Mode, $Ajax, $selected_kit;

	if (!check_num('quantity', 0))
	{
		display_error(_("The quantity entered must be numeric and greater than zero."));
		set_focus('quantity');
		return;
	}
   	elseif ($_POST['description'] == '')
   	{
      	display_error( _("Item code description cannot be empty."));
		set_focus('description');
		return;
   	}
	elseif ($selected_item == -1)	// adding new item or new alias/kit
	{
		if (get_post('item_code') == '') { // New kit/alias definition
			$kit = get_item_kit($_POST['kit_code']);
    		if (db_num_rows($kit)) {
			  	$input_error = 1;
    	  		display_error( _("This item code is already assigned to stock item or sale kit."));
				set_focus('kit_code');
				return;
			}
			if (get_post('kit_code') == '') {
	    	  	display_error( _("Kit/alias code cannot be empty."));
				set_focus('kit_code');
				return;
			}
		}
   	}

	if (check_item_in_kit($selected_item, $kit_code, $_POST['component'], true)) {
		display_error(_("The selected component contains directly or on any lower level the kit under edition. Recursive kits are not allowed."));
		set_focus('component');
		return;
	}

		/*Now check to see that the component is not already in the kit */
	if (check_item_in_kit($selected_item, $kit_code, $_POST['component'])) {
		display_error(_("The selected component is already in this kit. You can modify it's quantity but it cannot appear more than once in the same kit."));
		set_focus('component');
		return;
	}
	if ($selected_item == -1) { // new item alias/kit
		if ($_POST['item_code']=='') {
			$kit_code = $_POST['kit_code'];
			$selected_kit = $_POST['item_code'] = $kit_code;
			$msg = _("New alias code has been created.");
		}
		 else
			$msg =_("New component has been added to selected kit.");

		add_item_code( $kit_code, get_post('component'), get_post('description'),
			 get_post('category'), input_num('quantity'), 0);
		display_notification($msg);

	} else {
		$props = get_kit_props($_POST['item_code']);
		update_item_code($selected_item, $kit_code, get_post('component'),
			$props['description'], $props['category_id'], input_num('quantity'), 0);
		display_notification(_("Component of selected kit has been updated."));
	}
	$Mode = 'RESET';
	$Ajax->activate('_page_body');
}

//--------------------------------------------------------------------------------------------------

if (get_post('update_name')) {
	update_kit_props(get_post('item_code'), get_post('description'), get_post('category'));
	display_notification(_('Kit common properties has been updated'));
	$Ajax->activate('_page_body');
}

if ($Mode=='ADD_ITEM' || $Mode=='UPDATE_ITEM')
	update_component($_POST['item_code'], $selected_id);

if ($Mode == 'Delete')
{
	// Before removing last component from selected kit check
	// if selected kit is not included in any other kit.
	//
	$other_kits = get_where_used($_POST['item_code']);
	$num_kits = db_num_rows($other_kits);

	$kit = get_item_kit($_POST['item_code']);
	if ((db_num_rows($kit) == 1) && $num_kits) {

		$msg = _("This item cannot be deleted because it is the last item in the kit used by following kits")
			.':<br>';

		while($num_kits--) {
			$kit = db_fetch($other_kits);
			$msg .= "'".$kit[0]."'";
			if ($num_kits) $msg .= ',';
		}
		display_error($msg);
	} else {
		delete_item_code($selected_id);
		display_notification(_("The component item has been deleted from this bom"));
		$Mode = 'RESET';
	}
}

if ($Mode == 'RESET')
{
	$selected_id = -1;
	unset($_POST['quantity']);
	unset($_POST['component']);
}
//--------------------------------------------------------------------------------------------------

$control_ci->mode = $Mode;
$control_ci->selected_id = $selected_id;
$control_ci->index();

end_page();

?>
