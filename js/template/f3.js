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
		part[0] = '<!--div class="col-md-3 col-md-offset-1">';
		part[1] = '<div class="col-md-8 col-md-offset-2">';
		
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
		
		//--render data
		var tempP 	= "";
		var tempR 	= "";
		var tempL 	= "";
		var tempH 	= "";
		var placeImg= "";
		
		if(data!= null && data.length != 0){
			for(var loop = 0; loop < data.length; loop++){	
				placeImg 	= (data[loop].noreg != "") ? data[loop].noreg : data[loop].id;
				placeImg 	= placeImg.substr((placeImg.length-1), 1);

				tempL	 	= (data[loop].noreg != "") ? 'Lembaga :: ' : '';
				temPic   	= (data[loop].picture != "" && data[loop].picture != null) ? 'img/logo/' + data[loop].picture : 'img/logo/avatar-' + placeImg + '.jpg';
				

				if(tempH != data[loop].userLevel){
					part[1] = part[1] +
					'<div class="cards-label ' + ((loop > 0) ? 'plus' : '') + '">' +
						'<p><strong>' + data[loop].rule + '</strong></p>' +
					'</div>';

					tempH = data[loop].userLevel;
				}

				part[1]  	= part[1] +
				'<div class="cards clear" id="' + data[loop].id + '-group">' +
					'<div class="description-box">' +
						'<div class="">' +
							'<img class="icon-set" src="' + temPic + '"/>' +
							'<p class="title-set">' + data[loop].nama + '</p>' +
							'<div class="text-set">' +
								'<span class="id-set">' + data[loop].username + '</span>' +
								'<span class="desc-text">' + data[loop].email + '</span>' +
							'</div>' +
						'</div>' +
						'<button class="click-option btn-set toggle-click clear" toggle-target="' + data[loop].id + '-group" type="button"><span class="fa fa-chevron-down"></span></button>' +
					'</div>' +
				'</div>';
				
				if(data[loop].access != null){
					//-- access list
					tempP = "";
					for(var loopY = 0; loopY < data[loop].access.length; loopY++){
						tempPR = "";
						if(loopY ==  (data[loop].access.length - 1)) { tempP = "flush"; }
						if(loopY ==  (data[loop].access.length - 1) && data[loop].userLevel == '1') { tempPR = "flush"; }
						
						switch(data[loop].access[loopY].status){
							case "0"	 : tempR = ""; break;
							case "1"	 : tempR = "checked"; break;
							default		 : tempR = ""; break;
						}
						
						part[1] = part[1] +
						'<div class="cards toggle-content ' + data[loop].id + '-group ' + tempPR + '">' +
							'<div class="list-box clear">' +
								'<p class="list-text ' + data[loop].access[loopY].type + '">' + data[loop].access[loopY].label + '</p>' +
								'<div class="switch-box clear fixed-position right">' +
									'<input id="' + data[loop].access[loopY].id + '" pId="' + data[loop].username + '" class="userActivator" type="checkbox" ' + tempR + ' />' +
									'<label for="' + data[loop].access[loopY].id + '"></label>' +
								'</div>' +
							'</div>' +
						'</div>';

						if(loopY ==  (data[loop].access.length - 1) && data[loop].userLevel != '1') { 
							part[1] = part[1] + 
							'<div class="cards ' + tempP + ' toggle-content ' + data[loop].id + '-group">' +
								'<div class="list-box clear">' +
									'<p class="list-text">';

										part[1] = part[1] + 
										'<span class="click text-cyan" id="' + data[loop].id  + '-group-edit"' +
											'p-referencesKey="' + data[loop].username + '"' +
											'p-container	="' + data[loop].id + '-group">Ubah</span> &nbsp; | &nbsp;'

										part[1] = part[1] + 
										'<span class="click text-pink"id="' + data[loop].id  + '-group-hapus"' +
											'p-label		="' + data[loop].nama + '"' + 
											'p-id			="' + data[loop].username+ '"' +
											'p-referencesKey=""' +
											'p-group		="f3"' + 
											'p-target		="f31"' +
											'p-container	="' + data[loop].id + '-group">Hapus</span>' +
									'</p>' +
								'</div>' +
							'</div>';
						}
					}
				}
			}
		}else{
			part[1] = part[1] +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
				'</div>' +
			'</div>';
		}
		
		part[0] = part[0] + '</div-->';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, 'Autentikasi'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		
		var ul = r_getCookie('userLevel');
		if(ul == '3' || ul == '7') footPage.html(r_footPageHtml('add'));
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(0); });
		$("#add-button").unbind().on('click', function(){ profile_look_set(""); r_navigateTo(31); });

		for(var loop = 0; loop < data.length; loop++){	
			$('#' + data[loop].id + '-group-edit').unbind().on("click", function(e){
				clearPacket();
				pReferencesKey	= $(this).attr('p-referencesKey');
				hideOptionList(); 
				r_f3userSectionEditor(pReferencesKey); 
			});

			$('#' + data[loop].id + '-group-hapus').unbind().on("click", function(e){
				e.preventDefault(); 
				if($("#" + $(this).attr('p-container') + " [name=p-id]").val() != ""){
					showOptionConfirm('delete');
					clearPacket();
					pContainer		= $(this).attr('p-container');
					pGroup 			= $(this).attr('p-group');
					pTarget			= $(this).attr('p-target');
					pId				= $(this).attr('p-id');
					pLabel			= $(this).attr('p-label');
					pReferencesKey	= $(this).attr('p-referencesKey');
					$(".option-yes").unbind().on("click", function(){ 
						hideOptionList(); 
						if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
							$("#" + pContainer + ", ." + pContainer).remove();
							clearPacket();
						}; 
					});
				}
			});
		}

		$(".userActivator").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('status');
			clearPacket();
			pTarget	= $(this);
			pId 	= $(this).attr('pId');
			pReferencesKey = (pTarget.prop('checked') == true ? '1' : '0');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_changeData('f3', 'f311', pId, pReferencesKey) == 'success'){ 
					state = (pTarget.prop('checked') == true ? false : true);
					pTarget.prop('checked', state);
					clearPacket();
				}; 
				
			});
			 return false;
		});
		
		searchBoxActivator();
		toggleBoxActivator();
		r_navbarReactor();
	});
}

