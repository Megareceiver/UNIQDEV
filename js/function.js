/* custom function */
/* initial condition */
/* =============================================================================================== */
function resetAll(){
	resetForm();
}

function resetForm(){
	$("* input, * textarea").val('');
}

/* calculator and converter */
/* =============================================================================================== */
/* time converter */
function timeSince(date) {
	var seconds = Math.floor((new Date() - date) / 1000);
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	if (seconds < 5){
		return "baru saja";
	}else if (seconds < 60){
		return seconds + " detik yang lalu";
	}
	else if (seconds < 3600) {
		minutes = Math.floor(seconds/60)
		if(minutes > 1)
			return minutes + " menit yang lalu";
		else
			return "1 menit yang lalu";
	}
	else if (seconds < 86400) {
		hours = Math.floor(seconds/3600)
		if(hours > 1)
			return hours + " jam yang lalu";
		else
			return "1 jam yang lalu";
	}
	//2 days and no more
	else if (seconds < 172800) {
		days = Math.floor(seconds/86400)
		if(days > 1)
			return days + " hari yang lalu";
		else
			return "1 hari yang lalu";
	}
	else{

		//return new Date(time).toLocaleDateString();
		return date.getDate().toString() + " " + months[date.getMonth()] + ", " + date.getFullYear();
	}
}

function monthConvert(month){
	var result = "";
	switch(month){
		case 0: result = "Januari"; break;
		case 1: result = "Februari"; break;
		case 2: result = "Maret"; break;
		case 3: result = "April"; break;
		case 4: result = "Mei"; break;
		case 5: result = "Juni"; break;
		case 6: result = "Juli"; break;
		case 7: result = "Agustus"; break;
		case 8: result = "September"; break;
		case 9: result = "Oktober"; break;
		case 10: result = "November"; break;
		case 11: result = "Desember"; break;
	}
	
	return result;
}

/* form auto */
/* =============================================================================================== */
function isNumberKey(evt){
	$('input.number').keyup(function(){$(this).val($(this).val().replace(/[^\d]/,''));});
    var charCode = (evt.which) ? evt.which : evt.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function numberOnlyActivator(target){
	$(target).keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
	     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	        //display error message
	        // $("#errmsg").html("Digits Only").show().fadeOut("slow");
	        return false;
	    }
	});
}

function dateParse(){
	var dateStart	= new Date(Date.parse($("input[name=year-from]").val() + "/" + $("input[name=month-from]").val() + "/" + $("input[name=day-from]").val()));
}

function imgPreview(event, viewer, elem) {
	var file = elem.files[0];
	var imagefile = file.type;
	var match= ["image/jpeg","image/png","image/jpg","image/gif"];
	if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]) || (imagefile==match[3])))
	{
		$('#' + viewer).attr('src','img/picture-default.png');
		$("#post-dialog .modal-body .alert").html("<strong>Peringatan!</strong> Format gambar tidak dikenal.");
		call_alert("post");
		return false;
	}
	else
	{
		var output = document.getElementById(viewer);
		output.src = URL.createObjectURL(event.target.files[0]);
	}
};


/* fecth array */
function lembagaFetchArray(data){
	var res = [[],[],[]];
	for(var loop=0; loop<data.length; loop++){
		res[1].push(data[loop].noreg);
		res[0].push(data[loop].nama);
		res[2].push(data[loop].caption);
	}
	
	return res;
}