/* UI DPLEGA JS */
/*-- public declare*/
var headHome 			= $('header.main');
var headPage 			= $('header.parent');
var mainPage			= $('main.parent');
var footPage 			= $('footer.parent');
var preload  			= '<div id="preload" class="container"><div class="col-md-12"><div class="loader"><svg class="circular" viewBox="5 5 90 90"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div></div>';
var waiting 			= '<div id="waiting"><div class="col-md-12"><div class="loader"><svg class="circular" viewBox="5 5 90 90"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div></div>';
var head  				= '';
var body  	 			= '';
var part	 			= ['',''];
var content  			= '';
var data 	 			= [];
var optionD	 			= [];
var optionBatch 		= [];
var autoData			= [];
var sourcesData			= [];
var sourcesDetailData	= []; 
var maxForm 			= 4; //set max form
var lembagaCounter		= 0;

/* packet data variable */
var pGroup  		= "";
var pTarget			= "";
var pId 			= "";
var pLabel			= "";
var pContainer		= "";
var pReferences		= "";
var pReferencesKey	= "";
var pDecription		= "";

$(function(){
	// r_clearCookies(); 
	r_navigateTo(r_pageReader(), 'start');
	// r_pageSet(0);
	// keeping data provinsi, wilayah, kecamatan, kelurahan to global variable
	optionD = p_getData('f4', 'f40', '');
	optionD = optionD.feedData;
});

/* navigation */
function r_navigateTo(index, packet, access) {
	/*-- syncnav js*/ syncnavClose();
	/*-- clear frame on page */ r_pageClear();

	switch(index){
		case 0  : r_f0Dashboard(); 					break;
		case 0.1: r_f0Bantuan(); 					break;
		
		case 1  : r_f1Kelembagaan(); 				break;
		case 11 : r_f1DaftarLembaga(packet); 		break;
		case 12 : r_f1DetailLembaga(packet); 		break;
		case 13 : r_f1VerifikasiLembaga(packet);	break;
		case 14 : r_f1KoleksiLembaga(); 			break;
		case 16 : r_f1PrestasiLembaga(); 			break;
		case 15 : r_f1FormKelembagaan(packet);		break;
		
		case 3  : r_f3Autentikasi(); 				break;
		case 31 : r_f3FormUser(packet);				break;
		
		case 4  : r_f4Pengaturan();					break;
		case 41 : r_f4LingkupArea();				break;
		case 411: r_f4TransferLembaga();			break;
		
		case 42 : r_f4DaftarVerifikasi();			break;
		case 421: r_f4GrupVerifikasi();				break;
		
		case 43 : r_f4BentukLembaga();				break;
		case 431: r_f4LegalitasLembaga();			break;
		case 432: r_f4BidangGerakLembaga();			break;
		
		case 44 : r_f4DaftarBerita();				break;
		case 441: r_f4DetailBerita(packet);			break;
		
		case 45 : r_f4ImportData();					break;
		case 451: r_f4BackupRestore();				break;
		case 452: r_f4Setelan();					break;
		case 453: r_f4FormInfoPersonal();			break;
		
		case 46 : r_f4InfoPersonal();				break;
		case 461: r_f4GantiPassword();				break;

		case 99 : r_fLogin(); 						break;
		case 999: r_fNotification();				break;
		default : r_fHome(); 						break;
	}
	
	//alert('index:' + index + ", prev:" + r_pageReader());
	if(packet != 'start' && index != r_pageReader()){
	/*--set page to static*/ r_pageSet(index);
	}
}

