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
$messages = array(); // container for system messages
$before_box = ''; // temporary container for output html data before error box

function get_backtrace($html = false, $skip = 0)
{
    $str = '';
    if ($html)
        $str .= '<table border=0>';
    $trace = debug_backtrace();

    foreach ($trace as $trn => $tr) {
        if ($trn <= $skip)
            continue;
        if ($html)
            $str .= '<tr><td>';
        $str .= $tr['file'] . ':' . $tr['line'] . ': ';
        if ($html)
            $str .= '</td><td>';
        if (isset($tr['type'])) {
            if ($tr['type'] == '::') {
                $str .= $tr['class'] . '::';
            } else
                if ($tr['type'] == '->') {
                    $str .= '(' . $tr['class'] . ' Object)' . '->';
                }
        }
        $str .= $tr['function'] . '(';

        if (is_array($tr['args'])) {
            $args = array();
            foreach ($tr['args'] as $n => $a) {
                if (is_object($tr['args'][$n]))
                    $args[$n] = "(" . get_class($tr['args'][$n]) . " Object)";
                elseif (is_array($tr['args'][$n]))
                    $args[$n] = "(Array[" . count($tr['args'][$n]) . "])";
                else
                    $args[$n] = "'" . $tr['args'][$n] . "'";
            }
            $str .= implode(',', $args);
        }
        $str .= ')</td>';
    }

    if ($html)
        $str .= '</tr></table>';
    return $str;
}

// -----------------------------------------------------------------------------
// Error handler - collects all php/user messages for
// display in message box.
function error_handler($errno, $errstr, $file, $line)
{
    global $messages, $go_debug, $SysPrefs;

    // skip well known warnings we don't care about.
    // Please use restrainedly to not risk loss of important messages
    $excluded_warnings = array(
        'html_entity_decode',
        'htmlspecialchars', // nevermind encodings, special chars are processed anyway
        'should be compatible with that', // ignore cpdf/frontreport wrapper warnings
        'mysql extension is deprecated'
    ) // ignore strict warning in 5.4
;
    foreach ($excluded_warnings as $ref) {
        if (strpos($errstr, $ref) !== false) {
            return true;
        }
    }

    if ($go_debug > 1) {
        $bt = get_backtrace(true, 1);
    }

    // error_reporting==0 when messages are set off with @
    if ($errno & error_reporting()) {
        // suppress duplicated errors
        if (! in_array(array(
            $errno,
            $errstr,
            $file,
            $line,
            @$bt
        ), $messages))
            $messages[] = array(
                $errno,
                $errstr,
                $file,
                $line,
                @$bt
            );
    } else
        if ($errno & ~ E_NOTICE) { // log all not displayed messages
            $user = @$_SESSION["wa_current_user"]->loginname;
            $context = isset($SysPrefs) && ! $SysPrefs->db_ok ? '[before upgrade]' : '';
            error_log(user_company() . ":$user:" . basename($file) . ":$line:$context $errstr");
        }

    return true;
}
// ------------------------------------------------------------------------------
// Formats system messages before insert them into message <div>
// FIX center is unused now
function fmt_errors($center = false)
{
    global $messages, $path_to_root, $go_debug;

    $msg_class = array(
        E_USER_ERROR => 'err_msg',
        E_USER_WARNING => 'warn_msg',
        E_USER_NOTICE => 'note_msg'
    );

    $type = E_USER_NOTICE;

    $title = $color = $text_color = '';
    $content = '';
    // $class = 'no_msg';
    if (count($messages)) {
        foreach ($messages as $cnt => $msg) {
            if ($go_debug && $msg[0] > E_USER_NOTICE)
                $msg[0] = E_ERROR;

            if ($msg[0] > $type)
                continue;

            if ($msg[0] < $type) {
                if ($msg[0] == E_USER_WARNING) {
                    $type = E_USER_WARNING; // user warnings
                    $content = ''; // clean notices when we have errors
                    $title = '<h4><i class="fa fa-exclamation-circle"></i> WARNING!</h4>';
                    $color = 'green';
                    $text_color = 'info';
                    $bgr_color = "";
                } else {
                    $type = E_USER_ERROR; // php or user errors
                    $title = '<h4><i class="fa fa-warning"></i> ERROR !</h4>';
                    $color = 'red';
                    $text_color = 'danger';
                    $bgr_color = "";

                    if ($type == E_USER_WARNING) {
                        $title = '<h4><i class="fa fa-exclamation-circle"></i> WARNING!</h4>';
                        $content = ''; // clean other messages
                        $color = 'green';
                        $text_color = 'info';
                        $bgr_color = "";
                    }
                }
            } else {
                $title = '<h4><i class="fa fa-commenting-o"></i> Notice</h4>';
                $color = 'green';
                $text_color = 'info';
            }

            $str = $msg[1];
            if (! in_array($msg[0], array(
                E_USER_NOTICE,
                E_USER_ERROR,
                E_USER_WARNING
            )) && $msg[2] != null)
                $str .= ' ' . _('in file') . ': ' . $msg[2] . ' ' . _('at line ') . $msg[3];

            if ($go_debug > 1 && $type != E_USER_NOTICE && $type != E_USER_WARNING)
                $str .= '<br>' . $msg[4];

            $content .= ($cnt ? '<hr>' : '') . $str;
        }
        $class = $msg_class[$type];
        $content = "<div class='$class'>$content</div>";
    } else
        if ($path_to_root == '.')
            return '';

    if (strlen($content) > 0) {

        $content_html = '<div class="border-' . $color . ' m-bordered alert fade in alert-' . $text_color . ' alert-dismissible fade show" role="alert" >';
        // $content_html.= '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>';
        $content_html .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>';

        $content_html .= $title;
        $content_html .= $content;
        $content_html .= '</div>';
        $content = $content_html;
    }

    return $content;
}
// -----------------------------------------------------------------------------
// Error box <div> element.
//
function error_box()
{
    global $before_box;
    // Necessary restart instead of get_contents/clean calls due to a bug in php 4.3.2
    $before_box = ob_get_clean(); // save html content before error box
    ob_start('output_html');
}

