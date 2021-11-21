type Time  = {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;

};


function isValidTime(time: string): boolean {
    // Empty time
    if (time.length === 0) {
        return false;
    }

    let i: number;
    const regex: RegExp = /[0-9.:]/
    for (i = 0; i < time.length; ++i) {
        if (time[i].match(regex) === null) {
            return false;
        }
    }

    if (time.split(":").length >= 5) {
        return false;
    }

    return true;
}


function stringToTime(string: string): Time {
    let time: Time = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0
    };
    let time_arr: Array<string> = string.split(":");

    time.seconds = (Number(time_arr[time_arr.length - 1])) ? Number(time_arr[time_arr.length - 1]) : 0;
    time.minutes = (Number(time_arr[time_arr.length - 2])) ? Number(time_arr[time_arr.length - 2]) : 0;
    time.hours = (Number(time_arr[time_arr.length - 3])) ? Number(time_arr[time_arr.length - 3]) : 0;
    time.days = (Number(time_arr[time_arr.length - 4])) ? Number(time_arr[time_arr.length - 4]) : 0;

    console.log(time);

    return time;
}


function returnSecondsInTime(time: Time): number {
    let result: number = 0;

    result += time.minutes * 60;

    result += time.hours * 60 * 60;

    result += time.days * 60 * 60 * 24;

    result += time.seconds;

    return result;
}


function formatTime(time: Time): void { // TODO Work with negative numbers. Absolute value
    while (time.seconds > 60 * 60 * 24) {
        time.seconds -= 60 * 60 * 24;
        ++time.days;
    }

    while (time.seconds > 60 * 60) {
        time.seconds -= 60 * 60;
        ++time.hours;
    }

    while (time.seconds > 60) {
        time.seconds -= 60;
        ++time.minutes;
    }
}


function addTime(time1: Time, time2: Time): Time {
    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) + returnSecondsInTime(time2);
    formatTime(result);
    return result;
}

function subtractTime(time1: Time, time2: Time): Time {
    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) - returnSecondsInTime(time2);
    formatTime(result);
    return result;
}

function multiplyTime(time1: Time, time2: Time): Time {
    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) * returnSecondsInTime(time2);
    formatTime(result);
    return result;
}

function dividingTime(time1: Time, time2: Time): Time {
    if (returnSecondsInTime(time2) === 0) {
        return null;
    }

    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) / returnSecondsInTime(time2);
    formatTime(result);
    return result;
}


function displayTime(time: Time, paragraph: HTMLParagraphElement): void {
    let displayString: string = "";

    if (time.days !== 0) {
        displayString += String(time.days) + ":";
        displayString += String(time.hours) + ":";
        displayString += String(time.minutes) + ":";
        displayString += String(time.seconds);
    } else if (time.hours !== 0) {
        displayString += String(time.hours) + ":";
        displayString += String(time.minutes) + ":";
        displayString += String(time.seconds);
    } else if (time.minutes !== 0) {
        displayString += String(time.minutes) + ":";
        displayString += String(time.seconds);
    } else if (time.seconds !== 0) {
        displayString += String(time.seconds);
    }

    paragraph.innerHTML = displayString;
}
