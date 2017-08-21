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
			case "f40": $resultList = getLingkupAreaSection(); break;
			case "f401": $resultList = getLingkupAreaListSection(); break;
			// case "f411": $resultList = getProvinsi($data); break;
			// case "f412": $resultList = getProvinsi($data); break;
			// case "f413": $resultList = getProvinsi($data); break;
			// case "f414": $resultList = getProvinsi($data); break;

			case "f421": $resultList = getGrupVerifikasi(); break;
			case "f422": $resultList = getVerifikasi(); break;
			
			case "f431": $resultList = getKelembagaanSection($target); break;
			case "f432": $resultList = getKelembagaanSection($target); break;
			case "f433": $resultList = getKelembagaanSection($target); break;
		
			default	   : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array()); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function getLingkupAreaSection(){
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
			$sql = 	"SELECT * from (select 'provinsi' as `group`, 'f411' as `target`, kodeProvinsi as code, namaProvinsi as name, '' as `referencesKey`, '' as `references` FROM `dplega_100_provinsi` order by name) as table_1
					 UNION
					 SELECT * from (SELECT 'wilayah' as `group`, 'f412' as `target`, a.kodeWilayah as code, a.namaWilayah as name, a.kodeProvinsi as `referencesKey`, namaProvinsi as `references` FROM `dplega_101_wilayah` a LEFT JOIN  `dplega_100_provinsi` b ON a.kodeProvinsi = b.kodeProvinsi order by name) as table_2
					 UNION
					 SELECT * from (SELECT 'kecamatan' as `group`, 'f413' as `target`, a.kodeKecamatan as code, a.namaKecamatan as name, a.kodeWilayah as `referencesKey`, namaWilayah as `references` FROM `dplega_102_kecamatan` a LEFT JOIN  `dplega_101_wilayah` b ON a.kodeWilayah = b.kodeWilayah order by name) as table_3
					 UNION
					 SELECT * from (SELECT 'kelurahan' as `group`, 'f414' as `target`, a.kodeKelurahan as code, a.namaKelurahan as name, a.kodeKecamatan as `referencesKey`, namaKecamatan as `references` FROM `dplega_103_kelurahan` a LEFT JOIN  `dplega_102_kecamatan` b ON a.kodeKecamatan = b.kodeKecamatan order by name) as table_4";
						
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
	
	function getLingkupAreaListSection(){
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
			$sql = 	"	SELECT 
							kl.kodeKelurahan, 
							namaKelurahan, 
							kc.kodeKecamatan,
							namaKecamatan, 
							wl.kodeWilayah,
							namaWilayah, 
							pr.kodeProvinsi,
							namaProvinsi
						FROM
							dplega_100_provinsi pr
						JOIN
							dplega_101_wilayah wl
							ON pr.kodeProvinsi = wl.kodeProvinsi
						JOIN
							dplega_102_kecamatan kc
							ON wl.kodeWilayah = kc.kodeWilayah
						JOIN
							dplega_103_kelurahan kl
							ON kc.kodeKecamatan = kl.kodeKecamatan
						ORDER BY namaKelurahan ASC
					";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					$fetch 	  		= array();
					$fetchDetail	= array();
					$record    		= array();
					$recordDetail   = array();
					while($row = mysqli_fetch_assoc($result)) {
						
						unset($fetch); $fetch = array();
						
						$fetch = $row['namaKelurahan'].", ".$row['namaKecamatan']." ".$row['namaWilayah']." | ".$row['namaProvinsi'];
						
						$fetchDetail = array(
									"kodeKelurahan" => $row['kodeKelurahan'],
									"namaKelurahan" => $row['namaKelurahan'],
									"kodeKecamatan" => $row['kodeKecamatan'],
									"namaKecamatan" => $row['namaKecamatan'],
									"kodeWilayah" 	=> $row['kodeWilayah'],
									"namaWilayah" 	=> $row['namaWilayah'],
									"kodeProvinsi" 	=> $row['kodeProvinsi'],
									"namaProvinsi" 	=> $row['namaProvinsi']
								);
						
						array_push($record, $fetch); 
						array_push($recordDetail, $fetchDetail); 
					}
					
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data ditemukan!", "feedData" => array($record), "feedDataDetail" =>  array("list" => $recordDetail));
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
	
	function getGrupVerifikasi(){
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
			"SELECT 
				kodeGrupVerifikasi as `noreg`,
				namaGrupVerifikasi as `caption`
			 FROM
				dplega_220_grupVerifikasi
			 ORDER BY caption ASC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array();  
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						$fetch = array(
									"noreg"   	=> $row['noreg'],
									"caption" 	=> $row['caption']
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
	
	function getVerifikasi(){
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
			"SELECT 
				a.kodeVerifikasi as `noreg`,
				a.namaVerifikasi as `caption`,
				a.kodeGrupVerifikasi as `referencesKey`,
				b.namaGrupVerifikasi as `references`
			 FROM
				dplega_221_verifikasi a
			 LEFT JOIN
				dplega_220_grupVerifikasi b
			 ON
				a.kodeGrupVerifikasi = b.kodeGrupVerifikasi
			 ORDER BY noreg ASC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array(); 
				if(mysqli_num_rows($result) > 0) {
					// output data of each row 
					while($row = mysqli_fetch_assoc($result)) {
						$fetch = array(
									"noreg"   		=> $row['noreg'],
									"group"   	 	=> $row['references'],
									"caption" 	 	=> $row['caption'],
									"references" 	=> $row['references'],
									"referencesKey" => $row['referencesKey']
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
	
	function getKelembagaanSection($target){
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
			if($target == "f431"){
				$sql = 	
				"SELECT 
					kodeBentukLembaga as `noreg`,
					namaBentukLembaga as `caption`,
					deskripsi as `description`
				 FROM
					dplega_200_bentukLembaga
				 ORDER BY caption ASC";
			}elseif($target == "f432"){
				$sql = 	
				"SELECT 
					a.kodePersyaratan as `noreg`,
					a.namaPersyaratan as `caption`,
					a.kodeBentukLembaga as `referencesKey`,
					b.namaBentukLembaga as `references`
				 FROM
					dplega_201_persyaratan a
				 JOIN 
					dplega_200_bentukLembaga b
				 ON
					a.kodeBentukLembaga = b.kodeBentukLembaga
				 ORDER BY caption ASC";
			}if($target == "f433"){
				$sql = 	
				"SELECT 
					kodeBidangGerak as `noreg`,
					namaBidangGerak as `caption`
				 FROM
					dplega_210_bidangGerak
				 ORDER BY caption ASC";
			}
			
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array();  
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						
						if($target == "f431"){
							$fetch = array(
								"noreg"   		=> $row['noreg'],
								"caption" 		=> $row['caption'],
								"description" 	=> $row['description']
							);
						}elseif($target == "f432"){
							$fetch = array(
								"noreg"   		=> $row['noreg'],
								"caption" 		=> $row['caption'],
								"references" 	=> $row['references'],
								"referencesKey" => $row['referencesKey']
							);
						}if($target == "f433"){
							$fetch = array(
								"noreg"   	=> $row['noreg'],
								"caption" 	=> $row['caption']
							);
						}

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
		// f41 : provinsi
		// f42 : wilayah
		// f43 : kecamatan
		// f44 : kelurahan
		
		switch($target){
			case "f411": $resultList = createLingkupAreaSection($target, $data); break;
			case "f412": $resultList = createLingkupAreaSection($target, $data); break;
			case "f413": $resultList = createLingkupAreaSection($target, $data); break;
			case "f414": $resultList = createLingkupAreaSection($target, $data); break;
			
			case "f421": $resultList = createVerifikasiSection($target, $data); break;
			case "f422": $resultList = createVerifikasiSection($target, $data); break;
			
			case "f431": $resultList = createKelembagaanSection($target, $data); break;
			case "f432": $resultList = createKelembagaanSection($target, $data); break;
			case "f433": $resultList = createKelembagaanSection($target, $data); break;
			default	  : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function createLingkupAreaSection($target, $data){
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
		}
			
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = "";
				if($target == "f411"){
					$sql = 	
					" 	INSERT INTO dplega_100_provinsi
						(
							kodeProvinsi,
							namaProvinsi,
							createdBy
						)
						VALUES
						(
							'".$data['kode']."',
							'".$data['nama']."',
							'TESTSESSION'
						)
					";
				}elseif($target == "f412"){
					$sql = 	
					" 	INSERT INTO dplega_101_wilayah
						(
							kodeProvinsi,
							kodeWilayah,
							namaWilayah,
							createdBy
						)
						VALUES
						(
							'".$data['referensi']."',
							'".$data['kode']."',
							'".$data['nama']."',
							'TESTSESSION'
						)
					";
				}elseif($target == "f413"){
					$sql = 	
					" 	INSERT INTO dplega_102_kecamatan
						(
							kodeWilayah,
							kodeKecamatan,
							namaKecamatan,
							createdBy
						)
						VALUES
						(
							'".$data['referensi']."',
							'".$data['kode']."',
							'".$data['nama']."',
							'TESTSESSION'
						)
					";
				}elseif($target == "f414"){
					$sql = 	
					" 	INSERT INTO dplega_103_kelurahan
						(
							kodeKecamatan,
							kodeKelurahan,
							namaKelurahan,
							createdBy
						)
						VALUES
						(
							'".$data['referensi']."',
							'".$data['kode']."',
							'".$data['nama']."',
							'TESTSESSION'
						)
					";
				}
				
	
				$result = mysqli_query($gate, $sql);
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function createVerifikasiSection($target, $data){
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
		$resultId	= "";
		
		/* validation */
		if($target == "f421"){
			if(
				!isset($data['nama']) || $data['nama']==""
			){ $error = 1; }
		}elseif($target == "f422"){
			if(
				!isset($data['nama']) || $data['nama']==""
				|| !isset($data['referensi']) || $data['referensi']==""
			){ $error = 1; }
		}
		
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				if($target == "f421"){
					$sql = 	
					" 	INSERT INTO dplega_220_grupVerifikasi
						(
							namaGrupVerifikasi,
							createdBy
						)
						VALUES
						(
							'".$data['nama']."',
							'TESTSESSION'
						)
					";
				}elseif($target == "f422"){
					$sql = 	
					" 	INSERT INTO dplega_221_verifikasi
						(
							namaVerifikasi,
							kodeGrupVerifikasi,
							createdBy
						)
						VALUES
						(
							'".$data['nama']."',
							'".$data['referensi']."',
							'TESTSESSION'
						)
					";
				}
				
				$result = mysqli_query($gate, $sql);
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";	
					$resultId	= mysqli_insert_id($gate);
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $resultId);
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
		$resultId	= "";
		
		/* validation */
		if($target == "f431"){
			if(
				!isset($data['nama']) || $data['nama']==""
				|| !isset($data['deskripsi']) || $data['deskripsi']==""
			){ $error = 1; }
		}elseif($target == "f432"){
			if(
				!isset($data['nama']) || $data['nama']==""
				|| !isset($data['referensi']) || $data['referensi']==""
			){ $error = 1; }
		}elseif($target == "f433"){
			if(
				!isset($data['nama']) || $data['nama']==""
			){ $error = 1; }
		}
		
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				if($target == "f431"){
					$sql = 	
					" 	INSERT INTO dplega_200_bentukLembaga
						(
							namaBentukLembaga,
							deskripsi,
							createdBy
						)
						VALUES
						(
							'".$data['nama']."',
							'".$data['deskripsi']."',
							'TESTSESSION'
						)
					";
				}elseif($target == "f432"){
					$sql = 	
					" 	INSERT INTO dplega_201_persyaratan
						(
							namaPersyaratan,
							kodeBentukLembaga,
							createdBy
						)
						VALUES
						(
							'".$data['nama']."',
							'".$data['referensi']."',
							'TESTSESSION'
						)
					";
				}elseif($target == "f433"){
					$sql = 	
					" 	INSERT INTO dplega_210_bidangGerak
						(
							namaBidangGerak,
							createdBy
						)
						VALUES
						(
							'".$data['nama']."',
							'TESTSESSION'
						)
					";
				}
				
				$result = mysqli_query($gate, $sql);
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";	
					$resultId	= mysqli_insert_id($gate);
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $resultId);
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
		// f41 : provinsi
		// f42 : wilayah
		// f43 : kecamatan
		// f44 : kelurahan
		
		switch($target){
			case "f411": $resultList = changeLingkupAreaSection($target, $data); break;
			case "f412": $resultList = changeLingkupAreaSection($target, $data); break;
			case "f413": $resultList = changeLingkupAreaSection($target, $data); break;
			case "f414": $resultList = changeLingkupAreaSection($target, $data); break;
			
			case "f421": $resultList = changeVerifikasiSection($target, $data); break;
			case "f422": $resultList = changeVerifikasiSection($target, $data); break;
			
			case "f431": $resultList = changeKelembagaanSection($target, $data); break;
			case "f432": $resultList = changeKelembagaanSection($target, $data); break;
			case "f433": $resultList = changeKelembagaanSection($target, $data); break;
			default	  : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function changeLingkupAreaSection($target, $data){
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
		}
			
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = 	 "";
				if($target == "f411"){
					$sql = 	
					" 	UPDATE dplega_100_provinsi
						SET
							namaProvinsi = '".$data['nama']."'
						WHERE 
							kodeProvinsi =
							'".$data['kode']."'
					";
				}elseif($target == "f412"){
					$sql = 	
					" 	UPDATE dplega_101_wilayah
						SET
							namaWilayah = '".$data['nama']."',
							kodeProvinsi = '".$data['referensi']."'
						WHERE 
							kodeWilayah =
							'".$data['kode']."'
					";
				}elseif($target == "f413"){
					$sql = 	
					" 	UPDATE dplega_102_kecamatan
						SET
							namaKecamatan = '".$data['nama']."',
							kodeWilayah = '".$data['referensi']."'
						WHERE 
							kodeKecamatan =
							'".$data['kode']."'
					";
				}elseif($target == "f414"){
					$sql = 	
					" 	UPDATE dplega_103_kelurahan
						SET
							namaKelurahan = '".$data['nama']."',
							kodeKecamatan = '".$data['referensi']."'
						WHERE 
							kodeKelurahan =
							'".$data['kode']."'
					";
				}

				$result = mysqli_query($gate, $sql);
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function changeVerifikasiSection($target, $data){
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
		if($target == "f421"){
			if(
				!isset($data['pId']) || $data['pId']=="" 
				|| !isset($data['nama']) || $data['nama']=="" 
			){
				$error = 1;
			}
		}elseif($target == "f422"){
			if(
				!isset($data['pId']) || $data['pId']=="" 
				|| !isset($data['nama']) || $data['nama']=="" 
				|| !isset($data['referensi']) || $data['referensi']=="" 
			){
				$error = 1;
			}
		}
		
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				
				if($target == "f421"){
					$sql = 	
					" 	UPDATE dplega_220_grupVerifikasi
						SET
							namaGrupVerifikasi = '".$data['nama']."'
						WHERE 
							kodeGrupVerifikasi =
							'".$data['pId']."'
					";
				}elseif($target == "f422"){
					$sql = 	
					" 	UPDATE dplega_221_verifikasi
						SET
							namaVerifikasi = '".$data['nama']."',
							kodeGrupVerifikasi = '".$data['referensi']."'
						WHERE 
							kodeVerifikasi =
							'".$data['pId']."'
					";
				}
	
				$result = mysqli_query($gate, $sql);
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
		
		/* validation */
		if($target == "f431"){
			if(
				!isset($data['pId']) || $data['pId']=="" 
				|| !isset($data['nama']) || $data['nama']=="" 
				|| !isset($data['deskripsi']) || $data['deskripsi']=="" 
			){
				$error = 1;
			}
		}elseif($target == "f432"){
			if(
				!isset($data['pId']) || $data['pId']=="" 
				|| !isset($data['nama']) || $data['nama']=="" 
				|| !isset($data['referensi']) || $data['referensi']=="" 
			){
				$error = 1;
			}
		}elseif($target == "f433"){
			if(
				!isset($data['pId']) || $data['pId']=="" 
				|| !isset($data['nama']) || $data['nama']=="" 
			){
				$error = 1;
			}
		}
		
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				
				if($target == "f431"){
					$sql = 	
					" 	UPDATE dplega_200_bentukLembaga
						SET
							namaBentukLembaga = '".$data['nama']."',
							deskripsi = '".$data['deskripsi']."'
						WHERE 
							kodeBentukLembaga = '".$data['pId']."'
					";
				}elseif($target == "f432"){
					$sql = 	
					" 	UPDATE dplega_201_persyaratan
						SET
							namaPersyaratan = '".$data['nama']."',
							kodeBentukLembaga = '".$data['referensi']."'
						WHERE 
							kodePersyaratan = '".$data['pId']."'
					";
				}elseif($target == "f433"){
					$sql = 	
					" 	UPDATE dplega_210_bidangGerak
						SET
							namaBidangGerak = '".$data['nama']."'
						WHERE 
							kodeBidangGerak = '".$data['pId']."'
					";
				}
	
				$result = mysqli_query($gate, $sql);
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
			case "f411": $resultList = deleteLingkupAreaSection($target, $data); break;
			case "f412": $resultList = deleteLingkupAreaSection($target, $data); break;
			case "f413": $resultList = deleteLingkupAreaSection($target, $data); break;
			case "f414": $resultList = deleteLingkupAreaSection($target, $data); break;
			
			case "f421": $resultList = deleteVerifikasiSection($target, $data); break;
			case "f422": $resultList = deleteVerifikasiSection($target, $data); break;
			
			case "f431": $resultList = deleteKelembagaanSection($target, $data); break;
			case "f432": $resultList = deleteKelembagaanSection($target, $data); break;
			case "f433": $resultList = deleteKelembagaanSection($target, $data); break;
			default	  : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!"); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	
	function deleteLingkupAreaSection($target, $data){
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
		if(
			isset($data['pId']) && $data['pId']!=""
		){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				if($target == "f411"){
					$sql = 	
					" 	DELETE FROM dplega_100_provinsi
						WHERE 
							kodeProvinsi =
							'".$data['pId']."'
					";
				}elseif($target == "f412"){
					$sql = 	
					" 	DELETE FROM dplega_101_wilayah
						WHERE 
							kodeWilayah =
							'".$data['pId']."'
					";
				}elseif($target == "f413"){
					$sql = 	
					" 	DELETE FROM dplega_102_kecamatan
						WHERE 
							kodeKecamatan =
							'".$data['pId']."'
					";
				}elseif($target == "f414"){
					$sql = 	
					" 	DELETE FROM dplega_103_kelurahan
						WHERE 
							kodeKelurahan =
							'".$data['pId']."'
					";
				}
				
				$result = mysqli_query($gate, $sql);
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil dihapus.";		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal dihapus!";
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function deleteVerifikasiSection($target, $data){
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
		if(
			isset($data['pId']) && $data['pId']!=""
		){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = "";
				if($target == "f421"){
					$sql = "DELETE FROM dplega_220_grupVerifikasi WHERE kodeGrupVerifikasi ='".$data['pId']."'";
				}elseif($target == "f422"){
					$sql = "DELETE FROM dplega_221_verifikasi WHERE kodeVerifikasi ='".$data['pId']."'";
				}
					
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
	
	function deleteKelembagaanSection($target, $data){
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
		if(
			isset($data['pId']) && $data['pId']!=""
		){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = "";
				if($target == "f431"){
					$sql = "DELETE FROM dplega_200_bentukLembaga WHERE kodeBentukLembaga ='".$data['pId']."'";
				}elseif($target == "f432"){
					$sql = "DELETE FROM dplega_201_persyaratan WHERE kodePersyaratan ='".$data['pId']."'";
				}elseif($target == "f433"){
					$sql = "DELETE FROM dplega_210_bidangGerak WHERE kodeBidangGerak ='".$data['pId']."'";
				}
					
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
	
?>