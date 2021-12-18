let subResultEl = <HTMLParagraphElement>document.getElementById("calculator-result");
let subOperand1El = <HTMLInputElement>document.getElementById("calculator-operand-1");
let subOperand2El = <HTMLInputElement>document.getElementById("calculator-operand-2");
let subOperatorEl = <HTMLInputElement>document.getElementById("calculator-operator");

let subSubmitEl = <HTMLButtonElement>document.getElementById("calculator-submit-btn");
let subClearEl = <HTMLButtonElement>document.getElementById("calculator-clear-btn");
let subCopyEl = <HTMLButtonElement>document.getElementById("calculator-copy-btn");

subSubmitEl.addEventListener("click", main, false);
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



function main(): number {
    let operand1: string = subOperand1El.value;
    let operand2: string = subOperand2El.value;
    let operator: string = subOperatorEl.value;

    if (isValidTime(operand1) && isValidTime(operand2)) {
        subResultEl.innerHTML = "";
    } else {
        subResultEl.innerHTML = "Invalid input!";
        return 1;
    }

    let time1: Time = stringToTime(operand1);
    let time2: Time = stringToTime(operand2);

    switch(operator) {
        case "+": {
            displayTime(addTime(time1, time2), subResultEl);
            break;
        } case "-": {
            displayTime(subtractTime(time1, time2), subResultEl);
            break;
        } case "*": {
            displayTime(multiplyTime(time1, time2), subResultEl);
            break;
        } case "/": {
            displayTime(dividingTime(time1, time2), subResultEl);
            break;
        } default: {
            subResultEl.innerHTML = "Invalid operator!";
            break;
        }
    }


    return 0;
}
