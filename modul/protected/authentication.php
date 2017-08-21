<?php 
	require_once('protected/config.php');
	function doLogin($username, $password){
		/* initial condition */
		$token  	= "";
		$avatar 	= "";
		$name		= "";
		$state  	= "no";
		$access 	= array(array ("target" => "login-menu", "action" => "#", "description" => "Masuk"));
		$accessCount= 7;
		$navaccess	= array(
							array ("index" => "0", "access" => "false", "action" => ""),
							array ("index" => "1", "access" => "false", "action" => ""),
							array ("index" => "2", "access" => "false", "action" => ""),
							array ("index" => "3", "access" => "false", "action" => ""),
							array ("index" => "4", "access" => "false", "action" => ""),
							array ("index" => "5", "access" => "false", "action" => ""),
							array ("index" => "6", "access" => "false", "action" => ""),
						);							
				
		$gate = openGate('dplega');
		if($gate && $username != "" && $password != ""){			
							
			$sql    = 	"SELECT 
							l.token, 
							l.avatar,
							l.nama as name,
							a.token as tokenAccess,
							a.appToken as tokenApps
						FROM 
							lembaga l
						JOIN appaccess a ON l.token = a.lembagaToken
						WHERE 
							l.username = '".$username."' 
						AND l.password = md5('".$password."') 
						AND l.active = '1'
						AND a.appToken  = '1'
						AND a.active = '1'";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						$token 		= 	$row['token'];
						$avatar		= 	$row['avatar'];
						$name		= 	$row['name'];
						$state 		= 	"yes";
						$access		= 	array(
											array ("target" => "profil-menu", "action" => "#", "description" => "Profil"),
											array ("target" => "logout-menu", "action" => "#", "description" => "Keluar")
										);
										
						$tokenAccess = $row['tokenAccess'];						
						
						$sql_detail = "SELECT 
										d.index, 
										d.access, 
										d.action
									FROM 
										appaccess a
									JOIN appaccessdetail d ON a.token = d.appaccessToken
									WHERE 
										a.token  = '".$tokenAccess."'";
						
						$result_detail = mysqli_query($gate, $sql_detail);
						if($result_detail){
							if (mysqli_num_rows($result) > 0) {
								// output data of each row
								unset($navaccess); $navaccess = array();								
								while($row_detail = mysqli_fetch_assoc($result_detail)) {
									array_push($navaccess,$row_detail);
									$accessCount = $accessCount - 1;
								}
								
								if($accessCount > 0){
									while($accessCount > 0){
										array_push($navaccess,array ("index" => "", "access" => "false", "action" => ""));
										$accessCount = $accessCount - 1;
									}
								}
							}
						}
					}
				}
			}			
				
			closeGate($gate);
			if (session_status() == PHP_SESSION_NONE) {
				session_start();
				
				$_SESSION["token"] = $token;
				$_SESSION["username"] = $username;
				$_SESSION["password"] = md5($password);
			}
		}
		
		/* result fetch */
		$json = array( 
			"token" 	=> $token, 
			"name" 		=> $name, 
			"avatar" 	=> $avatar, 
			"access" 	=> $access, 
			"navaccess" => $navaccess, 
			"active" => $state
			);
		
		return $json;
	}
	
	function logout(){
		$json = array( "status" => "failed");
		if (session_status() == PHP_SESSION_NONE) { session_start(); }
		// remove all session variables		
		unset($_SESSION["token"]);
		unset($_SESSION["username"]);
		unset($_SESSION["password"]);
		
		if(session_destroy()){ $json = array( "status" => "success"); } 		
		
		return $json;
	}
?>