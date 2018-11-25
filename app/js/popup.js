import { basket } from '/js/catalog.js';


function toggleNotExistClass(class1, class2, j = 0) {
	let elem = document.getElementsByClassName(class1)[j];
	if (!elem.classList.contains(class2)) {
		elem.classList.toggle(class2);
	}
}

function toggleExistClass(class1, class2, j = 0) {
	let elem = document.getElementsByClassName(class1)[j];
	if (elem.classList.contains(class2)) {
		elem.classList.toggle(class2);
	}
}

let yOffset;

// задаём для body свойства

function getWidthScroll() {
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';
	div.style.visibility = 'hidden';

	document.body.appendChild(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollWidth;
}

function addBodyProperties() {
	let body = document.body;
	yOffset = window.pageYOffset;
	body.style.width = `calc(100% - ${getWidthScroll()}px)`;
	body.style.top = '-' + yOffset + 'px';
	body.style.position = 'fixed';
	body.style.overflowY = 'hidden';
}

// удаляем свойства у body

function removeBodyProperties() {
	let body = document.body;
	body.style.width = null;
	body.style.top = null;
	body.style.position = null;
	body.style.overflowY = null;
	window.scrollTo(0, yOffset);
}

function hidePopup() {
	// Скрываем модальное окно
	toggleNotExistClass('js-modal', 'hidden');
	// Возвращаем возможность скроллить body
	removeBodyProperties()
}

function hidePopupEscapeEvent(event) {
	if ( event.keyCode == 27 ) {
		hidePopup();
		window.removeEventListener('keydown', hidePopupEscapeEvent);
	}
}

function hidePopupClickAreaEvent(event) {
	let modal = document.getElementsByClassName('o-modal')[0];
	if (event.target == modal) {
		hidePopup();
		// удаляем обработчик событий
		window.removeEventListener('click', hidePopupClickAreaEvent);
	}
}

function showPopupEvent() {
	let button = document.querySelector('div.js-header-basket');
	button.addEventListener('click', function() {
		// Показываем модальное окно
		toggleExistClass('js-modal', 'hidden');
		// Убираем возможность скроллить body
		// Делаем страничку статичной
		addBodyProperties();
		// ОБработчик события, по клику вне Popup происходит закрытие Popup
		window.addEventListener('click', hidePopupClickAreaEvent);
		// Обработчик событий, при нажатии на Esc происходит закрытие Popup
		window.addEventListener('keydown', hidePopupEscapeEvent);

		basket.drawTable();
	})
}

showPopupEvent();


function setActiveClass(stepClass) {
	if (stepClass === 'js-step-4') {
		toggleNotExistClass(stepClass, 'o-steps_green');
		toggleNotExistClass('js-step-4-span', 'o-steps_green_color');
		toggleExistClass('js-modal__steps-stage-icon', 'hidden');
	} else {
		toggleNotExistClass(stepClass, 'o-steps_blue');
	}
}

function hideBlock(blockHiddenClass, i) {
	toggleNotExistClass(blockHiddenClass, 'hidden', i);
	console.log('hide' + i)
}

function showBlock(blockShowClass, i) {
	toggleExistClass(blockShowClass, 'hidden', i);
	console.log('show' + i);
}

// function moveToNextStageEvent(buttonClass, blockHiddenClass, blockShowClass, stepClass, i) {
// 	let button = document.getElementsByClassName(buttonClass)[0];
// 	button.addEventListener('click', function() {
// 		setActiveClass(stepClass);
// 		hideBlock(blockHiddenClass, i);
// 		showBlock(blockShowClass, i + 1);
// 	});
// }
function moveToPaymentStagePromise() {
	return new Promise(function(resolve, reject) {
		let button = document.querySelector('button.js-modal__button');
		button.addEventListener('click', resolve)
	})
}

// function moveToPaymentStagePromise() {
// 	return new Promise(function(resolve, reject) {
// 		let button = document.querySelector('button.js-modal__button');
// 		button.addEventListener('click', resolve)
// 	})
// }

moveToPaymentStagePromise()
	.then(function() {
		setActiveClass('js-step-2');
		hideBlock('js-modal-container', 0);
		showBlock('js-modal-container', 1);
	})


// moveToNextStageEvent('js-modal__button', 'js-modal-container', 'js-modal-container', 'js-step-2', 0);

// moveToNextStageEvent('js-modal__button-pay', 'js-modal-container', 'js-modal-container', 'js-step-3', 1);

// moveToNextStageEvent('js-modal__button-submit', 'js-modal-container', 'js-modal-container', 'js-step-4', 2);


function delActiveClass(stepClass) {
	toggleExistClass(stepClass, 'o-steps_blue');
}

function moveToPreviousStageEvent(buttonClass, blockHiddenClass, blockShowClass, stepClass, i) {
	let button = document.getElementsByClassName(buttonClass)[0];
	button.addEventListener('click', function() {
		delActiveClass(stepClass);
		hideBlock(blockHiddenClass, i + 1);
		showBlock(blockShowClass, i);
	});
}

moveToPreviousStageEvent('js-modal__button-back', 'js-modal-container', 'js-modal-container', 'js-step-2', 0);

moveToPreviousStageEvent('js-modal__button-contacts-back', 'js-modal-container', 'js-modal-container', 'js-step-3', 1);