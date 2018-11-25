import { addHttpRequestEvent } from '/js/addHttpRequestEvent.js';
import { getUrlParam } from '/js/getUrlParam.js';
import { removePackageInfo } from '/js/removePackageInfo.js';
import { drawPackageInfo, drawPackageList } from '/js/drawPackageInfo.js';
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
			addHttpRequestEvent();
		})
		.catch(function(error) {
			console.error('ошибка', error);
		})
}

addHttpRequestPromise("GET", "http://localhost:3000/api/app_packages.json")
	.then(function(result) {
		drawPackageList(result);
		if (!location.hash) {
			location.hash = `id=${result[0].id}`;
		}
	})
	.then(addHttpRequest)
	.catch(function(error) {
		console.error('ошибка', error);
	})



export { addHttpRequest, basket };