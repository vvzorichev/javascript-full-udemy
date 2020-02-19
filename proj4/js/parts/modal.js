function modal() {
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
};

module.exports = modal;