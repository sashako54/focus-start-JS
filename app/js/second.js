import { addHttpRequestEvent } from '/js/addHttpRequestEvent.js';
import { getUrlParam } from '/js/getUrlParam.js';
import { removePackageInfo } from '/js/removePackageInfo.js';
import { drawPackageInfo } from '/js/drawPackageInfo.js';
import { highlightCurrentElem } from '/js/highlightCurrentElem.js';

function addHttpRequest() {
	const xhr = new XMLHttpRequest();
	let packageObj = {};
	
	xhr.open("GET", `http://localhost:3000/api/app_package_${getUrlParam('id')}.json`, true);
	
	xhr.send();
	
	xhr.onload = function(e) {
		removePackageInfo();
		packageObj = JSON.parse(xhr.responseText);
		var currentPackage = packageObj[0];
		drawPackageInfo(currentPackage);
		highlightCurrentElem();
	}
}

addHttpRequest();
addHttpRequestEvent();

export { addHttpRequest };