function r_customCallBack(formType, group, target, recentId, formId, pId){
	var dataFec = null;
	switch(group){
		case 'f1' : //yama
			switch(target){
				case 'f111' :
					$('#f-kelembagaan-create input[name="kelurahan"]').attr('readonly','readonly');
					$("#" + formId + " [name=imageName]").html(recentId);
					$("[name=noreg]").val(pId);
					profile_look_set(pId);
					p_formHandler("f-kelembagaan-create", "updateData");
				break;
				case 'f112' :
					p_formHandler("f-sejarah-create", "updateData");
					$("#" + formId + " [name=imageName]").html(recentId);
				break;
				case 'f113' :
					p_formHandler(formId, "updateData");
					$("#" + formId + " [name=p-id]").val(pId);
					$("#" + formId + " [name=imageName]").html(recentId);
				break;
				case 'f114' :
					p_formHandler("f-kepengurusan-create", "updateData");
				break;
				case 'f115' :
					p_formHandler("f-kegiatanUsaha-create", "updateData");
				break;
				case 'f116' :
					p_formHandler(formId, "updateData");
					$("#" + formId + " [name=p-id]").val(pId);
					$("#" + formId + " [name=imageName]").html(recentId);
				break;
				case 'f118' :
					dataFec = [{ 
							'idData' 		: recentId, 
							'noreg'	 		: $('#' + formId + ' input[name="noreg"]').val(), 
							'judulKoleksi'	: $('#' + formId + ' input[name="judulKoleksi"]').val(), 
							'jenisKoleksi'	: $('#' + formId + ' select[name="jenisKoleksi"]').val(),
							'deskripsi'		: $('#' + formId + ' input[name="deskripsi"]').val(),
					}];
					
					r_f1KoleksiDataGenerator(dataFec);
					clearTargetFormNoreg(formId, $('#' + formId + ' input[name="noreg"]').val());
				break;
				case 'f119' :
					dataFec = [{ 
							'idData' 		: recentId, 
							'noreg'	 		: $('#' + formId + ' input[name="noreg"]').val(), 
							'deskripsi'		: $('#' + formId + ' input[name="deskripsi"]').val(),
					}];
					
					r_f1PrestasiDataGenerator(dataFec);
					clearTargetFormNoreg(formId, $('#' + formId + ' input[name="noreg"]').val());
				break;
				case 'f120' :
					$("#" + formId + " [name=imageName]").html(recentId);
				break;
				case 'f121' :
					dataFec = [{ 
							'idData' 		: recentId, 
							'noreg'	 		: $('#' + formId + ' input[name="noreg"]').val(), 
							'bantuanDari'	: $('#' + formId + ' input[name="bantuanDari"]').val(), 
							'deskripsi'		: $('#' + formId + ' textarea[name="deskripsi"]').val(), 
							'tahun'			: $('#' + formId + ' input[name="tahun"]').val(),
					}];
					
					r_f1SejarahBantuanDataGenerator(dataFec);
					clearTargetFormNoreg(formId, $('#' + formId + ' input[name="noreg"]').val());
				break;
				case 'f122' :
					dataFec = [{ 
							'idData' 		: recentId, 
							'noreg'	 		: $('#' + formId + ' input[name="noreg"]').val(), 
							'namaLembaga'	: $('#' + formId + ' input[name="namaLembaga"]').val(), 
							'noregTarget'	: $('#' + formId + ' input[name="noregTarget"]').val(), 
							'hirarki'		: $('#' + formId + ' select[name="hirarki"]').val(),
					}];
					
					r_f1HirarkiDataGenerator(dataFec);
					clearTargetFormNoreg(formId, $('#' + formId + ' input[name="noreg"]').val());
				break;
			}
		break;
		case 'f4': //megan
			switch(target){
				case 'f411':
					dataFec = [{ 
							'noreg'	 : $('#f-provinsi-create input[name="kode"]').val(), 
							'caption': $('#f-provinsi-create input[name="nama"]').val(),
					}];
					
					r_f4LingkupAreaDataGenerator(formType, 'provinsi', dataFec, 'section-Provinsi');
					clearTargetForm('f-provinsi-create');
					p_formHandler("f-provinsi-create" , "addData");
				break;
				case 'f412':
					dataFec = [{ 
							'noreg'	 		: $('#f-wilayah-create input[name="kode"]').val(), 
							'caption'		: $('#f-wilayah-create input[name="nama"]').val(),
							'references'	: $('#f-wilayah-create select[name="referensi"] option:selected').text(),
							'referencesKey'	: $('#f-wilayah-create select[name="referensi"]').val(),
					}];
					r_f4LingkupAreaDataGenerator(formType, 'wilayah', dataFec, 'section-Wilayah');
					clearTargetForm('f-wilayah-create');
					p_formHandler("f-wilayah-create" , "addData");
				break;
				case 'f413':
					dataFec = [{ 
							'noreg'	 		: $('#f-kecamatan-create input[name="kode"]').val(), 
							'caption'		: $('#f-kecamatan-create input[name="nama"]').val(),
							'references'	: $('#f-kecamatan-create select[name="referensi"] option:selected').text(),
							'referencesKey'	: $('#f-kecamatan-create select[name="referensi"]').val(),
					}];
					r_f4LingkupAreaDataGenerator(formType, 'kecamatan', dataFec, 'section-Kecamatan');
					clearTargetForm('f-kecamatan-create');
					p_formHandler("f-kecamatan-create" , "addData");
				break;
				case 'f414':
					dataFec = [{ 
							'noreg'	 		: $('#f-kelurahan-create input[name="kode"]').val(), 
							'caption'		: $('#f-kelurahan-create input[name="nama"]').val(),
							'references'	: $('#f-kelurahan-create select[name="referensi"] option:selected').text(),
							'referencesKey'	: $('#f-kelurahan-create select[name="referensi"]').val(),
					}];
					r_f4LingkupAreaDataGenerator(formType, 'kelurahan', dataFec, 'section-Kelurahan');
					clearTargetForm('f-kelurahan-create');
					p_formHandler("f-kelurahan-create" , "addData");
				break;
				case 'f421':
					dataFec = [{ 
							'noreg'	 		: recentId, 
							'caption'		: $('#f-grupVerifikasi-create input[name="nama"]').val(),
					}];
					r_f4VerifikasiDataGenerator(formType, 'grupVerifikasi', dataFec, 'section-grupVerifikasi');
					clearTargetForm('f-grupVerifikasi-create');
					p_formHandler("f-grupVerifikasi-create" , "addData");
				break;
				case 'f422':
					dataFec = [{ 
							'noreg'	 		: recentId, 
							'caption'		: $('#f-verifikasi-create input[name="nama"]').val(),
							'references'	: $('#f-verifikasi-create select[name="referensi"] option:selected').text(),
							'referencesKey'	: $('#f-verifikasi-create select[name="referensi"]').val(),
					}];
					r_f4VerifikasiDataGenerator(formType, 'verifikasi', dataFec, 'section-verifikasi');
					clearTargetForm('f-verifikasi-create');
					p_formHandler("f-verifikasi-create" , "addData");
				break;
				case 'f431':
					dataFec = [{ 
							'noreg'	 		: recentId, 
							'caption'		: $('#f-bentukLembaga-create input[name="nama"]').val(),
							'description'	: $('#f-bentukLembaga-create textarea[name="deskripsi"]').val(),
					}];
					r_f4KelembagaanSectionGenerator(formType, 'bentukLembaga', dataFec, 'section-bentukLembaga');
					clearTargetForm('f-bentukLembaga-create');
					p_formHandler("f-bentukLembaga-create" , "addData");
				break;
				case 'f432':
					dataFec = [{ 
							'noreg'	 		: recentId, 
							'caption'		: $('#f-legalitas-create input[name="nama"]').val(),
							'references'	: $('#f-legalitas-create select[name="referensi"] option:selected').text(),
							'referencesKey'	: $('#f-legalitas-create select[name="referensi"]').val(),
					}];
					r_f4KelembagaanSectionGenerator(formType, 'legalitas', dataFec, 'section-legalitas');
					clearTargetForm('f-legalitas-create');
					p_formHandler("f-legalitas-create" , "addData");
				break;
				case 'f433':
					dataFec = [{ 
							'noreg'	 		: recentId, 
							'caption'		: $('#f-bidangGerak-create input[name="nama"]').val(),
					}];
					r_f4KelembagaanSectionGenerator(formType, 'bidangGerak', dataFec, 'section-bidangGerak');
					clearTargetForm('f-bidangGerak-create');
					p_formHandler("f-bidangGerak-create" , "addData");
				break;
			}
		break;
	}
	
}

