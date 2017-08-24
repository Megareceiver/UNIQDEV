
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

