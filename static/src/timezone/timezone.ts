import * as tz from "./tz";

const tzResultEl = <HTMLParagraphElement>document.getElementById("timezone-result");

const tzOperandEl: HTMLInputElement[] = [
    <HTMLInputElement>document.getElementById("timezone-input-tz-1"),
    <HTMLInputElement>document.getElementById("timezone-input-tz-2")
];

const tzDateEl = <HTMLInputElement>document.getElementById("timezone-input-date");

const tzOffsetEl: HTMLParagraphElement[] = [
    <HTMLParagraphElement>document.getElementById("timezone-offset-1"),
    <HTMLParagraphElement>document.getElementById("timezone-offset-2")
];

const tzSetCurrentEl = <HTMLButtonElement>document.getElementById("timezone-current-btn");

const tzDataListEl = <HTMLDataListElement>document.getElementById("timezone-list");


// XMLHttpRequest
const oReq: XMLHttpRequest = new XMLHttpRequest;
let tzObj: any;

oReq.addEventListener("load", transferComplete);
oReq.addEventListener("error", transferFailed);
oReq.addEventListener("abort", transferCancled);

oReq.open("GET", "http://127.0.0.1:3000/json/timezones.json");
oReq.send();


function transferComplete() {
    console.log(oReq.response);
    tzObj = JSON.parse(oReq.response);
    addAbbrToDatalist();
}

function transferFailed(): void {
    console.log("An error occured while transferring file");
}

function transferCancled(): void {
    console.log("Transfer has been cancled");
}



tzSetCurrentEl.addEventListener("click", setCurrentTime, false);

tzOperandEl[0].addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        calculate();
    }
});

tzOperandEl[1].addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        calculate();
    }
});

tzDateEl.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        calculate();
    }
});



function setCurrentTime(): void {
    const date: Date = new Date();
    tzDateEl.value = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + (date.getMonth() + 1);
}


function addAbbrToDatalist(): void {
    let i: number;
    let dataList: string = '';
    for (i = 0; i < tzObj.timezones.length; ++i) {
        dataList += '<option value="' + tzObj.timezones[i].name + '" label="' + 
            tzObj.timezones[i].abbr + "&nbsp;&nbsp;" + 
            tzObj.timezones[i].name +
            '">';
    }
    dataList += '<option value="TEST" label="Testing label">';

    tzDataListEl.innerHTML = dataList;
    return;
}


function calculate(): void {
    const tzAbbrInput: string[] = [
        tzOperandEl[0].value, 
        tzOperandEl[1].value
    ];

    let tzOffs: number[] = [0, 0];
    console.log(tzAbbrInput[0]);
    console.log(tzAbbrInput[1]);
    let index: number[] = [-1, -1];
    let i: number;
    let timezoneDifference: number;
    
    {
        let exit: boolean = false;
        for (i = 0; i < tzAbbrInput.length; ++i) {
            if ((index[i] = tz.returnNameMatchIndex(tzAbbrInput[i], tzObj.timezones)) != -1) {
                tzOffsetEl[i].textContent = "UTC" + tzObj.timezones[index[i]].offs; 
                tzOffs[i] = tzObj.timezones[index[i]].offs;
            } else {
                tzOffsetEl[i].textContent = "Invalid";
                exit = true;
            }
        }

        if (exit) { return };
    }

    timezoneDifference = (tzOffs[0] > tzOffs[1]) ? tzOffs[1] - tzOffs[0] : tzOffs[0] - tzOffs[1];
    console.log(timezoneDifference);

    const userDate: Date = tz.parseDate(tzDateEl.value);
    userDate.setHours(userDate.getHours() + timezoneDifference);
    tzResultEl.innerHTML = tz.formatDate(userDate);
}