function r_autoCompleteCallback(targetIndex, sources, sourcesDetail, ui, targetId){
	switch (targetIndex){
		case "hirarkiLembaga": 
			var source_1 = sourcesDetail[1];
			var source_2 = sourcesDetail[2]; 

			$("#" + targetId).val(source_2[sources.indexOf(ui.item.value)]);
			$("#" + targetId + "_kode").val(source_1[sources.indexOf(ui.item.value)]);
			$("#" + targetId).on("keyup", function(){ 
				$("#" + targetId + "_kode").val(""); 
			});
		break;
		case "lingkupArea": 
			$("#" + targetId).val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaKelurahan);
			$("#" + targetId + "_2").val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaKecamatan);
			$("#" + targetId + "_3").val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaWilayah);
			$("#" + targetId + "_4").val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaProvinsi);
			
			$("#" + targetId + "_kode").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeKelurahan);
			$("#" + targetId + "_kode2").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeKecamatan);
			$("#" + targetId + "_kode3").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeWilayah);
			$("#" + targetId + "_kode4").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeProvinsi);
			
			$("#" + targetId).on("keyup", function(){ 
				$("#" + targetId + "_2").val(""); 
				$("#" + targetId + "_3").val(""); 
				$("#" + targetId + "_4").val(""); 
				$("#" + targetId + "_kode").val(""); 
				$("#" + targetId + "_kode2").val(""); 
				$("#" + targetId + "_kode3").val(""); 
				$("#" + targetId + "_kode4").val(""); 
			});
		break;
		case "batasWilayah": 
			$("#" + targetId).val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaWilayah);
			$("#" + targetId + "_kode").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeWilayah);
			$("#" + targetId).on("keyup", function(){ 
				$("#" + targetId + "_kode").val(""); 
			});
		break;
	}
}

function r_flexForm(){

}

function r_pageClear(){
	$('body').removeClass('clear bg-white');
	mainPage.html('');
	footPage.html('');
}

function r_optionDHtml(group){
	var optionHtml ="";
	
	switch(group){
		case "provinsi": 
			if(optionD != null && optionD[0].provinsi != undefined){
				for(var loop=0; loop<optionD[0].provinsi.length; loop++){
					optionHtml = optionHtml + '<option value="' + optionD[0].provinsi[loop].noreg + '">' + optionD[0].provinsi[loop].caption + '</option>';
				}
			}
		break;
		case "wilayah": 
			if(optionD != null && optionD[0].wilayah != undefined){
				for(var loop=0; loop<optionD[0].wilayah.length; loop++){
					optionHtml = optionHtml + '<option value="' + optionD[0].wilayah[loop].noreg + '">' + optionD[0].wilayah[loop].caption + '</option>';
				}
			}
		break;
		case "kecamatan": 
			if(optionD != null && optionD[0].kecamatan != undefined){
				for(var loop=0; loop<optionD[0].kecamatan.length; loop++){
					optionHtml = optionHtml + '<option value="' + optionD[0].kecamatan[loop].noreg + '">' + optionD[0].kecamatan[loop].caption + '</option>';
				}
			}
		break;
		case "kelurahan": 
			if(optionD != null && optionD[0].kelurahan != undefined){
				for(var loop=0; loop<optionD[0].kelurahan.length; loop++){
					optionHtml = optionHtml + '<option value="' + optionD[0].kelurahan[loop].noreg + '">' + optionD[0].kelurahan[loop].caption + '</option>';
				}
			}
		break;
	}
	
	return optionHtml;
}

function r_headPageHtml(type, title){
	/*--clear class*/ headHome.removeClass('parent blank theme clear');
	var headHtml = "";
	if(type != "home"){
		headHtml = '<div class="container"><div class="col-xs-12 frame">';
		var headPart = ['','',''];
		
		/*--left */  headPart[0] = '<div class="fly left">';
		/*--mid */   headPart[1] = '';
		/*--right */ headPart[2] = '<div class="fly right">';
		
		switch(type) {
			case 1: 
				headPart[0] = headPart[0] + '<div class="title"><span>' + title + '</span></div>';
				headPart[2] = headPart[2] + '<div class="click" id="notif-ring"><span class="fa fa-bell bell active"></span></div>';
				headPart[2] = headPart[2] + '<div class="click" syncnav-target="#option"><span class="fa fa-bars"></span></div>';
			break;
			case 2: 
				headPart[0] = headPart[0] + '<div class="click back-button"><img class="icon-type" src="img/sources/arrow-left.png" /></div>';
				headPart[0] = headPart[0] + '<div class="title"><span>' + title + '</span></div>';
				
			break;
			case 3: 
				headPart[0] = headPart[0] + '<div class="click back-button"><img class="icon-type" src="img/sources/arrow-left.png" /></div>';
				headPart[0] = headPart[0] + '<div class="title"><span>' + title + '</span></div>';
				
				headPart[2] = headPart[2] + '<div class="click" id="notif-ring"><span class="fa fa-bell bell active"></span></div>';
				headPart[2] = headPart[2] + '<div class="click" syncnav-target="#option"><span class="fa fa-bars"></span></div>';
			break;
			case 4: 
				headPart[0] = headPart[0] + '<div class="click back-button"><img class="icon-type" src="img/sources/arrow-left.png" /></div>';
				headPart[0] = headPart[0] + '<div class="title"><span>' + title + '</span></div>';
				
				headPart[1] = headPart[1] + '<div class="search-box"><div class="icon-box right"><input class="search-input" placeholder="Cari lembaga" type="text" value="" /></div></div>';
				
				headPart[2] = headPart[2] + '<div class="click search-button"><span class="fa fa-search"></span></div>';
				headPart[2] = headPart[2] + '<div class="click" id="notif-ring"><span class="fa fa-bell bell active"></span></div>';
				headPart[2] = headPart[2] + '<div class="click" syncnav-target="#option"><span class="fa fa-bars"></span></div>';
			break;
			
		}
		
		/*--left */  headPart[0] = headPart[0] +	'</div>';
		/*--right */ headPart[2] = headPart[2] +	'</div>';
		
		headHtml = headHtml + headPart[0] + headPart[1] + headPart[2] + '</div></div>';
		headHome.addClass('parent theme');
	}else {
		headHtml = 
		'<div class="col-md-3 hidden-sm hidden-xs bg-black inbound">' +
			'<h4>DPLEGA 2.0</h4>' +
		'</div>' +
		'<div class="col-md-9 inbound text-right">' +
				'<button type="button" class="clear go-login">LOGIN</button>' +
		'</div>';
		
		headHome.addClass('blank theme clear');
	}
	
	return headHtml;
}