//F3 FORM USER
//=====================================
function r_f3FormUser(packet) {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['','','',''];
		content = '';
		
		dataAccess = [
			{
				'module': 'kelembagaan', 'group': "Kelembagaan", "list": 
				[
					{"id": "kelembagaan-lihat", "state": "checked='checked'"},
					{"id": "kelembagaan-tambah", "state": ""},
					{"id": "kelembagaan-ubah", "state": ""},
					{"id": "kelembagaan-hapus", "state": ""},
				]
			},
			{
				'module': 'lingkupArea', 'group': "Lingkup Area", "list": 
				[
					{"id": "lingkupArea-lihat", "state": ""},
					{"id": "lingkupArea-tambah", "state": ""},
					{"id": "lingkupArea-ubah", "state": ""},
					{"id": "lingkupArea-hapus", "state": ""},
				]
			},
			{
				'module': 'pengaturanKelembagaan', 'group': "Pengaturan kelembagaan", "list": 
				[
					{"id": "pengaturanKelembagaan-lihat", "state": ""},
					{"id": "pengaturanKelembagaan-tambah", "state": ""},
					{"id": "pengaturanKelembagaan-ubah", "state": ""},
					{"id": "pengaturanKelembagaan-hapus", "state": ""},
				]
			},
			{
				'module': 'pengaturanVerifikasi', 'group': "Pengaturan verifikasi", "list": 
				[
					{"id": "pengaturanVerifikasi-lihat", "state": ""},
					{"id": "pengaturanVerifikasi-tambah", "state": ""},
					{"id": "pengaturanVerifikasi-ubah", "state": ""},
					{"id": "pengaturanVerifikasi-hapus", "state": ""},
				]
			},
			{
				'module': 'berita', 'group': "Berita", "list": 
				[
					{"id": "berita-lihat", "state": ""},
					{"id": "berita-tambah", "state": ""},
					{"id": "berita-ubah", "state": ""},
					{"id": "berita-hapus", "state": ""},
				]
			},
			{
				'module': 'konfigurasi', 'group': "Konfigurasi & pemeliharaan aplikasi", "list": 
				[
					{"id": "konfigurasi-lihat", "state": ""},
					{"id": "konfigurasi-tambah", "state": ""},
					{"id": "konfigurasi-ubah", "state": ""},
					{"id": "konfigurasi-hapus", "state": ""},
				]
			}

		];

		//Cookie set
		if(packet == undefined || packet == "" || packet == null || packet == "start"){
			packet = profile_look_reader();
		}

		profile_look_set(packet);

		//-- get data lingkup area
		dataTemp 		  	= p_getData('f4', 'f401', '');
		sourcesData 	  	= (dataTemp.feedData != null) ? dataTemp.feedData[0] : ""; 
		sourcesDetailData 	= (dataTemp.feedData != null) ? dataTemp.feedDataDetail : "";

		dataTemp 		  	= p_getData('f4', 'f412', '');
		sourcesWilayah 		= (dataTemp.feedData != null) ? dataTemp.feedData[0] : "";
		sourcesWilayahDetail= (dataTemp.feedData != null) ? dataTemp.feedDataDetail : "";

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
							'<input placeholder="Nama user (*)" name="nama" tabindex="1" type="text" value="" />' +
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
							'<input name="telp" placeholder="Telp" tabindex="2" type="text" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<input name="email" placeholder="Email (*)" tabindex="2" type="text" value="" />' +
						'</div>' +
						'<div class="input-box">' +
							'<p>Level pengguna</p>' +
						'</div>' +
						'<div class="select-box">' +
							'<select name="userLevel" tabindex="1">' +
								r_optionDHtml('level') +
							'</select>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-6">' +
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
							'<p>Batasi lingkup area</p>' +
						'</div>' +
						'<div class="select-box">' +
							'<select name="lingkupArea" tabindex="1">' +
								'<option value="" selected>Pilih lingkup area (*)</option>' +
								'<option value="3">Provinsi</option>' +
								'<option value="2">Wilayah</option>' +
								'<option value="1">Kecamatan</option>' +
							'</select>' +
						'</div>' +
						'<div class="input-box">' +
							'<div class="icon-box left">' +
								'<input id="batasArea" name="batasArea" placeholder="Pilih area spesifik (*)" tabindex="1" type="text" value="" />' +
								'<input id="batasArea_id" name="idBatasArea" tabindex="2" type="hidden" value="" />' +
								'<span class="fa fa-magic"></span>' +
							'</div>' +
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
							'<p><b>Akses menu</b> &nbsp; <span class="click text-pink" id="selectAll">Pilih semua</span></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2 col-xs-3">' +
						'<div class="input-box">' +
							'<p><b>Lihat</b></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2 col-xs-3">' +
						'<div class="input-box">' +
							'<p><b>Tambah</b></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2 col-xs-3">' +
						'<div class="input-box">' +
							'<p><b>Ubah</b></p>' +
						'</div>' +
					'</div>' +
					'<div class="col-md-2 col-xs-3">' +
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
					  		'<input name="module[]" value="' + dataAccess[loop].module + '" type="hidden">' +
						'</div>' +
					'</div>';
			for(loopY=0; loopY<dataAccess[loop].list.length; loopY++){		
				body = body + 
				'<div class="col-md-2 col-xs-3">' +
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
		headPage.html(r_headPageHtml(3, 'Form user'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(3); });
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
				r_f4userSectionEditor(pTarget, pId, pLabel, pReferences, pDecription); 
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

		$('#selectAll').click(function(event) {
		  	if($(this).html() == "Pilih semua"){
			     // Iterate each checkbox
			     $(':checkbox').each(function() {
			          this.checked = true;
			     });

			     $(this).html("Bersihkan");
		  	}
		  	else {
			    $(':checkbox').each(function() {
			          this.checked = false;
			     });
			    $(this).html("Pilih semua");
		  	}
		});

		dataTemp  	= p_getData('f4', 'f402', '');
		sData 	    = dataTemp.feedData;
		sDetailData = dataTemp.feedDataDetail;

		$("#f-user-create [name=lingkupArea]").on('change', function(){  
			$("#batasArea, #batasArea_id").val("");
			if($(this).val() != ''){
				var temp  = sData;
				var tempD = sDetailData;
				
				if 	   ($(this).val() == '3') { temp = sData.provinsi; 	tempD = sDetailData.provinsi; }
				else if($(this).val() == '2') { temp = sData.wilayah; 	tempD = sDetailData.wilayah; }
				else if($(this).val() == '1') { temp = sData.kecamatan; tempD = sDetailData.kecamatan; }
				autoCompleteActivator("batasArea", temp, tempD, "batasArea");
			}else{
				$("#batasArea").autocomplete("destroy");
			}
		});

		fileBrowserActivator();
		imagePreviewActivator();
		r_navbarReactor();

		//autocomplete
		autoCompleteActivator("f111_lingkupArea", sourcesData, sourcesDetailData, "lingkupArea");
		// autoCompleteActivator("batasWilayah", sourcesWilayah, sourcesWilayahDetail, "batasWilayah");
		
		//form reactor
		p_formHandler("f-user-create" , "addData");

		//generate data for editing
		if(packet != "start" && packet != "" && packet != null){ r_f3FormUserDataGenerator(packet); }	
	});
}

