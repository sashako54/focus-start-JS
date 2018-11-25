import { getDate } from '/js/getDate.js';

function drawPackageList(packages) {
	let packageList = document.querySelector('ul.js-catalog__list');
	
	for ( let i = 0; i < packages.length; i++ ) {
		let template = document.querySelector('#packageItemTemplate'),
			link = template.content.querySelector('a.js-catalog__link');

		link.href = `http://localhost:3000/catalog.html#id=${packages[i].id}`;
		link.innerHTML = packages[i].title;

		let clone = document.importNode(template.content, true);

		packageList.appendChild(clone);
	}
	let activeItem = packageList.querySelector('a.js-catalog__link');
	activeItem.classList.add('o-catalog__link_active');
}

function drawPackageInfo(currentPackage) {
	let wrapper = document.querySelector('div.js-content'),
		template = document.querySelector('#packageInfoTemplate'),
		
		title = template.content.querySelector('h3.js-content__title'),
		img = template.content.querySelector('div.js-app__img'),
		date = template.content.querySelector('time.js-app__info-date'),

		banks = template.content.querySelector('span.js-app-info-banks'),
		appType = template.content.querySelector('span.js-app-info-type'),
		developer = template.content.querySelector('span.js-app-info-developer'),
		catalogCode = template.content.querySelector('span.js-app-info-code'),
		requirements = template.content.querySelector('span.js-app-info-requirements'),
		price = template.content.querySelector('span.js-app-info-price'),
		button = template.content.querySelector('button.js-app__button');

	wrapper.innerHTML = null; // удаление предыдущего состояния

	title.innerHTML = currentPackage.title;
	img.style.backgroundImage = `url(${currentPackage.url})`;
	date.innerHTML = getDate(currentPackage.lastUpdate);

	banks.innerHTML = currentPackage.description.banks;
	appType.innerHTML = currentPackage.description.appType;
	developer.innerHTML = currentPackage.description.developer;
	catalogCode.innerHTML = currentPackage.description.catalogCode;
	requirements.innerHTML = currentPackage.requirements;
	price.innerHTML = `${currentPackage.price} $`;
	button.setAttribute('data-id', currentPackage.id);

	let clone = document.importNode(template.content, true);
	
	wrapper.appendChild(clone);

	let templateList = document.querySelector('#packageInfoListTemplate'),
		featuresList = wrapper.querySelector('ul.js-app-features-list'),

		featuresItem = templateList.content.querySelector('li.js-app-features-item');

	for ( let i = 0; i < currentPackage.features.length; i++ ) {
		featuresItem.innerHTML = currentPackage.features[i];
		let cloneList = document.importNode(templateList.content, true);
		featuresList.appendChild(cloneList);
	}
}

export { drawPackageInfo, drawPackageList };