/* UI DPLEGA JS */
$(function(){
	/* navbar fly shadow */
	$(window).on('scroll', function () {
		var elem = 'header.parent';
		var act = 'fly';
		if ($(this).scrollTop() > 30) {
			if (!$(elem).hasClass(act)) { $(elem).addClass(act); }
		} else {
			if ($(elem).hasClass(act)) { $(elem).removeClass(act); }
		}
	});

	init();
	
	var availableTags = [
      "ActionScript - Test",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags, #tags2" ).autocomplete({
      source: availableTags,
	  select: function(event, ui){
		availableTags.indexOf(ui.item);
	  }
    });
});

function init(){
	clearForm();
	//searchBoxActivator(); //style search
	//fileBrowserActivator(); //style input file
	//detailBoxActivator(); //detail card lembaga
	//optionListActivator(); //option card lembaga
	//toggleBoxActivator(); //toogle card lembaga
	//datePickerActivator(); //datepicker
}

/* time converter */
function timeSince(date) {
	var seconds = Math.floor((new Date() - date) / 1000);
	var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	if (seconds < 5){
		return "baru saja";
	}else if (seconds < 60){
		return seconds + " detik yang lalu";
	}
	else if (seconds < 3600) {
		minutes = Math.floor(seconds/60)
		if(minutes > 1)
			return minutes + " menit yang lalu";
		else
			return "1 menit yang lalu";
	}
	else if (seconds < 86400) {
		hours = Math.floor(seconds/3600)
		if(hours > 1)
			return hours + " jam yang lalu";
		else
			return "1 jam yang lalu";
	}
	//2 days and no more
	else if (seconds < 172800) {
		days = Math.floor(seconds/86400)
		if(days > 1)
			return days + " hari yang lalu";
		else
			return "1 hari yang lalu";
	}
	else{

		//return new Date(time).toLocaleDateString();
		return date.getDate().toString() + " " + months[date.getMonth()] + ", " + date.getFullYear();
	}
}

/* toggle article */
function toggle_article(index){
	var elem  = ".help-article ul li:eq(" + index + ")";
	$(elem + " p.box-collapse").slideToggle('fast', function(){
		if($(elem + " p.box-collapse").is( ":visible" )) {
			$(elem + " .btn-collapse i.fa").removeClass("fa-caret-down").addClass("fa-caret-up"); }
		else{
			$(elem + " .btn-collapse i.fa").removeClass("fa-caret-up").addClass("fa-caret-down"); }
	});
}

function scrollPage(yaxis){
	$("html, body").animate({scrollTop: + yaxis}, 1000);
}

function backToTop(){
	$("html, body").animate({scrollTop: 0}, 1000);
}

/* forms */
/* ============================================================ */
function clearForm(){
	$("* input, * select, * textarea").val('');
}

function clearTargetForm(formId){
	$("#" + formId + "* input, * select, * textarea").removeAttr('readonly');
	$("#" + formId + "* input, * select, * textarea").val('');
}


/* notification */
/* ============================================================ */

function showNotification(type, notifId, message, timerAction){
	var htmlc = '<li class="' + type + '" id="' + notifId + '"><p>' + message + '</p><span><i class="fa fa-times" notif-dismiss="' +  notifId + '"></i></span></li>';
	$("#notification-box ul").append(htmlc);
	notificationTimer(notifId, timerAction);
	$("*[notif-dismiss]").unbind().on("click", function(){ hideNotification($(this).attr("notif-dismiss")); });
}

function hideNotification(notifId){
	$("#" + notifId).animate({
		opacity: "0"
	}, "slow", function(){ $(this).remove(); });
}

function notificationTimer(notifId, timerAction){
	if(timerAction != false){
		setTimeout(function(){  
			hideNotification(notifId);
		}, 3500);
	}
}


/* search box */
/* ============================================================ */
function searchBoxActivator(){
	$("header.parent .search-button").unbind().on("click", function(){ showSearchBox(); });
	$("header.parent .search-box input").unbind().on("blur", function(){ hideSearchBox(); });
	$("header.parent .search-box .search-close").unbind().on("click", function(){ hideSearchBox("terminate"); });
}

function showSearchBox(){
	$("header.parent .title, header.parent .search-button").css("display","none");
	$("header.parent .search-box").css("display","block");
	$("header.parent .search-box input.search-input").focus();
}

function hideSearchBox(type)
{
	var keyword = $("header.parent .search-box input.search-input").val();
	if(type == "terminate" || (type == undefined && keyword == "")){
		$("header.parent .title, header.parent .search-button").css("display","inline-block");
		$("header.parent .search-box").css("display","none");
		$("header.parent .search-box input.search-input").val("");
	}
}

