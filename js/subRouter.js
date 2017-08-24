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
	// r_navigateTo(15);
	
	// keeping data provinsi, wilayah, kecamatan, kelurahan to global variable
	optionD = p_getData('f4', 'f40', '');
	optionD = optionD.feedData;
});

/* navigation */
function r_navigateTo(index, packet) {
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

function r_customCallBack(formType, group, target, recentId){
	var dataFec = null;
	switch(group){
		case 'f1' : //yama
			switch(target){
				case 'f111' :
					$('#f-sejarah-create input[name="noreg"]').val(recentId);
					$('#f-kelembagaan-create input[name="noreg"]').val(recentId);
					$('#f-sarana-create input[name="noreg"]').val(recentId);
					$('#f-kepengurusan-create input[name="noreg"]').val(recentId);
					$('#f-kegiatanUsaha-create input[name="noreg"]').val(recentId);
					$('#f-koleksi-create input[name="noreg"]').val(recentId);
					$('#f-prestasi-create input[name="noreg"]').val(recentId);
					$('#f-kelembagaan-create input[name="kelurahan"]').attr('readonly','readonly');
					p_formHandler("f-kelembagaan-create", "updateData");
				break;
				case 'f112' :
					p_formHandler("f-sejarah-create", "updateData");
				break;
				case 'f114' :
					p_formHandler("f-kepengurusan-create", "updateData");
				break;
				case 'f115' :
					p_formHandler("f-usaha-create", "updateData");
				break;
				case 'f118' :
					dataKoleksi = p_getData('f1', 'f117',recentId);
					// $("#isiSectionKoleksi").remove();
					$("#daftarSectionKoleksi").remove();
					r_f1KoleksiDataGenerator(dataKoleksi);

					$(".list-remove").unbind().on("click", function(){
						pId = $(this).attr('id');
						if(p_removeData("f1", "f118", pId) == 'success'){ 
							$("#daftarSectionKoleksi").remove();
							dataKoleksi = p_getData('f1', 'f117',recentId);
							r_f1KoleksiDataGenerator(dataKoleksi);
						}; 
						console.log(pId);
					// console.log("isiSectionKoleksi"+$(this).attr('id'));
					}); 
				break;
				case 'f119' :
					dataPrestasi = p_getData('f1', 'f119', recentId);
					var minus = 0;
					$("#isiSectionPrestasi").remove();
					r_f1PrestasiGenerator(dataPrestasi);

					$(".list-remove").unbind().on("click", function(){
						pId = $(this).attr('id');	
						// showOptionList();							
						showOptionConfirm('delete');
						$(".option-yes").unbind().on("click", function(){ 
							hideOptionList(); 
							if(p_removeData("f1", "f119", pId) == 'success'){ 
								minus = minus + 1;
								$("#prestasi"+pId).remove();
								result = dataPrestasi.feedData.length - minus;
								$("#counter").html(result);
							};
						});
					}); 
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
		case "lingkupArea": 
			console.log(targetId);
			$("#" + targetId).val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaKelurahan);
			$("#" + targetId + "_2").val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaKecamatan);
			$("#" + targetId + "_3").val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaWilayah);
			$("#" + targetId + "_4").val(sourcesDetail.list[sources.indexOf(ui.item.value)].namaProvinsi);
			
			$("#" + targetId + "_kode").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeKelurahan);
			$("#" + targetId + "_kode2").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeKecamatan);
			$("#" + targetId + "_kode3").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeWilayah);
			$("#" + targetId + "_kode4").val(sourcesDetail.list[sources.indexOf(ui.item.value)].kodeProvinsi);
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
								'<input placeholder="Username" tabindex="1" type="text" value="" autofocus="autofocus" />' +
								'<span class="fa fa-user text-yellow"></span>' +
							'</div>' +
						'</div>' +
						'<div class="input-box">' +
							'<div class="icon-box left">' +
								'<input placeholder="Password" tabindex="1" type="password" value="" />' +
								'<span class="fa fa-lock text-yellow"></span>' +
							'</div>' +
						'</div>' +
						'<div class="space-box"></div>' +
					'</div>' +
					'<div class="cards flush">' +
						'<div class="cards-header">' +
							'<p class="fixed">&nbsp;</p>' +
							'<div class="btn-collapse left small">' +
								'<button class="clear go-login text-cyan" type="button">Masuk &nbsp; <span class="fa fa-angle-right"></span></button>' +
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
		'</div>';
		
		content = '<section id="login">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(2, 'Login'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(); });
		$(".go-login").unbind().on('click', function(){ r_navigateTo(0); });
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
		// data2 = 'adaan';
		console.log(data); 
		// data    = [
		// 	{
		// 		'group': 'Baru', 'list':[
		// 			{'noreg': '1', 'time': '2017/06/1 10:15', 'caption': 'lorem dolor sit amet 2.'},
		// 			{'noreg': '2', 'time': '2017/05/30 10:15', 'caption': 'lorem dolor sit amet 3.'},
		// 			{'noreg': '3', 'time': '2017/05/29 10:15', 'caption': 'lorem dolor sit amet 4.'},
		// 		]
		// 	},
		// 	{
		// 		'group': 'Riwayat', 'list':[
		// 			{'noreg': '4', 'time': '2017/05/11 10:15', 'caption': 'lorem dolor sit amet 6.'},
		// 			{'noreg': '5', 'time': '2017/05/14 10:15', 'caption': 'lorem dolor sit amet 7.'},
		// 			{'noreg': '6', 'time': '2017/05/15 10:15', 'caption': 'lorem dolor sit amet 8.'},
		// 			{'noreg': '7', 'time': '2017/05/20 10:15', 'caption': 'lorem dolor sit amet 9.'},
		// 		]
		// 	},
		// ];
		
		//--open
		head = '';
		body = '<div class="row"><div class="container"><div class="col-md-8 col-md-offset-2">';
		
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

/*F1*/
function r_f1Kelembagaan() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= p_getData('f4', 'f431'); 
		data 	= data.feedData; 
		
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-4 hidden-xs hidden-sm">';
		part[1] = '<div class="col-md-6 col-md-offset-1">';
		
		part[0] = part[0] +
		'<div class="cards-label">' +
			'<p><strong>Rekapitulasi data</strong></p>' +
			'<p>menunjukan kalkulasi data lembaga yang sudah diverifikasi.</p>' +
		'</div>' +
		'<div class="space-box"></div>';
		
		part[1] = part[1] +
		'<div class="cards title">' +
			'<div class="cards-header">' +
				'<h4>Bentuk Lembaga</h4>' +
				'<p>daftar lembaga berdasarkan pengelompokan bentuk lembaga.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//--render data
		for(var loop = 0; loop < data.length; loop++){
			//--left
			part[0] = part[0] +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset text-black">' + data[loop].caption + '</p>' +
					'<div class="btn-collapse right">' +
						'<span id="counter-select">' + data[loop].counter + '</span>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			//--right
			part[1] = part[1] +
			'<div class="cards clear">' +
				'<div class="description-box click-frame group-click" p-id="' + data[loop].noreg + '" p-caption="' + data[loop].caption + '">' +
					'<img class="icon-set" src="img/sources/' + data[loop].picture + '"/>' +
					'<p class="title-set">' + data[loop].caption + '</p>' +
					'<p class="text-set">' + data[loop].description + '</p>' +
				'</div>' +
			'</div>';
			
			mop = "";
		}
		
		part[0] = part[0] + '</div-->';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[1] + part[0] + '</div></div>';
		content = '<section id="kelembagaan">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Kelembagaan'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		$(".group-click").unbind().on('click', function(){ r_navigateTo(11, [$(this).attr('p-id'), $(this).attr('p-caption')]); });
		searchBoxActivator();
		r_navbarReactor();
	});
}

function r_f1DaftarLembaga(packet) {
	
	//-- get direct load
	var kodeBentukLembagaState = null;
	var namaBentukLembagaState = null;
	var dumbBentukLembagaState = null;
	
	if(Array.isArray(packet) == true){
		kodeBentukLembagaState = packet[0];
		namaBentukLembagaState = packet[1];
	}
	
	if(kodeBentukLembagaState == "" || kodeBentukLembagaState == null || kodeBentukLembagaState == "start"){
		dumbBentukLembagaState = r_bentukLembagaReader();
		console.log(dumbBentukLembagaState);
		kodeBentukLembagaState = dumbBentukLembagaState[0];
		namaBentukLembagaState = dumbBentukLembagaState[1];
	}
	
	r_bentukLembagaSet([kodeBentukLembagaState,namaBentukLembagaState]);
	
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data = p_getData('f1', 'f1110', kodeBentukLembagaState);
		data = data.feedData;
		
		//-- set option list on a session
		optionBatch = (data != null) ? data.option : [];
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-3">';
		part[1] = '<div class="col-md-8">';
		
		//--left
		part[0] = part[0] +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset">Filter lembaga</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="button"><span class="fa fa-filter text-yellow"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-filter-select">' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Provinsi</option>' +
						r_optionDHtml('provinsi') +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Wilayah</option>' +
						r_optionDHtml('wilayah') +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Kecamatan</option>' +
						r_optionDHtml('kecamatan') +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Kelurahan</option>' +
						r_optionDHtml('kelurahan') +
					'</select>' +
				'</div>' +
				'<div class="space-box"></div>' +
			'</form>' +
		'</div>';
			
		//--render data
		var tempP = "";
		var tempB = ""; 
		
		if(data != null){
			for(var loop = 0; loop < data.lembaga.length; loop++){	
				if(loop > 0){ tempP = "plus"; }
				if(data.lembaga[loop].collapse == 'y') { tempB = '<span class="btn-collapse">Lihat semua</span>'; } else { tempB = ""; }

				//--right
				part[1] = part[1] +
				'<div class="cards-label ' + tempP + '">' +
					'<p>' +
						'<strong>' + data.lembaga[loop].group + ' (' +  data.lembaga[loop].list.length + ')</strong>' +
						tempB +
					'</p>' +
				'</div>';
				
				for(var loopY = 0; loopY < data.lembaga[loop].list.length; loopY++){	
					part[1] = part[1] +
					'<div id="' + data.lembaga[loop].list[loopY].id + '" class="cards clear">' +
						'<div class="description-box">' +
							'<div class="click-frame">' +
								'<img class="icon-set" src="img/avatar/' + data.lembaga[loop].list[loopY].picture + '"/>' +
								'<p class="title-set">' + data.lembaga[loop].list[loopY].nama + '</p>' +
								'<div class="text-set">' +
									'<span class="id-set">' + data.lembaga[loop].list[loopY].noreg + '</span>' +
									'<span class="desc-text">' + data.lembaga[loop].list[loopY].telp + ' | ' + data.lembaga[loop].list[loopY].email + '</span>' +
								'</div>' +
							'</div>' +
							'<button type="button" class="click-option btn-set" p-id="' + data.lembaga[loop].list[loopY].id + '" p-label="' + data.lembaga[loop].list[loopY].nama + '"><span class="fa fa-ellipsis-v"></span></button>' +
						'</div>' +
						'<div class="detail-box">' +
							'<div class="list-box">' +
								'<div class="list-icon"><span class="fa fa-phone"></span></div>' +
								'<p class="list-text">' + data.lembaga[loop].list[loopY].telp + '</p>' +
							'</div>' +
							'<div class="list-box">' +
								'<div class="list-icon"><span class="fa fa-envelope"></span></div>' +
								'<p class="list-text">' + data.lembaga[loop].list[loopY].email + '</p>' +
							'</div>' +
							'<div class="list-box">' +
								'<div class="list-icon"><span class="fa fa-map-marker"></span></div>' +
								'<p class="list-text">' + data.lembaga[loop].list[loopY].alamat + '</p>' +
							'</div>' +
							'<div class="list-box foot">' +
								'<button type="button" class="clear list-text btn-link detail-click" p-id="' + data.lembaga[loop].list[loopY].id + '">Lihat selengkapnya</button>' +
							'</div>' +
						'</div>' +
					'</div>';
				}
			}
		}
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="kelembagaan">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, namaBentukLembagaState));
		footPage.html(r_footPageHtml('add'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(1); });
		$(".detail-click").unbind().on('click', function(){ r_navigateTo(12, $(this).attr('p-id')); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			showOptionList(); 
			//-- popup
			$("#view-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(12, $(this).attr('p-id')); });
			$("#verification-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(13, $(this).attr('p-id')); });
			$("#edit-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(15, $(this).attr('p-id')); });
		});
		
		$("#add-button").unbind().on('click', function(){ r_navigateTo(15); });
		
		searchBoxActivator();
		detailBoxActivator();
		r_navbarReactor();
	});
}

