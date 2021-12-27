export type Time  = {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;

};


export function isValidTime(time: string): boolean {
    // Empty time
    if (time.length === 0) {
        return false;
    }

    let i: number;
    const regex: RegExp = /[0-9,.:-]/
    for (i = 0; i < time.length; ++i) {
        if (time[i].match(regex) === null) {
            return false;
        }
    }

    // Checks if more than two  of (commas + period)
    if ((time.split(/\./).length + time.split(/,/).length) >= 4) {
        return false;
    }

    if (time.split(":").length >= 5) {
        return false;
    }

    return true;
}


export function stringToTime(string: string): Time {
    if (string.match(",") !== null) {
        string = string.replace(",", ".");
    }

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


    return time;
}


export function returnSecondsInTime(time: Time): number {
    let result: number = 0;

    result += time.minutes * 60;

    result += time.hours * 60 * 60;

    result += time.days * 60 * 60 * 24;

    result += time.seconds;

    return result;
}


export function formatTime(time: Time): void {
    while (Math.abs(time.seconds) > 60 * 60 * 24) {
        if (time.seconds > 0) {
            time.seconds -= 60 * 60 * 24;
            ++time.days;
        } else {
            time.seconds += 60 * 60 * 24;
            --time.days;
        }
    }

    while (Math.abs(time.seconds) > 60 * 60) {
        if (time.seconds > 0) {
            time.seconds -= 60 * 60;
            ++time.hours;
        } else {
            time.seconds += 60 * 60;
            --time.hours;
        }
    }

    while (Math.abs(time.seconds) > 60) {
        if (time.seconds > 0) {
            time.seconds -= 60;
            ++time.minutes;
        } else {
            time.seconds += 60;
            --time.minutes;
        }
    }
}


export function addTime(time1: Time, time2: Time): Time {
    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) + returnSecondsInTime(time2);
    formatTime(result);
    return result;
}

export function subtractTime(time1: Time, time2: Time): Time {
    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) - returnSecondsInTime(time2);
    formatTime(result);
    return result;
}

export function multiplyTime(time1: Time, time2: Time): Time {
    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) * returnSecondsInTime(time2);
    formatTime(result);
    return result;
}

export function dividingTime(time1: Time, time2: Time): Time {
    if (returnSecondsInTime(time2) === 0) {
        return {seconds: 0, minutes: 0, hours: 0, days: 0};
    }

    let result: Time = {seconds: 0, minutes: 0, hours: 0, days: 0};

    result.seconds = returnSecondsInTime(time1) / returnSecondsInTime(time2);
    formatTime(result);
    return result;
}


export function displayTime(time: Time, paragraph: HTMLParagraphElement): void {
    let displayString: string = "";

    if (time.days !== 0) {
        displayString += String(time.days) + ":";
        displayString += String(time.hours) + ":";
        displayString += String(time.minutes) + ":";
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    } else if (time.hours !== 0) {
        displayString += String(time.hours) + ":";
        displayString += String(time.minutes) + ":";
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    } else if (time.minutes !== 0) {
        displayString += String(time.minutes) + ":";
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    } else if (time.seconds !== 0) {
        displayString += String(parseFloat(time.seconds.toFixed(3)));
    }


    if (displayString.match(/-/) !== null) {
        displayString = displayString.replace(/-/g, "");
        displayString = "-" + displayString;
    }

    paragraph.innerHTML = displayString;
}