function r_footPageHtml(type){
	/*--clear class*/ footPage.removeClass('static');
	var footHtml = "";
	switch(type) { 
		case "credit":
			footHtml = 
			'<div class="container">' +
				'<div class="col-md-4 col-md-offset-8 author-box">' +
					'<div class="frame">' +
						'<div class="border">' +
							'<span>2017 | Supported by Syncard Technology</span>' +
							'<img src="img/sources/syncard.png" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			footPage.addClass('static');
		break;
		
		case "add":
			footHtml = 
			'<div class="container">' +
				'<div class="col-md-1 col-md-offset-11 command-box">' +
					'<button id="add-button" type="button" class="btn btn-circle cyan">+</button>' +
				'</div>' +
			'</div>';
		break;
	}
	
	return footHtml;
}


/* Page templates */
/* ====================================================================== */
/* ====================================================================== */
/*F*/
/*F1*/
function r_fHome() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [
			{
				'news':[
					{'id':'news1', 'judul': 'Pembukaan Bantuan Dana Hibah 2017 telah dibuka !', 'deskripsi': 'Bantuan Dana Hibah kini telah dibuka, kepada para lembaga yang membutuhkan data, untuk segera mengirimkan proposal permohonan dan persyaratan-persyaratan yang diperlukan be ...'},
					{'id':'news2', 'judul': 'Penutupan Bantuan Dana Hibah 2016 !', 'deskripsi': 'Lembaga yang ikut serta diwajibkan melaporkan penggunaan dana secara lengkap dan baik, pelaporan dilakukan terakhir pada tanggal yang telah ditentukan sebelumnya, de ...'},
				],
				'quicknav': [
					{'target':'', 'menu': 'Yayasan', 'count': '2'},
					{'target':'', 'menu': 'Perkumpulan', 'count': '0'},
					{'target':'', 'menu': 'Pondok Pesantren', 'count': '4'},
					{'target':'', 'menu': 'Madrasah Ibtidaiyah', 'count': '1'},
					{'target':'', 'menu': 'Madrasah Tsanawiyah', 'count': '0'},
					{'target':'', 'menu': 'Madrasah Aliyah', 'count': '0'},
					{'target':'', 'menu': 'Perguruan Tinggi', 'count': '7'},
					{'target':'', 'menu': 'RA', 'count': '2'},
				],
				'contact': [
					{
						'alamat': 'Jl. Diponegoro No. 22  Bandung Jawa Barat',
						'telp'  : '( 022 ) 4232448,  4233347,  4230963.',
						'fax'   : '( 022 ) 4203450',
						'cs'    : '+6257 2019 3333',
						'email' : 'dplega@jabarprov.go.id',
					}
				]
			}
		];
		
		//--open
		head	= 
		'<div class="row no-head jumbotron-ground">' +
			'<div class="col-md-3 bg-black banner-black">' +
				'<div class="button-box">' +
					'<h5 class="theme-color text-bold">NAVIGASI</h5>' +
					'<button type="button" class="clear" id="go-websiteResmi">WEBSITE RESMI</button>' +
					'<button type="button" class="clear" id="go-beritaTerkini">BERITA TERKINI</button>' +
					'<button type="button" class="clear" id="go-kelembagaan">KELEMBAGAAN</button>' +
					'<button type="button" class="clear" id="go-kontak">KONTAK</button>' +
				'</div>' +
			'</div>' +
			'<div class="col-md-9 jumbotron-content bg-black-mirror">' +
				'<div class="jumbotron-bg text-shadow">' +
					'<h1>DPLEGA 2.0</h1>' +
					'<h5>Data potensial lembaga keagamaan - Jawa Barat</h5>' +
					'<h5>BIRO PELAYANAN SOSIAL DASAR SEKRETARIAT DAERAH PROVINSI JAWA BARAT</h5>' +
					'<p>' +
						'Halo pengunjung ! <br/>' +
						'Kami ucapkan selamat datang, akhirnya kami dapat kembali meningkatkan pelayanan kepada anda, dan tiada ' +
						'hentinya kami terus melakukan perbaikan agar menjadi lebih baik lagi.<br/><br/>Dplega adalah layanan berbasis online kepada ' +
						'masyarakat untuk menyediakan data kelembagaan yang telah tercatat secara legal serta telah melewati proses ' +
						'verifikasi sehingga dinyatakan sah sebagai suatu kelembagaan.' +
					'</p>' +
					'<img class="logo-user" src="img/logo_jabar.png">' +
				'</div>' +
			'</div>' +
			'<div class="clearfix"></div>' +
			'<div class="jumbotron-button">' +
				'<div class="col-md-9 col-md-offset-3">' +
					'<button type="button" class="btn-link text-white go-scroll"><i class="fa fa-angle-double-down fa-3x"></i></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		body	= '<div id="website-section" class="row"><div class="col-md-12">';
		//--license detail
		body	= body + 
		'<div class="cards no-bg">' +
			'<div class="banner-box">' +
				'<div class="text text-center">' +
					'<h4>WEBSITE RESMI</h4>' +
					'<div class="space-box"></div>' +
					'<a class="link" href="#"><span class="fa fa-facebook-official"></span></a>' +
					'<a class="link" href="#"><span class="fa fa-twitter"></span></a>' +
					'<a class="link" href="#"><span class="fa fa-instagram"></span></a>' +
					'<a class="link" href="#"><span class="fa fa-google-plus"></span></a>' +
					'<h5>Copyright © 2017 Pemerintah Provinsi Jawa Barat.</h5>' +
					'<h6>Supported by Syncard Technology</h6>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		body 	= body + '</div></div>';
		body	= body + '<div class="row"><div class="col-md-12"><div class="row default">';
		body = body +
			'<div id="berita-section" class="cards clear-bold no-shadow bg-smooth">' +
				'<div class="col-md-8 col-md-offset-2">' +
					'<div class="row default">' +
						'<div class="cards-header">' +
							'<h4>BERITA TERKINI</h4>' +
						'</div>';
				
		//--render data
		for(var loop = 0; loop < data[0].news.length; loop++){
			//--content
			body = body +
			'<div class="article-box">' +
				'<div class="body">' +
					'<p class="title">' + data[0].news[loop].judul +  '</p>' +
					'<p class="content">' + data[0].news[loop].deskripsi +  '</p>' +
				'</div>' +
				'<div class="foot">' +
					'<button type="button" class="clear btn-link detail-click" p-id="' + data[0].news[loop].id +  '">Baca lebih lanjut</button>' +
				'</div>	' +
			'</div>';
		}
		
		body = body +
					'</div>' +
				'</div>' +
				'<div class="clearfix"></div>' +
			'</div>';
		
		body	= body + '</div></div></div>';
		
		//--more news detail
		body	= body + 
		'<!--div class="cards clear">' +
			'<div class="article-box">' +
				'<div class="single">' +
					'<button type="button" class="clear btn-link more-click">Lihat selengkapnya</button>' +
				'</div>' +
			'</div>' +
		'</div-->';

		
		body	= body + '<div id="kelembagaan-section" class="row"><div class="col-md-12"><div class="row default">';
		//--quick nav
		body	= body + 
		'<div class="col-md-8 col-md-offset-2">' +
			'<div class="empty-box"></div>' +
			'<h4>KELEMBAGAAN</h4>' +
			'<p>kami menyediakan daftar lembaga yang berisi data yang berkaitan dengan kontak lembaga, agar baik masyarakat maupun lembaga dapat saling berhubungan atau dapat memanfaatkan data dengan baik.</p>' +
			'<div class="space-box"></div>' +
			'<div class="row default">' +
				'<div class="cards-label plus">' +
					'<p>' +
						'<strong>Kelembagaan</strong>' +
					'</p>' +
				'</div>' +
			'</div>' +
		'</div><div class="clearfix"></div>';
		
		/*--left*/  part[0] = '<div class="col-md-6"><div class="row default">';
		/*--right*/ part[1] = '<div class="col-md-6"><div class="row default">';
		
		//--render quick nav
		var indexes = 0;
		for(var loop = 0; loop < data[0].quicknav.length; loop++){
			//--content
			part[indexes] = part[indexes] +
			'<div class="cards">' +
				'<div class="navigation-box">' +
					'<div class="caption">' +
						'<span>' + data[0].quicknav[loop].menu + ' (' + data[0].quicknav[loop].count + ')</span>' +
					'</div>' +
				'</div>' +
			'</div>';
			indexes++;
			if(indexes > 1){ indexes = 0; }
		}
		
		part[0]	= part[0] + '</div></div>';
		part[1]	= part[1] + '</div></div>';
		/*-- fetch*/ body = body + '<div class="col-md-8 col-md-offset-2"><div class="row default">' + part[0] + part[1] + '</div></div><div class="clearfix"></div>';
		
		/*-- static quicnav*/
		body	= body +
		'<div class="col-md-8 col-md-offset-2">' +
			'<div class="row default">' +
				'<div class="cards-label plus">' +
					'<p>' +
						'<strong>Lainnya</strong>' +
					'</p>' +
				'</div>' +
				'<div class="col-md-6">' +
					'<div class="row default left">' +
						'<div class="cards flush">' +
							'<div class="navigation-box">' +
								'<div class="caption">' +
									'<span>Koleksi</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="empty-box"></div>' +
		'</div>';
		
		/*--main close*/
		body	= body + '</div></div></div>';
		
		/*--static footer*/
		body	= body + 
		'<div id="kontak-section" class="row foot">' +
			'<div class="container">' +
				'<div class="space-box"></div>' +
				'<div class="col-md-8 col-md-offset-2 relative bg-gsate">' +
					'<h4>KONTAK</h4>' +
					'<p>' + data[0].contact[0].alamat + '</p>' +
					'<p>Telp. ' + data[0].contact[0].telp + '</p>' +
					'<p>Fax.  ' + data[0].contact[0].fax + '</p>' +
					'<p>CS.   ' + data[0].contact[0].cs + '</p>' +
					'<p>Email. ' + data[0].contact[0].email + '</p>' +
					'<div class="banner-box">' +
						'<div class="text clear-left">' +
							'<div class="space-box"></div>' +
							'<a class="link clear" href="#"><span class="fa fa-facebook-official"></span></a>' +
							'<a class="link" href="#"><span class="fa fa-twitter"></span></a>' +
							'<a class="link" href="#"><span class="fa fa-instagram"></span></a>' +
							'<a class="link" href="#"><span class="fa fa-google-plus"></span></a>' +
						'</div>' +
					'</div>' +
					'<button type="button" class="clear scroll-up"><img src="img/sources/arrow-right.png" /></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		content = '<section id="home">' + head + body + '</section>';
		//--close
		
		//--gen
		$('body').addClass('clear');
		headPage.html(r_headPageHtml('home', ''));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".go-login").unbind().on('click', function(){ r_navigateTo(99); });
		$(".more-click").unbind().on('click', function(){ r_navigateTo(44); });
		$(".detail-click").unbind().on('click', function(){ r_navigateTo(441, $(this).attr('p-id')); });
		
		//scrolling
		var sec1 = $(window).innerHeight();
		var sec2 = $('#website-section').innerHeight();
		var sec3 = $('#berita-section').innerHeight();
		var sec4 = $('#kelembagaan-section').innerHeight();
		var sec5 = $('#kontak-section').innerHeight();
		
		$(".go-scroll").unbind().on('click', function(){ scrollPage(sec1); });
		$("#go-websiteResmi").unbind().on('click', function(){ scrollPage(sec1); });
		$("#go-beritaTerkini").unbind().on('click', function(){ scrollPage(sec1 + sec2); });
		$("#go-kelembagaan").unbind().on('click', function(){ scrollPage(sec1 + sec2 + sec3); });
		$("#go-kontak").unbind().on('click', function(){ scrollPage(sec1 + sec2 + sec3 + sec4); });
		$(".scroll-up").unbind().on('click', function(){ backToTop(); });
	
		
		//--css mod
		$(".jumbotron-ground").css('height', ($(window).innerHeight()*1));
	});
}

