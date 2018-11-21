import { currentPackage } from '/js/second.js';


class Basket {
	constructor() {
		this._packageList = {};
		this._sumCost = 0;
		this._count = 0;
	}

	addInLocalStorage() {
		localStorage.setItem('basket', JSON.stringify(this._packageList));
	}

	addPackageToBasket(currentPackage) {
		this._packageList[this._count] = currentPackage;
		this._sumCost += currentPackage.price;
		this._count++;
		document.querySelector('p.js-basket-sum-cost').innerHTML =`${this._sumCost} $`;
		document.querySelector('div.js-basket-count').innerHTML =this._count;
		// console.log(this._packageList);
		this.addInLocalStorage();
	}
}

let basket = new Basket();

function addPackageToBasketEvent() {
	let button = document.querySelector('button.js-app__button');
	button.addEventListener('click', function() {
		basket.addPackageToBasket(currentPackage);
	})
}

window.addEventListener("storage", function(e) {
	console.log('storage event: ', e);
	// console.log(JSON.parse(localStorage.getItem('basket')));
})


export { addPackageToBasketEvent };