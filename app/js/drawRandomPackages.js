function getRandomInteger(min, max) {
	// в выражении не добавляем 1, так как консоль ругается, когда рандомно выпадает последний элемент
	return Math.floor( min + Math.random() * (max - min));
}

var packageObj = [
	{
		'url':'assets/images/shot-1.jpg',
		'title': 'Стандартный пакет',
		'date':'08 апреля 2012',
	},
	{
		'url':'assets/images/shot-2.jpg',
		'title': 'Новый ЦФТ банк',
		'date':'09 сентября 2016',
	},
	{
		'url':'assets/images/shot-3.jpg',
		'title': 'Каталог разработок',
		'date':'03 марта 2015',
	},
	{
		'url':'assets/images/shot-1.jpg',
		'title': 'Стандартный пакет',
		'date':'08 апреля 2012',
	},
	{
		'url':'assets/images/shot-2.jpg',
		'title': 'Новый ЦФТ банк',
		'date':'09 сентября 2016',
	},
	{
		'url':'assets/images/shot-3.jpg',
		'title': 'Каталог разработок',
		'date':'03 марта 2015',
	},
];

var packageLength = packageObj.length;

function getRandomPackage() {
	var elem = packageObj.splice(getRandomInteger(0, packageObj.length - 1), 1)[0];
	return elem;
}

function addRandomPackages() {
	var wrapper = document.getElementsByClassName('o-main__pockets')[0];
	while (Object.keys(packageObj).length != 0) {
		var randomPackage = getRandomPackage();
		var template = document.querySelector('#packageTemplate');

		var elemImg = template.content.querySelectorAll('a.o-main__pocket-img')[0];
		var elemTitle = template.content.querySelectorAll('h4.o-main__pocket-title')[0];
		var elemDate = template.content.querySelectorAll('time.o-main__pocket-date')[0];

		elemImg.style.backgroundImage = `url(${randomPackage.url}`;
		elemTitle.innerHTML = randomPackage.title;
		elemDate.innerHTML = randomPackage.date;

		var clone = document.importNode(template.content, true);

		wrapper.appendChild(clone);
	}
}

function addPackageRadioButtons () {
	var form = document.getElementsByClassName('o-carousel__radio-buttons')[0];

	var template = document.querySelector('#packageRadioTemplate');

	var radio = template.content.querySelectorAll('input.js-carousel-radio')[0];
	var label = template.content.querySelectorAll('label.js-carousel-label-radio')[0];
	for ( let i = 0; i < packageLength; i++) {
		radio.id = `carousel-radio-${i}`;
		label.setAttribute('for', `carousel-radio-${i}`);

		var clone = document.importNode(template.content, true);

		form.appendChild(clone);
	}
	// зададим активную радиокнопку
	document.getElementsByClassName('js-carousel-radio')[1].checked = true;
}

addRandomPackages();
addPackageRadioButtons();