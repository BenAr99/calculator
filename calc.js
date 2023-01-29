const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '( )'];
const action = ['-', '+', 'X', '/', '+/-'];

let calculation = '';
let variablesToCalculate = [];
let digitBuffer = '';

/// История
screenHistory = document.createElement('div')
let historyBuffer = '';
let historyOutputVariable = '';
let historyList = '';


function history () {
    screenHistory.className = "history-screen";
    screenHistory.innerHTML += `<span> ${historyOutputVariable} </span>`
    document.querySelector('.calc-history').append(historyOutputVariable)
}

document.querySelector('.calc-history').onclick = history;


/// основное тело js
const out = document.querySelector('.calc-screen span');

function clearAll() {
    digitBuffer = '';
    variablesToCalculate = [];
    out.textContent = '';
}

document.querySelector('.ac').onclick = clearAll;


document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return; // contains невразумив
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;
    out.textContent += key;

    if (digit.includes(key)) {
        digitBuffer += key;
        historyBuffer += `${key} `;
    }
    if (action.includes(key)) {
        variablesToCalculate.push(digitBuffer);
        variablesToCalculate.push(key);
        historyBuffer += `${key} `;
        digitBuffer = '';
    }
    if (key === '=') {
        variablesToCalculate.push(digitBuffer)
        digitBuffer = '';
        // ['1', '+', '2', '-', '1']
        // ['3', '-', '1']
        // ['2']
        while (variablesToCalculate.length > 1) {
            let value1 = Number(variablesToCalculate[0]);
            let value2 = Number(variablesToCalculate[2]);
            switch (variablesToCalculate[1]) {
                case '+':
                    calculation = value1 + value2;
                    break
                case '-':
                    calculation = value1 - value2;
                    break
                case 'X':
                    calculation = value1 * value2;
                    break
                case '/':
                    calculation = value1 / value2
                    break
            }
            variablesToCalculate.splice(0, 3);
            variablesToCalculate.unshift(calculation.toString());
            console.log('Log after calculate: ', variablesToCalculate)
        }
        digitBuffer = calculation;
        historyBuffer += ` = ${digitBuffer}`;
        historyOutputVariable += `${++historyList}) ${historyBuffer} \n`;
        historyBuffer = digitBuffer;
        variablesToCalculate = [];      // чтобы обнулять массив после =
        out.textContent = digitBuffer;
    }
}
