import { getUrlParam } from '/js/getUrlParam.js';

function getPackageById(packageObj) {
	var currentPackageId = getUrlParam('id'),
		currentPackage = {};
	for ( var i = 0; i < packageObj.length; i++ ) {
		if ( packageObj[i].id == currentPackageId ) {
			currentPackage = packageObj[i];
			return currentPackage;
		}
	}
}

export { getPackageById };