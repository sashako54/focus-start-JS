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

export { showPopupEvent, hidePopup };