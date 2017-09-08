<?php
	if (session_status() == PHP_SESSION_NONE) {session_start();} // session start
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
			case "f40" : $resultList = getLingkupAreaSection(); break;
			case "f401": $resultList = getLingkupAreaListSection(); break;
			case "f402": $resultList = getBatasAreaListSection(); break;
			case "f412": $resultList = getWilayahOnlyListSection($data); break;

			case "f421": $resultList = getGrupVerifikasi(); break;
			case "f422": $resultList = getVerifikasi(); break;
			
			case "f431": $resultList = getKelembagaanSection($target); break;
			case "f432": $resultList = getKelembagaanSection($target); break;
			case "f433": $resultList = getKelembagaanSection($target); break;

			case "f441": $resultList = getDaftarBeritaSection($data); break;
		
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
		$dumbFieldS	= "";
		$dumbQueryS	= "";
		$dumbQuery['provinsi'] 	= ""; 
		$dumbQuery['wilayah'] 	= ""; 
		$dumbQuery['kecamatan'] = ""; 
		$dumbQuery['kelurahan'] = ""; 
	
		/* open connection */ 
		$gate = openGate();
		if($gate){		
			// connection = true
			/* AUTHENTICATION */
			if(
				   isset($_SESSION['login']) && $_SESSION['login'] == "yes" 
				&& isset($_SESSION['userLevel']) && $_SESSION['userLevel'] != "7"){
				
				switch ($_SESSION['lingkupArea']) {
					case '3': 
						$dumbQuery['provinsi']  = "WHERE a.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['wilayah']   = "WHERE b.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['kecamatan'] = "WHERE c.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['kelurahan'] = "WHERE d.idData = '".$_SESSION['idBatasArea']."'"; 
					break;
					case '2': 
						$dumbQuery['provinsi']  = "WHERE b.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['wilayah']   = "WHERE a.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['kecamatan'] = "WHERE b.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['kelurahan'] = "WHERE c.idData = '".$_SESSION['idBatasArea']."'"; 
					break;
					case '1': 
						$dumbQuery['provinsi']  = "WHERE c.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['wilayah']   = "WHERE c.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['kecamatan'] = "WHERE a.idData = '".$_SESSION['idBatasArea']."'"; 
						$dumbQuery['kelurahan'] = "WHERE b.idData = '".$_SESSION['idBatasArea']."'"; 
					break;
					default: break;
				}
			}
			/* AUTHENTICATION END */

			$sql = 	"SELECT * from (select 'provinsi' as `group`, 'f411' as `target`, a.idData, kodeProvinsi as code, namaProvinsi as name, '' as `referencesKey`, '' as `references` FROM `dplega_100_provinsi` a LEFT JOIN  `dplega_101_wilayah` b ON a.idData = b.idProvinsi LEFT JOIN  `dplega_102_kecamatan` c ON b.idData = c.idWilayah ".$dumbQuery['provinsi']." order by a.idData) as table_1
					 UNION
					 SELECT * from (SELECT 'wilayah' as `group`, 'f412' as `target`, a.idData, a.kodeWilayah as code, a.namaWilayah as name, a.idProvinsi as `referencesKey`, namaProvinsi as `references` FROM `dplega_101_wilayah` a LEFT JOIN  `dplega_100_provinsi` b ON a.idProvinsi = b.idData LEFT JOIN  `dplega_102_kecamatan` c ON c.idWilayah = a.idData ".$dumbQuery['wilayah']." order by a.idData) as table_2
					 UNION
					 SELECT * from (SELECT 'kecamatan' as `group`, 'f413' as `target`, a.idData, a.kodeKecamatan as code, a.namaKecamatan as name, a.idWilayah as `referencesKey`, namaWilayah as `references` FROM `dplega_102_kecamatan` a LEFT JOIN  `dplega_101_wilayah` b ON a.idWilayah = b.idData LEFT JOIN  `dplega_100_provinsi` c ON b.idProvinsi = c.idData ".$dumbQuery['kecamatan']." order by a.idData) as table_3
					 UNION
					 SELECT * from (SELECT 'kelurahan' as `group`, 'f414' as `target`, a.idData, a.kodeKelurahan as code, a.namaKelurahan as name, a.idKecamatan as `referencesKey`, namaKecamatan as `references` FROM `dplega_103_kelurahan` a LEFT JOIN  `dplega_102_kecamatan` b ON a.idKecamatan = b.idData  LEFT JOIN `dplega_101_wilayah` c ON b.idWilayah = c.idData  LEFT JOIN  `dplega_100_provinsi` d ON c.idProvinsi = d.idData ".$dumbQuery['kelurahan']." order by a.idData) as table_4";
						
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
									"idData"   		=> $row['idData'],
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
							kl.idData as idKelurahan, 
							kl.kodeKelurahan, 
							namaKelurahan, 
							kc.idData as idKecamatan,
							kc.kodeKecamatan,
							namaKecamatan, 
							wl.idData as idWilayah,
							wl.kodeWilayah,
							namaWilayah, 
							pr.idData as idProvinsi,
							pr.kodeProvinsi,
							namaProvinsi
						FROM
							dplega_100_provinsi pr
						JOIN
							dplega_101_wilayah wl
							ON pr.idData = wl.idProvinsi
						JOIN
							dplega_102_kecamatan kc
							ON wl.idData = kc.idWilayah
						JOIN
							dplega_103_kelurahan kl
							ON kc.idData = kl.idKecamatan
						ORDER BY namaKelurahan ASC
					";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					$fetchTemp		= "";
					$fetch 	  		= array();
					$fetchDetail	= array();
					$record    		= array();
					$recordDetail   = array();
					while($row = mysqli_fetch_assoc($result)) {
						
						unset($fetch); $fetch = array();
						
						$fetch 		   = $row['namaKelurahan'].", ".$row['namaKecamatan']." ".$row['namaWilayah']." | ".$row['namaProvinsi'];
						$fetchDetail = array(
									"idKelurahan" 	=> $row['idKelurahan'],
									"kodeKelurahan" => $row['kodeKelurahan'],
									"namaKelurahan" => $row['namaKelurahan'],
									"idKecamatan" 	=> $row['idKecamatan'],
									"kodeKecamatan" => $row['kodeKecamatan'],
									"namaKecamatan" => $row['namaKecamatan'],
									"idWilayah" 	=> $row['idWilayah'],
									"kodeWilayah" 	=> $row['kodeWilayah'],
									"namaWilayah" 	=> $row['namaWilayah'],
									"idProvinsi" 	=> $row['idProvinsi'],
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

	function getBatasAreaListSection(){
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
							kl.idData as idKelurahan, 
							kl.kodeKelurahan, 
							namaKelurahan, 
							kc.idData as idKecamatan,
							kc.kodeKecamatan,
							namaKecamatan, 
							wl.idData as idWilayah,
							wl.kodeWilayah,
							namaWilayah, 
							pr.idData as idProvinsi,
							pr.kodeProvinsi,
							namaProvinsi
						FROM
							dplega_100_provinsi pr
						JOIN
							dplega_101_wilayah wl
							ON pr.idData = wl.idProvinsi
						JOIN
							dplega_102_kecamatan kc
							ON wl.idData = kc.idWilayah
						JOIN
							dplega_103_kelurahan kl
							ON kc.idData = kl.idKecamatan
						ORDER BY namaKelurahan ASC
					";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					$fetchProvinsi	= array();
					$fetchWilayah	= array();
					$fetchKecamatan	= array();
					$fetchKelurahan	= array();
					$fetchDProvinsi	= array();
					$fetchDWilayah	= array();
					$fetchDKecamatan= array();
					$fetchDKelurahan= array();

					$record    		= array();
					$recordDetail   = array();
					while($row = mysqli_fetch_assoc($result)) {
						
						array_push($fetchKelurahan  , $row['namaKelurahan'].", ".$row['namaKecamatan']." ".$row['namaWilayah']." | ".$row['namaProvinsi']);
						array_push($fetchKecamatan  , $row['namaKecamatan']." ".$row['namaWilayah']." | ".$row['namaProvinsi']);
						array_push($fetchWilayah    , $row['namaWilayah']." | ".$row['namaProvinsi']);
						array_push($fetchProvinsi   , $row['namaProvinsi']);

						array_push($fetchDKelurahan, array( 
							"group" => "kelurahan",
							"idData"=> $row['idKelurahan'],
							"kode" 	=> $row['kodeKelurahan'],
							"nama" 	=> $row['namaKelurahan']
						));

						array_push($fetchDKecamatan, array(
							"group" => "kecamatan",
							"idData"=> $row['idKecamatan'],
							"kode" 	=> $row['kodeKecamatan'],
							"nama" 	=> $row['namaKecamatan']
						));

						array_push($fetchDWilayah, array(
							"group" => "wilayah",
							"idData"=> $row['idWilayah'],
							"kode" 	=> $row['kodeWilayah'],
							"nama" 	=> $row['namaWilayah']
						));

						array_push($fetchDProvinsi, array(
							"group" => "provinsi",
							"idData"=> $row['idProvinsi'],
							"kode" 	=> $row['kodeProvinsi'],
							"nama" 	=> $row['namaProvinsi']
						));
					}

					$record = array(
						"kelurahan" => $fetchKelurahan,
						"kecamatan" => $fetchKecamatan,
						"wilayah"	=> $fetchWilayah,
						"provinsi"	=> $fetchProvinsi
					);

					$recordDetail = array(
						"kelurahan" => $fetchDKelurahan,
						"kecamatan" => $fetchDKecamatan,
						"wilayah"	=> $fetchDWilayah,
						"provinsi"	=> $fetchDProvinsi
					);
					
					$resultList = array( "feedStatus" => "succes", "feedMessage" => "Data ditemukan!", "feedData" => $record, "feedDataDetail" => $recordDetail);
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

	function getWilayahOnlyListSection(){
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
							wl.kodeWilayah,
							wl.namaWilayah,
							CONCAT_WS(' ', namaWilayah, '-', namaProvinsi) as nama
						FROM
							dplega_100_provinsi pr
						JOIN
							dplega_101_wilayah wl
							ON pr.kodeProvinsi = wl.kodeProvinsi
						ORDER BY namaWilayah ASC, namaProvinsi ASC
					";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					$fetchTemp		= "";
					$fetch 	  		= array();
					$fetchDetail	= array();
					$record    		= array();
					$recordDetail   = array();
					while($row = mysqli_fetch_assoc($result)) {
						
						unset($fetch); $fetch = array();
						
						$fetch 		 = $row['nama'];
						$fetchDetail = array(
									"kodeWilayah" 	=> $row['kodeWilayah'],
									"namaWilayah" 	=> $row['namaWilayah']
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

	function getDaftarBeritaSection($data){
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
		$key 		= $data['keyword'];
	
		/* open connection */ 
		$gate = openGate();
		if($gate){
			//connection = true
			if($key == ''){
				$sql = 	
				"SELECT
					idData,
					judulBerita,
					deskripsi,
					urlGambar,
					createdDate
				FROM dplega_230_berita
				";

			}else{
				$sql = 	
				"SELECT
					idData,
					judulBerita,
					deskripsi,
					urlGambar,
					createdDate
				fROM dplega_230_berita
				WHERE idData = '".$key."'
				";			
			}
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array(); 
				if(mysqli_num_rows($result) > 0) {
					// output data of each row 
					while($row = mysqli_fetch_assoc($result)) {
						$fetch = array(
									"idBerita" 		=> $row['idData'],
									"judul"   	 	=> $row['judulBerita'],
									"isiBerita" 	=> $row['deskripsi'],
									"urlGambar" 	=> $row['urlGambar'],
									"createdDate" 	=> $row['createdDate']
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
		$dumbFieldS	= "";
		$dumbQueryS	= "";
	
		/* open connection */ 
		$gate = openGate();
		if($gate){		
			// connection = true
			$sql = 	"";
			if($target == "f431"){

				/* AUTHENTICATION */
				if(
					   isset($_SESSION['login']) && $_SESSION['login'] == "yes" 
					&& isset($_SESSION['userLevel']) && $_SESSION['userLevel'] != "7"){
					switch ($_SESSION['lingkupArea']) {
						case '3': $dumbFieldS = "kodeProvinsi"; break;
						case '2': $dumbFieldS = "kodeWilayah"; break;
						case '1': $dumbFieldS = "kodeKecamatan"; break;
						default: break;
					}

					$dumbQueryS = ($dumbFieldS != "") ? "AND ".$dumbFieldS." = '".$_SESSION['idBatasArea']."'" : '';
				}
				/* AUTHENTICATION END */

				$sql = 	
				"SELECT 
					b.kodeBentukLembaga as `noreg`,
					b.namaBentukLembaga as `caption`,
					b.deskripsi as `description`,
					COALESCE(b.urlGambar, 'icon-1.png') as `picture`,
					(
						(SELECT COUNT(noRegistrasi) FROM dplega_000_lembaga l WHERE l.kodeBentukLembaga = b.kodeBentukLembaga ".$dumbQueryS.") +
						(SELECT COUNT(noRegistrasi) FROM dplega_000_lembaga_temp lt WHERE lt.kodeBentukLembaga = b.kodeBentukLembaga ".$dumbQueryS.")
					) as `counter`
				 FROM
					dplega_200_bentuklembaga b
				 ORDER BY noreg ASC";
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
								"description" 	=> $row['description'],
								"picture" 		=> $row['picture'],
								"counter" 		=> $row['counter']
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

			case "f441": $resultList = createDaftarBeritaSection($target, $data); break;
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
		$recentId	= "";
		
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
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['kode']."',
							'".$data['nama']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}elseif($target == "f412"){
					$sql = 	
					" 	INSERT INTO dplega_101_wilayah
						(
							idProvinsi,
							kodeWilayah,
							namaWilayah,
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['referensi']."',
							'".$data['kode']."',
							'".$data['nama']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}elseif($target == "f413"){
					$sql = 	
					" 	INSERT INTO dplega_102_kecamatan
						(
							idWilayah,
							kodeKecamatan,
							namaKecamatan,
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['referensi']."',
							'".$data['kode']."',
							'".$data['nama']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}elseif($target == "f414"){
					$sql = 	
					" 	INSERT INTO dplega_103_kelurahan
						(
							idKecamatan,
							kodeKelurahan,
							namaKelurahan,
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['referensi']."',
							'".$data['kode']."',
							'".$data['nama']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}
				
	
				$result = mysqli_query($gate, $sql);
				if($result){	
					$recentId	= mysqli_insert_id($gate);
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $recentId);
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
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['nama']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}elseif($target == "f422"){
					$sql = 	
					" 	INSERT INTO dplega_221_verifikasi
						(
							namaVerifikasi,
							kodeGrupVerifikasi,
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['nama']."',
							'".$data['referensi']."',
							'".$_SESSION['username']."', NOW()
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
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['nama']."',
							'".$data['deskripsi']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}elseif($target == "f432"){
					$sql = 	
					" 	INSERT INTO dplega_201_persyaratan
						(
							namaPersyaratan,
							kodeBentukLembaga,
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['nama']."',
							'".$data['referensi']."',
							'".$_SESSION['username']."', NOW()
						)
					";
				}elseif($target == "f433"){
					$sql = 	
					" 	INSERT INTO dplega_210_bidangGerak
						(
							namaBidangGerak,
							createdBy, createdDate
						)
						VALUES
						(
							'".$data['nama']."',
							'".$_SESSION['username']."', NOW()
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

	function createDaftarBeritaSection($target, $data){
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
		if(
			!isset($data['judul']) || $data['judul']==""
			|| !isset($data['isiBerita']) || $data['isiBerita']==""
		){ $error = 1; }
		
		if($error != 1){
			
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true
				$sql = 	
				"
					INSERT INTO dplega_230_berita
					(
						judulBerita,
						deskripsi,
						createdBy, createdDate
					)
					VALUES
					(
						'".$data['judul']."',
						'".$data['isiBerita']."',
						'".$_SESSION['username']."', NOW()
					)
				";
				
				$result = mysqli_query($gate, $sql);
				$erres  = mysqli_error($gate);
				if($result){	
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "Input berhasil disimpan.";	
					$resultId	= mysqli_insert_id($gate);

					/*upload image*/
						$validextensions = array("jpeg", "jpg", "png", "gif");
						$temporary = explode(".", $_FILES["urlFile"]["name"]);
						$file_extension = end($temporary);
						$file_name = "berkas belum diunggah...";					
						if (in_array($file_extension, $validextensions)) {						
							if ($_FILES["urlFile"]["error"] > 0)
							{
								$upload_message = $_FILES["urlFile"];
							}
							else
							{		
								$file_name = $resultId."_news".".".$file_extension;				
								$sourcePath = $_FILES['urlFile']['tmp_name']; // Storing source path of the file in a variable
								$targetPath = "img/news/".$file_name; // Target path where file is to be stored
								if(move_uploaded_file($sourcePath,"../".$targetPath)){ /*Moving Uploaded file*/
									$sql = "
										UPDATE dplega_230_berita
										SET 
										urlGambar = '".$file_name."' 
										WHERE
										idData = '".$resultId."'
									";

									$result = mysqli_query($gate, $sql);									
								}								
							}
						}
					/*upload end*/		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, input gagal disimpan! ".$erres;
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
			$resultList = array( "feedStatus" => "failed", "feedType" => $resultType, "feedMessage" => $resultMsg );
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
		$recentId	= "";
		
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
							kodeProvinsi = '".$data['kode']."',
							namaProvinsi = '".$data['nama']."',
							changedBy 	 = '".$_SESSION['username']."',
							changedDate  = NOW()
						WHERE 
							idData = '".$data['idData']."'
					";
				}elseif($target == "f412"){
					$sql = 	
					" 	UPDATE dplega_101_wilayah
						SET
							kodeWilayah  = '".$data['kode']."',
							namaWilayah  = '".$data['nama']."',
							idProvinsi 	 = '".$data['referensi']."',
							changedBy 	 = '".$_SESSION['username']."',
							changedDate  = NOW()
						WHERE 
							idData = '".$data['idData']."'
					";
				}elseif($target == "f413"){
					$sql = 	
					" 	UPDATE dplega_102_kecamatan
						SET
							kodeKecamatan = '".$data['kode']."',
							namaKecamatan = '".$data['nama']."',
							idWilayah     = '".$data['referensi']."',
							changedBy 	  = '".$_SESSION['username']."',
							changedDate   = NOW()
						WHERE 
							idData = '".$data['idData']."'
					";
				}elseif($target == "f414"){
					$sql = 	
					" 	UPDATE dplega_103_kelurahan
						SET
							kodeKelurahan = '".$data['kode']."',
							namaKelurahan = '".$data['nama']."',
							idKecamatan   = '".$data['referensi']."',
							changedBy 	  = '".$_SESSION['username']."',
							changedDate   = NOW()
						WHERE 
							idData = '".$data['idData']."'
					";
				}

				$result = mysqli_query($gate, $sql);
				if($result){	
					$recentId	= $data['idData'];
					$error	    = 0;
					$resultType = "success";
					$resultMsg  = "data berhasil diubah.";		
				}else{
					//error state
					$error		= 1;
					$resultType = "danger";
					$resultMsg	= "Terjadi kesalahan fatal, data gagal diubah!".mysqli_error($gate);
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
			$resultList = array( "feedStatus" => "success", "feedType" => $resultType, "feedMessage" => $resultMsg, "feedId" => $recentId);
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
							namaGrupVerifikasi = '".$data['nama']."',
							changedBy 	 = '".$_SESSION['username']."',
							changedDate  = NOW()
						WHERE 
							kodeGrupVerifikasi =
							'".$data['pId']."'
					";
				}elseif($target == "f422"){
					$sql = 	
					" 	UPDATE dplega_221_verifikasi
						SET
							namaVerifikasi = '".$data['nama']."',
							kodeGrupVerifikasi = '".$data['referensi']."',
							changedBy 	 = '".$_SESSION['username']."',
							changedDate  = NOW()
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
							deskripsi 	 = '".$data['deskripsi']."',
							changedBy 	 = '".$_SESSION['username']."',
							changedDate  = NOW()
						WHERE 
							kodeBentukLembaga = '".$data['pId']."'
					";
				}elseif($target == "f432"){
					$sql = 	
					" 	UPDATE dplega_201_persyaratan
						SET
							namaPersyaratan	  = '".$data['nama']."',
							kodeBentukLembaga = '".$data['referensi']."',
							changedBy 	 = '".$_SESSION['username']."',
							changedDate  = NOW()
						WHERE 
							kodePersyaratan = '".$data['pId']."'
					";
				}elseif($target == "f433"){
					$sql = 	
					" 	UPDATE dplega_210_bidangGerak
						SET
							namaBidangGerak = '".$data['nama']."'
							changedBy 	 	= '".$_SESSION['username']."',
							changedDate  	= NOW()
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

			case "f441": $resultList = deleteDaftarBeritaSection($data); break;
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
							idData =
							'".$data['pId']."'
					";
				}elseif($target == "f412"){
					$sql = 	
					" 	DELETE FROM dplega_101_wilayah
						WHERE 
							idData =
							'".$data['pId']."'
					";
				}elseif($target == "f413"){
					$sql = 	
					" 	DELETE FROM dplega_102_kecamatan
						WHERE 
							idData =
							'".$data['pId']."'
					";
				}elseif($target == "f414"){
					$sql = 	
					" 	DELETE FROM dplega_103_kelurahan
						WHERE 
							idData =
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

	function deleteDaftarBeritaSection($data){
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
				$sql 	= "
					SELECT urlGambar as urlFile FROM dplega_230_berita 
					WHERE idData = '".$data['pId']."'";
	
				$result = mysqli_query($gate, $sql);
				if(mysqli_num_rows($result) > 0) {
					while($row = mysqli_fetch_assoc($result)) {
						if(file_exists("../img/news/".$row['urlFile'])){
							unlink("../img/news/".$row['urlFile']);
						}else{
							$error		= 1;
							$resultType = "danger";
							$resultMsg	= "Terjadi kesalahan fatal, data gagal dihapus! ";
						}
					}
				}
				$sql = "
						DELETE FROM dplega_230_berita
						WHERE idData = '".$data['pId']."'
					";
					
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
	
?>