function r_f1DetailLembaga(packet) {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [{
			'profile':[{
				'avatar'		: 'avatar-default.jpg',
				'noreg'			: '001',
				'nama'			: 'xx',
				'bentukLembaga' : 'Yayasan',
				'catatan' 		: '... ',
				'telp' 			: '123',
				'email' 		: 'a@e.c',
				'sosialMedia'	: 'a@e.c',
				'alamat'		: 'jkl',
			}],
			'detail':[
				{ 
					'groupId': 'kelembagaan', 'groupName': 'Kelembagaan', 'group': 'card', 'type': 'table',
					'items': [
						{'label': 'Bergerak dalam bidang', 'text': 'Pendidikan Agama'},
						{'label': 'Jumlah pengurus', 'text': '5 Orang'},
						{'label': 'Afiliasi', 'text': ''},
						{'label': 'Visi', 'text': ''},
						{'label': 'Misi', 'text': ''},
					],
				},
				{ 
					'groupId': 'legalitas', 'groupName': 'Legalitas', 'group': 'card', 'type': 'table-list',
					'items': [{
						'set': [
							{'color' : 'purple', 'icon' : 'file-text', 'size' : 'large', 'form' : 'text-icon', 'text' : 'Akta notaris'},
							{'color' : '', 'icon' : '', 'size' : 'medium', 'form' : 'text', 'text' : '094950409539'},
							{'color' : '', 'icon' : '', 'size' : 'small', 'form' : 'text', 'text' : '10/05/1999'},
							{'color' : '', 'icon' : '', 'size' : 'medium', 'form' : 'button', 'text' : '23123920001_01_legalitas'},
						],
						'set': [
							{'color' : 'purple', 'icon' : 'file-text', 'size' : 'large', 'form' : 'text-icon', 'text' : 'SK Kemenhukam'},
							{'color' : '', 'icon' : '', 'size' : 'medium', 'form' : 'text', 'text' : '094952309559'},
							{'color' : '', 'icon' : '', 'size' : 'small', 'form' : 'text', 'text' : '14/05/1999'},
							{'color' : '', 'icon' : '', 'size' : 'medium', 'form' : 'button', 'text' : ''},
						],
					}],
				},
				{ 
					'groupId': 'sejarah', 'groupName': 'Sejarah', 'group': 'card', 'type': 'table',
					'items': [
						{'label': 'Sejarah singkat', 'text': ''},
						{'label': 'Tanggal didirikan', 'text': ''},
						{'label': 'Kepemilikan', 'text': 'Pribadi'},
						{'label': 'Sertifikasi', 'text': ''},
						{'label': 'Luas tanah', 'text': ''},
						{'label': 'Luas bangunan', 'text': ''},
						{'label': 'Kondisi bangunan', 'text': ''},
						{'label': 'Jumlah bangunan', 'text': ''},
						{'label': 'Sarana / Prasarana', 'text': 'Ada'},
						{'label': 'Struktur organisasi', 'text': 'Ada'},
						{'label': 'Bahasa pengantar', 'text': 'Bahasa Indonesia'},
						{'label': 'Sensus', 'text': 'Sudah'},
						{'label': 'Bantuan pemerintah', 'text': 'Pernah'},
						{'label': 'Kondisi geografis', 'text': ''},
						{'label': 'Potensi wilayah', 'text': ''},
						{'label': 'Jenis wilayah', 'text': ''},
						{'label': 'Catatan', 'text': ''},
					],
				},
				{ 
					'groupId': 'kepengurusan', 'groupName': 'Kepengurusan', 'group': 'card', 'type': 'table',
					'items': [
						{'label': 'Penanggung jawab', 'text': ''},
						{'label': 'Alamat', 'text': ''},
						{'label': 'Telp', 'text': ''},
						{'label': 'Kewarganegaraan', 'text': ''},
						{'label': 'Tempat, tanggal lahir', 'text': ''},
						{'label': 'Jenis kelamin', 'text': ''},
						{'label': 'Agama', 'text': ''},
						{'label': 'Jabatan lain', 'text': ''},
						{'label': 'Pendidikan', 'text': ''},
						{'label': 'Kompetensi', 'text': ''},
						{'label': 'Catatan', 'text': ''},
					],
				},
				{ 
					'groupId': 'kegiatan-usaha', 'groupName': 'Kegiatan usaha', 'group': 'card', 'type': 'table',
					'items': [
						{'label': 'Nama usaha', 'text': ''},
						{'label': 'Detail usaha', 'text': ''},
						{'label': 'Jenis usaha', 'text': ''},
						{'label': 'Jumlah pekerja', 'text': ''},
						{'label': 'Catatan', 'text': ''},
					],
				},
				{ 
					'groupId': 'koleksi', 'groupName': 'Koleksi', 'group': 'card', 'type': 'list',
					'items': [
						{'color': 'sky', 'icon': 'book', 'text': 'lorem ipsum dolor sit amet.'},	
					],
				},
				{ 
					'groupId': 'prestasi', 'groupName': 'Prestasi', 'group': 'card', 'type': 'list',
					'items': [
						{'color': 'yellow', 'icon': 'trophy', 'text': 'lorem ipsum dolor sit amet.'},	
					],
				},
				{ 
					'groupId': 'saranaPrasarana', 'groupName': 'Sarana / prasarana', 'group': 'img-viewer', 'type': '',
					'items': [
						{'picture': 'saranaPrasarana/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
						{'picture': 'saranaPrasarana/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
						{'picture': 'saranaPrasarana/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
						{'picture': 'saranaPrasarana/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
					],
				},
				{ 
					'groupId': 'kegiatanUsaha', 'groupName': 'Kegiatan usaha', 'group': 'img-viewer', 'type': '',
					'items': [
						{'picture': 'kegiatanUsaha/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
						{'picture': 'kegiatanUsaha/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
						{'picture': 'kegiatanUsaha/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
						{'picture': 'kegiatanUsaha/picture.png', 'desc': 'Lorem ipsum dolor sit amet.'},	
					],
				},
			],
			'option': [
				{'selector': 'download-card', 		'icon': 'download',  'label': 'Unduh (.pdf)'},
				{'selector': 'verification-card', 	'icon': 'check',  	 'label': 'Verifikasi'},
				{'selector': 'edit-card', 			'icon': 'pencil', 	 'label': 'Ubah profil'},
				{'selector': 'delete-card', 		'icon': 'trash',  	 'label': 'Hapus lembaga'},
			]
		}];
		
		//-- set option list on a session
		optionBatch = data[0].option;
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-3">';
		part[1] = '<div class="col-md-9">';
		
		//--left
		part[0] = part[0] +
		'<div class="cards clear">' +
			'<div class="cards-banner-blank long smalltron-ground">' +
				'<div class="user-frame">' +
					'<img src="img/avatar/' + data[0].profile[0].avatar + '">' +
					'<p class="caption">' +
						'<span class="big">' + data[0].profile[0].nama + '</span>' +
						'<span>Yayasan</span>' +
					'</p>' +
					'<button class="btn-option btn-default click-option" p-id="' + data[0].profile[0].noreg + '" p-label="' + data[0].profile[0].nama + '"><i class="fa fa-ellipsis-h"></i></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<div class="desc-frame">' +
				'<div class="desc-box flush">' +
					'<p class="text-set">' + data[0].profile[0].catatan + '</p>' +
				'</div>' +
				'<div class="desc-box i-left">' +
					'<div class="icon-set"><span class="fa fa-phone"></span></div>' +
					'<p class="text-set">' + data[0].profile[0].telp + '</p>' +
				'</div>' +
				'<div class="desc-box i-left">' +
					'<div class="icon-set"><span class="fa fa-envelope"></span></div>' +
					'<p class="text-set">' + data[0].profile[0].email + '</p>' +
				'</div>' +
				'<div class="desc-box i-left">' +
					'<div class="icon-set"><span class="fa fa-globe"></span></div>' +
					'<p class="text-set">' + data[0].profile[0].sosialMedia + '</p>' +
				'</div>' +
				'<div class="desc-box i-left">' +
					'<div class="icon-set"><span class="fa fa-map-marker"></span></div>' +
					'<p class="text-set">' + data[0].profile[0].alamat + '</p>' +
				'</div>' +
			'</div>' +
		'</div>';
			
		//--render data
		for(var loop = 0; loop < data[0].detail.length; loop++){
			//--right
			if(data[0].detail[loop].group == 'card'){
				part[1] = part[1] +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<p class="fixed">' + data[0].detail[loop].groupName + '</p>' +
						'<div class="btn-collapse right">' +
							'<button class="toggle-click clear" toggle-target="' + data[0].detail[loop].groupId+ '-group" type="button"><span class="fa fa-chevron-down"></span></button>' +
						'</div>' +
					'</div>' +
				'</div>';
				
				var endLoopY = 0;
				switch(data[0].detail[loop].type){
					case 'table'		: part[1] = part[1] + '<div class="cards flush toggle-content ' + data[0].detail[loop].groupId + '-group">' + '<div class="desc-frame">';  endLoopY = data[0].detail[loop].items.length; break;
					case 'list'			: part[1] = part[1] + '<div class="cards flush toggle-content ' + data[0].detail[loop].groupId + '-group">' + '<div class="row">'; endLoopY = data[0].detail[loop].items.length; break;
					case 'table-list'	: part[1] = part[1] + '<div class="cards flush toggle-content ' + data[0].detail[loop].groupId + '-group">' + '<div class="row default">'; endLoopY = data[0].detail[loop].items[0].set.length;  break;
				}
				
				
				for(var loopY = 0; loopY < endLoopY; loopY++){	
					switch(data[0].detail[loop].type){
						case 'table'	:
							part[1] = part[1] +
							'<div class="desc-box">' +
								'<div class="labels"><p class="text-set">' + data[0].detail[loop].items[loopY].label + '</p></div>' +
								'<div class="divider"><p class="text-set">' + data[0].detail[loop].items[loopY].text + '</p></div>' +
							'</div>';
						break;
						case 'list'	:
							part[1] = part[1] +
							'<div class="list-box">' +
								'<div class="list-icon bg-' + data[0].detail[loop].items[loopY].color + '"><span class="fa fa-' + data[0].detail[loop].items[loopY].icon + '"></span></div>' +
								'<p class="list-text">' + data[0].detail[loop].items[loopY].text + '</p>' +
							'</div>';
						break;
						case 'table-list'	:
								 if(data[0].detail[loop].items[0].set[loopY].size == "large") { part[1] = part[1] + '<div class="col-md-4">'; }
							else if(data[0].detail[loop].items[0].set[loopY].size == "medium"){ part[1] = part[1] + '<div class="col-md-3">'; }
							else if(data[0].detail[loop].items[0].set[loopY].size == "small") { part[1] = part[1] + '<div class="col-md-2">'; }
							
							var classAdd = "";
							if(loopY > 0){ classAdd = "clear"; }
							part[1] = part[1] +
							'<div class="list-box ' + classAdd + '">';
							
							if(data[0].detail[loop].items[0].set[loopY].form == "text-icon"){ 
								part[1] = part[1] +
								'<div class="list-icon bg-' + data[0].detail[loop].items[0].set[loopY].color + '"><span class="fa fa-' + data[0].detail[loop].items[0].set[loopY].icon + '"></span></div>' +
								'<p class="list-text"><strong>' + data[0].detail[loop].items[0].set[loopY].text + '</strong></p>';
							}else if(data[0].detail[loop].items[0].set[loopY].form == "text"){
								part[1] = part[1] +
								'<p class="list-text">' + data[0].detail[loop].items[0].set[loopY].text + '</p>';
							}else if(data[0].detail[loop].items[0].set[loopY].form == "button"){
								part[1] = part[1] +
								'<button type="button" class="clear list-text btn-link">' + data[0].detail[loop].items[0].set[loopY].text + '</button>';
							}
							
							part[1] = part[1] + 
								'</div>' +
							'</div>';
						break;
					}
				}
				
				part[1] = part[1] +
					'</div>' +
				'</div>';
				
			}else if(data[0].detail[loop].group == "img-viewer"){
				part[1] = part[1] +
				'<div class="cards-label plus">' +
					'<p>' +
						'<strong>' + data[0].detail[loop].groupName + ' (' + data[0].detail[loop].items.length + ')</strong>' +
					'</p>' +
				'</div>' +
				'<div class="row default">';
				for(var loopY = 0; loopY < data[0].detail[loop].items.length; loopY++){	
					part[1] = part[1] +
					'<div class="col-md-3">' +
						'<div class="tumb-cards">' +
							'<div class="picture-box">' +
								'<img class="pic-default" src="img/' + data[0].detail[loop].items[loopY].picture + '" />' +
							'</div>' +
							'<div class="desc-box">' +
								'<p>' + data[0].detail[loop].items[loopY].desc + '</p>' +
							'</div>' +
						'</div>' +
					'</div>';
				}
				part[1] = part[1] + '</div>';
			}	
		}
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="kelembagaan">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Profil lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(11); });
		$(".click-option").unbind().on("click", function(){ 
			showOptionList($(this).attr("p-id"), $(this).attr("p-label"), optionBatch); 
			//-- popup
			$("#verification-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(13, $(this).attr('p-id')); });
			$("#edit-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(15, $(this).attr('p-id')); });
		});
		toggleBoxActivator();
		r_navbarReactor();
	});
}

function r_f1VerifikasiLembaga(packet) {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [{
			'lembaga': [{ 'nama': 'Megantara Narapadya', 'picture': 'avatar-2.jpg', 'noreg': '001', 'bentukLembaga': 'Yayasan'}],
			'list': [
				{ 
					'group': 'Dokumen legalitas', 
					'items': [
						{'id': '1', 'label': 'KTP Penanggung jawab', 'attachment': 'Y', 'picture': 'avatar-default.jpg'},
						{'id': '2', 'label': 'Akta notaris', 'attachment': 'Y', 'picture': ''},
						{'id': '3', 'label': 'SK Kemenhukam', 'attachment': 'Y', 'picture': ''},
					]
				},
				{ 
					'group': 'Survei lapangan', 
					'items': [
						{'id': '4', 'label': 'Keberadaan lembaga', 'attachment': 'N', 'picture': ''},
					]
				},
			]
		}];
		
		//--open
		head	= '';
		
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div class="col-md-10 col-md-offset-1">';
		body	= body + 
		'<div class="cards fluid">' +
			'<div class="description-box click-frame group-click" p-id="' + data[0].lembaga[0].noreg + '">' +
				'<img class="icon-set" src="img/avatar/' + data[0].lembaga[0].picture + '"/>' +
				'<p class="title-set">' + data[0].lembaga[0].nama + '</p>' +
				'<div class="text-set">' +
					'<span class="id-set">' + data[0].lembaga[0].noreg + '</span>' +
				'</div>' +
			'</div>' +
		'</div>';

		//--render data
		var stat = 0;
		var divider = "";
		for(var loop = 0; loop < data[0].list.length; loop++){	
			
			body = body +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed text-purple text-bold">' + data[0].list[loop].group + '</p>' +
				'</div>' +
			'</div>';
			
			for(var loopY = 0; loopY < data[0].list[loop].items.length; loopY++){	
				if(loopY == (data[0].list[loop].items.length - 1)){ divider = "flush"; } else { divider = ""; }
				stat = 0;
				body = body +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="cards ' + divider + '">' +
							'<div class="row default">' +
								'<div class="col-md-7">' +
									'<div class="list-box clear">' +
										'<p class="list-text parent">' + data[0].list[loop].items[loopY].label + '</p>';
				
				if(data[0].list[loop].items[loopY].attachment == "Y") { 
					if(data[0].list[loop].items[loopY].picture != ""){ stat = 1; }
					body = body +
					'<button type="button" class="btn-link clear">Pratinjau (' + stat + ')</button>';
				}
				
				body = body +	
										'<div class="check-box fixed-position right">' +
										  '<input id="' + data[0].list[loop].items[loopY].id + '" type="checkbox">' +
										  '<label for="' + data[0].list[loop].items[loopY].id + '"><span class="inner"></span><span class="icon"></span></label>' +
										'</div>' +
									'</div>' +
									'<div class="space-box hidden-md hidden-lg visible-sm-block visible-xs-block"></div>' +
								'</div>' +
								'<div class="col-md-5">' +
									'<div class="list-box input-clear">' +
										'<div class="input-box pop-right">' +
											'<input placeholder="Catatan revisi" tabindex="1" type="text" value="" />' +
										'</div>' +
										'<div class="list-remove right" p-id=""><span class="fa fa-thumb-tack"></span></div>' +
									'</div>' +
									'<div class="space-box hidden-md hidden-lg visible-sm-block visible-xs-block"></div>' +
								'</div>' +
								'<div class="clearfix"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>';
			}
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Verifikasi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(11); });
		r_navbarReactor();
	});
}
// menu koleksi lembaga
function r_f1KoleksiLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		// data 	= [
		// 	{'title': 'Kitab suci sun go kong [FULL VERSION]', 'group': 'Yayasan', 'owner': 'Manuk dadali'},
		// 	{'title': 'Buku sakti cupat kai', 'group': 'Yayasan', 'owner': 'Manuk dadali'},
		// 	{'title': 'Buku petapa langka vol.2', 'group': 'Yayasan', 'owner': 'Manuk dadali'},
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div id ="koleksi" class="col-md-8 col-md-offset-2">';
		// ];
		
		// 	if($('.search-input').value == null){
		// 		data = p_getData('f1','f117','');
		// 		console.log('ga ada');
		// 	}
		// 	else{
		// 		$(".search-input").unbind().on("keyup", function(){
		// 			data = p_getData('f1','f117',$('.search-input').val());
		// 			console.log(data.feedData)
		// 		});
		// 	}
		// console.log(data.feedData);
		// //--render data
		// for(var loop = 0; loop < data.feedData.length; loop++){	
		// 	body = body +
		// 	'<div class="cards">' +
		// 		'<div class="row default">' +
		// 			'<div class="col-xs-7">' +
		// 				'<div class="list-box">' +
		// 					'<div class="list-icon bg-green"><span class="fa fa-book"></span></div>' +
		// 					'<p class="list-text"><strong>' + data.feedData[loop].title + '</strong></p>' +
		// 				'</div>' +
		// 			'</div>' +
		// 			'<div class="col-xs-5">' +
		// 				'<div class="list-box clear-small">' +
		// 					'<p class="list-text">(' + data.feedData[loop].group + ') &nbsp; ' + data.feedData[loop].owner + '</p>' +
		// 				'</div>' +
		// 			'</div>' +
		// 			'<div class="clearfix"></div>' +
		// 		'</div>' +
		// 	'</div>';
		// }
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, 'Koleksi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		searchBoxActivator();
		r_f1KoleksiGenerator();
		$(".search-input").unbind().on("keyup", function(){ 
			r_f1KoleksiGenerator($(this).val()); 
		});
		r_navbarReactor();
	});
}

