import { currentPackage } from '/js/second.js';


class Basket {
	constructor() {
		this._sumCost = 0;
		this._count = 0;
	}

	addPackageToBasket(currentPackage) {
		this._sumCost += currentPackage.price;
		this._count++;
		document.querySelector('p.js-basket-sum-cost').innerHTML =`${this._sumCost} $`;
		document.querySelector('div.js-basket-count').innerHTML =this._count;
	}
}

let basket = new Basket();

function addPackageToBasketEvent() {
	let button = document.querySelector('button.js-app__button');
	button.addEventListener('click', function() {
		basket.addPackageToBasket(currentPackage);
	})
}


export { addPackageToBasketEvent };