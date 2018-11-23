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
		document.querySelector('span.js-modal__sum-cost-dollars').innerHTML = `$ ${this._sumCost}`;
	}

	addInLocalStorage() {
		localStorage.setItem('basket', JSON.stringify(this._packageList));
	}

	drawTable(packages) {
		for (let prop in packages) {
			this.drawStringInTable(packages[prop]);
		}
	}

	drawStringInTable(currentPackage) {
		let table = document.querySelector('tbody.js-modal__table-body'),
			tableString = table.querySelector(`tr.js-modal__table-row[data-id="${currentPackage.id}"]`);
		if (!tableString) {
			console.log('Добавляем строку');
			let template = document.querySelector('#templateTableString'),
	
				string = template.content.querySelector('tr.js-modal__table-row'),
				img = template.content.querySelector('div.js-modal__table-img'),
				name = template.content.querySelector('h4.js-modal__table-name'),
				price = template.content.querySelector('td.js-modal__table-cost'),
				sumCost = template.content.querySelector('td.js-modal__table-sum-cell'),
				minusButton = template.content.querySelector('svg.js-modal__table-quantity-icon-minus'),
				plusButton = template.content.querySelector('svg.js-modal__table-quantity-icon-plus'),
				checkInput = template.content.querySelector('input.js-modal__table-input'),
				checkLabel = template.content.querySelector('label.js-modal__table-label'),
				countInput = template.content.querySelector('input.js-modal__table-quantity-input'),
				deleteButton = template.content.querySelector('svg.js-modal__table-del-icon');

			string.setAttribute('data-id', currentPackage.id);
			img.style.backgroundImage = `url(${currentPackage.url})`;
			name.innerHTML = currentPackage.title;
			price.innerHTML = `$ ${currentPackage.price}`;
			sumCost.setAttribute('data-id', currentPackage.id);
			minusButton.setAttribute('data-id', currentPackage.id);
			plusButton.setAttribute('data-id', currentPackage.id);
			checkInput.setAttribute('id', `install-${currentPackage.id}`);
			checkLabel.setAttribute('for', `install-${currentPackage.id}`);
			countInput.setAttribute('data-id', currentPackage.id);
			deleteButton.setAttribute('data-id', currentPackage.id);

			let clone = document.importNode(template.content, true);
	
			table.appendChild(clone);

			this.plusPackageEvent(currentPackage);
			this.minusPackageEvent(currentPackage);
			this.deleteStringFromTableEvent(currentPackage);
		}
		console.log('ownCount', currentPackage.count)

		// количество каждого товара в таблице
		table.querySelector(`input.js-modal__table-quantity-input[data-id="${currentPackage.id}"]`).value = currentPackage.count;
		// суммарная стоимость однотипных товаров
		table.querySelector(`td.js-modal__table-sum-cell[data-id="${currentPackage.id}"]`).innerHTML = `$ ${currentPackage.count * currentPackage.price}`;
	}

	deleteStringFromTable(currentPackage) {
		let tableString = document.querySelector(`tr.js-modal__table-row[data-id="${currentPackage.id}"]`);
		
		this._count -= this._packageList[currentPackage.id].count;
		this._sumCost -= this._packageList[currentPackage.id].count * this._packageList[currentPackage.id].price;
		
		tableString.remove();
		delete this._packageList[currentPackage.id];
		this.drawBasketInfo();
		this.addInLocalStorage();
	}

	addPackageToBasket(currentPackage) {
		if ( this._packageList[currentPackage.id] === undefined ) {
			this._packageList[currentPackage.id] = currentPackage;
			this._packageList[currentPackage.id].count = 1;
		} else {
			++this._packageList[currentPackage.id].count;
		}
		this._sumCost += currentPackage.price;
		++this._count;
		this.drawBasketInfo();
		// console.log(this._packageList);
		this.addInLocalStorage();
		this.drawStringInTable(this._packageList[currentPackage.id]);
	}

	removePackageFromBasket(currentPackage) {
		if (this._packageList[currentPackage.id].count === 0) {
			return;
		}
		--this._packageList[currentPackage.id].count;
		this._sumCost -= currentPackage.price
		--this._count;
		this.drawBasketInfo();
		this.addInLocalStorage();
		this.drawStringInTable(this._packageList[currentPackage.id]);
	}
	
	addPackageToBasketEvent(packages) {
		let button = document.querySelector('button.js-app__button');
		button.addEventListener('click', () => {
			console.log('button-id: ', button.dataset.id);
			this.addPackageToBasket(packages[button.dataset.id]);
		})
	}
	
	plusPackageEvent(currentPackage) {
		let plusButton = document.querySelector(`svg.js-modal__table-quantity-icon-plus[data-id="${currentPackage.id}"]`);
		plusButton.addEventListener('click', () => {
			this.addPackageToBasket(currentPackage);
		})
	}

	minusPackageEvent(currentPackage) {
		let minusButton = document.querySelector(`svg.js-modal__table-quantity-icon-minus[data-id="${currentPackage.id}"]`);
		minusButton.addEventListener('click', () => {
			this.removePackageFromBasket(currentPackage);
		})
	}

	deleteStringFromTableEvent(currentPackage) {
		let deleteButton = document.querySelector(`svg.js-modal__table-del-icon[data-id="${currentPackage.id}"]`);
		deleteButton.addEventListener('click', () => {
			this.deleteStringFromTable(currentPackage);
		})
	}

	clearBasketEvent() {
		let basketClearButton = document.querySelector('svg.js-header-basket-clear'),
			table = document.querySelector('tbody.js-modal__table-body'),
			sumCost = document.querySelector('span.js-modal__sum-cost-dollars');
		basketClearButton.addEventListener('click', () => {
			this._packageList = {};
			this._sumCost = 0;
			this._count = 0;
			localStorage.clear();
			this.drawBasketInfo();
			table.innerHTML = null;
			sumCost.innerHTML = '$ 0';
		})
	}
}


window.addEventListener("storage", function(e) {
	console.log('storage event: ', e);
	console.log('LocalStorage: ',JSON.parse(localStorage.getItem('basket')));
})


export { Basket };