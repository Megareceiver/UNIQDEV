<?php 
	if (session_status() == PHP_SESSION_NONE) { session_start(); }
	require_once('protected/config.php');
	function login($data){
		/* initial condition */
		$username  		= $data['username'];
		$password		= $data['password'];
		$avatar 		= "";
		$nama			= "";						
		$userLevel		= "";	
		$error			=  1;	
		$errorType  	= "";
		$errorMsg		= "danger";
		$accessTemp		= array();			
		$accessDumb		= array();	
		$nama 			= "";
		$noRegistrasi	= "";
		$userLevel 		= "";
		$avatar 		= "";
		$lingkupArea 	= "";
		$idBatasArea 	= "";
		$statusActive 	= "";
		$access			= array();
		$loginStatus	= "no";	
		$resultList 	= array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "username atau password yang anda masukan salah!", "feedData" => array());

		//validation 
		$gate = openGate();
		if($gate && $username != "" && $password !=""){			
			$sql  = 
			"	SELECT 
					idData,
					noRegistrasi,
					nama,
					userLevel,
					urlGambar,
					lingkupArea,
					idBatasArea,
					statusActive
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
						$sqls = 	
							"SELECT u.*, a.appsName FROM dplega_911_useraccess u
								JOIN 
									dplega_912_apps a 
								ON u.idApps = a.idData
								WHERE username = '".$username."'";
									
						$results = mysqli_query($gate, $sqls);
						if($results){
							if(mysqli_num_rows($results) > 0) {
								$temp = "";
								while($rows = mysqli_fetch_assoc($results)) {
									$accessTemp = array(
										"module" 		=> $rows['module'],
										"lihat" 		=> $rows['lihat'],
										"tambah" 		=> $rows['tambah'],
										"ubah" 			=> $rows['ubah'],
										"hapus" 		=> $rows['hapus'],
										"statusAccess" 	=> $rows['statusAktif']
									);

									array_push($accessDumb, $accessTemp);
									unset($accessTemp); $accessTemp = array();
								}
							}
						}

						$noRegistrasi	= $row['noRegistrasi'];
						$nama 			= $row['nama'];
						$userLevel 		= $row['userLevel'];
						$avatar 		= (($row['urlGambar'] != null) ? $row['urlGambar'] : 'avatar-'.substr($row['idData'], strlen($row['idData']) -1, 1).".jpg");
						$lingkupArea	= $row['lingkupArea'];
						$idBatasArea	= $row['idBatasArea'];
						$statusActive 	= $row['statusActive'];
						$access			= $accessDumb;
						
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
			$_SESSION["noRegistrasi"] 	= $noRegistrasi;
			$_SESSION["username"] 		= $username;
			$_SESSION["nama"] 			= $nama;
			$_SESSION["userLevel"] 		= $userLevel;
			$_SESSION["urlGambar"] 		= $avatar;
			$_SESSION["lingkupArea"] 	= $lingkupArea;
			$_SESSION["idBatasArea"] 	= $idBatasArea;
			$_SESSION["statusActive"] 	= $statusActive;
			$_SESSION["accessList"] 	= $access;

			$feedData = array( 
				"login" 		=> $loginStatus, 
				"noRegistrasi" 	=> $noRegistrasi, 
				"username" 		=> $username, 
				"nama" 			=> $nama, 
				"userLevel" 	=> $userLevel,
				"avatar" 		=> $avatar, 
				"lingkupArea" 	=> $lingkupArea, 
				"idBatasArea" 	=> $idBatasArea, 
				"statusActive" 	=> $statusActive, 
				"accessList" 	=> $access, 
				"feedStatus"	=> "success"
			);

			$resultList = array( "feedStatus" => "success", "feedType" => "success", "feedMessage" => "Selamat datang!", "feedId" => $feedData);
		}

		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function logout(){
		$json = array( "status" => "failed");

		// remove all session variables		
		unset($_SESSION["nama"]);
		unset($_SESSION["username"]);
		unset($_SESSION["userLevel"]);
		unset($_SESSION["urlGambar"]);

		unset($_SESSION["login"]); 
		unset($_SESSION["noRegistrasi"]);
		unset($_SESSION["username"]);
		unset($_SESSION["nama"]);
		unset($_SESSION["userLevel"]);
		unset($_SESSION["urlGambar"]);
		unset($_SESSION["statusActive"]);
		unset($_SESSION["accessList"]);
		
		if(session_destroy()){ $json = array( "feedStatus" => "success"); } 		
		
		return $json;
	}
?>