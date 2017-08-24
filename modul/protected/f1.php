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
			case "f1111": $resultList = getDetailLembagaan($data); break;
			case "f1112": $resultList = getFetchLembagaan($data); break;
			case "f117": $resultList = getKoleksiSection($data); break;
			case "f119": $resultList = getPrestasiSection($data); break;
			case "f141": $resultList = getKoleksi($data); break;
			
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
			case "f119": $resultList = createPrestasiSection($target, $data); break;
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
			case "f119": $resultList = deletePrestasiSection($target, $data); break;
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
		$dumb		= "";
		$dumbQuery['keyword'] 	= ""; 
		$dumbQuery['provinsi'] 	= ""; 
		$dumbQuery['wilayah'] 	= ""; 
		$dumbQuery['kecamatan'] = ""; 
		$dumbQuery['kelurahan'] = ""; 

		//validation 
		if(isset($data['refferences']) && $data['refferences'] != ""){	
			/* open connection */ 
			$gate = openGate();
			if($gate){		
				// connection = true

				$dumb = explode(',', $data['refferences']);
				if($dumb[0] == 'single') { $data['refferences'] = $dumb[1]; }
				else {
					$data['refferences'] 	=  $dumb[1];

					if(isset($dumb[2]) && $dumb[2] != "") { $dumbQuery['provinsi' ]	= "AND l.kodeProvinsi  = '".$dumb[2]."'"; }
					if(isset($dumb[3]) && $dumb[3] != "") { $dumbQuery['wilayah'  ]	= "AND l.kodeWilayah   = '".$dumb[3]."'"; }
					if(isset($dumb[4]) && $dumb[4] != "") { $dumbQuery['kecamatan']	= "AND l.kodeKecamatan = '".$dumb[4]."'"; }
					if(isset($dumb[5]) && $dumb[5] != "") { $dumbQuery['kelurahan']	= "AND l.kodeKelurahan = '".$dumb[5]."'"; }
				}



				if(isset($data['keyword']) && $data['keyword'] != ""){	
					$dumbQuery['keyword'] = "
					AND
						( 	
							l.noRegistrasi		LIKE '%".$data['keyword']."%' OR 
							l.nama 				LIKE '%".$data['keyword']."%' 
						)
					";
				}

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
						WHERE 
							l.kodeBentukLembaga = '".$data['refferences']."' 
						AND l.statusAktif = '1'
						".$dumbQuery['keyword']."
						".$dumbQuery['provinsi' ]."
						".$dumbQuery['wilayah'  ]."
						".$dumbQuery['kecamatan']." 
						".$dumbQuery['kelurahan']." 
					) as table_1
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
						WHERE 
							l.kodeBentukLembaga = '".$data['refferences']."' 
						AND l.statusAktif = '2'
						".$dumbQuery['keyword']."
						".$dumbQuery['provinsi' ]."
						".$dumbQuery['wilayah'  ]."
						".$dumbQuery['kecamatan']." 
						".$dumbQuery['kelurahan']." 
					) as table_2
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
						WHERE 
							l.kodeBentukLembaga = '".$data['refferences']."' 
						AND l.statusAktif = '1'
						".$dumbQuery['keyword']."
						".$dumbQuery['provinsi' ]."
						".$dumbQuery['wilayah'  ]."
						".$dumbQuery['kecamatan']." 
						".$dumbQuery['kelurahan']." 
					) as table_3
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
						
						$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => $package);
					}else {
						$resultList = array( "feedStatus" => "success", "feedMessage" => "Data tidak ditemukan!", "feedData" => array());
					}
				}			
					
				closeGate($gate);
			}else {
				//error state
				$error		= 1;
				$errorType  = "danger";
				$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke server!";
			}
		}else {
			//error state
			$error		= 1;
			$errorType  = "danger";
			$errorMsg	= "Terjadi kesalahan, tidak dapat menentukan refferences key!";
		} // return empty of array
		
		if($error == 1){
			//error state
			$resultList = array( "feedStatus" => "failed", "feedType" => $errorType, "feedMessage" => $errorMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function getDetailLembagaan($data){
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
		$dumbTable  = "";
		$noreg 		= $data['refferences'];

		/* open connection */ 
		$gate = openGate();
		if($gate){		
			// connection = true
			//checking section
			$sql 	= " SELECT noRegistrasi FROM dplega_000_lembaga WHERE noRegistrasi = '".$noreg."'";
			$result = mysqli_query($gate, $sql);
			if(mysqli_num_rows($result) > 0) {
				$dumbTable = "";
			}else{
				$sql 	= " SELECT noRegistrasi FROM dplega_000_lembaga_temp WHERE noRegistrasi = '".$noreg."'";
				$result = mysqli_query($gate, $sql);
				if(mysqli_num_rows($result) > 0) {
					$dumbTable = "_temp";
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, data tidak dikenal!";
				}
			}

			//profile
			$sql = 	"
				SELECT 
					COALESCE(l.`urlGambarLogo`, 'avatar-default.jpg') as avatar, 
					l.noRegistrasi as noreg, 
					l.nama,
					l.kodeBentukLembaga,
					b.namaBentukLembaga,
					l.catatanLain,
					l.noTelp as telp,
					l.email,
					l.mediaSosial,
					CONCAT_WS(' ', `alamat`, 'RT.',`noRt`, '/', 'RW.', `noRw`, `namaKelurahan`, `namaKecamatan`, `namaWilayah`, `namaProvinsi`) as alamat,
					`alamat` as alamat_single,
					`noRt` as noRt_single,
					`noRw` as noRw_single,
					l.`kodeProvinsi` as kodeProvinsi_single,
					l.`kodeWilayah` as kodeWilayah_single,
					l.`kodeKecamatan` as kodeKecamatan_single,
					l.`kodeKelurahan` as kodeKelurahan_single,
					`namaProvinsi` as namaProvinsi_single,
					`namaWilayah` as namaWilayah_single,
					`namaKecamatan` as namaKecamatan_single,
					`namaKelurahan` as namaKelurahan_single
				FROM
					dplega_000_lembaga".$dumbTable." l
				JOIN
					dplega_200_bentuklembaga b ON l.kodeBentukLembaga = b.kodeBentukLembaga
				JOIN
					dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
				JOIN
					dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
				JOIN
					dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
				JOIN
					dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
				WHERE
					l.noRegistrasi = '".$noreg."'
			";
			
			$record    = array(); 
			$fetch 	   = array();  
			$profile   = array();  
			$detail    = array();  
			$option    = array();  
			$group     = array();  
			$items     = array();  
			$itemsPack = array();  

			if($error != 1){
				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							$fetch = array(
										"avatar"   		=> $row['avatar'],
										"noreg" 		=> $row['noreg'],
										"nama" 			=> $row['nama'],
										"kodeBentukLembaga" => $row['kodeBentukLembaga'],
										"bentukLembaga" => $row['namaBentukLembaga'],
										"catatan"		=> $row['catatanLain'],
										"telp"			=> $row['telp'],
										"email"			=> $row['email'],
										"sosialMedia"	=> $row['mediaSosial'],
										"alamat"		=> $row['alamat'],
										"alamat_single"		=> $row['alamat_single'],
										"noRt_single"		=> $row['noRt_single'],
										"noRw_single"		=> $row['noRw_single'],
										"kodeProvinsi_single"		=> $row['kodeProvinsi_single'],
										"kodeWilayah_single"		=> $row['kodeWilayah_single'],
										"kodeKecamatan_single"		=> $row['kodeKecamatan_single'],
										"kodeKelurahan_single"		=> $row['kodeKelurahan_single'],
										"namaProvinsi_single"		=> $row['namaProvinsi_single'],
										"namaWilayah_single"		=> $row['namaWilayah_single'],
										"namaKecamatan_single"		=> $row['namaKecamatan_single'],
										"namaKelurahan_single"		=> $row['namaKelurahan_single']
							);
						}

						array_push($profile, $fetch); 
						unset($fetch); 
						$fetch = array();
					}
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke serverSS!";
				}			
			}

			
			if($error != 1){
				//kelembagaan
				$sql = 	"
					SELECT 
						namaBidangGerak, 
						jumlahPengurus,
						organisasiAfiliasi,
						visiLembaga,
						misiLembaga
					FROM
						dplega_000_lembaga".$dumbTable." l
						JOIN
						dplega_210_bidangGerak b
					ON l.kodeBidangGerak = b.kodeBidangGerak
					WHERE
					l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array("label" => 'Bergerak dalam bidang', "text" => $row['namaBidangGerak'])); 
							array_push($items, array("label" => 'Jumlah pengurus', "text" => $row['jumlahPengurus'])); 
							array_push($items, array("label" => 'Afiliasi', "text" => $row['organisasiAfiliasi'])); 
							array_push($items, array("label" => 'Visi', "text" => $row['visiLembaga'])); 
							array_push($items, array("label" => 'Misi', "text" => $row['misiLembaga'])); 
						}
					}else{
						array_push($items, array("label" => 'Bergerak dalam bidang', "text" => '')); 
						array_push($items, array("label" => 'Jumlah pengurus', "text" => '')); 
						array_push($items, array("label" => 'Afiliasi', "text" => '')); 
						array_push($items, array("label" => 'Visi', "text" => '')); 
						array_push($items, array("label" => 'Misi', "text" => '')); 
					}

					array_push($group, array(
						"groupId" => "kelembagaan", "groupName" => "Kelembagaan", "group" => "card", "type" => "table",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}

				
				//legalitas
				$sql = 	"
					SELECT 
						p.namaPersyaratan, 
						l.noLegalitas,
						l.tanggalLegalitas,
						l.urlFile
					FROM
						dplega_009_legalitas".$dumbTable." l
					JOIN
						dplega_201_persyaratan p
					ON l.kodePersyaratan = p.kodePersyaratan
					WHERE
						l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array('color' => 'purple', 'icon' => 'file-text', 'size' => 'large', 'form' => 'text-icon', 'text' => $row['namaPersyaratan'])); 
							array_push($items, array('color' => '', 'icon' => '', 'size' => 'medium', 'form' => 'text', 'text' => $row['noLegalitas'])); 
							array_push($items, array('color' => '', 'icon' => '', 'size' => 'small', 'form' => 'text', 'text' => $row['tanggalLegalitas'])); 
							array_push($items, array('color' => '', 'icon' => '', 'size' => 'medium', 'form' => 'button', 'text' => $row['urlFile'])); 
							 
							array_push($itemsPack, array("set" => $items));

							unset($items); 
							$items = array();
						}
					}else{

						$sql = 	"
							SELECT 
								namaPersyaratan
							FROM
								dplega_000_lembaga".$dumbTable." l
							JOIN
								dplega_201_persyaratan p ON l.kodeBentukLembaga = p.kodeBentukLembaga
							WHERE
								l.noRegistrasi = '".$noreg."'
						";

						$result = mysqli_query($gate, $sql);
						if($result){
							if(mysqli_num_rows($result) > 0) {
								while($row = mysqli_fetch_assoc($result)) {
									array_push($items, array('color' => 'purple', 'icon' => 'file-text', 'size' => 'large', 'form' => 'text-icon', 'text' => $row['namaPersyaratan'])); 
									array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text', 'text' => '(Data tidak ditemukan)')); 
									array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'button', 'text' => ''));
									array_push($itemsPack, array("set" => $items));

									unset($items); 
									$items = array();
								}
							}else{
								array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text-icon', 'text' => '(Data tidak ditemukan)')); 
								array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text', 'text' => '')); 
								array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text', 'text' => '')); 

								array_push($itemsPack, array("set" => $items));

								unset($items); 
								$items = array();
							}
						}
						
					}

					array_push($group, array(
						"groupId" => "legalitas", "groupName" => "Legalitas", "group" => "card", "type" => "table-list",
						"items" => $itemsPack
					));

					unset($itemsPack); 
					$itemsPack = array();
				}

				
				//sejarah
				$sql = 	"
					SELECT 
						deskripsi, 
						tanggalDidirikan,
						kepemilikan,
						statusSertifikasi,
						CONCAT_WS(' ', luasTanah, satuanLuasTanah) as `luasTanah`,
						CONCAT_WS(' ', luasBangunan, SatuanLuasBangunan) as `luasBangunan`,
						kondisiBangunan,
						jumlahBangunan,
						statusSarana,
						statusStrukturKepengurusan,
						bahasaPengantar,
						statusSensus,
						statusBantuanPemerintah,
						kondisiGeografis,
						potensiWilayah,
						jenisWilayah,
						catatanLain
					FROM
						dplega_001_sejarah".$dumbTable." l
					WHERE
					l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array("label" => 'Sejarah singkat', "text" => $row['deskripsi'])); 
							array_push($items, array("label" => 'Tanggal didirikan', "text" => $row['tanggalDidirikan'])); 
							array_push($items, array("label" => 'Kepemilikan', "text" => $row['kepemilikan'])); 
							array_push($items, array("label" => 'Sertifikasi', "text" => $row['statusSertifikasi'])); 
							array_push($items, array("label" => 'Luas tanah', "text" => $row['luasTanah'])); 
							array_push($items, array("label" => 'Luas bangunan', "text" => $row['luasBangunan'])); 
							array_push($items, array("label" => 'Kondisi bangunan', "text" => $row['kondisiBangunan'])); 
							array_push($items, array("label" => 'Jumlah bangunan', "text" => $row['jumlahBangunan'])); 
							array_push($items, array("label" => 'Sarana / Prasarana', "text" => $row['statusSarana'])); 
							array_push($items, array("label" => 'Struktur organisasi', "text" => $row['statusStrukturKepengurusan'])); 
							array_push($items, array("label" => 'Bahasa pengantar', "text" => $row['bahasaPengantar'])); 
							array_push($items, array("label" => 'Sensus', "text" => $row['statusSarana'])); 
							array_push($items, array("label" => 'Bantuan pemerintah', "text" => $row['statusBantuanPemerintah'])); 
							array_push($items, array("label" => 'Kondisi geografis', "text" => $row['statusBantuanPemerintah'])); 
							array_push($items, array("label" => 'Potensi wilayah', "text" => $row['potensiWilayah'])); 
							array_push($items, array("label" => 'Jenis wilayah', "text" => $row['jenisWilayah'])); 
							array_push($items, array("label" => 'Catatan', "text" => $row['catatanLain'])); 
						}
					}else{
						array_push($items, array("label" => 'Sejarah singkat', "text" => '')); 
						array_push($items, array("label" => 'Tanggal didirikan', "text" => '')); 
						array_push($items, array("label" => 'Kepemilikan', "text" => '')); 
						array_push($items, array("label" => 'Sertifikasi', "text" => '')); 
						array_push($items, array("label" => 'Luas tanah', "text" => '')); 
						array_push($items, array("label" => 'Luas bangunan', "text" => '')); 
						array_push($items, array("label" => 'Kondisi bangunan', "text" => '')); 
						array_push($items, array("label" => 'Jumlah bangunan', "text" => '')); 
						array_push($items, array("label" => 'Sarana / Prasarana', "text" => '')); 
						array_push($items, array("label" => 'Struktur organisasi', "text" => '')); 
						array_push($items, array("label" => 'Bahasa pengantar', "text" => '')); 
						array_push($items, array("label" => 'Sensus', "text" => '')); 
						array_push($items, array("label" => 'Bantuan pemerintah', "text" => '')); 
						array_push($items, array("label" => 'Kondisi geografis', "text" => '')); 
						array_push($items, array("label" => 'Potensi wilayah', "text" => '')); 
						array_push($items, array("label" => 'Jenis wilayah', "text" => '')); 
						array_push($items, array("label" => 'Catatan', "text" => '')); 
					}

					array_push($group, array(
						"groupId" => "sejarah", "groupName" => "Sejarah", "group" => "card", "type" => "table",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}


				//kepengurusan
				$sql = 	"
					SELECT 
						penanggungJawab, 
						CONCAT_WS(' ', `alamat`, 'RT.',`noRt`, '/', 'RW.', `noRw`, `namaKelurahan`, `namaKecamatan`, `namaWilayah`, `namaProvinsi`) as alamat,
						noTelp,
						kewarganegaraan,
						CONCAT_WS(' ', tempatLahir, tanggalLahir) as `ttl`,
						jenisKelamin,
						agama,
						jabatanLain,
						pendidikan,
						kompetensi,
						catatan
					FROM
						dplega_002_kepengurusan".$dumbTable." l
					JOIN
						dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
					JOIN
						dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
					JOIN
						dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
					JOIN
						dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
					WHERE
					l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array("label" => 'Penanggung jawab', "text" => $row['penanggungJawab'])); 
							array_push($items, array("label" => 'Alamat', "text" => $row['alamat'])); 
							array_push($items, array("label" => 'Telp', "text" => $row['noTelp'])); 
							array_push($items, array("label" => 'Kewarganegaraan', "text" => $row['kewarganegaraan'])); 
							array_push($items, array("label" => 'Tempat, tanggal lahir', "text" => $row['ttl'])); 
							array_push($items, array("label" => 'Jenis kelamin', "text" => $row['jenisKelamin'])); 
							array_push($items, array("label" => 'Agama', "text" => $row['agama'])); 
							array_push($items, array("label" => 'Jabatan lain', "text" => $row['jabatanLain'])); 
							array_push($items, array("label" => 'Pendidikan', "text" => $row['pendidikan'])); 
							array_push($items, array("label" => 'Kompetensi', "text" => $row['kompetensi'])); 
							array_push($items, array("label" => 'Catatan', "text" => $row['catatanLain'])); 
						}
					}else{
						array_push($items, array("label" => 'Penanggung jawab', "text" => '')); 
						array_push($items, array("label" => 'Alamat', "text" => '')); 
						array_push($items, array("label" => 'Telp', "text" => '')); 
						array_push($items, array("label" => 'Kewarganegaraan', "text" => '')); 
						array_push($items, array("label" => 'Tempat, tanggal lahir', "text" => '')); 
						array_push($items, array("label" => 'Jenis kelamin', "text" => '')); 
						array_push($items, array("label" => 'Agama', "text" => '')); 
						array_push($items, array("label" => 'Jabatan lain', "text" => '')); 
						array_push($items, array("label" => 'Pendidikan', "text" => '')); 
						array_push($items, array("label" => 'Kompetensi', "text" => '')); 
						array_push($items, array("label" => 'Catatan', "text" => '')); 
					}

					array_push($group, array(
						"groupId" => "kepengurusan", "groupName" => "Kepengurusan", "group" => "card", "type" => "table",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}


				//kegiatan usaha
				$sql = 	"
					SELECT 
						namaUsaha, 
						detailUsaha,
						jenisUsaha,
						jumlahPekerja,
						catatan
					FROM
						dplega_003_usaha".$dumbTable." l
					WHERE
					l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array("label" => 'Nama usaha', "text" => $row['namaUsaha'])); 
							array_push($items, array("label" => 'Detail usaha', "text" => $row['detailUsaha'])); 
							array_push($items, array("label" => 'Jenis usaha', "text" => $row['jenisUsaha'])); 
							array_push($items, array("label" => 'Jumlah pekerja', "text" => $row['jumlahPekerja'])); 
							array_push($items, array("label" => 'Catatan', "text" => $row['catatanLain'])); 
						}
					}else{
						array_push($items, array("label" => 'Nama usaha', "text" => '')); 
						array_push($items, array("label" => 'Detail usaha', "text" => '')); 
						array_push($items, array("label" => 'Jenis usaha', "text" => '')); 
						array_push($items, array("label" => 'Jumlah pekerja', "text" => '')); 
						array_push($items, array("label" => 'Catatan', "text" => '')); 
					}

					array_push($group, array(
						"groupId" => "kegiatan-usaha", "groupName" => "Kegiatan usaha", "group" => "card", "type" => "table",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}


				//koleksi
				$sql = 	"
					SELECT 
						judulKoleksi
					FROM
						dplega_005_koleksi".$dumbTable." l
					WHERE
						l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array('color' => 'sky', 'icon' => 'book', 'text' => $row['judulKoleksi'])); 
						}
					}else{
						array_push($items, array('color' => '', 'icon' => '', 'text' => '')); 
					}

					array_push($group, array(
						"groupId" => "koleksi", "groupName" => "Koleksi", "group" => "card", "type" => "list",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}

				//prestasi
				$sql = 	"
					SELECT 
						deskripsi
					FROM
						dplega_006_prestasi".$dumbTable." l
					WHERE
						l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array('color' => 'yellow', 'icon' => 'trophy', 'text' => $row['deskripsi'])); 
						}
					}else{
						array_push($items, array('color' => '', 'icon' => '', 'text' => '')); 
					}

					array_push($group, array(
						"groupId" => "prestasi", "groupName" => "Prestasi", "group" => "card", "type" => "list",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}


				//visualisasi sarana
				$sql = 	"
					SELECT 
						urlGambar,
						deskripsi
					FROM
						dplega_008_visualisasisarana".$dumbTable." l
					WHERE
						l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array('picture' => $row['urlGambar'], 'desc' => $row['deskripsi'])); 
						}
					}else{
						array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
						array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
						array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
						array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
					}

					array_push($group, array(
						"groupId" => "saranaPrasarana", "groupName" => "Sarana / prasarana", "group" => "img-viewer", "type" => "",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}

				//visualisasi usaha
				$sql = 	"
					SELECT 
						urlGambar,
						deskripsi
					FROM
						dplega_007_visualisasiusaha".$dumbTable." l
					WHERE
						l.noRegistrasi = '".$noreg."'
				";

				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							array_push($items, array('picture' => $row['urlGambar'], 'desc' => $row['deskripsi'])); 
						}
					}else{
						array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
						array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
						array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
						array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
					}

					array_push($group, array(
						"groupId" => "kegiatanUsaha", "groupName" => "Kegiatan usaha", "group" => "img-viewer", "type" => "",
						"items" => $items
					));

					unset($items); 
					$items = array();
				}

				//end
			}

			closeGate($gate);

			$option = array(
				array("selector" => "download-card", "icon" => "download", "label" => "Unduh (.pdf)"),
				array("selector" => "verification-card", "icon" => "check", "label" => "Verifikasi"),
				array("selector" => "edit-card", "icon" => "pencil", "label" => "Ubah profil"),
				array("selector" => "delete-card", "icon" => "trash", "label" => "Hapus lembaga")
			);

			$record = array(
				"profile" => $profile,
				"detail"  => $group,
				"option"  => $option
			);

			$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => $record);
		}

		if($error == 1){
			//error state
			$resultList = array( "feedStatus" => "failed", "feedType" => $errorType, "feedMessage" => $errorMsg);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}


	function getFetchLembagaan($data){
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
		$dumbTable  = "";
		$noreg 		= $data['refferences'];

		/* open connection */ 
		$gate = openGate();
		if($gate){		
			// connection = true
			//checking section
			$sql 	= " SELECT noRegistrasi FROM dplega_000_lembaga WHERE noRegistrasi = '".$noreg."'";
			$result = mysqli_query($gate, $sql);
			if(mysqli_num_rows($result) > 0) {
				$dumbTable = "";
			}else{
				$sql 	= " SELECT noRegistrasi FROM dplega_000_lembaga_temp WHERE noRegistrasi = '".$noreg."'";
				$result = mysqli_query($gate, $sql);
				if(mysqli_num_rows($result) > 0) {
					$dumbTable = "_temp";
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, data tidak dikenal!";
				}
			}


			$record    		= array(); 
			$fetch 	   		= array();  
			$kelembagaan  	= array();  
			$legalitas    	= array();  
			$sejarah   		= array();  
			$kepengurusan   = array();  
			$usaha     		= array();  
			$hirarki 		= array();  
			$koleksi 		= array();  
			$prestasi 		= array(); 

			if($error != 1){
				//kelembagaan
				$sql = 	"
					SELECT 
						l.`noRegistrasi`, 
						l.`nama`, 
						l.`alamat`, 
						l.`noRt`, 
						l.`noRw`, 
						l.`kodeKelurahan`, 
						`namaKelurahan`, 
						l.`kodeKecamatan`, 
						`namaKecamatan`, 
						l.`kodeWilayah`, 
						`namaWilayah`, 
						l.`kodeProvinsi`, 
						`namaProvinsi`,  
						l.`noTelp`, 
						l.`email`, 
						l.`mediaSosial`, 
						l.`kodeBentukLembaga`, 
						l.`kodeBidangGerak`, 
						l.`jumlahPengurus`, 
						l.`noNpwp`, 
						l.`visiLembaga`, 
						l.`misiLembaga`, 
						l.`organisasiAfiliasi`, 
						l.`catatanLain`, 
						l.`urlGambarLogo`
					FROM
						dplega_000_lembaga".$dumbTable." l
					JOIN
						dplega_200_bentuklembaga b ON l.kodeBentukLembaga = b.kodeBentukLembaga
					JOIN
						dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
					JOIN
						dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
					JOIN
						dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
					JOIN
						dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
					WHERE
						l.noRegistrasi = '".$noreg."'
				";
				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							$kelembagaan = array(
										"noRegistrasi"   	=> $row['noRegistrasi'],
										"nama" 				=> $row['nama'],
										"alamat" 			=> $row['alamat'],
										"noRt" 				=> $row['noRt'],
										"noRw" 				=> $row['noRw'],
										"kodeKelurahan"		=> $row['kodeKelurahan'],
										"namaKelurahan"		=> $row['namaKelurahan'],
										"kodeKecamatan"		=> $row['kodeKecamatan'],
										"namaKecamatan"		=> $row['namaKecamatan'],
										"kodeWilayah"		=> $row['kodeWilayah'],
										"namaWilayah"		=> $row['namaWilayah'],
										"kodeProvinsi"		=> $row['kodeProvinsi'],
										"namaProvinsi"		=> $row['namaProvinsi'],
										"noTelp"			=> $row['noTelp'],
										"email"				=> $row['email'],
										"mediaSosial"		=> $row['mediaSosial'],
										"kodeBentukLembaga"	=> $row['kodeBentukLembaga'],
										"kodeBidangGerak"	=> $row['kodeBidangGerak'],
										"jumlahPengurus"	=> $row['jumlahPengurus'],
										"noNpwp"			=> $row['noNpwp'],
										"visiLembaga"		=> $row['visiLembaga'],
										"misiLembaga"		=> $row['misiLembaga'],
										"organisasiAfiliasi"=> $row['organisasiAfiliasi'],
										"catatanLain"		=> $row['catatanLain'],
										"urlGambarLogo"		=> $row['urlGambarLogo']
							);
						}
					}
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke serverSS!";
				}	


				//sejarah
				$sql = 	"
					SELECT 
						`noRegistrasi`, 
						`deskripsi`, 
						`tanggalDidirikan`, 
						`kepemilikan`, 
						`statusTanah`, 
						`statusSertifikasi`, 
						`luasTanah`, 
						`satuanLuasTanah`, 
						`luasBangunan`, 
						`satuanLuasBangunan`, 
						`kondisiBangunan`, 
						`JumlahBangunan`, 
						`statusSarana`, 
						`statusStrukturKepengurusan`, 
						`urlGambarStrukturKepengurusan`, 
						`bahasaPengantar`, 
						`statusSensus`, 
						`statusBantuanPemerintah`, 
						`kondisiGeografis`, 
						`potensiWilayah`, 
						`jenisWilayah`, 
						`catatanLain`
					FROM
						dplega_001_sejarah".$dumbTable." l
					WHERE
						l.noRegistrasi = '".$noreg."'
				";
				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							$sejarah = array(
										"noRegistrasi"   				=> $row['noRegistrasi'],
										"deskripsi" 					=> $row['deskripsi'],
										"tanggalDidirikan" 				=> $row['tanggalDidirikan'],
										"kepemilikan" 					=> $row['kepemilikan'],
										"statusTanah" 					=> $row['statusTanah'],
										"statusSertifikasi"				=> $row['statusSertifikasi'],
										"luasTanah"						=> $row['luasTanah'],
										"satuanLuasTanah"				=> $row['satuanLuasTanah'],
										"luasBangunan"					=> $row['luasBangunan'],
										"satuanLuasBangunan"			=> $row['satuanLuasBangunan'],
										"kondisiBangunan"				=> $row['kondisiBangunan'],
										"JumlahBangunan"				=> $row['JumlahBangunan'],
										"statusSarana"					=> $row['statusSarana'],
										"statusStrukturKepengurusan"	=> $row['statusStrukturKepengurusan'],
										"urlGambarStrukturKepengurusan"	=> $row['urlGambarStrukturKepengurusan'],
										"bahasaPengantar"				=> $row['bahasaPengantar'],
										"statusSensus"					=> $row['statusSensus'],
										"statusBantuanPemerintah"		=> $row['statusBantuanPemerintah'],
										"kondisiGeografis"				=> $row['kondisiGeografis'],
										"potensiWilayah"				=> $row['potensiWilayah'],
										"jenisWilayah"					=> $row['jenisWilayah'],
										"catatanLain"					=> $row['catatanLain']
							);
						}
					}
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke serverSS!";
				}


				//kepengurusan
				$sql = 	"
					SELECT 
						l.`noRegistrasi`, 
						l.`penanggungJawab`, 
						l.`jabatan`, 
						l.`alamat`, 
						l.`noRt`, 
						l.`noRw`, 
						`namaKelurahan`, 
						l.`kodeKelurahan`, 
						`namaKecamatan`, 
						l.`kodeKecamatan`, 
						`namaWilayah`, 
						l.`kodeWilayah`, 
						`namaProvinsi`, 
						l.`kodeProvinsi`, 
						l.`noTelp`, 
						l.`kewarganegaraan`, 
						l.`tempatLahir`, 
						l.`tanggalLahir`, 
						l.`jenisKelamin`, 
						l.`agama`, 
						l.`jabatanLain`, 
						l.`pendidikan`, 
						l.`kompetensi`, 
						l.`catatan`
					FROM
						dplega_002_kepengurusan".$dumbTable." l
					JOIN
						dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
					JOIN
						dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
					JOIN
						dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
					JOIN
						dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
					WHERE
						l.noRegistrasi = '".$noreg."'
				";
				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							$kepengurusan = array(
										"noRegistrasi"   	=> $row['noRegistrasi'],
										"penanggungJawab" 	=> $row['penanggungJawab'],
										"jabatan" 			=> $row['jabatan'],
										"alamat" 			=> $row['alamat'],
										"noRt" 				=> $row['noRt'],
										"noRw"				=> $row['noRw'],
										"namaKelurahan"		=> $row['namaKelurahan'],
										"kodeKelurahan"		=> $row['kodeKelurahan'],
										"namaKecamatan"		=> $row['namaKecamatan'],
										"kodeKecamatan"		=> $row['kodeKecamatan'],
										"namaWilayah"		=> $row['namaWilayah'],
										"kodeWilayah"		=> $row['kodeWilayah'],
										"namaProvinsi"		=> $row['namaProvinsi'],
										"kodeProvinsi"		=> $row['kodeProvinsi'],
										"noTelp"			=> $row['noTelp'],
										"kewarganegaraan"	=> $row['kewarganegaraan'],
										"tempatLahir"		=> $row['tempatLahir'],
										"tanggalLahir"		=> $row['tanggalLahir'],
										"jenisKelamin"		=> $row['jenisKelamin'],
										"agama"				=> $row['agama'],
										"jabatanLain"		=> $row['jabatanLain'],
										"pendidikan"		=> $row['pendidikan'],
										"kompetensi"		=> $row['kompetensi'],
										"catatan"			=> $row['catatan']
							);
						}
					}
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke serverSS!";
				}	


				//kegiatan usaha
				$sql = 	"
					SELECT 
						`noRegistrasi`, 
						`namaUsaha`, 
						`jenisUsaha`, 
						`detailUsaha`, 
						`jumlahPekerja`, 
						`catatan`
					FROM
						dplega_003_usaha".$dumbTable." l
					WHERE
						l.noRegistrasi = '".$noreg."'
				";
				$result = mysqli_query($gate, $sql);
				if($result){
					if(mysqli_num_rows($result) > 0) {
						// output data of each row 
						while($row = mysqli_fetch_assoc($result)) {
							$usaha = array(
										"noRegistrasi"  => $row['noRegistrasi'],
										"namaUsaha" 	=> $row['namaUsaha'],
										"jenisUsaha" 	=> $row['jenisUsaha'],
										"detailUsaha"	=> $row['detailUsaha'],
										"jumlahPekerja"	=> $row['jumlahPekerja'],
										"catatan"		=> $row['catatan']
							);
						}
					}
				}else{
					//error state
					$error		= 1;
					$errorType  = "danger";
					$errorMsg	= "Terjadi kesalahan, tidak dapat terhubung ke serverSS!";
				}
				
			//end		
			}

			
			// if($error != 1){
				
			// 	//legalitas
			// 	$sql = 	"
			// 		SELECT 
			// 			p.namaPersyaratan, 
			// 			l.noLegalitas,
			// 			l.tanggalLegalitas,
			// 			l.urlFile
			// 		FROM
			// 			dplega_009_legalitas".$dumbTable." l
			// 		JOIN
			// 			dplega_201_persyaratan p
			// 		ON l.kodePersyaratan = p.kodePersyaratan
			// 		WHERE
			// 			l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array('color' => 'purple', 'icon' => 'file-text', 'size' => 'large', 'form' => 'text-icon', 'text' => $row['namaPersyaratan'])); 
			// 				array_push($items, array('color' => '', 'icon' => '', 'size' => 'medium', 'form' => 'text', 'text' => $row['noLegalitas'])); 
			// 				array_push($items, array('color' => '', 'icon' => '', 'size' => 'small', 'form' => 'text', 'text' => $row['tanggalLegalitas'])); 
			// 				array_push($items, array('color' => '', 'icon' => '', 'size' => 'medium', 'form' => 'button', 'text' => $row['urlFile'])); 
							 
			// 				array_push($itemsPack, array("set" => $items));

			// 				unset($items); 
			// 				$items = array();
			// 			}
			// 		}else{

			// 			$sql = 	"
			// 				SELECT 
			// 					namaPersyaratan
			// 				FROM
			// 					dplega_000_lembaga".$dumbTable." l
			// 				JOIN
			// 					dplega_201_persyaratan p ON l.kodeBentukLembaga = p.kodeBentukLembaga
			// 				WHERE
			// 					l.noRegistrasi = '".$noreg."'
			// 			";

			// 			$result = mysqli_query($gate, $sql);
			// 			if($result){
			// 				if(mysqli_num_rows($result) > 0) {
			// 					while($row = mysqli_fetch_assoc($result)) {
			// 						array_push($items, array('color' => 'purple', 'icon' => 'file-text', 'size' => 'large', 'form' => 'text-icon', 'text' => $row['namaPersyaratan'])); 
			// 						array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text', 'text' => '(Data tidak ditemukan)')); 
			// 						array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'button', 'text' => ''));
			// 						array_push($itemsPack, array("set" => $items));

			// 						unset($items); 
			// 						$items = array();
			// 					}
			// 				}else{
			// 					array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text-icon', 'text' => '(Data tidak ditemukan)')); 
			// 					array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text', 'text' => '')); 
			// 					array_push($items, array('color' => '', 'icon' => '', 'size' => 'large', 'form' => 'text', 'text' => '')); 

			// 					array_push($itemsPack, array("set" => $items));

			// 					unset($items); 
			// 					$items = array();
			// 				}
			// 			}
						
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "legalitas", "groupName" => "Legalitas", "group" => "card", "type" => "table-list",
			// 			"items" => $itemsPack
			// 		));

			// 		unset($itemsPack); 
			// 		$itemsPack = array();
			// 	}

				
			// 	//sejarah
			// 	$sql = 	"
			// 		SELECT 
			// 			deskripsi, 
			// 			tanggalDidirikan,
			// 			kepemilikan,
			// 			statusSertifikasi,
			// 			CONCAT_WS(' ', luasTanah, satuanLuasTanah) as `luasTanah`,
			// 			CONCAT_WS(' ', luasBangunan, SatuanLuasBangunan) as `luasBangunan`,
			// 			kondisiBangunan,
			// 			jumlahBangunan,
			// 			statusSarana,
			// 			statusStrukturKepengurusan,
			// 			bahasaPengantar,
			// 			statusSensus,
			// 			statusBantuanPemerintah,
			// 			kondisiGeografis,
			// 			potensiWilayah,
			// 			jenisWilayah,
			// 			catatanLain
			// 		FROM
			// 			dplega_001_sejarah".$dumbTable." l
			// 		WHERE
			// 		l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array("label" => 'Sejarah singkat', "text" => $row['deskripsi'])); 
			// 				array_push($items, array("label" => 'Tanggal didirikan', "text" => $row['tanggalDidirikan'])); 
			// 				array_push($items, array("label" => 'Kepemilikan', "text" => $row['kepemilikan'])); 
			// 				array_push($items, array("label" => 'Sertifikasi', "text" => $row['statusSertifikasi'])); 
			// 				array_push($items, array("label" => 'Luas tanah', "text" => $row['luasTanah'])); 
			// 				array_push($items, array("label" => 'Luas bangunan', "text" => $row['luasBangunan'])); 
			// 				array_push($items, array("label" => 'Kondisi bangunan', "text" => $row['kondisiBangunan'])); 
			// 				array_push($items, array("label" => 'Jumlah bangunan', "text" => $row['jumlahBangunan'])); 
			// 				array_push($items, array("label" => 'Sarana / Prasarana', "text" => $row['statusSarana'])); 
			// 				array_push($items, array("label" => 'Struktur organisasi', "text" => $row['statusStrukturKepengurusan'])); 
			// 				array_push($items, array("label" => 'Bahasa pengantar', "text" => $row['bahasaPengantar'])); 
			// 				array_push($items, array("label" => 'Sensus', "text" => $row['statusSarana'])); 
			// 				array_push($items, array("label" => 'Bantuan pemerintah', "text" => $row['statusBantuanPemerintah'])); 
			// 				array_push($items, array("label" => 'Kondisi geografis', "text" => $row['statusBantuanPemerintah'])); 
			// 				array_push($items, array("label" => 'Potensi wilayah', "text" => $row['potensiWilayah'])); 
			// 				array_push($items, array("label" => 'Jenis wilayah', "text" => $row['jenisWilayah'])); 
			// 				array_push($items, array("label" => 'Catatan', "text" => $row['catatanLain'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array("label" => 'Sejarah singkat', "text" => '')); 
			// 			array_push($items, array("label" => 'Tanggal didirikan', "text" => '')); 
			// 			array_push($items, array("label" => 'Kepemilikan', "text" => '')); 
			// 			array_push($items, array("label" => 'Sertifikasi', "text" => '')); 
			// 			array_push($items, array("label" => 'Luas tanah', "text" => '')); 
			// 			array_push($items, array("label" => 'Luas bangunan', "text" => '')); 
			// 			array_push($items, array("label" => 'Kondisi bangunan', "text" => '')); 
			// 			array_push($items, array("label" => 'Jumlah bangunan', "text" => '')); 
			// 			array_push($items, array("label" => 'Sarana / Prasarana', "text" => '')); 
			// 			array_push($items, array("label" => 'Struktur organisasi', "text" => '')); 
			// 			array_push($items, array("label" => 'Bahasa pengantar', "text" => '')); 
			// 			array_push($items, array("label" => 'Sensus', "text" => '')); 
			// 			array_push($items, array("label" => 'Bantuan pemerintah', "text" => '')); 
			// 			array_push($items, array("label" => 'Kondisi geografis', "text" => '')); 
			// 			array_push($items, array("label" => 'Potensi wilayah', "text" => '')); 
			// 			array_push($items, array("label" => 'Jenis wilayah', "text" => '')); 
			// 			array_push($items, array("label" => 'Catatan', "text" => '')); 
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "sejarah", "groupName" => "Sejarah", "group" => "card", "type" => "table",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}


			// 	//kepengurusan
			// 	$sql = 	"
			// 		SELECT 
			// 			penanggungJawab, 
			// 			CONCAT_WS(' ', `alamat`, 'RT.',`noRt`, '/', 'RW.', `noRw`, `namaKelurahan`, `namaKecamatan`, `namaWilayah`, `namaProvinsi`) as alamat,
			// 			noTelp,
			// 			kewarganegaraan,
			// 			CONCAT_WS(' ', tempatLahir, tanggalLahir) as `ttl`,
			// 			jenisKelamin,
			// 			agama,
			// 			jabatanLain,
			// 			pendidikan,
			// 			kompetensi,
			// 			catatan
			// 		FROM
			// 			dplega_002_kepengurusan".$dumbTable." l
			// 		JOIN
			// 			dplega_100_provinsi p ON l.kodeProvinsi = p.kodeProvinsi
			// 		JOIN
			// 			dplega_101_wilayah w ON l.kodeWilayah = w.kodeWilayah
			// 		JOIN
			// 			dplega_102_kecamatan kc ON l.kodeKecamatan = kc.kodeKecamatan
			// 		JOIN
			// 			dplega_103_kelurahan kl ON l.kodeKelurahan = kl.kodeKelurahan
			// 		WHERE
			// 		l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array("label" => 'Penanggung jawab', "text" => $row['penanggungJawab'])); 
			// 				array_push($items, array("label" => 'Alamat', "text" => $row['alamat'])); 
			// 				array_push($items, array("label" => 'Telp', "text" => $row['noTelp'])); 
			// 				array_push($items, array("label" => 'Kewarganegaraan', "text" => $row['kewarganegaraan'])); 
			// 				array_push($items, array("label" => 'Tempat, tanggal lahir', "text" => $row['ttl'])); 
			// 				array_push($items, array("label" => 'Jenis kelamin', "text" => $row['jenisKelamin'])); 
			// 				array_push($items, array("label" => 'Agama', "text" => $row['agama'])); 
			// 				array_push($items, array("label" => 'Jabatan lain', "text" => $row['jabatanLain'])); 
			// 				array_push($items, array("label" => 'Pendidikan', "text" => $row['pendidikan'])); 
			// 				array_push($items, array("label" => 'Kompetensi', "text" => $row['kompetensi'])); 
			// 				array_push($items, array("label" => 'Catatan', "text" => $row['catatanLain'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array("label" => 'Penanggung jawab', "text" => '')); 
			// 			array_push($items, array("label" => 'Alamat', "text" => '')); 
			// 			array_push($items, array("label" => 'Telp', "text" => '')); 
			// 			array_push($items, array("label" => 'Kewarganegaraan', "text" => '')); 
			// 			array_push($items, array("label" => 'Tempat, tanggal lahir', "text" => '')); 
			// 			array_push($items, array("label" => 'Jenis kelamin', "text" => '')); 
			// 			array_push($items, array("label" => 'Agama', "text" => '')); 
			// 			array_push($items, array("label" => 'Jabatan lain', "text" => '')); 
			// 			array_push($items, array("label" => 'Pendidikan', "text" => '')); 
			// 			array_push($items, array("label" => 'Kompetensi', "text" => '')); 
			// 			array_push($items, array("label" => 'Catatan', "text" => '')); 
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "kepengurusan", "groupName" => "Kepengurusan", "group" => "card", "type" => "table",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}


			// 	//kegiatan usaha
			// 	$sql = 	"
			// 		SELECT 
			// 			namaUsaha, 
			// 			detailUsaha,
			// 			jenisUsaha,
			// 			jumlahPekerja,
			// 			catatan
			// 		FROM
			// 			dplega_003_usaha".$dumbTable." l
			// 		WHERE
			// 		l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array("label" => 'Nama usaha', "text" => $row['namaUsaha'])); 
			// 				array_push($items, array("label" => 'Detail usaha', "text" => $row['detailUsaha'])); 
			// 				array_push($items, array("label" => 'Jenis usaha', "text" => $row['jenisUsaha'])); 
			// 				array_push($items, array("label" => 'Jumlah pekerja', "text" => $row['jumlahPekerja'])); 
			// 				array_push($items, array("label" => 'Catatan', "text" => $row['catatanLain'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array("label" => 'Nama usaha', "text" => '')); 
			// 			array_push($items, array("label" => 'Detail usaha', "text" => '')); 
			// 			array_push($items, array("label" => 'Jenis usaha', "text" => '')); 
			// 			array_push($items, array("label" => 'Jumlah pekerja', "text" => '')); 
			// 			array_push($items, array("label" => 'Catatan', "text" => '')); 
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "kegiatan-usaha", "groupName" => "Kegiatan usaha", "group" => "card", "type" => "table",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}


			// 	//koleksi
			// 	$sql = 	"
			// 		SELECT 
			// 			judulKoleksi
			// 		FROM
			// 			dplega_005_koleksi".$dumbTable." l
			// 		WHERE
			// 			l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array('color' => 'sky', 'icon' => 'book', 'text' => $row['judulKoleksi'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array('color' => '', 'icon' => '', 'text' => '')); 
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "koleksi", "groupName" => "Koleksi", "group" => "card", "type" => "list",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}

			// 	//prestasi
			// 	$sql = 	"
			// 		SELECT 
			// 			deskripsi
			// 		FROM
			// 			dplega_006_prestasi".$dumbTable." l
			// 		WHERE
			// 			l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array('color' => 'yellow', 'icon' => 'trophy', 'text' => $row['deskripsi'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array('color' => '', 'icon' => '', 'text' => '')); 
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "prestasi", "groupName" => "Prestasi", "group" => "card", "type" => "list",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}


			// 	//visualisasi sarana
			// 	$sql = 	"
			// 		SELECT 
			// 			urlGambar,
			// 			deskripsi
			// 		FROM
			// 			dplega_008_visualisasisarana".$dumbTable." l
			// 		WHERE
			// 			l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array('picture' => $row['urlGambar'], 'desc' => $row['deskripsi'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
			// 			array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
			// 			array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
			// 			array_push($items, array('picture' => 'saranaPrasarana/picture.png', 'desc' => ''));
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "saranaPrasarana", "groupName" => "Sarana / prasarana", "group" => "img-viewer", "type" => "",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}

			// 	//visualisasi usaha
			// 	$sql = 	"
			// 		SELECT 
			// 			urlGambar,
			// 			deskripsi
			// 		FROM
			// 			dplega_007_visualisasiusaha".$dumbTable." l
			// 		WHERE
			// 			l.noRegistrasi = '".$noreg."'
			// 	";

			// 	$result = mysqli_query($gate, $sql);
			// 	if($result){
			// 		if(mysqli_num_rows($result) > 0) {
			// 			// output data of each row 
			// 			while($row = mysqli_fetch_assoc($result)) {
			// 				array_push($items, array('picture' => $row['urlGambar'], 'desc' => $row['deskripsi'])); 
			// 			}
			// 		}else{
			// 			array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
			// 			array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
			// 			array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
			// 			array_push($items, array('picture' => 'kegiatanUsaha/picture.png', 'desc' => '')); 
			// 		}

			// 		array_push($group, array(
			// 			"groupId" => "kegiatanUsaha", "groupName" => "Kegiatan usaha", "group" => "img-viewer", "type" => "",
			// 			"items" => $items
			// 		));

			// 		unset($items); 
			// 		$items = array();
			// 	}

			// 	//end
			// }

			closeGate($gate);

			$record = array(
				"kelembagaan" 	=> $kelembagaan,
				"sejarah" 		=> $sejarah,
				"kepengurusan" 	=> $kepengurusan,
				"usaha" 		=> $usaha
			);

			$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => $record);
		}

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
			if($data['keyword'] ==''){
				$sql = 	
				"SELECT b.judulKoleksi, a.nama, c.namaBentukLembaga
				FROM dplega_005_koleksi_temp as b 
				JOIN  dplega_000_lembaga_temp as a ON b.noRegistrasi = a.noRegistrasi
				JOIN dplega_200_bentuklembaga as c	ON c.kodeBentukLembaga = a.kodeBentukLembaga";
			}else{
				$sql = 	
				"
				SELECT * FROM dplega_005_koleksi_temp WHERE noRegistrasi = '".$data['keyword']."'
				";
			}
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array(); 
				if(mysqli_num_rows($result) > 0) {
					// output data of each row 
					while($row = mysqli_fetch_assoc($result)) {
						if($data['keyword'] == ''){
							$fetch = array(
									"title"   		=> $row['judulKoleksi'],
									"group" 		=> $row['namaBentukLembaga'],
									"owner"		 	=> $row['nama']
								);
						}else{

						$fetch = array(
									"idData"   		=> $row['idData'],
									"noreg" 		=> $row['noRegistrasi'],
									"jenisKoleksi" 	=> $row['jenisKoleksi'],
									"judulKoleksi" 	=> $row['judulKoleksi'],
									"deskripsi"		=> $row['deskripsi']
								);
						}
						
						array_push($record, $fetch); 
						unset($fetch); 
						$fetch = array();
					}
					
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => $record);
				}else {
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
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

	function getPrestasiSection($data){
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
			if(isset($data['keyword']) && $data['keyword'] != ""){
				$sql = 
				"
					SELECT 
						p.idData,
						p.noRegistrasi,
						l.nama,
						p.deskripsi 
					FROM 
						dplega_006_prestasi_temp p
					JOIN
						dplega_000_lembaga_temp l
					ON 	p.noRegistrasi = l.noRegistrasi
					WHERE 
						p.deskripsi like '%".$data['keyword']."%'
					OR
						l.nama like '%".$data['keyword']."%'
				";
			}else{
				$sql = 
				"
					SELECT 
						p.idData,
						p.noRegistrasi,
						l.nama,
						p.deskripsi 
					FROM 
						dplega_006_prestasi_temp p
					JOIN
						dplega_000_lembaga_temp l
					ON 	p.noRegistrasi = l.noRegistrasi
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
							"idData"   		=> $row['idData'],
							"noreg" 		=> $row['noRegistrasi'],
							"nama" 			=> $row['nama'],
							"deskripsi"		=> $row['deskripsi']
						);
				
						array_push($record, $fetch); 
						unset($fetch); 
						$fetch = array();
					}
					
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => $record);
				}else {
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
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

	function getKoleksi($data){
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
			if($data['keyword'] ==''){
				$sql = 	
				"SELECT b.judulKoleksi, a.nama, c.namaBentukLembaga
				FROM dplega_005_koleksi_temp as b 
				JOIN  dplega_000_lembaga_temp as a ON b.noRegistrasi = a.noRegistrasi
				JOIN dplega_200_bentuklembaga as c	ON c.kodeBentukLembaga = a.kodeBentukLembaga";
			}else{
			$sql = 	
				"SELECT b.judulKoleksi, a.nama, c.namaBentukLembaga
				FROM dplega_005_koleksi_temp as b 
				JOIN  dplega_000_lembaga_temp as a ON b.noRegistrasi = a.noRegistrasi
				JOIN dplega_200_bentuklembaga as c	ON c.kodeBentukLembaga = a.kodeBentukLembaga
				WHERE b.judulKoleksi like '%".$data['keyword']."%'
				";
			}
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array(); 
				if(mysqli_num_rows($result) > 0) {
					// output data of each row 
					while($row = mysqli_fetch_assoc($result)) {
						if($data['keyword'] == ''){
							$fetch = array(
									"title"   		=> $row['judulKoleksi'],
									"group" 		=> $row['namaBentukLembaga'],
									"owner"		 	=> $row['nama']
								);
						}else{

						$fetch = array(
									"title"   		=> $row['judulKoleksi'],
									"group" 		=> $row['namaBentukLembaga'],
									"owner"		 	=> $row['nama']
								);
						}
						
						array_push($record, $fetch); 
						unset($fetch); 
						$fetch = array();
					}
					
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => $record);
				}else {
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
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
					
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data ditemukan!", "feedData" => array($package));
				}else {
					$resultList = array( "feedStatus" => "success", "feedMessage" => "Data tidak ditemukan!", "feedData" => null);
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

	function createPrestasiSection($target, $data){
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
						$sql = " INSERT INTO dplega_006_prestasi_temp
							(
								noRegistrasi,
								deskripsi,
								createdBy
							)
							VALUES
							(
								'".$data['noreg']."',
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

	function deletePrestasiSection($target, $data){
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

				$sql = "DELETE FROM dplega_006_prestasi_temp WHERE idData ='".$data['pId']."'";
				
					
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