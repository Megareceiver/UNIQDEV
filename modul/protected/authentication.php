<?php 
	require_once('config.php');
	if(isset($_REQUEST['session']) && $_REQUEST['session'] != ""){
		if($_REQUEST['session'] == "doLogin"){
			return doLogin();
		}
	}

	function doLogin(){
		/* initial condition */
		$username   = $_POST['username'];
		$password	= $_POST['password'];
		$avatar 	= "";
		$nama		= "";						
		$userLevel	= "";	
		$error		= 1;					
		$noRegistrasi		= 1;					
				
		$gate = openGate();
		if($gate && $username != "" && $password != ""){			
							
			$sql    = 	"SELECT 
							nama,
							urlGambar,
							userLevel,
							noRegistrasi
						FROM 
							dplega_910_user u
						JOIN 
							dplega_911_useraccess a ON u.username = a.username
						WHERE 
							u.username = '".$username."' 
						AND u.password = md5('".$password."') 
						AND u.statusActive = '1'
						AND a.idApps  = '1'
						AND a.statusAktif = '1'";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						$avatar		= 	$row['urlGambar'];
						$nama		= 	$row['nama'];
						$userLevel 	= 	$row['userLevel'];
						$noRegistrasi 	= 	$row['noRegistrasi'];
					}
				}
			}			
				
			closeGate($gate);
			if (session_status() == PHP_SESSION_NONE) {
				session_start();
				
				$_SESSION["username"] = $username;
				$_SESSION["userLevel"] = $userLevel;
				$_SESSION["nama"] = $nama;
				$_SESSION["urlGambar"] = $avatar;
				$_SESSION["noRegistrasi"] = $noRegistrasi;
			}

			$error = 0;
		}
		
		/* result fetch */
		if($error == 0){
			$json = array( 
				"username" 	=> $username, 
				"nama" 		=> $nama, 
				"avatar" 	=> $avatar, 
				"noRegistrasi" 	=> $noRegistrasi, 
				"userLevel" => $userLevel,
				"feedStatus"=> "success"
			);
		}else{
			$json = array( 
				"feedMessage"=> "username atau password salah, silahkan coba lagi!",
				"feedStatus"=> "failed"
			);
		}
		
		/* Send as JSON */
		 header("Content-Type: application/json", true);

		/* Return JSON */
		echo json_encode($json);
	}
	
	function logout(){
		$json = array( "status" => "failed");
		if (session_status() == PHP_SESSION_NONE) { session_start(); }
		// remove all session variables		
		unset($_SESSION["nama"]);
		unset($_SESSION["username"]);
		unset($_SESSION["userLevel"]);
		unset($_SESSION["urlGambar"]);
		
		if(session_destroy()){ $json = array( "feedStatus" => "success"); } 		
		
		return $json;
	}
?>