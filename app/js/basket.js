import { hidePopup } from '/js/popup.js';

class Basket {
	constructor() {
		if (!JSON.parse(localStorage.getItem('basket'))) {
			this._packageList = {};
		} else {
			this._packageList = JSON.parse(localStorage.getItem('basket'));
		}
		this._sumCost = this.setSumCost();
		this._count = this.setCount();
		this._personData = {
			visa: {
				numberCard: '',
				month: '',
				year: '',
				fullName: '',
				CVV: ''
			},
			contacts: {
				surname: '',
				name: '',
				phone: '',
				email: '',
				organization: '',
				INN: '',
				city: '',
				quickInstall: '',
				consultation: ''
			}
		}
	}

	saveVisaData() {
		let inputs = document.querySelectorAll('input.js-visa-input');
		for ( let i = 0; i < inputs.length; i++ ) {
			Object.keys(this._personData.visa)[i] = inputs[i].value;
		}
		console.log(this._personData.visa);
	}

	setSumCost() {
		let sumCost = 0;
		for (let key in this._packageList) {
			sumCost += this._packageList[key].count * this._packageList[key].price;
		}
		return sumCost;
	}

	setCount() {
		let count = 0;
		for (let key in this._packageList) {
			count += this._packageList[key].count;
		}
		return count;
	}

	drawBasketInfo() {
		document.querySelector('p.js-basket-sum-cost').innerHTML = `${this._sumCost} $`;
		document.querySelector('div.js-basket-count').innerHTML = this._count;
	}

	addInLocalStorage() {
		localStorage.setItem('basket', JSON.stringify(this._packageList));
	}

	drawTable() {
		let table = document.querySelector('tbody.js-modal__table-body');
		table.innerHTML = null;
		for (let key in this._packageList) {
			this.drawStringInTable(this._packageList[key]);
		}
		// сумма заказа
		document.querySelector('span.js-modal__sum-cost-dollars').innerHTML = `$ ${this._sumCost}`;
	}

	drawStringInTable(currentPackage) {
		let table = document.querySelector('tbody.js-modal__table-body'),
			tableString = table.querySelector(`tr.js-modal__table-row[data-id="${currentPackage.id}"]`);
		if (!tableString) {
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

		// количество каждого товара в таблице
		table.querySelector(`input.js-modal__table-quantity-input[data-id="${currentPackage.id}"]`).value = currentPackage.count;
		// суммарная стоимость однотипных товаров
		table.querySelector(`td.js-modal__table-sum-cell[data-id="${currentPackage.id}"]`).innerHTML = `$ ${currentPackage.count * currentPackage.price}`;
	}

	deleteStringFromTable(currentPackage) {
		this._count -= this._packageList[currentPackage.id].count;
		this._sumCost -= this._packageList[currentPackage.id].count * this._packageList[currentPackage.id].price;
		delete this._packageList[currentPackage.id];
		
		this.drawTable();
		this.drawBasketInfo();
		this.addInLocalStorage();

		if (Object.keys(this._packageList).length === 0) {
			hidePopup();
		}
	}

	addPackage(currentPackage) {
		if ( !this._packageList[currentPackage.id] ) {
			this._packageList[currentPackage.id] = currentPackage;
			this._packageList[currentPackage.id].count = 1;
		} else {
			this._packageList[currentPackage.id].count += 1;
		}
		this._sumCost += currentPackage.price;
		this._count += 1;
		this.drawBasketInfo();
		this.addInLocalStorage();
	}

	plusPackage(currentPackage) {
		this._packageList[currentPackage.id].count += 1;
		this._sumCost += currentPackage.price;
		this._count += 1;
		this.drawTable();
		this.drawBasketInfo();
		this.addInLocalStorage();
	}

	minusPackage(currentPackage) {
		if (this._packageList[currentPackage.id].count === 0) {
			return;
		}
		this._packageList[currentPackage.id].count -= 1;
		this._sumCost -= currentPackage.price
		this._count -= 1;
		this.drawTable();
		this.drawBasketInfo();
		this.addInLocalStorage();
	}
	
	addPackageEvent(currentPackage) {
		let button = document.querySelector('button.js-app__button');
		button.addEventListener('click', () => {
			this.addPackage(currentPackage);
		})
	}
	
	plusPackageEvent(currentPackage) {
		let plusButton = document.querySelector(`svg.js-modal__table-quantity-icon-plus[data-id="${currentPackage.id}"]`);
		plusButton.addEventListener('click', () => {
			this.plusPackage(currentPackage);
		})
	}

	minusPackageEvent(currentPackage) {
		let minusButton = document.querySelector(`svg.js-modal__table-quantity-icon-minus[data-id="${currentPackage.id}"]`);
		minusButton.addEventListener('click', () => {
			this.minusPackage(currentPackage);
		})
	}

	deleteStringFromTableEvent(currentPackage) {
		let deleteButton = document.querySelector(`svg.js-modal__table-del-icon[data-id="${currentPackage.id}"]`);
		deleteButton.addEventListener('click', () => {
			this.deleteStringFromTable(currentPackage);
		})
	}

	clearBasketEvent() {
		let basketClearButton = document.querySelector('svg.js-header-basket-clear');
		basketClearButton.addEventListener('click', () => {
			this._packageList = {};
			this._sumCost = 0;
			this._count = 0;
			localStorage.removeItem('basket');
			this.drawBasketInfo();
		})
	}
}

let basket = new Basket();
basket.saveVisaData();

window.addEventListener("storage", function(e) {
	console.log('storage event: ', e);
	console.log('LocalStorage: ',JSON.parse(localStorage.getItem('basket')));
})


export { basket };