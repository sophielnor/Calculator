function addClickListenersByClass(className, handler) {
    const elements = document.getElementsByClassName(className);
    for (let element of elements) {
        element.addEventListener('click', handler);
    }
}

// Operation Button Handler - Keeps answer after calculation
addClickListenersByClass("operation", function () {
    const lastCalc = document.getElementById('previousCalculation').innerText;
    const currentCalc = document.getElementById('currentCalculation').innerText;

    if (lastCalc.trim().endsWith('=')) {
        const newCalc = lastCalc + ' ' + currentCalc;
        document.getElementById('previousCalculation').innerText = newCalc;

        const newElement = document.createElement('div');
        newElement.classList.add('historyItem')
        newElement.innerText = newCalc;

        newElement.addEventListener('click', function () {
            document.getElementById('currentCalculation').innerText = newElement.innerText;
            newElement.remove();
        });

        document.getElementById('historyDiv').insertBefore(newElement, document.getElementById('historyDiv').firstChild);
    }
});

// Reset Handler - Sets currentCalculation to 0
addClickListenersByClass("reset", function () {
    const lastCalc = document.getElementById('previousCalculation').innerText;
    const currentCalc = document.getElementById('currentCalculation').innerText;

    if (lastCalc.trim().endsWith('=')) {
        const newCalc = lastCalc + ' ' + currentCalc;
        document.getElementById('previousCalculation').innerText = newCalc;
        document.getElementById('currentCalculation').innerText = '0';

        const newElement = document.createElement('div');
        newElement.className = 'historyItem';
        newElement.innerText = newCalc;

        newElement.addEventListener('click', function () {
            document.getElementById('currentCalculation').innerText = newElement.innerText;
            newElement.remove();
        });

        document.getElementById('historyDiv').insertBefore(newElement, document.getElementById('historyDiv').firstChild);
    }
});

//Integer check operation, checks if currentCalculation=='0' before adding an integer
function appendInteger(num) {
    const display = document.getElementById('currentCalculation');
    if (display.innerText === '0') {
        display.innerText = num;
    } else {
        display.innerText += num;
    }
}
document.getElementById('one').addEventListener('click', () => appendInteger('1'));
document.getElementById('two').addEventListener('click', () => appendInteger('2'));
document.getElementById('three').addEventListener('click', () => appendInteger('3'));
document.getElementById('four').addEventListener('click', () => appendInteger('4'));
document.getElementById('five').addEventListener('click', () => appendInteger('5'));
document.getElementById('six').addEventListener('click', () => appendInteger('6'));
document.getElementById('seven').addEventListener('click', () => appendInteger('7'));
document.getElementById('eight').addEventListener('click', () => appendInteger('8'));
document.getElementById('nine').addEventListener('click', () => appendInteger('9'));
//Integer check operation, checks if currentCalculation=='0' before adding an integer

//number buttons and numerical operations
document.getElementById('zero').addEventListener('click', function() {
    const cannotAddZero = / 0$/; //checks if last two letters are ' 0' as 00 is not a valid number
    if (cannotAddZero.test(document.getElementById('currentCalculation').innerText))
        return;
document.getElementById('currentCalculation').innerText += '0'
})
document.getElementById('multiply').addEventListener('click', function() {
    document.getElementById('currentCalculation').innerText += ' X '
})
document.getElementById('divide').addEventListener('click', function() {
    document.getElementById('currentCalculation').innerText += ' / '
})
document.getElementById('add').addEventListener('click', function() {
    document.getElementById('currentCalculation').innerText += ' + '
})
//subtract
document.getElementById('subtract').addEventListener('click', function() {
    const currentCalcElem = document.getElementById('currentCalculation');
    let currentCalc = currentCalcElem.innerText;

    if (currentCalc.endsWith('.') || currentCalc.endsWith('-')) {
        // Do nothing if the last character is '.' or if the last character is '-'
        return;
    } else if (currentCalc.endsWith(' ')) {
        currentCalcElem.innerText += '-'; // Add '-' if there is already an operation
        } else {
            currentCalcElem.innerText += ' - '; // Add ' - '
        }
});
//subtract
//number buttons and numerical operations


