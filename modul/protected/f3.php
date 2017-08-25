<?php
	require_once('protected/config.php');
	function getData($data, $target){
		/* initial condition */
		$resultList = array();
		$table 		= "";
		$field 		= array();
		$rows		= 0;
		$condition 	= "";
		$orderBy	= "";
		$error		= 0;
		$errorType  = "";
		$errorMsg	= "";
	
		/* refferences */
		// f411 : provinsi
		// f412 : wilayah
		// f413 : kecamatan
		// f414 : kelurahan
		
		switch($target){
			case "f31": $resultList = getAuth($data); break;
			
			default	   : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array()); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function getAuth($data){
		/* initial condition */
		$resultList  = array();
		$table 		 = "";
		$field 		 = array();
		$readData	 = array();
		$readData2	 = array();
		$unReadData	 = array();
		$unReadData2	 = array();
		$collectData = array();
		$rows		 = 0;
		$condition 	 = "";
		$orderBy	 = "";
		$error		 = 0;
		$errorType   = "";
		$errorMsg	 = "";
	
		/* open connection  */
		$gate = openGate();
		if($gate){		
			// connection = true
			$sql = "SELECT * FROM dplega_910_user WHERE username != 'admin'";
					
			$result = mysqli_query($gate, $sql);
			if($result){
				
				if(mysqli_num_rows($result) > 0) {
					while($row = mysqli_fetch_assoc($result)) {
						
						$sqls = 	
							"SELECT u.*, a.appsName FROM dplega_911_useraccess u
								JOIN 
									dplega_912_apps a 
								ON u.idApps = a.idData
								WHERE username = '".$row['username']."'";
									
							$results = mysqli_query($gate, $sqls);
							if($results){
								if(mysqli_num_rows($results) > 0) {
									while($rows = mysqli_fetch_assoc($results)) {
										$unReadData2 = array(
											"id"   		=> $rows['idData'],
											"label" 	=> $rows['appsName'],
											"type" 		=> "parent",
											"status" 	=> $rows['statusAktif']
										);

										array_push($unReadData, $unReadData2);

										unset($unReadData2);
										$unReadData2 = array();
									}
								}
							}

						$collectData = array(
							"id"   			=> $row['idData'],
							"nama" 			=> $row['nama'],
							"noreg" 		=> $row['noRegistrasi'],
							"rule" 			=> "Pengguna level ".$row['userLevel'],
							"access"		=> $unReadData
						);
						
						unset($unReadData);
						$unReadData = array();
					}
					
					

					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data ditemukan!", "feedData" => $collectData);
				}else {
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data tidak ditemukan!", "feedData" => 'gaadaan');
				}
			}			
				
			closeGate($gate);
		}else {
			//error state
			$error		= 1;
			$errorType  = "danger";
			$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke server!";
		}
		
		


		if($error == 1){
			//error state
			$resultList = array( "feedStatus" => "failed", "feedType" => $errorType, "feedMessage" => $errorMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
?>