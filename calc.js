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
    if (action.includes(key) || key === '=') {
        variablesToCalculate.push(digitBuffer);
        variablesToCalculate.push(action.includes(key));
        digitBuffer = '';
    }
    if (key === '=') {
        switch (sign) {
            case "+":
                for (i = 0; )
        }
    }
    console.log(variablesToCalculate);
}