<?php 		
	function openGate(){
		$servername = "localhost";
		$username   = "root";
		$password   = "";
		$dbname     = "dplega_pusdai_section";
		
		// Create connection
		$gate = mysqli_connect($servername, $username, $password, $dbname);
		return $gate;
	} 
	
	function closeGate($gate){
		mysqli_close($gate);
	}
?>