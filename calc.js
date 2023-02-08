const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '( )'];
const action = ['–', '+', '×', '÷', '+/-'];

let out = document.querySelector('.calc-screen span');
let calculation = '';
let variablesToCalculate = [];
let digitBuffer = '';

/// История
let historyBuffer = '';
const historyOutput = localStorage.getItem('historyOutput')?.split(',') ?? []
let closeScreenHistory = document.querySelector('.btn-history');
let historyOpen = false;

function openHistory () { // сделать Event
    const screenHistory = document.createElement('ul')
    if (historyOpen === false) {
        document.querySelector('.calc-screen span').remove()
        screenHistory.className = "history-screen";
        historyOpen = true;
        closeScreenHistory.textContent = 'Закрыть';
        for (let i = 0; i < historyOutput.length; i++) {
            screenHistory.innerHTML += `<li>${historyOutput[i]} </li>`
        }
        document.querySelector('.calc-screen').append(screenHistory);

        document.querySelector('.calc-screen ul').onclick = outputHistoryToScreen;
        out.textContent = '';
        variablesToCalculate = []
        digitBuffer = '';
    } else {
        document.querySelector('.calc-screen ul').remove()
        const screenSpan = document.createElement('span');
        document.querySelector('.calc-screen').append(screenSpan);
        out = screenSpan;
        historyOpen = false;
        closeScreenHistory.textContent = 'История'
    }
}

function outputHistoryToScreen (e) {
    if (e.target.tagName !== 'LI') return;
    openHistory();
    let historyCalculation = e.target;
    (historyCalculation.textContent)
    historyCalculation.textContent = historyCalculation.textContent.split('=').splice(0, 1).join(' ');
    variablesToCalculate = historyCalculation.textContent.trim().split(' ');
    out.textContent = historyCalculation.textContent.split('=')[0];
}


function deleteChar () {
    if (action.includes(variablesToCalculate[variablesToCalculate.length-1]) && digitBuffer === '') {
        variablesToCalculate.pop()
        out.textContent  = variablesToCalculate
        return;
    }
    if (digitBuffer.length === 1) {
        out.textContent = variablesToCalculate.join(' ')
        digitBuffer = ''
        return
    }
    if (digitBuffer.length >= 2 ) {
        digitBuffer = digitBuffer.slice(0, -1);
        out.textContent = variablesToCalculate.join(' ') + digitBuffer
    }
}

function clearAll() {
    digitBuffer = '';
    variablesToCalculate = [];
    out.textContent = '';
}

document.onkeyup = handleEnterKeyboard;

document.querySelector('.btn-history').onclick = openHistory;

document.querySelector('.delete-button-container img').onclick = deleteChar;

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = handleEnterClick;

function handleEnterClick (event) {
        if (!event.target.classList.contains('btn')) return;
        if (event.target.classList.contains('ac')) return;

        addKey(event.target.textContent)
}

function handleEnterKeyboard (event) {
        if (!(action.includes(event.key) || digit.includes(event.key))) return;

        addKey(event.key)
}

function addKey(key){
    out.textContent += key;

    if (digit.includes(key)) { // другой способ через split
        digitBuffer += key;
        historyBuffer += `${key} `;
    }
    if (action.includes(key) && digitBuffer !=='') {
        variablesToCalculate.push(digitBuffer);
        variablesToCalculate.push(key);
        historyBuffer += `${key} `;
        digitBuffer = '';
    } else if (action.includes(key)) { //
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
            historyOutput.push(`${value1} ${variablesToCalculate[1]} ${value2} = ${calculation}`);
            localStorage.setItem('historyOutput', historyOutput.toString())
            variablesToCalculate.splice(0, 3);
            variablesToCalculate.unshift(calculation.toString());
        }
        digitBuffer = calculation;
        variablesToCalculate = [];
        out.textContent = digitBuffer;
    }
}
