
import { moveCarouselEvents, moveCarouselRadioButtonsEvent, setCarouselSettings, addPackageClones } from '/js/carousel.js';
import { addPackageRadioButtons, getPackagesNum, addRandomPackages } from '/js/drawRandomPackages.js';
import { addHttpRequest } from '/js/addHttpRequest.js';


// const xhr = new XMLHttpRequest();
// let packageObj = {};

// xhr.open("GET", "http://localhost:3000/api/app_packages.json", true);

// xhr.send();

// xhr.onload = function(e) {
// 	packageObj = JSON.parse(xhr.responseText);
// 	getPackagesNum(packageObj);
// 	addRandomPackages(packageObj);
// 	addPackageRadioButtons();
// 	addPackageClones();
// 	setCarouselSettings();
// 	moveCarouselRadioButtonsEvent();
// }

addHttpRequest({url: "http://localhost:3000/api/app_packages.json"})
	.then(function(result) {
		getPackagesNum(result);
		addRandomPackages(result);
		addPackageRadioButtons();
		addPackageClones();
		setCarouselSettings();
		moveCarouselRadioButtonsEvent();
	})
	.catch(function(error) {
		console.log('ошибка', error);
	})

moveCarouselEvents();
