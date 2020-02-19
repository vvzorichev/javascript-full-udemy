window.addEventListener('DOMContentLoaded', () => {

    'use strict';
    let calc = require('./parts/calc'),
        form = require('./parts/form'),
        slider = require('./parts/slider'),
        modal = require('./parts/modal'),
        tabs = require('./parts/tabs'),
        timer = require('./parts/timer');
    
    calc();
    form();
    slider();
    modal();
    tabs();
    timer();
});