function r_f1PrestasiLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';	
		data 	= p_getData('f1', 'f119');
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div id ="section-prestasi" class="col-md-8 col-md-offset-2">';
	
		body	= body + '</div></div></div>';

		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, 'Prestasi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		searchBoxActivator();
		r_f1PrestasiGenerator(data, "list");
		$(".search-input").unbind().on("keyup", function(){ 
			$("#section-prestasi").html("");
			r_f1PrestasiGenerator(p_getData('f1', 'f119', $(this).val()), "list"); 
		});
		r_navbarReactor();
	});
}

function r_f1FormKelembagaan(packet){
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  		= '';
		body  		= '';
		part		= ['',''];
		content 	= '';
		data 		= [];
		selectItems = [];
		dataHead	= [
			{'idFilter': '1', 'form':'Kelembagaan'},
			{'idFilter': '2', 'form':'Legalitas'},
			{'idFilter': '3', 'form':'Sejarah'},
			{'idFilter': '4', 'form':'Kepengurusan'},
			{'idFilter': '5', 'form':'Usaha'},
			{'idFilter': '8', 'form':'Hirarki'},
			{'idFilter': '6', 'form':'Koleksi'},
			{'idFilter': '7', 'form':'Prestasi'},
		];
		
		dataGrup = [];
		dataTemp = [];
		dataLegalitas = [];
		
		
		//-- get data bentuk lembaga
		dataGrup = p_getData('f4', 'f431', '');
		dataGrup = dataGrup.feedData;
		selectItems['bentukLembaga'] = selectHtmlConverter(dataGrup);
		
		//-- get data bidang gerak
		dataGrup = p_getData('f4', 'f433', '');
		dataGrup = dataGrup.feedData;
		selectItems['bidangGerak'] = selectHtmlConverter(dataGrup);
		
		//-- get data lingkup area
		dataTemp 		  = p_getData('f4', 'f401', '');
		sourcesData 	  = dataTemp.feedData[0];
		sourcesDetailData = dataTemp.feedDataDetail;
		
		//-- get data legalitas
		dataLegalitas = [
			{ "kodeBentukLembaga": "1", "namaBentukLembaga": "xx" },
			{ "kodeBentukLembaga": "2", "namaBentukLembaga": "yy" },
			{ "kodeBentukLembaga": "3", "namaBentukLembaga": "zz" },
		];

		//-- get data koleksi
		dataKoleksi = p_getData('f1', 'f117','');
		// if(dataTemp != null){
		// koleksi = dataKoleksi.feedData	// sourcesData = dataTemp;
		 	console.log(dataKoleksi);

		//--open
		head	= 
		'<div class="row head">' +
			'<div class="container">' +
				'<div class="col-md-8 col-md-offset-2">' +
					'<div class="tab-header">' +
						'<ul>';
		
		var state = 'active';
		for(var loop = 0; loop < dataHead.length; loop++){
			head = head + '<li class="tab-navigator ' + state + '" tab-headIndex="' + dataHead[loop].idFilter + '">' + dataHead[loop].form + '</li>';
			state = "";
		}
		
		head = head +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//open
		body =  '<div class="row no-head"><div class="container">';
		
		// KELEMBAGAAN =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container active" tab-contentIndex="1">';
		body = body + 
		'<form id="f-kelembagaan-create" f-group = "f1" f-target = "f111">' +
			'<div class="cards title">' +
				'<div class="cards-header">' +
					'<h4>Kelembagaan</h4>' +
					'<p class="offset">kelengkapan data dapat ditambahkan secara berkala.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="button"><span class="fa fa-trash"></span></button>' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">';
		
		//left
		body = body + 
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="noreg" placeholder="Nama lembaga" tabindex="1" type="hidden" value="" />' +
				'<input name="nama" placeholder="Nama lembaga" tabindex="1" type="text" value="" />' +
			'</div>' +
			'<div class="input-box rows-2">' +
				'<textarea name="alamat" placeholder="Alamat" tabindex="1" class="rows-2"></textarea>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="rt" placeholder="RT" tabindex="1" class="half" type="text" value="" />' +
				'<input name="rw" placeholder="RW" tabindex="1" class="half" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea" name="kelurahan" placeholder="Kelurahan" tabindex="1" type="text" value="" />' +
					'<input id="f111_lingkupArea_kode" name="kodeKelurahan" placeholder="Kelurahan" tabindex="1" type="hidden" value="" />' +
					'<span class="fa fa-magic"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_2" name="kecamatan" placeholder="Kecamatan" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode2" name="kodeKecamatan" placeholder="Kecamatan" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_3" name="wilayah" placeholder="Wilayah" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode3" name="kodeWilayah" placeholder="Wilayah" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_4" name="provinsi" placeholder="Provinsi" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode4" name="kodeProvinsi" placeholder="Provinsi" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="telp" placeholder="Telp" tabindex="2" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="email" placeholder="Email" tabindex="2" type="text" value="" />' +
			'</div>' +
		'</div>';
		
		//center
		body = body + 
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="medsos" placeholder="Media sosial" tabindex="2" type="text" value="" />' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="bentukLembaga" tabindex="2">' +
					'<option value="" selected>Bentuk lembaga</option>' +
					selectItems['bentukLembaga'] +
				'</select>' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="bidangGerak" tabindex="2">' +
					'<option value="" selected>Bidang gerak</option>' +
					selectItems['bidangGerak'] +
				'</select>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="jumlahPengurus" placeholder="Jumlah pengurus" tabindex="2" class="half" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="npwp" placeholder="NPWP" tabindex="3" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="afiliasi" placeholder="Afiliasi" tabindex="3" type="text" value="" />' +
			'</div>' +
			'<div class="input-box rows-2">' +
				'<textarea name="visi" placeholder="Visi" tabindex="3" class="rows-2"></textarea>' +
			'</div>' +
			'<div class="input-box rows-2">' +
				'<textarea name="misi" placeholder="Misi" tabindex="3" class="rows-2"></textarea>' +
			'</div>' +
		'</div>';
		
		//right
		body = body + 
			'<div class="col-md-6">' +
				'<div class="input-box">' +
					'<p>Lampirkan logo</p>' +
				'</div>' +
				'<div class="picture-box">' +
					'<img viewer-id="v-logo" class="pic-default" src="img/sources/picture.png" />' +
				'</div>' +
				'<div class="input-box">' +
					'<div class="icon-box both">' +
						'<label class="browser-box" id="v-logo">' +
							'<p class="placeholder">berkas belum diunggah...</p>' +
							'<input preview-id="v-logo" name="imageUrl" type="file" tabindex="5" />' +
						'</label>' +
						'<button type="button" browser-id="v-logo" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
						'<span class="left fa fa-paperclip text-purple"></span>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="clearfix">&nbsp;</div>' +
			'<div class="col-md-12">' +
				'<div class="input-box flush">' +
					'<input name="catatan" placeholder="Catatan" tabindex="4" type="text" value="" />' +
				'</div>' +
			'</div>' +
		'</form>'+
		'<div class="clearfix">&nbsp;</div>';
		body = body + '</div></div></div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="1">&nbsp;</div>';
		
		
		// LEGALITAS =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + 
		'<!--div class="col-md-12 tab-container" tab-contentIndex="2">' +
			'<div class="cards-label">' +
				'<p><strong>Legalitas (3)</strong></p>' +
			'</div>' +
		'</div-->';
		
		//render
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="2"><div class="row default">';
		for(var loop=0; loop<dataLegalitas.length; loop++){
		body = body + 
		'<div class="col-md-12">' +
			'<div class="cards flush ">' +
				'<div class="cards-header">' +
					'<h5>' + dataLegalitas[loop].namaBentukLembaga + '</h5>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' + 
				'</div>' +
				'<div class="input-box">' +
					'<input placeholder="Nomor" tabindex="5" type="text" value="" />' +
				'</div>' +
				'<div class="input-box">' +
					'<div class="icon-box left">' +
						'<input class="date" placeholder="Tanggal" tabindex="5" type="text" value="" />' +
						'<span class="fa fa-calendar"></span>' +
					'</div>' + 
				'</div>' +
				'<div class="input-box">' +
					'<div class="icon-box both">' +
						'<label class="browser-box" id="legalitas-' + dataLegalitas[loop].namaBentukLembaga + '">' +
							'<p class="placeholder">berkas belum diunggah...</p>' +
							'<input type="file" tabindex="5" />' +
						'</label>' +
						'<button type="button" browser-id="legalitas-' + dataLegalitas[loop].namaBentukLembaga + '" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
						'<span class="left fa fa-paperclip text-purple"></span>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		}
		body = body + '</div></div>';
		body = body + '<div class="clearfix tab-container"  tab-contentIndex="2">&nbsp;</div>';
		
		// SEJARAH =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="3">';
		body = body +
		'<form id="f-sejarah-create" f-group = "f1" f-target = "f112">'+
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Sejarah</h4>' +
					'<p class="offset">latar belakang lembaga.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<div class="input-box rows-2">' +
							'<input name="noreg" tabindex="1" type="hidden" value="" />' +
							'<textarea name="sejarah" placeholder="Sejarah singkat" tabindex="6" class="rows-2"></textarea>' +
						'</div>' +
					'</div>';
			
			//left
			body = body +
			'<div class="col-md-6">' +
				'<div class="input-box">' +
					'<div class="icon-box left">' +
						'<input class="date" name="tanggalBerdiri" placeholder="Tanggal didirikan" tabindex="6" type="text" value="" />' +
						'<span class="fa fa-calendar"></span>' +
					'</div>' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="kepemilikan" tabindex="6">' +
						'<option value="" selected>Kepemilikan</option>' +
						'<option value="Pribadi">Pribadi</option>' +
						'<option value="Keluarga">Keluarga</option>' +
						'<option value="Lembaga">Lembaga</option>' +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="statusTanah" tabindex="6">' +
						'<option value="" selected>Status Tanah</option>' +
						'<option value="Sewa" >Sewa</option>' +
						'<option value="Hak milik" >Hak milik</option>' +
						'<option value="Hak guna bangun" >Hak guna bangun</option>' +
						'<option value="Hak guna pakai" >Hak guna pakai</option>' +
						'<option value="Wakaf" >Wakaf</option>' +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="sertifikasi" tabindex="6">' +
						'<option value="" selected>Sertifikasi - belum</option>' +
						'<option value="Sudah" >Sudah</option>' +
						'<option value="Belum" >Belum</option>' +
					'</select>' +
				'</div>' +
				'<div class="hi-box">' +
					'<div class="input-box half">' +
						'<input name="luasTanah" placeholder="Luast tanah" tabindex="6" type="text" value="" />' +
					'</div>' +
					'<div class="select-box half">' +
						'<select name="satuanT" tabindex="6">' +
							'<option value="" selected>Satuan</option>' +
							'<option value="Meter persegi" >Meter Persegi</option>' +
							'<option value="Hektar" >Hektar</option>' +
						'</select>' +
					'</div>' +
				'</div>' +
				'<div class="hi-box">' +
					'<div class="input-box half">' +
						'<input name="luasBangun" placeholder="Luast bangunan" tabindex="6" type="text" value="" />' +
					'</div>' +
					'<div class="select-box half">' +
						'<select name="satuanB" tabindex="6">' +
							'<option value="" selected>Satuan</option>' +
							'<option value="Meter Persegi" >Meter persegi</option>' +
							'<option value="Hektar" >Hektar</option>' +
						'</select>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			//center
			body = body +
			'<div class="col-md-6">' +
				'<div class="select-box">' +
					'<select name="kondisiBangunan" tabindex="7">' +
						'<option value="" selected>Kondisi bangunan</option>' +
						'<option value="Baik" >Baik</option>' +
						'<option value="Rusak" >Rusak</option>' +
					'</select>' +
				'</div>' +
				'<div class="input-box">' +
					'<input name="jumlahBangunan" placeholder="Jumlah bangunan" tabindex="7" class="half" type="text" value="" />' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="saranaPrasarana" tabindex="7">' +
						'<option value="" selected>Sarana / Prasarana - Tidak ada</option>' +
						'<option value="Ada" >Ada</option>' +
						'<option value="Tidak ada" >Tidak ada</option>' +
					'</select>' +
				'</div>' +
				'<div class="empty-box">&nbsp;</div>' +
				'<div class="input-box">' +
					'<p>Struktur Organisasi</p>' +
				'</div>' +
				'<div class="input-box">' +
					'<div class="icon-box both">' +
						'<label class="browser-box" id="s-org">' +
							'<p class="placeholder">berkas belum diunggah...</p>' +
							'<input name="imageUrl" type="file" tabindex="5" />' +
						'</label>' +
						'<button type="button" browser-id="s-org" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
						'<span class="left fa fa-paperclip text-purple"></span>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			//right
			body = body +
			'<div class="col-md-6">' +
				'<div class="input-box">' +
					'<input name="bahasa" placeholder="Bahasa pengantar" tabindex="8" type="text" value="" />' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="sensus" tabindex="8">' +
						'<option value="" selected>Sensus - belum</option>' +
						'<option value="Sudah" >Sudah</option>' +
						'<option value="Belum" >Belum</option>' +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="bantuan" tabindex="8">' +
						'<option value="" selected>Bantuan pemerintah - belum</option>' +
						'<option value="Sudah" >Sudah</option>' +
						'<option value="Belum" >Belum</option>' +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="kondisiGeo" tabindex="8">' +
						'<option value="" selected>Kondisi geografis</option>' +
						'<option value="Pantai" >Pantai</option>' +
						'<option value="Daratan rendah" >Daratan rendah</option>' +
						'<option value="Daratan tinggi" >Daratan tinggi</option>' +
					'</select>' +
				'</div>' +
				'<div class="input-box">' +
					'<input name="potensi" placeholder="Potensi wilayah" tabindex="8" type="text" value="" />' +
				'</div>' +
				'<div class="input-box">' +
					'<input name="jenisWilayah" placeholder="Jenis Wilayah" tabindex="8" type="text" value="" />' +
				'</div>' +
			'</div>' +
		
		'<div class="clearfix">&nbsp;</div>' +
		'<div class="col-md-12">' +
			'<div class="input-box flush">' +
				'<input name="catatan" placeholder="Catatan" tabindex="8" type="text" value="" />' +
			'</div>' +
		'</div>' +
		
		'</form>'+
		'<div class="clearfix">&nbsp;</div>';

		body = body + '</div></div>';
		body = body + '</div>';
		
		//--sejarah ext

		body = body + 
		'<form id="f-bantuan-create" f-group="f1" f-target="">'+
		'<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="3">';
		body = body +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Bantuan</h4>' +
				'<p class="offset">daftar bantuan yang telah diterima.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			// '<form id="f-koleksi">' +
		'<div class="row default">';
		
		//left
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="noreg" placeholder="" tabindex="13" type="hidden" value="" />' +
				'<input name="bantuanDari" placeholder="bantuan dari" tabindex="13" type="text" value="" />' +
			'</div>' +
		'</div>';
		
		//center		
		//right
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="tahun" placeholder="Tahun" tabindex="13" type="text" value="" />' +
			'</div>' +
			'<div class="space-box"></div>' +
		'</div>';
		
		body = body + '</div></form></div>';

		body = body +
		'<div id="section-bantuan">';
		body = body + '</div></div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="6">&nbsp;</div>';

		//--

		//body = body + '<div class="clearfix tab-container" tab-contentIndex="3">&nbsp;</div>';
		
		
		// SARANA / PRASARANA =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + 
		'<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="3">' +
			'<div class="cards-label plus">' +
				'<p><strong>Sarana / Prasarana (0)</strong></p>' +
			'</div>' +
		'</div>';
		
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="3">';
		
		//left
		body = body +
		'<form id="f-sarana-create" f-group = "f1" f-target = "f113">'+
		'<input name="noreg" placeholder="" tabindex="11" type="hidden" value="">' +
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button name="btn" class="clear" type="submit" value="1"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img viewer-id="v-sarana1" class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan1" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-sarana1">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input preview-id="v-sarana1" name="imageUrl1" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-sarana1" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//center
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button name="btn" class="clear" type="submit" value="2"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan2" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-sarana2">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input name="imageUrl2" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-sarana2" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//center
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button name="btn" class="clear" type="submit" value="3"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan3" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-sarana3">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input name="imageUrl3" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-sarana3" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//right
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button name="btn" class="clear" type="submit" value="4"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan4" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-sarana4">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input name="imageUrl4" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-sarana4" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>'+'</form>';
		body = body + '</div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="3">&nbsp;</div>';
		
		
		// KEPENGURUSAN =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="4">';
		body = body +
		'<form id="f-kepengurusan-create" f-group = "f1" f-target = "f114">' +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Kepengurusan</h4>' +
				'<p class="offset">informasi personal penangggung jawab lembaga.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<div class="row default">';
		
		//left
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="noreg" placeholder="Nama penanggung jawab" tabindex="9" type="hidden" value="" />' +
				'<input name="penanggungJawab" placeholder="Nama penanggung jawab" tabindex="9" type="text" value="" />' +
			'</div>' +
			'<div class="input-box rows-2">' +
				'<textarea name="alamat" placeholder="Alamat" tabindex="9" class="rows-2"></textarea>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="rt" placeholder="RT" tabindex="9" class="half" type="text" value="" />' +
				'<input name="rw" placeholder="RW" tabindex="9" class="half" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f114_lingkupArea_kode" name="kodeKelurahan" placeholder="Kelurahan" tabindex="9" type="hidden" value="" />' +
					'<input id="f114_lingkupArea" name="kelurahan" placeholder="Kelurahan" tabindex="9" type="text" value="" />' +
					'<span class="fa fa-magic"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f114_lingkupArea_kode2" name="kodeKecamatan" placeholder="Kecamatan" tabindex="9" type="hidden" value=""  />' +
					'<input id="f114_lingkupArea_2" name="kecamatan" placeholder="Kecamatan" tabindex="9" type="text" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f114_lingkupArea_kode3" name="kodeWilayah" placeholder="Wilayah" tabindex="9" type="hidden" value=""  />' +
					'<input id="f114_lingkupArea_3" name="wilayah" placeholder="Wilayah" tabindex="9" type="text" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f114_lingkupArea_kode4" name="kodeProvinsi" placeholder="Provinsi" tabindex="9" type="hidden" value="" />' +
					'<input id="f114_lingkupArea_4" name="provinsi" placeholder="Provinsi" tabindex="9" type="text" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//center
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="telp" placeholder="Telp" tabindex="9" type="text" value="" />' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="wargaNegara" tabindex="9">' +
					'<option value="WNI" selected>WNI</option>' +
					'<option value="WNA" >WNA</option>' +
				'</select>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="tempatLahir" placeholder="Tempat lahir" tabindex="9" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input class="date" name="tanggalLahir" placeholder="Tanggal lahir" tabindex="9" type="text" value="" />' +
					'<span class="fa fa-calendar"></span>' +
				'</div>' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="jenisKelamin" tabindex="9">' +
					'<option value="" selected>Jenis kelamin</option>' +
					'<option value="L" >L</option>' +
					'<option value="P" >P</option>' +
				'</select>' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="agama" tabindex="9">' +
					'<option value="" selected>Agama</option>' +
					'<option value="Islam" >Islam</option>' +
					'<option value="Kristen" >Kristen</option>' +
					'<option value="Hindu" >Hindu</option>' +
					'<option value="Budha" >Budha</option>' +
					'<option value="Lainnya" >Lainnya</option>' +
				'</select>' +
			'</div>' +
		'</div>';
		
		//right
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="jabatanLain" placeholder="Jabatan lain" tabindex="9" type="text" value="" />' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="pendidikan" tabindex="9">' +
					'<option value="" selected>Pendidikan</option>' +
					'<option value="SMA / SMK" >SMA / SMK </option>' +
					'<option value="D3" >D3</option>' +
					'<option value="S1" >S1</option>' +
					'<option value="S2" >S2</option>' +
					'<option value="Lainnya" >Lainnya</option>' +
				'</select>' +
			'</div>' +
			'<div class="input-box rows-2">' +
				'<textarea name="kompetensi" placeholder="Kompetensi" tabindex="9" class="rows-2"></textarea>' +
			'</div>' +
		'</div>' +
		'<div class="clearfix">&nbsp;</div>' +
		'<div class="col-md-12">' +
			'<div class="input-box flush">' +
				'<input name="catatan" placeholder="Catatan" tabindex="9" type="text" value="" />' +
			'</div>' +
		'</div>' +
		'</form>'+
		'<div class="clearfix">&nbsp;</div>';
		
		body = body + '</div></div>';		
		body = body + '</div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="4">&nbsp;</div>';
		
		
		// KEGIATAN USAHA =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="5">';
		body = body +
		'<form id="f-kegiatanUsaha-create" f-group="f1" f-target="f115">'+
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Kegiatan Usaha</h4>' +
				'<p class="offset">informasi mengenai usaha terkait yang dilakukan oleh lembaga.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			// '<form id="f-kegiatanUsaha">' +
				'<div class="row default">';
		
		//left
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="noreg" placeholder="Nama usaha" tabindex="10" type="hidden" value="" />' +
				'<input name="namaUsaha" placeholder="Nama usaha" tabindex="10" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="jenisUsaha" placeholder="Jenis usaha" tabindex="10" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="jumlahPekerja" placeholder="Jumlah pekerja" tabindex="10" class="half" type="text" value="" />' +
			'</div>' +
		'</div>';
		
		//right
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box rows-2">' +
				'<textarea name="detailUsaha" placeholder="Detail usaha" tabindex="10" class="rows-2"></textarea>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="catatan" placeholder="Catatan" tabindex="10" type="text" value="" />' +
			'</div>' +
			'<div class="space-box"></div>' +
		'</div>' +
		'<div class="clearfix">&nbsp;</div>';
		
		body = body + '</div></form></div>';		
		body = body + '</div>';
		//body = body + '<div class="clearfix tab-container" tab-contentIndex="5">&nbsp;</div>';
		
		
		// VISUALISASI USAHA =======================================================================
		//=======================================================================
		//=======================================================================
		body = body +
		'<form id="f-visualisasiUsaha-create" f-group="f1" f-target="f116">'+
		'<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="5">' +
			'<div class="cards-label plus">' +
				'<p><strong>Visualisasi usaha (0)</strong></p>' +
			'</div>' +
		'</div>';
		
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="5">';
		
		//left
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img viewer-id="v-usaha1" class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan1" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-usaha1">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input preview-id="v-usaha1" name="imageUrl1" type="file" tabindex="5"/>' +
							'</label>' +
							'<button type="button" browser-id="v-usaha1" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//center
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img viewer-id="v-usaha2" class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan2" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-usaha2">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input preview-id="v-usaha2" name="imageUrl2" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-usaha2" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//center
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img viewer-id="v-usaha3" class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan3" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-usaha3">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input preview-id="v-usaha3" name="imageUrl3" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-usaha3" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		//right
		body = body + 
		'<div class="col-md-6">' +
			'<div class="row default">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h5>&nbsp;</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' +
					'</div>' +
					'<div class="picture-box small">' +
						'<img viewer-id="v-usaha4" class="pic-default" src="img/sources/picture.png" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="keterangan4" placeholder="Keterangan" tabindex="11" type="text" value="" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-usaha4">' +
								'<p class="placeholder">berkas belum diunggah...</p>' +
								'<input preview-id="v-usaha4" name="imageUrl4" type="file" tabindex="5" />' +
							'</label>' +
							'<button type="button" browser-id="v-usaha4" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		body = body + '</div>' + '</form>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="5">&nbsp;</div>';
		
		
		// KOLEKSI =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + 
		'<form id="f-koleksi-create" f-group="f1" f-target="f118">'+
		'<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="6">';
		body = body +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Koleksi</h4>' +
				'<p class="offset">daftar kepemilikan lembaga yang ingin dipublikasikan.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			// '<form id="f-koleksi">' +
		'<div class="row default">';
		
		//left
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="noreg" placeholder="Judul koleksi" tabindex="13" type="hidden" value="" />' +
				'<input name="judulKoleksi" placeholder="Judul koleksi" tabindex="13" type="text" value="" />' +
			'</div>' +
		'</div>';
		
		//center
		body = body +
		'<div class="col-md-6">' +
			'<div class="select-box">' +
				'<select name="jenisKoleksi" tabindex="13">' +
					'<option value="" selected>Jenis koleksi</option>' +
					'<option value="Buku" >Buku</option>' +
					'<option value="Kitab" >Kitab</option>' +
				'</select>' +
			'</div>' +
		'</div>';
		
		//right
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<input name="deskripsi" placeholder="Keterangan" tabindex="13" type="text" value="" />' +
			'</div>' +
			'<div class="space-box"></div>' +
		'</div>';
		
		body = body + '</div></form></div>';

		body = body +
		'<div id="section-koleksi">';
		
		// r_f1KoleksiDataGenerator();
		// //data list
		// //render
		// counter = 0;
		// for(counter = 0;counter < 3; counter ++)
		// {
		// body = body +
		// '<div class="cards">' +
		// 	'<div class="list-box">' +
		// 		'<div class="list-icon bg-sky"><span class="fa fa-book"></span></div>' +
		// 		'<p class="list-text">lorem ipsum dolor sit amet.</p>' +
		// 		'<div class="list-remove"><span class="fa fa-trash"></span></div>' +
		// 	'</div>' +
		// '</div>';
		// }
		body = body + '</div></div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="6">&nbsp;</div>';
		
		
		// PRESTASI =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="7">';
		body = body +
		'<form id="f-prestasi-create" f-group="f1" f-target="f119">'+
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Prestasi</h4>' +
				'<p class="offset">daftar pencapaian lembaga yang ingin dipublikasikan.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			// '<form id="f-prestasi">' +
				'<div class="row default">';
		
		body = body +
		'<div class="col-md-12">' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input name="noreg" placeholder="Keterangan" tabindex="14" type="hidden" value="" />' +
					'<input name="deskripsi" placeholder="Keterangan" tabindex="14" type="text" value="" />' +
					'<span class="fa fa-pencil"></span>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		body = body + '</div></form></div>';
		
		body = body + 
		'<div id="section-prestasi">';
		body = body + '</div></div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="7">&nbsp;</div>';
		
		
		// HIRARKI =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="8">';
		body = body +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Hirarki</h4>' +
				'<p class="offset">kedudukan suatu lembaga terhadap lembaga lainnya.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-koleksi">' +
				'<div class="row default">';
		
		//left
		body = body +
		'<div class="col-md-6">' +
			'<div class="select-box">' +
				'<select tabindex="13">' +
					'<option value="" selected>Pilih hirarki</option>' +
					'<option value="" >Induk lembaga</option>' +
					'<option value="" >Anak lembaga</option>' +
				'</select>' +
			'</div>' +
		'</div>';
		
		//right
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input placeholder="Lembaga" tabindex="13" type="text" value="" />' +
					'<span class="fa fa-magic"></span>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		body = body + '</div></form></div>';
		
		body = body + 
		'<div class="cards-label plus">' +
			'<p><strong>Posisi dalam hirarki</strong></p>' +
		'</div>';
		
		//data list
		//render
		
		body = body +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed text-purple text-bold">Induk lembaga</p>' +
			'</div>' +
		'</div>' +
		'<div class="cards">' +
			'<div class="list-box clear">' +
				'<p class="list-text">lorem ipsum dolor sit amet.</p>' +
				'<div class="list-remove"><span class="fa fa-trash"></span></div>' +
			'</div>' +
		'</div>' +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed text-yellow text-bold">Anak lembaga</p>' +
			'</div>' +
		'</div>' +
		'<div class="cards">' +
			'<div class="list-box clear">' +
				'<p class="list-text">lorem ipsum dolor sit amet.</p>' +
				'<div class="list-remove"><span class="fa fa-trash"></span></div>' +
			'</div>' +
		'</div>';
	
		body = body + '</div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="8">&nbsp;</div>';
		
		
		// CLOSING
		//=====================================================================================
		body	= body + '</div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Form lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(r_pagePreviousReader()); });
		
		// $(".reset").unbind().on('click', function(){ clearTargetForm('f-kelembagaan-create'); });
		tabActivator();
		datePickerActivator();
		fileBrowserActivator();
		imagePreviewActivator();
		r_navbarReactor();
		autoCompleteActivator("f111_lingkupArea", sourcesData, sourcesDetailData, "lingkupArea");
		autoCompleteActivator("f114_lingkupArea", sourcesData, sourcesDetailData, "lingkupArea");
		//r_f1KoleksiDataGenerator();
		//--bottom
		//form reactor
		p_formHandler("f-kelembagaan-create" , "addData");
		p_formHandler("f-sejarah-create" , "addData");
		p_formHandler("f-sarana-create" , "addData");
		p_formHandler("f-kepengurusan-create" , "addData");
		p_formHandler("f-koleksi-create" , "addData");
		p_formHandler("f-prestasi-create" , "addData");
		// clearTargetForm('f-kelembagaan-create');			
	});
}

