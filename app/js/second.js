import { getPackageById } from '/js/getPackageById.js';

const xhr = new XMLHttpRequest();
let packageObj = {};

xhr.open("GET", "http://localhost:3000/api/app_packages.json", true);

xhr.send();

xhr.onload = function(e) {
	packageObj = JSON.parse(xhr.responseText);
	var currentPackage = getPackageById(packageObj);
	console.log(currentPackage);
}