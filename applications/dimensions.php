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
class dimensions_app extends application
{
	function dimensions_app()
	{
		$dim = get_company_pref('use_dimension');
		$this->application("AC", _($this->help_context = "Accountant's Area"), true, 'fa fa-desktop');

		if ($dim > 0)
		{
            $this->add_module(_("Mobile Accountant"), 'fa fa-upload', "documents/bookkeepers");
            $this->add_extensions();

			$this->add_extensions();
		}
	}
}

?>