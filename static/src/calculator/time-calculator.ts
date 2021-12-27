import * as time from "./time";

const subResultEl = <HTMLParagraphElement>document.getElementById("calculator-result");
const subOperand1El = <HTMLInputElement>document.getElementById("calculator-operand-1");
const subOperand2El = <HTMLInputElement>document.getElementById("calculator-operand-2");
const subOperatorEl = <HTMLInputElement>document.getElementById("calculator-operator");

const subSubmitEl = <HTMLButtonElement>document.getElementById("calculator-submit-btn");
const subClearEl = <HTMLButtonElement>document.getElementById("calculator-clear-btn");
const subCopyEl = <HTMLButtonElement>document.getElementById("calculator-copy-btn");

subSubmitEl.addEventListener("click", calculate, false);
subClearEl.addEventListener("click", clearInputFields, false);
subCopyEl.addEventListener("click", copyResult, false);


subOperand1El.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        subSubmitEl.click();
    }
});

subOperand2El.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        subSubmitEl.click();
    }
});

subOperatorEl.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        subSubmitEl.click();
    }
});


function clearInputFields(): void {
    subOperand1El.value = "";
    subOperand2El.value = "";
    subOperatorEl.value = "";
}


function copyResult(): void {
    let result: string = subResultEl.innerHTML;
    navigator.clipboard.writeText(result);
}



function calculate(): number {
    let operand1: string = subOperand1El.value;
    let operand2: string = subOperand2El.value;
    let operator: string = subOperatorEl.value;

    if (time.isValidTime(operand1) && time.isValidTime(operand2)) {
        subResultEl.innerHTML = "";
    } else {
        subResultEl.innerHTML = "Invalid input!";
        return 1;
    }

    let time1: time.Time = time.stringToTime(operand1);
    let time2: time.Time = time.stringToTime(operand2);

    switch(operator) {
        case "+": {
            time.displayTime(time.addTime(time1, time2), subResultEl);
            break;
        } case "-": {
            time.displayTime(time.subtractTime(time1, time2), subResultEl);
            break;
        } case "*": {
            time.displayTime(time.multiplyTime(time1, time2), subResultEl);
            break;
        } case "/": {
            time.displayTime(time.dividingTime(time1, time2), subResultEl);
            break;
        } default: {
            subResultEl.innerHTML = "Invalid operator!";
            break;
        }
    }


    return 0;
}

