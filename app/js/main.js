
import { moveCarouselEvents, moveCarouselRadioButtonsEvent, setCarouselSettings, addPackageClones } from '/js/carousel.js';
import { addPackageRadioButtons, getPackagesNum, addRandomPackages } from '/js/drawRandomPackages.js';
import { addHttpRequestPromise } from '/js/addHttpRequest.js';

addHttpRequestPromise("GET", "http://localhost:3000/api/app_packages.json")
	.then(function(result) {
		getPackagesNum(result);
		addRandomPackages(result);
		addPackageRadioButtons();
		addPackageClones();
		setCarouselSettings();
		moveCarouselRadioButtonsEvent();
	})
	.catch(function(error) {
		console.error('ошибка', error);
	})

moveCarouselEvents();
