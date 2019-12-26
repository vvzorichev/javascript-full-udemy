'use strict';

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", '');
    time = prompt("Введите дату в формате YYYY-MM-DD", '');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
}

start();

let appData = {
    budjet: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: true
}

function chooseExpences() {
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
}

function chooseOptExpences() {
    for (let i = 1; i < 4; i++) {
        let opt_expense_item = prompt("Статья необязательных расходов в этом месяце", '');
        
        if ( (typeof(opt_expense_item)) === 'string' && (typeof(opt_expense_item)) != null 
            && opt_expense_item != '' && opt_expense_item.length < 50) {
            console.log("done");    
            appData.optionalExpenses[i] = opt_expense_item;
        } else {
            i--;
        }    
    }
}

chooseExpences();
chooseOptExpences();

function detectedDayBudget() {
    appData.moneyPerDay = (appData.budjet / 30).toFixed(2);
    alert("Ежедневный бюджет: " + appData.moneyPerDay)
}

detectedDayBudget();

function detectedLevel() {
    if (appData.moneyPerDay < 100) {
        console.log("Минимальный уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Произошла ошибка");
    }
}

detectedLevel();

function checkSavings() {
    if (appData.saving === true) {
        let save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент?");
        
        appData.monthIncome = save / 100 / 12 * percent;
        alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
    }
}

checkSavings();345