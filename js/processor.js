/* PROCESSOR DPLEGA JS */
$(function(){
	
});

/* authentication */
/* =============================================================================================== */
function p_logout(){
	hideNotification('0');
	showNotification('success', '0', 'Terima kasih telah menggunakan layanan kami.');
	var	reStatus = "";
	$.ajax({
		url: 'modul/router.php?session=logout&group=fLogin&target=',
		type: 'post',
		dataType: 'json',
		async: false,
		data: { session : 'logout' },
		success: function(result){
			reStatus = result.status;
		},
		complete: function(xhr,status) { },
		error: function(xhr,status,error) { console.log(xhr); showNotification('danger', 'failure', 'Terjadi kesalahan, tidak ada respon dari server! ' + error); }
	});

	return reStatus;
}

/* request management */
/* =============================================================================================== */
function p_getData(group, target, keyword, refferences){
	var data = null;

	$.ajax({
		url: 'modul/router.php?session=requestData&group=' + group + '&target=' + target,
		type: 'post',
		dataType: 'json',
		async: false,
		data: { keyword : keyword, refferences: refferences },
		success: function(result){
			data = result;
		},
		complete: function(xhr,status) { hideNotification('waiting'); },
		error: function(xhr,status,error) { showNotification('danger', 'failure', 'Terjadi kesalahan, tidak ada respon dari server!'); }
	});
	
	return data;
}

function p_removeData(group, target, pId, refferenceId){
	var reStatus = null;

	showNotification('info', 'waiting', 'sedang memproses...', false);
	$.ajax({
		url: 'modul/router.php?session=removeData&group=' + group + '&target=' + target,
		type: 'post',
		dataType: 'json',
		async: false,
		data: { pId : pId, refferenceId: refferenceId },
		success: function(data){
			reStatus = data.feedStatus;
			hideNotification('waiting');
			showNotification(data.feedType, 'removed', data.feedMessage);
		},
		complete: function(xhr,status) { hideNotification('waiting'); },
		error: function(xhr,status,error) { showNotification('danger', 'failure', 'Terjadi kesalahan, tidak ada respon dari server!'); }
	});
	
	return reStatus;
}

function p_changeData(group, target, pId, refferenceId, dataFetch){
	var reStatus = null;

	showNotification('info', 'waiting', 'sedang memproses...', false);
	$.ajax({
		url: 'modul/router.php?session=updateData&group=' + group + '&target=' + target,
		type: 'post',
		dataType: 'json',
		async: false,
		data: { pId : pId, refferenceId: refferenceId, dataFetch: dataFetch },
		success: function(data){
			reStatus = data.feedStatus;
			hideNotification('waiting');
			showNotification(data.feedType, 'changed', data.feedMessage);
		},
		complete: function(xhr,status) { hideNotification('waiting'); },
		error: function(xhr,status,error) { showNotification('danger', 'failure', 'Terjadi kesalahan, tidak ada respon dari server!'); }
	});
	
	return reStatus;
}

function p_formHandler(formId, type){
	$("#" + formId).unbind().on('submit', function(e) {
		showNotification('info', 'waiting', 'sedang memproses...', false);
		e.preventDefault();
		$.ajax({
			url: "modul/router.php?session=" + type + "&group=" + $(this).attr('f-group') + "&target=" + $(this).attr('f-target'), // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{ 
				showNotification(data.feedType, '0', data.feedMessage);
				if(data.feedStatus == "success" || data.feedStatus == "warning"){
					if(data.feedPId == undefined){ data.feedPId = null }
					r_customCallBack(type, $("#" + formId).attr('f-group'), $("#" + formId).attr('f-target'), data.feedId, formId, data.feedPId);
				}
			},
			complete: function(xhr,status) { hideNotification('waiting'); },
			error: function(xhr,status,error) { showNotification('danger', 'failure', 'Terjadi kesalahan, tidak ada respon dari server!'); }
		});
	});		
}


function test(){

	$("#display-form").unbind().on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			url: "<?php echo site_url()?>Setup_controller/submitajax", // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{ 
				/* on success */
			},
			complete: function(xhr,status) { /* on complete */ },
			error: function(xhr,status,error) { /* on error */ }
		});
	});
}
// function p_logIn(formId){	
// 	$("#" + formId).unbind().on('submit', function(e) {
// 		showNotification('info', 'waiting', 'sedang memproses...', false);
// 		e.preventDefault();
// 		$.ajax({
// 			url: "modul/protected/authentication.php?session=doLogin", // Url to which the request is send
// 			type: "POST",             // Type of request to be send, called as method
// 			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
// 			contentType: false,       // The content type used when sending data to the server.
// 			cache: false,             // To unable request pages to be cached
// 			processData:false,        // To send DOMDocument or non processed data file it is set to false
// 			success: function(data)   // A function to be called if request succeeds
// 			{
// 				console.log(data);
// 				hideNotification('waiting');
// 				if(data.feedStatus == "success"){
// 					if(data.userLevel == 1){
// 						r_navigateTo(12, data.noRegistrasi);
// 						r_setCookie('userLevel', data.userLevel, 1);
// 					}else if(data.userLevel != ""){
// 						r_navigateTo(0);
// 						if(data.avatar == "" || data.avatar == null) { data.avatar = "avatar-default.jpg"; }
// 						$("#navigation .user-frame img").attr('src', 'img/avatar/' + data.avatar);
// 						$("#navigation .user-frame p.caption span").html(data.username);
// 						$("#navigation .user-frame p.caption span.big").html(data.nama);

// 						r_setCookie('avatar', data.avatar, 1);
// 						r_setCookie('username', data.username, 1);
// 						r_setCookie('nama', data.nama, 1);
// 						r_setCookie('userLevel', data.userLevel, 1);
// 					}
// 				}else{
// 					showNotification("danger", 'error', data.feedMessage);
// 				}
// 			}
// 		});
// 	});		
// }

