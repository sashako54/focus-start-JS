import { addRandomPackages } from '/js/drawRandomPackages.js';

const xhr = new XMLHttpRequest();
let packageObj = {};

xhr.open("GET", "http://localhost:3000/api/apps.json", true);

xhr.send();

xhr.onreadystatechange = function(e) {}

xhr.onprogress = function(e) {}

xhr.onload = function(e) {
	packageObj = JSON.parse(xhr.responseText);
	addRandomPackages(packageObj);
}
