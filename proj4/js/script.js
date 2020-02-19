window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // Tab

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    let showTabContent = (forThis) => {
        tabContent.forEach((item) => {
            item.classList.remove('show');
            item.classList.add('hide');
        });
        tabContent[forThis].classList.add('show');
    }

    showTabContent(0);

    info.addEventListener('click', (event) => {
        if (event.target.classList.contains('info-header-tab')){
            tab.forEach((item, index) => {
                if (event.target == item) {
                    showTabContent(index);
                };
            });
        };
    });

    // Timer

    let deadline = '2019-02-19';

    let getTimeRemaining = (endtime) => {
        let time = Date.parse(endtime) - Date.parse(new Date),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / 1000 / 60 / 60));

        return {
            'total': time,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        }
    };

    let setClock = (id, endtime) => {
        let timer = document.querySelector(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        let updateClock = () => {
            let timeToDeadline = getTimeRemaining(endtime);

            let addZero = (num) => {
                if (num <= 9) {
                    return `0${num}`;
                } else return num;
            };

            hours.textContent = addZero(timeToDeadline.hours);
            minutes.textContent = addZero(timeToDeadline.minutes);
            seconds.textContent = addZero(timeToDeadline.seconds);

            if (timeToDeadline.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            };
        };

        let timeInterval = setInterval(updateClock, 1000);
    };

    setClock('#timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        moreBtns = [more, ...document.querySelectorAll('.description-btn')];

    moreBtns.forEach((item) => {
        item.addEventListener('click', () => {
            overlay.style.display = 'block';
            item.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        moreBtns.forEach((item) => {
            item.classList.remove('more-splash');
        });
        document.body.style.overflow = '';
    });

    // Form Modal Window

    let message = {
        loading: 'Загрузка...',
        succses: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let forms = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    forms.forEach((item) => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(item);
            let obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);
            request.send(json);

            let postData = () => {
                return new Promise((resolve, reject) => {
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            };
            
            postData()
                .then(() => statusMessage.textContent = message.loading)
                .then(() => statusMessage.textContent = message.succses)
                .catch(() => statusMessage.textContent = message.failure)
                .then(input.forEach((item) => { item.value = ''; }))
        });
    });

    // Slider

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

    // Calculator

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.querySelector('#select'),
        totalValue = document.querySelector('#total'),
        personsSum = 0,
        daysSum = 0,
        placeCoef = 1,
        total = 0;

    let changeTotal = () => {
        if (restDays.value == 0 || persons.value == 0) {
            totalValue.textContent = 0;
        } else {
            total = (daysSum + personsSum) * 4000 * placeCoef;
            totalValue.textContent = total;
        }
    };

    persons.addEventListener('change', (event) => {
        personsSum = +event.target.value;
        changeTotal();
    });

    restDays.addEventListener('change', (event) => {
        daysSum = +event.target.value;
        changeTotal();
    });

    place.addEventListener('change', (event) => {
        place = event.target;
        placeCoef = +place.options[place.selectedIndex].value;
        changeTotal();
    });
});