/*F3*/
function r_f3Autentikasi() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [
			{ 
				'id':'3', 'nama': 'aa', 'noreg': '000', 'rule': 'Pengguna level 1',
				'access': [
					{ 'id': '1',  'label': 'Akses ke dplega 2.0', 	'type': 'parent', 'status': 'active' },
					{ 'id': '2',  'label': 'Akses ke tabah 2.0', 	'type': 'parent', 'status': 'deadactive' },
					{ 'id': '3',  'label': 'Akses ke fkpai online',  'type': 'parent', 'status': 'active' },
				]
			},
			{ 
				'id':'4', 'nama': 'xx', 'noreg': '001', 'rule': 'Pengguna level 1',
				'access': [
					{ 'id': '11',  'label': 'Akses ke dplega 2.0', 	'type': 'parent', 'status': 'active' },
					{ 'id': '22',  'label': 'Akses ke tabah 2.0', 	'type': 'parent', 'status': 'deadactive' },
					{ 'id': '33',  'label': 'Akses ke fkpai online', 'type': 'parent', 'status': 'active' },
				]
			},
		];
		
		
		//--filter render data
		var provinsiHtml  = '';
		var wilayahHtml   = '';
		var kecamatanHtml = '';
		var kelurahanHtml = '';
		var look = 0;
		
		for(look = 0; look < optionD[0].provinsi.length; look++){
			provinsiHtml = provinsiHtml + '<option value="' + optionD[0].provinsi[look].id + '">' + optionD[0].provinsi[look].caption + '</option>';
		}
		
		for(look = 0; look < optionD[0].wilayah.length; look++){
			wilayahHtml = wilayahHtml + '<option value="' + optionD[0].wilayah[look].id + '">' + optionD[0].wilayah[look].caption + '</option>';
		}
		
		for(look = 0; look < optionD[0].kecamatan.length; look++){
			kecamatanHtml = kecamatanHtml + '<option value="' + optionD[0].kecamatan[look].id + '">' + optionD[0].kecamatan[look].caption + '</option>';
		}
		
		for(look = 0; look < optionD[0].kelurahan.length; look++){
			kelurahanHtml = kelurahanHtml + '<option value="' + optionD[0].kelurahan[look].id + '">' + optionD[0].kelurahan[look].caption + '</option>';
		}
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-3 col-md-offset-1">';
		part[1] = '<div class="col-md-7">';
		
		//--left
		part[0] = part[0] +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset">Filter lembaga</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="button"><span class="fa fa-filter"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-filter-select">' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Provinsi</option>' +
						provinsiHtml +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Wilayah</option>' +
						wilayahHtml +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Kecamatan</option>' +
						kecamatanHtml +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select>' +
						'<option value="" selected>Kelurahan</option>' +
						kelurahanHtml +
					'</select>' +
				'</div>' +
				'<div class="space-box"></div>' +
			'</form>' +
		'</div>';
		
		part[1] = part[1] +
		'<div class="cards-label">' +
			'<p><strong>Pemilik akun (' + data.length + ')</strong></p>' +
		'</div>';
		
		//--render data
		var tempP = "";
		var tempR = "";
		for(var loop = 0; loop < data.length; loop++){	
			part[1] = part[1] +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>' + data[loop].nama + '</h4>' +
					'<p>' + data[loop].noreg + ' | ' + data[loop].rule + '</p>' +
					'<div class="btn-collapse right">' +
						'<button class="toggle-click clear" toggle-target="' + data[loop].id + '-group" type="button"><span class="fa fa-chevron-down"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			//-- access list
			tempP = "";
			for(var loopY = 0; loopY < data[loop].access.length; loopY++){
				if(loopY ==  (data[loop].access.length - 1)) { tempP = "flush"; }
				
				switch(data[loop].access[loopY].status){
					case "disabled"	 : tempR = "disabled"; break;
					case "active"	 : tempR = "checked"; break;
					default			 : tempR = ""; break;
				}
				
				part[1] = part[1] +
				'<div class="cards ' + tempP + ' toggle-content ' + data[loop].id + '-group">' +
					'<div class="list-box clear">' +
						'<p class="list-text ' + data[loop].access[loopY].type + '">' + data[loop].access[loopY].label + '</p>' +
						'<div class="switch-box clear fixed-position right">' +
							'<input id="' + data[loop].access[loopY].id + '" type="checkbox" ' + tempR + ' />' +
							'<label for="' + data[loop].access[loopY].id + '"></label>' +
						'</div>' +
					'</div>' +
				'</div>';
			}
		}
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, 'Autentikasi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		searchBoxActivator();
		toggleBoxActivator();
		r_navbarReactor();
	});
}


