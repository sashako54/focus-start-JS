function getUrlParam(param) {
	let fullUrl = window.location.hash.substring(1);
	let paramArray = fullUrl.split('&');
	for ( let i = 0; i < paramArray.length; i++ ) {
		let currentParam = paramArray[i].split('=');
		if ( currentParam[0] == param ) {
			return currentParam[1];
		}
	}
}

export { getUrlParam };