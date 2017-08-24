
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

