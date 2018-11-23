import { addHttpRequestEvent } from '/js/addHttpRequestEvent.js';
import { getUrlParam } from '/js/getUrlParam.js';
import { removePackageInfo } from '/js/removePackageInfo.js';
import { drawPackageInfo } from '/js/drawPackageInfo.js';
import { highlightCurrentElem } from '/js/highlightCurrentElem.js';
import { Basket } from '/js/basket.js';

let basket = new Basket();
basket.clearBasketEvent();
basket.drawBasketInfo();
basket.drawTable();

let packages = {};

if (JSON.parse(localStorage.getItem('basket'))) {
	packages = JSON.parse(localStorage.getItem('basket'));
	for ( let prop in packages ) {
		delete packages[prop].count;
	}
}

function addHttpRequest() {
	const xhr = new XMLHttpRequest();
	
	xhr.open("GET", `http://localhost:3000/api/app_package_${getUrlParam('id')}.json`, true);
	
	xhr.send();

	if ( packages[`${getUrlParam('id')}`] ) {
		xhr.onabort = function(e) {
			console.log('abort Request');
			removePackageInfo();
			drawPackageInfo(packages[`${getUrlParam('id')}`]);
			highlightCurrentElem();
			basket.addPackageEvent(packages);
		}
		xhr.abort();
	}
	
	xhr.onload = function(e) {
		console.log('load Request');
		removePackageInfo();
		packages[`${getUrlParam('id')}`] = JSON.parse(xhr.responseText)[0];
		drawPackageInfo(packages[`${getUrlParam('id')}`]);
		highlightCurrentElem();
		basket.addPackageEvent(packages);
	}
}

addHttpRequest();
addHttpRequestEvent();


export { addHttpRequest };