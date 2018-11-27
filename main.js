const $ = element => document.querySelector(element);
const $$ = elements => [...document.querySelectorAll(elements)];
const main = $('main');

const path = document.querySelector('.waves__path');
const length = path.getTotalLength();
console.log({ length });
