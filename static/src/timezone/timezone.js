import * as tz from "./tz";
const tzResultEl = document.getElementById("timezone-result");
const tzOperandEl = [
    document.getElementById("timezone-input-tz-1"),
    document.getElementById("timezone-input-tz-2")
];
const tzDateEl = document.getElementById("timezone-input-date");
const tzOffsetEl = [
    document.getElementById("timezone-offset-1"),
    document.getElementById("timezone-offset-2")
];
const tzSetCurrentEl = document.getElementById("timezone-current-btn");
const tzDataListEl = document.getElementById("timezone-list");
const oReq = new XMLHttpRequest;
let tzObj;
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
function transferFailed() {
    console.log("An error occured while transferring file");
}
function transferCancled() {
    console.log("Transfer has been cancled");
}
tzSetCurrentEl.addEventListener("click", setCurrentTime, false);
tzOperandEl[0].addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        calculate();
    }
});
tzOperandEl[1].addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        calculate();
    }
});
tzDateEl.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        calculate();
    }
});
function setCurrentTime() {
    const date = new Date();
    tzDateEl.value = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + (date.getMonth() + 1);
}
function addAbbrToDatalist() {
    let i;
    let dataList = '';
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
function calculate() {
    const tzNameInput = [
        tzOperandEl[0].value,
        tzOperandEl[1].value
    ];
    let tzOffs = [0, 0];
    let index = [-1, -1];
    let i;
    let timezoneDifference;
    {
        let exit = false;
        for (i = 0; i < tzNameInput.length; ++i) {
            if ((index[i] = tz.returnNameMatchIndex(tzNameInput[i], tzObj.timezones)) != -1) {
                tzOffsetEl[i].textContent = "UTC" + tzObj.timezones[index[i]].offs;
                if (tzObj.timezones[index[i]].offs.match(":") != null) {
                    const tmp_split = tzObj.timezones[index[i]].offs.split(":");
                    tzOffs[i] = parseFloat(tmp_split[0]) + (parseFloat(tmp_split[1]) / 60);
                }
                else {
                    tzOffs[i] = tzObj.timezones[index[i]].offs;
                }
            }
            else {
                tzOffsetEl[i].textContent = "Invalid";
                exit = true;
            }
        }
        if (exit) {
            return;
        }
        ;
    }
    console.log(tzOffs[0]);
    console.log(tzOffs[1]);
    timezoneDifference = (tzOffs[0] > tzOffs[1]) ? tzOffs[1] - tzOffs[0] : tzOffs[0] - tzOffs[1];
    const userDate = tz.parseDate(tzDateEl.value);
    userDate.setHours(userDate.getHours() + timezoneDifference);
    tzResultEl.innerHTML = tz.formatDate(userDate);
}
//# sourceMappingURL=timezone.js.map