function r_fLogin() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [
			{'bentukLembaga':'Yayasan', 'jumlahData': '4', 'picture': 'icon-1.png', 'deskripsi': 'Lorem ipsum dolor sit amet'},
			{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'picture': 'icon-2.png', 'deskripsi': 'Lorem ipsum dolor sit amet'},
		];
		
		//--open
		head	= '';
		body	= 
		'<form id="f-login">' +
			'<div class="row no-head">' +
				'<div class="container">' +
					'<div class="col-md-6 col-md-offset-3">' +
						'<div class="empty-box"></div>' +
						'<div class="cards">' +
							'<div class="cards-header">' +
								'<p class="fixed">LOGIN</p>' +
							'</div>' +
							'<div class="space-box lock-picture"></div>' +
							'<div class="input-box">' +
								'<div class="icon-box left">' +
									'<input placeholder="Username" name="username" tabindex="1" type="text" value="" autofocus="autofocus" />' +
									'<span class="fa fa-user text-yellow"></span>' +
								'</div>' +
							'</div>' +
							'<div class="input-box">' +
								'<div class="icon-box left">' +
									'<input placeholder="Password" name="password" tabindex="1" type="password" value="" />' +
									'<span class="fa fa-lock text-yellow"></span>' +
								'</div>' +
							'</div>' +
							'<div class="space-box"></div>' +
						'</div>' +
						'<div class="cards flush">' +
							'<div class="cards-header">' +
								'<p class="fixed">&nbsp;</p>' +
								'<div class="btn-collapse left small">' +
									'<button class="clear go-login text-cyan" type="submit">Masuk &nbsp; <span class="fa fa-angle-right"></span></button>' +
									'<!--button class="clear" type="button"><span class="fa fa-filter"></span></button-->' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-8 col-md-offset-2">' +
						'<div class="cards no-bg">' +
							'<div class="cards-header special">' +
								'<h5>Copyright © 2017 Pemerintah Provinsi Jawa Barat.</h5>' +
								'<h6>Supported by Syncard Technology</h6>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>';
		
		content = '<section id="login">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(2, 'Login'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(); });
		$(".go-login").unbind().on('click', function(){ r_navigateTo(0); });

		// p_logIn('f-login');
	});
}

