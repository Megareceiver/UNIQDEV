//F3 AUTHENTICATION
//=====================================
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
		];


		data = p_getData('f3', 'f31', '', '');
		data = data.feedData;

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
			'<p><strong>Pemilik akun (1)</strong></p>' +
		'</div>';
		
		//--render data
		var tempP = "";
		var tempR = "";
		//for(var loop = 0; loop < data.length; loop++){	
			part[1] = part[1] +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>' + data.nama + '</h4>' +
					'<p>' + data.noreg + ' | ' + data.rule + '</p>' +
					'<div class="btn-collapse right">' +
						'<button class="toggle-click clear" toggle-target="' + data.id + '-group" type="button"><span class="fa fa-chevron-down"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>';
			
			//-- access list
			tempP = "";
			for(var loopY = 0; loopY < data.access.length; loopY++){
				if(loopY ==  (data.access.length - 1)) { tempP = "flush"; }
				
				switch(data.access[loopY].status){
					case "0"	 : tempR = "disabled"; break;
					case "1"	 : tempR = "checked"; break;
					default			 : tempR = ""; break;
				}
				
				part[1] = part[1] +
				'<div class="cards toggle-content ' + data.id + '-group">' +
					'<div class="list-box clear">' +
						'<p class="list-text ' + data.access[loopY].type + '">' + data.access[loopY].label + '</p>' +
						'<div class="switch-box clear fixed-position right">' +
							'<input id="' + data.access[loopY].id + '" type="checkbox" ' + tempR + ' />' +
							'<label for="' + data.access[loopY].id + '"></label>' +
						'</div>' +
					'</div>' +
				'</div>';

				if(loopY ==  (data.access.length - 1)) { 
					part[1] = part[1] + 
					'<div class="cards ' + tempP + ' toggle-content ' + data.id + '-group">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + 
								'<span class="click text-cyan">Ubah</span> &nbsp; | &nbsp;' +
								'<span class="click text-pink">Hapus</span>' +
							'</p>' +
						'</div>' +
					'</div>';
				}
			}
		//}
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, 'Autentikasi'));
		footPage.html(r_footPageHtml('add'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		$("#add-button").unbind().on('click', function(){ r_navigateTo(31); });
		searchBoxActivator();
		toggleBoxActivator();
		r_navbarReactor();
	});
}

