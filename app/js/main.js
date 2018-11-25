
import { Carousel } from '/js/carousel.js';
import { addPackageRadioButtons, getPackagesNum, addRandomPackages } from '/js/drawRandomPackages.js';
import { addHttpRequestPromise } from '/js/addHttpRequest.js';

let carousel = new Carousel();


addHttpRequestPromise("GET", "http://localhost:3000/api/app_packages.json")
	.then(function(result) {
		getPackagesNum(result);
		addRandomPackages(result);
		addPackageRadioButtons();
		carousel.addPackageClones();
		carousel.setCarouselSettings();
		carousel.moveCarouselRadioButtonsEvent();
		carousel.moveCarouselEvents();
	})
	.catch(function(error) {
		console.error('ошибка', error);
	})

