function timer() {
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
};

module.exports = timer;