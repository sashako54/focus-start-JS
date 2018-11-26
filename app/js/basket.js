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
				quickInstall: true,
				consultation: false
			}
		}
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

	moveToAnyStage(i) {
		let navItems = document.querySelectorAll('li.js-modal__steps-item');
		let steps = document.querySelectorAll('div.js-steps-stage');
		let containers = document.querySelectorAll('div.js-modal-container');
		navItems[i].classList.remove('js-modal__steps-item_disabled');
		// удаляем модификаторы у кнопок, скрываем все блоки
		for ( let j = 0; j < navItems.length; j++) {
			steps[j].classList.remove('o-steps_blue');
			steps[j].classList.remove('o-steps_green');
	
			containers[j].classList.add('hidden');
		}
		for ( let j = 0; j <= i; j++) {
			steps[j].classList.add('o-steps_blue');
			if (j === 3) {
				steps[j].classList.add('o-steps_green');
			}
		}
		containers[i].classList.remove('hidden');
	}
	
	moveToPaymentStageEvent() {
		let button = document.querySelector('button.js-modal__button[data-stage="1"]');
		button.addEventListener('click', () => {
			this.moveToAnyStage(button.dataset.stage)
		})
	
	}
	
	getrandomTimeLoading(maxLoadingTime) {
		return Math.random() * maxLoadingTime * 1000;
	}
	
	showLoading() {
		let loadingPage = document.querySelector('div.js-modal-loading__wrapper');
		loadingPage.classList.remove('hidden');
	}
	
	hideLoading() {
		let loadingPage = document.querySelector('div.js-modal-loading__wrapper');
		loadingPage.classList.add('hidden');
	}
	
	moveToNextStageWithLoading(maxLoadingTime) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.moveToAnyStage);
			},this.getrandomTimeLoading(maxLoadingTime))
		})
	}
	
	moveToNextStageWithLoadingEvent(buttonClass, maxLoadingTime) {
		let button = document.querySelector(buttonClass);
		button.addEventListener('click', () => {
			this.showLoading();
			this.moveToNextStageWithLoading(maxLoadingTime)
				.then((moveToAnyStage) => {
					moveToAnyStage(button.dataset.stage);
				})
				.then(this.hideLoading)
				.catch((error) => {
					console.error('ошибка:', error)
					this.hideLoading();
				})
		})
	}
	
	moveToPreviousStageEvent(buttonClass) {
		let button = document.querySelector(buttonClass);
		button.addEventListener('click', () => {
			this.moveToAnyStage(button.dataset.stage);
		})
	}
	
	moveToAnyPreviousStageEvent() {
		let navItems = document.querySelectorAll('li.js-modal__steps-item');
		for ( let i = 0; i < navItems.length; i++) {
			navItems[i].addEventListener('click', () => {
				if (!navItems[i].classList.contains('js-modal__steps-item_disabled')) {
					this.moveToAnyStage(i);
				}
			})
		}
	}

	saveVisaData() {
		let inputs = document.querySelectorAll('input.js-visa-input');
		let arrPersonData = [];
		for ( let i = 0; i < inputs.length; i++ ) {
			arrPersonData[i] = inputs[i].value;
		}
		for ( let key in this._personData.visa ) {
			this._personData.visa[key] = arrPersonData.splice(0, 1)[0];
		}
		console.log('visa:',this._personData.visa);
	}

	saveVisaDataEvent() {
		let button = document.querySelector('button.js-modal__button-pay');
		button.addEventListener('click', () => {
			this.saveVisaData();
		})
	}

	setVisaData() {
		let inputs = document.querySelectorAll('input.js-visa-input');
		let arrPersonData = [];
		for ( let key in this._personData.visa ) {
			arrPersonData.push(this._personData.visa[key])
		}
		for ( let i = 0; i < inputs.length; i++ ) {
			inputs[i].value = arrPersonData[i];
		}
		console.log('arrayVisa:', arrPersonData);
	}

	setVisaDataEvent() {
		let button1 = document.querySelector('li.js-modal__steps-item[data-stage="1"]');
		let button2 = document.querySelector('button.js-modal__button-contacts-back[data-stage="1"]');
		button1.addEventListener('click', () => {
			if (!button1.classList.contains('js-modal__steps-item_disabled')) {
				this.setVisaData();
			}
		})
		button2.addEventListener('click', () => {
			this.setVisaData();
		})
	}

	saveContactData() {
		let inputs = document.querySelectorAll('input.js-contacts-input');
		let radioQuickInstall = document.querySelector('#radio-fast-install');
		let toggleConsultation = document.querySelector('#toggle-consultation');
		let arrContactsData = [];
		for ( let i = 0; i < inputs.length; i++ ) {
			arrContactsData[i] = inputs[i].value;
		}
		for ( let key in this._personData.contacts ) {
			if (arrContactsData.length !== 0) {
				this._personData.contacts[key] = arrContactsData.splice(0, 1)[0];
			}
		}
		radioQuickInstall.checked ? this._personData.contacts.quickInstall = true : this._personData.contacts.quickInstall = false;
		toggleConsultation.checked ? this._personData.contacts.consultation = true : this._personData.contacts.consultation = false;
		console.log('contacts:',this._personData.contacts);
	}

	saveContactDataEvent() {
		let button = document.querySelector('button.js-modal__button-submit');
		button.addEventListener('click', () => {
			this.saveContactData();
		})
	}

	setContactData() {
		let inputs = document.querySelectorAll('input.js-contacts-input');
		let radioQuickInstall = document.querySelector('#radio-fast-install');
		let radioDeferredInstall = document.querySelector('#radio-deferred-install');
		let toggleConsultation = document.querySelector('#toggle-consultation');
		let arrContactsData = [];
		for ( let key in this._personData.contacts ) {
			arrContactsData.push(this._personData.contacts[key]);
		}
		for ( let i = 0; i < inputs.length; i++ ) {
			inputs[i].value = arrContactsData[i];
		}
		radioQuickInstall.checked = this._personData.contacts.quickInstall;
		radioDeferredInstall.checked = !this._personData.contacts.quickInstall;
		toggleConsultation.checked = this._personData.contacts.consultation;
		console.log('arrayContacts:', arrContactsData);
	}

	setContactDataEvent() {
		let button = document.querySelector('li.js-modal__steps-item[data-stage="2"]');
		button.addEventListener('click', () => {
			if (!button.classList.contains('js-modal__steps-item_disabled')) {
				this.setContactData();
			}
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

window.addEventListener("storage", function(e) {
	console.log('storage event: ', e);
	console.log('LocalStorage: ',JSON.parse(localStorage.getItem('basket')));
})


export { basket };