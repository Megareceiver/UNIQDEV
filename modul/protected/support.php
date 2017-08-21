<?php 
	require_once('protected/config.php');	
	function getProfile($tokenUser){
		/* initial condition */	
		$token 		= "";
		$username   = "";
		$nama 			 = "";
		$alamat 		 = "";
		$telp 			 = "";
		$email 			 = "";
		$bentuk_lembaga  = "";
		$bidang_gerak 	 = "";
		$jumlah_pengurus = "?";
		$prestasi 		 = "";
		$sejarah		 = "";
		$visi 			 = "";
		$misi 			 = "";
		$tgl_pendirian 	 = "";
		$penanggungjawab = "";
		$jabatan 		 = "";
		$afiliasi 		 = "";
		$nama_usaha 	 = "";
		$jenis_usaha 	 = "";
		$jenis_usaha 	 = "";
		$detail_usaha 	 = "";
		$wilayah		 = "Kota Bandung";
						
		$resultList = array();
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
			
			$token 		= (isset($_SESSION["token"]) 	? $_SESSION["token"] 	: '');
			$username 	= (isset($_SESSION["username"]) ? $_SESSION["username"] : '');
		}
			
		$gate = openGate('dplega');
		if($gate){			
			$sql = 	"SELECT 
						l.nama as nama,
						l.avatar as avatar,
						l.banner,
						l.detail as detail
					FROM 
						lembaga l
					WHERE
						l.active = '1'
					AND l.token = '".$tokenUser."'
					LIMIT 1";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						
						/* init for post access */
						unset($fetch); $fetch = array();
						$access = array();
						
						$detail = $row['detail'];
						
						$temp 			 = explode(",", $detail);
						for($loop=0;$loop<count($temp);$loop++){
							$tempDetail = explode(":",$temp[$loop]);
							switch(trim($tempDetail[0])){
								case 'alamat'			: $alamat 			= $tempDetail[1]; break;
								case 'telp'				: $telp 			= $tempDetail[1]; break;
								case 'email'			: $email 			= $tempDetail[1]; break;
								case 'bentuk_lembaga'	: $bentuk_lembaga 	= $tempDetail[1]; break;
								case 'bidang_gerak'		: $bidang_gerak 	= $tempDetail[1]; break;
								case 'jumlah_pengurus'	: (trim($tempDetail[1])  != "" ? $jumlah_pengurus = $tempDetail[1] : $jumlah_pengurus = "?"); break;
								case 'prestasi'			: $prestasi 		= $tempDetail[1]; break;
								case 'sejarah'			: $sejarah 			= $tempDetail[1]; break;
								case 'visi'				: $visi 			= $tempDetail[1]; break;
								case 'misi'				: $misi 			= $tempDetail[1]; break;
								case 'tgl_pendirian'	: $tgl_pendirian 	= $tempDetail[1]; break;
								case 'penanggungjawab'	: $penanggungjawab 	= $tempDetail[1]; break;
								case 'jabatan'			: $jabatan 			= $tempDetail[1]; break;
								case 'afiliasi'			: $afiliasi 		= $tempDetail[1]; break;
								case 'nama_usaha'		: $nama_usaha 		= $tempDetail[1]; break;
								case 'jenis_usaha'		: $jenis_usaha 		= $tempDetail[1]; break;
								case 'detail_usaha'		: $detail_usaha 	= $tempDetail[1]; break;
								case 'wilayah'			: $wilayah 			= $tempDetail[1]; break;
							}
						}
						
						$nama 			 = $row['nama'];
						$avatar 		 = $row['avatar'];
						$banner 		 = $row['banner'];
						
						
						$resultList = 	array(
										"name" 	   			=> $nama,
										"avatar" 	   		=> $avatar,
										"alamat" 		  	=> $alamat,
										"banner" 		  	=> $banner,
										"telp" 	  		    => $telp,
										"email"  		    => $email,
										"bentuk_lembaga" 	=> $bentuk_lembaga,
										"bidang_gerak"		=> $bidang_gerak,
										"jumlah_pengurus"	=> $jumlah_pengurus,
										"prestasi"		    => $prestasi,
										"sejarah"			=> $sejarah,
										"visi"     			=> $visi,
										"misi"  			=> $misi,
										"tgl_pendirian"		=> $tgl_pendirian,
										"penanggungjawab"	=> $penanggungjawab,
										"jabatan"		   	=> $jabatan,
										"afiliasi"		   	=> $afiliasi,
										"nama_usaha"		=> $nama_usaha,
										"jenis_usaha"		=> $jenis_usaha,
										"detail_usaha"  	=> $detail_usaha,
										"wilayah"			=> $wilayah
										);						
						
					}
				}
			}			
				
			closeGate($gate);
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}
	
	function getLembaga(){
		/* initial condition */	
		$token 		= "";
		$username   = "";	
		$resultList = array();
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
			
			$token 		= (isset($_SESSION["token"]) 	? $_SESSION["token"] 	: '');
			$username 	= (isset($_SESSION["username"]) ? $_SESSION["username"] : '');
		}
			
		$gate = openGate('dplega');
		if($gate){	
			$sql = 	"SELECT 
						l.token as id,
						l.nama as name,
						l.avatar as avatar
					FROM 
						lembaga l
					ORDER BY 
						l.nama ASC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					
					while($row = mysqli_fetch_assoc($result)) {
						
						unset($fetch); $fetch = array();
						
						$fetch = 	array(
										"id" 	   => $row['id'],
										"name" 	   => $row['name'],
										"avatar"   => $row['avatar']
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
	
	function findData($keyword){
		/* initial condition */	
		$token 		= "";
		$username   = "";	
		$resultList = array();
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
			
			$token 		= (isset($_SESSION["token"]) 	? $_SESSION["token"] 	: '');
			$username 	= (isset($_SESSION["username"]) ? $_SESSION["username"] : '');
		}
			
		$gate = openGate('dplega');
		if($gate){	
			$sql = 	"SELECT 
						l.token as id,
						l.nama as name,
						l.avatar as avatar
					FROM 
						lembaga l
					WHERE
						l.nama LIKE '%".$keyword."%'
					ORDER BY 
						l.nama ASC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				if (mysqli_num_rows($result) > 0) {
					
					while($row = mysqli_fetch_assoc($result)) {
						
						unset($fetch); $fetch = array();
						
						$fetch = 	array(
										"id" 	   => $row['id'],
										"name" 	   => $row['name'],
										"avatar"   => $row['avatar']
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