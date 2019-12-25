'use strict';

let money = prompt("Ваш бюджет на месяц?", ''),
    time = prompt("Введите дату в формате YYYY-MM-DD", '');

let appData = {
    money: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false
}

let expense_item_1 = prompt("Введите обязательную статью расходов в этом месяце", ''),
    ei_how_much_1 = prompt("Во сколько обойдется?", ''),
    expense_item_2 = prompt("Введите обязательную статью расходов в этом месяце", ''),
    ei_how_much_2 = prompt("Во сколько обойдется?", '');

appData.expenses.expense_item_1 = ei_how_much_1;
appData.expenses.expense_item_2 = ei_how_much_2;

console.log(appData.money / 30)
