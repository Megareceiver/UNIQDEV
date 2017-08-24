
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