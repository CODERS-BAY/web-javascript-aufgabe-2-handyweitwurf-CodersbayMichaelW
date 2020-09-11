var myStart = document.getElementById("start");
var earth = document.getElementById("earth");
var moon = document.getElementById("moon");
var mars = document.getElementById("mars");
var jupiter = document.getElementById("jupiter");

function calculate() {
    let angel = Number(document.getElementById("angel").value);
    let trysLeft = Number(document.getElementById("trys").innerHTML);
    document.getElementById("result").innerHTML = "";


    if (trysLeft == 0) {
        document.getElementById("result").innerHTML = "You don't have a try anymore";
        document.getElementById("debug2").innerHTML = "";
        document.getElementById("debug3").innerHTML = "";
    }
    //angel has to be between 1 and 90
    else if (angel >= 1 && angel <= 90) {
        let speed = Number(document.getElementById("speed").value);
        let gravity = Number(document.getElementById("gravity").innerHTML);
        let distanceX = Number(document.getElementById("distanceX").innerHTML);
        let distanceY = Number(document.getElementById("distanceY").innerHTML);
        let heightMonster = 2;
        let widthMonster = 2;
        let positionX = 0;
        let positionY = 0;
        angel = angel * ( Math.PI/ 180 );
        let speedX = speed * Math.cos(angel);
        let speedY = speed * Math.sin(angel);

        document.getElementById("trys").innerHTML = --trysLeft;

        // in scope
        while (positionY >= 0 && positionX <= distanceX + 5) {
            positionX += speedX;
            positionY += speedY;
            speedY -= gravity;



            // hit area of monster
            if (positionX >= distanceX && positionX <= distanceX + widthMonster &&
                positionY >= distanceY && positionY <= distanceY + heightMonster) {
                document.getElementById("result").innerHTML = "You have hit the Monster. Congratulation!";
                document.getElementById("debug2").innerHTML = "";
                document.getElementById("debug3").innerHTML = "";
                distanceThrown(positionX, positionY);
                break;
            }
            // hit ground
            else if(positionY < 0) { // To-DO -> tell the user that the phone hit the ground
                document.getElementById("result").innerHTML = "The phone hit the ground";
                document.getElementById("debug2").innerHTML = "X away: " + (distanceX - positionX).toFixed(2);
                document.getElementById("debug3").innerHTML = "Y away: " + (distanceY - positionY).toFixed(2);
                distanceThrown(positionX, positionY);
                break;
            }
            // shoot too hard and missed the alien
            else if (positionX > distanceX + 5) { // To-DO -> tell the user that the phone flow past the alien
                document.getElementById("result").innerHTML = "The phone flow past the alien";
                document.getElementById("debug2").innerHTML = "X away: " + (distanceX - positionX).toFixed(2);
                document.getElementById("debug3").innerHTML = "Y away: " + (distanceY - positionY).toFixed(2);
                distanceThrown(positionX, positionY);
                break;
            }
        }
    } 
};

function setupGame() {
    let backgroundheight = document.getElementById('background').clientHeight;
    let distanceX = Math.floor(Math.random() * 201 + 100);
    let distanceY = Math.floor(Math.random() * backgroundheight);
    document.getElementById("trys").innerHTML = "3";
    document.getElementById("result").innerHTML = "";
    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";
    document.getElementById("distanceX").innerHTML = distanceX;
    document.getElementById("distanceY").innerHTML = distanceY;
    document.getElementById("alien").style.bottom = (((distanceY/backgroundheight) * 80) ) + "%";
}

function setearth() {
    document.getElementById("background").style.backgroundImage = "url('img/earth.jpg')";
    document.getElementById("gravity").innerHTML = 9.81;
    setupGame();
}

function setmoon() {
    document.getElementById("background").style.backgroundImage = "url('img/moon.jpg')";
    document.getElementById("gravity").innerHTML = 1.62;
    setupGame();
}

function setmars() {
    document.getElementById("background").style.backgroundImage = "url('img/mars.jpg')";
    document.getElementById("gravity").innerHTML = 3.69;
    setupGame();
}

function setjupiter() {
    document.getElementById("background").style.backgroundImage = "url('img/jupiter.jpg')";
    document.getElementById("gravity").innerHTML = 24.79;
    setupGame();
}

function distanceThrown(positionX, positionY) {
    document.getElementById("totalDistance").innerHTML = Math.round(Math.sqrt((positionX * positionX) + (positionY * positionY)));
}


myStart.addEventListener("click", calculate);

earth.addEventListener("click", setearth);
moon.addEventListener("click", setmoon);
mars.addEventListener("click", setmars);
jupiter.addEventListener("click", setjupiter);

window.onload = setupGame;