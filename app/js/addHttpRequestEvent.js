import { addHttpRequest } from '/js/second.js';

function getHashFromLink(links, i) {
	return links[i].href.split('#')[1];
}

function addHttpRequestEvent() {
	var links = document.querySelectorAll('a.js-catalog__link');
	for ( let i = 0; i < links.length; i++ ) {
		// проверка, имеется ли у ссылки hash
		if ( links[i].href.split('#')[1] !== undefined ) {
			// проверка на наличие параметра после hash
			if ( links[i].href.split('#')[1].length !== 0 ) {
				links[i].addEventListener('click', function(e) {
					e.preventDefault();
					window.location.hash = getHashFromLink(links, i);
					addHttpRequest();
				})
			}
		}
	}
}

export { addHttpRequestEvent };