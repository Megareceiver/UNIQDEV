<?php 
	require_once('protected/config.php');	
	function getEvent(){
		/* initial condition */	
		$token 		= "";
		$username   = "";
						
		$resultList = array();
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
			
			$token 		= (isset($_SESSION["token"]) 	? $_SESSION["token"] 	: '');
			$username 	= (isset($_SESSION["username"]) ? $_SESSION["username"] : '');
		}
			
		$gate = openGate('fkpai');
		if($gate){			
			$sql = 	"SELECT 
						e.token as tokenEvent,
						e.title,
						e.description,
						e.dateStart,
						e.dateEnd,
						e.createdBy
					FROM 
						publicevents e
					WHERE
						e.active = '1'
					ORDER BY
						e.dateStart ASC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						
						/* init for post access */
						unset($fetch);  $fetch  = array();
						unset($access); $access = array();
						
						$tokenEvent		 = $row['tokenEvent'];
						$title 			 = $row['title'];
						$description 	 = $row['description'];
						$dateStart 		 = $row['dateStart'];		
						$dateEnd 		 = $row['dateEnd'];	
						$createdBy 		 = $row['createdBy'];	

						if($token != "" && $username != ""){
							if($createdBy  == $token){
							$access			 = array(
												//array("desc"  =>"Ajukan Pertanyaan"	,"action"=>"#"),
												array("desc"    =>"Hapus"		,"action"=>"event-delete-btn")
											   );
							}
						}
						
						$fetch 		= 	array(
										"token" 	   		=> $tokenEvent,
										"title" 	   		=> $title,
										"description" 		=> $description,
										"dateStart" 		=> $dateStart,
										"dateEnd" 	  		=> $dateEnd,
										"access"			=> $access	
										);	
										
						array_push($resultList, $fetch); 						
					}
				}
			}			
				
			closeGate($gate);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function newEvent($data){
		/* initial condition */
		$status    = "failed";
		$message   = "error";
		$token 		= "";
		$username   = "";
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
			
			$token 		= (isset($_SESSION["token"]) 	? $_SESSION["token"] 	: '');
			$username 	= (isset($_SESSION["username"]) ? $_SESSION["username"] : '');
		}
		
		/* save event */
		$gate = openGate('fkpai');
		if($gate){				
			$sql = 	
			" 	INSERT INTO publicevents
				(
					title,
					description,
					dateStart,
					dateEnd,
					createdBy,
					createdDate
				)
				VALUES
				(
					'".$data['title']."',
					'".$data['description']."',
					'".$data['dateStart']."',
					'".$data['dateEnd']."',
					'".$token."',
					now()
				)
			";
						
			$result = mysqli_query($gate, $sql);
			if($result){	
				$status = "success";
				$message= "";			
			}
		}
		
		closeGate($gate);
		/* result fetch */
		$json = array( 
			"status" 		=> $status, 
			"message" 		=> $message
			);
		
		return $json;
	}	

	function statusEvent($tokenPost, $statusState){
		/* initial condition */	
		$token 		 = "";
		$username    = "";
		$status = "failed";
		$message= "error on update";
		
		switch($statusState){
			case "show":
						$statusState = "1";
						break;
			case "hide":
						$statusState = "2";
						break;
			case "delete":
						$statusState = "0";
						break;
		}
		
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
			
			$token 		= (isset($_SESSION["token"]) 	? $_SESSION["token"] 	: '');
			$username 	= (isset($_SESSION["username"]) ? $_SESSION["username"] : '');
		}
		
		/* save post */
		$gate = openGate('fkpai');
		if($gate){	
			$sql = "UPDATE publicevents SET active = '".$statusState."' WHERE token = '".$tokenPost."';";			
				
			$result = mysqli_multi_query($gate, $sql);
			if($result){	
				$status = "success";
				$message= "";
			}else{
				
				$message = mysqli_error($gate);
			}
		}
		
		closeGate($gate);
		/* result fetch */
		$json = array( 
			"status" 		=> $status, 
			"message" 		=> $message
			);
		
		return $json;
	}
?>