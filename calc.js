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

function openHistory () { // сделать Event
    const screenHistory = document.createElement('ul')
    if (historyOpen === false) {
        historyOpen = true; // Переместить в конец
        closeScreenHistory.textContent = 'Закрыть' //Переместить в конец
        document.querySelector('.calc-screen span').remove()
        screenHistory.className = "history-screen";
        for (let i = 0; i < historyOutput.length; i++) {
            screenHistory.innerHTML += `<li>${historyOutput[i]} </li>`
        }
        document.querySelector('.calc-screen').append(screenHistory);

        document.querySelector('.calc-screen ul').onclick = OutputHistoryToTheCalcScreen;
        out.textContent = '';
        variablesToCalculate = []
        digitBuffer = '';
    } else {
        historyOpen = false; //Переместить в конец
        closeScreenHistory.textContent = 'История'//Переместить в конец
        document.querySelector('.calc-screen ul').remove()
        const screenSpan = document.createElement('span');
        document.querySelector('.calc-screen').append(screenSpan);
        out = screenSpan;
    }
}

//Я эту хуйню сам не пойм
function OutputHistoryToTheCalcScreen (e) { //имя функций с маленькой и вообще наименование говно а если класс calc screen поменяется, я вообще нихуя не пойму
    if (!(e.target.tagName === 'LI')) return;
    openHistory();
    let historyCalculation = e.target;
    let test2 = '='; //че такое тест2?
    // historyCalculation.textContent.split(test2).splice(0, 1);
    historyCalculation.textContent = [historyCalculation.textContent.split(test2).splice(0, 1)]; // смотреть на 46 | заебал начни смотреть на варнинги и вообще нахуй эта строчка?????? И вообще почему ты всегда на taxt content опираешься?
    variablesToCalculate = historyCalculation.textContent.split(' ');
    variablesToCalculate.pop()
    out.textContent = historyCalculation.textContent.split('=')[0];
}

//Ты даун? Какая ириска? нельзя написать deleteChar? или хотя быпросто delete
function erase () {
    console.log(digitBuffer);
    if (action.includes(variablesToCalculate[variablesToCalculate.length-1]) && digitBuffer === '') {
        variablesToCalculate.pop()
        out.textContent  = variablesToCalculate
    } else if (digitBuffer.length === 1) { // можно просто return без else if
        console.log(digitBuffer, 'yaya')
        out.textContent = variablesToCalculate.join(' ')
        digitBuffer = ''
    } else if (digitBuffer.length >= 2 ) { // можно просто return без else if
        digitBuffer = digitBuffer.slice(0, -1);
        out.textContent = variablesToCalculate.join(' ') + digitBuffer
        console.log(variablesToCalculate)
        console.log(digitBuffer)
    }
}

function clearAll() {
    digitBuffer = '';
    variablesToCalculate = [];
    out.textContent = '';
}

document.querySelector('.btn-history').onclick = openHistory;

document.querySelector('.delete-button-container img').onclick = erase;

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;
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
        console.log("После знака", variablesToCalculate)
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
            variablesToCalculate.splice(0, 3);
            variablesToCalculate.unshift(calculation.toString());
            console.log('Log after calculate: ', variablesToCalculate)
        }
        digitBuffer = calculation;
        variablesToCalculate = [];
        out.textContent = digitBuffer;
    }
}
// криво смотрится после вывода решение