function r_fNotification() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data	= p_getData('fNotification', 'f110', '');
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		
		if(data.feedData != null){
			for(var loop = 0; loop < data.feedData.length; loop++){
				//--group
				body = body + 
				'<div class="cards-label plus">' +
					'<p>' +
						'<strong>' + data.feedData[loop].group + ' (' + data.feedData[loop].list.length + ')</strong>' +
					'</p>' +
				'</div>';
				
				for(var look = 0; look < data.feedData[loop].list.length; look++){
					body = body + 
					'<div class="cards bakcup-list">' +
						'<div class="row default">' +
							'<div class="col-xs-10">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-yellow"><span class="fa fa-bell"></span></div>' +
									'<p class="list-text">' + data.feedData[loop].list[look].deskripsi + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-2">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + timeSince(new Date(Date.parse(data.feedData[loop].list[look].waktu))) + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="clearfix"></div>' +
						'</div>' +
					'</div>';
				}
			}	
		}else{
			body = body +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset text-black">Tidak ada pemberitahuan.</p>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Pemberitahuan'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(r_pagePreviousReader()); });
		r_navbarReactor();
	});
}

/*F0*/
function r_f0Dashboard() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [{
			'summary':[
				{'caption':'Total data ajuan', 'counter': '0'},
				{'caption':'Total data sudah verfikasi', 'counter': '57'},
				{'caption':'Total data akun (lembaga)', 'counter': '15'},
			],
			'kolektif':[
				{'bentukLembaga':'Yayasan', 'jumlahData': '4', 'sudahVerifikasi': '3', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
				{'bentukLembaga':'Perkumpulan', 'jumlahData': '2', 'sudahVerifikasi': '1', 'ajuan': '1'},
			]
			
		}];
		
		//--open
		head	= 
		'<div class="row no-head">'+
			'<div class="container">' +
				'<div class="col-md-12">' +
					'<div class="col-md-6">' +
						'<h3 class="text-black">Selamat datang!</h3>' +
						'<p class="text-black">DPLEGA 2.0 dirancang sedemikian rupa agar memenuhi kebutuhan dan kenyamanan penggunaan, kelola data - data lembaga, data kelengkapan pendukungnya serta rasakan kenyamanan penggunaan aplikasi ini di smartphone anda.</p>' +
						'<p class="text-black">Version update 1.9 Beta</p>' +
					'</div>' +
					'<div class="col-md-6 jumbotron-bg">' +
						'<div class="empty-box"></div>' +
						'<div class="empty-box"></div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-4">';
		part[1] = '<div class="col-md-8">';
		
		//--render data left
		for(var loop = 0; loop < data[0].summary.length; loop++){
			part[0] = part[0] +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset">' + data[0].summary[loop].caption + '</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'</div>' +
				'</div>' +
				'<!--div class="summary-shead">' +
					'<p class="caption">' + data[0].summary[loop].caption + '</p>' +
				'</div-->' +
				'<div class="summary-sbody">' +
					'<p class="counter">' + data[0].summary[loop].counter + '</p>' +
				'</div>' +
				'<!--div class="summary-sfoot">' +
					'<button class="btn-link click" type="button">Lihat data <img class="btn-icon-set" src="img/sources/arrow-right-black.png" /></button>' +
				'</div-->' +
				'<div class="space-box"></div>' +
			'</div>';
		}
		
		part[1] = part[1] +
		'<div class="cards title">' +
			'<div class="cards-header">' +
				'<p class="fixed">Jumlah kolektif lembaga.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		for(var loop = 0; loop < data[0].kolektif.length; loop++){
			part[1] = part[1] +
			'<div class="cards">' +
				'<div class="row default">' +
					'<div class="col-md-6">' +
						'<div class="summary-box">' +
							'<div class="caption">' +
								'<span>' + data[0].kolektif[loop].bentukLembaga + '</span>' +
							'</div>' +
							'<div class="counter prime">' +
								'<span>' + data[0].kolektif[loop].jumlahData + '</span>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-3">' +
						'<div class="summary-box">' +
							'<div class="caption secondary">' +
								'<span>Sudah verifikasi</span>' +
							'</div>' +
							'<div class="counter second">' +
								'<span>' + data[0].kolektif[loop].sudahVerifikasi + '</span>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-3">' +
						'<div class="summary-box">' +
							'<div class="caption secondary">' +
								'<span>Ajuan</span>' +
							'</div>' +
							'<div class="counter">' +
								'<span>' + data[0].kolektif[loop].ajuan + '</span>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="clearfix"></div>' +
			'</div>';
		}
		
		part[0] = part[0] + '</div>';
		part[1] = part[1];

		body	= body + part[0] + part[1] + 
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Navigasi</strong>' +
			'</p>' +
		'</div>' +
		'<div class="col-md-4">' +
			'<div class="row default">' +
				'<div class="cards go-kelembagaan">' +
					'<div class="navigation-box icon-add">' +
						'<span class="fa fa-sitemap icon-set theme-color"></span>' +
						'<div class="caption">' +
							'<span>Kelembagaan</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="cards go-koleksi">' +
					'<div class="navigation-box icon-add">' +
						'<span class="fa fa-book icon-set text-green"></span>' +
						'<div class="caption">' +
							'<span>Koleksi</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="col-md-4">' +
			'<div class="row default">' +
				'<div class="cards go-autentikasi">' +
					'<div class="navigation-box icon-add">' +
						'<span class="fa fa-lock icon-set text-orange"></span>' +
						'<div class="caption">' +
							'<span>Autentikasi</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="cards go-bantuan">' +
					'<div class="navigation-box icon-add">' +
						'<span class="fa fa-support icon-set text-yellow"></span>' +
						'<div class="caption">' +
							'<span>Bantuan</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="col-md-4">' +
			'<div class="row default">' +
				'<div class="cards go-pengaturan">' +
					'<div class="navigation-box icon-add">' +
						'<span class="fa fa-gear icon-set text-purple"></span>' +
						'<div class="caption">' +
							'<span>Pengaturan</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="cards go-keluar">' +
					'<div class="navigation-box icon-add">' +
						'<span class="fa fa-power-off icon-set text-red"></span>' +
						'<div class="caption">' +
							'<span>Keluar</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
							
		body	= body + '</div></div></div>';
		content = '<section id="dashboard">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(1, 'Dashboard'));
		footPage.html(r_footPageHtml('credit'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".go-kelembagaan").unbind().on('click', function(){ r_navigateTo(1); });
		$(".go-koleksi").unbind().on('click', function(){ r_navigateTo(14); });
		$(".go-autentikasi").unbind().on('click', function(){ r_navigateTo(3); });
		$(".go-bantuan").unbind().on('click', function(){ r_navigateTo(01); });
		$(".go-pengaturan").unbind().on('click', function(){ r_navigateTo(4); });
		$(".go-keluar").unbind().on('click', function(){ r_navigateTo(); });
		
		r_navbarReactor();
	});
}

