// script.js
const currentInput = document.querySelector('.current-input');
const resultOutput = document.querySelector('.result-input');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const answerButton = document.querySelector('.answer');
const equalButton = document.querySelector('.equal');

class Calculator { //creates a calculator class
    constructor(currentInput, resultOutput) { 
        this.currentInput = currentInput; //assigns the current input variable to the current input property
        this.resultOutput = resultOutput; //assigns the result output variable to the result output property
        this.clear(); //calls the clear method
    }

    clear() { //clears the current input and result output
        this.currentInput = ''; //sets the current input to an empty string
        this.resultOutput = ''; //sets the result output to an empty string
        this.operator = undefined; //sets the operator to undefined
    }

    delete() { //deletes the last character of the current input
    
    }

    equal() { //calculates the result
    
    }

    operators() { //adds the operator to the current input

    }

    appendNumber(number) { //appends the number to the current input
        if (number === '.' && this.currentInput.includes('.')) return; //checks if the current input already contains a decimal point and returns if it does
        this.currentInput = this.currentInput.toString() + number.toString(); //converts the number to a string and appends it to the current input
    }

    updateDisplay() { //updates the display
        currentInput.innerText = this.currentInput; //sets the current input to the current input property
    }
}

const calculator = new Calculator(currentInput, resultOutput); //creates a new calculator object

numberButtons.forEach(button => { //adds an event listener to each number button
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); //calls the numbers method
        calculator.updateDisplay(); //calls the update display method
        console.log(calculator); //logs the calculator object to the console
    })
});

clearButton.addEventListener('click', () => { //adds an event listener to the clear button
    calculator.clear(); //calls the clear method
    calculator.updateDisplay(); //calls the update display method
});

