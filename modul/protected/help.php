<?php 
	require_once('protected/config.php');	
	function getHelp(){		
		/* first initial */
		$resultList = array();
		
		$gate = openGate('fkpai');
		if($gate){			
			$sql = 	"SELECT 
						h.title,
						h.description
					FROM 
						help h
					WHERE
						h.active = '1'";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {						
						unset($fetch);  $fetch  = array();	
						$fetch 		= 	array(
										"title" 	   => $row['title'],										
										"description"  => $row['description']
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
?>