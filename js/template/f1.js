//F1 KELEMBAGAAN :: LIST BENTUK LEMBAGA
//=====================================
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



//F1 DAFTAR LEMBAGA
//=====================================
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
		data = p_getData('f1', 'f1110', "", 'single,'+ kodeBentukLembagaState);
		data = data.feedData;
		
		//-- set option list on a session
		optionBatch = (data != null) ? data.option : [];
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-3">';
		part[1] = '<div class="col-md-8" id="lembaga-list">';
		
		//--left
		part[0] = part[0] +
		'<form id="f-filter-select">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<p class="fixed offset">Filter lembaga</p>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
						'<button class="clear" type="submit"><span class="fa fa-filter text-yellow"></span></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="select-box">' +
					'<select id="filter-provinsi">' +
						'<option value="" selected>Provinsi</option>' +
						r_optionDHtml('provinsi') +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select id="filter-wilayah">' +
						'<option value="" selected>Wilayah</option>' +
						r_optionDHtml('wilayah') +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select id="filter-kecamatan">' +
						'<option value="" selected>Kecamatan</option>' +
						r_optionDHtml('kecamatan') +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select id="filter-kelurahan">' +
						'<option value="" selected>Kelurahan</option>' +
						r_optionDHtml('kelurahan') +
					'</select>' +
				'</div>' +
				'<div class="space-box"></div>' +
			'</div>' +
		'</form>';
			
		//--render data
		var tempP = "";
		var tempB = ""; 

		part[1] = part[1] + r_f1LembagaGenerator (data);
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="kelembagaan">' + head + body + '</section>';
		//--close
		
		//--gen
		headPage.html(r_headPageHtml(4, namaBentukLembagaState));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		
		var ul = r_getCookie('kelembagaanTambah');
		if(ul == '1') footPage.html(r_footPageHtml('add'));
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(1); });
		$("#add-button").unbind().on('click', function(){ profile_look_set(""); r_tabSet(1);  r_navigateTo(15); });
		
		//navbar
		r_navbarReactor();

		//search-box
		searchBoxActivator();
		$(".search-input").on('keyup', function(){ 
			var dumbBentukLembagaState = r_bentukLembagaReader();
			var kodeBentukLembagaState = dumbBentukLembagaState[0];
			var dataKey = p_getData('f1', 'f1110', $(this).val(), 
						'multipart,' + kodeBentukLembagaState + ',' +
						$('#f-filter-select #filter-provinsi').val()  + ',' + 
						$('#f-filter-select #filter-wilayah').val()   + ',' + 
						$('#f-filter-select #filter-kecamatan').val() + ',' + 
						$('#f-filter-select #filter-kelurahan').val());
				dataKey = dataKey.feedData;
			$("#lembaga-list").html(r_f1LembagaGenerator(dataKey));
			r_f1LembagaEventctivator();
		});

		//filter activation
		$('#f-filter-select').unbind().on('submit', function(e) {
			e.preventDefault();
			var dumbBentukLembagaState = r_bentukLembagaReader();
			var kodeBentukLembagaState = dumbBentukLembagaState[0];
			var dataKey = p_getData('f1', 'f1110', $(".search-input").val(), 
						'multipart,' + kodeBentukLembagaState + ',' +
						$('#f-filter-select #filter-provinsi').val()  + ',' + 
						$('#f-filter-select #filter-wilayah').val()   + ',' + 
						$('#f-filter-select #filter-kecamatan').val() + ',' + 
						$('#f-filter-select #filter-kelurahan').val());
				dataKey = dataKey.feedData;
			$("#lembaga-list").html(r_f1LembagaGenerator(dataKey));
			r_f1LembagaEventctivator();
		});

		//event on list activator
		r_f1LembagaEventctivator();
	});
}

function r_f1LembagaEventctivator(){
	$(".detail-click").unbind().on('click', function(){ r_navigateTo(12, $(this).attr('p-id')); });
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
		//-- popup
		$("#view-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(12, pId); });
		$("#verification-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(13, pId); });
		$("#edit-card").unbind().on("click", function(){ hideOptionList(); r_tabSet(1); r_navigateTo(15, pId); });
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
					$('#' + pContainer).remove(); 
					lembagaCounter = lembagaCounter - 1;
					if(lembagaCounter <= 0){
						$(".cards-label").remove();
						//$("#lembaga-list").append(r_f1LembagaGenerator([{"lembaga" : null}]));
					}
					clearPacket();
				}; 
			});
		});
	});

	detailBoxActivator();
}

