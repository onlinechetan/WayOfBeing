jQuery( document ).ready(function($) {
  try {
	if(testing == true){
		$('a').not('.iframe-link').not('.fresco').each(function(){
			if($(this).attr('href').indexOf('example') > -1) {
			  var href = $(this).attr('href');
			  $(this).attr('href', '/form-example'+href);	
			}
		});
	}
  } catch(e) { /* ignore */ }

// move the Examples -> Real Examples block to bottom of page in mobile view

  if($('#subnav ul').css('display') == 'none') {
	  $('#content').append('<div id="subnav2"></div>');
	  $($('#subnav').contents()).appendTo('#content #subnav2');
	  $('#subnav').attr('id','subnav1');
	  $('#subnav2').attr('id','subnav').show();
  }
  var fsorientationchanged = 'false';
  window.onorientationchange = function() { 
    if($('.fr-window').css('display') == 'none') {
    	window.location.reload();
	} else {
		fsorientationchanged = 'true';
	}
  $('.fr-ui div[class^="fr-ui"]').click(function(){
	  if(fsorientationchanged) window.location.reload();
	});
  }
  
}); //ready
var exCategories = ["registration-form-examples","survey-examples","evaluation-form-examples","order-form-examples"];
var exForms = new Array();
exForms[0] = new Array(
	"5k-10k-registration-form",
	"activity-camp-register",
	"club-signup-form",
	"conference-room-reserve",
	"conference-signup-form",
	"doctor-appointment",
	"hotel-reservation-form",
	"instructor-evaluation",
	"league-signup-form",
	"volunteer-signup-form",
	"warranty-registration"
);
exForms[1] = new Array(
	"concept-testing-survey",
	"brand-awareness-survey",
	"advertisement-evaluation",
	"sweepstakes-entry",
	"product-evaluation-form",
	"product-naming-survey",
	"product-pricing-survey",
	"tv-ad-questionnaire"
);
exForms[2] = new Array(
	"alumni-feedback-form",
	"campus-safety-survey",
	"course-evaluation-form",
	"K12-course-evaluation",
	"parent-teacher-PTA-form",
	"scholarship-application",
	"student-evaluation-form"
);
exForms[3] = new Array(
	"bed-breakfast-reserve",
	"donation-form-payments",
	"tutor-services-payment",
	"party-dj-request-payment",
	"computer-tech-services",
	"product-order-form-pay",
	"magazine-subscribe-form",
	"mail-order-apparel"
);

var output = "";
for (var i=0;i < exCategories.length;i++){
	if(document.URL.indexOf(exCategories[i]) >= 0){ 
		for (var k=0;k < exForms[i].length;k++){
			var parsed = toTitleCase(exForms[i][k].replace(/-/g," ").replace("/secure_index.html",""));
			var img = parsed.replace(/ /g,"");
			var last = (k+1)%3 == 0 ? " last" : "";
			output += '<div class="col33'+last+'"><a class="example iframe-link" href="//www.formsite.com/example/'+exForms[i][k]+'/" title="See the '+parsed+' example"><img src="/images/examples/thumbs/'+img+'.png" alt="'+parsed+'"><span>'+parsed+'</span></a></div>';
		}
	} else {
		for (var k=0;k < exForms[i].length;k++){
			var parsed = toTitleCase(exForms[i][k].replace(/-/g," "));
			output += '<a class="iframe-link mfp-hide" href="//www.formsite.com/example/'+exForms[i][k]+'/">'+parsed+'</a>';
		}
	}
}
var info_prev = $('#example_info p').html();
$('#example_info p').html(info_prev + '</p>' + output);
 
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$('.iframe-link').on('mfpOpen', function(e) {
	$.magnificPopup.instance.contentContainer.append( "<div class=\"getthisform\"><div><a class=\"mfp-prevent-close coa-button\" href=\"javascript:void(0)\" title=\"Get This Form\"><em class=\"mfp-prevent-close\">Get This Form</em></a></div></div>" );
	setGetThisFormLink($("div.getthisform").get());
});

$.magnificPopup.instance.next = function() {
	$.magnificPopup.proto.next.call(this);
	var link = $("div.getthisform").get();
	link[0].style.display='block';
	setGetThisFormLink(link);
	$(window).resize();
};
$.magnificPopup.instance.prev = function() {
	$.magnificPopup.proto.prev.call(this);
	var link = $("div.getthisform").get();
	link[0].style.display='block';
	setGetThisFormLink(link);
	$(window).resize();
};

function showGetThisForm(url) {
	var iframe = $("iframe.mfp-iframe").get();
	iframe[0].src = url;
	var ct = $("div.getthisform").get();
	ct[0].style.display='none';
	
	var content = $.magnificPopup.instance.contentContainer;
	content[0].style.height = 'auto';
}

function setGetThisFormLink(link) {
	var currItem = $.magnificPopup.instance.currItem;
	var formName = currItem.el[0].textContent;
	if(!formName) {
		formName = currItem.el[0].innerText;
	}
	var url = "/form_app/FormSite?FormId=LoadGetThisForm&FormName=" + encodeURIComponent(formName) + "&TemplatePath=" + encodeURIComponent(currItem.el[0].pathname);
	$(link).on('click', '*', function(){ showGetThisForm(url) });
}