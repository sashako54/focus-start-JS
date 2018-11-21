function highlightCurrentElem() {
	let linksList = document.querySelectorAll('a.js-catalog__link'),
		urlHref = window.location.href;

	for ( let i = 0; i < linksList.length; i++ ) {
		linksList[i].classList.remove('o-catalog__link_active');
		if ( linksList[i].href === urlHref ) {
			linksList[i].classList.add('o-catalog__link_active');
		}
	}
}

export { highlightCurrentElem };