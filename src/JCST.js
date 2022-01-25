const hoursOffset = -1;

const GetClock = element => {
    element.innerText = moment().utcOffset(hoursOffset).format('dddd, Do MMMM YYYY, h:mm:ss A');
    setTimeout(() => GetClock(element), 1000)
}

document.querySelector('#clockboxOffset').innerText = (hoursOffset >= 0) ? `+${hoursOffset}` : hoursOffset;
GetClock(document.getElementById('clockbox'))
