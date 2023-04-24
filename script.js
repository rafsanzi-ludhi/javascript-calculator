const currentInput = document.querySelector('.current-input');
const resultOutput = document.querySelector('.result-output');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const answerButton = document.querySelector('.answer');
const equalButton = document.querySelector('.equal');

class Calculator {
    constructor(currentInput, resultOutput) {
        this.currentInputSaved = currentInput;
        this.resultOutputSaved = resultOutput;
        this.clear();
    }

    clear() {
        this.currentInputSaved = '';
        this.resultOutputSaved = '';
        this.operatorSaved = undefined;
    }

    delete() {
        this.currentInputSaved = this.currentInputSaved.toString().slice(0, -1); //converts the current input to a string and deletes the last character
    }

    equal() {
        const postfix = this.toPostfix(this.currentInputSaved);
        const result = this.evaluatePostfix(postfix);
        this.resultOutputSaved = result;
    }

    operators(operator) {
    if (this.currentInputSaved === '' && operator === '-') {
        this.currentInputSaved = '-';
        return;
    }
    if (this.currentInputSaved === '') return;
    if (this.resultOutputSaved !== '') {
        this.currentInputSaved = this.resultOutputSaved;
        this.resultOutputSaved = '';
    }
    this.currentInputSaved += operator;
}


    appendNumber(number) {
        if (number === '.' && this.currentInputSaved.includes('.')) return; //checks if the current input already contains a decimal point and returns if it does
        this.currentInputSaved = this.currentInputSaved.toString() + number.toString(); //converts the number to a string and appends it to the current input
    }

    toPostfix(expression) {
        const precedence = {
            '^': 4,
            '*': 3,
            '÷': 3,
            '+': 2,
            '-': 2,
        };

        const output = [];
        const operators = [];

        let numberBuffer = [];
        let isNegative = false;

        for (let token of expression) {
            if (token === '-' && (numberBuffer.length === 0 || '*/+-'.includes(expression[expression.indexOf(token) - 1]))) {
                isNegative = true;
                continue;
            }

            if ('0123456789.'.includes(token)) {
                numberBuffer.push(token);
            } else {
                if (numberBuffer.length > 0) {
                    const number = isNegative ? '-' + numberBuffer.join('') : numberBuffer.join('');
                    output.push(number);
                    numberBuffer = [];
                    isNegative = false;
                }

                while (operators.length > 0 && precedence[token] <= precedence[operators[operators.length - 1]]) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }

        if (numberBuffer.length > 0) {
            const number = isNegative ? '-' + numberBuffer.join('') : numberBuffer.join('');
            output.push(number);
        }

        while (operators.length > 0) {
            output.push(operators.pop());
        }

        return output.join(' ');
    }


   evaluatePostfix(postfix) {
    const stack = [];

    postfix.split(' ').forEach((token) => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '÷':
                    stack.push(a / b);
                    break;
                case '^':
                    stack.push(Math.pow(a, b));
                    break;
            }
        }
    });

    return stack.pop();
    }


    updateDisplay() {
        currentInput.innerText = this.currentInputSaved;
        resultOutput.innerText = this.resultOutputSaved;
    }

}

const calculator = new Calculator(currentInput, resultOutput);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        console.log(calculator);
    });
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.operators(operator.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calculator.equal();
    calculator.updateDisplay();
});

