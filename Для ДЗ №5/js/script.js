let menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu-item'),
    menuItemLi = document.createElement('li'),
    title = document.querySelector('.title'),
    adv = document.querySelector('.adv'),
    prmpt = document.querySelector('.prompt');

menu.insertBefore(menuItem[2], menuItem[1]);

menuItemLi.classList.add('menu-item');
menuItemLi.textContent = "Пятый пункт";
menu.appendChild(menuItemLi);

document.body.style.backgroundImage = "url('img/apple_true.jpg')";

title.textContent = "Мы продаем только подлинную технику Apple";

let yourOpinion = prompt("Ваше отношение к технике Apple?"); 
prmpt.textContent = yourOpinion;