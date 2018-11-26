import { basket } from '/js/basket.js';

let modal = document.querySelector('div.js-modal'),
	yOffset;

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
	modal.classList.add('hidden');
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
	if (event.target == modal) {
		hidePopup();
		// удаляем обработчик событий
		window.removeEventListener('click', hidePopupClickAreaEvent);
	}
}

function showPopupEvent() {
	let button = document.querySelector('div.js-header-basket');
	button.addEventListener('click', function() {
		if (Object.keys(basket._packageList).length !== 0) {
			// Показываем модальное окно
			modal.classList.remove('hidden');
			// Убираем возможность скроллить body
			// Делаем страничку статичной
			addBodyProperties();
			// ОБработчик события, по клику вне Popup происходит закрытие Popup
			window.addEventListener('click', hidePopupClickAreaEvent);
			// Обработчик событий, при нажатии на Esc происходит закрытие Popup
			window.addEventListener('keydown', hidePopupEscapeEvent);

			basket.drawTable();
		}
	})
}

function moveToAnyStage(i) {
	let navItems = document.querySelectorAll('li.js-modal__steps-item');
	let steps = document.querySelectorAll('div.js-steps-stage');
	let containers = document.querySelectorAll('div.js-modal-container');
	navItems[i].classList.remove('js-modal__steps-item_disabled');
	// удаляем модификаторы у кнопок, скрываем все блоки
	for ( let j = 0; j < navItems.length; j++) {
		steps[j].classList.remove('o-steps_blue');
		steps[j].classList.remove('o-steps_green');

		containers[j].classList.add('hidden');
		// для кнопок уровнем выше добавляем класс, чтобы сделать кнопки неактивными
		if (i < j) {
			navItems[j].classList.add('js-modal__steps-item_disabled');
		}
	}
	for ( let j = 0; j <= i; j++) {
		steps[j].classList.add('o-steps_blue');
		if (j === 3) {
			steps[j].classList.add('o-steps_green');
		}
	}
	containers[i].classList.remove('hidden');
}

function moveToPaymentStageEvent() {
	let button = document.querySelector('button.js-modal__button[data-stage="1"]');
	button.addEventListener('click', function() {
		moveToAnyStage(button.dataset.stage)
	})

}

function getrandomTimeLoading(maxLoadingTime) {
	return Math.random() * maxLoadingTime * 1000;
}

function showLoading() {
	let loadingPage = document.querySelector('div.js-modal-loading__wrapper');
	loadingPage.classList.remove('hidden');
}

function hideLoading() {
	let loadingPage = document.querySelector('div.js-modal-loading__wrapper');
	loadingPage.classList.add('hidden');
}

function moveToNextStageWithLoading(maxLoadingTime) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve(moveToAnyStage);
		},getrandomTimeLoading(maxLoadingTime))
	})
}

function moveToNextStageWithLoadingEvent(buttonClass, maxLoadingTime) {
	let button = document.querySelector(buttonClass);
	button.addEventListener('click', function() {
		showLoading();
		moveToNextStageWithLoading(maxLoadingTime)
			.then(function(moveToAnyStage) {
				moveToAnyStage(button.dataset.stage);
			})
			.then(hideLoading)
			.catch(function(error) {
				console.error('ошибка:', error)
				hideLoading();
			})
	})
}

function moveToPreviousStageEvent(buttonClass) {
	let button = document.querySelector(buttonClass);
	button.addEventListener('click', function() {
		moveToAnyStage(button.dataset.stage);
	})
}

function moveToAnyPreviousStageEvent() {
	let navItems = document.querySelectorAll('li.js-modal__steps-item');
	for ( let i = 0; i < navItems.length; i++) {
		navItems[i].addEventListener('click', function() {
			if (!navItems[i].classList.contains('js-modal__steps-item_disabled')) {
				moveToAnyStage(i);
			}
		})
	}
}

export { showPopupEvent, moveToPaymentStageEvent, moveToNextStageWithLoadingEvent, moveToPreviousStageEvent, moveToAnyPreviousStageEvent };