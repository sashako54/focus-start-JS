import { addHttpRequestForCurrentPackage } from '/js/catalog.js';
import { highlightCurrentElem } from '/js/highlightCurrentElem.js';

function addHttpRequestEvent() {
	let links = document.querySelectorAll('a.js-catalog__link');
	for ( let i = 0; i < links.length; i++ ) {
		// проверка, имеется ли у ссылки hash
		if ( links[i].href.split('#')[1] !== undefined ) {
			// проверка на наличие параметра после hash
			if ( links[i].href.split('#')[1].length !== 0 ) {
				links[i].addEventListener('click', function(e) {
					e.preventDefault();
					window.location.hash = links[i].href.split('#')[1];
					highlightCurrentElem();
					addHttpRequestForCurrentPackage();
				})
			}
		}
	}
}

export { addHttpRequestEvent };