function r_f1LembagaGenerator(data){
	var genHtml = "";
	var tempB 	= "";
	var tempP	= "";
	if(data.lembaga != null){
		lembagaCounter = data.lembaga.length;
		for(var loop = 0; loop < data.lembaga.length; loop++){	
			if(loop > 0){ tempP = "plus"; }
			if(data.lembaga[loop].collapse == 'y') { tempB = '<span class="btn-collapse">Lihat semua</span>'; } else { tempB = ""; }

			//--right
			genHtml = genHtml +
			'<div class="cards-label ' + tempP + '">' +
				'<p>' +
					'<strong>' + data.lembaga[loop].group + ' (' +  data.lembaga[loop].list.length + ')</strong>' +
					tempB +
				'</p>' +
			'</div>';
			var temPic = "";
			for(var loopY = 0; loopY < data.lembaga[loop].list.length; loopY++){
				var placeImg = data.lembaga[loop].list[loopY].noreg;
				placeImg = placeImg.substr((placeImg.length-1), 1);
				temPic   = (data.lembaga[loop].list[loopY].picture != "") ? 'img/logo/' + data.lembaga[loop].list[loopY].picture : 'img/logo/avatar-' + placeImg + '.jpg';
				genHtml  = genHtml +
				'<div id="' + data.lembaga[loop].list[loopY].id + '" class="cards clear">' +
					'<div class="description-box">' +
						'<div class="click-frame">' +
							'<img class="icon-set" src="' + temPic + '"/>' +
							'<p class="title-set">' + data.lembaga[loop].list[loopY].nama + '</p>' +
							'<div class="text-set">' +
								'<span class="id-set">' + data.lembaga[loop].list[loopY].noreg + '</span>' +
								'<span class="desc-text">' + data.lembaga[loop].list[loopY].telp + ' | ' + data.lembaga[loop].list[loopY].email + '</span>' +
							'</div>' +
						'</div>' +
						'<button type="button" class="click-option btn-set" ' + 
							'p-label		="' + data.lembaga[loop].list[loopY].nama + '"' + 
							'p-id			="' + data.lembaga[loop].list[loopY].id + '"' +
							'p-group		="f1"' + 
							'p-target		="f111"' +
							'p-container	="' + data.lembaga[loop].list[loopY].id + '">' +
						'<span class="fa fa-ellipsis-v"></span></button>' +
					'</div>' +
					'<div class="detail-box">' +
						'<div class="list-box">' +
							'<div class="list-icon"><span class="fa fa-lock"></span></div>' +
							'<p class="list-text">' + data.lembaga[loop].list[loopY].username + '</p>' +
						'</div>' +
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
	}else{
		genHtml = genHtml +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}

	return genHtml;
}

//F1 DETAIL LEMBAGA
//=====================================
function r_f1DetailLembaga(packet) { 
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
	
		if(packet == undefined || packet == "" || packet == null || packet == "start"){
			packet = profile_look_reader();
		}

		profile_look_set(packet);
		
		//data = p_getData('f1', 'f1111', '', '12121300001');
		data = p_getData('f1', 'f1111', '', packet); console.log(packet);
		data = data.feedData;
		
		//-- set option list on a session
		if(data != null && data.option != undefined){
			optionBatch = data.option;
		}else{
			r_navigateTo(99); return false;
		}
		
		//--open
		head	= '';
		body	= '<div class="row no-head"><div class="container">';
		part[0] = '<div class="col-md-3">';
		part[1] = '<div class="col-md-9">';
		
		//--left
		if(data.profile[0] != null){
			var temPic = "";
			temPic = (data.profile[0].avatar != "") ? 'img/logo/' + data.profile[0].avatar : 'img/logo/avatar-5.jpg';
			part[0] = part[0] +
			'<div class="cards clear">' +
				'<div class="cards-banner-blank long smalltron-ground">' +
					'<div class="user-frame">' +
						'<img src="' + temPic + '">' +
						'<p class="caption">' +
							'<span class="big">' + data.profile[0].nama + '</span>' +
							'<span>Yayasan</span>' +
						'</p>' +
						'<button class="btn-option btn-default click-option" ' + 
							'p-group		="f1"' + 
							'p-target		="f111"' +
							'p-id="' + data.profile[0].noreg + '" p-label="' + data.profile[0].nama + '"><i class="fa fa-ellipsis-h"></i></button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="cards flush">' +
				'<div class="desc-frame">' +
					'<div class="desc-box flush">' +
						'<p class="text-set">' + data.profile[0].catatan + '</p>' +
					'</div>' +
					'<div class="desc-box i-left">' +
						'<div class="icon-set"><span class="fa fa-phone"></span></div>' +
						'<p class="text-set">' + data.profile[0].telp + '</p>' +
					'</div>' +
					'<div class="desc-box i-left">' +
						'<div class="icon-set"><span class="fa fa-envelope"></span></div>' +
						'<p class="text-set">' + data.profile[0].email + '</p>' +
					'</div>' +
					'<div class="desc-box i-left">' +
						'<div class="icon-set"><span class="fa fa-globe"></span></div>' +
						'<p class="text-set">' + data.profile[0].sosialMedia + '</p>' +
					'</div>' +
					'<div class="desc-box i-left">' +
						'<div class="icon-set"><span class="fa fa-map-marker"></span></div>' +
						'<p class="text-set">' + data.profile[0].alamat + '</p>' +
					'</div>' +
					'<div class="desc-box i-left">' +
						'<p class="text-set"><span class="text-cyan click" id="go-maps" m-lng="' + data.profile[0].langitude + '" m-lat="' + data.profile[0].latitude + '">Lihat maps</span></p>' +
					'</div>' +
				'</div>' +
			'</div>';
				
			//--render data
			for(var loop = 0; loop < data.detail.length; loop++){
				//--right
				if(data.detail[loop].group == 'card'){
					part[1] = part[1] +
					'<div class="cards">' +
						'<div class="cards-header">' +
							'<p class="fixed">' + data.detail[loop].groupName + '</p>' +
							'<div class="btn-collapse right">' +
								'<button class="toggle-click clear" toggle-target="' + data.detail[loop].groupId+ '-group" type="button"><span class="fa fa-chevron-down"></span></button>' +
							'</div>' +
						'</div>' +
					'</div>';
					
					var endLoopY = 0;
					switch(data.detail[loop].type){
						case 'table'		: part[1] = part[1] + '<div class="cards flush toggle-content ' + data.detail[loop].groupId + '-group">' + '<div class="desc-frame">';  endLoopY = data.detail[loop].items.length; break;
						case 'list'			: part[1] = part[1] + '<div class="cards flush toggle-content ' + data.detail[loop].groupId + '-group">' + '<div class="row">'; endLoopY = data.detail[loop].items.length; break;
						case 'table-list'	: part[1] = part[1] + '<div class="cards flush toggle-content ' + data.detail[loop].groupId + '-group">' + '<div class="row default">'; endLoopY = data.detail[loop].items[0].set.length;  break;
					}
					
					
					for(var loopY = 0; loopY < endLoopY; loopY++){	
						switch(data.detail[loop].type){
							case 'table'	:
								part[1] = part[1] +
								'<div class="desc-box">' +
									'<div class="labels"><p class="text-set">' + data.detail[loop].items[loopY].label + '</p></div>' +
									'<div class="divider"><p class="text-set">' + data.detail[loop].items[loopY].text + '</p></div>' +
								'</div>';
							break;
							case 'list'	:
								part[1] = part[1] +
								'<div class="list-box">' +
									'<div class="list-icon bg-' + data.detail[loop].items[loopY].color + '"><span class="fa fa-' + data.detail[loop].items[loopY].icon + '"></span></div>' +
									'<p class="list-text">' + data.detail[loop].items[loopY].text + '</p>' +
								'</div>';
							break;
							case 'table-list'	:
									 if(data.detail[loop].items[0].set[loopY].size == "large") { part[1] = part[1] + '<div class="col-md-4">'; }
								else if(data.detail[loop].items[0].set[loopY].size == "medium"){ part[1] = part[1] + '<div class="col-md-3">'; }
								else if(data.detail[loop].items[0].set[loopY].size == "small") { part[1] = part[1] + '<div class="col-md-2">'; }
								
								var classAdd = "";
								if(loopY > 0){ classAdd = "clear"; }
								part[1] = part[1] +
								'<div class="list-box ' + classAdd + '">';
								
								if(data.detail[loop].items[0].set[loopY].form == "text-icon"){ 
									part[1] = part[1] +
									'<div class="list-icon bg-' + data.detail[loop].items[0].set[loopY].color + '"><span class="fa fa-' + data.detail[loop].items[0].set[loopY].icon + '"></span></div>' +
									'<p class="list-text"><strong>' + data.detail[loop].items[0].set[loopY].text + '</strong></p>';
								}else if(data.detail[loop].items[0].set[loopY].form == "text"){
									part[1] = part[1] +
									'<p class="list-text">' + data.detail[loop].items[0].set[loopY].text + '</p>';
								}else if(data.detail[loop].items[0].set[loopY].form == "button"){
									part[1] = part[1] +
									'<button type="button" class="clear list-text btn-link">' + data.detail[loop].items[0].set[loopY].text + '</button>';
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
					
				}else if(data.detail[loop].group == "img-viewer"){
					part[1] = part[1] +
					'<div class="cards-label plus">' +
						'<p>' +
							'<strong>' + data.detail[loop].groupName + ' (' + data.detail[loop].items.length + ')</strong>' +
						'</p>' +
					'</div>' +
					'<div class="row default">';
					for(var loopY = 0; loopY < data.detail[loop].items.length; loopY++){
						var size = "";
						if(
							   data.detail[loop].items[loopY].picture != "saranaPrasarana/picture.png"
							&& data.detail[loop].items[loopY].picture != "usaha/picture.png"){
							size = "changed";
						}	

						part[1] = part[1] +
						'<div class="col-md-3">' +
							'<div class="tumb-cards">' +
								'<div class="picture-box">' +
									'<img class="pic-default ' + size + '" src="img/' + data.detail[loop].items[loopY].picture + '" />' +
								'</div>' +
								'<div class="desc-box">' +
									'<p>' + data.detail[loop].items[loopY].desc + '</p>' +
								'</div>' +
							'</div>' +
						'</div>';
					}
					part[1] = part[1] + '</div>';
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
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="kelembagaan">' + head + body + '</section>';
		//--close
		
		//--gen
		var temp = 3;
		if(String(r_getCookie('userLevel')) == '1'){ temp = 0; }
		headPage.html(r_headPageHtml(temp, 'Profil lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(r_pagePreviousReader()); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pGroup 			= $(this).attr('p-group');
			pTarget			= $(this).attr('p-target');
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			showOptionList(); 

			//-- popup
			$("#verification-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(13, $(this).attr('p-id')); });
			$("#edit-card").unbind().on("click", function(){ hideOptionList(); r_pageSet(1); r_navigateTo(15, $(this).attr('p-id')); });
			$("#delete-card").unbind().on("click", function(){ 
				hideOptionList(); 
				showOptionConfirm('delete');
				$(".option-yes").unbind().on("click", function(){ 
					hideOptionList(); 
					if(p_removeData(pGroup, pTarget, pId) == 'success'){ 
						r_navigateTo(r_pagePreviousReader());
					}; 
				});
			});

			$("#logout-card").unbind().on("click", function(){ hideOptionList(); r_clearCookies(); r_navigateTo(); });
		});

		$("#go-maps").unbind().on("click", function(){ 
			openMaps($(this).attr('m-lng'),$(this).attr('m-lat'));
		});

		toggleBoxActivator();
		r_navbarReactor();
	});
}

//F1 FORM KELEMBAGAAN
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

		//Cookie set
		if(packet == undefined || packet == "" || packet == null || packet == "start"){
			packet = profile_look_reader();
		}

		profile_look_set(packet);
	
		dataGrup = [];
		dataTemp = [];
		dataAllLembaga = [];
		dataLegalitas = [];
		kodeBentukLembaga = "";
		
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
		sourcesData 	  = (dataTemp.feedData != null) ? dataTemp.feedData[0] : null;
		sourcesDetailData = (dataTemp.feedDataDetail != null) ? dataTemp.feedDataDetail : null;

		//-- get kode bentuk lembaga for legalitas
		var bentukLembaga = r_bentukLembagaReader();
		dataLegalitas = p_getData('f1','f1114','',bentukLembaga[0]);
		if(dataLegalitas != null){ 
			dataLegalitas = dataLegalitas.feedData;
		}else{
			dataLegalitas.feedData = null;
		}
		//-- get data koleksi
		dataKoleksi = p_getData('f1', 'f117','');

		//option list 
		optionBatch = [
			//{'selector': 'edit-card', 			'icon': 'pencil', 'label': 'Ubah data'},
			{'selector': 'delete-card', 		'icon': 'trash',  'label': 'Hapus data'},
		]; 

		//get list all list lembaga { WARNING:: it might be make it slower}
		dataAllLembaga	= p_getData('f1','f11101');
		dataAllLembaga	= lembagaFetchArray(dataAllLembaga.feedData);
		//--open
		head	= 
		'<div class="row head">' +
			'<div class="container">' +
				'<div class="col-md-8 col-md-offset-2">' +
					'<div class="tab-header">' +
						'<ul>';
		
		for(var loop = 0; loop < dataHead.length; loop++){
			head = head + '<li class="tab-navigator" tab-headIndex="' + dataHead[loop].idFilter + '">' + dataHead[loop].form + '</li>';
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
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="1">';
		body = body + 
		'<form id="f-kelembagaan-create" f-group = "f1" f-target = "f111">' +
			'<div class="cards title">' +
				'<div class="cards-header">' +
					'<h4>Kelembagaan</h4>' +
					'<p class="offset">kelengkapan data dapat ditambahkan secara berkala.</p>' +
					'<p class="offset"><small>(*) <i>Mandatory atau kolom yang wajib diisi.</i>.</small></p>' +
					'<div class="btn-collapse right">' +
						// '<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
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
				'<input name="noreg" tabindex="1" type="hidden" value="" />' +
				'<input name="nama" placeholder="Nama lembaga (*)" tabindex="1" type="text" value="" />' +
			'</div>' +
			'<div class="input-box rows-2">' +
				'<textarea name="alamat" placeholder="Alamat (*)" tabindex="1" class="rows-2"></textarea>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="rt" placeholder="RT (*)" tabindex="1" class="half" type="text" value="" />' +
				'<input name="rw" placeholder="RW (*)" tabindex="1" class="half" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea" name="kelurahan" placeholder="Kelurahan (*)" tabindex="1" type="text" value="" />' +
					'<input id="f111_lingkupArea_kode" name="kodeKelurahan" tabindex="1" type="hidden" value="" />' +
					'<input id="f111_lingkupArea_kodeArea" name="kodeAreaKelurahan" tabindex="1" type="hidden" value="" />' +
					'<span class="fa fa-magic"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_2" name="kecamatan" placeholder="Kecamatan (*)" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode2" name="kodeKecamatan" tabindex="1" type="hidden" value="" readonly />' +
					'<input id="f111_lingkupArea_kodeArea2" name="kodeAreaKecamatan" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_3" name="wilayah" placeholder="Wilayah (*)" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode3" name="kodeWilayah" tabindex="1" type="hidden" value="" readonly />' +
					'<input id="f111_lingkupArea_kodeArea3" name="kodeAreaWilayah" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_4" name="provinsi" placeholder="Provinsi (*)" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode4" name="kodeProvinsi" tabindex="1" type="hidden" value="" readonly />' +
					'<input id="f111_lingkupArea_kodeArea4" name="kodeAreaProvinsi" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="telp" placeholder="Telp (*)" tabindex="2" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="email" placeholder="Email (*)" tabindex="2" type="email" value="" />' +
			'</div>' +
			'<div class="input-box"><p>Google Maps</p></div>' +
			'<div class="input-box">' +
				'<input name="latitude" placeholder="Latitude" tabindex="1" class="half" type="text" value="" />' +
				'<input name="langitude" placeholder="Longitude" tabindex="1" class="half" type="text" value="" />' +
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
					'<option value="0" selected>Bentuk lembaga (*)</option>' +
					'<option value="' + bentukLembaga[0] + '" selected>' + bentukLembaga[1] + '</option>' +
				'</select>' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="bidangGerak" tabindex="2">' +
					'<option value="0" selected>Bidang gerak</option>' +
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
							'<p class="placeholder" name="imageName">berkas belum diunggah...</p>' +
							'<input preview-id="v-logo" name="imageUrl" type="file" accept="image/*" tabindex="5" />' +
							'<input browser-state="fileState" name="fileState" type="hidden" tabindex="1" value="add" />' +
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
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="2" id="legalitas-frame"><div class="row default">';

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
						'<option value="Belum" selected>Sertifikasi - belum</option>' +
						'<option value="Sudah" >Sertifikasi - Sudah</option>' +
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
						'<option value="Baik" selected>Kondisi bangunan - Baik</option>' +
						'<option value="Rusak" >Kondisi bangunan - Rusak</option>' +
					'</select>' +
				'</div>' +
				'<div class="input-box">' +
					'<input name="jumlahBangunan" placeholder="Jumlah bangunan" tabindex="7" class="half" type="text" value="" />' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="saranaPrasarana" tabindex="7">' +
						'<option value="Tidak ada" selected>Sarana / Prasarana - Tidak ada</option>' +
						'<option value="Ada" >Sarana / Prasarana - Ada</option>' +
					'</select>' +
				'</div>' +
				'<div class="input-box">' +
					'<p>Struktur Organisasi</p>' +
				'</div>' +
				'<div class="input-box">' +
					'<div class="icon-box both">' +
						'<label class="browser-box" id="s-org">' +
							'<p class="placeholder" name="imageName">berkas belum diunggah...</p>' +
							'<input name="imageUrl" accept="image/*" type="file" tabindex="5" />' +
							'<input browser-state="fileState" name="fileState" type="hidden" tabindex="5" value="add" />' +
						'</label>' +
						'<button type="button" browser-id="s-org" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
						'<span class="left fa fa-paperclip text-purple"></span>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="clearfix"></div>';
			
			//right
			body = body +
			'<div class="col-md-6">' +
				'<div class="input-box">' +
					'<input name="bahasa" placeholder="Bahasa pengantar" tabindex="8" type="text" value="" />' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="sensus" tabindex="8">' +
						'<option value="Belum" selected>Sensus - belum</option>' +
						'<option value="Sensus - Sudah" >Sudah</option>' +
					'</select>' +
				'</div>' +
				'<div class="select-box">' +
					'<select name="bantuan" tabindex="8">' +
						'<option value="Belum" selected>Bantuan pemerintah - belum</option>' +
						'<option value="Sudah" >Bantuan pemerintah - Sudah</option>' +
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
		'<form id="f-bantuan-create" f-group="f1" f-target="f121">'+
			'<div class="col-md-8 col-md-offset-2 tab-container" id="f-bantuan-list" tab-contentIndex="3">';
		
		body = body +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Riwayat bantuan</h4>' +
				'<p class="offset">riwayat bantuan yang telah diterima oleh lembaga.</p>' +
				'<div class="btn-collapse right">' +
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
				'<input name="noreg" placeholder="" tabindex="8" type="hidden" value="" />' +
				'<input name="bantuanDari" placeholder="Pemberi bantuan (*)" tabindex="13" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="tahun" placeholder="Tahun (*)" tabindex="8" type="text" maxlength="4" value="" />' +
			'</div>' +
		'</div>';
		
		//right
		body = body +
		'<div class="col-md-6">' +
			'<div class="input-box rows-2">' +
				'<textarea name="deskripsi" placeholder="Deskripsi bantuan" class="rows-2" tabindex="8" type="text"></textarea>' +
			'</div>' +
		'</div>';
		
		body = body + '</div></form></div>';

		body = body +
		'<div id="section-bantuan">';
		body = body + '</div></div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="3">&nbsp;</div>';

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
		
		//form render
		for(loop=0; loop<maxForm; loop++){
			body = body +
			'<form id="f-sarana-create-' + loop + '" f-group = "f1" f-target = "f113">'+
				'<div class="col-md-6">' +
					'<div class="row default">' +
						'<div class="cards">' +
							'<div class="cards-header">' +
								'<h5>&nbsp;</h5>' +
								'<div class="btn-collapse right">' +
									'<button class="clear" type="reset"' + 
										'p-label		="' + loop + '"' + 
										'p-id			=""' +
										'p-referencesKey=""' +
										'p-group		="f1"' + 
										'p-target		="f113"' +
										'p-container	="f-sarana-create-' + loop + '">' +
									'<span class="fa fa-refresh"></span></button>' +
									'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
								'</div>' +
							'</div>' +
							'<div class="picture-box small">' +
								'<img viewer-id="v-sarana' + loop + '" class="pic-default" src="img/sources/picture.png" />' +
							'</div>' +
							'<div class="input-box">' +
								'<input name="noreg" type="hidden" value="">' +
								'<input name="p-id" type="hidden" value="">' +
								'<input name="keterangan" placeholder="Keterangan (*)" tabindex="5" type="text" value="" />' +
							'</div>' +
							'<div class="input-box">' +
								'<div class="icon-box both">' +
									'<label class="browser-box" id="v-sarana' + loop + '">' +
										'<p class="placeholder" name="imageName">berkas belum diunggah...</p>' +
										'<input preview-id="v-sarana' + loop + '" name="imageUrl" accept="image/*" type="file" tabindex="5" />' +
										'<input browser-state="fileState" name="fileState" type="hidden" tabindex="5" value="add" />' +
									'</label>' +
									'<button type="button" browser-id="v-sarana' + loop + '" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
									'<span class="left fa fa-paperclip text-purple"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>';
		}

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
					'<option value="L" >Laki - laki</option>' +
					'<option value="P" >Perempuan</option>' +
				'</select>' +
			'</div>' +
			'<div class="select-box">' +
				'<select name="agama" tabindex="9">' +
					'<option value="" selected>Agama</option>' +
					'<option value="Islam" >Islam</option>' +
					'<option value="Kristen" >Kristen</option>' +
					'<option value="Hindu" >Hindu</option>' +
					'<option value="Budha" >Budha</option>' +
					'<option value="Lainnya" >Agama - Lainnya</option>' +
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
					'<option value="Lainnya" >Pendidikan - Lainnya</option>' +
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
		
		
		// VISUALISASI USAHA =======================================================================
		//=======================================================================
		//=======================================================================
		body = body +
		'<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="5">' +
			'<div class="cards-label plus">' +
				'<p><strong>Visualisasi usaha (0)</strong></p>' +
			'</div>' +
		'</div>';
		
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" tab-contentIndex="5">';
		
		//form render
		for(loop=0; loop<maxForm; loop++){
			body = body + 
			'<form id="f-usaha-create-' + loop + '" f-group="f1" f-target="f116">'+
				'<div class="col-md-6">' +
					'<div class="row default">' +
						'<div class="cards">' +
							'<div class="cards-header">' +
								'<h5>&nbsp;</h5>' +
								'<div class="btn-collapse right">' +
									'<button class="clear" type="reset"' + 
										'p-label		="' + loop + '"' + 
										'p-id			=""' +
										'p-referencesKey=""' +
										'p-group		="f1"' + 
										'p-target		="f116"' +
										'p-container	="f-usaha-create-' + loop + '">' +
									'<span class="fa fa-refresh"></span></button>' +
									'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
								'</div>' +
							'</div>' +
							'<div class="picture-box small">' +
								'<img viewer-id="v-usaha' + loop + '" class="pic-default" src="img/sources/picture.png" />' +
							'</div>' +
							'<div class="input-box">' +
								'<input name="noreg" type="hidden" value="" />' +
								'<input name="p-id" type="hidden" value="" />' +
								'<input name="keterangan" placeholder="Keterangan (*)" tabindex="11" type="text" value="" />' +
							'</div>' +
							'<div class="input-box">' +
								'<div class="icon-box both">' +
									'<label class="browser-box" id="v-usaha' + loop + '">' +
										'<p class="placeholder" name="imageName">berkas belum diunggah...</p>' +
										'<input preview-id="v-usaha' + loop + '" name="imageUrl" accept="image/*" type="file" tabindex="11"/>' +
										'<input browser-state="fileState" name="fileState" type="hidden" tabindex="11" value="add" />' +
									'</label>' +
									'<button type="button" browser-id="v-usaha' + loop + '" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
									'<span class="left fa fa-paperclip text-purple"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>';
		}

		body = body + '</div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="5">&nbsp;</div>';
		
		
		// KOLEKSI =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + 
		'<form id="f-koleksi-create" f-group="f1" f-target="f118">'+
			'<div class="col-md-8 col-md-offset-2 tab-container" id="f-koleksi-list" tab-contentIndex="6">';
		
		body = body +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Koleksi</h4>' +
				'<p class="offset">daftar kepemilikan lembaga yang ingin dipublikasikan.</p>' +
				'<div class="btn-collapse right">' +
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
				'<input name="noreg" type="hidden" value="" />' +
				'<input name="p-id" type="hidden" value="" />' +
				'<input name="judulKoleksi" placeholder="Judul koleksi (*)" tabindex="13" type="text" value="" />' +
			'</div>' +
		'</div>';
		
		//center
		body = body +
		'<div class="col-md-6">' +
			'<div class="select-box">' +
				'<select name="jenisKoleksi" tabindex="13">' +
					'<option value="" selected>Jenis koleksi (*)</option>' +
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
		'<div class="cards" id="f-koleksi-empty-list">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';

		body = body + '</div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="6">&nbsp;</div>';
		
		
		// PRESTASI =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" id="f-prestasi-list" tab-contentIndex="7">';
		body = body +
		'<form id="f-prestasi-create" f-group="f1" f-target="f119">'+
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<h4>Prestasi</h4>' +
				'<p class="offset">daftar pencapaian lembaga yang ingin dipublikasikan.</p>' +
				'<div class="btn-collapse right">' +
					'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
					'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="cards flush">' +
			'<div class="row default">';
		
		body = body +
		'<div class="col-md-12">' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input name="noreg" type="hidden" value="" />' +
					'<input name="p-id" type="hidden" value="" />' +
					'<input name="deskripsi" placeholder="Keterangan (*)" tabindex="14" type="text" value="" />' +
					'<span class="fa fa-pencil"></span>' +
				'</div>' +
			'</div>' +
		'</div>';
		
		body = body + '</div></form></div>';
		body = body +
		'<div class="cards" id="f-prestasi-empty-list">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';

		body = body + '</div>';
		body = body + '<div class="clearfix tab-container" tab-contentIndex="7">&nbsp;</div>';
		
		
		// HIRARKI =======================================================================
		//=======================================================================
		//=======================================================================
		body = body + '<div class="col-md-8 col-md-offset-2 tab-container" id="f-hirarki-list" tab-contentIndex="8">';
		body = body +
		'<form id="f-hirarki-create" f-group="f1" f-target="f122">' +
			'<div class="cards">' +
				'<div class="cards-header">' +
					'<h4>Hirarki</h4>' +
					'<p class="offset">kedudukan suatu lembaga terhadap lembaga lainnya.</p>' +
					'<div class="btn-collapse right">' +
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
				'<div class="select-box">' +
					'<input name="noreg" tabindex="15" type="hidden" value="" />' +
					'<select name="hirarki" tabindex="15">' +
						'<option value="" selected>Pilih hirarki (*)</option>' +
						'<option value="0" >Induk lembaga</option>' +
						'<option value="1" >Anak lembaga</option>' +
					'</select>' +
				'</div>' +
			'</div>';
			
			//right
			body = body +
			'<div class="col-md-6">' +
				'<div class="input-box">' +
					'<div class="icon-box left">' +
						'<input name="namaLembaga" placeholder="Pilih lembaga (*)" id="hirarkiLembaga" tabindex="13" type="text" value="" />' +
						'<input name="noregTarget" id="hirarkiLembaga_kode" type="hidden" value="" />' +
						'<span class="fa fa-magic"></span>' +
					'</div>' +
				'</div>' +
			'</div>';

			body = body + '</div></div></form>';
			body = body + 
			'<div class="cards-label plus f-hirarki-empty-list">' +
				'<p><strong>Posisi dalam hirarki</strong></p>' +
			'</div>';
			
			body = body +
			'<div id="f-hirarki-list-parent">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<p class="fixed text-purple text-bold">Induk lembaga</p>' +
					'</div>' +
				'</div>' +
			'</div>';

			body = body +
			'<div class="cards" id="f-hirarki-empty-list-parent">' +
				'<div class="cards-header">' +
					'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
				'</div>' +
			'</div>';
			
			body = body +
			'<div id="f-hirarki-list-child">' +
				'<div class="cards">' +
					'<div class="cards-header">' +
						'<p class="fixed text-yellow text-bold">Anak lembaga</p>' +
					'</div>' +
				'</div>' +
			'</div>';

			body = body +
			'<div class="cards" id="f-hirarki-empty-list-child">' +
				'<div class="cards-header">' +
					'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
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
		var temp = 3;
		if(String(r_getCookie('userLevel')) == '1'){ temp = 2; }
		headPage.html(r_headPageHtml(temp, 'Form lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		r_f1legaitasGenerator(dataLegalitas); //generate legalitas form
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(r_pagePreviousReader()); });
		
		// $(".reset").unbind().on('click', function(){ clearTargetForm('f-kelembagaan-create'); });
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
		datePickerActivator();
		fileBrowserActivator();
		imagePreviewActivator();
		r_navbarReactor();
		autoCompleteActivator("f111_lingkupArea", sourcesData, sourcesDetailData, "lingkupArea");
		autoCompleteActivator("f114_lingkupArea", sourcesData, sourcesDetailData, "lingkupArea");
		autoCompleteActivator("hirarkiLembaga", dataAllLembaga[0], dataAllLembaga, "hirarkiLembaga");

		//form reactor
		p_formHandler("f-kelembagaan-create" , "addData");
		p_formHandler("f-sejarah-create" , "addData");
		p_formHandler("f-bantuan-create" , "addData");
		p_formHandler("f-kepengurusan-create" , "addData");
		p_formHandler("f-kegiatanUsaha-create" , "addData");
		p_formHandler("f-koleksi-create" , "addData");
		p_formHandler("f-prestasi-create" , "addData");
		p_formHandler("f-hirarki-create" , "addData");

		for(loop=0; loop<maxForm; loop++){
			p_formHandler("f-sarana-create-" + loop , "addData");
			p_formHandler("f-usaha-create-" + loop , "addData");

			$('#f-sarana-create-' + loop + " [type=reset]").unbind().on("click", function(e){
				e.preventDefault(); 
				if($("#" + $(this).attr('p-container') + " [name=p-id]").val() != ""){
					showOptionConfirm('delete');
					clearPacket();
					pContainer		= $(this).attr('p-container');
					pGroup 			= $(this).attr('p-group');
					pTarget			= $(this).attr('p-target')
					pId				= $("#" + pContainer + " [name=p-id]").val();
					pLabel			= $(this).attr('p-label');
					pReferencesKey	= $("#" + pContainer + " [name=noreg]").val();
					$(".option-yes").unbind().on("click", function(){ 
						hideOptionList(); 
						if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
							$("#" + pContainer + " [browser-id=v-sarana" + pLabel + "]").css('display', 'none'); 
							$("#" + pContainer + " [viewer-id=v-sarana" + pLabel + "]").removeClass('changed');
							$("#" + pContainer + " [viewer-id=v-sarana" + pLabel + "]").attr('src', "img/sources/picture.png");
							$("#" + pContainer + " [name=imageName]").html("berkas belum diunggah...");
							p_formHandler(pContainer , "addData");
							clearTargetFormNoreg(pContainer, $('#' + pContainer + ' [name="noreg"]').val());
							clearPacket();
						}; 
					});
				}
			});

			$('#f-usaha-create-' + loop + " [type=reset]").unbind().on("click", function(e){
				e.preventDefault(); 
				if($("#" + $(this).attr('p-container') + " [name=p-id]").val() != ""){
					showOptionConfirm('delete');
					clearPacket();
					pContainer		= $(this).attr('p-container');
					pGroup 			= $(this).attr('p-group');
					pTarget			= $(this).attr('p-target')
					pId				= $("#" + pContainer + " [name=p-id]").val();
					pLabel			= $(this).attr('p-label');
					pReferencesKey	= $("#" + pContainer + " [name=noreg]").val();
					$(".option-yes").unbind().on("click", function(){ 
						hideOptionList(); 
						if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
							$("#" + pContainer + " [browser-id=v-usaha" + pLabel + "]").css('display', 'none'); 
							$("#" + pContainer + " [viewer-id=v-usaha" + pLabel + "]").removeClass('changed');
							$("#" + pContainer + " [viewer-id=v-usaha" + pLabel + "]").attr('src', "img/sources/picture.png");
							$("#" + pContainer + " [name=imageName]").html("berkas belum diunggah...");
							p_formHandler(pContainer , "addData");
							clearTargetFormNoreg(pContainer, $('#' + pContainer + ' [name="noreg"]').val());
							clearPacket();
						}; 
					});
				}
			});


			numberOnlyActivator("[name=telp], [name=rt], [name=rw]");
		}
		//generate data for editing
		if(packet != "" && packet != null){ r_f1FormKelembagaanDataGenerator(packet); }		
		// r_f1FormKelembagaanDataGenerator('00030200110');		
		//$("input[name=noreg]").val('00030200110');
	});
}

function r_f1FormKelembagaanDataGenerator(packet){
	
	data = p_getData('f1', 'f1112', '', packet);
	data = data.feedData;

	//kelembagaan
	var bentukLembaga = r_bentukLembagaReader();
	var tex = '<option value="' + data.kelembagaan.kodeBentukLembaga + '" selected>' + data.kelembagaan.namaBentukLembaga + '</option>';
	$("#f-kelembagaan-create [name=bentukLembaga]").append(tex);

	$("#f-kelembagaan-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	$("#f-kelembagaan-create [name=nama]").val(data.kelembagaan.nama);
	$("#f-kelembagaan-create [name=alamat]").val(data.kelembagaan.alamat);
	$("#f-kelembagaan-create [name=rt]").val(data.kelembagaan.noRt);
	$("#f-kelembagaan-create [name=rw]").val(data.kelembagaan.noRw);
	$("#f-kelembagaan-create [name=kelurahan]").val(data.kelembagaan.namaKelurahan);
	$("#f-kelembagaan-create [name=kodeKelurahan]").val(data.kelembagaan.kodeKelurahan);
	$("#f-kelembagaan-create [name=kecamatan]").val(data.kelembagaan.namaKecamatan);
	$("#f-kelembagaan-create [name=kodeKecamatan]").val(data.kelembagaan.kodeKecamatan);
	$("#f-kelembagaan-create [name=wilayah]").val(data.kelembagaan.namaWilayah);
	$("#f-kelembagaan-create [name=kodeWilayah]").val(data.kelembagaan.kodeWilayah);
	$("#f-kelembagaan-create [name=provinsi]").val(data.kelembagaan.namaProvinsi);
	$("#f-kelembagaan-create [name=kodeProvinsi]").val(data.kelembagaan.kodeProvinsi);
	$("#f-kelembagaan-create [name=telp]").val(data.kelembagaan.noTelp);
	$("#f-kelembagaan-create [name=email]").val(data.kelembagaan.email);
	$("#f-kelembagaan-create [name=langitude]").val(data.kelembagaan.langitude);
	$("#f-kelembagaan-create [name=latitude]").val(data.kelembagaan.latitude);
	$("#f-kelembagaan-create [name=medsos]").val(data.kelembagaan.mediaSosial);
	$("#f-kelembagaan-create [name=bentukLembaga]").val(data.kelembagaan.kodeBentukLembaga);
	$("#f-kelembagaan-create [name=bidangGerak]").val(data.kelembagaan.kodeBidangGerak);
	$("#f-kelembagaan-create [name=jumlahPengurus]").val(data.kelembagaan.jumlahPengurus);
	$("#f-kelembagaan-create [name=npwp]").val(data.kelembagaan.noNpwp);
	$("#f-kelembagaan-create [name=afiliasi]").val(data.kelembagaan.noNpwp);
	$("#f-kelembagaan-create [name=visi]").val(data.kelembagaan.visiLembaga);
	$("#f-kelembagaan-create [name=misi]").val(data.kelembagaan.misiLembaga);
	$("#f-kelembagaan-create [viewer-id=v-logo]").attr('src',(data.kelembagaan.urlGambarLogo != "" && data.kelembagaan.urlGambarLogo != null) ? 'img/logo/'+data.kelembagaan.urlGambarLogo : "img/sources/picture.png");
	$("#f-kelembagaan-create [name=imageName]").html((data.kelembagaan.urlGambarLogo != "" && data.kelembagaan.urlGambarLogo != null) ? data.kelembagaan.urlGambarLogo : "berkas belum diunggah...");
	$("#f-kelembagaan-create [name=catatan]").val(data.kelembagaan.catatanLain);

	$("#f-kelembagaan-create [name=kelurahan]").attr('readonly', 'readonly');
	if(data.kelembagaan.urlGambarLogo != "" && data.kelembagaan.urlGambarLogo != null){ 
		$("[viewer-id=v-logo]").removeClass('changed').addClass('changed'); 
		$("[browser-id=v-logo]").css('display', 'block'); 
	}

	//legalitas
	$(".f-legalitas-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	r_f1legaitasGenerator(data.legalitas);

	//sejarah
	$("#f-sejarah-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	$("#f-sejarah-create [name=sejarah]").val(data.sejarah.deskripsi);
	$("#f-sejarah-create [name=tanggalBerdiri]").val(data.sejarah.tanggalDidirikan);
	$("#f-sejarah-create [name=kepemilikan]").val(data.sejarah.kepemilikan);
	$("#f-sejarah-create [name=statusTanah]").val(data.sejarah.statusTanah);
	$("#f-sejarah-create [name=sertifikasi]").val((data.sejarah.statusSertifikasi != "" && data.sejarah.statusSertifikasi != null) ? data.sejarah.statusSertifikasi : "Belum");
	$("#f-sejarah-create [name=luasTanah]").val(data.sejarah.luasTanah);
	$("#f-sejarah-create [name=satuanT]").val(data.sejarah.satuanLuasTanah);
	$("#f-sejarah-create [name=luasBangun]").val(data.sejarah.luasBangunan);
	$("#f-sejarah-create [name=satuanB]").val(data.sejarah.satuanLuasBangunan);
	$("#f-sejarah-create [name=kondisiBangunan]").val((data.sejarah.kondisiBangunan != "" && data.sejarah.kondisiBangunan != null) ? data.sejarah.kondisiBangunan : "Baik");
	$("#f-sejarah-create [name=saranaPrasarana]").val((data.sejarah.statusSarana != "" && data.sejarah.statusSarana != null) ? data.sejarah.statusSarana : "Tidak ada");
	$("#f-sejarah-create [name=imageName]").html((data.sejarah.urlGambarStrukturKepengurusan != "") ? data.sejarah.urlGambarStrukturKepengurusan : "berkas belum diunggah...");
	$("#f-sejarah-create [name=imageUrl]").val("");
	$("#f-sejarah-create [name=bahasa]").val(data.sejarah.bahasaPengantar);
	$("#f-sejarah-create [name=sensus]").val((data.sejarah.statusSensus != "" && data.sejarah.statusSensus != null) ? data.sejarah.statusSensus : "Belum");
	$("#f-sejarah-create [name=bantuan]").val((data.sejarah.statusBantuanPemerintah != "" && data.sejarah.statusBantuanPemerintah != null) ? data.sejarah.statusBantuanPemerintah : "Belum");
	$("#f-sejarah-create [name=kondisiGeo]").val(data.sejarah.kondisiGeografis);
	$("#f-sejarah-create [name=potensi]").val(data.sejarah.potensiWilayah);
	$("#f-sejarah-create [name=jenisWilayah]").val(data.sejarah.jenisWilayah);
	$("#f-sejarah-create [name=catatan]").val(data.sejarah.catatanLain);

	if(data.sejarah.length > 0 && data.sejarah.urlGambarStrukturKepengurusan != ""){ 
		$("[browser-id=s-org]").css('display', 'block'); 
	}

	//kepengurusan
	$("#f-kepengurusan-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	$("#f-kepengurusan-create [name=penanggungJawab]").val(data.kepengurusan.penanggungJawab);
	$("#f-kepengurusan-create [name=alamat]").val(data.kepengurusan.alamat);
	$("#f-kepengurusan-create [name=rt]").val(data.kepengurusan.noRt);
	$("#f-kepengurusan-create [name=rw]").val(data.kepengurusan.noRw);
	$("#f-kepengurusan-create [name=kodeKelurahan]").val(data.kepengurusan.kodeKelurahan);
	$("#f-kepengurusan-create [name=kelurahan]").val(data.kepengurusan.namaKelurahan);
	$("#f-kepengurusan-create [name=kodeKecamatan]").val(data.kepengurusan.kodeKecamatan);
	$("#f-kepengurusan-create [name=kecamatan]").val(data.kepengurusan.namaKecamatan);
	$("#f-kepengurusan-create [name=kodeWilayah]").val(data.kepengurusan.kodeWilayah);
	$("#f-kepengurusan-create [name=wilayah]").val(data.kepengurusan.namaWilayah);
	$("#f-kepengurusan-create [name=kodeProvinsi]").val(data.kepengurusan.kodeProvinsi);
	$("#f-kepengurusan-create [name=provinsi]").val(data.kepengurusan.namaProvinsi);
	$("#f-kepengurusan-create [name=telp]").val(data.kepengurusan.noTelp);
	$("#f-kepengurusan-create [name=wargaNegara]").val((data.kepengurusan.kewarganegaraan == "" || data.kepengurusan.kewarganegaraan == null) ? 'WNI' : data.kepengurusan.kewarganegaraan);
	$("#f-kepengurusan-create [name=tempatLahir]").val(data.kepengurusan.tempatLahir);
	$("#f-kepengurusan-create [name=tanggalLahir]").val(data.kepengurusan.tempatLahir);
	$("#f-kepengurusan-create [name=jenisKelamin]").val(data.kepengurusan.jenisKelamin);
	$("#f-kepengurusan-create [name=agama]").val(data.kepengurusan.agama);
	$("#f-kepengurusan-create [name=jabatanLain]").val(data.kepengurusan.jabatanLain);
	$("#f-kepengurusan-create [name=pendidikan]").val(data.kepengurusan.pendidikan);
	$("#f-kepengurusan-create [name=kompetensi]").val(data.kepengurusan.kompetensi);
	$("#f-kepengurusan-create [name=catatan]").val(data.kepengurusan.catatan);


	//usaha
	$("#f-kegiatanUsaha-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	$("#f-kegiatanUsaha-create [name=namaUsaha]").val(data.usaha.namaUsaha);
	$("#f-kegiatanUsaha-create [name=jenisUsaha]").val(data.usaha.jenisUsaha);
	$("#f-kegiatanUsaha-create [name=jumlahPekerja]").val(data.usaha.jumlahPekerja);
	$("#f-kegiatanUsaha-create [name=detailUsaha]").val(data.usaha.detailUsaha);
	$("#f-kegiatanUsaha-create [name=catatan]").val(data.usaha.catatan);

	//visualisasi usaha 
	for(loop=0; loop<maxForm; loop++){
		if(data.vUsaha[loop] != null){
			$("#f-usaha-create-" + loop + " [name=noreg]").val(data.vUsaha[loop].noreg);
			$("#f-usaha-create-" + loop + " [name=p-id]").val(data.vUsaha[loop].idData);
			$("#f-usaha-create-" + loop + " [name=keterangan]").val(data.vUsaha[loop].deskripsi);
		
			if(data.vUsaha[loop].urlGambar != ""){ 
				$("#f-usaha-create-" + loop + " [browser-id=v-usaha" + loop + "]").css('display', 'block'); 
				$("#f-usaha-create-" + loop + " [viewer-id=v-usaha" + loop + "]").removeClass('changed').addClass('changed'); 
				$("#f-usaha-create-" + loop + " [viewer-id=v-usaha" + loop + "]").attr('src',(data.vUsaha[loop].urlGambar != "") ? 'img/usaha/'+data.vUsaha[loop].urlGambar : "img/sources/picture.png");
				$("#f-usaha-create-" + loop + " [name=imageName]").html((data.vUsaha[loop].urlGambar != "") ? data.vUsaha[loop].urlGambar : "berkas belum diunggah...");
			}
		}else{
			$("#f-usaha-create-" + loop + " [name=noreg]").val(data.kelembagaan.noRegistrasi);
		}
	}

	//bantuan
	$("#f-bantuan-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	r_f1SejarahBantuanDataGenerator(data.bantuan);

	//sarana 
	for(loop=0; loop<maxForm; loop++){
		if(data.sarana[loop] != null){
			$("#f-sarana-create-" + loop + " [name=noreg]").val(data.sarana[loop].noreg);
			$("#f-sarana-create-" + loop + " [name=p-id]").val(data.sarana[loop].idData);
			$("#f-sarana-create-" + loop + " [name=keterangan]").val(data.sarana[loop].deskripsi);
		
			if(data.sarana[loop].urlGambar != ""){ 
				$("#f-sarana-create-" + loop + " [browser-id=v-sarana" + loop + "]").css('display', 'block'); 
				$("#f-sarana-create-" + loop + " [viewer-id=v-sarana" + loop + "]").removeClass('changed').addClass('changed'); 
				$("#f-sarana-create-" + loop + " [viewer-id=v-sarana" + loop + "]").attr('src',(data.sarana[loop].urlGambar != "") ? 'img/saranaPrasarana/'+data.sarana[loop].urlGambar : "img/sources/picture.png");
				$("#f-sarana-create-" + loop + " [name=imageName]").html((data.sarana[loop].urlGambar != "") ? data.sarana[loop].urlGambar : "berkas belum diunggah...");
			}
		}else{
			$("#f-sarana-create-" + loop + " [name=noreg]").val(data.kelembagaan.noRegistrasi);
		}
	}

	//koleksi
	$("#f-koleksi-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	r_f1KoleksiDataGenerator(data.koleksi);

	//hirarki
	$("#f-hirarki-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	r_f1HirarkiDataGenerator(data.hirarki);

	//prestasi
	$("#f-prestasi-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	r_f1PrestasiDataGenerator(data.prestasi);

	//form reactor
	p_formHandler("f-kelembagaan-create" , "updateData");
	p_formHandler("f-sejarah-create" , "updateData");
	p_formHandler("f-kepengurusan-create" , "updateData");
	p_formHandler("f-kegiatanUsaha-create" , "updateData");
	for(loop=0; loop<maxForm; loop++){
		if(data.vUsaha[loop] != null){
			p_formHandler("f-usaha-create-" + loop, "updateData");
		}else{
			p_formHandler("f-usaha-create-" + loop, "addData");
		}

		if(data.sarana[loop] != null){
			p_formHandler("f-sarana-create-" + loop, "updateData");
		}else{
			p_formHandler("f-sarana-create-" + loop, "addData");
		}
	}
}


//F1 LEGALITAS
//=====================================
function r_f1legaitasGenerator(dataFecth){
	var genHtml 	= "";
	var fileChecker	= "";
	if(dataFecth != null && dataFecth.items != undefined){
		for(var loop=0; loop<dataFecth.items.length; loop++){
			
			fileChecker = (dataFecth.items[loop].urlFile != "") ? dataFecth.items[loop].urlFile : 'berkas belum diunggah...';

			genHtml = genHtml + 
			'<form id="f-legalitas-create-' + loop + '" f-group = "f1" f-target = "f120">' +
				'<div class="cards flush ">' +
					'<div class="cards-header">' +
						'<h5>' + dataFecth.items[loop].namaLegalitas + '</h5>' +
						'<div class="btn-collapse right">' +
							'<button class="clear" type="reset"' + 
								'p-label		="' + dataFecth.items[loop].namaLegalitas + '"' + 
								'p-id			="' + dataFecth.items[loop].kodePersyaratan + '"' +
								'p-referencesKey="' + dataFecth.items[loop].noRegistrasi + '"' +
								'p-group		="f1"' + 
								'p-target		="f120"' +
								'p-container	="f-legalitas-create-' + loop + '">' +
							'<span class="fa fa-refresh"></span></button>' +
							'<button class="clear" type="submit"><span class="fa fa-check-circle-o"></span></button>' +
						'</div>' + 
					'</div>' +
					'<div class="input-box">' +
						'<input name="noreg" tabindex="5" type="hidden" value="' + dataFecth.noRegistrasi + '" />' +
						'<input name="kodePersyaratan" tabindex="5" type="hidden" value="' + dataFecth.items[loop].kodePersyaratan + '" />' +
						'<input name="nomorLegalitas" placeholder="Nomor (*)" tabindex="5" type="text" value="' + dataFecth.items[loop].noLegalitas + '" />' +
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box left">' +
							'<input name="tanggalLegalitas" class="date" placeholder="Tanggal (*)" tabindex="5" type="text" value="' + dataFecth.items[loop].tanggalLegalitas + '" />' +
							'<span class="fa fa-calendar"></span>' +
						'</div>' + 
					'</div>' +
					'<div class="input-box">' +
						'<div class="icon-box both">' +
							'<label class="browser-box" id="legalitas-' + dataFecth.items[loop].kodePersyaratan + '">' +
								'<p class="placeholder" name="imageName">' + fileChecker + '</p>' +
								'<input name="imageUrl" accept="image/*" type="file" tabindex="5" />' +
								'<input browser-state="fileState" name="fileState" type="hidden" tabindex="5" value="add" />' +
							'</label>' +
							'<button type="button" browser-id="legalitas-' + dataFecth.items[loop].kodePersyaratan + '" class="browser-clear clear"><i class="fa fa-times-circle"></i></button>' +
							'<span class="left fa fa-paperclip text-purple"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</form>';
		}

		$("#legalitas-frame").html(genHtml);

		for(var loop=0; loop<dataFecth.items.length; loop++){
			p_formHandler('f-legalitas-create-' + loop,'addData');
			if(dataFecth.items[loop].urlFile != ""){ 
				$("[browser-id=legalitas-" + dataFecth.items[loop].kodePersyaratan + "]").css('display', 'block'); 
			}

			$('#f-legalitas-create-' + loop + " [type=reset]").unbind().on("click", function(e){
				e.preventDefault(); 
				showOptionConfirm('delete');
				clearPacket();
				pGroup 			= $(this).attr('p-group');
				pTarget			= $(this).attr('p-target')
				pId				= $(this).attr('p-id');
				pLabel			= $(this).attr('p-label');
				pContainer		= $(this).attr('p-container');
				pReferences		= $(this).attr('p-references');
				pReferencesKey	= $(this).attr('p-referencesKey');
				$(".option-yes").unbind().on("click", function(){ 
					if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
						hideOptionList(); 
						$("#" + pContainer + " [browser-id=legalitas-" + pId + "]").css('display', 'none'); 
						$("#" + pContainer + " [name=imageName]").html("berkas belum diunggah...");
						clearTargetFormId(pContainer, $('#' + pContainer + ' input[name="noreg"]').val(), $('#' + pContainer + ' input[name="kodePersyaratan"]').val(), "kodePersyaratan");
						clearPacket();
					}; 
				});
			});
		}

		//command reactor
		datePickerActivator();
		fileBrowserActivator();
	}
}

//F1 SEJARAH
//=====================================
function r_f1SejarahBantuanDataGenerator(data){
	var genHtml = "";
	if(data != null){ 
		//render
		for(counter = 0; counter < data.length; counter++){
			genHtml = genHtml +
			'<div id=bantuan-'+ data[counter].idData +' class="cards">' +
				'<div class="row default">' +
					'<div class="col-xs-3">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-red"><span class="fa fa-handshake-o"></span></div>' +
							'<p class="list-text">' + data[counter].tahun + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-4">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[counter].bantuanDari + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-5">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[counter].deskripsi + '</p>' +
							'<div class="list-button click-option"' + 
								'p-label		="' + data[counter].bantuanDari + '"' + 
								'p-id			="' + data[counter].idData + '"' +
								'p-referencesKey="' + data[counter].noreg + '"' +
								'p-group		="f1"' + 
								'p-target		="f121"' +
								'p-container	="bantuan-' + data[counter].idData + '">' +
								'<span class="fa fa-ellipsis-v"></span>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}
	} else {
		genHtml = genHtml +
		'<div class="cards">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}	


	$("#f-bantuan-list").append(genHtml);

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
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});
}

//F1 VERIFIKASI LEMBAGA
//=====================================
function r_f1VerifikasiLembaga(packet) {
	$("body").prepend(preload);
	$('main.parent').animate({'opacity': '0.6'},'fast','linear', function(){
		mainPage.html('');
		head  	= '';
		body  	= '';
		part	= ['',''];
		content = '';
		data 	= [{
			'lembaga': [{ 'nama': 'TEST SESSION', 'picture': 'avatar-2.jpg', 'noreg': '001', 'bentukLembaga': '-'}],
			'list': [
				{ 
					'group': 'Dokumen legalitas', 
					'items': [
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

//F1 KOLEKSI
//=====================================
function r_f1KoleksiLembaga() {
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
		body	= body + '<div id ="koleksi" class="col-md-8 col-md-offset-2">';
		
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
		$(".search-input").on("keyup", function(){ 
			r_f1KoleksiGenerator($(this).val()); 
		});
		r_navbarReactor();
	});
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

function r_f1KoleksiDataGenerator(data){
	var genHtml = "";
	if(data != null && data[0] != null){
		//render
		for(counter = 0; counter < data.length; counter++){
			genHtml = genHtml +
			'<div id=koleksi-'+ data[counter].idData +' class="cards">' +
				'<div class="row default">' +
					'<div class="col-xs-4">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-green"><span class="fa fa-book"></span></div>' +
							'<p class="list-text">' + data[counter].judulKoleksi + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-5">' +
						'<div class="list-box">' +
							'<p class="list-text">' + data[counter].deskripsi + '</p>' +
						'</div>' +
					'</div>' +
					'<div class="col-xs-3">' +
						'<div class="list-box clear">' +
							'<p class="list-text">' + data[counter].jenisKoleksi + '</p>' +
							'<div class="list-button click-option"' + 
								'p-label		="' + data[counter].judulKoleksi + '"' + 
								'p-id			="' + data[counter].idData + '"' +
								'p-referencesKey="' + data[counter].noreg + '"' +
								'p-group		="f1"' + 
								'p-target		="f118"' +
								'p-container	="koleksi-' + data[counter].idData + '">' +
								'<span class="fa fa-ellipsis-v"></span>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}
	} else { 
		genHtml = genHtml +
		'<div class="cards" id="f-koleksi-empty-list">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}	

	$("#f-koleksi-empty-list").remove();
	$("#f-koleksi-list").append(genHtml);

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
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});	
}


//F1 PRESTASI
//=====================================
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
		$(".search-input").on("keyup", function(){ 
			$("#section-prestasi").html("");
			r_f1PrestasiGenerator(p_getData('f1', 'f119', $(this).val()), "list"); 
		});

		$(".prestasi-list").unbind().on("click", function(){ r_navigateTo(12, $(this).attr("p-id")); });
		r_navbarReactor();
	});
}

function r_f1PrestasiGenerator(data, type){
	var genHtml = "";
	if(data.feedData != null){
		//render
		for(counter = 0; counter < data.feedData.length; counter++){

			if(type == "" || type == undefined || type == null){
				genHtml = genHtml +
				'<div id=prestasi'+data.feedData[counter].idData+' class="cards">' +
					'<div class="list-box">' +
						'<div class="list-icon bg-yellow"><span class="fa fa-trophy"></span></div>' +
						'<p class="list-text">'+data.feedData[counter].deskripsi+'</p>' +
						'<div id='+data.feedData[counter].idData+' class="list-remove"><span class="fa fa-trash"></span></div>' +
					'</div>' +
				'</div>';
			}else{
				genHtml = genHtml +
				'<div class=" cards prestasi-list click" p-id="' + data.feedData[counter].noreg + '">' +
					'<div class="row default">' +
						'<div class="col-xs-7">' +
							'<div class="list-box">' +
								'<div class="list-icon bg-yellow"><span class="fa fa-trophy"></span></div>' +
								'<p class="list-text"><strong>' + data.feedData[counter].deskripsi + '</strong></p>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-5">' +
							'<div class="list-box clear-small">' +
								'<p class="list-text">'+ data.feedData[counter].nama + '</p>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
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

function r_f1PrestasiDataGenerator(data){
	var genHtml = "";
	if(data != null && data[0] != null){
		//render
		for(counter = 0; counter < data.length; counter++){
			genHtml = genHtml +
			'<div id=koleksi-'+ data[counter].idData +' class="cards">' +
				'<div class="row default">' +
					'<div class="col-xs-12">' +
						'<div class="list-box">' +
							'<div class="list-icon bg-yellow"><span class="fa fa-trophy"></span></div>' +
							'<p class="list-text">' + data[counter].deskripsi + '</p>' +
							'<div class="list-button click-option"' + 
								'p-label		="' + data[counter].deskripsi + '"' + 
								'p-id			="' + data[counter].idData + '"' +
								'p-referencesKey="' + data[counter].noreg + '"' +
								'p-group		="f1"' + 
								'p-target		="f119"' +
								'p-container	="koleksi-' + data[counter].idData + '">' +
								'<span class="fa fa-ellipsis-v"></span>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="clearfix"></div>' +
				'</div>' +
			'</div>';
		}
	} else {
		genHtml = genHtml +
		'<div class="cards" id="f-prestasi-empty-list">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}	

	$("#f-prestasi-empty-list").remove();
	$("#f-prestasi-list").append(genHtml);

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
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});	
}

//F1 HIRARKI
//=====================================
function r_f1HirarkiDataGenerator(data){
	var genHtml = "";
	var genHtml_parent = "";
	var genHtml_child = "";
	if(data != null){
		//render
		for(counter = 0; counter < data.length; counter++){
			if(data[counter].hirarki == '0'){
				genHtml_parent = genHtml_parent +
				'<div id=hirarki-parent-'+ data[counter].noregTarget +' class="cards">' +
					'<div class="row default">' +
						'<div class="col-xs-12">' +
							'<div class="list-box">' +
								'<p class="list-text">' + data[counter].namaLembaga + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[counter].namaLembaga + '"' + 
									'p-id			="' + data[counter].noreg + '"' +
									'p-referencesKey="' + data[counter].noregTarget + '"' +
									'p-group		="f1"' + 
									'p-target		="f122"' +
									'p-container	="hirarki-parent-' + data[0].noregTarget + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}else{
				genHtml_child = genHtml_child +
				'<div id=hirarki-child-'+ data[counter].noregTarget +' class="cards">' +
					'<div class="row default">' +
						'<div class="col-xs-12">' +
							'<div class="list-box">' +
								'<p class="list-text">' + data[counter].namaLembaga + '</p>' +
								'<div class="list-button click-option"' + 
									'p-label		="' + data[counter].namaLembaga + '"' + 
									'p-id			="' + data[counter].noreg + '"' +
									'p-referencesKey="' + data[counter].noregTarget + '"' +
									'p-group		="f1"' + 
									'p-target		="f122"' +
									'p-container	="hirarki-child-' + data[counter].noregTarget + '">' +
									'<span class="fa fa-ellipsis-v"></span>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="clearfix"></div>' +
					'</div>' +
				'</div>';
			}
		}
	} else {
		genHtml_parent = genHtml_parent +
		'<div class="cards" id="f-hirarki-empty-list-parent">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';

		genHtml_child = genHtml_child +
		'<div class="cards" id="f-hirarki-empty-list-child">' +
			'<div class="cards-header">' +
				'<p class="fixed offset text-black">Data tidak ditemukan.</p>' +
			'</div>' +
		'</div>';
	}	

	if(genHtml_parent != "") { $("#f-hirarki-empty-list-parent").remove(); }
	if(genHtml_child != "") { $("#f-hirarki-empty-list-child").remove(); }
	
	$("#f-hirarki-list-parent").append(genHtml_parent);
	$("#f-hirarki-list-child").append(genHtml_child);

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
		$("#delete-card").unbind().on("click", function(){ 
			hideOptionList(); 
			showOptionConfirm('delete');
			$(".option-yes").unbind().on("click", function(){ 
				hideOptionList(); 
				if(p_removeData(pGroup, pTarget, pId, pReferencesKey) == 'success'){ 
					$('#' + pContainer).remove(); 
					clearPacket();
				}; 
			});
		});
	});	
}