import { getDate } from '/js/getDate.js';

let packagesNum;

function getPackagesNum(obj) {
	packagesNum = obj.length;
}

function getRandomInteger(min, max) {
	// в выражении не добавляем 1, так как консоль ругается, когда рандомно выпадает последний элемент
	return Math.floor( min + Math.random() * (max - min));
}

function getRandomPackage(obj) {
	let elem = obj.splice(getRandomInteger(0, obj.length - 1), 1)[0];
	return elem;
}

function addRandomPackages(obj) {
	let wrapper = document.getElementsByClassName('o-main__pockets')[0];
	while (obj.length != 0) {
		let randomPackage = getRandomPackage(obj),
			template = document.querySelector('#packageTemplate'),

			elemImg = template.content.querySelectorAll('a.o-main__pocket-img')[0],
			elemTitle = template.content.querySelectorAll('h4.o-main__pocket-title')[0],
			elemDate = template.content.querySelectorAll('time.o-main__pocket-date')[0];

		elemImg.style.backgroundImage = `url(${randomPackage.url}`;
		elemImg.setAttribute('href', `http://localhost:3000/packageInfo.html#id=${randomPackage.id}`);
		elemTitle.innerHTML = randomPackage.title;
		elemDate.innerHTML = getDate(randomPackage.lastUpdate);

		let clone = document.importNode(template.content, true);

		wrapper.appendChild(clone);
	}
}

function addPackageRadioButtons() {
	let form = document.querySelector('form.o-carousel__radio-buttons'),

		template = document.querySelector('#packageRadioTemplate'),

		radio = template.content.querySelectorAll('input.js-carousel-radio')[0],
		label = template.content.querySelectorAll('label.js-carousel-label-radio')[0];
	for ( let i = 0; i < packagesNum; i++) {
		radio.id = `carousel-radio-${i}`;
		label.setAttribute('for', `carousel-radio-${i}`);

		let clone = document.importNode(template.content, true);

		form.appendChild(clone);
	}
	// зададим активную радиокнопку
	form.querySelectorAll('input.js-carousel-radio')[1].checked = true;
}

export { getPackagesNum, addRandomPackages, addPackageRadioButtons };