
import { moveCarouselEvents, moveCarouselRadioButtonsEvent, setCarouselSettings, addPackageClones } from '/js/carousel.js';
import { addPackageRadioButtons, getPackagesNum, addRandomPackages } from '/js/drawRandomPackages.js';


const xhr = new XMLHttpRequest();
let packageObj = {};

xhr.open("GET", "http://localhost:3000/api/app_packages.json", true);

xhr.send();

xhr.onload = function(e) {
	packageObj = JSON.parse(xhr.responseText);
	getPackagesNum(packageObj);
	addRandomPackages(packageObj);
	addPackageRadioButtons();
	addPackageClones();
	setCarouselSettings();
	moveCarouselRadioButtonsEvent();
}


// fetch("http://localhost:3000/api/apps.json").then(function(response) {
// 	return response.json();
// }).then(function(data) {
// 	getPackagesNum(data);
// 	addRandomPackages(data);
// 	addPackageRadioButtons();
// 	addPackageClones();
// 	setCarouselSettings();
// 	moveCarouselRadioButtonsEvent();
// })


moveCarouselEvents();
