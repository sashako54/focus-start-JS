
var main = (function() {
	function toggleNotExistClass(class1, class2, j = 0) {
		var elem = document.getElementsByClassName(class1)[j];
		if (!elem.classList.contains(class2)) {
			elem.classList.toggle(class2);
		}
	}
	
	function toggleExistClass(class1, class2, j = 0) {
		var elem = document.getElementsByClassName(class1)[j];
		if (elem.classList.contains(class2)) {
			elem.classList.toggle(class2);
		}
	}
	return {
		toggleNotExistClass: toggleNotExistClass,
		toggleExistClass: toggleExistClass
	}
})()

var popup = (function() {

	var yOffset;

	// задаём для body свойства

	function getWidthScroll() {
		var div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		var scrollWidth = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);
		return scrollWidth;
	}

	function addBodyProperties() {
		var body = document.body;
		yOffset = window.pageYOffset;
		body.style.width = `calc(100% - ${getWidthScroll()}px)`;
		body.style.top = '-' + yOffset + 'px';
		body.style.position = 'fixed';
		body.style.overflowY = 'hidden';
	}
	
	// удаляем свойства у body
	
	function removeBodyProperties() {
		var body = document.body;
		body.style.width = null;
		body.style.top = null;
		body.style.position = null;
		body.style.overflowY = null;
		window.scrollTo(0, yOffset);
	}

	function hidePopup() {
		// Скрываем модальное окно
		main.toggleNotExistClass('js-modal', 'hidden');
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
		var modal = document.getElementsByClassName('o-modal')[0];
		if (event.target == modal) {
			hidePopup();
			// удаляем обработчик событий
			window.removeEventListener('click', hidePopupClickAreaEvent);
		}
	}

	function showPopupEvent() {
		var button = document.getElementsByClassName('js-app__button')[0];
		button.addEventListener('click', function() {
			// Показываем модальное окно
			main.toggleExistClass('js-modal', 'hidden');
			// Убираем возможность скроллить body
			// Делаем страничку статичной
			addBodyProperties();
			// ОБработчик события, по клику вне Popup происходит закрытие Popup
			window.addEventListener('click', hidePopupClickAreaEvent);
			// Обработчик событий, при нажатии на Esc происходит закрытие Popup
			window.addEventListener('keydown', hidePopupEscapeEvent);
		})
	}

	return {
		showPopupEvent: showPopupEvent,
	}
})();

popup.showPopupEvent();

var inputs = (function(){
	var inputs = document.getElementsByClassName('js-modal__table-quantity-input');

	var plusButton = document.getElementsByClassName('js-modal__table-quantity-icon-plus');
	var minusButton = document.getElementsByClassName('js-modal__table-quantity-icon-minus');

	function plusEvent() {
		for ( let i = 0; i < inputs.length; i++ ) {
			plusButton[i].addEventListener('click', function() {
				if ( inputs[i].value >= 0  && inputs[i].value < 10 ) {
					inputs[i].value = +inputs[i].value + 1;
				}
			})
		}
	}

	function minusEvent() {
		for ( let i = 0; i < inputs.length; i++ ) {
			minusButton[i].addEventListener('click', function() {
				if ( inputs[i].value > 0  && inputs[i].value <= 10 ) {
					inputs[i].value = +inputs[i].value - 1;
				}
			})
		}
	}

	return {
		plusEvent: plusEvent,
		minusEvent: minusEvent,
	}

})();

inputs.plusEvent();
inputs.minusEvent();

var transitionPopupForword = (function(){

	function setActiveClass(stepClass) {
		if (stepClass === 'js-step-4') {
			main.toggleNotExistClass(stepClass, 'o-steps_green');
			main.toggleNotExistClass('js-step-4-span', 'o-steps_green_color');
			main.toggleExistClass('js-modal__steps-stage-icon', 'hidden');
		} else {
			main.toggleNotExistClass(stepClass, 'o-steps_blue');
		}
	}

	function hideBlock(blockHiddenClass, i) {
		main.toggleNotExistClass(blockHiddenClass, 'hidden', i);
		console.log('hide' + i)
	}
	
	function showBlock(blockShowClass, i) {
		main.toggleExistClass(blockShowClass, 'hidden', i);
		console.log('show' + i);
	}
	
	function addContinueEvent(buttonClass, blockHiddenClass, blockShowClass, stepClass, i) {
		var button = document.getElementsByClassName(buttonClass)[0];
		button.addEventListener('click', function() {
			setActiveClass(stepClass);
			hideBlock(blockHiddenClass, i);
			showBlock(blockShowClass, i + 1);
		});
	}

	return {
		addContinueEvent: addContinueEvent,
	}
}());

transitionPopupForword.addContinueEvent('js-modal__button', 'js-modal-container', 'js-modal-container', 'js-step-2', 0);

transitionPopupForword.addContinueEvent('js-modal__button-pay', 'js-modal-container', 'js-modal-container', 'js-step-3', 1);

transitionPopupForword.addContinueEvent('js-modal__button-submit', 'js-modal-container', 'js-modal-container', 'js-step-4', 2);

var transitionPopupBack = (function(){

	function delActiveClass(stepClass) {
		main.toggleExistClass(stepClass, 'o-steps_blue');
	}

	function hideBlock(blockHiddenClass, i) {
		main.toggleNotExistClass(blockHiddenClass, 'hidden', i);
		console.log('hide' + i)
	}
	
	function showBlock(blockShowClass, i) {
		main.toggleExistClass(blockShowClass, 'hidden', i);
		console.log('show' + i);
	}
	
	function addContinueEvent(buttonClass, blockHiddenClass, blockShowClass, stepClass, i) {
		var button = document.getElementsByClassName(buttonClass)[0];
		button.addEventListener('click', function() {
			delActiveClass(stepClass);
			hideBlock(blockHiddenClass, i + 1);
			showBlock(blockShowClass, i);
		});
	}

	return {
		addContinueEvent: addContinueEvent,
	}
}());

transitionPopupBack.addContinueEvent('js-modal__button-back', 'js-modal-container', 'js-modal-container', 'js-step-2', 0);

transitionPopupBack.addContinueEvent('js-modal__button-contacts-back', 'js-modal-container', 'js-modal-container', 'js-step-3', 1);