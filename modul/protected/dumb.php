<?php 
	if (session_status() == PHP_SESSION_NONE) { session_start(); }
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
		
		switch($target){
			case "f451" : $resultList = getBackupFiles(); break;
			default	    : $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan fatal, proses dibatalkan!", "feedData" => array()); break;
		}
		
		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function getBackupFiles(){
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
				l.idData as `id`,
				l.namaFile as `caption`,
				u.nama as `createdBy`,
				l.createdDate
			 FROM
				dplega_920_backuphistory l 
             JOIN 
             	dplega_910_user u
             ON l.createdBy = u.username
			 ORDER BY createdDate DESC";
						
			$result = mysqli_query($gate, $sql);
			if($result){
				$record    = array();  
				$fetch 	   = array();  
				if(mysqli_num_rows($result) > 0) {
					// output data of each row
					while($row = mysqli_fetch_assoc($result)) {
						$fetch = array(
									"id"   			=> $row['id'],
									"caption"   	=> $row['caption'],
									"createdBy"   	=> $row['createdBy'],
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

	function backup(){
		$resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan, gagal terhubung ke server!");
		$error = 0;
		
		if($error != 1){
			if (backupProcess() == 0)
			    $resultList = array( "feedStatus" => "success", "feedType" => "success", "feedMessage" => "Berhasil melakukan back-up data!");
			else
			    $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan, gagal melakukan back-up data!");
		}

		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

	function backupProcess($tables ='*')    {
    	$dump_path 	= "../database/backup/"; //input location for the backup to be saved
		$error 		= 1;
		$return		= "";
		$result		= "";
		$db_name 	= db_name;
		$file 		= $db_name ."_".str_replace(":", "", date("Y-m-d H:i:s")).".db"; 
		$gate 		= openGate();
		
		if($gate){
			$sql = 	
			"
				INSERT INTO dplega_920_backuphistory
				(
					namaFile,
					createdBy, createdDate
				)
				VALUES
				(
					'".$file."',
					'".$_SESSION['username']."', NOW()
				)
			";
			
			$result = mysqli_query($gate, $sql);
       		if($result) {
			    if($tables == '*'){
			        $tables = array();
			        $result = mysqli_query($gate, 'SHOW TABLES');
			        while($row = mysqli_fetch_row($result)){ $tables[] = $row[0]; }
			    }else{ $tables = is_array($tables) ? $tables : explode(',',$tables); }

			    foreach($tables as $table){
			        $result = mysqli_query($gate, 'SELECT * FROM '.$table);
			        $num_fields = mysqli_num_fields($result);
			        $return.= 'DROP TABLE '.$table.';';
			        $row2 = mysqli_fetch_row(mysqli_query($gate, 'SHOW CREATE TABLE '.$table));
			        $return.= "\n\n".$row2[1].";\n\n";
		            for ($i = 0; $i < $num_fields; $i++) {
		                while($row = mysqli_fetch_row($result)){
		                $return.= 'INSERT INTO '.$table.' VALUES(';
		                for($j=0; $j < $num_fields; $j++) {
		                    $row[$j] = addslashes($row[$j]);
		                    $row[$j] = ereg_replace("\n","\\n",$row[$j]);
		                    if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
		                    if ($j < ($num_fields-1)) { $return.= ','; }
		                }
		                $return.= ");\n";
		                }
		            }
		            $return.="\n\n\n";
		        }        

		        $handle = fopen($dump_path.$file,'w+');
		        if(fwrite($handle,$return)){
		       		fclose($handle);
		       		$error = 0;
		       	}
		    }
	       	closeGate($gate);
	    }

       	return $error;
    }

	function restore($data){
		$resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan, gagal terhubung ke server!");
		$error = 0;
		
		if($error != 1){
			if (restoreProcess($data) == 0)
			    $resultList = array( "feedStatus" => "success", "feedType" => "success", "feedMessage" => "Berhasil melakukan restore data!");
			else
			    $resultList = array( "feedStatus" => "failed", "feedType" => "danger", "feedMessage" => "Terjadi kesalahan, gagal melakukan restore data!");
		}

		/* result fetch */
		$json = $resultList;
		
		return $json;
	}

    function restoreProcess($data){
		$dump_path 	= "../database/backup/"; //input location for the backup to be saved
		$error 		= 1;
		$return		= "";
		$result		= "";
		$filename	= $data['refferenceId']; 
		$gate 		= openGate();
		
		if($gate){
			$sql = 	
			"
				SELECT idData FROM dplega_920_backuphistory
				WHERE
				 	idData = '".$data['pId']."'
				AND namaFile = '".$filename."'
			";
			
			$result = mysqli_query($gate, $sql);

			if($result && mysqli_num_rows($result) > 0){
				$templine = '';
				$lines = file($dump_path.$filename);
		        foreach ($lines as $line){
		            if (substr($line, 0, 2) == '--' || $line == '')
		            continue;
		            $templine .= $line;
		            if (substr(trim($line), -1, 1) == ';'){
		               	if(mysqli_query($gate, $templine)){
		                	$templine = '';
		                	$error = 0;
		            	}
		            }
		        }

		        if($error == 0){
		        	$contents = date("Y-m-d H:i:s")."|".$filename."|".$_SESSION['username']."\n";
					$file 	  = "../database/log/restore.log";

					$handle = fopen($file,'w+');
			        if(fwrite($handle,$contents)){
			       		fclose($handle);
			       	}
		        }
	    	}
        }

		return $error;
	}

	function file_force_contents($dir, $contents){
		$error = 1;
        if(file_put_contents($dir, $contents)) $error = 0;

        return $error;
    }
?>