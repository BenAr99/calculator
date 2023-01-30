const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '( )'];
const action = ['–', '+', '×', '÷', '+/-'];

let out = document.querySelector('.calc-screen span');
let calculation = '';
let variablesToCalculate = [];
let digitBuffer = '';

/// История

let historyBuffer = '';
const historyOutput = [];
let closeScreenHistory = document.querySelector('.btn-history');
let historyOpen = false;

function openHistory () {
    const screenHistory = document.createElement('ul')
    if (historyOpen === false) {
        historyOpen = true;
        closeScreenHistory.textContent = 'Закрыть'
        document.querySelector('.calc-screen span').remove()
        screenHistory.className = "history-screen";
        for (let i = 0; i < historyOutput.length; i++) {
            screenHistory.innerHTML += `<li> ${historyOutput[i]}</li>`
        }
        document.querySelector('.calc-screen').append(screenHistory);

        out.textContent = '';
        digitBuffer = '';
    } else {
        historyOpen = false;

        closeScreenHistory.textContent = 'История'
        document.querySelector('.calc-screen ul').remove()
        const screenSpan = document.createElement('span');
        document.querySelector('.calc-screen').append(screenSpan);
        out = screenSpan;
        console.log(out)
    }
}

function clearAll() {
    digitBuffer = '';
    variablesToCalculate = [];
    out.textContent = '';
}

document.querySelector('.btn-history').onclick = openHistory;

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
        while (variablesToCalculate.length > 1) {
            let value1 = Number(variablesToCalculate[0]);
            let value2 = Number(variablesToCalculate[2]);
            switch (variablesToCalculate[1]) {
                case '+':
                    calculation = value1 + value2;
                    break
                case '–':
                    calculation = value1 - value2;
                    break
                case '×':
                    calculation = value1 * value2;
                    break
                case '÷':
                    calculation = value1 / value2
                    break
            }
            historyOutput.push(`${value1} ${variablesToCalculate[1]} ${value2} = ${calculation}`)
            variablesToCalculate.splice(0, 3);
            variablesToCalculate.unshift(calculation.toString());
            console.log('Log after calculate: ', variablesToCalculate)
        }
        digitBuffer = calculation;
        variablesToCalculate = [];
        out.textContent = digitBuffer;
    }
}
