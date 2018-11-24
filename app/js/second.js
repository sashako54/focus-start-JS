import { addHttpRequestEvent } from '/js/addHttpRequestEvent.js';
import { getUrlParam } from '/js/getUrlParam.js';
import { removePackageInfo } from '/js/removePackageInfo.js';
import { drawPackageInfo } from '/js/drawPackageInfo.js';
import { highlightCurrentElem } from '/js/highlightCurrentElem.js';
import { Basket } from '/js/basket.js';
import { addHttpRequestPromise } from '/js/addHttpRequest.js';

let basket = new Basket();
basket.clearBasketEvent();
basket.drawBasketInfo();
basket.drawTable();

function addHttpRequest() {
	addHttpRequestPromise("GET", `http://localhost:3000/api/app_package_${getUrlParam('id')}.json`)
		.then(function(result) {
			removePackageInfo();
			drawPackageInfo(result[0]);
			highlightCurrentElem();
			basket.addPackageEvent(result[0]);
		})
		.catch(function(error) {
			console.error('ошибка', error);
		})
}
addHttpRequest();
addHttpRequestEvent();

export { addHttpRequest };