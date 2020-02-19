function tabs() {
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
        if (event.target.classList.contains('info-header-tab')) {
            tab.forEach((item, index) => {
                if (event.target == item) {
                    showTabContent(index);
                };
            });
        };
    });
};

module.exports = tabs; 