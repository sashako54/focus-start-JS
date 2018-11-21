function removePackageInfo() {
	let wrapper = document.querySelector('div.js-content');

	wrapper.innerHTML = null;
}

export { removePackageInfo };