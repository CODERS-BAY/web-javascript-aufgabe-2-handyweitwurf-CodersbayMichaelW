var myStart = document.getElementById("start");
var earth = document.getElementById("earth");
var moon = document.getElementById("moon");
var mars = document.getElementById("mars");
var jupiter = document.getElementById("jupiter");

function calculate() {
    let angel = document.getElementById("angel").value;

    //angel has to be between 1 and 90
    if (angel >= 1 && angel <= 90) {
        let speed = document.getElementById("speed").value;
        let gravity = document.getElementById("gravity").innerHTML;
        let distanceX = document.getElementById("distanceX").innerHTML;
        let distanceY = document.getElementById("distanceY").innerHTML;
        let heightMonster = 2;
        let widthMonster = 2;
        let positionX = 0;
        let positionY = 0;
        let speedX = speed * Math.cos(angel);
        let speedY = speed * Math.sin(angel);

        // in scope
        while (positionY >= 0 && positionX <= 105) {
            positionX += speedX;
            positionY += speedY;
            speedY -= gravity;

            // hit area of monster
            if (positionX >= distanceX && positionX <= distanceX + widthMonster &&
                positionY >= distanceY && positionY <= distanceY + heightMonster) {
                    alert("You have hit the Monster. Congratulation!");
                    break;
                }
            // hit ground
            if(positionY < 0) {
                alert("Y");
                break;
            }
            // shoot too hard and missed the alien
            if (positionX > 105) {
                alert("X");
                break;
            }
        }
    } 
};

function distance() {
    let distanceX = Math.floor(Math.random() * 201 + 100);
    let distanceY = Math.floor(Math.random() * 81);
    document.getElementById("distanceX").innerHTML = distanceX;
    document.getElementById("distanceY").innerHTML = distanceY;
    document.getElementById("alien").style.bottom = distanceY + "%";
}

function setearth() {
    document.getElementById("background").style.backgroundImage = "url('img/earth.jpg')";
    document.getElementById("gravity").innerHTML = 9.81;
    distance();
}

function setmoon() {
    document.getElementById("background").style.backgroundImage = "url('img/moon.jpg')";
    document.getElementById("gravity").innerHTML = 1.62;
    distance();
}

function setmars() {
    document.getElementById("background").style.backgroundImage = "url('img/mars.jpg')";
    document.getElementById("gravity").innerHTML = 3.69;
    distance();
}

function setjupiter() {
    document.getElementById("background").style.backgroundImage = "url('img/jupiter.jpg')";
    document.getElementById("gravity").innerHTML = 24.79;
    distance();
}

function distanceThrown() {
    let speed = document.getElementById("speed").value;
    let angel = document.getElementById("angel").value;
    let gravity = document.getElementById("gravity").innerHTML;
}

myStart.addEventListener("click", calculate);

earth.addEventListener("click", setearth);
moon.addEventListener("click", setmoon);
mars.addEventListener("click", setmars);
jupiter.addEventListener("click", setjupiter);

window.onload = distance;