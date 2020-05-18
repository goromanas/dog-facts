class Slider {
    constructor() {
        this.slideScreen = document.querySelector('.slide-wrapper');
        this.slides = document.querySelectorAll('.slide');
        this.buttonNext = document.querySelector('#buttonNext');
        this.buttonPrev = document.querySelector('#buttonPrev');
        this.events();
    }

    events() {
        this.buttonNext.addEventListener('click', () => {
            this.secondPage();
        })

        this.buttonPrev.addEventListener('click', () => {
            this.firstPage();
        })
    }
    // Methods

    firstPage() {
        this.slides.forEach((slide) => {
            slide.style.transform = 'translateX(0)';
        });
    }

    secondPage() {
        this.slides.forEach((slide) => {
            slide.style.transform = 'translateX(-100%)';
        });
    }

}
export default Slider