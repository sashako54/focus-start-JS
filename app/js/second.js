import { getPackageById } from '/js/getPackageById.js';
import { drawPackageInfo } from '/js/drawPackageInfo.js';
import { highlightCurrentElem } from '/js/highlightCurrentElem.js';

const xhr = new XMLHttpRequest();
let packageObj = {};

xhr.open("GET", "http://localhost:3000/api/app_packages.json", true);

xhr.send();

xhr.onload = function(e) {
	packageObj = JSON.parse(xhr.responseText);
	var currentPackage = getPackageById(packageObj);
	drawPackageInfo(currentPackage);
	highlightCurrentElem();
}