/* file browser */
function fileBrowserActivator(){
	$(".browser-box").unbind().on("change", function(){ fileSelected(this); });
	$(".browser-clear").unbind().on("click", function(){ fileRemove(this); });
}

function fileSelected(elem){
	var target = $(elem).attr("id");
	var value  = $("#" + target + " input").val();
	var temp   = value.split("\\");
	
	if(temp.length > 0) { value = temp[temp.length - 1]; }
	if(value == "") { value = "berkas belum diunggah..."; }
	else{
		$("button[browser-id=" + target + "]").css("display","block");
	}
	$("#" + target + " .placeholder").html(value);
}

function fileRemove(elem){
	var target = $(elem).attr("browser-id");
	var value  = $("#" + target + " input").val();
	value = "berkas dihapus...<i class='text-orange'>(belum dieksekusi)</i>";
	$("#" + target + " .placeholder").html(value);
	$("button[browser-id=" + target + "]").css("display","none");
	$('img[viewer-id=' + target + ']').removeClass("changed").attr("src", "img/sources/picture.png");
	$('input[preview-id=' + target + ']').val("");
}

/* image Preview */
function imagePreviewActivator(){
	 $(".browser-box input[type=file]").unbind().on("change", function(){ imagePreview(this, $(this).attr("preview-id")); });
}

function imagePreview(elem, targetId) {
	
	if (elem.files && elem.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('img[viewer-id=' + targetId + ']').attr('src', e.target.result);
			$('img[viewer-id=' + targetId + ']').removeClass("changed").addClass("changed");
		};

		reader.readAsDataURL(elem.files[0]);
		return false;
	}
}

/* cards detail box */
function detailBoxActivator(){
	$(".click-frame").unbind().on("click", function(){ showDetailBox($(this).parent().parent().attr("id")); });
}

function showDetailBox(elem){
	if($("#" + elem + " .detail-box").is( ":visible" )) {
		$(".detail-box").css("display","none");
		$(".desc-text").css("display","inline-block");
		$(".detail-box").parent().removeClass("zoom");
	}else{
		$(".detail-box").css("display","none");
		$(".detail-box").parent().removeClass("zoom");
		$("#" + elem).removeClass("zoom").addClass("zoom");
		$("#" + elem + " .desc-text").css("display","none");
		$("#" + elem + " .detail-box").css("display","block");
	}
}

/* cards detail box */
function toggleBoxActivator(){
	$("button.toggle-click").unbind().on("click", function(){ showToggleBox(this); });
}

function showToggleBox(elem){
	var target = $(elem).attr("toggle-target");
	if($("." + target).is( ":visible" )) {
		$(elem).html('<span class="fa fa-chevron-down"></span>');
		$("." + target).removeClass("active");
		setTimeout(function(){ $("." + target).css({"display": "none"}); } , 100);
	}else{
		$(elem).html('<span class="fa fa-chevron-up"></span>');
		$("." + target).css({"display": "block"});
		setTimeout(function(){ $("." + target).addClass("active"); }, "linear" , 100);
	}
}

/* datepicker **/
function datePickerActivator(){
	$(".date").datepicker({ dateFormat: "yy-mm-dd"});
	$("input.date").on('focus', function(){ $('html, body').css('overflow','hidden'); });
	$("input.date").on('blur', function(){ $('html, body').css('overflow','initial'); });
}

function tabActivator(){
	$('.tab-navigator').unbind().on('click', function(){ tabRouter(this); });
}

function tabRouter(elem){
	var target = $(elem).attr("tab-headIndex");
	$('.tab-navigator').removeClass('active');
	$(".tab-container").removeClass('active');
	$(elem).addClass('active');
	$("[tab-contentIndex='" + target + "']").addClass('active');
	r_tabSet(target);
}

function selectHtmlConverter(dataGrup){
	var selectHtml = "";
	for(var loop=0; loop<dataGrup.length;loop++){
		selectHtml = selectHtml +
		'<option value="' + dataGrup[loop].noreg + '">' + dataGrup[loop].caption + '</option>';
	}
	
	return selectHtml;
}

/* autocomplete */
function autoCompleteActivator(targetId, sources, sourcesDetail, targetIndex){
	 $("#" + targetId).autocomplete({
      source: sources,
	  select: function(event, ui){
		r_autoCompleteCallback(targetIndex, sources, sourcesDetail, ui, $(this).attr('id'));
		return false;
	  }
    });
}