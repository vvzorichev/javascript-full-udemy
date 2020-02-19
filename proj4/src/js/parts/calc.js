function calc() {
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
};

module.exports = calc;