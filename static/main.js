var subResultEl = document.getElementById("calculator-result");
var subOperand1El = document.getElementById("calculator-operand-1");
var subOperand2El = document.getElementById("calculator-operand-2");
var subOperatorEl = document.getElementById("calculator-operator");
var subSubmitEl = document.getElementById("calculator-submit-btn");
var subClearEl = document.getElementById("calculator-clear-btn");
var subCopyEl = document.getElementById("calculator-copy-btn");
subSubmitEl.addEventListener("click", main, false);
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
    var result = subResultEl.innerHTML;
    navigator.clipboard.writeText(result);
}
function main() {
    var operand1 = subOperand1El.value;
    var operand2 = subOperand2El.value;
    var operator = subOperatorEl.value;
    if (isValidTime(operand1) && isValidTime(operand2)) {
        subResultEl.innerHTML = "";
    }
    else {
        subResultEl.innerHTML = "Invalid input!";
        return 1;
    }
    var time1 = stringToTime(operand1);
    var time2 = stringToTime(operand2);
    switch (operator) {
        case "+": {
            displayTime(addTime(time1, time2), subResultEl);
            break;
        }
        case "-": {
            displayTime(subtractTime(time1, time2), subResultEl);
            break;
        }
        case "*": {
            displayTime(multiplyTime(time1, time2), subResultEl);
            break;
        }
        case "/": {
            displayTime(dividingTime(time1, time2), subResultEl);
            break;
        }
        default: {
            subResultEl.innerHTML = "Invalid operator!";
            break;
        }
    }
    return 0;
}
function isValidTime(time) {
    if (time.length === 0) {
        return false;
    }
    var i;
    var regex = /[0-9,.:-]/;
    for (i = 0; i < time.length; ++i) {
        if (time[i].match(regex) === null) {
            return false;
        }
    }
    if ((time.split(/\./).length + time.split(/,/).length) >= 4) {
        return false;
    }
    if (time.split(":").length >= 5) {
        return false;
    }
    return true;
}
function stringToTime(string) {
    if (string.match(",") !== null) {
        string = string.replace(",", ".");
    }
    var time = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0
    };
    var time_arr = string.split(":");
    time.seconds = (Number(time_arr[time_arr.length - 1])) ? Number(time_arr[time_arr.length - 1]) : 0;
    time.minutes = (Number(time_arr[time_arr.length - 2])) ? Number(time_arr[time_arr.length - 2]) : 0;
    time.hours = (Number(time_arr[time_arr.length - 3])) ? Number(time_arr[time_arr.length - 3]) : 0;
    time.days = (Number(time_arr[time_arr.length - 4])) ? Number(time_arr[time_arr.length - 4]) : 0;
    return time;
}
function returnSecondsInTime(time) {
    var result = 0;
    result += time.minutes * 60;
    result += time.hours * 60 * 60;
    result += time.days * 60 * 60 * 24;
    result += time.seconds;
    return result;
}
function formatTime(time) {
    while (Math.abs(time.seconds) > 60 * 60 * 24) {
        if (time.seconds > 0) {
            time.seconds -= 60 * 60 * 24;
            ++time.days;
        }
        else {
            time.seconds += 60 * 60 * 24;
            --time.days;
        }
    }
    while (Math.abs(time.seconds) > 60 * 60) {
        if (time.seconds > 0) {
            time.seconds -= 60 * 60;
            ++time.hours;
        }
        else {
            time.seconds += 60 * 60;
            --time.hours;
        }
    }
    while (Math.abs(time.seconds) > 60) {
        if (time.seconds > 0) {
            time.seconds -= 60;
            ++time.minutes;
        }
        else {
            time.seconds += 60;
            --time.minutes;
        }
    }
}
function addTime(time1, time2) {
    var result = { seconds: 0, minutes: 0, hours: 0, days: 0 };
    result.seconds = returnSecondsInTime(time1) + returnSecondsInTime(time2);
    formatTime(result);
    return result;
}
function subtractTime(time1, time2) {
    var result = { seconds: 0, minutes: 0, hours: 0, days: 0 };
    result.seconds = returnSecondsInTime(time1) - returnSecondsInTime(time2);
    formatTime(result);
    return result;
}
function multiplyTime(time1, time2) {
    var result = { seconds: 0, minutes: 0, hours: 0, days: 0 };
    result.seconds = returnSecondsInTime(time1) * returnSecondsInTime(time2);
    formatTime(result);
    return result;
}
function dividingTime(time1, time2) {
    if (returnSecondsInTime(time2) === 0) {
        return null;
    }
    var result = { seconds: 0, minutes: 0, hours: 0, days: 0 };
    result.seconds = returnSecondsInTime(time1) / returnSecondsInTime(time2);
    formatTime(result);
    return result;
}
function displayTime(time, paragraph) {
    var displayString = "";
    if (time.days !== 0) {
        displayString += String(time.days) + ":";
        displayString += String(time.hours) + ":";
        displayString += String(time.minutes) + ":";
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    }
    else if (time.hours !== 0) {
        displayString += String(time.hours) + ":";
        displayString += String(time.minutes) + ":";
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    }
    else if (time.minutes !== 0) {
        displayString += String(time.minutes) + ":";
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    }
    else if (time.seconds !== 0) {
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    }
    if (displayString.match(/-/) !== null) {
        displayString = displayString.replace(/-/g, "");
        displayString = "-" + displayString;
    }
    paragraph.innerHTML = displayString;
}
//# sourceMappingURL=main.js.map