//F3 FORM USER
//=====================================
function r_f3FormUser() {
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

		dataAccess = [
			{
				'group': "Kelembagaan", "list": 
				[
					{"id": "kelembagaan-lihat", "state": "checked='checked'"},
					{"id": "kelembagaan-tambah", "state": ""},
					{"id": "kelembagaan-ubah", "state": ""},
					{"id": "kelembagaan-hapus", "state": ""},
				]
			},
			{
				'group': "Lingkup Area", "list": 
				[
					{"id": "lingkupArea-lihat", "state": "checked='checked'"},
					{"id": "lingkupArea-tambah", "state": ""},
					{"id": "lingkupArea-ubah", "state": ""},
					{"id": "lingkupArea-hapus", "state": ""},
				]
			},
			{
				'group': "Pengaturan kelembagaan", "list": 
				[
					{"id": "pengaturanKelembagaan-lihat", "state": "checked='checked'"},
					{"id": "pengaturanKelembagaan-tambah", "state": ""},
					{"id": "pengaturanKelembagaan-ubah", "state": ""},
					{"id": "pengaturanKelembagaan-hapus", "state": ""},
				]
			},
			{
				'group': "Pengaturan verifikasi", "list": 
				[
					{"id": "pengaturanVerifikasi-lihat", "state": "checked='checked'"},
					{"id": "pengaturanVerifikasi-tambah", "state": ""},
					{"id": "pengaturanVerifikasi-ubah", "state": ""},
					{"id": "pengaturanVerifikasi-hapus", "state": ""},
				]
			},
			{
				'group': "Berita", "list": 
				[
					{"id": "berita-lihat", "state": "checked='checked'"},
					{"id": "berita-tambah", "state": ""},
					{"id": "berita-ubah", "state": ""},
					{"id": "berita-hapus", "state": ""},
				]
			},
			{
				'group': "Konfigurasi & pemeliharaan aplikasi", "list": 
				[
					{"id": "konfigurasi-lihat", "state": "checked='checked'"},
					{"id": "konfigurasi-tambah", "state": ""},
					{"id": "konfigurasi-ubah", "state": ""},
					{"id": "konfigurasi-hapus", "state": ""},
				]
			}

		];
		
		counter = 0;
		data = p_getData('f4', 'f431', '');
		data = data.feedData;
		if(data != null && data.length > 0){ counter = data.length; }
		
		//--open
		head = '';
		body = '<div class="row no-head"><div class="container"><div id="section-bentukLembaga" class="col-md-8 col-md-offset-2">';
		body = body + 
		'<form id="f-user-create" f-group="f3" f-target="f31">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Autentikasi user baru</h4>' +
					'<p class="offset">form untuk menambahkan data user untuk akses ke aplikasi.</p>' +
					'<div class="btn-collapse right">' +
						// '<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="row default">' +
					'<div class="col-md-6">' +
						'<div class="input-box">' +
							'<input placeholder="Nama user" name="nama" tabindex="1" type="text" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input placeholder="Jabatan" name="jabatan" tabindex="1" type="text" value="" />' +
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
								'<input id="f111_lingkupArea_kode" name="kodeKelurahan" tabindex="1" type="hidden" value="" />' +
								'<span class="fa fa-magic"></span>' +
							'</div>' +
						'</div>' +
						'<div class="input-box">' +
							'<div class="icon-box left">' +
								'<input id="f111_lingkupArea_2" name="kecamatan" placeholder="Kecamatan" tabindex="1" type="text" value="" readonly />' +
								'<input id="f111_lingkupArea_kode2" name="kodeKecamatan" tabindex="1" type="hidden" value="" readonly />' +
								'<span class="fa fa-repeat"></span>' +
							'</div>' +
						'</div>' +
						'<div class="input-box">' +
							'<div class="icon-box left">' +
								'<input id="f111_lingkupArea_3" name="wilayah" placeholder="Wilayah" tabindex="1" type="text" value="" readonly />' +
								'<input id="f111_lingkupArea_kode3" name="kodeWilayah" tabindex="1" type="hidden" value="" readonly />' +
								'<span class="fa fa-repeat"></span>' +
							'</div>' +
						'</div>' +
						'<div class="input-box">' +
							'<div class="icon-box left">' +
								'<input id="f111_lingkupArea_4" name="provinsi" placeholder="Provinsi" tabindex="1" type="text" value="" readonly />' +
								'<input id="f111_lingkupArea_kode4" name="kodeProvinsi" tabindex="1" type="hidden" value="" readonly />' +
								'<span class="fa fa-repeat"></span>' +
							'</div>' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="telp" placeholder="Telp (*)" tabindex="2" type="text" value="" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-6">' +
						'<div class="input-box">' +
							'<input name="email" placeholder="Email (*)" tabindex="2" type="text" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="username" placeholder="Username (*)" tabindex="2" type="text" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="password" placeholder="Password (*)" tabindex="2" type="password" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="re-password" placeholder="Password ulang (*)" tabindex="2" type="password" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<p>Batasi wilayah (optional)</p>' +
						'</div>' +
						'<div class="select-box">' +
							'<select name="batasWilayah" tabindex="2">' +
								'<option value="" selected>Pilih wilayah</option>' +
								r_optionDHtml('wilayah') +
							'</select>' +
						'</div>' +
						'<div class="input-box">' +
							'<p>Pilih foto</p>' +
						'</div>' +
						'<div class="picture-box">' +
							'<img viewer-id="v-user" class="pic-default" src="img/sources/picture.png" />' +
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
					'<div class="clearfix">&nbsp;</div>' +
					'<div class="col-md-12">' +
						'<div class="empty-box flush"></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards">' +
				'<div class="row default">' +
					'<div class="col-md-4">' +
						'<div class="input-box">' +
							'<p>Pengaturan akses untuk setiap user.</p>' +
							'<p><b>Akses menu</b> &nbsp; <!--span class="click text-pink" id="selectAll">Pilih semua</span--></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2">' +
						'<div class="input-box">' +
							'<p><b>Lihat</b></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2">' +
						'<div class="input-box">' +
							'<p><b>Tambah</b></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2">' +
						'<div class="input-box">' +
							'<p><b>Ubah</b></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2">' +
						'<div class="input-box">' +
							'<p><b>Hapus</b></p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';

		for(loop=0; loop<dataAccess.length; loop++){
			body = body + 
			'<div class="cards">' +
				'<div class="row default">' +
					'<div class="col-md-4">' +
						'<div class="input-box">' +
							'<p>' + dataAccess[loop].group + '</p>' +
						'</div>' +
					'</div>';
			for(loopY=0; loopY<dataAccess[loop].list.length; loopY++){		
				body = body + 
				'<div class="col-md-2">' +
					'<div class="check-box">' +
					  '<input id="' + dataAccess[loop].list[loopY].id + '" name="' + dataAccess[loop].list[loopY].id + '" value="1" type="checkbox" ' + dataAccess[loop].list[loopY].state + '>' +
					  '<label for="' + dataAccess[loop].list[loopY].id + '"><span class="inner"></span><span class="icon"></span></label>' +
					'</div>' +
				'</div>';
			}

			body = body + 		
				'</div>' +
			'</div>';
		}

		body	= body + '</form></div></div></div>';
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

		// $("#selectAll").unbind().on("click", function(){
		// 	if($(this).html() == "Pilih semua"){
		// 		$(".check-box input").attr('checked', '');
		// 		$(this).html("Bersihkan");
		// 	}else{
		// 		$(".check-box input").removeAttr('checked');
		// 		$(this).html("Pilih semua");
		// 	}
		// });

		r_navbarReactor();
	
		//form reactor
		p_formHandler("f-bentukLembaga-create" , "addData");
	});
}