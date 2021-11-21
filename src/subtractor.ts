let subResultEl = <HTMLParagraphElement>document.getElementById("subtractor-result");
let subOperand1El = <HTMLInputElement>document.getElementById("subtractor-operand-1");
let subOperand2El = <HTMLInputElement>document.getElementById("subtractor-operand-2");

let subSubmitEl = <HTMLButtonElement>document.getElementById("subtractor-submit-btn");
let subClearEl = <HTMLButtonElement>document.getElementById("subtractor-clear-btn");
let subCopyEl = <HTMLButtonElement>document.getElementById("subtractor-copy-btn");

subSubmitEl.addEventListener("click", main, false);
subClearEl.addEventListener("click", clearInputFields, false);
subCopyEl.addEventListener("click", copyResult, false);


function clearInputFields(): void {
    subOperand1El.value = "";
    subOperand2El.value = "";
}


function copyResult(): void {
    let result: string = subResultEl.innerHTML;
    navigator.clipboard.writeText(result);
}



function main(): number {
    let operand1: string = subOperand1El.value;
    let operand2: string = subOperand2El.value;
    console.log("Field1: " + operand1);
    console.log("Field2: " + operand2);

    if (isValidTime(operand1) && isValidTime(operand2)) {
        subResultEl.innerHTML = "";
    } else {
        subResultEl.innerHTML = "Invalid input!";
        return 1;
    }

    let time1: Time = stringToTime(operand1);
    let time2: Time = stringToTime(operand2);
    console.log(subtractTime(time1, time2));
    displayTime(subtractTime(time1, time2), subResultEl);



    return 0;
}