/*F4*/
function r_f4Pengaturan() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		// data 	= [{
			// 'lembaga':[
				// {
					// 'group':'Data ajuan', 'collapse': 'y', 'list' : [
						// { 'id':'1', 'picture': 'avatar-default.jpg', 'nama': 'xx', 'noreg': '001', 'telp':'123', 'email':'a@e.c', 'alamat': 'jkl' },
						// { 'id':'2', 'picture': 'avatar-default.jpg', 'nama': 'yy', 'noreg': '002', 'telp':'456', 'email':'b@e.c', 'alamat': 'mno' },
					// ]
				// },
				// {
					// 'group':'Data sudah verifikasi', 'collapse': 'n', 'list' : [
						// { 'id':'3', 'picture': 'avatar-default.jpg', 'nama': 'aa', 'noreg': '000', 'telp':'789', 'email':'c@e.c', 'alamat': 'pqr' },
						// { 'id':'4', 'picture': 'avatar-default.jpg', 'nama': 'bb', 'noreg': '004', 'telp':'234', 'email':'d@e.c', 'alamat': 'stu' },
					// ]
				// },
			// ],
			// 'option': [
				// {'selector': 'view-card', 			'icon': 'search', 'label': 'Lihat selengkapnya'},
				// {'selector': 'verification-card', 	'icon': 'check',  'label': 'Verifikasi'},
				// {'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah profil'},
				// {'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus lembaga'},
			// ] 
		// }];
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '';
			
		part[0] = part[0] + 
		'<div class="col-md-4 col-sm-12">' +
			'<div class="cards">' +
				'<div class="group-box">' +
					'<div class="icon-set bg-green"><span class="fa fa-map-marker fa-2x"></span></div>' +
					'<p class="title-set">Linkup area</p>' +
					'<p class="text-set">Lengkapi data pendukung lembaga yang berkaitan dengan Provinsi, wilayah, kecamatan, dan kelurahan.</p>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="group-box fixed">' +
					'<div class="button-set">' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pLingkupArea">Atur konten</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pTransferLembaga">Transfer lembaga</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards">' +
				'<div class="group-box">' +
					'<div class="icon-set bg-purple"><span class="fa fa-list-ol fa-2x"></span></div>' +
					'<p class="title-set">Verifikasi</p>' +
					'<p class="text-set">Verifikasi adalah layanan untuk memilah data lembaga sesuai kriteria.</p>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="group-box fixed">' +
					'<div class="button-set">' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pDaftarVerifikasi">Atur konten</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pGrupVerifikasi">Grup verifikasi</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		
		'<div class="col-md-4 col-sm-12">' +
			'<div class="cards">' +
				'<div class="group-box">' +
					'<div class="icon-set bg-red"><span class="fa fa-sitemap fa-2x"></span></div>' +
					'<p class="title-set">Kelembagaan</p>' +
					'<p class="text-set">Grup pendukung kelengkapan data lembaga yang memungkinkan diatur secara dinamis.</p>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="group-box fixed">' +
					'<div class="button-set">' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pBentukLembaga">Bentuk lembaga</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pLegalitasLembaga">Legalitas lembaga</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pBidangGerakLembaga">Bidang gerak lembaga</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards">' +
				'<div class="group-box">' +
					'<div class="icon-set bg-yellow"><span class="fa fa-newspaper-o fa-2x"></span></div>' +
					'<p class="title-set">Berita</p>' +
					'<p class="text-set">Kelola berita terkini untuk dibagikan dan tampilkan dihalaman utama.</p>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="group-box fixed">' +
					'<div class="button-set">' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pDaftarBerita">Daftar berita</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		
		'<div class="col-md-4 col-sm-12">' +
			'<div class="cards">' +
				'<div class="group-box">' +
					'<div class="icon-set bg-theme"><span class="fa fa-gears fa-2x"></span></div>' +
					'<p class="title-set">Konfigurasi</p>' +
					'<p class="text-set">Kemudahaan untuk mengontrol aplikasi.</p>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="group-box fixed">' +
					'<div class="button-set">' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pImportData">Import data</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pBackupRestore">Backup & restore</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pSetelan">Setelan</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards">' +
				'<div class="group-box">' +
					'<div class="icon-set bg-sky"><span class="fa fa-shield fa-2x"></span></div>' +
					'<p class="title-set">Preferensi akun</p>' +
					'<p class="text-set">Proteksi demi kenyamanan penggunaan anda.</p>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="group-box fixed">' +
					'<div class="button-set">' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pInformasiPersonal">Informasi personal</button></div>' +
						'<div class="button-frame"><button type="button" class="btn-link" id="pGantiPassword">Ganti password</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		part[0] = part[0] + '</div>';
		body	= body 	  + part[0] + '</div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Pengaturan'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$("#pLingkupArea").unbind().on		 ('click', function(){ r_navigateTo(41); });
		$("#pTransferLembaga").unbind().on	 ('click', function(){ r_navigateTo(411); });
		$("#pDaftarVerifikasi").unbind().on	 ('click', function(){ r_navigateTo(42); });
		$("#pGrupVerifikasi").unbind().on	 ('click', function(){ r_navigateTo(421); });
		$("#pBentukLembaga").unbind().on	 ('click', function(){ r_navigateTo(43); });
		$("#pLegalitasLembaga").unbind().on	 ('click', function(){ r_navigateTo(431); });
		$("#pBidangGerakLembaga").unbind().on('click', function(){ r_navigateTo(432); });
		$("#pDaftarBerita").unbind().on		 ('click', function(){ r_navigateTo(44); });
		$("#pImportData").unbind().on		 ('click', function(){ r_navigateTo(45); });
		$("#pBackupRestore").unbind().on	 ('click', function(){ r_navigateTo(451); });
		$("#pSetelan").unbind().on			 ('click', function(){ r_navigateTo(452); });
		$("#pInformasiPersonal").unbind().on ('click', function(){ r_navigateTo(46); });
		$("#pGantiPassword").unbind().on	 ('click', function(){ r_navigateTo(461); });
		$(".back-button").unbind().on		 ('click', function(){ r_navigateTo(0); });
		r_navbarReactor();
	});
}

