var myStart = document.getElementById("start");
var earth = document.getElementById("earth");
var moon = document.getElementById("moon");
var mars = document.getElementById("mars");
var jupiter = document.getElementById("jupiter");
var lineOfFire = document.getElementById("lineOfFireCheckbox");
var forceUpdate = document.getElementById("speed");
var angelUpdate = document.getElementById("angel");
var distanceXAway; // in cm = px
var distanceYAway; // in cm = px
var screenWidth, screenHeight, alienWidth, alienHeight;
var phoneWeight = 0.138; // kg
var phoneleft = 50 + 47;

// --------------------------------------------------------------
function setupGame() {
    screenWidth = document.getElementById('background').clientWidth;
    screenHeight = document.getElementById('background').clientHeight;
    alienWidth = document.getElementById("alien").clientWidth;
    alienHeight = document.getElementById("alien").clientHeight;
    // get phone elements
    let element = document.getElementById('phone');
    let style = window.getComputedStyle(element);

    // To-Do !!!!!!!
    // let phoneBottom = parseInt(style.getPropertyValue('bottom'));
    // phoneLeft = parseInt(phone.style.getPropertyValue('left')) + document.getElementById("phone").clientWidth;
    phoneBottom = 0;
    phoneLeft = 50 + 47;

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

    if (screenWidth > 800) {
    document.getElementById("alien").style.right = (95 - Math.floor(((distanceXpx / screenWidth) *100))) + "%";
    }
    else {
        document.getElementById("alien").style.right = (80 - Math.floor(((distanceXpx / screenWidth) *100))) + "%";
    }
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

// --------------------------------------------------------------

function calculate() {
    let angel = Number(document.getElementById("angel").value);
    let trysLeft = Number(document.getElementById("trys").innerHTML);
    document.getElementById("result").innerHTML = "";

    if (trysLeft == 0) {
        document.getElementById("result").innerHTML = "All your trys are consumed";
        document.getElementById("debug2").innerHTML = "";
        document.getElementById("debug3").innerHTML = "";
    }
    //angel has to be between 1 and 90
    else if (angel >= 1 && angel <= 90) {
        document.getElementById("trys").innerHTML = --trysLeft;

        // get all the variables
        let positionX = phoneleft;
        let positionY = 0;
        let gravity = Number(document.getElementById("gravity").innerHTML);
        var speed = Number(document.getElementById("speed").value);

        // calc to get some variables
        let velocityX = calcVelocityX(speed);
        let velocityY = calcVelocityY(speed);

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

// --------------------------------------------------------------
function functionAwayX(distanceXAway, positionX) {
    return ( (distanceXAway + (Math.floor(alienWidth/2))) - positionX).toFixed(0) / 100;
}
function functionAwayY(distanceYAway, positionY) {
    return ( (distanceYAway + (alienHeight/2)) - positionY).toFixed(0) / 100;
}

function distanceThrown(positionX, positionY) {
    document.getElementById("totalDistance").innerHTML = Math.round( (Math.sqrt((positionX * positionX) + (positionY * positionY)))) / 100;
}

// m/s or px/s
function calcVelocityX(speed) {
    let angel = Number(document.getElementById("angel").value);
    angel = angel * ( Math.PI / 180 ); // from degrees to radians!
    let forceX = Math.floor((speed * Math.cos(angel)) * 100) / 100;
    return Math.floor((forceX / phoneWeight) * 100) / 100; 
}

function calcVelocityY(speed) {
    let angel = Number(document.getElementById("angel").value);
    angel = angel * ( Math.PI / 180 ); // from degrees to radians!
    let forceY = Math.floor((speed * Math.sin(angel)) * 100) / 100;
    return Math.floor((forceY / phoneWeight) * 100) / 100;
}

// --------------------------------------------------------------
function drawLineOfFire() {
    // draws the line of fire when checked
    // position
    var speed = Number(document.getElementById("speed").value);
    let gravity = Number(document.getElementById("gravity").innerHTML);
    let velocityX = calcVelocityX(speed);
    let velocityY = calcVelocityY(speed);
    let lineOfFireX = phoneleft;
    let lineOfFireY = 0;

    if (lineOfFire.checked) {
        while (lineOfFireY >= 0 && lineOfFireX <= screenWidth + 5) {
            let x = document.createElement("CANVAS");
            let ctx = x.getContext("2d");
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, 255, 255);

            lineOfFireX += velocityX;
            lineOfFireY += velocityY;
            velocityY -= gravity;

            // add before
            x.style.position = "absolute";
            x.style.left = lineOfFireX + "px";
            x.style.bottom = lineOfFireY + "px";

            document.getElementById("background").appendChild(x);
        }
    }
    // deletes only the line of fire when unchecked | works
    else {
        deleteAllLineOfFire();
    }
}

function deleteAllLineOfFire() {
    let myObj = document.getElementById("background");
    let child = myObj.lastElementChild;
    while (child.tagName == "CANVAS") {
        myObj.removeChild(child);
        child = myObj.lastElementChild;
    }
}

function unsetLineOfFireCheckbox() {
    document.getElementById("lineOfFireCheckbox").checked = false;
    deleteAllLineOfFire();
}

function updateValues() {
    deleteAllLineOfFire();
    drawLineOfFire();
}

function onResize() {
    setupGame();
    unsetLineOfFireCheckbox();
}


earth.addEventListener("click", setearth);
moon.addEventListener("click", setmoon);
mars.addEventListener("click", setmars);
jupiter.addEventListener("click", setjupiter);

myStart.addEventListener("click", calculate);
lineOfFire.addEventListener("click", drawLineOfFire);
forceUpdate.addEventListener("keyup", updateValues);
angelUpdate.addEventListener("keyup", updateValues);

window.onload = setupGame;
window.onresize = onResize;