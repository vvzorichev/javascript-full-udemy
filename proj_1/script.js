'use strict';

let money = +prompt("Ваш бюджет на месяц?", ''),
    time = prompt("Введите дату в формате YYYY-MM-DD", '');

let appData = {
    budjet: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false
}

for (let i = 0; i < 2; i++) {
    let expense_item = prompt("Введите обязательную статью расходов в этом месяце", ''),
        ei_how_much = prompt("Во сколько обойдется?", '');
    
    if ( (typeof(expense_item)) === 'string' && (typeof(expense_item)) != null 
        && (typeof(ei_how_much)) != null && expense_item != '' && ei_how_much != '' && expense_item.length < 50){
        console.log("done");    
        appData.expenses[expense_item] = ei_how_much;
    } else {
        i--;
    }    
}

appData.moneyPerDay = appData.budjet / 30;

alert("Ежедневный бюджет: " + appData.moneyPerDay)

if (appData.moneyPerDay < 100) {
    console.log("Минимальный уровень достатка");
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log("Средний уровень достатка");
} else if (appData.moneyPerDay > 2000) {
    console.log("Высокий уровень достатка");
} else {
    console.log("Произошла ошибка");
}