function r_f4LingkupArea() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		counter = 0;
		dataHead= [
			{'idFilter': '1', 'area':'Provinsi', 'jumlahData': '4'},
			{'idFilter': '2', 'area':'Wilayah', 'jumlahData': '2'},
			{'idFilter': '3', 'area':'Kecamatan', 'jumlahData': '5'},
			{'idFilter': '4', 'area':'Kelurahan', 'jumlahData': '6'},
		];
		
		data = optionD; // updatting global variable
		optionBatch = [
			{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 
		
		
		//--open
		head = 
		'<div class="row head">' +
			'<div class="container">' +
				'<div class="col-md-8 col-md-offset-2">' +
					'<div class="tab-header">' +
						'<ul>';
		
		for(var loop = 0; loop < dataHead.length; loop++){
			head = head + '<li class="tab-navigator" tab-headIndex="' + dataHead[loop].idFilter + '">' + dataHead[loop].area + '</li>';
		}
		
		head = head +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		body = '<div class="row no-head"><div class="container">';
		
		//-- open part
		for(var loop = 0; loop < dataHead.length; loop++){
			part[loop] = '<div id="section-' + dataHead[loop].area + '" tab-contentIndex="' + dataHead[loop].idFilter + '" class="tab-container col-md-8 col-md-offset-2">';
		}
		
		//-- fill part
		//-- Provinsi ==========================================================================
		part[0] = part[0] +
		'<form id="f-provinsi-create" f-group = "f4" f-target = "f411">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Provinsi</h4>' +
					'<p class="offset">form untuk menambahkan data provinsi.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-3">' +
						'<div class="input-box">' +
							'<input placeholder="Kode provinsi" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-9">' +
						'<div class="input-box">' +
							'<input placeholder="Provinsi" name="nama" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards">' +
			'<div class="row default">' +
				'<div class="col-md-12">' +
					'<div class="input-box fixed">' +
						'<div class="icon-box left">' +
							'<input placeholder="Pencarian" class="list-search" f-group = "f4" f-target = "f411" tabindex="13" type="text" value="" />' +
							'<span class="fa fa-search"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		if(data != null && data[0].provinsi != undefined){
			counter = data[0].provinsi.length;
			if(counter > 0){
				for(var loop = 0; loop < counter; loop++){
					part[0] = part[0] + 
					'<div class="cards provinsi-list list-edit" id ="' + loop + 'provinsi-' + data[0].provinsi[loop].noreg + '">' +
						'<div class="row default">' +
							'<div class="col-xs-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].provinsi[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-10">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].provinsi[loop].caption + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].provinsi[loop].caption + '"' + 
										'p-id			="' + data[0].provinsi[loop].noreg + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].provinsi[loop].group + '"' +
										'p-container	="' + loop + 'provinsi-' + data[0].provinsi[loop].noreg + '">' +
										'<span class="fa fa-ellipsis-v"></span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="clearfix"></div>' +
						'</div>' +
					'</div>';
				}
			}
		}else{
			part[0] = part[0] + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		//--
		//-- wilayah ==========================================================================
		part[1] = part[1] +
		'<form id="f-wilayah-create" f-group = "f4" f-target = "f412">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Wilayah</h4>' +
					'<p class="offset">form untuk menambahkan data wilayah berdasarkan provinsi.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-9 col-md-offset-3">' +
						'<div class="select-box">' +
							'<select name="referensi" tabindex="1">' +
								'<option value="" selected>Provinsi</option>' +
								r_optionDHtml('provinsi') +
							'</select>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
					'<div class="col-md-3">' +
						'<div class="input-box">' +
							'<input placeholder="Kode wilayah" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-9">' +
						'<div class="input-box">' +
							'<input placeholder="Wilayah" name="nama" tabindex="21" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards">' +
			'<div class="row default">' +
				'<div class="col-md-12">' +
					'<div class="input-box fixed">' +
						'<div class="icon-box left">' +
							'<input placeholder="Pencarian" tabindex="23" type="text" value="" />' +
							'<span class="fa fa-search"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		if(data != null && data[0].wilayah != undefined){
			counter = data[0].wilayah.length;
			if(counter > 0){
				for(var loop   = 0; loop < data[0].wilayah.length; loop++){
					part[1] = part[1] + 
					'<div class="cards wilayah-list list-edit" id="' + loop + 'wilayah-' + data[0].wilayah[loop].noreg + '">' +
						'<div class="row default">' +
							'<div class="col-xs-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].wilayah[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-6">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].wilayah[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].wilayah[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].wilayah[loop].caption + '"' + 
										'p-id			="' + data[0].wilayah[loop].noreg + '"' +
										'p-references	="' + data[0].wilayah[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].wilayah[loop].group + '"' +
										'p-container	="' + loop + 'wilayah-' + data[0].wilayah[loop].noreg + '">' +
										'<span class="fa fa-ellipsis-v"></span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="clearfix"></div>' +
						'</div>' +
					'</div>';
				}
			}
		}else{
			part[1] = part[1] + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		//--
		//-- kecamatan ==========================================================================
		part[2] = part[2] +
		'<form id="f-kecamatan-create" f-group = "f4" f-target = "f413">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Kecamatan</h4>' +
					'<p class="offset">form untuk menambahkan data kecamatan berdasarkan wilayah.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-9 col-md-offset-3">' +
						'<div class="select-box">' +
							'<select name="referensi" tabindex="1">' +
								'<option value="" selected>Wilayah</option>' +
								r_optionDHtml('wilayah') +
							'</select>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
					'<div class="col-md-3">' +
						'<div class="input-box">' +
							'<input placeholder="Kode kecamatan" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-9">' +
						'<div class="input-box">' +
							'<input placeholder="Kecamatan" name="nama" tabindex="31" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards">' +
			'<div class="row default">' +
				'<div class="col-md-12">' +
					'<div class="input-box fixed">' +
						'<div class="icon-box left">' +
							'<input placeholder="Pencarian" tabindex="33" type="text" value="" />' +
							'<span class="fa fa-search"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		if(data != null && data[0].kecamatan != undefined){
			counter = data[0].kecamatan.length;
			if(counter > 0){
				for(var loop = 0; loop < data[0].kecamatan.length; loop++){
					part[2] = part[2] + 
					'<div class="cards kecamatan-list list-edit" id="' + loop + 'kecamatan-' + data[0].kecamatan[loop].noreg + '">' +
						'<div class="row default">' +
							'<div class="col-xs-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].kecamatan[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-6">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kecamatan[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kecamatan[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].kecamatan[loop].caption + '"' + 
										'p-id			="' + data[0].kecamatan[loop].noreg + '"' +
										'p-references	="' + data[0].kecamatan[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].kecamatan[loop].group + '"' +
										'p-container	="' + loop + 'kecamatan-' + data[0].kecamatan[loop].noreg + '">' +
										'<span class="fa fa-ellipsis-v"></span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="clearfix"></div>' +
						'</div>' +
					'</div>';
				}
			}
		}else{
			part[2] = part[2] + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		
		//--
		//-- kelurahan ==========================================================================
		part[3] = part[3] +
		'<form id="f-kelurahan-create" f-group = "f4" f-target = "f414">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Kelurahan</h4>' +
					'<p class="offset">form untuk menambahkan data kelurahan berdasarkan Kecamatan.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-9 col-md-offset-3">' +
						'<div class="select-box">' +
							'<select name="referensi" tabindex="1">' +
								'<option value="" selected>Kecamatan</option>' +
								r_optionDHtml('kecamatan') +
							'</select>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
					'<div class="col-md-3">' +
						'<div class="input-box">' +
							'<input placeholder="Kode kelurahan" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-9">' +
						'<div class="input-box">' +
							'<input placeholder="Kelurahan" name="nama" tabindex="31" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards">' +
			'<div class="row default">' +
				'<div class="col-md-12">' +
					'<div class="input-box fixed">' +
						'<div class="icon-box left">' +
							'<input placeholder="Pencarian" tabindex="33" type="text" value="" />' +
							'<span class="fa fa-search"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		if(data != null && data[0].kelurahan != undefined){
			counter = data[0].kelurahan.length;
			if(counter > 0){
				for(var loop = 0; loop < data[0].kelurahan.length; loop++){
					part[3] = part[3] + 
					'<div class="cards kelurahan-lis list-editt" id="' + loop + 'kelurahan-' + data[0].kelurahan[loop].noreg + '">' +
						'<div class="row default">' +
							'<div class="col-xs-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].kelurahan[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-6">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kelurahan[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kelurahan[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].kelurahan[loop].caption + '"' + 
										'p-id			="' + data[0].kelurahan[loop].noreg + '"' +
										'p-references	="' + data[0].kelurahan[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].kelurahan[loop].group + '"' +
										'p-container	="' + loop + 'kelurahan-' + data[0].kelurahan[loop].noreg + '">' +
										'<span class="fa fa-ellipsis-v"></span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="clearfix"></div>' +
						'</div>' +
					'</div>';
				}
			}
		}else{
			part[3] = part[3] + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		
		//-- close part
		for(var loop   = 0; loop < dataHead.length; loop++){
			part[loop] = part[loop] + '</div>';
			body       = body + part[loop];
		}
		
		body	= body + '</div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Lingkup Area'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target')
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4LingkupAreaEditor(pTarget, pId, pLabel, pReferences); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove(); 
						clearPacket();
					}; 
				});
			});
		});
		
		/*tab reader*/
		if(r_tabReader() == null){
			r_tabSet(1);
			$('[tab-headIndex = "1"]').addClass('active');
			$('[tab-contentIndex = "1"]').addClass('active');
		}else{
			$('[tab-headIndex = "' + r_tabReader() + '"]').addClass('active');
			$('[tab-contentIndex = "' + r_tabReader() + '"]').addClass('active');
		}
		
		tabActivator();
		fileBrowserActivator();
		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-provinsi-create" , "addData");
		p_formHandler("f-wilayah-create"  , "addData");
		p_formHandler("f-kecamatan-create", "addData");
		p_formHandler("f-kelurahan-create", "addData");
	});
}

function r_f4LingkupAreaEditor(target, id, label, referencesKey){
	switch(target){
		case "f411":
			$("#f-provinsi-create [name='kode']").val(id).attr('readonly','readonly');
			$("#f-provinsi-create [name='nama']").val(label);
			p_formHandler("f-provinsi-create" , "updateData");
		break;
		case "f412":
			$("#f-wilayah-create [name='kode']").val(id).attr('readonly','readonly');
			$("#f-wilayah-create [name='nama']").val(label);
			$("#f-wilayah-create [name='referensi']").val(referencesKey);
			p_formHandler("f-wilayah-create" , "updateData");
		break;
		case "f413":
			$("#f-kecamatan-create [name='kode']").val(id).attr('readonly','readonly');
			$("#f-kecamatan-create [name='nama']").val(label);
			$("#f-kecamatan-create [name='referensi']").val(referencesKey);
			p_formHandler("f-kecamatan-create" , "updateData");
		break;
		case "f414":
			$("#f-kelurahan-create [name='kode']").val(id).attr('readonly','readonly');
			$("#f-kelurahan-create [name='nama']").val(label);
			$("#f-kelurahan-create [name='referensi']").val(referencesKey);
			p_formHandler("f-kelurahan-create" , "updateData");
		break;
	}
} 

function r_f4LingkupAreaDataGenerator(formType, type, data, sectionId){
	var genHtml = "";
	if(data.length > 0){
		if(type == 'provinsi'){
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards provinsi-list list-edit" id ="provinsi-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-2">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
								'<p class="list-text">' + data[loop].noreg + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-10">' +
							'<div class="list-box clear">' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f411"' +
									'p-container	="provinsi-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}else{
			var vTemp ="";
			if		(type == "wilayah")  { vTemp = "f412"; }
			else if	(type == "kecamatan"){ vTemp = "f413"; }
			else if (type == "kelurahan"){ vTemp = "f414"; }
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards ' + type + '-list" id="' + type + '-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-2">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
								'<p class="list-text">' + data[loop].noreg + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-6">' +
							'<div class="list-box clear">' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-4">' +
							'<div class="list-box clear">' +
								'<p class="list-text">' + data[loop].references + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-references	="' + data[loop].referencesKey + '"' +
									'p-group		="f4"' + 
									'p-target		="' + vTemp + '"' +
									'p-container	="' + type + '-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}
	}else{
		genHtml = genHtml +
		'<div class="cards emptyList">' +
			'<div class="row default">' +
				'<div class="col-xs-12">' +
					'<div class="list-box text-center clear">' +
						'<p class="list-text">Data tidak ditemukan</p>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	if(formType == "addData"){
		$("#" + sectionId + ' .emptyList').remove();
		$("#" + sectionId).append(genHtml);
	}else if (formType == "updateData"){
		$("#" + pContainer).replaceWith(genHtml);
	}
	
	//reactor
	$(".click-option").unbind().on("click", function(){ 
		//packet session
		clearPacket();
		pGroup 		= $(this).attr('p-group');
		pTarget		= $(this).attr('p-target')
		pId			= $(this).attr('p-id');
		pLabel		= $(this).attr('p-label');
		pContainer		= $(this).attr('p-container');
		pReferences		= $(this).attr('p-references');
		pReferencesKey	= $(this).attr('p-referencesKey');
		showOptionList(); 
		
		//-- option activator
		$("#edit-card").unbind().on("click", function(){ 
			hideOptionList(); 
			r_f4LingkupAreaEditor(pTarget, pId, pLabel, pReferences); 
		});

		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});
}

function r_f4TransferLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div class="col-md-10 col-md-offset-1">';
		body = body + 
		'<div class="row default">' +
			'<div class="col-md-4">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<p class="fixed offset">Filter lembaga</p>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="button"><span class="fa fa-filter text-yellow"></span></button>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="cards flush">' +
					'<form id="f-verifikasi-create">' +
						'<div class="row default">' +
							'<div class="col-md-12">' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Bentuk lembaga</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Provinsi</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Wilayah</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kecamatan</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kelurahan</option>' +
									'</select>' +
								'</div>' +
								'<div class="space-box"></div>' +
							'</div>' +
						'</div>' +
					'</form>' +
				'</div>' +
			'<!--/div>' +
			'<div class="col-md-6"-->' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<p class="fixed offset">Area transfer</p>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="button"><span class="fa fa-random text-purple"></span></button>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<p class="fixed offset text-bold text-cyan">Lembaga terpilih</p>' +
						'<div class="btn-collapse right">' +
							'<span id="counter-select" class="text-bold">0</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="cards flush">' +
					'<form id="f-verifikasi-create">' +
						'<div class="row default">' +
							'<div class="col-md-12">' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Provinsi</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Wilayah</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kecamatan</option>' +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kelurahan</option>' +
									'</select>' +
								'</div>' +
								'<div class="space-box"></div>' +
							'</div>' +
						'</div>' +
					'</form>' +
				'</div>' +
			'</div>';
		
		body = body + '<div class="col-md-8">';
		body = body + 
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar lembaga (' + data.length + ')</strong>' +
			'</p>' +
		'</div>';
		
		var colorSet = 0;
		var colorFill = "";
		for(var loop = 0; loop < data.length; loop++){
			colorSet = loop;
			switch(colorSet){
				case 0: colorFill = 'sky'; break;
				case 1: colorFill = 'orange'; break;
				case 2: colorFill = 'yellow'; break;
				case 3: colorFill = 'green'; break;
				case 4: colorFill = 'purple'; break;
				case 5: colorFill = 'theme'; break;
				case 6: colorFill = 'red'; break;
				default: colorFill = 'green'; break;
			}
			body = body + 
			'<div class="cards transfer-list">' +
				'<div class="list-box">' +
					'<div class="list-icon bg-' + colorFill + '"><span class="fa fa-sitemap"></span></div>' +
					'<p class="list-text">' + data[loop].caption + '</p>' +
					'<div class="check-box fixed-position right">' +
					  '<input id="' + data[loop].noreg + '" class="select-button" type="checkbox">' +
					  '<label for="' + data[loop].noreg + '"><span class="inner"></span><span class="icon"></span></label>' +
					'</div>' +
				'</div>' +
			'</div>';
		}	
		
		body = body + '</div>';
		
		body = body + 
			'<div class="clearfix"></div>' +
		'</div>';
		
		
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Transfer lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		r_navbarReactor();
		
		// --custom reactor
		$(".select-button").on('click', function(){
			if($(this).is(":checked")){
				$('#counter-select').html(parseInt($('#counter-select').html()) + 1);
			}else{
				$('#counter-select').html(parseInt($('#counter-select').html()) - 1);
			}
		});
	});
}

function r_f4DaftarVerifikasi() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'group': 'Verifikasi lapangan', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'group': 'Verifikasi lapangan', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'group': 'Verifikasi lapangan', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		optionBatch = [
			{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 
		
		counter = 0;
		data = p_getData('f4', 'f422', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		dataGrup = p_getData('f4', 'f421', '');
		dataGrup = dataGrup.feedData;
		grupHtml = "";
		for(var loop=0; loop<dataGrup.length;loop++){
			grupHtml = grupHtml +
			'<option value="' + dataGrup[loop].noreg + '">' + dataGrup[loop].caption + '</option>';
		}
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-verifikasi" class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-verifikasi-create" f-group = "f4" f-target = "f422">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Verifikasi</h4>' +
					'<p class="offset">form untuk menambahkan subjek verifikasi.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-6">' +
						'<div class="input-box">' +
							'<input name="pId" tabindex="1" type="hidden" value="" />' +
							'<input placeholder="verifikasi" name="nama" tabindex="2" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-6">' +
						'<div class="select-box">' +
							'<select tabindex="1" name="referensi">' +
								'<option value="" selected>Grup verifikasi</option>' +
								grupHtml +
							'</select>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar verifikasi (' + counter + ')</strong>' +
			'</p>' +
		'</div>';
		
		if(counter > 0){
			for(var loop = 0; loop < data.length; loop++){
				body = body + 
				'<div class="cards verifikasi-list" id="verifikasi-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-8">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-purple"><span class="fa fa-list-ol"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-4">' +
							'<div class="list-box clear-small">' +
								'<p class="list-text">' + data[loop].group + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-references	="' + data[loop].referencesKey + '"' +
									'p-group		="f4"' + 
									'p-target		="f422"' +
									'p-container	="verifikasi-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}else{
			body = body + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Verifikasi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target')
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4VerifikasiDataEditor(pTarget, pId, pLabel, pReferences); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove(); 
						clearPacket();
					}; 
				});
			});
		});

		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-verifikasi-create" , "addData");
	});
}

