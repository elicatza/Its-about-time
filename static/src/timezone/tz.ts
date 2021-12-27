export function returnNameMatchIndex(tzName: string, tzObj: any): number {
    const tzLength: number = tzObj.length;

    let i: number;
    for (i = 0; i < tzLength; ++i) {
        if (tzName === tzObj[i].name) {
            return i;
        }
    }

    return -1;
}

export function returnAbbrMatchIndex(tzAbbr: string, tzObj: any): number {
    const tzLength: number = tzObj.length;

    let i: number;
    for (i = 0; i < tzLength; ++i) {
        if (tzAbbr === tzObj[i].abbr) {
            return i;
        }
    }

    return -1;
}

export function returnOffsMatchIndex(tzOffs: string, tzObj: any): number {
    const tzLength: number = tzObj.length;

    let i: number;
    for (i = 0; i < tzLength; ++i) {
        if (tzOffs === tzObj[i].offs) {
            return i;
        }
    }

    return -1;
}

export function stringToDate(date: string): Date {
    return new Date();
}


// YYYY:MM:DD hh:mm
export function formatDate(date: Date): string {
    return date.getHours() + ":" +
        date.getMinutes() + "&nbsp;&nbsp;&nbsp;" +
        date.getDate() + "." +
        date.getMonth() + "." +
        date.getFullYear();
}

export function parseDate(input: string): Date {
    const time: string = input.split(" ")[0];
    const minutes: number = parseFloat(time.split(":")[1]);
    const hours: number = parseFloat(time.split(":")[0]);

    const date: string = input.split(" ")[1];
    const day: number = parseFloat(date.split(".")[0]);
    const month: number = parseFloat(date.split(".")[1]);

    const newDate: Date = new Date();
    newDate.setMinutes(minutes);
    newDate.setHours(hours);
    newDate.setDate(day);
    newDate.setMonth(month);
    return newDate;
}
