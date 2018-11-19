var packagesNum;

function getPackagesNum(obj) {
	packagesNum = obj.length;
}

function getRandomInteger(min, max) {
	// в выражении не добавляем 1, так как консоль ругается, когда рандомно выпадает последний элемент
	return Math.floor( min + Math.random() * (max - min));
}

function getDate(objDate) {
	var date = objDate * 1000;
	var formatter = new Intl.DateTimeFormat("ru", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	return formatter.format(date);
}

function getRandomPackage(obj) {
	var elem = obj.splice(getRandomInteger(0, obj.length - 1), 1)[0];
	return elem;
}

function addRandomPackages(obj) {
	var wrapper = document.getElementsByClassName('o-main__pockets')[0];
	while (obj.length != 0) {
		var randomPackage = getRandomPackage(obj);
		var template = document.querySelector('#packageTemplate');

		var elemImg = template.content.querySelectorAll('a.o-main__pocket-img')[0];
		var elemTitle = template.content.querySelectorAll('h4.o-main__pocket-title')[0];
		var elemDate = template.content.querySelectorAll('time.o-main__pocket-date')[0];

		elemImg.style.backgroundImage = `url(${randomPackage.url}`;
		elemImg.setAttribute('href', `http://localhost:3000/packageInfo.html?id=${randomPackage.id}`);
		elemTitle.innerHTML = randomPackage.title;
		elemDate.innerHTML = getDate(randomPackage.lastUpdate);

		var clone = document.importNode(template.content, true);

		wrapper.appendChild(clone);
	}
}

function addPackageRadioButtons() {
	var form = document.getElementsByClassName('o-carousel__radio-buttons')[0];

	var template = document.querySelector('#packageRadioTemplate');

	var radio = template.content.querySelectorAll('input.js-carousel-radio')[0];
	var label = template.content.querySelectorAll('label.js-carousel-label-radio')[0];
	for ( let i = 0; i < packagesNum; i++) {
		radio.id = `carousel-radio-${i}`;
		label.setAttribute('for', `carousel-radio-${i}`);

		var clone = document.importNode(template.content, true);

		form.appendChild(clone);
	}
	// зададим активную радиокнопку
	document.getElementsByClassName('js-carousel-radio')[1].checked = true;
}

export { getPackagesNum, addRandomPackages, addPackageRadioButtons };