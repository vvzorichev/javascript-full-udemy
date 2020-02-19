function form() {
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
};

module.exports = form;