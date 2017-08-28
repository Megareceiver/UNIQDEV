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

	function createUserSection($target, $data){
		/* initial condition */
		$resultList = array();
		$table 		= "";
		$field 		= array();
		$rows		= 0;
		$condition 	= "";
		$orderBy	= "";
		$error		= 0;
		$resultType = "";
		$resultMsg	= "";
		$counter	= "";
		$idRecent	= "";
		$idTemp		= "";
		
		/* validation */
		if( 
			   $data['nama'] == ""
			|| $data['alamat'] == ""
			|| $data['rt'] == "" || $data['rw'] == ""
			|| $data['kelurahan'] == "" || $data['kecamatan'] == "" || $data['wilayah'] == "" || $data['provinsi'] == ""
			|| $data['telp'] == ""
			|| $data['email'] == ""
			|| $data['bentukLembaga'] == ""
		){ $error = 1; }

		if($error != 1){
			/* open connection */
			$gate = openGate();
			if($gate){
				// connection = true
				$sql =
				"
					SELECT noRegistrasi
					FROM dplega_000_lembaga_temp
					WHERE 
						kodeProvinsi   = '".$data["kodeProvinsi"]."' and
						kodeWilayah    = '".$data["kodeWilayah"]."' and
						kodeKecamatan  = '".$data["kodeKecamatan"]."'
					ORDER BY noRegistrasi DESC LIMIT 1
				";
				$query	= mysqli_query($gate, $sql);
				if(mysqli_num_rows($query) > 0){
					$result    = mysqli_fetch_assoc($query);
					$idTempB   = substr($result["noRegistrasi"],6,5);
					$idTempC   = $idTempB + 1;
					$str 	   = strlen($idTempC);
					switch ($str) {
						case 1:
							$idTemp = $data["kodeProvinsi"].$data["kodeWilayah"].$data["kodeKecamatan"].'0000'.$idTempC;
							break;
						case 2:
							$idTemp = $data["kodeProvinsi"].$data["kodeWilayah"].$data["kodeKecamatan"].'000'.$idTempC;
							break;
						case 3:
							$idTemp = $data["kodeProvinsi"].$data["kodeWilayah"].$data["kodeKecamatan"].'00'.$idTempC;
							break;
						case 4:
							$idTemp = $data["kodeProvinsi"].$data["kodeWilayah"].$data["kodeKecamatan"].'0'.$idTempC;
							break;
						default:
							$idTemp = $data["kodeProvinsi"].$data["kodeWilayah"].$data["kodeKecamatan"].$idTempC;
							break;
					}
				}else{
					$idTemp = $data['kodeProvinsi'].$data['kodeWilayah'].$data['kodeKecamatan'].'00001';
				}

				$sql = 
				"	INSERT INTO dplega_000_lembaga_temp
					(
						noRegistrasi,
						nama,
						alamat,
						noRt,
						noRw,
						kodeKelurahan,
						kodeKecamatan,
						kodeWilayah,
						kodeProvinsi,
						langitude,
						latitude,
						noTelp,
						email,
						mediaSosial,
						kodeBentukLembaga,
						kodeBidangGerak,
						jumlahPengurus,
						noNpwp,
						visiLembaga,
						misiLembaga,
						organisasiAfiliasi,
						catatanLain,
						createdBy
					)
					VALUES
					(
						'".$idTemp."',
						'".$data['nama']."',
						'".$data['alamat']."',
						'".$data['rt']."',
						'".$data['rw']."',
						'".$data['kodeKelurahan']."',
						'".$data['kodeKecamatan']."',
						'".$data['kodeWilayah']."',
						'".$data['kodeProvinsi']."',
						'".$data['langitude']."',
						'".$data['latitude']."',
						'".$data['telp']."',
						'".$data['email']."',
						'".$data['medsos']."',
						'".$data['bentukLembaga']."',
						'".$data['bidangGerak']."',
						'".$data['jumlahPengurus']."',
						'".$data['npwp']."',
						'".$data['visi']."',
						'".$data['misi']."',
						'".$data['afiliasi']."',
						'".$data['catatan']."',
						'TESTSESSION'
					)
				";

				$result	  = mysqli_query($gate, $sql);
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan. ";

					/*upload image*/
					$validextensions = array("jpeg", "jpg", "png", "gif");
					$temporary = explode(".", $_FILES["imageUrl"]["name"]);
					$file_extension = end($temporary);
					$file_name = "berkas belum diunggah...";					
					if (in_array($file_extension, $validextensions)) {						
						if ($_FILES["imageUrl"]["error"] > 0)
						{
							$upload_message = $_FILES["imageUrl"];
						}
						else
						{		
							$file_name = $idTemp."_logo.".$file_extension;			
							$sourcePath = $_FILES['imageUrl']['tmp_name']; // Storing source path of the file in a variable
							$targetPath = "img/logo/".$file_name; // Target path where file is to be stored
							if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
								$sql = "UPDATE dplega_000_lembaga_temp SET urlGambarLogo = '".$file_name."' WHERE noRegistrasi = '".$idTemp."'";			
								$result = mysqli_query($gate, $sql);									
							}								
						}
					}
					/*upload end*/
					
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan!";
				}
				
				closeGate($gate);
			}else{
				//error state
				$error		= 1;
				$resultType = "danger";
				$resultMsg	= "Terjadi kesalahan, tidak dapat terhubung ke server!";
			}
		}else{
			//error state
			$error		= 1;
			$resultType = "danger";
			$resultMsg	= "Terjadi kesalahan, mandatory tidak boleh kosong!";
		}
		
		if($error == 1){
			//error state
			$resultList = array( "feedStatus" => "failed", "feedType" => $resultType, "feedMessage" => $resultMsg);
		}else{
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $file_name, "feedPId" => $idTemp);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
?>