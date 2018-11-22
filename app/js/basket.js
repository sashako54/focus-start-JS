class Basket {
	constructor(packageList) {
		if (packageList === null) {
			this._packageList = {};
		} else {
			this._packageList = packageList;
		}
		this._sumCost = this.setSumCost(packageList);
		this._count = this.setCount(packageList);
	}

	setSumCost(packageList) {
		let sumCost = 0;
		for (let prop in packageList) {
			sumCost = sumCost + packageList[prop].count * packageList[prop].price;
		}
		console.log('sum cost: ', sumCost);
		return sumCost;
	}

	setCount(packageList) {
		let count = 0;
		for (let prop in packageList) {
			count = count + packageList[prop].count;
		}
		console.log('count:', count);
		return count;
	}

	drowBasketInfo() {
		document.querySelector('p.js-basket-sum-cost').innerHTML = `${this._sumCost} $`;
		document.querySelector('div.js-basket-count').innerHTML = this._count;
	}

	addInLocalStorage() {
		localStorage.setItem('basket', JSON.stringify(this._packageList));
	}

	addPackageToBasket(currentPackage) {
		if ( this._packageList[currentPackage.id] === undefined ) {
			this._packageList[currentPackage.id] = currentPackage;
			this._packageList[currentPackage.id].count = 1;
		} else {
			++this._packageList[currentPackage.id].count;
		}
		this._sumCost += currentPackage.price;
		this._count++;
		this.drowBasketInfo();
		// console.log(this._packageList);
		this.addInLocalStorage();
	}

	addPackageToBasketEvent(packages) {
		let button = document.querySelector('button.js-app__button');
		button.addEventListener('click', (e) => {
			console.log('button-id: ', button.dataset.id);
			this.addPackageToBasket(packages[button.dataset.id]);
		})
	}

	clearBasketEvent() {
		let basketClearButton = document.querySelector('svg.js-header-basket-clear');
		basketClearButton.addEventListener('click', () => {
			this._packageList = {};
			this._sumCost = 0;
			this._count = 0;
			localStorage.clear();
			this.drowBasketInfo();
		})
	}
}


window.addEventListener("storage", function(e) {
	console.log('storage event: ', e);
	console.log('LocalStorage: ',JSON.parse(localStorage.getItem('basket')));
})


export { Basket };