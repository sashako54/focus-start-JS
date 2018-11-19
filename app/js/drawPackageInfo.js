import { getDate } from '/js/getDate.js';

function drawPackageInfo(currentPackage) {
	var wrapper = document.querySelector('div.js-content'),
		template = document.querySelector('#packageInfoTemplate'),

		title = template.content.querySelector('h3.js-content__title'),
		img = template.content.querySelector('div.js-app__img'),
		date = template.content.querySelector('time.js-app__info-date');

		title.innerHTML = currentPackage.title;
		img.style.backgroundImage = `url(${currentPackage.url})`;
		date.innerHTML = getDate(currentPackage.lastUpdate);

		var clone = document.importNode(template.content, true);

		wrapper.appendChild(clone);
}

export { drawPackageInfo };