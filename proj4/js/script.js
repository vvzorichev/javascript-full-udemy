window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // Tab

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (fromThis) => {
        for (let i = fromThis; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    let showTabContent = (forThis) => {
        if (tabContent[forThis].classList.contains('hide')) {
            tabContent[forThis].classList.remove('hide');
            tabContent[forThis].classList.add('show');
        }
    }

    info.addEventListener('click', () => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2020-02-19';

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
            this.classList.add('more-splash');
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

    // Form

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
                .then(input.forEach((item) => { item.value = '' }))
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
                    currentSlide(index + 1);
                }
            });
        }
    });
});