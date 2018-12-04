class Carousel {
	constructor(wrapper, radioButtons, buttonLeft, buttonRight, wrapperPositionStart) {
		this._buttonLeft = document.querySelector(buttonLeft),
		this._buttonRight = document.querySelector(buttonRight),
		this._wrapperPackage = document.querySelector(wrapper),
		this._radioButtons = document.getElementsByClassName(radioButtons),
		this._wrapperPosition = wrapperPositionStart,
		this._maxWrapperPosition,
		this._wrapperPositionBefore,
		this._radioButtonChecked = 1;
	}
	
	addPackageClones() {
		let numProductsDisplay = 3;
		// добавим 2 последних элемента в начало обёртки
		this._wrapperPackage.insertBefore(this._wrapperPackage.children[this._wrapperPackage.children.length - 1].cloneNode(true), this._wrapperPackage.children[0]);
		this._wrapperPackage.insertBefore(this._wrapperPackage.children[this._wrapperPackage.children.length - 2].cloneNode(true), this._wrapperPackage.children[0]);
		
		// добавим 2 первых элемента в конец обёртки
		this._wrapperPackage.appendChild(this._wrapperPackage.children[2].cloneNode(true));
		this._wrapperPackage.appendChild(this._wrapperPackage.children[3].cloneNode(true));
		this._maxWrapperPosition = this._wrapperPackage.children.length - numProductsDisplay;
	}
	
	setCarouselSettings() {
		// начальное положение карусели
		this._wrapperPackage.classList.add('no-transition');
		this._wrapperPackage.style.transform = `translateX(${ -this._wrapperPosition * 100/3 }%)`;
	}
	
	checkRadioButtons() {
		let	radioButtonMin = 0,
			radioButtonMax = this._radioButtons.length - 1;
		
		if (this._radioButtonChecked < radioButtonMin) {
			this._radioButtonChecked = radioButtonMax;
		} else if (this._radioButtonChecked > radioButtonMax) {
			this._radioButtonChecked = radioButtonMin;
		}
		let changeEvent = new Event('change');
		this._radioButtons[this._radioButtonChecked].checked = true;
		this._radioButtons[this._radioButtonChecked].dispatchEvent(changeEvent);
	}
	
	moveCarouselLeft() {
		--this._radioButtonChecked;
		this.checkRadioButtons();
	}
	
	moveCarouselRight() {
		++this._radioButtonChecked;
		this.checkRadioButtons();
	}
	
	moveCarouselEvents() {
		this._buttonLeft.addEventListener('click', () => {this.moveCarouselLeft()});
		this._buttonRight.addEventListener('click', () => {this.moveCarouselRight()});
	}
	
	moveCarouselRadioButtonsEvent(offset) {
		for ( let i = 0; i < this._radioButtons.length; i++) {
			this._radioButtons[i].addEventListener('change', () => {
				this._wrapperPackage.classList.remove('no-transition');
				this._wrapperPosition = i + 1;
				if (this._wrapperPositionBefore === 1 && this._wrapperPosition === this._maxWrapperPosition - 1) {
					this._wrapperPackage.classList.add('no-transition');
					this._wrapperPosition = this._maxWrapperPosition;
					this._wrapperPackage.style.transform = `translateX(${ -this._wrapperPosition * offset }%)`;
					--this._wrapperPosition;
					setTimeout(() => {
						this._wrapperPackage.classList.remove('no-transition');
						this._wrapperPackage.style.transform = `translateX(${ -this._wrapperPosition * offset }%)`;
					}, 10);
				} else if (this._wrapperPositionBefore === this._maxWrapperPosition - 1 && this._wrapperPosition === 1) {
					this._wrapperPackage.classList.add('no-transition');
					this._wrapperPosition = 0;
					this._wrapperPackage.style.transform = `translateX(0)`;
					++this._wrapperPosition;
					setTimeout(() => {
						this._wrapperPackage.style.transform = `translateX(${ -this._wrapperPosition * offset }%)`;
						this._wrapperPackage.classList.remove('no-transition');
					}, 10);
				} else {
					this._wrapperPackage.style.transform = `translateX(${ -this._wrapperPosition * offset }%)`;
					this._radioButtonChecked = i;
				}
				this._wrapperPositionBefore = this._wrapperPosition;
			})
		}
	}
}

	
	

export { Carousel };