// скрипт, посвечивающий рандомные элементы сайта (1 практическое задание по JS)
var light = (function() {
	var querySelectors = document.querySelectorAll('*');

	function getRandomInteger(min, max) {
		// в выражении не добавляем 1, так как консоль ругается, когда рандомно выпадает последний элемент
		return Math.floor( min + Math.random() * (max - min));
	}

	function getRandomNumQuery() {
		elemLength = querySelectors.length;
		return getRandomInteger(0, elemLength);
	}

	function getRandomColor() {
		return `rgb(${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)})`;
	}

	function setLight() {
		var elem = querySelectors[getRandomNumQuery()];
		elem.style.boxShadow = `0 0 5px 5px ${getRandomColor()}`;
	}

	function deleteLight() {
		var elem = querySelectors[getRandomNumQuery()];
		elem.style.boxShadow = null;
	}

	function setLightInterval() {
		setInterval(setLight, 500);
	}

	function delLightInterval() {
		setInterval(deleteLight, 500);
	}

	return {
		setLightInterval: setLightInterval,
		delLightInterval: delLightInterval
	}
})();

// light.setLightInterval();
// light.delLightInterval();

var randomPackages = (function() {

	function getRandomInteger(min, max) {
		// в выражении не добавляем 1, так как консоль ругается, когда рандомно выпадает последний элемент
		return Math.floor( min + Math.random() * (max - min));
	}

	var package = [
		{
			'url':'assets/images/shot-1.jpg',
			'h': 'Стандартный пакет',
			'time':'08 апреля 2012',
		},
		{
			'url':'assets/images/shot-2.jpg',
			'h': 'Новый ЦФТ банк',
			'time':'09 сентября 2016',
		},
		{
			'url':'assets/images/shot-3.jpg',
			'h': 'Каталог разработок',
			'time':'03 марта 2015',
		}
	]

	function getRandomPackage() {
		var elem = package[getRandomInteger(0, 2)];
		return elem;
	}
	
	function addRandomPackage() {
		var package = getRandomPackage();
		var wrapper = document.getElementsByClassName('o-main__pockets')[0];
		// создаём элементы HTML
		var elemWrapper = document.createElement('div');
		var elemImg = document.createElement('a');
		var elemTitle = document.createElement('h4');
		var elemTime = document.createElement('time');
		// Добавляем стили
		elemWrapper.classList.add('o-main__pocket', 'l-grid-4');
		elemImg.classList.add('o-main__pocket-img');
		elemTitle.classList.add('o-main__pocket-title');
		elemTime.classList.add('o-main__pocket-date');
		// Добавляем содержимое
		elemImg.style.backgroundImage = `url(${package.url}`;
		elemTitle.innerHTML = package.h;
		elemTime.innerHTML = package.time;
		// содержимое добавляем внутрь обёртки
		elemWrapper.appendChild(elemImg);
		elemWrapper.appendChild(elemTitle);
		elemWrapper.appendChild(elemTime);
		// выводим на страницу
		wrapper.appendChild(elemWrapper);
	}
	return {
		addRandomPackage: addRandomPackage,
	}
})();

randomPackages.addRandomPackage();
randomPackages.addRandomPackage();
randomPackages.addRandomPackage();