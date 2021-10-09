
export default class Slider {
    constructor(element, slidePersentageRate, autoSlideTime, dots = undefined, firstSlideIndex) {
        this.element = element;
        this.slidePercentageRate = slidePersentageRate;
        this.slideAmount = 0;
        this.autoSlideTime = autoSlideTime;
        this.dots = dots;
        this.firstSlideIndex = firstSlideIndex;
        this.counter = this.firstSlideIndex;

        this.element.style.transform = `translateX(${this.counter * this.slidePercentageRate}%)`
        this.slideInterval = setInterval(() => {
            this.autoSlide();
        }, this.autoSlideTime);

        this.element.addEventListener('transitionend', () => {
            const reachTheLastSlide = this.counter >= this.dots.length + this.firstSlideIndex;
            if (reachTheLastSlide) {
                this.moveFastToFirstSlide();
            }
        })
        this.addEventListerOnDotMenu();
    }


    moveSlider() {
        this.updateDotsClasses();
        this.slideAmount = this.counter * this.slidePercentageRate;
        this.element.style.transform = `translate(${this.slideAmount}%)`;
    }

    updateDotsClasses() {
        let activeDotIndex = this.counter - this.firstSlideIndex;
        this.dots.forEach((dot) => {
            if (dot.classList.contains('active')) {
                dot.classList.remove('active');
            }
        })
        if (activeDotIndex > this.dots.length - 1) activeDotIndex = 0;
        this.dots[activeDotIndex].classList.add('active');
    }

    addEventListerOnDotMenu() {
        this.dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.counter = dotIndex + this.firstSlideIndex;
                this.slideAmount = this.counter * this.slidePercentageRate;
                this.moveSlider();
                clearInterval(this.slideInterval)
                this.slideInterval = setInterval(() => {
                    this.autoSlide();
                }, this.autoSlideTime);   
            })
        })
    }

    autoSlide() {
        this.counter++;
        this.moveSlider();
    }

    moveFastToFirstSlide() {
        this.element.style.transition = 'none';
        this.counter = this.firstSlideIndex;
        this.moveSlider()
        setTimeout(() => {
            this.element.style.transition = 'transform 1s ease';
        }, 1)
    }
}
