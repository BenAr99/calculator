let a = "";
let b = "";
let sign = ""; // знак
let finish = false;
let calculation = '';

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '( )'];
const action = ['-', '+', 'X', '/', '+/-'];
const variablesToCalculate = [a, b]
// экран

const out = document.querySelector('.calc-screen span');

const actionSign = [summation(), ]

function summation(value1, value2) {
    calculation = Number(value1) + Number(value2);
    a = calculation;
    console.log(calculation)
}

function subtraction (value1, value2) {
    calculation = value1 - value2;
    a = calculation;
    console.log(calculation)
}

function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

function signChange () {
    a = -a;
    if (b !== '') {
        b = -b;
        out.textContent = a + sign + b;
    }
    console.log(a)
    out.textContent = a;
    out.textContent = b;
}


document.querySelector('.plus-minus').onclick = signChange;

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return; // contains невразумив
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
            console.log(a)
        }
        else if (a!=='' && b!=='' && finish) {
            b = key;
            finish = false;
            out.textContent = a+sign+b;
        }
        if (a !== '' && sign !== '') {
            b += key;
            out.textContent = a + sign + b;
            console.log(a, sign, b);
        }
        // if (a !== '' && sign !== '' && b !== '') {
        //     for ( )
        // }
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = a + sign;
        console.log(a, sign, b)

    }


//     if (digit.includes(key)) {
//         if (b === '' && sign === '') {
//             a += key;
//             console.log(a, b, sign);
//             out.textContent = a;
//         } else if (a!=='' && b!=='' && finish) {
//             b = key;
//             finish = false;
//             out.textContent = a+sign+b;
//         }  else {
//             b += key;
//             out.textContent = a+sign+b;
//         }
//         console.log(a, b, sign)
//         return;
//     }
//
//     if (action.includes(key)) {
//         sign = key;
//         out.textContent = a+sign;
//         console.log(a, b, sign)
//         console.log('wadasa')
//         return;
//     }
//
// нажато =
        if (key === '=') {
            if (b === '') b = a;
            switch (sign){
                case "+":
                    summation(a, b);
                    break;
                case "-":
                    subtraction(variablesToCalculate)
                    break;
            }
            b = '';
            finish = true;
            out.textContent = calculation;
        }
    // if (key === '=') {
    //     if (b === '') b = a;
    //     switch (sign) {
    //         case "+":
    //             a = Number(a) + Number(b);
    //             break;
    //         case "/":
    //             if (b === '0') {
    //                 clearAll();
    //                 out.textContent = '∞'
    //                 return;
    //             }
    //             a = a / b;
    //             break;
    //         case "X":
    //             a = a * b;
    //             break;
    //         case "-":
    //             a = a - b;
    //             break;
    //     }
    //     b = '';
    //     finish = true;
    //     out.textContent = a;
    //     console.log(a, b, sign)
    // }

}
