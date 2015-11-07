// JavaScript Document

jQuery( document ).ready(function($) {

if($('table.pricing').length > 0){
	$('.dollars').before('<span class="usd">$</span>');
	tips();
	
	$('.heading').mouseenter(function(){
		var ct = $('span',this).attr('id').replace('th','');
		$('#tt'+ct).fadeIn(100);
	}).mouseleave(function(){
		$('.tip').fadeOut(100);
	});
	
	//period change
	$('#period p').on('click touchstart', function() {
		if(!$(this).hasClass('active'))
			$('input:radio',this).change();
	});
	
	$('.tip').on('click touchstart', function() {
		$(this).hide();
	});
	
	$('#period input').change(function(){
		$('#period p').removeClass('active');
		$(this).parent('p').addClass('active').children('input:radio').prop('checked',true);
		
		var which_period = $(this).attr('id');
		if(!$('table#'+which_period+'_table').is()){
			$('td#period_table table').hide();
			$('table#'+which_period+'_table').fadeIn(200);
		}
	});

} //pricing page

if($('#subnav').length > 0){
    var url = window.location.pathname, 
	urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); 
	$('#subnav a').each(function(){
		if(urlRegExp.test(this.href.replace(/\/$/,''))){
			$(this).addClass('active').closest('h3').addClass('active');
		}
	}); //active nav
	
	var next_page = '';
	var anchors = $("#subnav li a");
	var i = $("#subnav li a").index($("a.active"));
	
	if(i < anchors.length-1){
		next_page = anchors[i+1].href;
	} else {
		next_page = "/features.html";
	}
	
	$('.tldr').append('<div id="buttons"><a href="'+next_page+'" class="button green" title="Next page">Next</a><a href="https://www.formsite.com/form_app/FormSite?FormId=FormCreateLogin&LinkSource=400" class="button orange" title="Sign up now">Sign up now</a></div>');
	
	$('#feature_info .col33 a span').html(function(i, oldHtml) {
    	return oldHtml.replace(/\s+([^\s]+)$/, "&nbsp;$1");
	});
			
} //features pages

if($('#tweets').length >0){
	$('#content .col33 h2').each(function(){
		if($(this).height() > 45){
			$(this).css('margin','0');
		} else {
			$(this).css({'margin':'0','padding-top':'10px'});
		}
	});
	
	$('#tweets #lnav').addClass('disabled');
	
	var tweetarray = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
	$('#tweets').append('<ul style="width:'+tweetarray.length*600+'px;margin-left:0px;"></ul>');
	var cn = $('#tweets').height();
	for(var i=0;i<tweetarray.length;i++){
		$('#tweets ul').append('<li id="tweet'+i+'"></li>');
		var img = new Image();
		img.onload = function(){
			var tn = this.height;
			var mt = (cn-tn)/2;
			this.style.marginTop = mt+"px";
			this.alt = "Customer Tweet";
			this.title = "Our customers love us!";
		}
			img.src = '/images/tweets/customer_tweet_'+tweetarray[i]+'.png';
			document.getElementById('tweet'+i).appendChild(img);
	}

	t = 1;

rotateSwitch = function(){
    play = setInterval(function(){ //Set timer - this will repeat itself every 7 seconds
		x = '-=565';
        if ( t === tweetarray.length) { //If paging reaches the end...
            x = '0'; //go back to first
			t=0;
        }
		t++;
        tweetnav(x); //Trigger the paging and slider function
		checkNav();
    }, 5500); //Timer speed in milliseconds (7 seconds)
};

checkNav = function(){
	if(t < tweetarray.length){
		$('#rnav').removeClass('disabled');
	}else{
		$('#rnav').addClass('disabled');
	}
	if(t > 1){
		$('#lnav').removeClass('disabled');
	}else{
		$('#lnav').addClass('disabled');
	}
};

rotateSwitch(); //Run function on launch
checkNav();

//On Hover
$("#tweets").hover(function() {
    clearInterval(play); //Stop the rotation
}, function() {
    rotateSwitch(); //Resume rotation timer
});

	$('#rnav').click(function(){
	    $('#tweets ul').stop(true,true);
		if(t > 0 && t < tweetarray.length){
		  tweetnav('-=565');
		  t++;
		  checkNav();
		}	
	});
	$('#lnav').click(function(){
	    $('#tweets ul').stop(true,true);
		if(t > 1 && t < tweetarray.length+1){
		  tweetnav('+=565');
		  t--;
		  checkNav();
		}
	});
} // tweets

$('#chicago').click(function(){
	if($('img',this).hasClass('x')){
		$('img',this).attr('src','/images/Chicago_marker.gif').removeClass('x');
		$('#flag',this).hide();
	} else {
		$('img',this).attr('src','/images/Chicago.gif').addClass('x');
		$('#flag',this).slideDown(200);
	}
});

if($('.iframe-link').length > 0){
$('.iframe-link').magnificPopup({
	type:'iframe',
	markup: '<div class="mfp-iframe-scaler">'+
		  '<div class="mfp-close"></div>'+
		  '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
		  '<div class="mfp-bottom-bar">'+
			'<div class="mfp-title"></div>'+
			'<div class="mfp-counter"></div>'+
		  '</div>'+
		'</div>',
	gallery: {
      enabled: true
  	},
	callbacks: {
		open: function() {
		  var winH = 460;
		  if (document.body && document.body.offsetWidth) {
		   winH = document.body.offsetHeight;
		  }
		  if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
		   winH = document.documentElement.offsetHeight;
		  }
		  if (window.innerWidth && window.innerHeight) {
		   winH = window.innerHeight;
		  }			
		  if(winH > 700) $('.mfp-content').css('height',winH - 200);
		},
		resize: function() {
		  var winH = 460;
		  if (document.body && document.body.offsetWidth) {
		   winH = document.body.offsetHeight;
		  }
		  if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
		   winH = document.documentElement.offsetHeight;
		  }
		  if (window.innerWidth && window.innerHeight) {
		   winH = window.innerHeight;
		  }
		  if(winH > 700) $('.mfp-content').css('height',winH - 200);
		}
	}
});
}

if($('.number').length > 0){
	$('.col3 h2').each(function(){
		var fs_whyh2height = $(this).outerHeight() > 40 ? 20 : 40;
		$(this).css('line-height', fs_whyh2height + 'px');
	});
}

// responsive modifications

if($('#tweets').css('display') == 'none') { //why choose formsite renumbering
	var fs_renum = 1;
	$('.number').each(function(){
		$(this).text(fs_renum);
		fs_renum++;
	});
}
}); //ready


function tips(){
	var count = 1;
	$('.heading span').each(function(){
		var adj = 0;
		var con = $(this).attr('title');
		$(this).attr('title','').attr('id','th'+count);
		var prev = $('#more_information').html();
		$('#more_information').html(prev+'<div id="tt'+count+'" class="tip"><div class="ttar"></div><div class="ttop"></div>'+con+'<div class="tbot"></div></div>');
		
		//set tip position
		var position = $(this).parent('.heading').position();
		var tiptop = position.top - ($(this).height()/2);
		if(count < 3) adj = 5;
		$('#tt'+count).css('top',tiptop+adj).children('.ttar').css('top',($('#th'+count).height()/2)+8);
		
		count++;
	});
	
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function tweetnav(x){
	$('#tweets ul').animate({ marginLeft: x }, 400);
};