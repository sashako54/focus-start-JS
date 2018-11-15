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
		},
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
			var package = getRandomPackage();
			var template = document.querySelector('#packageTemplate');
	
			var elemImg = template.content.querySelectorAll('a.o-main__pocket-img')[0];
			var elemTitle = template.content.querySelectorAll('h4.o-main__pocket-title')[0];
			var elemTime = template.content.querySelectorAll('time.o-main__pocket-date')[0];
	
			elemImg.style.backgroundImage = `url(${package.url}`;
			elemTitle.innerHTML = package.h;
			elemTime.innerHTML = package.time;
	
			var clone = document.importNode(template.content, true);
	
			wrapper.appendChild(clone);
		}
	}

	function addPackageRadioButtons () {
		var form = document.getElementsByClassName('o-carousel__radio-buttons')[0];

		var template = document.querySelector('#packageRadioTemplate');

		var radio = template.content.querySelectorAll('input.js-carousel-radio')[0];
		var label = template.content.querySelectorAll('label.js-carousel-label-radio')[0];
		for ( var i = 0; i < packageLength; i++) {
			radio.id = `carousel-radio-${i}`;
			label.setAttribute('for', `carousel-radio-${i}`);

			var clone = document.importNode(template.content, true);

			form.appendChild(clone);
		}
	}

	return {
		addRandomPackages: addRandomPackages,
		addPackageRadioButtons: addPackageRadioButtons,
	}
})();

randomPackages.addRandomPackages();
randomPackages.addPackageRadioButtons();


var carousel = (function() {
	var buttonLeft = document.getElementsByClassName('js-carousel-button-left')[0];
	var buttonRight = document.getElementsByClassName('js-carousel-button-right')[0];
	var wrapperPackage = document.getElementsByClassName('js-packages-carousel')[0];
	
	// добавим 2 первых элемента в конец

	wrapperPackage.appendChild(wrapperPackage.children[0].cloneNode(true));
	wrapperPackage.appendChild(wrapperPackage.children[1].cloneNode(true));
	wrapperPackage.appendChild(wrapperPackage.children[2].cloneNode(true));

	var wrapperPosition = 0;
	var maxWrapperPosition = wrapperPackage.children.length - 3;



	function moveCarouselLeft() {
		if (wrapperPosition === 0) {
			wrapperPackage.classList.add('no-transition');
			wrapperPosition = maxWrapperPosition;
			wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
		}
		--wrapperPosition;
		setTimeout(function() {
			wrapperPackage.classList.remove('no-transition');
			wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
		}, 10)
	}

	function moveCarouselRight() {
		if (wrapperPosition === maxWrapperPosition) {
			wrapperPackage.classList.add('no-transition');
			wrapperPosition = 0;
			wrapperPackage.style.transform = `translateX(0)`;
		}
		++wrapperPosition;
		setTimeout(function (){
			wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
			wrapperPackage.classList.remove('no-transition');
		}, 10)
	}

	function moveCarouselEvents() {
		buttonLeft.addEventListener('click', moveCarouselLeft);
		buttonRight.addEventListener('click', moveCarouselRight);
	}

	function moveCarouselRadioButtonsEvent() {
		var radioButtons = document.getElementsByClassName('js-carousel-radio');

		for ( let i = 0; i < radioButtons.length; i++) {
			radioButtons[i].addEventListener('click', function() {
				if ( i === 0 ) {
					wrapperPosition = maxWrapperPosition - 1;
					wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
				} else {
					wrapperPosition = i - 1;
					wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
				}
			})
		}
	}

	return {
		moveCarouselEvents: moveCarouselEvents,
		moveCarouselRadioButtonsEvent: moveCarouselRadioButtonsEvent,
	}
})()

carousel.moveCarouselEvents();
carousel.moveCarouselRadioButtonsEvent();