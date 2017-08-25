<?php
	if(isset($_GET['session']) && $_GET['session'] != ""){
		
		$json  = array();
		$error = 0;
		
		switch($_GET['group']){
			case "f1": require_once('protected/f1.php');break;
			case "f3": require_once('protected/f3.php'); break;
			case "f4": require_once('protected/f4.php'); break;
			case "fNotification": require_once('protected/fNotification.php'); break;
			default  : $error = 1; break;
		}
		
		if($error != 1){
			switch($_GET['session']){
				// case 'login':  
					// require_once('protected/authentication.php');
					
					// $username = (isset($_REQUEST['username'])	? $_REQUEST['username'] : '');
					// $password = (isset($_REQUEST['pass'])		? $_REQUEST['pass'] 	 : '');
					// $json = doLogin($username, $password);

				// break;
				
				// case 'logout':  
					// require_once('protected/authentication.php');
					// $json = logout();

				// break;
				
				case 'addData':
					$json = createData($_POST, $_GET['target']);
				break;
				
				case 'updateData':
					$json = changeData($_POST, $_GET['target']);
				break;
				
				case 'removeData':
					$json = deleteData($_POST, $_GET['target']);
				break;
				
				case 'requestData':
					$json = getData($_POST, $_GET['target']);
				break;
				
				// case 'deleteEvent':
					// require_once('protected/event.php');
					// $json = statusEvent($_REQUEST['tokenPost'], 'delete');
				// break;
				
				default:
					$json = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array());
				break;

			}
		}else{
			$json = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array());
		}
		
		/* Send as JSON */
		 header("Content-Type: application/json", true);

		/* Return JSON */
		echo json_encode($json);
	}
?>