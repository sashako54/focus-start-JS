function getUrlParam(param) {
	var fullUrl = window.location.search.substring(1);
	var paramArray = fullUrl.split('&');
	for ( var i = 0; i < paramArray.length; i++ ) {
		var currentParam = paramArray[i].split('=');
		if ( currentParam[0] == param ) {
			return currentParam[1];
		}
	}
}

export { getUrlParam };