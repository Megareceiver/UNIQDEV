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
		footPage.html(r_footPageHtml('add'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(1); });
		$("#add-button").unbind().on('click', function(){ r_navigateTo(15); });
		
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
		pId				= $(this).attr('p-id');
		pLabel			= $(this).attr('p-label');
		showOptionList(); 
		//-- popup
		$("#view-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(12, pId); });
		$("#verification-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(13, pId); });
		$("#edit-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(15, pId); });
	});

	detailBoxActivator();
}

function r_f1LembagaGenerator(data){
	var genHtml = "";
	var tempB 	= "";
	var tempP	= "";
	if(data.lembaga != null){
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
			
			for(var loopY = 0; loopY < data.lembaga[loop].list.length; loopY++){	
				genHtml = genHtml +
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
		data = p_getData('f1', 'f1111', '', packet);
		data = data.feedData;
		
		//-- set option list on a session
		if(data.option != null){
			optionBatch = data.option;
		}
		
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
					'<img src="img/avatar/' + data.profile[0].avatar + '">' +
					'<p class="caption">' +
						'<span class="big">' + data.profile[0].nama + '</span>' +
						'<span>Yayasan</span>' +
					'</p>' +
					'<button class="btn-option btn-default click-option" p-id="' + data.profile[0].noreg + '" p-label="' + data.profile[0].nama + '"><i class="fa fa-ellipsis-h"></i></button>' +
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
					part[1] = part[1] +
					'<div class="col-md-3">' +
						'<div class="tumb-cards">' +
							'<div class="picture-box">' +
								'<img class="pic-default" src="img/' + data.detail[loop].items[loopY].picture + '" />' +
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
		
		part[0] = part[0] + '</div>';
		part[1] = part[1] + '</div>';
		body	= body 	  + part[0] + part[1] + '</div></div>';
		content = '<section id="kelembagaan">' + head + body + '</section>';
		//--close
		
		//--gen
		var temp = 3;
		headPage.html(r_headPageHtml(temp, 'Profil lembaga'));
		mainPage.html(content).animate({'opacity': '1'},'fast','linear');
		$("#preload").remove();
		
		//--command reactor
		$(".back-button").unbind().on('click', function(){ r_navigateTo(r_pagePreviousReader()); });
		$(".click-option").unbind().on("click", function(){ 
			//packet session
			clearPacket();
			pId				= $(this).attr('p-id');
			pLabel			= $(this).attr('p-label');
			showOptionList(); 

			//-- popup
			$("#verification-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(13, $(this).attr('p-id')); });
			$("#edit-card").unbind().on("click", function(){ hideOptionList(); r_navigateTo(15, $(this).attr('p-id')); });
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
		sourcesData 	  = dataTemp.feedData[0];
		sourcesDetailData = dataTemp.feedDataDetail;
		
		//-- get kode bentuk lembaga for legalitas
		var bentukLembaga = r_bentukLembagaReader();
		dataLegalitas = p_getData('f1','f1114','',bentukLembaga[0]);
		dataLegalitas = dataLegalitas.feedData;

		//-- get data koleksi
		dataKoleksi = p_getData('f1', 'f117','');

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
					'<span class="fa fa-magic"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_2" name="kecamatan" placeholder="Kecamatan (*)" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode2" name="kodeKecamatan" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_3" name="wilayah" placeholder="Wilayah (*)" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode3" name="kodeWilayah" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<div class="icon-box left">' +
					'<input id="f111_lingkupArea_4" name="provinsi" placeholder="Provinsi (*)" tabindex="1" type="text" value="" readonly />' +
					'<input id="f111_lingkupArea_kode4" name="kodeProvinsi" tabindex="1" type="hidden" value="" readonly />' +
					'<span class="fa fa-repeat"></span>' +
				'</div>' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="telp" placeholder="Telp (*)" tabindex="2" type="text" value="" />' +
			'</div>' +
			'<div class="input-box">' +
				'<input name="email" placeholder="Email (*)" tabindex="2" type="text" value="" />' +
			'</div>' +
			'<div class="input-box"><p>Google Maps</p></div>' +
			'<div class="input-box">' +
				'<input name="langitude" placeholder="Langitude" tabindex="1" class="half" type="text" value="" />' +
				'<input name="latitude" placeholder="Latitude" tabindex="1" class="half" type="text" value="" />' +
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
							'<p name="v-logoName" class="placeholder">berkas belum diunggah...</p>' +
							'<input preview-id="v-logo" name="imageUrl" type="file" accept="image/*" tabindex="5" />' +
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
						'<p name="picName"></p>' +
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
					'<input name="noreg" tabindex="14" type="hidden" value="" />' +
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
		'<form id="f-hirarki-create">' +
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
				'<div class="row default">';
			
			//left
			body = body +
			'<div class="col-md-6">' +
				'<div class="select-box">' +
					'<input name="noreg" tabindex="15" type="hidden" value="" />' +
					'<select tabindex="15">' +
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
			
			body = body + '</div></div></form>';
		
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

		//form reactor
		p_formHandler("f-kelembagaan-create" , "addData");
		p_formHandler("f-sejarah-create" , "addData");
		p_formHandler("f-sarana-create" , "addData");
		p_formHandler("f-kepengurusan-create" , "addData");
		p_formHandler("f-koleksi-create" , "addData");
		p_formHandler("f-prestasi-create" , "addData");

		//generate data for editing
		//r_f1FormKelembagaanDataGenerator(packet);		
	});
}

function r_f1FormKelembagaanDataGenerator(packet){
	
	data = p_getData('f1', 'f1112', '', packet);
	data = data.feedData;

	//kelembagaan
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
	$("#f-kelembagaan-create [name=medsos]").val(data.kelembagaan.mediaSosial);
	$("#f-kelembagaan-create [name=bentukLembaga]").val(data.kelembagaan.kodeBentukLembaga);
	$("#f-kelembagaan-create [name=bidangGerak]").val(data.kelembagaan.kodeBidangGerak);
	$("#f-kelembagaan-create [name=jumlahPengurus]").val(data.kelembagaan.jumlahPengurus);
	$("#f-kelembagaan-create [name=npwp]").val(data.kelembagaan.noNpwp);
	$("#f-kelembagaan-create [name=afiliasi]").val(data.kelembagaan.noNpwp);
	$("#f-kelembagaan-create [name=visi]").val(data.kelembagaan.visiLembaga);
	$("#f-kelembagaan-create [name=misi]").val(data.kelembagaan.misiLembaga);
	$("#f-kelembagaan-create [viewer-id=v-logo]").attr('src','img/sources/'+data.kelembagaan.urlGambarLogo);
	//$("#f-kelembagaan-create [name=v-logoName]").html(data.kelembagaan.urlGambarLogo);
	$("#f-kelembagaan-create [name=catatan]").val(data.kelembagaan.catatanLain);


	//legalitas
	$(".f-legalitas-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	r_f1legaitasGenerator(data.legalitas);

	//sejarah
	$("#f-sejarah-create [name=noreg]").val(data.sejarah.noRegistrasi);
	$("#f-sejarah-create [name=sejarah]").val(data.sejarah.deskripsi);
	$("#f-sejarah-create [name=tanggalBerdiri]").val(data.sejarah.tanggalDidirikan);
	$("#f-sejarah-create [name=kepemilikan]").val(data.sejarah.kepemilikan);
	$("#f-sejarah-create [name=statusTanah]").val(data.sejarah.statusTanah);
	$("#f-sejarah-create [name=sertifikasi]").val(data.sejarah.statusSertifikasi);
	$("#f-sejarah-create [name=luasTanah]").val(data.sejarah.luasTanah);
	$("#f-sejarah-create [name=satuanT]").val(data.sejarah.satuanLuasTanah);
	$("#f-sejarah-create [name=luasBangun]").val(data.sejarah.luasBangunan);
	$("#f-sejarah-create [name=satuanB]").val(data.sejarah.satuanLuasBangunan);
	$("#f-sejarah-create [name=kondisiBangunan]").val(data.sejarah.kondisiBangunan);
	$("#f-sejarah-create [name=saranaPrasarana]").val(data.sejarah.statusSarana);
	$("#f-sejarah-create [name=picName]").html(data.sejarah.urlGambarStrukturKepengurusan);
	$("#f-sejarah-create [name=bahasa]").val(data.sejarah.bahasaPengantar);
	$("#f-sejarah-create [name=sensus]").val(data.sejarah.statusSensus);
	$("#f-sejarah-create [name=bantuan]").val(data.sejarah.statusBantuanPemerintah);
	$("#f-sejarah-create [name=kondisiGeo]").val(data.sejarah.kondisiGeografis);
	$("#f-sejarah-create [name=potensi]").val(data.sejarah.potensiWilayah);
	$("#f-sejarah-create [name=jenisWilayah]").val(data.sejarah.jenisWilayah);
	$("#f-sejarah-create [name=catatan]").val(data.sejarah.catatanLain);


	//kepengurusan
	$("#f-kepengurusan-create [name=noreg]").val(data.kepengurusan.noRegistrasi);
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
	$("#f-kepengurusan-create [name=wargaNegara]").val(data.kepengurusan.kewarganegaraan);
	$("#f-kepengurusan-create [name=tempatLahir]").val(data.kepengurusan.tempatLahir);
	$("#f-kepengurusan-create [name=tanggalLahir]").val(data.kepengurusan.tempatLahir);
	$("#f-kepengurusan-create [name=jenisKelamin]").val(data.kepengurusan.jenisKelamin);
	$("#f-kepengurusan-create [name=agama]").val(data.kepengurusan.agama);
	$("#f-kepengurusan-create [name=jabatanLain]").val(data.kepengurusan.jabatanLain);
	$("#f-kepengurusan-create [name=pendidikan]").val(data.kepengurusan.pendidikan);
	$("#f-kepengurusan-create [name=kompetensi]").val(data.kepengurusan.kompetensi);
	$("#f-kepengurusan-create [name=catatan]").val(data.kepengurusan.catatan);


	//usaha
	$("#f-kegiatanUsaha-create [name=noreg]").val(data.usaha.noRegistrasi);
	$("#f-kegiatanUsaha-create [name=namaUsaha]").val(data.usaha.namaUsaha);
	$("#f-kegiatanUsaha-create [name=jenisUsaha]").val(data.usaha.jenisUsaha);
	$("#f-kegiatanUsaha-create [name=jumlahPekerja]").val(data.usaha.jumlahPekerja);
	$("#f-kegiatanUsaha-create [name=detailUsaha]").val(data.usaha.detailUsaha);
	$("#f-kegiatanUsaha-create [name=catatan]").val(data.usaha.catatan);


	//koleksi
	$("#f-koleksi-create [name=noreg]").val(data.kelembagaan.noRegistrasi);

	//hirarki
	$("#f-hirarki-create [name=noreg]").val(data.kelembagaan.noRegistrasi);

	//prestasi
	$("#f-prestasi-create [name=noreg]").val(data.kelembagaan.noRegistrasi);
	
}

function r_f1legaitasGenerator(dataFecth){
	var genHtml 	= "";
	for(var loop=0; loop<dataFecth.items.length; loop++){
		genHtml = genHtml + 
		'<form id="f-legalitas-create-' + loop + '" f-group = "f1" f-target = "f120">' +
			'<div class="cards flush ">' +
				'<div class="cards-header">' +
					'<h5>' + dataFecth.items[loop].namaLegalitas + '</h5>' +
					'<div class="btn-collapse right">' +
						'<button class="clear" type="reset"><span class="fa fa-refresh"></span></button>' +
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
							'<p class="placeholder" name="imageName">berkas belum diunggah...</p>' +
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
	}
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