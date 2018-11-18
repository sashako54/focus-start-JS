var buttonLeft = document.getElementsByClassName('js-carousel-button-left')[0],
	buttonRight = document.getElementsByClassName('js-carousel-button-right')[0],
	wrapperPackage = document.getElementsByClassName('js-packages-carousel')[0],
	radioButtons = document.getElementsByClassName('js-carousel-radio'),
	wrapperPosition = 2,
	maxWrapperPosition,
	
	radioButtonChecked = 1,
	radioButtonMin = 0,
	radioButtonMax = radioButtons.length - 1;
	
	
function addPackageClones() {
	// добавим 2 последних элемента в начало обёртки
	wrapperPackage.insertBefore(wrapperPackage.children[wrapperPackage.children.length - 1].cloneNode(true), wrapperPackage.children[0]);
	wrapperPackage.insertBefore(wrapperPackage.children[wrapperPackage.children.length - 2].cloneNode(true), wrapperPackage.children[0]);
	
	// добавим 2 первых элемента в конец обёртки
	wrapperPackage.appendChild(wrapperPackage.children[2].cloneNode(true));
	wrapperPackage.appendChild(wrapperPackage.children[3].cloneNode(true));
	maxWrapperPosition = wrapperPackage.children.length - 3;
	// начальное положение карусели
	wrapperPackage.classList.add('no-transition');
	wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`
}



function checkRadioButtons() {
	if (radioButtonChecked < radioButtonMin) {
		radioButtonChecked = radioButtonMax;
	} else if (radioButtonChecked > radioButtonMax) {
		radioButtonChecked = radioButtonMin;
	}
	radioButtons[radioButtonChecked].checked = true;
}

function moveCarouselLeft() {
	wrapperPackage.classList.remove('no-transition');
	if (wrapperPosition === 1) {
		wrapperPackage.classList.add('no-transition');
		wrapperPosition = maxWrapperPosition;
		wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
	}
	--wrapperPosition;
	setTimeout(function() {
		wrapperPackage.classList.remove('no-transition');
		wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
	}, 10)
	--radioButtonChecked;
	checkRadioButtons();
}

function moveCarouselRight() {
	wrapperPackage.classList.remove('no-transition');
	if (wrapperPosition === maxWrapperPosition - 1) {
		wrapperPackage.classList.add('no-transition');
		wrapperPosition = 0;
		wrapperPackage.style.transform = `translateX(0)`;
	}
	++wrapperPosition;
	setTimeout(function() {
		wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
		wrapperPackage.classList.remove('no-transition');
	}, 10)
	++radioButtonChecked;
	checkRadioButtons();
}

function moveCarouselEvents() {
	buttonLeft.addEventListener('click', moveCarouselLeft);
	buttonRight.addEventListener('click', moveCarouselRight);
}

function moveCarouselRadioButtonsEvent() {
	for ( let i = 0; i < radioButtons.length; i++) {
		radioButtons[i].addEventListener('click', function() {
			wrapperPackage.classList.remove('no-transition');
			
			wrapperPosition = i + 1;
			wrapperPackage.style.transform = `translateX(${ -wrapperPosition * 100/3 }%)`;
			radioButtonChecked = i;
		})
	}
}

export { addPackageClones, moveCarouselEvents, moveCarouselRadioButtonsEvent };