function r_f4GrupVerifikasi() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		optionBatch = [
			{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 
		
		counter = 0;
		data = p_getData('f4', 'f421', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }

		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-grupVerifikasi" class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-grupVerifikasi-create" f-group = "f4" f-target = "f421">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Grup Verifikasi</h4>' +
					'<p class="offset">form untuk menambahkan grup verifikasi.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<div class="input-box">' +
							'<input name="pId" tabindex="1" type="hidden" value="" />' +
							'<input placeholder="Grup verifikasi" name="nama" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar grup (' + counter + ')</strong>' +
			'</p>' +
		'</div>';
		
		if(counter > 0){
			for(var loop = 0; loop < data.length; loop++){
				body = body + 
				'<div class="cards grupVerifikasi-list" id="grupVerifikasi-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-12">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-purple"><span class="fa fa-list-ul"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f421"' +
									'p-container	="grupVerifikasi-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}	
		}else{
			body = body + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Grup Verifikasi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target')
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4VerifikasiDataEditor(pTarget, pId, pLabel, pReferences); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove(); 
						clearPacket();
					}; 
				});
			});
		});

		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-grupVerifikasi-create" , "addData");
	});
}

function r_f4VerifikasiDataEditor(target, id, label, referencesKey){
	switch(target){
		case "f421":
			$("#f-grupVerifikasi-create [name='pId']").val(id).attr('readonly','readonly');
			$("#f-grupVerifikasi-create [name='nama']").val(label);
			p_formHandler("f-grupVerifikasi-create" , "updateData");
		break;
		case "f422":
			$("#f-verifikasi-create [name='pId']").val(id).attr('readonly','readonly');
			$("#f-verifikasi-create [name='nama']").val(label);
			$("#f-verifikasi-create [name='referensi']").val(referencesKey);
			p_formHandler("f-verifikasi-create" , "updateData");
		break;
	}
} 

function r_f4VerifikasiDataGenerator(formType, type, data, sectionId){
	var genHtml = "";
	if(data.length > 0){
		if(type == 'grupVerifikasi'){
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards grupVerifikasi-list list-edit" id ="grupVerifikasi-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-12">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-purple"><span class="fa fa-list-ul"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f421"' +
									'p-container	="grupVerifikasi-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}else if(type == 'verifikasi'){
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards verifikasi-list" id="verifikasi-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-8">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-purple"><span class="fa fa-list-ol"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-4">' +
							'<div class="list-box clear">' +
								'<p class="list-text">' + data[loop].references + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-references	="' + data[loop].referencesKey + '"' +
									'p-group		="f4"' + 
									'p-target		="f422"' +
									'p-container	="verifikasi-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}
	}else{
		genHtml = genHtml +
		'<div class="cards emptyList">' +
			'<div class="row default">' +
				'<div class="col-xs-12">' +
					'<div class="list-box text-center clear">' +
						'<p class="list-text">Data tidak ditemukan</p>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}
	
	if(formType == "addData"){
		$("#" + sectionId + ' .emptyList').remove();
		$("#" + sectionId).append(genHtml);
	}else if (formType == "updateData"){
		$("#" + pContainer).replaceWith(genHtml);
	}
	
	//reactor
	$(".click-option").unbind().on("click", function(){ 
		//packet session
		clearPacket();
		pGroup 		= $(this).attr('p-group');
		pTarget		= $(this).attr('p-target')
		pId			= $(this).attr('p-id');
		pLabel		= $(this).attr('p-label');
		pContainer		= $(this).attr('p-container');
		pReferences		= $(this).attr('p-references');
		pReferencesKey	= $(this).attr('p-referencesKey');
		showOptionList(); 
		
		//-- option activator
		$("#edit-card").unbind().on("click", function(){ 
			hideOptionList(); 
			r_f4VerifikasiDataEditor(pTarget, pId, pLabel, pReferences); 
		});
		
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});
}

function r_f4BentukLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'caption': 'Yayasan', 'description': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'caption': 'Pondok Pesantren', 'description': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'caption': 'RA', 'description': 'lorem dolor sit amet 4.'},
		];
		
		optionBatch = [
			{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 
		
		counter = 0;
		data = p_getData('f4', 'f431', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-bentukLembaga" class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-bentukLembaga-create" f-group="f4" f-target="f431">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Bentuk lembaga</h4>' +
					'<p class="offset">form untuk menambahkan data bentuk lembaga.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<div class="input-box">' +
							'<input name="pId" tabindex="1" type="hidden" value="" />' +
							'<input placeholder="Bentuk lembaga" name="nama" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-6">' +
						'<div class="input-box rows-2">' +
							'<textarea placeholder="Deskripsi" name="deskripsi" tabindex="2" class="rows-2"></textarea>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar grup (' + counter + ')</strong>' +
			'</p>' +
		'</div>';
		
		if(counter > 0){
			for(var loop = 0; loop < data.length; loop++){
				body = body + 
				'<div class="cards bentukLembaga-list" id="bentukLembaga-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-4">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-red"><span class="fa fa-sitemap"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-8">' +
							'<div class="list-box clear-small">' +
								'<p class="list-text">' + data[loop].description + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f431"' +
									'p-container	="bentukLembaga-' + data[loop].noreg + '" ' +
									'p-description	="' + data[loop].description + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}else{
			body = body + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Bentuk lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target')
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			pDecription		= $(this).attr('p-description');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4KelembagaanSectionEditor(pTarget, pId, pLabel, pReferences, pDecription); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove(); 
						clearPacket();
					}; 
				});
			});
		});

		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-bentukLembaga-create" , "addData");
	});
}

function r_f4LegalitasLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'group': 'Pondok Pesantren', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		optionBatch = [
			{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 
		
		counter = 0;
		data = p_getData('f4', 'f432', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		dataGrup = p_getData('f4', 'f431', '');
		dataGrup = dataGrup.feedData;
		grupHtml = "";
		for(var loop=0; loop<dataGrup.length;loop++){
			grupHtml = grupHtml +
			'<option value="' + dataGrup[loop].noreg + '">' + dataGrup[loop].caption + '</option>';
		}
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-legalitas" class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-legalitas-create" f-group="f4" f-target="f432">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Legalitas</h4>' +
					'<p class="offset">form untuk menambahkan data legalitas berdasarkan bentuk lembaga.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-8">' +
						'<div class="input-box">' +
							'<input tabindex="2" name="pId" type="hidden" value="" />' +
							'<input placeholder="legalitas" name="nama" tabindex="2" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="select-box">' +
							'<select tabindex="1" name="referensi">' +
								'<option value="" selected>Bentuk lembaga</option>' +
								grupHtml +
							'</select>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar legalitas (' + counter + ')</strong>' +
			'</p>' +
		'</div>';
		
		if(counter > 0){
			for(var loop = 0; loop < data.length; loop++){
				body = body + 
				'<div class="cards legalitas-list" id="legalitas-' + data[loop].noreg + '">' +
						'<div class="row default">' +
							'<div class="col-xs-8">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-red"><span class="fa fa-file-text-o"></span></div>' +
									'<p class="list-text">' + data[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[loop].caption + '"' + 
										'p-id			="' + data[loop].noreg + '"' +
										'p-references	="' + data[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="f432"' +
										'p-container	="legalitas-' + data[loop].noreg + '">' +
										'<span class="fa fa-ellipsis-v"></span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="clearfix"></div>' +
						'</div>' +
					'</div>';
			}	
		}else{
			body = body + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Legalitas lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target')
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4KelembagaanSectionEditor(pTarget, pId, pLabel, pReferences); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove(); 
						clearPacket();
					}; 
				});
			});
		});

		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-legalitas-create" , "addData");
	});
}

function r_f4BidangGerakLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'group': 'Yayasan', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'group': 'Pondok Pesantren', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		optionBatch = [
			{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 
		
		counter = 0;
		data = p_getData('f4', 'f433', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-bidangGerak" class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-bidangGerak-create" f-group="f4" f-target="f433">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Bidang gerak lembaga</h4>' +
					'<p class="offset">form untuk menambahkan data bidang gerak lembaga.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<div class="input-box">' +
							'<input name="pId" tabindex="2" type="hidden" value="" />' +
							'<input placeholder="Bidang gerak lembaga" name="nama" tabindex="2" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar bidang (' + counter + ')</strong>' +
			'</p>' +
		'</div>';
		
		if(counter > 0){
			for(var loop = 0; loop < data.length; loop++){
				body = body + 
				'<div class="cards bidangGerak-list" id="bidangGerak-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-12">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-red"><span class="fa fa-road"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f433"' +
									'p-container	="bidangGerak-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}	
		}else{
			body = body + 
			'<div class="cards emptyList">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box text-center clear">' +
							'<p class="list-text">Data tidak ditemukan</p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Bidang gerak'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target')
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4KelembagaanSectionEditor(pTarget, pId, pLabel, pReferences); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove(); 
						clearPacket();
					}; 
				});
			});
		});

		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-bidangGerak-create" , "addData");
	});
}

function r_f4KelembagaanSectionEditor(target, id, label, referencesKey, description){
	switch(target){
		case "f431":
			$("#f-bentukLembaga-create [name='pId']").val(id).attr('readonly','readonly');
			$("#f-bentukLembaga-create [name='nama']").val(label);
			$("#f-bentukLembaga-create [name='deskripsi']").val(description);
			p_formHandler("f-bentukLembaga-create" , "updateData");
		break;
		case "f432":
			$("#f-legalitas-create [name='pId']").val(id).attr('readonly','readonly');
			$("#f-legalitas-create [name='nama']").val(label);
			$("#f-legalitas-create [name='referensi']").val(referencesKey);
			p_formHandler("f-legalitas-create" , "updateData");
		break;
		case "f433":
			$("#f-bidangGerak-create [name='pId']").val(id).attr('readonly','readonly');
			$("#f-bidangGerak-create [name='nama']").val(label);
			p_formHandler("f-bidangGerak-create" , "updateData");
		break;
	}
} 

function r_f4KelembagaanSectionGenerator(formType, type, data, sectionId){
	var genHtml = "";
	if(data.length > 0){
		if(type == 'bentukLembaga'){
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards bentukLembaga-list list-edit" id ="bentukLembaga-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-4">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-red"><span class="fa fa-sitemap"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-8">' +
							'<div class="list-box clear-small">' +
								'<p class="list-text">' + data[loop].description + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f431"' +
									'p-description	="' + data[loop].description + '"' +
									'p-container	="bentukLembaga-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}else if(type == 'legalitas'){
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards legalitas-list" id="legalitas-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-8">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-red"><span class="fa fa-file-text-o"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-4">' +
							'<div class="list-box clear">' +
								'<p class="list-text">' + data[loop].references + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-references	="' + data[loop].referencesKey + '"' +
									'p-group		="f4"' + 
									'p-target		="f432"' +
									'p-container	="legalitas-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}else if(type == 'bidangGerak'){
			for(var loop=0; loop<data.length; loop++){
				genHtml = genHtml +
				'<div class="cards bidangGerak-list" id="bidangGerak-' + data[loop].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-12">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-red"><span class="fa fa-road"></span></div>' +
								'<p class="list-text">' + data[loop].caption + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[loop].caption + '"' + 
									'p-id			="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f433"' +
									'p-container	="bidangGerak-' + data[loop].noreg + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}
	}else{
		genHtml = genHtml +
		'<div class="cards emptyList">' +
			'<div class="row default">' +
				'<div class="col-xs-12">' +
					'<div class="list-box text-center clear">' +
						'<p class="list-text">Data tidak ditemukan</p>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	}
	
	if(formType == "addData"){
		$("#" + sectionId + ' .emptyList').remove();
		$("#" + sectionId).append(genHtml);
	}else if (formType == "updateData"){
		$("#" + pContainer).replaceWith(genHtml);
	}
	
	//reactor
	$(".click-option").unbind().on("click", function(){ 
		//packet session
		clearPacket();
		pGroup 			= $(this).attr('p-group');
		pTarget			= $(this).attr('p-target')
		pId				= $(this).attr('p-id');
		pLabel			= $(this).attr('p-label');
		pContainer		= $(this).attr('p-container');
		pReferences		= $(this).attr('p-references');
		pReferencesKey	= $(this).attr('p-referencesKey');
		pDecription		= $(this).attr('p-description');
		showOptionList(); 
		
		//-- option activator
		$("#edit-card").unbind().on("click", function(){ 
			hideOptionList(); 
			r_f4KelembagaanSectionEditor(pTarget, pId, pLabel, pReferences, pDecription); 
		});
		
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});
}

function r_f4DaftarBerita() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [
			{'id': '1', 'title': 'Pembukaan Bantuan Dana Hibah 2017 telah dibuka !', 'description': 'Bantuan Dana Hibah kini telah dibuka, kepada para lembaga yang membutuhkan data, untuk segera mengirimkan proposal permohonan dan persyaratan-persyaratan yang diperlukan be ...'},
			{'id': '2', 'title': 'Penutupan Bantuan Dana Hibah 2016 !', 'description': 'Lembaga yang ikut serta diwajibkan melaporkan penggunaan dana secara lengkap dan baik, pelaporan dilakukan terakhir pada tanggal yang telah ditentukan sebelumnya, de ...'},
		];
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div class="col-md-8 col-md-offset-2">';
		body 	= body + 
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Berita</h4>' +
				'<p class="offset">form untuk menambahkan berita.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-berita-create">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<div class="input-box">' +
							'<input placeholder="Judul" tabindex="2" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-12">' +
						'<div class="input-box rows-4">' +
							'<textarea placeholder="Isi berita" tabindex="2" class="rows-4"></textarea>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-12">' +
						// '<div class="empty-box"></div>' +
						'<p>Sisipkan gambar pada berita.</p>' +
						'<div class="input-box fixed">' +
							'<div class="icon-box both">' +
								'<label class="browser-box" id="gambar-berita">' +
									'<p class="placeholder">berkas belum diunggah...</p>' +
									'<input type="file" tabindex="32" />' +
								'</label>' +
								'<button type="button" browser-id="gambar-berita" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
								'<span class="left fa fa-paperclip text-purple"></span>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Daftar berita (' + data.length + ')</strong>' +
			'</p>' +
		'</div>';
		
		//--render data
		for(var loop = 0; loop < data.length; loop++){	
			body = body +
			'<div class="cards clear">' +
				'<div class="article-box">' +
					'<div class="body">' +
						'<p class="title">' + data[loop].title + '</p>	' +
						'<p class="content">' + data[loop].description + '</p>' +
					'</div>' +
					'<div class="foot">' +
						'<button type="button" class="clear btn-link detail-click">Baca lebih lanjut</button>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//-- cek position
		// var pageType = 2;
		// if(r_pagePreviousReader() != null && r_pagePreviousReader() != 99){ pageType = 3 }
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Berita'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		$(".detail-click").unbind().on('click', function(){ r_navigateTo(441); });
		fileBrowserActivator();
		r_navbarReactor();
	});
}

