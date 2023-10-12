

export function getDate(str) {
    const date = new Date(str.slice(0, 10));
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const d = date.getDate();

    return `${day}, ${month} ${d}, ${date.getFullYear()}`;
}

export function getTime(str) {
    let newStr = str.substring(11, 19);
    let addTime = 8 + Number(newStr[0] + newStr[1]);
    let removedHour = newStr.substring(2, 9);
    let aMpM = "";

    aMpM = addTime >= 12 ? " PM" : " AM";
    addTime = addTime > 12 ? "0" + String(addTime - 12) : String(0) + addTime;
    addTime = addTime > 9 ? addTime.substring(1, 3) : addTime;

    return addTime + removedHour + aMpM;
}