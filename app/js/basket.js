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

	drawBasketInfo() {
		document.querySelector('p.js-basket-sum-cost').innerHTML = `${this._sumCost} $`;
		document.querySelector('div.js-basket-count').innerHTML = this._count;
	}

	addInLocalStorage() {
		localStorage.setItem('basket', JSON.stringify(this._packageList));
	}

	drawStringInTable(currentPackage) {
		let wrapper = document.querySelector('tbody.js-modal__table-body');
		let wrapperChild = wrapper.querySelector(`tr[data-id="${currentPackage.id}"]`);
		if (!wrapperChild) {
			currentPackage.count = 1;
			console.log('Добавляем строку');
			let template = document.querySelector('#templateTableString'),
	
				string = template.content.querySelector('tr.js-modal__table-row'),
				img = template.content.querySelector('div.js-modal__table-img'),
				name = template.content.querySelector('h4.js-modal__table-name'),
				price = template.content.querySelector('td.js-modal__table-cost'),
				minusButton = template.content.querySelector('svg.js-modal__table-quantity-icon-minus'),
				plusButton = template.content.querySelector('svg.js-modal__table-quantity-icon-plus'),
				checkInput = template.content.querySelector('input.js-modal__table-input'),
				checkLabel = template.content.querySelector('label.js-modal__table-label');
	
			// string.classList.add(`js-table-row-id-${currentPackage.id}`);
			string.setAttribute('data-id', currentPackage.id);
			img.style.backgroundImage = `url(${currentPackage.url})`;
			name.innerHTML = currentPackage.title;
			price.innerHTML = `$ ${currentPackage.price}`;
			minusButton.setAttribute('data-id', currentPackage.id);
			plusButton.setAttribute('data-id', currentPackage.id);
			checkInput.setAttribute('id', `install-${currentPackage.id}`);
			checkLabel.setAttribute('for', `install-${currentPackage.id}`);
	
			let clone = document.importNode(template.content, true);
	
			wrapper.appendChild(clone);
		}
		console.log('повышаем count');
		// currentPackage.count = currentPackage.count + 1;
		console.log('count', currentPackage.count)
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
		this.drawBasketInfo();
		// console.log(this._packageList);
		this.addInLocalStorage();
		this.drawStringInTable(currentPackage);
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
			this.drawBasketInfo();
		})
	}
}


window.addEventListener("storage", function(e) {
	console.log('storage event: ', e);
	console.log('LocalStorage: ',JSON.parse(localStorage.getItem('basket')));
})


export { Basket };