function slider() {
    let slideIndex = 0,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    let showSlide = () => {
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('dot-active');
    }

    showSlide();
    
    let changeSlide = (changeIndex) => {
        slideIndex += changeIndex;
        showSlide();
    }

    let currentSlide = (newIndex) => {
        slideIndex = newIndex;
        showSlide();
    }

    prev.addEventListener('click', () => {
        changeSlide(-1);
    });

    next.addEventListener('click', () => {
        changeSlide(1);
    });

    dotsWrap.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            dots.forEach((item, index) => {
                if (event.target == item) {
                    currentSlide(index);
                }
            });
        }
    });
};

module.exports = slider;