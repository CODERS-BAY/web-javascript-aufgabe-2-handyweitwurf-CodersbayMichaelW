var myStart = document.getElementById("start");
var earth = document.getElementById("earth");
var moon = document.getElementById("moon");
var mars = document.getElementById("mars");
var jupiter = document.getElementById("jupiter");
var distanceXAway; // in cm = px
var distanceYAway; // in cm = px
var screenWidth, screenHeight, alienWidth, alienHeight;

function setupGame() {
    screenWidth = document.getElementById('background').clientWidth;
    screenHeight = document.getElementById('background').clientHeight;
    alienWidth = document.getElementById("alien").clientWidth;
    alienHeight = document.getElementById("alien").clientHeight;
    // get phone elements
    let element = document.getElementById('phone'),
    style = window.getComputedStyle(element),
    phoneLeft = parseInt(style.getPropertyValue('left')) + document.getElementById("phone").clientWidth;
    phoneBottom = parseInt(style.getPropertyValue('bottom'));

    // 90-100% of screen
    let distanceXpx = Math.floor( (Math.random() * (screenWidth - (screenWidth - alienWidth))) + (screenWidth - 2*alienWidth) );
    // 0-100% of screen
    let distanceYpx = Math.floor(Math.random() * (screenHeight - alienHeight));

    distanceXAway = distanceXpx - phoneLeft;
    distanceYAway = distanceYpx - phoneBottom + (alienHeight/2);

    document.getElementById("trys").innerHTML = "5";
    document.getElementById("result").innerHTML = "";
    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";
    document.getElementById("distanceX").innerHTML = distanceXAway / 100;
    document.getElementById("distanceY").innerHTML = distanceYAway / 100;

    document.getElementById("alien").style.right = (95 - Math.floor(((distanceXpx / screenWidth) *100))) + "%";
    document.getElementById("alien").style.bottom = (distanceYpx) + "px";
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
    document.getElementById("totalDistance").innerHTML = Math.round( (Math.sqrt((positionX * positionX) + (positionY * positionY)))) / 100;
}

function calculate() {
    let angel = Number(document.getElementById("angel").value),
    trysLeft = Number(document.getElementById("trys").innerHTML),
    positionX = 0,
    positionY = 0;
    document.getElementById("result").innerHTML = "";

    if (trysLeft == 0) {
        document.getElementById("result").innerHTML = "All your trys are consumed";
        document.getElementById("debug2").innerHTML = "";
        document.getElementById("debug3").innerHTML = "";
    }
    //angel has to be between 1 and 90
    else if (angel >= 1 && angel <= 90) {
        document.getElementById("trys").innerHTML = --trysLeft;

        let gravity = Number(document.getElementById("gravity").innerHTML),
        speed = Number(document.getElementById("speed").value),
        phoneWeight = 0.138, // kg
        positionX = 0,
        positionY = 0;

        angel = angel * ( Math.PI / 180 ); // from degrees to radians!
        let ForceX = Math.floor((speed * Math.cos(angel)) * 100) / 100,
        ForceY = Math.floor((speed * Math.sin(angel)) * 100) / 100,
        velocityX = Math.floor((ForceX / phoneWeight) * 100) / 100, // m/s or px/s
        velocityY = Math.floor((ForceY / phoneWeight) * 100) / 100; // m/s or px/s

        // in scope
        while (positionY >= 0 && positionX <= screenWidth + 5) {
            positionX += velocityX;
            positionY += velocityY;
            velocityY -= gravity;

            // hit area of monster
            if (positionX >= distanceXAway && positionX <= distanceXAway + alienWidth &&
                positionY >= distanceYAway && positionY <= distanceYAway + alienHeight) {
                document.getElementById("result").innerHTML = "You have hit the Monster. Congratulation!";
                document.getElementById("debug2").innerHTML = "";
                document.getElementById("debug3").innerHTML = "";
                distanceThrown(positionX, positionY);
                break;
            }
            // shoot too hard and missed the alien
            else if (positionX > (distanceXAway + alienWidth) ) { // To-DO -> tell the user that the phone flow past the alien
                document.getElementById("result").innerHTML = "The phone flow past the alien";
                // document.getElementById("debug2").innerHTML = "X away: " + (distanceXAway - positionX).toFixed(0) / 100  + "m";
                document.getElementById("debug2").innerHTML = "Y away: " + functionAwayY(distanceYAway, positionY) + "m";
                distanceThrown(positionX, positionY);
                break;
            }
            // hit ground
            else if(positionY < 0) { // To-DO -> tell the user that the phone hit the ground
                document.getElementById("result").innerHTML = "The phone hit the ground";
                document.getElementById("debug2").innerHTML = "X away: " + functionAwayX(distanceXAway, positionX) + "m";
                console.log("distance: " + distanceXAway);
                console.log("position: " + positionX);
                console.log("alien width: " + alienWidth/2);
                console.log("speedX: " + velocityX);
                // document.getElementById("debug3").innerHTML = "Y away: " + (distanceYAway / 100) + "m";
                distanceThrown(positionX, positionY);
                break;
            }
        }
    }
}

function functionAwayX(distanceXAway, positionX) {
    return ( (distanceXAway + (Math.floor(alienWidth/2))) - positionX).toFixed(0) / 100;
}
function functionAwayY(distanceYAway, positionY) {
    return ( (distanceYAway + (alienHeight/2)) - positionY).toFixed(0) / 100;
}

myStart.addEventListener("click", calculate);

earth.addEventListener("click", setearth);
moon.addEventListener("click", setmoon);
mars.addEventListener("click", setmars);
jupiter.addEventListener("click", setjupiter);

window.onload = setupGame;