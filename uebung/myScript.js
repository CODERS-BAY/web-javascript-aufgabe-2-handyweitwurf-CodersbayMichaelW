var myStart = document.getElementById("start");

function calculate() {
    let speed = document.getElementById("speed").value;
    let angel = document.getElementById("angel").value;
    let gravity = document.getElementById("gravity").innerHTML;
    let distanceX = document.getElementById("distanceX").innerHTML;
    let distanceY = document.getElementById("distanceY").innerHTML;

    //angel has to be between 1 and 90
    if (angel >= 1 && angel <= 90) {
    } 
};

function distance() {
    let distanceX = Math.floor(Math.random() * 51 + 50);
    let distanceY = Math.floor(Math.random() * 31);
    document.getElementById("distanceX").innerHTML = distanceX;
    document.getElementById("distanceY").innerHTML = distanceY;
}

myStart.addEventListener("click", calculate);
window.onload = distance;