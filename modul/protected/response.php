<?php 
	require_once('protected/config.php');	
	function getResponse(){
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
						l.token as post_by,
						l.nama as name,
						l.avatar as avatar,
						r.token as token_post,
						r.timePost as time_post,
						r.description as description
					FROM 
						fkpai.publicresponse r
					JOIN dpelega.lembaga l on r.postedBy = l.token
					WHERE
						r.active = '1'
					ORDER BY
						r.timePost DESC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						
						/* init for post access */
						unset($fetch);  $fetch  = array();							
						$access		= null;
						
						$fetch 		= 	array(
										"token_post" 	   => $row['token_post'],
										"post_by" 		   => $row['post_by'],
										"name" 	  		   => $row['name'],
										"avatar"  		   => $row['avatar'],
										"time_post" 	   => trim($row['time_post']),										
										"description"	   => $row['description'],										
										"access"  	       => $access
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
	
	function newResponse($response){
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
			" 	INSERT INTO publicresponse
				(					
					description,
					postedBy,
					timePost,
					createdBy,
					createdDate
				)
				VALUES
				(					
					'".$response."',
					'".$token."',
					now(),
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
?>