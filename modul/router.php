<?php
	
	//declare 
	$error = 0; //error init state
	$json = array( "feedStatus" => "forbidden", "feedType" => "danger", "feedMessage" => "Akses ditolak!", "feedData" => array());

	if(isset($_GET['session']) && $_GET['session'] != ""){
		switch($_GET['group']){
			case "f1"			: require_once('protected/f1.php');break;
			case "f3"			: require_once('protected/f3.php'); break;
			case "f4"			: require_once('protected/f4.php'); break;
			case "fNotification": require_once('protected/fNotification.php'); break;
			case "fLogin"		: require_once('protected/authentication.php'); break;
			default  			: $error = 1; break;
		}
		
		if($error != 1){
			switch($_GET['session']){
				case 'login':  
					$json = doLogin($_POST);
					//$json = array( "feedStatus" => "forbidden", "feedType" => "danger", "feedMessage" => "Akses ditolak!", "feedData" => $_POST);
				break;
				
				// case 'logout':  
					// require_once('protected/authentication.php');
					// $json = logout();

				// break;
				
				case 'addData':
					if(authChecker() == 0) $json = createData($_POST, $_GET['target']);
				break;
				
				case 'updateData':
					if(authChecker() == 0) $json = changeData($_POST, $_GET['target']);
				break;
				
				case 'removeData':
					if(authChecker() == 0) $json = deleteData($_POST, $_GET['target']);
				break;
				
				case 'requestData':
					$json = getData($_POST, $_GET['target']);
				break;
				
				default:
					$json = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array());
				break;

			}
		}
	}
	

	/* Send as JSON */
	 header("Content-Type: application/json", true);

	/* Return JSON */
	echo json_encode($json);

	function authChecker(){
		$error = 0; 
		if (session_status() == PHP_SESSION_NONE) {session_start();} // session start

		if(!(isset($_SESSION['login']) && $_SESSION['login'] == "yes")){
			$error = 1;
		}

		return $error;
	}
?>