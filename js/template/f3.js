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
				'<div class="cards ' + tempP + ' toggle-content ' + data.id + '-group">' +
					'<div class="list-box clear">' +
						'<p class="list-text ' + data.access[loopY].type + '">' + data.access[loopY].label + '</p>' +
						'<div class="switch-box clear fixed-position right">' +
							'<input id="' + data.access[loopY].id + '" type="checkbox" ' + tempR + ' />' +
							'<label for="' + data.access[loopY].id + '"></label>' +
						'</div>' +
					'</div>' +
				'</div>';
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
		searchBoxActivator();
		toggleBoxActivator();
		r_navbarReactor();
	});
}