function r_f0Bantuan(){
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		
		//--open
		body	= '<div class="row no-head"><div class="container">';
		
		body	= body + 
		'<h1>COMING SOON!</h1>' +
		'<p>almost there, wait for new update version.</p>';
		
		body	= body + '</div></div>';
		content = '<section id="dashboard">' + head + body + '</section>';
		//--close
		
		headPage.html(r_headPageHtml(3, 'Bantuan'));
		footPage.html(r_footPageHtml('credit'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		r_navbarReactor();
	});
}

/* maintance */
function clearPacket(){
	pGroup  		= "";
	pTarget			= "";
	pId 			= "";
	pLabel			= "";
	pContainer		= "";
	pReferences		= "";
	pReferencesKey	= "";
	pDecription		= "";
}

/* cards option list */
function showOptionList(){
	var optionHtml = '';
	optionHtml = '<div class="option-pop">';
	
	optionHtml = optionHtml +
	'<div id="option-main" class="option-list">' +
		'<div class="option-frame col-md-4 col-sm-8">' +
			'<ul>' +
				'<li class="head">' + pLabel + '</li>';
				
				for(var loop=0; loop < optionBatch.length; loop++){
					optionHtml = optionHtml +
					'<li id="' + optionBatch[loop].selector + '" p-id=""><button type="button" class="clear btn-icon"><span class="fa fa-' + optionBatch[loop].icon + '"></span>' + optionBatch[loop].label + '</button></li>';
				}
	
	optionHtml = optionHtml +
			'</ul>' +
		'</div>' +
	'</div>' +
	'<div class="option-layer"></div>';
	
	optionHtml = optionHtml + '</div>';
	
	$("body").append(optionHtml);
	$(".option-layer").unbind().on("click", function(){ hideOptionList() });
	$("html, body").css("overflow","hidden");
}