//decimal
document.getElementById('decimal').addEventListener('click', function() {
    const currentCalcElem = document.getElementById('currentCalculation');
    let currentCalc = currentCalcElem.innerText;

    if (currentCalc.endsWith('.') || currentCalc.endsWith('-') || currentCalc.endsWith(' ')){
        // Do nothing if the last character is '.', '' or an operation
        return;
    } else if (currentCalc.length === 0 || currentCalc.endsWith(' ')) {
        currentCalcElem.innerText = '0.'; 
        } else {
            currentCalcElem.innerText += '.';
        }
});
//decimal

//equals
document.getElementById('equals').addEventListener('click', function() {
    const currentCalc = document.getElementById('currentCalculation').innerText;
    const previousCalc = document.getElementById('previousCalculation');

    // Regular expression to validate calculation
    const validCalculationRegex = /-?\d+(\.\d+)?(\s*[\+\-X\/]\s*-?\d+(\.\d+)?)+/

    if (validCalculationRegex.test(currentCalc)) {
        // Evaluate the calculation
        const result = eval(currentCalc.replace(/X/g, '*')); // Replace 'X' with '*'
        previousCalc.innerText = currentCalc + ' =';
        previousCalc.style.visibility = "visible"
        document.getElementById('currentCalculation').innerText = result;
    } else {
        alert('Invalid calculation!');
    }
});
//equals

// Clear
        const clear = () => {
            document.getElementById("currentCalculation").innerText = "0";
            document.getElementById("previousCalculation").innerText = "0";
            document.getElementById("previousCalculation").style.visibility = "hidden";
            const historyItems = document.querySelectorAll(".historyItem");
            historyItems.forEach(item => item.remove());
        };
        document.getElementById('clear').addEventListener('click', clear);
// Clear
    
// Clear entery
const clearEntry = () => {
    document.getElementById("currentCalculation").innerText = "0";
}
        document.getElementById('clearEntry').addEventListener('click', clearEntry)
// Clear entery    

// backspace
document.getElementById("backspace").addEventListener('click', function() {
    const previousCalc = document.getElementById('previousCalculation');
    const currentCalc = document.getElementById('currentCalculation');

    if (previousCalc.innerText.endsWith('=')) {
        currentCalc.innerText = previousCalc.innerText.slice(0, -2); // Remove '=' and last character
        previousCalc.innerText = '0';
        previousCalc.style.display = 'none';
    } else {
        if (currentCalc.innerText !== '0') {
            if (currentCalc.innerText.endsWith(' ')) {
                currentCalc.innerText = currentCalc.innerText.slice(0, -3); // Remove last 3 characters
            } else {
                currentCalc.innerText = currentCalc.innerText.slice(0, -1); // Remove last character
                if (currentCalc.innerText==="") {currentCalc.innerText = '0'}
            }
        }
    }
});
//backspace
        
//history
    document.getElementById('history').addEventListener('click', () => {
        if (document.getElementById("historyDiv").classList.contains("hidden")) {
            document.getElementById("historyDiv").classList.remove("hidden")
            document.getElementById("background").classList.remove("md:w-2/3", "lg:w-1/2", "xl:w-4/10")
            document.getElementById("background").classList.add("md:w-full", "lg:w-2/3", "xl:w-1/2")
            document.getElementById("keyboard").classList.add("mb-0")
        }
        else {
        document.getElementById("historyDiv").classList.add("hidden")
        document.getElementById("background").classList.remove("md:w-full", "lg:w-2/3", "xl:w-1/2")
        document.getElementById("background").classList.add("md:w-2/3", "lg:w-1/2", "xl:w-4/10")
        document.getElementById("keyboard").classList.remove("mb-0")
        }
    });
//history