<?php 
	if (session_status() == PHP_SESSION_NONE) { session_start(); }
	require_once('protected/config.php');
	function doLogin($data){
		/* initial condition */
		$username  		= $data['username'];
		$password		= $data['password'];
		$avatar 		= "";
		$nama			= "";						
		$userLevel		= "";	
		$error			=  1;	
		$errorType  	= "";
		$errorMsg		= "danger";				
		$noRegistrasi	= "";	
		$loginStatus	= "no";	
		$resultList 	= array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "username atau password yang anda masukan salah!", "feedData" => array());

		//validation 
		$gate = openGate();
		if($gate && $username != "" && $password !=""){			
							
			$sql  = 
			"	SELECT 
					nama,
					urlGambar,
					userLevel,
					noRegistrasi
				FROM 
					dplega_910_user u
				WHERE 
					u.username = '".$username."' 
				AND u.password = md5('".$password."') 
				AND u.statusActive = '1'
			";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						$avatar		= 	$row['urlGambar'];
						$nama		= 	$row['nama'];
						$userLevel 	= 	$row['userLevel'];
						$noRegistrasi = $row['noRegistrasi'];
					}

					$loginStatus = "yes";
					$error = 0;
				}
			}			
				
			closeGate($gate);
		}
		
		/* result fetch */
		if($error == 0){	
			$_SESSION["login"] 			= $loginStatus;
			$_SESSION["username"] 		= $username;
			$_SESSION["userLevel"] 		= $userLevel;
			$_SESSION["nama"] 			= $nama;
			$_SESSION["urlGambar"] 		= $avatar;
			$_SESSION["noRegistrasi"] 	= $noRegistrasi;

			$feedData = array( 
				"username" 		=> $username, 
				"nama" 			=> $nama, 
				"avatar" 		=> $avatar, 
				"noRegistrasi" 	=> $noRegistrasi, 
				"userLevel" 	=> $userLevel,
				"feedStatus"	=> "success"
			);

			$resultList = array( "feedStatus" => "success", "feedType" => "success", "feedMessage" => "Selamat datang!", "feedId" => $feedData);
		}

		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function logout($data){
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