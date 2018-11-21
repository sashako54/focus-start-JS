let buttonLeft = document.querySelector('svg.js-carousel-button-left'),
	buttonRight = document.querySelector('svg.js-carousel-button-right'),
	wrapperPackage = document.querySelector('div.js-packages-carousel'),
	wrapperPosition = 2,
	maxWrapperPosition,
	wrapperPositionBefore,
	radioButtonChecked = 1;
	
	
function addPackageClones() {
	let numProductsDisplay = 3;
	// добавим 2 последних элемента в начало обёртки
	wrapperPackage.insertBefore(wrapperPackage.children[wrapperPackage.children.length - 1].cloneNode(true), wrapperPackage.children[0]);
	wrapperPackage.insertBefore(wrapperPackage.children[wrapperPackage.children.length - 2].cloneNode(true), wrapperPackage.children[0]);
	
	// добавим 2 первых элемента в конец обёртки
	wrapperPackage.appendChild(wrapperPackage.children[2].cloneNode(true));
	wrapperPackage.appendChild(wrapperPackage.children[3].cloneNode(true));
	maxWrapperPosition = wrapperPackage.children.length - numProductsDisplay;
}

function setCarouselSettings() {
	// начальное положение карусели
	wrapperPackage.classList.add('no-transition');
	wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
}

function checkRadioButtons() {
	let	radioButtons = document.getElementsByClassName('js-carousel-radio'),
		radioButtonMin = 0,
		radioButtonMax = radioButtons.length - 1;
	
	if (radioButtonChecked < radioButtonMin) {
		radioButtonChecked = radioButtonMax;
	} else if (radioButtonChecked > radioButtonMax) {
		radioButtonChecked = radioButtonMin;
	}
	let changeEvent = new Event('change');
	radioButtons[radioButtonChecked].checked = true;
	radioButtons[radioButtonChecked].dispatchEvent(changeEvent);
}

function moveCarouselLeft() {
	--radioButtonChecked;
	checkRadioButtons();
}

function moveCarouselRight() {
	++radioButtonChecked;
	checkRadioButtons();
}

function moveCarouselEvents() {
	buttonLeft.addEventListener('click', moveCarouselLeft);
	buttonRight.addEventListener('click', moveCarouselRight);
}

function moveCarouselRadioButtonsEvent() {
	let	radioButtons = document.getElementsByClassName('js-carousel-radio');
	for ( let i = 0; i < radioButtons.length; i++) {
		radioButtons[i].addEventListener('change', function() {
			wrapperPackage.classList.remove('no-transition');
			wrapperPosition = i + 1;
			if (wrapperPositionBefore === 1 && wrapperPosition === maxWrapperPosition - 1) {
				wrapperPackage.classList.add('no-transition');
				wrapperPosition = maxWrapperPosition;
				wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
				--wrapperPosition;
				setTimeout(function() {
					wrapperPackage.classList.remove('no-transition');
					wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
				}, 10);
			} else if (wrapperPositionBefore === maxWrapperPosition - 1 && wrapperPosition === 1) {
				wrapperPackage.classList.add('no-transition');
				wrapperPosition = 0;
				wrapperPackage.style.transform = `translateX(0)`;
				++wrapperPosition;
				setTimeout(function() {
					wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
					wrapperPackage.classList.remove('no-transition');
				}, 10);
			} else {
				wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
				radioButtonChecked = i;
			}
			wrapperPositionBefore = wrapperPosition;
		})
	}
}

export { setCarouselSettings, addPackageClones, moveCarouselEvents, moveCarouselRadioButtonsEvent };