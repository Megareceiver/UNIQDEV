//F4 PENGATURAN
//=====================================
function r_f4Pengaturan() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';

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

//F4 LINGKUP AREA
//=====================================
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
			{'idFilter': '1', 'area':'Provinsi',  'jumlahData': ''},
			{'idFilter': '2', 'area':'Wilayah',   'jumlahData': ''},
			{'idFilter': '3', 'area':'Kecamatan', 'jumlahData': ''},
			{'idFilter': '4', 'area':'Kelurahan', 'jumlahData': ''},
		];
		
		data = optionD; // updatting global variable

		optionBatch = r_f4OptionList(411); 
		
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
		if(r_getCookie('lingkupAreaTambah') == '1' || r_getCookie('lingkupAreaUbah') == '1'){
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
								'<input placeholder="Kode provinsi (*)" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
							'</div>' +
						'</div>' +
						'<div class="col-md-9">' +
							'<div class="input-box">' +
								'<input name="idData" tabindex="1" type="hidden" value="" />' +
								'<input placeholder="Provinsi (*)" name="nama" tabindex="1" type="text" value="" />' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
			'<!--div class="cards">' +
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
			'</div-->';
		}
		
		if(data != null && data[0].provinsi != undefined){
			counter = data[0].provinsi.length;
			if(counter > 0){
				for(var loop = 0; loop < counter; loop++){
					part[0] = part[0] + 
					'<div class="cards provinsi-list list-edit" id ="'+ loop +'provinsi-' + data[0].provinsi[loop].idData + '">' +
						'<div class="row default">' +
							'<div class="col-xs-3 col-sm-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].provinsi[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-9 col-sm-10">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].provinsi[loop].caption + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].provinsi[loop].caption + '"' + 
										'p-id			="' + data[0].provinsi[loop].idData + '"' +
										'p-noreg		="' + data[0].provinsi[loop].noreg + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].provinsi[loop].group + '"' +
										'p-container	="' + loop + 'provinsi-' + data[0].provinsi[loop].idData + '">' +
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
		if(r_getCookie('lingkupAreaTambah') == '1' || r_getCookie('lingkupAreaUbah') == '1'){
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
									'<option value="" selected>Provinsi (*)</option>' +
									r_optionDHtml('provinsi') +
								'</select>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
						'<div class="col-md-3">' +
							'<div class="input-box">' +
								'<input name="idData" tabindex="1" type="hidden" value="" />' +
								'<input placeholder="Kode wilayah (*)" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
							'</div>' +
						'</div>' +
						'<div class="col-md-9">' +
							'<div class="input-box">' +
								'<input placeholder="Wilayah (*)" name="nama" tabindex="21" type="text" value="" />' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
			'<!--div class="cards">' +
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
			'</div-->';
		}
		
		if(data != null && data[0].wilayah != undefined){
			counter = data[0].wilayah.length;
			if(counter > 0){
				for(var loop   = 0; loop < data[0].wilayah.length; loop++){
					part[1] = part[1] + 
					'<div class="cards wilayah-list list-edit" id="' + loop + 'wilayah-' + data[0].wilayah[loop].idData + '">' +
						'<div class="row default">' +
							'<div class="col-xs-3 col-sm-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].wilayah[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-5 col-sm-6">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].wilayah[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4 col-sm-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].wilayah[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].wilayah[loop].caption + '"' + 
										'p-id			="' + data[0].wilayah[loop].idData + '"' +
										'p-noreg		="' + data[0].wilayah[loop].noreg + '"' +
										'p-references	="' + data[0].wilayah[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].wilayah[loop].group + '"' +
										'p-container	="' + loop + 'wilayah-' + data[0].wilayah[loop].idData + '">' +
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
		if(r_getCookie('lingkupAreaTambah') == '1' || r_getCookie('lingkupAreaUbah') == '1'){
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
									'<option value="" selected>Wilayah (*)</option>' +
									r_optionDHtml('wilayah') +
								'</select>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
						'<div class="col-md-3">' +
							'<div class="input-box">' +
								'<input name="idData" tabindex="1" type="hidden" value="" />' +
								'<input placeholder="Kode kecamatan (*)" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
							'</div>' +
						'</div>' +
						'<div class="col-md-9">' +
							'<div class="input-box">' +
								'<input placeholder="Kecamatan (*)" name="nama" tabindex="31" type="text" value="" />' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
			'<!--div class="cards">' +
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
			'</div-->';
		}
		
		if(data != null && data[0].kecamatan != undefined){
			counter = data[0].kecamatan.length;
			if(counter > 0){
				for(var loop = 0; loop < data[0].kecamatan.length; loop++){
					part[2] = part[2] + 
					'<div class="cards kecamatan-list list-edit" id="' + loop + 'kecamatan-' + data[0].kecamatan[loop].idData + '">' +
						'<div class="row default">' +
							'<div class="col-xs-3 col-sm-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].kecamatan[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-5 col-sm-6">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kecamatan[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4 col-sm-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kecamatan[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].kecamatan[loop].caption + '"' + 
										'p-id			="' + data[0].kecamatan[loop].idData + '"' +
										'p-noreg		="' + data[0].kecamatan[loop].noreg + '"' +
										'p-references	="' + data[0].kecamatan[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].kecamatan[loop].group + '"' +
										'p-container	="' + loop + 'kecamatan-' + data[0].kecamatan[loop].idData + '">' +
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
		if(r_getCookie('lingkupAreaTambah') == '1' || r_getCookie('lingkupAreaUbah') == '1'){
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
									'<option value="" selected>Kecamatan (*)</option>' +
									r_optionDHtml('kecamatan') +
								'</select>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
						'<div class="col-md-3">' +
							'<div class="input-box">' +
								'<input name="idData" tabindex="1" type="hidden" value="" />' +
								'<input placeholder="Kode kelurahan (*)" maxlength="2" name="kode" tabindex="1" type="text" value="" />' +
							'</div>' +
						'</div>' +
						'<div class="col-md-9">' +
							'<div class="input-box">' +
								'<input placeholder="Kelurahan (*)" name="nama" tabindex="31" type="text" value="" />' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>' +
			'<!--div class="cards">' +
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
			'</div-->';
		}
		
		if(data != null && data[0].kelurahan != undefined){
			counter = data[0].kelurahan.length;
			if(counter > 0){
				for(var loop = 0; loop < data[0].kelurahan.length; loop++){
					part[3] = part[3] + 
					'<div class="cards kelurahan-lis list-editt" id="' + loop + 'kelurahan-' + data[0].kelurahan[loop].idData + '">' +
						'<div class="row default">' +
							'<div class="col-xs-3 col-sm-2">' +
								'<div class="list-box">' +
									'<div class="list-icon bg-green"><span class="fa fa-map-marker"></span></div>' +
									'<p class="list-text">' + data[0].kelurahan[loop].noreg + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-5 col-sm-6">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kelurahan[loop].caption + '</p>' +
								'</div>' +
							'</div>' +
							'<div class="col-xs-4 col-sm-4">' +
								'<div class="list-box clear">' +
									'<p class="list-text">' + data[0].kelurahan[loop].references + '</p>' +
									'<div class="list-button click-option"' + 
										'p-label		="' + data[0].kelurahan[loop].caption + '"' + 
										'p-id			="' + data[0].kelurahan[loop].idData + '"' +
										'p-noreg		="' + data[0].kelurahan[loop].noreg + '"' +
										'p-references	="' + data[0].kelurahan[loop].referencesKey + '"' +
										'p-group		="f4"' + 
										'p-target		="' + data[0].kelurahan[loop].group + '"' +
										'p-container	="' + loop + 'kelurahan-' + data[0].kelurahan[loop].idData + '">' +
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
			pNoreg			= $(this).attr('p-noreg');
			pLabel			= $(this).attr('p-label');
			pContainer		= $(this).attr('p-container');
			pReferences		= $(this).attr('p-references');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionList(); 
			
			//-- option activator
			$("#edit-card").unbind().on("click", function(){ 
				hideOptionList(); 
				r_f4LingkupAreaEditor(pTarget, pId, pNoreg, pLabel, pReferences); 
			});
			
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						$('#' + pContainer).remove();
						var dataTemp = '';
						if 	   (pTarget == "f411") dataTemp = optionD[0].provinsi; 
						else if(pTarget == "f412") dataTemp = optionD[0].wilayah; 
						else if(pTarget == "f413") dataTemp = optionD[0].kecamatan; 
						else if(pTarget == "f414") dataTemp = optionD[0].kelurahan; 
						r_f4RemoveLingkupAreaArray(dataTemp, pId);
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
		r_f4TabAdvance();
		fileBrowserActivator();
		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-provinsi-create" , "addData");
		p_formHandler("f-wilayah-create"  , "addData");
		p_formHandler("f-kecamatan-create", "addData");
		p_formHandler("f-kelurahan-create", "addData");
	});
}

function r_f4TabAdvance(){
	$('.tab-navigator').on('click', function(){ 
		var tabIndex = $(this).attr("tab-headIndex");
		switch(tabIndex){
			case '2': 
				$("#f-wilayah-create [name=referensi]").html('<option value="" selected>Provinsi</option>' + r_optionDHtml('provinsi'));
			break;
			case '3': 
				$("#f-kecamatan-create [name=referensi]").html('<option value="" selected>Wilayah</option>' + r_optionDHtml('wilayah'));
			break;
			case '4': 
				$("#f-kelurahan-create [name=referensi]").html('<option value="" selected>Kecamatan</option>' + r_optionDHtml('kecamatan'));
			break;
		}
	});
}

function r_f4LingkupAreaEditor(target, id, noreg, label, referencesKey){
	switch(target){
		case "f411":
			$("#f-provinsi-create [name='idData']").val(id).attr('readonly','readonly');
			$("#f-provinsi-create [name='kode']").val(noreg);
			$("#f-provinsi-create [name='nama']").val(label);
			p_formHandler("f-provinsi-create" , "updateData");
		break;
		case "f412":
			$("#f-wilayah-create [name='idData']").val(id);
			$("#f-wilayah-create [name='kode']").val(noreg);
			$("#f-wilayah-create [name='nama']").val(label);
			$("#f-wilayah-create [name='referensi']").val(referencesKey);
			p_formHandler("f-wilayah-create" , "updateData");
		break;
		case "f413":
			$("#f-kecamatan-create [name='idData']").val(id);
			$("#f-kecamatan-create [name='kode']").val(noreg);
			$("#f-kecamatan-create [name='nama']").val(label);
			$("#f-kecamatan-create [name='referensi']").val(referencesKey);
			p_formHandler("f-kecamatan-create" , "updateData");
		break;
		case "f414":
			$("#f-kelurahan-create [name='idData']").val(id);
			$("#f-kelurahan-create [name='kode']").val(noreg);
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
				'<div class="cards provinsi-list list-edit" id ="provinsi-' + data[loop].idData + '">' +
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
									'p-id			="' + data[loop].idData + '"' +
									'p-noreg		="' + data[loop].noreg + '"' +
									'p-group		="f4"' + 
									'p-target		="f411"' +
									'p-container	="provinsi-' + data[loop].idData + '">' +
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
									'p-id			="' + data[loop].idData + '"' +
									'p-noreg		="' + data[loop].noreg + '"' +
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

		if(type=="provinsi") 	   r_f4AddLingkupAreaArray(optionD[0].provinsi,  data[0]);
		else if(type=="wilayah")   r_f4AddLingkupAreaArray(optionD[0].wilayah,   data[0]);
		else if(type=="kecamatan") r_f4AddLingkupAreaArray(optionD[0].kecamatan, data[0]);
		else if(type=="kelurahan") r_f4AddLingkupAreaArray(optionD[0].kelurahan, data[0]);
	}else if (formType == "updateData"){
		$("#" + pContainer).replaceWith(genHtml);

		if(type=="provinsi") 	   r_f4ChangeLingkupAreaArray(optionD[0].provinsi,  data[0], data[0].idData);
		else if(type=="wilayah")   r_f4ChangeLingkupAreaArray(optionD[0].wilayah,   data[0], data[0].idData);
		else if(type=="kecamatan") r_f4ChangeLingkupAreaArray(optionD[0].kecamatan, data[0], data[0].idData);
		else if(type=="kelurahan") r_f4ChangeLingkupAreaArray(optionD[0].kelurahan, data[0], data[0].idData);
	}
	
	//reactor
	$(".click-option").unbind().on("click", function(){ 
		//packet session
		clearPacket();
		pGroup 		= $(this).attr('p-group');
		pTarget		= $(this).attr('p-target')
		pId			= $(this).attr('p-id');
		pNoreg 		= $(this).attr('p-noreg');
		pLabel		= $(this).attr('p-label');
		pContainer		= $(this).attr('p-container');
		pReferences		= $(this).attr('p-references');
		pReferencesKey	= $(this).attr('p-referencesKey');
		showOptionList(); 
		
		//-- option activator
		$("#edit-card").unbind().on("click", function(){ 
			hideOptionList(); 
			r_f4LingkupAreaEditor(pTarget, pId, pNoreg, pLabel, pReferences); 
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

function r_f4BeritaGenerator(data){
	var genHtml = "";
	if(data != null){
		// genHtml = genHtml +
		// '<div class="cards-label plus emptyList">' +
		// 	'<p>' +
		// 		'<strong>Daftar berita (<span id=counter>' + counter + '</span>)</strong>' +
		// 	'</p>' +
		// '</div>';
		for(var loop = 0; loop < data.length; loop++){	
			$('.emptyList').remove();
			genHtml = genHtml +
			'<div class="cards clear" id = "berita-'+data[loop].idBerita+'">' +
				'<div class="article-box">' +
					'<div class="body">' +
						'<p class="title">' + data[loop].judul + '</p>	' +
						'<p class="content">' + data[loop].isiBerita + '</p>' +
					'</div>' +
					'<div class="foot">' +
						'<button '+
							'id 		= "'+data[loop].idBerita +'" '+
							'title 		= "'+data[loop].judul +'" '+
							'description= "'+data[loop].isiBerita+'" '+
						'type="button" class="clear btn-link detail-click text-cyan">Baca lebih lanjut</button>';

			if(r_getCookie('beritaHapus') == '1'){			
				genHtml = genHtml +
				' | <button id-button = '+data[loop].idBerita+' type="reset" class="clear btn-link text-pink">Hapus</button>';
			}

			genHtml = genHtml +
					'</div>' +
				'</div>' +
			'</div>';
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
	$('#renderData').append(genHtml);
	$('#renderData  [type=reset]').unbind().on("click", function(e){
			e.preventDefault();
			idBerita = $(this).attr('id-button');
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList();
				if(p_removeData('f4', 'f441', idBerita) == 'success'){
					$('#berita-'+idBerita).remove();
				}; 
			});
		});
	$(".detail-click").unbind().on('click', function(){
	idDetail = $(this).attr('id');
	 r_navigateTo(441,idDetail); 
	});
}

//F4 TRANSFER LEMBAGA
//=====================================
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

		data = p_getData('f1','f11101'); console.log(data);
		data = data.feedData;
		
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
										r_optionDHtml('provinsi') +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Wilayah</option>' +
										r_optionDHtml('wilayah') +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kecamatan</option>' +
										r_optionDHtml('kecamatan') +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kelurahan</option>' +
										r_optionDHtml('kelurahan') +
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
										r_optionDHtml('provinsi') +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Wilayah</option>' +
										r_optionDHtml('wilayah') +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kecamatan</option>' +
										r_optionDHtml('kecamatan') +
									'</select>' +
								'</div>' +
								'<div class="select-box">' +
									'<select tabindex="1">' +
										'<option value="" selected>Kelurahan</option>' +
										r_optionDHtml('kelurahan') +
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

//F4 VERIFIKASI
//=====================================
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
		
		optionBatch = r_f4OptionList(421); 
		
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

		if(r_getCookie('pengaturanVerifikasiTambah') == '1' || r_getCookie('pengaturanVerifikasiUbah') == '1'){
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
		}
			
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
			pTarget			= $(this).attr('p-target');
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
		
		optionBatch = r_f4OptionList(421); 
		
		counter = 0;
		data = p_getData('f4', 'f421', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }

		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-grupVerifikasi" class="col-md-8 col-md-offset-2">';
		if(r_getCookie('pengaturanVerifikasiTambah') == '1' || r_getCookie('pengaturanVerifikasiUbah') == '1'){
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
		}
		
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

//F4 KELEMBAGAAN :: BENTUK LEMBAGA, LEGALITAS LEMBAGA, BIDANG GERAK
//=====================================
function r_f4BentukLembaga() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		
		optionBatch = r_f4OptionList(431); 
		
		counter = 0;
		data = p_getData('f4', 'f431', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-bentukLembaga" class="col-md-8 col-md-offset-2">';

		if(r_getCookie('pengaturanKelembagaanTambah') == '1' || r_getCookie('pengaturanKelembagaanUbah') == '1'){
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
		}
		
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
		
		optionBatch = optionBatch = r_f4OptionList(432); 
		
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

		if(r_getCookie('pengaturanKelembagaanTambah') == '1' || r_getCookie('pengaturanKelembagaanUbah') == '1'){
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
		}
		
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
		
		optionBatch = optionBatch = r_f4OptionList(432); ; 
		
		counter = 0;
		data = p_getData('f4', 'f433', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-bidangGerak" class="col-md-8 col-md-offset-2">';

		if(r_getCookie('pengaturanKelembagaanTambah') == '1' || r_getCookie('pengaturanKelembagaanUbah') == '1'){
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
		}
		
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


//F4 BERITA
//=====================================
function r_f4DaftarBerita() {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		genHtml = '';
		data = p_getData('f4','f441','');
		data = data.feedData;
		if(data !=null){
			counter = data.length;
		}
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div class="col-md-8 col-md-offset-2">';
		if(r_getCookie('beritaTambah') == '1'){
			body 	= body + 
			'<form id="f-berita-create" f-group = "f4" f-target = "f441">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<h4>Berita</h4>' +
						'<p class="offset">form untuk menambahkan berita.</p>' +
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
								'<input name="judul" placeholder="Judul berita (*)" tabindex="2" type="text" value="" />' +
							'</div>' +
						'</div>' +
						'<div class="col-md-12">' +
							'<div class="input-box rows-4">' +
								'<textarea name="isiBerita" placeholder="Isi berita (*)" tabindex="2" class="rows-4"></textarea>' +
							'</div>' +
						'</div>' +
						'<div class="col-md-12">' +
							// '<div class="empty-box"></div>' +
							'<p>Sisipkan gambar pada berita.</p>' +
							'<div class="input-box fixed">' +
								'<div class="icon-box both">' +
									'<label class="browser-box" id="gambar-berita">' +
										'<p class="placeholder" name="imgName" id="berkas">berkas belum diunggah...</p>' +
										'<input name="urlFile" type="file" tabindex="32" />' +
									'</label>' +
									'<button type="button" browser-id="gambar-berita" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
									'<span class="left fa fa-paperclip text-purple"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>';
		}

		//--render data
		body = body +
		'<div id="renderData">';
	
		body = body + '</div>';
		//--render data end
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

		r_f4BeritaGenerator(data);
		fileBrowserActivator();
		r_navbarReactor();
		p_formHandler("f-berita-create"  , "addData");
		$('#renderData  [type=reset]').unbind().on("click", function(e){
			e.preventDefault();
			idBerita = $(this).attr('id-button');
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList();
				if(p_removeData('f4', 'f441', idBerita) == 'success'){
					counter = counter -1;
					$('#berita-'+idBerita).remove();
					
					if(counter == 0){
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
						$('#renderData').html(genHtml);
					}
				}; 
			});
		});
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
		
		if(packet == undefined || packet == "" || packet == null || packet == "start"){
			packet = news_look_reader();
		}

		data = p_getData('f4','f441', packet);
		data = data.feedData;

		news_look_set(packet);

		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		body	= body + '<div class="col-md-8 col-md-offset-2">';

		//--render data
		for(var loop = 0; loop < data.length; loop++){
			body = body +
			'<div class="cards clear">' +
				'<div class="article-box">' +
					'<div class="body full no-foot">' +
						'<h2 class="title">' + data[loop].judul + '</h2>	' +
						'<p>' + timeSince(new Date(Date.parse(data[loop].createdDate))) + '</p>	';
			
			if(data[loop].picture != ""){
				body = body +
				'<img src="img/news/' + data[loop].urlGambar + '"/>';
			}
			
			body = body +
						'<p class="content">' + data[loop].isiBerita + '</p>' +
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

//F4 CONTROL
//=====================================
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
		data    = p_getData('dumb', 'f451');
		data 	= data.feedData;

		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-bakcup-create" f-group="dumb" f-target="">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Backup & restore</h4>' +
					'<p class="offset">Lakukan backup secara berkala untuk mencegah kehilangan data.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="submit"><span class="fa fa-recycle"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>' +
		'<!--div class="cards flush">' +
			'<div class="row default">' +
				'<div class="col-md-12">' +
					'<div class="input-box">' +
						'<input placeholder="Ketik nama file" tabindex="1" type="text" value="" />' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>File backup ()</strong>' +
			'</p>' +
		'</div-->';
		
		if(data != null){
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
								'<p class="list-text">' + data[loop].createdBy + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-3">' +
							'<div class="list-box clear">' +
								'<p class="list-text">' + timeSince(new Date(Date.parse(data[loop].createdDate))) + '</p>' +
								'<div class="list-remove" p-id="' + data[loop].id + '" p-referencesKey="' + data[loop].caption + '"><span class="fa fa-life-ring"></span></div>' +
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
		headPage.html(r_headPageHtml(3, 'Backup & restore'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(4); });
		r_navbarReactor();

		$('.list-remove').unbind().on("click", function(e){
			clearPacket();
			pId				= $(this).attr('p-id');
			pReferencesKey	= $(this).attr('p-referencesKey');
			showOptionConfirm('restore');
			$(".option-yes").unbind().on("click", function(){ 
				showNotification('info', 'waiting', 'sedang me-restore data...', false);
				hideOptionList(); 
				setTimeout(function(){ p_restore('dumb', '', pId, pReferencesKey); }, 1000); 
			});
		});

		p_formHandler('f-bakcup-create', 'backup');
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

//F4 ACCOUNT
//=====================================
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
		head = '';
		
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-password-create" f-group="f3" f-target="f313">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Ganti password</h4>' +
					'<p class="offset">Demi privasi dan kenyamanan, anda dapat mengganti password akun anda.</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards">' +
				'<div class="row default">' +
					'<div class="col-md-6">' +
						'<div class="input-box">' +
							'<input name="oldPassword" placeholder="Password lama" tabindex="1" type="password" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="newPassword" placeholder="Password baru" tabindex="1" type="password" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="rePassword" placeholder="Ketik ulang password" tabindex="1" type="password" value="" />' +
						'</div>' +
						'<div class="space-box"></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>';	
		
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

		//form reactor
		p_formHandler("f-password-create" , "updateData");
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
			// {'date': 'Kamis, 25 Mei 2017', 'time': '10:30 AM', 'duration': '10 menit'},
			// {'date': 'Kamis, 25 Mei 2017', 'time': '10:20 AM', 'duration': '10 menit'},
			// {'date': 'Kamis, 25 Mei 2017', 'time': '10:10 AM', 'duration': '10 menit'},
		];

		dataProfile = p_getData('f3', 'f312');
		dataProfile = dataProfile.feedData;

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
		
		var imgDir = ((dataProfile.noRegistrasi != "") ? 'img/logo/' : 'img/avatar/');
		body = '<div class="row"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<div class="cards fluid">' +
			'<div class="col-md-4 text-center">' +
				'<img src="' + imgDir + ((dataProfile.urlGambar != "") ? dataProfile.urlGambar : 'avatar-default-x3.jpg') + '" class="big-pic" />' +
			'</div>' +
			'<div class="col-md-8">' +
				'<div class="desc-frame">' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Nama</p></div>' +
						'<div class="divider"><p class="text-set">' + ((dataProfile.nama) ? dataProfile.nama : '...') + '</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Jabatan</p></div>' +
						'<div class="divider"><p class="text-set">' + ((dataProfile.jabatan) ? dataProfile.jabatan : '...') + '</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Alamat</p></div>' +
						'<div class="divider"><p class="text-set">' + ((dataProfile.alamat) ? dataProfile.alamat : '...') + '</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Telp</p></div>' +
						'<div class="divider"><p class="text-set">' + ((dataProfile.telp) ? dataProfile.telp : '...') + '</p></div>' +
					'</div>' +
					'<div class="desc-box">' +
						'<div class="labels"><p class="text-set">Email</p></div>' +
						'<div class="divider"><p class="text-set">' + ((dataProfile.email) ? dataProfile.email : '...') + '</p></div>' +
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
					'<div class="divider"><p class="text-set">' + ((dataProfile.username) ? dataProfile.username : '...') + '</p></div>' +
				'</div>' +
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">User level</p></div>' +
					'<div class="divider"><p class="text-set">' + ((dataProfile.userLevel) ? dataProfile.userLevel : '...') + '</p></div>' +
				'</div>';
		if(dataProfile.access != null && dataProfile.access.length > 0){
			for(loop=0; loop<dataProfile.access.length; loop++){
				body = body + 
				'<div class="desc-box">' +
					'<div class="labels"><p class="text-set">' + dataProfile.access[loop].label + '</p></div>' +
					'<div class="divider"><p class="text-set">' + ((dataProfile.access[loop].status == '1') ? 'Aktif' : 'Tidak aktif') + '</p></div>' +
				'</div>';
			}
		}

		body = body + 		
			'</div>' +
		'</div>' +
		'<div class="cards-label plus">' +
			'<p>' +
				'<strong>Riwayat login</strong>' +
			'</p>' +
		'</div>';

		if(data != null && data.length > 0){
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
		}else{
			body = body + 
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
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
		$("#pEditInformasiPersonal").unbind().on('click', function(){ r_navigateTo(462); });
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

		data    = p_getData('f3', 'f3111');
		data 	= data.feedData;
		
		//-- get data lingkup area
		dataTemp 		  	= p_getData('f4', 'f401', '');
		sourcesData 	  	= (dataTemp.feedData != null) ? dataTemp.feedData[0] : ""; 
		sourcesDetailData 	= (dataTemp.feedData != null) ? dataTemp.feedDataDetail : "";
		
		//--open
		head = '';
		
		body = '<div class="row no-head"><div class="container"><div class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-user-update" f-group="f3" f-target="f314">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset">Form info personal</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards">' +
				'<div class="col-sm-5">' +
					'<div class="picture-box relative">' +
						'<img viewer-id="v-user" class="pic-default pic-relative ' + ((data.urlGambar != null) ? 'changed' : '') + '" src="img/avatar/' + ((data.urlGambar != null) ? data.urlGambar : "img/sources/picture.png") + '" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="v-user">' +
								'<p class="placeholder" name="imageName">berkas belum diunggah...</p>' +
								'<input preview-id="v-user" name="imageUrl" type="file" accept="image/*" tabindex="5" />' +
								'<input browser-state="fileState" name="fileState" type="hidden" tabindex="1" value="add" />' +
							'</label>' +
							'<button type="button" browser-id="v-user" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="col-sm-7">' +
					'<div class="input-box">' +
						'<input name="nama" placeholder="Nama (*)" tabindex="1" type="text" value="' + data.nama + '" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="jabatan" placeholder="Jabatan" tabindex="1" type="text" value="' + data.jabatan + '" />' +
					'</div>' +
					'<div class="input-box rows-2">' +
						'<textarea name="alamat" placeholder="Alamat" tabindex="1" class="rows-2">' + data.alamat + '</textarea>' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="rt" placeholder="RT" tabindex="1" class="half" type="text" value="' + data.noRt + '" />' +
						'<input name="rw" placeholder="RW" tabindex="1" class="half" type="text" value="' + data.noRw + '" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box left">' +
							'<input id="f111_lingkupArea" name="kelurahan" placeholder="Kelurahan" tabindex="1" type="text" value="' + data.namaKelurahan + '" />' +
							'<input id="f111_lingkupArea_kode" name="kodeKelurahan" tabindex="1" type="hidden" value="' + data.kodeKelurahan + '" />' +
							'<span class="fa fa-magic"></span>' +
						'</div>' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box left">' +
							'<input id="f111_lingkupArea_2" name="kecamatan" placeholder="Kecamatan" tabindex="1" type="text" value="' + data.namaKecamatan + '" readonly />' +
							'<input id="f111_lingkupArea_kode2" name="kodeKecamatan" tabindex="1" type="hidden" value="' + data.kodeKecamatan + '" readonly />' +
							'<span class="fa fa-repeat"></span>' +
						'</div>' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box left">' +
							'<input id="f111_lingkupArea_3" name="wilayah" placeholder="Wilayah" tabindex="1" type="text" value="' + data.namaWilayah + '" readonly />' +
							'<input id="f111_lingkupArea_kode3" name="kodeWilayah" tabindex="1" type="hidden" value="' + data.kodeWilayah + '" readonly />' +
							'<span class="fa fa-repeat"></span>' +
						'</div>' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box left">' +
							'<input id="f111_lingkupArea_4" name="provinsi" placeholder="Provinsi" tabindex="1" type="text" value="' + data.namaProvinsi + '" readonly />' +
							'<input id="f111_lingkupArea_kode4" name="kodeProvinsi" tabindex="1" type="hidden" value="' + data.kodeProvinsi + '" readonly />' +
							'<span class="fa fa-repeat"></span>' +
						'</div>' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="telp" placeholder="Telp" tabindex="2" type="text" value="' + data.noTelp + '" />' +
					'</div>' +
					'<div class="input-box">' +
						'<input name="email" placeholder="Email (*)" tabindex="2" type="text" value="' + data.email + '" />' +
					'</div>' +
					'<div class="empty-box"></div>' +
				'</div>' +
				'<div class="clearfix"></div>' +
			'</div>' +
		'</form>';
		
		body	= body + '</div></div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(3, 'Form info personal'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(46); });

		//autocomplete
		autoCompleteActivator("f111_lingkupArea", sourcesData, sourcesDetailData, "lingkupArea");

		fileBrowserActivator();
		imagePreviewActivator();
		r_navbarReactor();

		numberOnlyActivator("[name=telp], [name=rt], [name=rw]");

		//form reactor
		p_formHandler("f-user-update" , "updateData");
	});
}

function r_f4AddLingkupAreaArray(data, dataAdd){
	data.push(dataAdd); 
	
	return false;
}

function r_f4ChangeLingkupAreaArray(data, dataChange, id){
	var indexArr = data.map(function(o){ return o.idData;}).indexOf(id); 
	if(indexArr >= 0) {
		data[indexArr].noreg = dataChange.noreg; 
		data[indexArr].caption = dataChange.caption; 
		data[indexArr].references = dataChange.references; 
		data[indexArr].referencesKey = dataChange.referencesKey; 
	}
	
	return false;
}

function r_f4RemoveLingkupAreaArray(data, id){
	var indexArr = data.map(function(o){ return o.idData;}).indexOf(id); 
	if(indexArr >= 0) {
		data.splice(indexArr, 1); 
	}
	
	return false;
}

function r_f4OptionList(target){
	var res = [];
	switch(target){
		case 41 :
		case 411: 			
			if(r_getCookie('lingkupAreaUbah') == '1'){ res.push({'selector': 'edit-card', 'icon': 'pencil', 'label': 'Ubah data'}); }
			if(r_getCookie('lingkupAreaHapus') == '1'){ res.push({'selector': 'delete-card', 'icon': 'trash', 'label': 'Hapus data'}); }
		break;

		case 42 :
		case 421: 
			if(r_getCookie('pengaturanVerifikasiUbah') == '1'){ res.push({'selector': 'edit-card', 'icon': 'pencil', 'label': 'Ubah data'}); }
			if(r_getCookie('pengaturanVerifikasiHapus') == '1'){ res.push({'selector': 'delete-card', 'icon': 'trash', 'label': 'Hapus data'}); }
		break;
		
		case 43 : 
		case 431:
		case 432: 
			if(r_getCookie('pengaturanKelembagaaUbah') == '1'){ res.push({'selector': 'edit-card', 'icon': 'pencil', 'label': 'Ubah data'}); }
			if(r_getCookie('pengaturanKelembagaaHapus') == '1'){ res.push({'selector': 'delete-card', 'icon': 'trash', 'label': 'Hapus data'}); }
		break;
	}

	return res;
}
