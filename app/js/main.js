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

	var packageObj = [
		{
			'name': 'package-1',
			'url':'assets/images/shot-1.jpg',
			'h': 'Стандартный пакет',
			'time':'08 апреля 2012',
		},
		{
			'name': 'package-2',
			'url':'assets/images/shot-2.jpg',
			'h': 'Новый ЦФТ банк',
			'time':'09 сентября 2016',
		},
		{
			'name': 'package-3',
			'url':'assets/images/shot-3.jpg',
			'h': 'Каталог разработок',
			'time':'03 марта 2015',
		},
		{
			'name': 'package-4',
			'url':'assets/images/shot-1.jpg',
			'h': 'Стандартный пакет',
			'time':'08 апреля 2012',
		},
		{
			'name': 'package-5',
			'url':'assets/images/shot-2.jpg',
			'h': 'Новый ЦФТ банк',
			'time':'09 сентября 2016',
		},
		{
			'name': 'package-6',
			'url':'assets/images/shot-3.jpg',
			'h': 'Каталог разработок',
			'time':'03 марта 2015',
		},
	];

	function getRandomPackage() {
		var elem = packageObj.splice(getRandomInteger(0, packageObj.length - 1), 1)[0];
		return elem;
	}
	
	function addRandomPackages() {
		var wrapper = document.getElementsByClassName('o-main__pockets')[0];
		while (Object.keys(packageObj).length != 0) {
			var package = getRandomPackage();
			var template = document.querySelector('#packageTemplate');
	
			var wrapperPackage = template.content.getElementsByClassName('o-main__pocket')[0];
			var elemImg = template.content.querySelectorAll('a.o-main__pocket-img')[0];
			var elemTitle = template.content.querySelectorAll('h4.o-main__pocket-title')[0];
			var elemTime = template.content.querySelectorAll('time.o-main__pocket-date')[0];
	
			wrapperPackage.setAttribute(data-name, 'hello');
			elemImg.style.backgroundImage = `url(${package.url}`;
			elemTitle.innerHTML = package.h;
			elemTime.innerHTML = package.time;
	
			var clone = document.importNode(template.content, true);
	
			wrapper.appendChild(clone);
		}
	}

	return {
		addRandomPackages: addRandomPackages,
	}
})();

randomPackages.addRandomPackages();


var slider = (function() {
	var buttonLeft = document.getElementsByClassName('js-slider-button-left')[0];
	var buttonRight = document.getElementsByClassName('js-slider-button-right')[0];
	
	function moveCarouselLeft() {
		var elem = document.getElementsByClassName('js-packages-carousel')[0];
		// добавляем в конец первый элемент
		console.log(elem.children[0].dataset)
		elem.appendChild(elem.children[0]);
	}

	function moveCarouselRight() {
		var elem = document.getElementsByClassName('js-packages-carousel')[0];
		// добавляем в начало последний элемент
		elem.insertBefore(elem.children[elem.children.length - 1], elem.children[0]);
	}

	buttonLeft.addEventListener('click', moveCarouselLeft);
	buttonRight.addEventListener('click', moveCarouselRight);
})()