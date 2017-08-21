/* navigation function by syncard */
/* initial condition */
/* =============================================================================================== */
var x = 0;
function syncnavReactor(){
	$("*[syncnav-target]").unbind().on("click", function(){ showNav(this); });
	$("*[syncnav-dismiss]").unbind().on("click", function(){ hideNav(this); });

	/* logout */
	$("*[syncnav-logout]").unbind().on("click", function(){ showConfirm(this); });
};

function syncnavClose(){
	$("#option.syncnav .frame-dismiss").trigger("click");
}

function clearGround(target){
	$(target + " #navigation, " + target + " #logout-confirm").css("display","none");
}

function showNav(elem){
	var target = $(elem).attr("syncnav-target");
	$("html, body").css("overflow","hidden");
	$(target).css("display","block");
	$(target).animate({backgroundColor:"rgba(0,0,0,0.5)"}, 100, 'linear');
	$(target + " .frame").animate({left:"0"}, 200, 'swing');
}

function hideNav(elem){
	var target = $(elem).attr("syncnav-dismiss");
	$(target + " .frame").animate({left:"-100%"}, 200, 'swing', function(){ $(target).css("display","none"); $("html, body").css("overflow","initial"); });
}

/* logout */
/* ======================================================= */

function showConfirm(elem){
	var target = $(elem).attr("syncnav-logout");
	
	clearGround(target);
	
	$("html, body").css("overflow","hidden");
	
	$(target).css("display","block");
	$(target + " #logout-confirm").css("display","block");
	$(target + " .frame").css("top","-1000px");
	
	$(target).animate({opacity:"1"}, "slow");
	$(target + " .frame").animate({top:"0"}, "fast")
}