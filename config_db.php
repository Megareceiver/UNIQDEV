<?php

/*Connection Information for the database
$def_coy - the default company that is pre-selected on login

'host' - the computer ip address or name where the database is. The default is 'localhost' assuming that the web server is also the sql server.

'dbuser' - the user name under which the company database should be accessed.
  NB it is not secure to use root as the dbuser with no password - a user with appropriate privileges must be set up.

'dbpassword' - the password required for the dbuser to authorise the above database user.

'dbname' - the name of the database as defined in the RDMS being used. Typically RDMS allow many databases to be maintained under the same server.
'tbpref' - prefix on table names, or '' if not used. Always use non-empty prefixes if multiply company use the same database.
*/

include_once("includes/session.inc");
$def_coy = 0;

if( !defined('ROOT') ) {
	define('ROOT', dirname(__FILE__));
}

$tb_pref_counter = 1;
$session =  new SessionManager();
$user = $session->checkSubDirectory();


if( !defined('ATAPI') ) {
    define('ATAPI', 'http://membership.dev/api/index.php?/' );
}

if( function_exists('curl_init') ){
    $curl = curl_init();  
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_URL, ATAPI."db/$user");
    $data = curl_exec($curl);
    curl_close($curl); 
} else {
    $data = file_get_contents(ATAPI."db/$user");
}
if( $data ){
    $db = json_decode($data,true);
}

define('MEGAN', $data );

// if( file_exists("/var/www/atConfig/".$user.'.php') ){
// 	include_once("/var/www/atConfig/".$user.'.php');
// }

if( isset($db) && isset($db[$user]) ){
	$tagetDB = $db[$user];
	$db_connections = array (
			0 =>
			array (
				'name' => 'Demo',
				'host' => $tagetDB['hostname'],
				'dbuser' => $tagetDB['username'],
				'dbpassword' => $tagetDB['password'],
				'dbname' => $tagetDB['database'],
				'tbpref' => $tagetDB['dbprefix'],
			),
	);
	if( isset($tagetDB['license']) ){
		$db_connections[0]['license'] = $tagetDB['license'];
	}
} else {
	$db_connections = array (
			0 =>
			array (
				'name' => 'Demo',
				'host' => 'localhost',
				'dbuser' => 'root',
				'dbpassword' => '',
				'dbname' => 'uniqdev',
				'tbpref' => '',
			),
	);
}
// bug($db_connections);die;
// bug($db_connections);die;

//var_dump($db_connections);die;
?>
