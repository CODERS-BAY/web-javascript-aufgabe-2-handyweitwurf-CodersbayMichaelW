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
var phoneleft = 73.5;
var ratioPxToM = 100;
var positionX, positionY, velocityY, velocityX, gravity, distanceTotal;

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
    phoneLeft = 73.5;

    // 90-100% of screen
    let distanceXpx = Math.floor( (Math.random() * (screenWidth - (screenWidth - alienWidth))) + (screenWidth - 2*alienWidth) );
    // 0-100% of screen
    let distanceYpx = Math.floor(Math.random() * (screenHeight - alienHeight));

    distanceXAway = distanceXpx;
    distanceYAway = distanceYpx;
    distanceTotal = 0;

    document.getElementById("trys").innerHTML = "5";
    document.getElementById("result").innerHTML = "";
    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";
    document.getElementById("distanceX").innerHTML = (distanceXAway-phoneLeft) / ratioPxToM;
    document.getElementById("distanceY").innerHTML = distanceYAway / ratioPxToM;
    document.getElementById("totalDistance").innerHTML = distanceTotal;

    document.getElementById("alien").style.left = (distanceXAway) + "px";
    document.getElementById("alien").style.bottom = (distanceYpx) + "px";

}

function setearth() {
    document.getElementById("background").style.backgroundImage = "url('img/earth.jpg')";
    document.getElementById("gravity").innerHTML = 9.81;
    setupGame();
    updateValues();
}

function setmoon() {
    document.getElementById("background").style.backgroundImage = "url('img/moon.jpg')";
    document.getElementById("gravity").innerHTML = 1.62;
    setupGame();
    updateValues();
}

function setmars() {
    document.getElementById("background").style.backgroundImage = "url('img/mars.jpg')";
    document.getElementById("gravity").innerHTML = 3.69;
    setupGame();
    updateValues();
}

function setjupiter() {
    document.getElementById("background").style.backgroundImage = "url('img/jupiter.jpg')";
    document.getElementById("gravity").innerHTML = 24.79;
    setupGame();
    updateValues();
}

// --------------------------------------------------------------

function calculate() {
    let angel = Number(document.getElementById("angel").value);
    let trysLeft = Number(document.getElementById("trys").innerHTML);
    document.getElementById("result").innerHTML = "";
    distanceTotal = 0;

    if (trysLeft == 0) {
        document.getElementById("result").innerHTML = "All your trys are consumed";
        document.getElementById("debug2").innerHTML = "";
        document.getElementById("debug3").innerHTML = "";
    }
    //angel has to be between 1 and 90
    else if (angel >= 1 && angel <= 90) {
        document.getElementById("trys").innerHTML = --trysLeft;

        // set all the Variables
        calcFlyingpath();

        // in scope
        while (positionY >= 0 && positionX <= screenWidth + 5) {
            // hit area of monster
            if (positionX >= distanceXAway && positionX <= distanceXAway + alienWidth &&
                positionY >= distanceYAway && positionY <= distanceYAway + alienHeight) {
                document.getElementById("result").innerHTML = "You have hit the Monster. Congratulation!";
                document.getElementById("debug2").innerHTML = "";
                document.getElementById("debug3").innerHTML = "";
                distanceThrown();
                break;
            }
            // shoot too hard and missed the alien
            else if (positionX > (distanceXAway + alienWidth) ) { // To-DO -> tell the user that the phone flow past the alien
                document.getElementById("result").innerHTML = "The phone flow past the alien";
                // document.getElementById("debug2").innerHTML = "X away: " + (distanceXAway - positionX).toFixed(0) / 100  + "m";
                document.getElementById("debug2").innerHTML = "Y away: " + functionAwayY(distanceYAway, positionY) + "m";
                distanceThrown();
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
                distanceThrown();
                break;
            }
            // updates Values
            calcFlyingpahtUpdateValues();
        }
    }
}

// --------------------------------------------------------------
function functionAwayX(distanceXAway, positionX) {
    return ( (distanceXAway + (Math.floor(alienWidth/2))) - positionX).toFixed(0) / 100;
}
function functionAwayY(distanceYAway, positionY) {
    return (distanceYAway - positionY).toFixed(0) / 100;
}

function distanceThrown() {
    // document.getElementById("totalDistance").innerHTML = Math.round( (Math.sqrt((positionX * positionX) + (positionY * positionY)))) / 100;
    document.getElementById("totalDistance").innerHTML = Math.round(distanceTotal) / 100;
}

// m/s or px/s
function calcVelocityX(speed) {
    let angel = Number(document.getElementById("angel").value);
    angel = angel * ( Math.PI / 180 ); // from degrees to radians!
    let forceX = Math.floor((speed * Math.cos(angel)) * 100) / 100;
    return Math.floor((forceX / phoneWeight) * 100) / 100; 
}

// calcs the velocity in the y-axis per 1 unit to the right
function calcVelocityY(speed, speedX) {
    let angel = Number(document.getElementById("angel").value);
    angel = angel * ( Math.PI / 180 ); // from degrees to radians!
    let forceY = Math.floor((speed * Math.sin(angel)) * 100) / 100;
    forceY = Math.floor((forceY / phoneWeight) * 100) / 100;
    return (forceY / speedX) ;
}

// calcs the gravity in the y-axis per 1 unit to the right
function clacGravity(speedX) {
    // not a correct formula but it works
    let calcGravity = Number(document.getElementById("gravity").innerHTML)
    return ((calcGravity / speedX) / 30);
}

// --------------------------------------------------------------
function drawLineOfFire() {
    // draws the line of fire when checked
    if (lineOfFire.checked) {
        // sets Variable
        calcFlyingpath()

        while (positionY >= 0 && positionX <= screenWidth + 5) {
            // setup drawing board
            let x = document.createElement("CANVAS");
            let ctx = x.getContext("2d");

            // draws rectangle ---------------------
            ctx.fillStyle = "cyan";
            ctx.fillRect(0, 0, 255, 255);

            // add before
            x.style.position = "absolute";
            x.style.left = positionX + "px";
            x.style.bottom = positionY + "px";

            // add the element to in main as html code
            document.getElementById("background").appendChild(x);

            // updates Variable
            calcFlyingpahtUpdateValues()
        }
    }
    // deletes only the line of fire when unchecked | works
    else {
        deleteAllLineOfFire();
    }
}
// --------------------------------------------------------------
function calcFlyingpath() {
    var speed = Number(document.getElementById("speed").value);
    velocityX = calcVelocityX(speed);
    gravity = clacGravity(velocityX);
    velocityY = calcVelocityY(speed, velocityX);
    positionX = phoneleft;
    positionY = 0;
}
function calcFlyingpahtUpdateValues() {
    distanceTotal += Math.sqrt( (1) + (velocityY * velocityY) );
    positionX += 1;
    positionY += velocityY;
    velocityY -= gravity;
}

// --------------------------------------------------------------
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