function error_popup($idbox = '', $class = '', $title = '', $content = '')
{
    // $html = '<div id="'.$idbox.'" class="modal fade" >';
    // $html.= '<div class="modal-dialog">';
    // $html.= '<div class="modal-content">
    // <div class="modal-header">
    // <button type="button" class="close" data-dismiss="modal">&times;</button>
    // <h4 class="modal-title">'.$title.'</h4>
    // </div>
    // <div class="modal-body">
    // <p>Some text in the modal.</p>
    // </div>
    // <div class="modal-footer">
    // <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    // </div>
    // </div>';
    // $html.= '</div></div>';
    $html = '<div id="' . $idbox . '"  class="modal fade ' . $class . '">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">' . $title . '</h4>
      </div>
      <div class="modal-body">' . $content . '</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->';

    echo $html;
}
/*
 * Helper to avoid sparse log notices.
 */
function end_flush()
{
    global $Ajax;

    if (isset($Ajax))
        $Ajax->run();

        // on some (but not all) php versions zlib extension adds 1 additional level of buffering,
        // so flush the last buffer outside the loop to be on safe side
    while (ob_get_level() > 1)
        ob_end_flush();
    @ob_end_flush();

    // if any transaction was aborted unexpectedly rollback changes
    cancel_transaction();
}

function display_db_error($msg, $sql_statement = null, $exit = true)
{
    global $db, $debug, $go_debug, $db_connections;

    $warning = $msg == null;
    $db_error = db_error_no();

    // $str = "<span class='errortext'><b>" . _("DATABASE ERROR :") . "</b> $msg</span><br>";
    if ($warning)
        $str = "<b>" . _("Debug mode database warning:") . "</b><br>";
    else
        $str = "<b>" . _("DATABASE ERROR :") . "</b> $msg<br>";

    if ($db_error != 0) {
        $str .= "error code : " . $db_error . "<br>";
        $str .= "error message : " . db_error_msg($db) . "<br>";
    }

    if ($debug == 1) {
        $cur_prefix = $db_connections[$_SESSION["wa_current_user"]->cur_con]['tbpref'];

        $str .= "sql that failed was : " . str_replace(TB_PREF, $cur_prefix, $sql_statement) . "<br>";
        // if ($go_debug > 1) display_backtrace();
    }

    $str .= "<br><br>";
    if ($go_debug)
        error_log($str);
    else {
        if ($msg)
            trigger_error($str, E_USER_ERROR);
        else // $msg can be null here only in debug mode, otherwise the error is ignored
            trigger_error($str, E_USER_WARNING);
    }
    if ($exit)
        exit();
}

function frindly_db_error($db_error)
{
    global $db_duplicate_error_code;

    if ($db_error == $db_duplicate_error_code) {
        display_error(_("The entered information is a duplicate. Please go back and enter different values."));
        return true;
    }

    return false;
}

function check_db_error($msg, $sql_statement, $exit_if_error = true, $rollback_if_error = true)
{
    global $db, $go_debug;
    $db_error = db_error_no();

    if ($db_error != 0) {

        if ($go_debug || ! frindly_db_error($db_error)) {
            display_db_error($msg, $sql_statement, false);
        }

        if ($rollback_if_error) {
            $rollback_result = db_query("rollback");
        }

        if ($exit_if_error) {
            bug("query error $msg at $sql_statement");
//             end_page();
            exit();
        }
    }
    return $db_error;
}

?>