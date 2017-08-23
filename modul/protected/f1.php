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
			case "f1110": $resultList = getListLembagaan($data); break;
			case "f117": $resultList = getKoleksiSection($data); break;
			
			default	   : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array()); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

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
		
		switch($target){
			case "f111": $resultList = createKelembagaanSection($target, $data); break;
			case "f112": $resultList = createSejarahSection($target, $data); break;
			case "f113": $resultList = createSaranaSection($target, $data); break;
			case "f114": $resultList = createKepengurusanSection($target, $data); break;
			case "f115": $resultList = createKegiatanUsahaSection($target, $data); break;
			case "f116": $resultList = createVisualisasiUsahaSection($target, $data); break;
			case "f118": $resultList = createKoleksiSection($target, $data); break;
			// case "f121": $resultList = getLegalitasSection(); break;
			default	   : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function changeData($data, $target){
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
		
		switch($target){
			case "f111": $resultList = changeKelembagaanSection($target, $data); break;
			case "f112": $resultList = changeSejarahSection($target, $data); break;
			case "f114": $resultList = changeKepengurusanSection($target, $data); break;
			default	   : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function deleteData($data, $target){
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
		// f41 : provinsi
		// f42 : wilayah
		// f43 : kecamatan
		// f44 : kelurahan
		
		switch($target){
			case "f118": $resultList = deleteKoleksiSection($target, $data); break;
			default	  : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function getListLembagaan($data){
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
	
		//validation 
		if(isset($data['keyword']) && $data['keyword'] != ""){	
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = 	
				"
					SELECT * FROM (
						SELECT  
							'ajuan' as `group`,
							`noRegistrasi` as id,
							`noRegistrasi` as noreg,
							`nama` as nama,
							`noTelp` as telp,
							`email` as email,
							CONCAT_WS(' ', `alamat`, 'RT.',`noRt`, '/', 'RW.', `noRw`, `namaKelurahan`, `namaKecamatan`, `namaWilayah`, `namaProvinsi`) as alamat,
							COALESCE(`urlGambarLogo`, 'avatar-default.jpg') as picture
						FROM 
							dplega_000_lembaga_temp l 
						JOIN
							dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
						JOIN
							dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
						JOIN
							dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
						JOIN
							dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
						WHERE l.kodeBentukLembaga = '".$data['keyword']."' AND l.statusAktif = '1' ) as table_1
					UNION
					SELECT * FROM (
						SELECT  
							'perubahan' as `group`,
							`noRegistrasi` as id,
							`noRegistrasi` as noreg,
							`nama` as nama,
							`noTelp` as telp,
							`email` as email,
							CONCAT_WS(' ', `alamat`, 'RT.',`noRt`, '/', 'RW.', `noRw`, `namaKelurahan`, `namaKecamatan`, `namaWilayah`, `namaProvinsi`) as alamat,
							COALESCE(`urlGambarLogo`, 'avatar-default.jpg') as picture
						FROM 
							dplega_000_lembaga_temp l 
						JOIN
							dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
						JOIN
							dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
						JOIN
							dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
						JOIN
							dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
						WHERE l.kodeBentukLembaga = '".$data['keyword']."' AND l.statusAktif = '2' ) as table_2
					UNION
					SELECT * FROM (
						SELECT  
							'valid' as `group`,
							`noRegistrasi` as id,
							`noRegistrasi` as noreg,
							`nama` as nama,
							`noTelp` as telp,
							`email` as email,
							CONCAT_WS(' ', `alamat`, 'RT.',`noRt`, '/', 'RW.', `noRw`, `namaKelurahan`, `namaKecamatan`, `namaWilayah`, `namaProvinsi`) as alamat,
							COALESCE(`urlGambarLogo`, 'avatar-default.jpg') as picture
						FROM 
							dplega_000_lembaga l 
						JOIN
							dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
						JOIN
							dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
						JOIN
							dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
						JOIN
							dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
						WHERE l.kodeBentukLembaga = '".$data['keyword']."' AND l.statusAktif = '1') as table_3
				";
							
				$result = mysqli_query($gate, $sql);
				if($result){
					$package    = array();  
					$packageDumb= array();  
					$record		= array();  
					$fetch 	   = array(); 
					$statLoop  = 0;
					$counter   = mysqli_num_rows($result);
					$fetch 	   = array();
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							unset($fetch); $fetch = array();
							
							if($statLoop == 0) { $next  = $row['group']; }
							
							if($next != $row['group']){
								$packageDumb = array("group" => $row['group'], "collapse" => "n", "list" => $record);
								unset($record); 
								$record = array();
								$next   = $row['group'];
							}
							
							$fetch = array(
										"id"   		=> $row['id'],
										"noreg" 	=> $row['noreg'],
										"nama" 		=> $row['nama'],
										"telp" 		=> $row['telp'],
										"email"		=> $row['email'],
										"alamat"	=> $row['alamat'],
										"picture"	=> $row['picture']
									);
							
							array_push($record, $fetch); 
							$statLoop++;
							if($statLoop == $counter){
								$packageDumb = array("group" => $row['group'], "collapse" => "n", "list" => $record);
								unset($record); 
								$record = array();
							}
						}
						
						$package = array(
							"lembaga" => array($packageDumb),
							"option" => array(
								array("selector" => "download-card", "icon" => "download", "label" => "Unduh (.pdf)"),
								array("selector" => "view-card", "icon" => "search", "label" => "Lihat selengkapnya"),
								array("selector" => "verification-card", "icon" => "check", "label" => "Verifikasi"),
								array("selector" => "edit-card", "icon" => "pencil", "label" => "Ubah profil"),
								array("selector" => "delete-card", "icon" => "trash", "label" => "Hapus lembaga")
							)
						);
						
						$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data ditemukan!", "feedData" => $package);
					}else {
						$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
					}
				}			
					
				closeGate($gate);
			}else {
				//error state
				$error		= 1;
				$errorType  = "danger";
				$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke server!";
			}
		} // return empty of array
		
		if($error == 1){
			//error state
			$resultList = array( "feedStatus" => "failed", "feedType" => $errorType, "feedMessage" => $errorMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function getKoleksiSection($data){
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
	
		/* open connection */ 
		$gate = openGate();
		if($gate){		
			// connection = true
			$sql = 	
			"
			SELECT * FROM dplega_005_koleksi_temp WHERE noRegistrasi = '".$data['keyword']."'
			";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array(); 
				if(mysqli_num_rows($result) > 0) {
					// output data of each row 
					while($row = mysqli_fetch_assoc($result)) {
						$fetch = array(
									"idData"   		=> $row['idData'],
									"noreg" 		=> $row['noRegistrasi'],
									"jenisKoleksi" 	=> $row['jenisKoleksi'],
									"judulKoleksi" 	=> $row['judulKoleksi'],
									"deskripsi"		=> $row['deskripsi']
								);
						
						array_push($record, $fetch); 
						unset($fetch); 
						$fetch = array();
					}
					
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data ditemukan!", "feedData" => $record);
				}else {
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
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
						'".$idTemp."',
						'".$data['nama']."',
						'".$data['alamat']."',
						'".$data['rt']."',
						'".$data['rw']."',
						'".$data['kodeKelurahan']."',
						'".$data['kodeKecamatan']."',
						'".$data['kodeWilayah']."',
						'".$data['kodeProvinsi']."',
						'',
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
				$eresult  = mysqli_error($gate);
				$idRecent = $idTemp;
					if($result){	
						$error	    = 0;
						$resultType = "success";
						$resultMsg  = "Input berhasil disimpan. ";

						/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["imageUrl"]["name"]);
						$file_extension = end($temporary);
						$file_name = $idTemp."_logo.".$file_extension;					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["imageUrl"]["error"] > 0)
							{
								$upload_message = $_FILES["imageUrl"];
							}
							else
							{					
								$sourcePath = $_FILES['imageUrl']['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/logo/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "UPDATE dplega_000_lembaga_temp SET urlGambarLogo = '".$targetPath."' WHERE noRegistrasi = '".$idTemp."'";			
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $idRecent);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function changeKelembagaanSection($target, $data){
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
				$sql = 
				"	UPDATE dplega_000_lembaga_temp
					SET
						nama 				= '".$data['nama']."',
						alamat 				= '".$data['alamat']."',
						noRt 				= '".$data['rt']."',
						noRw 				= '".$data['rw']."',
						kodeKelurahan 		= '".$data['kodeKelurahan']."',
						kodeKecamatan 		= '".$data['kodeKecamatan']."',
						kodeWilayah 		= '".$data['kodeWilayah']."',
						kodeProvinsi 		= '".$data['kodeProvinsi']."',
						koordinatGPS 		= '',
						noTelp 				= '".$data['telp']."',
						email 				= '".$data['email']."',
						mediaSosial 		= '".$data['medsos']."',
						kodeBentukLembaga 	= '".$data['bentukLembaga']."',
						kodeBidangGerak 	= '".$data['bidangGerak']."',
						jumlahPengurus 		= '".$data['jumlahPengurus']."',
						noNpwp 				= '".$data['npwp']."',
						visiLembaga 		= '".$data['visi']."',
						misiLembaga 		= '".$data['misi']."',
						organisasiAfiliasi 	= '".$data['afiliasi']."',
						catatanLain 		= '".$data['catatan']."',
						changedBy 			= 'TESTSESSION'
					
					WHERE
						noRegistrasi = '".$data['noreg']."'
				";
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data['noreg'];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil diubah.";

					/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["imageUrl"]["name"]);
						$file_extension = end($temporary);
						$file_name = $data['noreg']."_logo.".$file_extension;					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["imageUrl"]["error"] > 0)
							{
								$upload_message = $_FILES["imageUrl"];
							}
							else
							{					
								$sourcePath = $_FILES['imageUrl']['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/logo/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "UPDATE dplega_000_lembaga_temp SET urlGambarLogo = '".$targetPath."' WHERE noRegistrasi = '".$data['noreg']."'";			
									$result = mysqli_query($gate, $sql);									
								}								
							}
						}
						/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal diubah!";
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
			$resultMsg	= "Terjadi kesalahan, ID tidak ditemukan atau data tidak lengkap!";
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

	function createSejarahSection($target, $data){
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
					if($data['noreg'] != ''){
						$sql = " INSERT INTO dplega_001_sejarah_temp
							(
								noRegistrasi,
								deskripsi,
								tanggalDidirikan,
								kepemilikan,
								statusTanah,
								statusSertifikasi,
								luasTanah,
								satuanLuasTanah,
								luasBangunan,
								SatuanLuasBangunan,
								kondisiBangunan,
								jumlahBangunan,
								statusSarana,
								statusStrukturKepengurusan,
								urlGambarStrukturKepengurusan,
								bahasaPengantar,
								statusSensus,
								statusBantuanPemerintah,
								kondisiGeografis,
								potensiWilayah,
								jenisWilayah,
								catatanLain,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
								'".$data['sejarah']."',
								'".$data['tanggalBerdiri']."',
								'".$data['kepemilikan']."',
								'".$data['statusTanah']."',
								'".$data['sertifikasi']."',
								'".$data['luasTanah']."',
								'".$data['satuanT']."',
								'".$data['luasBangun']."',
								'".$data['satuanB']."',
								'".$data['kondisiBangunan']."',
								'".$data['jumlahBangunan']."',
								'".$data['saranaPrasarana']."',
								'ada',
								'url',
								'".$data['bahasa']."',
								'".$data['sensus']."',
								'".$data['bantuan']."',
								'".$data['kondisiGeo']."',
								'".$data['potensi']."',
								'".$data['jenisWilayah']."',
								'".$data['catatan']."',
								'TESTSESSION'
							)
						";
					}else{
						$sql = 'error';
					}
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data["noreg"];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";
					/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["imageUrl"]["name"]);
						$file_extension = end($temporary);
						$file_name = $data['noreg']."_logo.".$file_extension;					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["imageUrl"]["error"] > 0)
							{
								$upload_message = $_FILES["imageUrl"];
							}
							else
							{					
								$sourcePath = $_FILES['imageUrl']['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/logo/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "UPDATE dplega_001_sejarah_temp SET urlGambarStrukturKepengurusan = '".$targetPath."' WHERE noRegistrasi = '".$data['noreg']."'";			
									$result = mysqli_query($gate, $sql);									
								}								
							}
						}
					/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ";
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

	function changeSejarahSection($target, $data){
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
				$sql ="
					UPDATE dplega_001_sejarah_temp
					SET
						deskripsi 						= '".$data['sejarah']."',
						tanggalDidirikan 				= '".$data['tanggalBerdiri']."',
						kepemilikan 					= '".$data['kepemilikan']."',
						statusTanah 					= '".$data['kepemilikan']."',
						statusSertifikasi 				= '".$data['sertifikasi']."',
						luasTanah 						= '".$data['luasTanah']."',
						satuanLuasTanah 				= '".$data['satuanT']."',
						luasBangunan 					= '".$data['luasBangun']."',
						SatuanLuasBangunan 				= '".$data['satuanB']."',
						kondisiBangunan 				= '".$data['kondisiBangunan']."',
						jumlahBangunan 					= '".$data['jumlahBangunan']."',
						statusSarana 					= '".$data['saranaPrasarana']."',
						statusStrukturKepengurusan 		= 'ada',
						urlGambarStrukturKepengurusan 	= 'url',
						bahasaPengantar 				= '".$data['bahasa']."',
						statusSensus 					= '".$data['sensus']."',
						statusBantuanPemerintah 		= '".$data['bantuan']."',
						kondisiGeografis				= '".$data['kondisiGeo']."',
						potensiWilayah 					= '".$data['potensi']."',
						jenisWilayah 					= '".$data['jenisWilayah']."',
						catatanLain 					= '".$data['catatan']."',
						changedBy 						= 'TESTSESSION'
					WHERE
						noRegistrasi = '".$data["noreg"]."'
				";
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data['noreg'];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil diubah.";

					/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["imageUrl"]["name"]);
						$file_extension = end($temporary);
						$file_name = $data['noreg']."_logo.".$file_extension;					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["imageUrl"]["error"] > 0)
							{
								$upload_message = $_FILES["imageUrl"];
							}
							else
							{					
								$sourcePath = $_FILES['imageUrl']['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/logo/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "UPDATE dplega_001_sejarah_temp SET urlGambarStrukturKepengurusan = '".$targetPath."' WHERE noRegistrasi = '".$data['noreg']."'";			
									$result = mysqli_query($gate, $sql);									
								}								
							}
						}
						/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal diubah!";
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
			$resultMsg	= "Terjadi kesalahan, ID tidak ditemukan atau data tidak lengkap!";
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

	function createSaranaSection($target, $data){
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
					$no = $data['btn'];
					$ket = $data['keterangan'.$no];
					if($data['noreg'] != ''){
						$sql = " INSERT INTO dplega_008_visualisasisarana_temp
							(
								noRegistrasi,
								deskripsi,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
								'".$ket."',
								'TESTSESSION'
							)
						";
					}else{
						$sql = 'error';
					}
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idTemp   = mysqli_insert_id($gate);
				$idRecent = $data["noreg"];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";
					/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["imageUrl".$no]["name"]);
						$file_extension = end($temporary);
						$file_name = $data['noreg']."_saranaPrasarana".$no.".".$file_extension;					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["imageUrl".$no]["error"] > 0)
							{
								$upload_message = $_FILES["imageUrl".$no];
							}
							else
							{					
								$sourcePath = $_FILES['imageUrl'.$no]['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/saranaPrasarana/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "UPDATE dplega_008_visualisasisarana_temp SET urlGambar = '".$targetPath."' WHERE noRegistrasi = '".$data['noreg']."' AND idData = '".$idTemp."'";			
									$result = mysqli_query($gate, $sql);									
								}								
							}
						}
					/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ".$eresult;
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $idRecent, "feedIdImage"=> $idTemp);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function createKepengurusanSection($target, $data){
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
					if($data['noreg'] != ''){
						$sql = " INSERT INTO dplega_002_kepengurusan_temp
							(
								noRegistrasi,
								penanggungJawab,
								jabatan,
								alamat,
								noRt,
								noRw,
								kodeKelurahan,
								kodeKecamatan,
								kodeWilayah,
								kodeProvinsi,
								noTelp,
								kewarganegaraan,
								tempatLahir,
								tanggalLahir,
								jenisKelamin,
								agama,
								jabatanLain,
								pendidikan,
								kompetensi,
								catatan,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
								'".$data['penanggungJawab']."',
								'',
								'".$data['alamat']."',
								'".$data['rt']."',
								'".$data['rw']."',
								'".$data['kodeKelurahan']."',
								'".$data['kodeKecamatan']."',
								'".$data['kodeWilayah']."',
								'".$data['kodeProvinsi']."',
								'".$data['telp']."',
								'".$data['wargaNegara']."',
								'".$data['tempatLahir']."',
								'".$data['tanggalLahir']."',
								'".$data['jenisKelamin']."',
								'".$data['agama']."',
								'".$data['jabatanLain']."',
								'".$data['pendidikan']."',
								'".$data['kompetensi']."',
								'".$data['catatan']."',
								'TESTSESSION'
							)
						";
					}else{
						$sql = 'error';
					}
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data["noreg"];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ";
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

	function changeKepengurusanSection($target, $data){
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
				$sql ="
					UPDATE dplega_002_kepengurusan_temp
					SET
						penanggungJawab 	= '".$data['penanggungJawab']."',
						jabatan 			= '',
						alamat 				= '".$data['alamat']."',
						noRt 				= '".$data['rt']."',
						noRw 				= '".$data['rw']."',
						kodeKelurahan 		= '".$data['kodeKelurahan']."',
						kodeKecamatan 		= '".$data['kodeKecamatan']."',
						kodeWilayah 		= '".$data['kodeWilayah']."',
						kodeProvinsi 		= '".$data['kodeProvinsi']."',
						noTelp 				= '".$data['telp']."',
						kewarganegaraan 	= '".$data['wargaNegara']."',
						tempatLahir 		= '".$data['tempatLahir']."',
						tanggalLahir 		= '".$data['tanggalLahir']."',
						jenisKelamin 		= '".$data['jenisKelamin']."',
						agama 				= '".$data['agama']."',
						jabatanLain 		= '".$data['jabatanLain']."',
						pendidikan 			= '".$data['pendidikan']."',
						kompetensi 			= '".$data['kompetensi']."',
						catatan 			= '".$data['catatan']."',
						changedBy 			= 'TESTSESSION'
					WHERE
						noRegistrasi = '".$data["noreg"]."'
				";
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data['noreg'];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil diubah.";

					/*upload image*/
						// $validextensions = array("jpeg", "jpg", "png", "gif");
						// $temporary = explode(".", $_FILES["imageUrl"]["name"]);
						// $file_extension = end($temporary);
						// $file_name = $data['noreg']."_logo.".$file_extension;					
						// if (in_array($file_extension, $validextensions)) {						
						// 	if ($_FILES["imageUrl"]["error"] > 0)
						// 	{
						// 		$upload_message = $_FILES["imageUrl"];
						// 	}
						// 	else
						// 	{					
						// 		$sourcePath = $_FILES['imageUrl']['tmp_name']; // Storing source path of the file in a variable
						// 		$targetPath = "img/logo/".$file_name; // Target path where file is to be stored
						// 		if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
						// 			$sql = "UPDATE dplega_001_sejarah_temp SET urlGambarStrukturKepengurusan = '".$targetPath."' WHERE noRegistrasi = '".$data['noreg']."'";			
						// 			$result = mysqli_query($gate, $sql);									
						// 		}								
						// 	}
						// }
					
					/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal diubah!";
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
			$resultMsg	= "Terjadi kesalahan, ID tidak ditemukan atau data tidak lengkap!";
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

	function createKegiatanUsahaSection($target, $data){
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
					if($data['noreg'] != ''){
						$sql = " INSERT INTO dplega_003_usaha_temp
							(
								noRegistrasi,
								namaUsaha,
								jenisUsaha,
								detailUsaha,
								jumlahPekerja,
								catatan,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
								'".$data['namaUsaha']."',
								'".$data['jenisUsaha']."',
								'".$data['detailUsaha']."',
								'".$data['jumlahPekerja']."',
								'".$data['catatan']."',
								'TESTSESSION'
							)
						";
					}else{
						$sql = 'error';
					}
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data["noreg"];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ";
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

	function changeKegiatanUsahaSection($target, $data){
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
				$sql ="
					UPDATE dplega_003_usaha_temp
					SET
						namaUsaha		= '".$data['namaUsaha']."',
						jenisUsaha		= '".$data['jenisUsaha']."',
						detailUsaha		= '".$data['detailUsaha']."',
						jumlahPekerja	= '".$data['jumlahPekerja']."',
						catatan 		= '".$data['catatan']."',
						changedBy 		= 'TESTSESSION'
					WHERE
						noRegistrasi 	= '".$data["noreg"]."'
				";
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data['noreg'];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil diubah.";	
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal diubah!";
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
			$resultMsg	= "Terjadi kesalahan, ID tidak ditemukan atau data tidak lengkap!";
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

	function createVisualisasiUsahaSection($target, $data){
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
					$no = $data['btn'];
					$ket = $data['keterangan'.$no];
					if($data['noreg'] != ''){
						$sql = " INSERT INTO dplega_007_visualisasiusaha_temp
							(
								noRegistrasi,
								deskripsi,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
								'".$ket."',
								'TESTSESSION'
							)
						";
					}else{
						$sql = 'error';
					}
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idTemp   = mysqli_insert_id($gate);
				$idRecent = $data["noreg"];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";
					/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["imageUrl".$no]["name"]);
						$file_extension = end($temporary);
						$file_name = $data['noreg']."_saranaPrasarana".$no.".".$file_extension;					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["imageUrl".$no]["error"] > 0)
							{
								$upload_message = $_FILES["imageUrl".$no];
							}
							else
							{					
								$sourcePath = $_FILES['imageUrl'.$no]['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/saranaPrasarana/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "UPDATE dplega_008_visualisasisarana_temp SET urlGambar = '".$targetPath."' WHERE noRegistrasi = '".$data['noreg']."' AND idData = '".$idTemp."'";			
									$result = mysqli_query($gate, $sql);									
								}								
							}
						}
					/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ".$eresult;
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $idRecent, "feedIdImage"=> $idTemp);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function createKoleksiSection($target, $data){
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
					if($data['noreg'] != ''){
						$sql = " INSERT INTO dplega_005_koleksi_temp
							(
								noRegistrasi,
								jenisKoleksi,
								judulKoleksi,
								deskripsi,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
								'".$data['jenisKoleksi']."',
								'".$data['judulKoleksi']."',
								'".$data['deskripsi']."',
								'TESTSESSION'
							)
						";
					}else{
						$sql = 'error';
					}
				$result	  = mysqli_query($gate, $sql);
				$eresult  = mysqli_error($gate);
				$idRecent = $data["noreg"];
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ".$eresult;
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

	function deleteKoleksiSection($target, $data){
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
		
		/* validation */
		if(	$data['pId']!="")
		{
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = "";

				$sql = "DELETE FROM dplega_005_koleksi_temp WHERE idData ='".$data['pId']."'";
				
					
				$result = mysqli_query($gate, $sql);
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil dihapus.";		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal dihapus! ";
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
			$resultMsg	= "Terjadi kesalahan, ID tidak ditemukan!";
		}
		
		if($error == 1){
			//error state
			$resultList = array( "feedStatus" => "failed", "feedType" => $resultType, "feedMessage" => $resultMsg);
		}else{
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $data['pId']);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function getLegalitasSection(){
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
	
		/* open connection */ 
		$gate = openGate();
		if($gate){		
			// connection = true
			$sql = 	"";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					$statLoop  = 0;
					$counter   = mysqli_num_rows($result);
					$fetch 	   = array();
					$record    = array();
					$package   = array();
					while($row = mysqli_fetch_assoc($result)) {
						
						unset($fetch); $fetch = array();
						
						if($statLoop == 0) { $next  = $row['group']; }
						
						if($next != $row['group']){
							$package[$next] = $record;
							unset($record); 
							$record = array();
							$next   = $row['group'];
						}
						
						$fetch = array(
									"noreg"   		=> $row['code'],
									"group"   	 	=> $row['target'],
									"caption" 	 	=> $row['name'],
									"references" 	=> $row['references'],
									"referencesKey" => $row['referencesKey']
								);
						
						array_push($record, $fetch); 
						$statLoop++;
						if($statLoop == $counter){
							$package[$row['group']] = $record;
							unset($record); 
							$record = array();
						}
					}
					
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data ditemukan!", "feedData" => array($package));
				}else {
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
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