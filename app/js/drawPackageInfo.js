import { getDate } from '/js/getDate.js';

function drawPackageInfo(currentPackage) {
	var wrapper = document.querySelector('div.js-content'),
		template = document.querySelector('#packageInfoTemplate'),
		
		title = template.content.querySelector('h3.js-content__title'),
		img = template.content.querySelector('div.js-app__img'),
		date = template.content.querySelector('time.js-app__info-date'),

		banks = template.content.querySelector('span.js-app-info-banks'),
		appType = template.content.querySelector('span.js-app-info-type'),
		developer = template.content.querySelector('span.js-app-info-developer'),
		catalogCode = template.content.querySelector('span.js-app-info-code'),
		requirements = template.content.querySelector('span.js-app-info-requirements');

		title.innerHTML = currentPackage.title;
		img.style.backgroundImage = `url(${currentPackage.url})`;
		date.innerHTML = getDate(currentPackage.lastUpdate);

		banks.innerHTML = currentPackage.description.banks;
		appType.innerHTML = currentPackage.description.appType;
		developer.innerHTML = currentPackage.description.developer;
		catalogCode.innerHTML = currentPackage.description.catalogCode;
		requirements.innerHTML = currentPackage.requirements;

		var clone = document.importNode(template.content, true);
		
		wrapper.appendChild(clone);

		var templateList = document.querySelector('#packageInfoListTemplate'),
			featuresList = wrapper.querySelector('ul.js-app-features-list'),

			featuresItem = templateList.content.querySelector('li.js-app-features-item');

		for ( var i = 0; i < currentPackage.features.length; i++ ) {
			featuresItem.innerHTML = currentPackage.features[i];
			var cloneList = document.importNode(templateList.content, true);
			featuresList.appendChild(cloneList);
		}

	}

export { drawPackageInfo };