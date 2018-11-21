import { addHttpRequestEvent } from '/js/addHttpRequestEvent.js';
import { getUrlParam } from '/js/getUrlParam.js';
import { removePackageInfo } from '/js/removePackageInfo.js';
import { drawPackageInfo } from '/js/drawPackageInfo.js';
import { highlightCurrentElem } from '/js/highlightCurrentElem.js';
import { addPackageToBasketEvent } from '/js/basket.js';

const packages = {};
let currentPackage = {};

function addHttpRequest() {
	const xhr = new XMLHttpRequest();
	
	xhr.open("GET", `http://localhost:3000/api/app_package_${getUrlParam('id')}.json`, true);
	
	xhr.send();

	if ( packages[`${getUrlParam('id')}`] ) {
		xhr.onabort = function(e) {
			console.log('abort');
			removePackageInfo();
			currentPackage = packages[`${getUrlParam('id')}`];
			drawPackageInfo(currentPackage);
			highlightCurrentElem();
			addPackageToBasketEvent();
		}
		xhr.abort();
	}
	
	xhr.onload = function(e) {
		console.log('load');
		removePackageInfo();
		currentPackage = JSON.parse(xhr.responseText)[0];
		packages[`${getUrlParam('id')}`] = currentPackage;
		drawPackageInfo(currentPackage);
		highlightCurrentElem();
		addPackageToBasketEvent();
	}
}

addHttpRequest();
addHttpRequestEvent();


export { addHttpRequest, currentPackage };