export function returnNameMatchIndex(tzName, tzObj) {
    const tzLength = tzObj.length;
    let i;
    for (i = 0; i < tzLength; ++i) {
        if (tzName === tzObj[i].name) {
            return i;
        }
    }
    return -1;
}
export function returnAbbrMatchIndex(tzAbbr, tzObj) {
    const tzLength = tzObj.length;
    let i;
    for (i = 0; i < tzLength; ++i) {
        if (tzAbbr === tzObj[i].abbr) {
            return i;
        }
    }
    return -1;
}
export function returnOffsMatchIndex(tzOffs, tzObj) {
    const tzLength = tzObj.length;
    let i;
    for (i = 0; i < tzLength; ++i) {
        if (tzOffs === tzObj[i].offs) {
            return i;
        }
    }
    return -1;
}
export function formatDate(date) {
    return date.getHours() + ":" +
        date.getMinutes() + "&nbsp;&nbsp;&nbsp;" +
        date.getDate() + "." +
        (date.getMonth() + 1) + "." +
        date.getFullYear();
}
export function parseDate(input) {
    const time = input.split(" ")[0];
    const minutes = parseFloat(time.split(":")[1]);
    const hours = parseFloat(time.split(":")[0]);
    const date = input.split(" ")[1];
    const day = parseFloat(date.split(".")[0]);
    const month = parseFloat(date.split(".")[1]);
    console.log(month);
    const newDate = new Date();
    newDate.setMinutes(minutes);
    newDate.setHours(hours);
    newDate.setDate(day);
    newDate.setMonth(month - 1);
    return newDate;
}
//# sourceMappingURL=tz.js.map