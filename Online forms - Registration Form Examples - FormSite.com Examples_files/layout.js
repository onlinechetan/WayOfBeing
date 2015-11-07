/* 
 * Refer source.
 */
if(window.location.hostname.indexOf("formsite.com") > -1) {
	var refUrl = document.referrer;
	if (document.cookie.indexOf("fs_refer_source=") < 0) {
		var exDate = new Date(); exDate.setTime(exDate.getTime() + 2592000000); // 30 days
		document.cookie = "fs_refer_source=" + encodeURIComponent(refUrl) + "; domain=.formsite.com; path=/; expires=" + exDate.toUTCString() + ";";
	}
}

/* use SVG logo if possible */
if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
	document.documentElement.className += " svg";
}

/* responsive menu */
function toggleNav() {
	var fs_primary_nav = document.getElementById('primary-nav');
	fs_primary_nav.style.display = (fs_primary_nav.style.display == 'block' ? 'none' : 'block');
}