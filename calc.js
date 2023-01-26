let a = "";
let b = "";
let sign = "";
let finish = false;
let calculation = '';

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '( )'];
const action = ['-', '+', 'X', '/', '+/-'];
let variablesToCalculate = [];
// экран

const out = document.querySelector('.calc-screen span');

const actionSign = [summation()]

function summation(value1, value2) {
    calculation = Number(value1) + Number(value2);
    a = calculation;
    return calculation;
}

function subtraction (a) {
    calculation = value1 - value2;
    a = calculation;
    return calculation;
}

function clearAll () {
    variablesToCalculate = [];
    out.textContent = '';
}

digitBuffer = '';

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return; // contains невразумив
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;
    out.textContent += key;
    if (digit.includes(key)) {
        digitBuffer += key;
    }
    if (action.includes(key)) {
        variablesToCalculate.push(digitBuffer); // ошибка тут
        variablesToCalculate.push(key);
        digitBuffer = '';
    }
    if (key === '=') {
        variablesToCalculate.push(digitBuffer)
        digitBuffer = '';
        let value1 = variablesToCalculate[0];
        let value2 = variablesToCalculate[2];
        switch (variablesToCalculate[1]) {
            case '+':
                while (Number(variablesToCalculate[0]) && variablesToCalculate[1] === '+') {
                calculation = Number(value1) + Number(value2);
                variablesToCalculate.splice(0, 3);
                variablesToCalculate.unshift(calculation.toString());
                console.log(calculation)
            }
            case '-':
                while (Number(variablesToCalculate[0]) && variablesToCalculate[1] === '-') { // условие по сути можно убрать, но как остановить цикл, ведь условие то же что и в case
                    calculation = Number(value1) - Number(value2);
                    variablesToCalculate.splice(0, 3);
                    variablesToCalculate.unshift(calculation.toString());
                    console.log(calculation)
                }
        }
        out.textContent = calculation;
    }
    console.log(variablesToCalculate);
}