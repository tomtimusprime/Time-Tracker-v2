$(document).ready(function() {
const displayTime = document.querySelector("#displayTime");
displayTime.textContent = moment().format("dddd, MMMM DD, YYYY hh:mm A");
const clockInBtn = document.querySelector("#clock-in");
const clockOutBtn = document.querySelector("#clock-out");
const breakBtn = document.querySelector("#break-btn");
const clockInTimeEl = document.querySelector("#clock-in-time");
const clockOutTimeEl = document.querySelector("#clock-out-time");
const currentTimeEl = document.querySelector("#current-time");
currentTimeEl.textContent = "Current Time: " + moment().format("h:mm:ss A");
const timeClockedInEl = document.querySelector("#time-clocked-in");
const todaysEarnings = document.querySelector("#money-earned");
// const users = require("./users");

let breakTime = false;
let resumeClockInTime;
let totalSeconds = 0;
let start;
let clockInTime;
let clockOutTime;
let clickedClockOut = false;
let timerCount = 0;
let wage;
let now = moment();
displayTimeTimer();
currentTimeTimer();

// var minutesPassed = moment().diff(start, 'minutes');

function displayLapsedTime() {

    const hoursLabel = document.querySelector("#hours");
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    if (totalSeconds !== 0) {
        totalSeconds = resumeClockInTime;
    }
    timer = setInterval(setTime, 1000);

    function setTime() {
        if (breakTime === true || clickedClockOut === true) {
            resumeClockinTime = totalSeconds;
            console.log(resumeClockInTime);
            clearInterval(timer);
        }
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        hoursLabel.innterHTML = pad(parseInt(totalSeconds / 3600));
        displayEarnings();
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

}

let userData;
let totalEarnings;

const displayEarnings=()=> {
    totalEarnings = ((userData.wage/ 3600) * totalSeconds).toFixed(2);
    todaysEarnings.textContent = totalEarnings;
}

let newTime;
let newEarnings;

const addTime=(time)=>{
    let oldTime=parseInt(userData.total_time);
    newTime=oldTime+time;
}

const addEarnings=(earnings)=>{
    let oldEarnings=parseFloat(userData.total_earnings);
    console.log(oldEarnings)
    newEarnings=oldEarnings+parseFloat(earnings);
}

const updateUserData=()=>{
$.get("/api/tracker/user_data").then(function(data) {
    console.log(data);
    userData=data;
  });
}

function displayTimeTimer() {
    timer = setInterval(() => {
        displayTime.textContent = moment().format("dddd, MMMM DD, YYYY hh:mm A");
    }, 1000);
}
function currentTimeTimer() {
    timer = setInterval(() => {
        currentTimeEl.textContent = "Current Time: " + moment().format("h:mm:ss A");
    }, 1000);
}

clockInBtn.addEventListener("click", function (e) {
    updateUserData();
    start = moment();
    clockInTime = moment().format("hh:mm:ss");
    clockInTimeEl.textContent = "    " + clockInTime;
    localStorage.setItem("clockIn", moment().format("hh:mm:ss"));
    clockInBtn.disabled = true;
    clockOutBtn.disabled = false;
    breakBtn.disabled = false;
    displayLapsedTime();
});
clockOutBtn.addEventListener("click", function (e) {
    updateUserData();
    clockOutTime = moment().format("hh:mm:ss");
    clockOutTimeEl.textContent = "    " + clockOutTime;
    localStorage.setItem("clockOut", moment().format("hh:mm:ss"));
    clickedClockOut = true;
    clockInBtn.disabled = false;
    clockOutBtn.disabled = true;
    addTime(totalSeconds);
    addEarnings(totalEarnings);
    let newUserData={
        total_earnings: newEarnings,
        total_time: newTime
    }
    $.ajax({
        url: '/api/tracker/user_data',
        type: 'PUT',
        data: newUserData,
        success: function(data) {
          alert('Load was performed.');
        }
      });

});

breakBtn.addEventListener("click", (e) => {

});

});




