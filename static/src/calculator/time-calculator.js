import * as time from "./time";
const subResultEl = document.getElementById("calculator-result");
const subOperand1El = document.getElementById("calculator-operand-1");
const subOperand2El = document.getElementById("calculator-operand-2");
const subOperatorEl = document.getElementById("calculator-operator");
const subSubmitEl = document.getElementById("calculator-submit-btn");
const subClearEl = document.getElementById("calculator-clear-btn");
const subCopyEl = document.getElementById("calculator-copy-btn");
subSubmitEl.addEventListener("click", calculate, false);
subClearEl.addEventListener("click", clearInputFields, false);
subCopyEl.addEventListener("click", copyResult, false);
subOperand1El.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        subSubmitEl.click();
    }
});
subOperand2El.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        subSubmitEl.click();
    }
});
subOperatorEl.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        subSubmitEl.click();
    }
});
function clearInputFields() {
    subOperand1El.value = "";
    subOperand2El.value = "";
    subOperatorEl.value = "";
}
function copyResult() {
    let result = subResultEl.innerHTML;
    navigator.clipboard.writeText(result);
}
function calculate() {
    let operand1 = subOperand1El.value;
    let operand2 = subOperand2El.value;
    let operator = subOperatorEl.value;
    if (time.isValidTime(operand1) && time.isValidTime(operand2)) {
        subResultEl.innerHTML = "";
    }
    else {
        subResultEl.innerHTML = "Invalid input!";
        return 1;
    }
    let time1 = time.stringToTime(operand1);
    let time2 = time.stringToTime(operand2);
    switch (operator) {
        case "+": {
            time.displayTime(time.addTime(time1, time2), subResultEl);
            break;
        }
        case "-": {
            time.displayTime(time.subtractTime(time1, time2), subResultEl);
            break;
        }
        case "*": {
            time.displayTime(time.multiplyTime(time1, time2), subResultEl);
            break;
        }
        case "/": {
            time.displayTime(time.dividingTime(time1, time2), subResultEl);
            break;
        }
        default: {
            subResultEl.innerHTML = "Invalid operator!";
            break;
        }
    }
    return 0;
}
//# sourceMappingURL=time-calculator.js.map