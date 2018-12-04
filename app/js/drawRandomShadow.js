// скрипт, посвечивающий рандомные элементы сайта (1 практическое задание по JS)

let querySelectors = document.querySelectorAll('*');

function getRandomInteger(min, max) {
	// в выражении не добавляем 1, так как консоль ругается, когда рандомно выпадает последний элемент
	return Math.floor( min + Math.random() * (max - min));
}

function getRandomNumQuery() {
	elemLength = querySelectors.length;
	return getRandomInteger(0, elemLength);
}

function getRandomColor() {
	return `rgb(${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)})`;
}

function setLight() {
	let elem = querySelectors[getRandomNumQuery()];
	elem.style.boxShadow = `0 0 5px 5px ${getRandomColor()}`;
}

function deleteLight() {
	let elem = querySelectors[getRandomNumQuery()];
	elem.style.boxShadow = null;
}

function setLightInterval() {
	setInterval(setLight, 500);
}

function delLightInterval() {
	setInterval(deleteLight, 500);
}

export { setLightInterval, delLightInterval };
