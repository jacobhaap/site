const hoursOffset = -3;

const GetClock = element => {
    element.innerText = moment().utcOffset(hoursOffset).format('dddd, DD MMMM YYYY, HH:mm:ss');
    setTimeout(() => GetClock(element), 1000)
}

document.querySelector('#clockboxOffset').innerText = (hoursOffset >= 0) ? `+${hoursOffset}` : hoursOffset;
GetClock(document.getElementById('clockbox'))