function r_f4DetailBerita(packet) {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [
			{'id': '1', 'title': 'Pembukaan Bantuan Dana Hibah 2017 telah dibuka !', 'picture': 'avatar-default.jpg', 'description': 'Bantuan Dana Hibah kini telah dibuka, kepada para lembaga yang membutuhkan data, untuk segera mengirimkan proposal permohonan dan persyaratan-persyaratan yang diperlukan berdasarkan PERGUB 2017'},
		];
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div class="col-md-8 col-md-offset-2">';

		//--render data
		for(var loop = 0; loop < data.length; loop++){	
			body = body +
			'<div class="cards clear">' +
				'<div class="article-box">' +
					'<div class="body no-foot">' +
						'<p class="title">' + data[loop].title + '</p>	';
			
			if(data[loop].picture != ""){
				body = body +
				'<img class="left" src="img/news/' + data[loop].picture + '"/>';
			}
			
			body = body +
						'<p class="content">' + data[loop].description + '</p>' +
					'</div>' +
				'</div>' +
			'</div>';
		}
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Baca berita'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(44); });
		r_navbarReactor();
	});
}

function r_f4ImportData() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Import data</h4>' +
				'<p class="offset">fasilitas untuk import data lembaga sesuai format template yang disediakan.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-file-excel-o"></span></button>' +
					'<button class="clear" type="button"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-import-create">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<p>Pilih file untuk import dengan format xls atau xlsx.</p>' +
						'<div class="input-box fixed">' +
							'<div class="icon-box both">' +
								'<label class="browser-box" id="import-data">' +
									'<p class="placeholder">berkas belum diunggah...</p>' +
									'<input type="file" tabindex="12" />' +
								'</label>' +
								'<button type="button" browser-id="import-data" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
								'<span class="left fa fa-paperclip text-purple"></span>' +
							'</div>' +
						'</div>' +
						'<p class="text-danger">Catatan : Penting untuk melakukan back up data terlebih dahulu untuk mencegah hal yang tidak diinginkan !</p>' +
					'</div>' +
				'</div>' +
			'</form>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Riwayat import (' + data.length + ')</strong>' +
			'</p>' +
		'</div>';
		
		for(var loop = 0; loop < data.length; loop++){
			body = body + 
			'<div class="cards import-list">' +
				'<div class="row default">' +
					'<div class="col-xs-6">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-theme"><span class="fa fa-file-excel-o"></span></div>' +
							'<p class="list-text">' + data[loop].caption + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].importBy + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].date + '</p>' +
							'<div class="list-remove" p-id="' + data[loop].noreg + '"><span class="fa fa-trash"></span></div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}	
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Import data'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		fileBrowserActivator();
		r_navbarReactor();
	});
}

function r_f4BackupRestore() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Backup & restore</h4>' +
				'<p class="offset">Lakukan backup secara berkala untuk mencegah kehilangan data.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-recycle"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-bakcup-create">' +
				'<div class="row default">' +
					'<div class="col-md-12">' +
						'<div class="input-box">' +
							'<input placeholder="Ketik nama file" tabindex="1" type="text" value="" />' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>File backup (' + data.length + ')</strong>' +
			'</p>' +
		'</div>';
		
		for(var loop = 0; loop < data.length; loop++){
			body = body + 
			'<div class="cards bakcup-list">' +
				'<div class="row default">' +
					'<div class="col-xs-6">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-theme"><span class="fa fa-server"></span></div>' +
							'<p class="list-text">' + data[loop].caption + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].importBy + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].date + '</p>' +
							'<div class="list-remove" p-id="' + data[loop].noreg + '"><span class="fa fa-life-ring"></span></div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}	
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Backup & restore'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		r_navbarReactor();
	});
}

function r_f4Setelan(){
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'noreg': '1', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 2.'},
			{'noreg': '2', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 3.'},
			{'noreg': '3', 'date': '2017/05/01', 'importBy': 'admin', 'caption': 'lorem dolor sit amet 4.'},
		];
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Setelan</h4>' +
				'<p class="offset">Pengaturan aplikasi oleh admin.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<form id="f-setting-create">' +
				'<h5>Wallpaper</h5>' +
				'<img src="img/avatar/avatar-default-x3.jpg" class="big-pic" />' +
				'<div class="input-box fixed">' +
					'<div class="icon-box both">' +
						'<label class="browser-box" id="import-data">' +
							'<p class="placeholder">berkas belum diunggah...</p>' +
							'<input type="file" tabindex="12" />' +
						'</label>' +
						'<button type="button" browser-id="import-data" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
						'<span class="left fa fa-paperclip text-purple"></span>' +
					'</div>' +
				'</div>' +
			'</form>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>File backup (' + data.length + ')</strong>' +
			'</p>' +
		'</div>';
		
		for(var loop = 0; loop < data.length; loop++){
			body = body + 
			'<div class="cards bakcup-list">' +
				'<div class="row default">' +
					'<div class="col-xs-6">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-theme"><span class="fa fa-server"></span></div>' +
							'<p class="list-text">' + data[loop].caption + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].importBy + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].date + '</p>' +
							'<div class="list-remove" p-id="' + data[loop].noreg + '"><span class="fa fa-life-ring"></span></div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}	
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Backup & restore'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		r_navbarReactor();
	});
}

function r_f4GantiPassword() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [];
		
		//--open
		head = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		head = head +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Ganti password</h4>' +
				'<p class="offset">Demi privasi dan kenyamanan, anda dapat mengganti password akun anda.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		head = head + '</div></div></div>';
		
		body = '<div class="row"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards flush">' +
			'<form id="f-password-create">' +
				'<div class="row default">' +
					'<div class="col-md-6">' +
						'<div class="input-box">' +
							'<input placeholder="Password lama" tabindex="1" type="password" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input placeholder="Password baru" tabindex="1" type="password" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input placeholder="Ketik ulang password" tabindex="1" type="password" value="" />' +
						'</div>' +
						'<div class="space-box"></div>' +
					'</div>' +
				'</div>' +
			'</form>' +
		'</div>';	
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Ganti password'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		r_navbarReactor();
	});
}

function r_f4InfoPersonal() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'date': 'Kamis, 25 Mei 2017', 'time': '10:30 AM', 'duration': '10 menit'},
			{'date': 'Kamis, 25 Mei 2017', 'time': '10:20 AM', 'duration': '10 menit'},
			{'date': 'Kamis, 25 Mei 2017', 'time': '10:10 AM', 'duration': '10 menit'},
		];
		
		//--open
		head = '<div class="row head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		head = head +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Informasi personal</h4>' +
				'<p class="offset">pastikan informasi yang tercatat adalah benar.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button" id="pEditInformasiPersonal">_<span class="fa fa-pencil"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		head = head + '</div></div></div>';
		
		body = '<div class="row"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards fluid">' +
			'<div class="col-md-4 text-center">' +
				'<img src="img/avatar/avatar-default-x3.jpg" class="big-pic" />' +
			'</div>' +
			'<div class="col-md-8">' +
				'<div class="desc-frame">' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Nama</p></div>' +
						'<div class="divider"><p class="text-set">Megantara Narapadya</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Jabatan</p></div>' +
						'<div class="divider"><p class="text-set">...</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Alamat</p></div>' +
						'<div class="divider"><p class="text-set">...</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Telp</p></div>' +
						'<div class="divider"><p class="text-set">...</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Email</p></div>' +
						'<div class="divider"><p class="text-set">...</p></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="clearfix"></div>' +
		'</div>' +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset">Informasi Akun</p>' +
				'<div class="btn-collapse right">' +
					'<button class="toggle-click clear" toggle-target="info-group" type="button"><span class="fa fa-chevron-down"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush toggle-content info-group">' +
			'<div class="desc-frame">' +
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">Username</p></div>' +
					'<div class="divider"><p class="text-set">usernamex1</p></div>' +
				'</div>' +
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">User level</p></div>' +
					'<div class="divider"><p class="text-set">1</p></div>' +
				'</div>' +
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">Akses DPLEGA 2.0</p></div>' +
					'<div class="divider"><p class="text-set">Aktif</p></div>' +
				'</div>' +
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">Akses TABAH 2.0</p></div>' +
					'<div class="divider"><p class="text-set">Aktif</p></div>' +
				'</div>' +
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">Akses FKPAI Online</p></div>' +
					'<div class="divider"><p class="text-set">-</p></div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Riwayat login</strong>' +
			'</p>' +
		'</div>';
		
		for(var loop = 0; loop < data.length; loop++){
			body = body + 
			'<div class="cards bakcup-list">' +
				'<div class="row default">' +
					'<div class="col-xs-6">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].date + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].time + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[loop].duration + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}	
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Informasi personal'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$("#pEditInformasiPersonal").unbind().on('click', function(){ r_navigateTo(453); });
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		toggleBoxActivator();
		r_navbarReactor();
	});
}

function r_f4FormInfoPersonal() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		data    = [
			{'date': 'Kamis, 25 Mei 2017', 'time': '10:30 AM', 'duration': '10 menit'},
			{'date': 'Kamis, 25 Mei 2017', 'time': '10:20 AM', 'duration': '10 menit'},
			{'date': 'Kamis, 25 Mei 2017', 'time': '10:10 AM', 'duration': '10 menit'},
		];
		
		//--open
		head = '<div class="row head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		head = head +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset">Form info personal</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="button"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>';
		head = head + '</div></div></div>';
		
		body = '<div class="row"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards">' +
			'<div class="col-md-5">' +
				'<img src="img/avatar/avatar-default-x3.jpg" class="big-pic" />' +
				'<div class="input-box fixed">' +
					'<div class="icon-box both">' +
						'<label class="browser-box" id="import-data">' +
							'<p class="placeholder">berkas belum diunggah...</p>' +
							'<input type="file" tabindex="12" />' +
						'</label>' +
						'<button type="button" browser-id="import-data" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
						'<span class="left fa fa-paperclip text-purple"></span>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col-md-7">' +
				'<div class="input-box">' +
					'<input placeholder="Nama" tabindex="1" type="text" value="" />' +
				'</div>' +
				'<div class="input-box">' +
					'<input placeholder="Jabatan" tabindex="1" type="text" value="" />' +
				'</div>' +
				'<div class="input-box rows-2">' +
					'<textarea placeholder="Alamat" tabindex="2" class="rows-2"></textarea>' +
				'</div>' +
				'<div class="input-box">' +
					'<input placeholder="Telp" tabindex="1" type="text" value="" />' +
				'</div>' +
				'<div class="input-box">' +
					'<input placeholder="Email" tabindex="1" type="text" value="" />' +
				'</div>' +
				'<div class="empty-box"></div>' +
			'</div>' +
			'<div class="clearfix"></div>' +
		'</div>';
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Form info personal'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(46); });
		fileBrowserActivator();
		r_navbarReactor();
	});
}
function r_f1KoleksiDataGenerator(data){
	var genHtml = "";
			
	genHtml = 
	'<div id="daftarSectionKoleksi">'+ 
	'<div class="cards-label plus">' +
		'<p><strong>Daftar koleksi ('+feedData.length+')</strong></p>' +
	'</div>';
	for(counter = 0; counter < feedData.length; counter++){
	genHtml = genHtml+
		// '<div id="isiSectionKoleksi">'+
		'<div id="isiSectionKoleksi'+feedData[counter].idData+'" class="cards">' +
			'<div class="list-box">' +
				'<input name="idData" value="'+feedData[counter].idData+'" type="hidden">'+
				'<div class="list-icon bg-sky"><span class="fa fa-book"></span></div>' +
				'<p class="list-text">'+feedData[counter].judulKoleksi+'</p>' +
				'<div id="'+feedData[counter].idData+'" class="list-remove"><span class="fa fa-trash"></span></div>' +
			'</div>' +
		'</div>';
	}
	$("#section-koleksi").append(genHtml);		
	
}

function r_f1PrestasiGenerator(data, type){
	var genHtml = "";
	if(data.feedData != null){
		//render
		for(counter = 0; counter < data.feedData.length; counter++){
			genHtml = genHtml +
			'<div id=prestasi'+data.feedData[counter].idData+' class="cards">' +
				'<div class="list-box">' +
					'<div class="list-icon bg-yellow"><span class="fa fa-trophy"></span></div>' +
					'<p class="list-text">'+data.feedData[counter].deskripsi+'</p>';
			if(type == "" || type == undefined || type == null){
				genHtml = genHtml +
				'<div id='+data.feedData[counter].idData+' class="list-remove"><span class="fa fa-trash"></span></div>';
			}
			genHtml = genHtml +
				'</div>' +
			'</div>';
		}

		genHtml = genHtml + '</div>';
	} else {
		genHtml = genHtml +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}	

		
	$("#section-prestasi").append(genHtml);	
}

function r_f1KoleksiGenerator(keyword){
	genHtml = "";
	
	if(keyword == null || keyword == ''){
		data = p_getData('f1','f141','');
		$('#daftarKoleksi').remove();
	}else{
		 data = p_getData('f1','f141',keyword);
		$('#daftarKoleksi').remove();
	}

	if(data.feedData != null){
		genHtml = genHtml + '<div id = "daftarKoleksi">';
		for(var loop = 0; loop < data.feedData.length; loop++){	
			genHtml = genHtml +
			'<div class=" cards">' +
				'<div class="row default">' +
					'<div class="col-xs-7">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-green"><span class="fa fa-book"></span></div>' +
							'<p class="list-text"><strong>' + data.feedData[loop].title + '</strong></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-5">' +
						'<div class="list-box clear-small">' +
							'<p class="list-text">(' + data.feedData[loop].group + ') &nbsp; ' + data.feedData[loop].owner + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}
		genHtml = genHtml + '</div>';
	}else{
		genHtml = genHtml +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}
	
	$("#koleksi").append(genHtml);
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
		'<li id="' + optionBatch[loop].selector + '"><button type="button" class="clear btn-icon"><span class="fa fa-' + optionBatch[loop].icon + '"></span>' + optionBatch[loop].label + '</button></li>';
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

// function profile_look_set(id){ r_setCookie('profile_look', id, 1); }
// function profile_look_reader(){	return String(r_getCookie('profile_look'));}
// function post_look_set(id){ r_setCookie('post_look', id, 1); }
// function post_look_reader(){ return String(r_getCookie('post_look'));}

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
	// r_setCookie('profile_look','',1);
	// r_setCookie('header_log','',1);
}