function r_f3userSectionEditor(username){
	r_navigateTo(31, username);
} 


function r_f3FormUserDataGenerator(packet){
	data = p_getData('f3', 'f311', '', packet);
	data = data.feedData;
	
	$("#f-user-create [name=noreg]").val(data.user.noRegistrasi);
	$("#f-user-create [name=nama]").val(data.user.nama);
	$("#f-user-create [name=jabatan]").val(data.user.jabatan);
	$("#f-user-create [name=alamat]").val(data.user.alamat);
	$("#f-user-create [name=rt]").val(data.user.noRt);
	$("#f-user-create [name=rw]").val(data.user.noRw);
	$("#f-user-create [name=kelurahan]").val(data.user.namaKelurahan);
	$("#f-user-create [name=kodeKelurahan]").val(data.user.kodeKelurahan);
	$("#f-user-create [name=kecamatan]").val(data.user.namaKecamatan);
	$("#f-user-create [name=kodeKecamatan]").val(data.user.kodeKecamatan);
	$("#f-user-create [name=wilayah]").val(data.user.namaWilayah);
	$("#f-user-create [name=kodeWilayah]").val(data.user.kodeWilayah);
	$("#f-user-create [name=provinsi]").val(data.user.namaProvinsi);
	$("#f-user-create [name=kodeProvinsi]").val(data.user.kodeProvinsi);
	$("#f-user-create [name=telp]").val(data.user.noTelp);
	$("#f-user-create [name=email]").val(data.user.email);
	$("#f-user-create [name=username]").val(data.user.username);
	$("#f-user-create [name=userLevel]").val(data.user.userLevel);
	$("#f-user-create [name=lingkupArea]").val(data.user.lingkupArea);
	$("#f-user-create [name=batasArea]").val(data.user.batasArea);
	$("#f-user-create [name=idBatasArea]").val(data.user.idBatasArea);
	$("#f-user-create [viewer-id=v-user]").attr('src',(data.user.urlGambar != "" && data.user.urlGambar != null) ? 'img/avatar/'+data.user.urlGambar : "img/sources/picture.png");
	$("#f-user-create [name=imageName]").html((data.user.urlGambar != "" && data.user.urlGambar != null) ? data.user.urlGambar : "berkas belum diunggah...");

	$("#f-user-create [name=username]").attr('readonly', 'readonly');
	if(data.user.urlGambar != "" && data.user.urlGambar != null){ 
		$("[viewer-id=v-user]").removeClass('changed').addClass('changed'); 
		$("[browser-id=v-user]").css('display', 'block'); 
	}

	if(data.user.noRegistrasi != "" && data.user.noRegistrasi != null){
		$("#f-user-create [viewer-id=v-user]").attr('src',(data.user.urlGambar != "" && data.user.urlGambar != null) ? 'img/logo/'+data.user.urlGambar : "img/sources/picture.png");
	}

	$(':checkbox').each(function() { this.checked = false; });

	var state = 0;
	for(loop=0; loop<data.access.length; loop++){
		if(data.access[loop].lihat == '1'){state++; $('#f-user-create [name=' + data.access[loop].module + '-lihat]').prop('checked', true);}
		if(data.access[loop].tambah == '1'){state++; $('#f-user-create [name=' + data.access[loop].module + '-tambah]').prop('checked', true);}
		if(data.access[loop].ubah == '1'){state++; $('#f-user-create [name=' + data.access[loop].module + '-ubah]').prop('checked', true);}
		if(data.access[loop].hapus == '1'){state++; $('#f-user-create [name=' + data.access[loop].module + '-hapus]').prop('checked', true);}
	}

	if(state > 0) {$('#selectAll').html("Bersihkan");}

	//form reactor
	p_formHandler("f-user-create" , "updateData");
}