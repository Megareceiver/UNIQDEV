<?php
	require_once('protected/config.php');
	function createData($data, $target){
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
		// f111 : provinsi
		
		switch($target){
			case "f111": $resultList = createKelembagaanSection($target, $data); break;
			case "f112": $resultList = createKelembagaanSection($target, $data); break;
			default	   : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function createKelembagaanSection($target, $data){
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
		
		/* validation 
		if($target == "f411"){
			if(
				!isset($data['kode']) || $data['kode']==""
				|| !isset($data['nama']) || $data['nama']==""
			){ $error = 1; }
		}elseif($target == "f412" || $target == "f413" || $target == "f414"){
			if(
				!isset($data['kode']) || $data['kode']==""
				|| !isset($data['nama']) || $data['nama']==""
				|| !isset($data['referensi']) || $data['referensi']==""
			){ $error = 1; }
		}*/

		if($error != 1){
			/* open connection */
			$gate = openGate();
			if($gate){
				// connection = true
				$sql = "";
				if($target == "f111"){
					$sql = 
					"	INSERT INTO dplega_000_lembaga_temp
						(
							nama,
							alamat,
							noRt,
							noRw,
							kodeKelurahan,
							kodeKecamatan,
							kodeWilayah,
							kodeProvinsi,
							koordinatGPS,
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
							'".$data['nama']."',
							'".$data['alamat']."',
							'".$data['rt']."',
							'".$data['rw']."',
							'".$data['kelurahan']."',
							'".$data['kecamatan']."',
							'".$data['wilayah']."',
							'".$data['provinsi']."',
							'',
							'".$data['telp']."',
							'".$data['email']."',
							'".$data['medsos']."',
							1,
							1,
							1,
							'".$data['npwp']."',
							'".$data['visi']."',
							'".$data['misi']."',
							'".$data['afiliasi']."',
							'".$data['catatan']."',
							'TESTSESSION'
						)
					";
					
				} elseif ($target == "f112"){
					$idTemp = $data['noreg'];
					if($idTemp != ""){
						$sql = "SELECT * FROM dplega_001_sejarah_temp WHERE noRegistrasi = '".$idTemp."'";
						$result = mysqli_query($gate, $sql);
						if($result){
							if(mysqli_num_rows($result) > 0){
								$sql =
								"
								UPDATE dplega_001_sejarah_temp
								SET
									deskripsi = '".$data['sejarah']."'
								WHERE
									noRegistrasi = '".$idTemp."'
								";
								
							}else{
								$sql = 
								"	INSERT INTO dplega_001_sejarah_temp
									(
										noRegistrasi,
										createdBy
									)
									VALUES
									(
										'".idTemp."',
										'TESTSESSION'
									)
								";
							}
						}
					}else{
						$result = 2;
					}
				}
				
				$result	= mysqli_query($gate, $sql);
				
				if($result){
					if($target == "f111"){
						$idRecent	= mysqli_insert_id($gate);
					}elseif($target == "f112"){
						$idRecent	= $idTemp;
					}
				}
				
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";		
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $idRecent);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

?>