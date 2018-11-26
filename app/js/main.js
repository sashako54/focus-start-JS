
import { Carousel } from '/js/carousel.js';
import { addPackageRadioButtons, getPackagesNum, addRandomPackages } from '/js/drawRandomPackages.js';
import { addHttpRequestPromise } from '/js/addHttpRequest.js';

import { showPopupEvent, moveToPaymentStageEvent, moveToNextStageWithLoadingEvent, moveToPreviousStageEvent, moveToAnyPreviousStageEvent } from '/js/popup.js';

let carousel = new Carousel(
	'div.js-packages-carousel',
	'js-carousel-radio',
	'svg.js-carousel-button-left',
	'svg.js-carousel-button-right',
	2
);


addHttpRequestPromise("GET", "http://localhost:3000/api/app_packages.json")
	.then(function(result) {
		getPackagesNum(result);
		addRandomPackages(result);
		addPackageRadioButtons();
		carousel.addPackageClones();
		carousel.setCarouselSettings();
		carousel.moveCarouselRadioButtonsEvent(100/3);
		carousel.moveCarouselEvents();
	})
	.catch(function(error) {
		console.error('ошибка', error);
	})

showPopupEvent();

moveToPaymentStageEvent();

moveToNextStageWithLoadingEvent('button.js-modal__button-pay[data-stage="2"]', 2);
moveToNextStageWithLoadingEvent('button.js-modal__button-submit[data-stage="3"]', 3);

moveToPreviousStageEvent('button.js-modal__button-back[data-stage="0"]');
moveToPreviousStageEvent('button.js-modal__button-contacts-back[data-stage="1"]');

moveToAnyPreviousStageEvent()