function showOptionConfirm(type){
	var optionHtml  = '';
	var confirmText = '';
	
	switch(type){
		case "delete": confirmText = "menghapus data"; break;
	}
	
	optionHtml = '<div class="option-pop">';
	
	optionHtml = optionHtml +
	'<div id="option-confirm" class="option-list">' +
		'<div class="option-frame col-md-4 col-sm-8">' +
			'<ul>' +
				'<li class="head text-center">Apa anda yakin ' + confirmText + ' ?</li>' +
			'</ul>' +
			'<div class="button-box">' +
				'<div class="col-xs-6 border-right">' +
					'<button type="button" class="clear square option-cancel">Tidak</button>' +
				'</div>' +
				'<div class="col-xs-6">' +
					'<button type="button" class="clear square option-yes">Ya</button>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="option-layer"></div>';
	
	optionHtml = optionHtml + '</div>';
	
	$("body").append(optionHtml);
	$(".option-layer, .option-cancel").unbind().on("click", function(){ hideOptionList() });
	$("html, body").css("overflow","hidden");
}

function hideOptionList(){
	$(".option-pop").remove();
	$("html, body").css("overflow","initial");
}

/* global reactor */
function r_navbarReactor(){
	/*--syncnav menubar*/ syncnavReactor();
	
	$("#option.syncnav .dashboard")  .unbind().on("click", function(){ r_navigateTo(0); });
	$("#option.syncnav .kelembagaan").unbind().on("click", function(){ r_navigateTo(1); });
	$("#option.syncnav .koleksi")	 .unbind().on("click", function(){ r_navigateTo(14); });
	$("#option.syncnav .prestasi")	 .unbind().on("click", function(){ r_navigateTo(16); });
	$("#option.syncnav .autentikasi").unbind().on("click", function(){ r_navigateTo(3); });
	$("#option.syncnav .pengaturan") .unbind().on("click", function(){ r_navigateTo(4); });
	$("#option.syncnav .bantuan") 	 .unbind().on("click", function(){ r_navigateTo(0.1); });
	$("#option.syncnav .log-off")	 .unbind().on("click", function(){ r_navigateTo(); });
	
	$("#notif-ring").unbind().on("click", function(){ r_navigateTo(999); });
}

/* cookies management */
/* =============================================================================================== */
function r_pageSet(page){ r_setCookie('pagePrevious', r_pageReader(), 1); r_setCookie('page', page, 1); }
function r_pageReader(){	
	var page = null;	
	if(r_getCookie('page') != '' && r_getCookie('page') != undefined) { page = parseInt(r_getCookie('page')); }
	return page;
}

function r_pagePreviousReader(){	
	var page = null;
	if(r_getCookie('pagePrevious') != '' && r_getCookie('pagePrevious') != undefined && isNaN(r_getCookie('pagePrevious')) == false) { page = parseInt(r_getCookie('pagePrevious')); }
	return page;
}

function r_tabSet(tab){ r_setCookie('tab', tab, 1); }
function r_tabReader(){	
	var tab = null;	
	if(r_getCookie('tab') != '' && r_getCookie('tab') != undefined) { tab = r_getCookie('tab'); }
	return tab;
}

function r_bentukLembagaSet(data){ 
	r_setCookie('kodeBentukLembaga', data[0], 1); 
	r_setCookie('namaBentukLembaga', data[1], 1); 
}
function r_bentukLembagaReader(){	
	var code = null;	
	var caption = null;
	var data = null;
	if(r_getCookie('kodeBentukLembaga') != '' && r_getCookie('kodeBentukLembaga') != undefined) { code = r_getCookie('kodeBentukLembaga'); }
	if(r_getCookie('namaBentukLembaga') != '' && r_getCookie('namaBentukLembaga') != undefined) { caption = r_getCookie('namaBentukLembaga'); }
	
	data = [code, caption];
	return data;
}

function profile_look_set(id){ r_setCookie('profile_look', id, 1); }
function profile_look_reader(){	return String(r_getCookie('profile_look'));}

// function r_initCookie(){
	//r_setCookie('profile_look', '', 1);
// }

function r_setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function r_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function header_set(data){ r_setCookie('header_log', JSON.stringify(data), 1); }
// function header_read(){ 
	// var result = []; 
	// if(r_getCookie('header_log') != ""){
		// result = JSON.parse(r_getCookie('header_log'));
	// }
	
	// return result; 
// }

function r_clearCookies(){
	r_setCookie('page','',0.1);
	r_setCookie('pagePrevious','',0.1);
	r_setCookie('tab','',0.1);
	r_setCookie('kodeBentukLembaga','',0.1);
	r_setCookie('namaBentukLembaga','',0.1);
	r_setCookie('profile_look','',1);
	// r_setCookie('header_log','',1);
}