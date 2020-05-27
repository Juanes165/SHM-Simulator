var squareY = 200;
var invert = false;
var start = false;
var startText = "START";

var speed = 1;

var mass;
var pulleyMass;
var springConstant;
var initialDisplacement;
var initialVelocity;

var naturalFrequency;
var frequency;
var period;
var phi;
var amplitude;

var displacement;
var velocity;
var kineticE;
var potentialE;

var timer = 0;
var timeSeconds = timer / 15;

const startButton = { x: 20, y: 200, sizeX: 80, sizeY: 50 } //20, 325, 80, 50
const resetButton = { x: 20, y: 275, sizeX: 80, sizeY: 50 } //120, 325, 80, 50


/*let img;
function preload() {
  img = loadImage('img/resorte.jpg');
}*/

function setup() {
    let canvas = createCanvas(1000, 700);
    background(255);
    frameRate(15);
    textAlign(CENTER, CENTER);
    canvas.parent('canvas');
}

function draw() {
    //User-entered values
    mass = document.getElementById("mass").value * 1;
    pulleyMass = document.getElementById("pulleyMass").value * 1;
    springConstant = document.getElementById("springConstant").value * 1;
    initialDisplacement = document.getElementById("initialDisplacement").value * 1;
    initialVelocity = document.getElementById("initialVelocity").value * 1;
    //Static values
    naturalFrequency = naturalFrequencyCalc(springConstant, mass, pulleyMass);
    frequency = frequencyCalc(springConstant, mass, pulleyMass);
    period = periodCalc(springConstant, mass, pulleyMass);
    phi = phiCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity);
    amplitude = amplitudeCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity);
    //Variable values
    displacement = displacementCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    velocity = velocityCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    kineticE = kineticEnergy(mass, pulleyMass, velocity);
    potentialE = potentialEnergy(springConstant, displacement);

    background(230);
    fill(255, 255, 255)
    rect(0, 0, 500, 500)
    let c = color(200);
    fill(c);
    textAlign(LEFT, CENTER);

    //Energy graph (pie chart)
    const totalEnergy = kineticE + potentialE;
    textSize(15)
    fill(255, 100, 100)
    circle(650, 100, 150)
    fill(255, 0, 0)
    text("Energía cinética", 750, 85)
    fill(150, 255, 150)
    arc(650, 100, 150, 150, 0, potentialE * 2 * PI / totalEnergy)
    fill(0, 255, 0)
    text("Energía potencial", 750, 115)

    if (initialDisplacement == 0 && initialVelocity == 0) {
        //Conditional if there is no movement
        fill(c)
        circle(650, 100, 150)
    }
    fill(0)

    //Movement graph
    fill(255)
    rect(550, 250, 400, 300)
    line(550, 400, 950, 400)
    fill(0)

    for (i = 0; i < 400; i++) {
        rect(i + 550,
            10 * displacementCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, i / 70) + 325,
            1,
            1);
    }


    fill(c)

    fill(0)
    textSize(20)
    textAlign(LEFT, CENTER)
    //Mass movement
    if (amplitude > 5) {
        squareY = (5 * displacement / amplitude + 15) * 20; //Min: 200, Max: 400
        line(400, 200, 415, 200); /*Guide X min*/ text("X min", 430, 200);
        line(400, 300, 415, 300); /*Guide 0 mts*/ text("X = 0", 430, 300);
        line(400, 400, 415, 400); /*Guide X max*/ text("X max", 430, 400);
    }
    else {
        squareY = (displacement + 15) * 20
        line(400, 200, 415, 200); /*Guide -5 mts*/ text("-5 mts", 430, 200);
        line(400, 300, 415, 300); /*Guide 0 mts*/ text("0 mts", 430, 300);
        line(400, 400, 415, 400); /*Guide 5 mts*/ text("5 mts", 430, 400);
    }

    if (amplitude == 0) {
        squareY = 300;
    }


    line(25, 25, 25, 125) //Wall
    line(25, 75, 60, 75);
    line(300, 75, squareY / 2, 75); //Spring-Pulley line

    const springLines = squareY / 20 - 10;
    const springLinesTwo = -1 * (springLines - 60);
    const springLinesThree = 5 + 1.5 * springLines;

    //Spring
    for (i = 1; i <= 7; i++) {
        line(springLinesTwo + springLinesThree * i, 90, springLinesTwo + springLinesThree * i, 60)
    }

    for (i = 1; i <= 6; i++) {
        line(springLinesTwo + springLinesThree * i, 90, springLinesThree + springLinesTwo + springLinesThree * i, 60)
    }
    //line(60, 75, 70, 60)
    line(60, 75, springLinesTwo + springLinesThree, 60)
    line(springLinesTwo + springLinesThree * 7, 90, squareY / 2, 75)

    textSize(30);
    fill(0)
    text("K", 75, 115)
    fill(c)


    circle(300, 125, 100); //Pulley
    line(350, 125, 350, squareY); //Pulley-Mass line
    square(325, squareY, 50); //Mass

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(30);
    text("m", 350, squareY + 25)



    //Start button
    fill(255);
    rect(startButton.x, startButton.y, startButton.sizeX, startButton.sizeY)
    fill(0)
    textSize(20);
    text(startText, startButton.x, startButton.y, startButton.sizeX, startButton.sizeY)

    //Reset button
    fill(255);
    rect(resetButton.x, resetButton.y, resetButton.sizeX, resetButton.sizeY)
    fill(0)
    text("RESET", resetButton.x, resetButton.y, resetButton.sizeX, resetButton.sizeY)

    /*
    //Boton de velocidad
    fill(255);
    rect(220, 325, 80, 50)
    rect(300, 325, 50, 50)
    rect(350, 325, 50, 50)
    fill(0)
    textSize(50)
    text("+", 325, 353)
    text("-", 375, 350)
    textSize(20)
    text("SPEED", 260, 350)*/


    textSize(15);
    textAlign(LEFT, CENTER);

    text("Frecuencia natural: " + naturalFrequency + " Rad/s", 25, 460);
    text("Frecuencia: " + frequency + " Hz", 25, 475);
    text("Periodo: " + period + " seg", 25, 490);
    text("Phi: " + phi, 25, 505);
    text("Amplitud: " + amplitude, 25, 520);
    text("Desplazamiento: " + roundByDecimals(displacement, 3) + " mts", 25, 535);
    text("Velocidad: " + roundByDecimals(velocity, 3) + " mts/seg", 25, 550);
    text("Energía Cinética: " + roundByDecimals(kineticE, 3) + " Joules", 25, 565);
    text("Energía Potencial: " + roundByDecimals(potentialE, 3) + " Joules", 25, 580);
    text("Time: " + roundByDecimals(timeSeconds, 1) + " seg", 25, 595);


    //M rotativa de la polea
    fill(0)
    textAlign(CENTER, CENTER);
    translate(300, 125);
    rotate(PI * (squareY - 200) / 100);
    textSize(40);
    text("M", 0, 0);

    rotate(-PI * (squareY - 200) / 100);

    if (start) {
        timer += 1;
    }
    timeSeconds = timer / 15;

}

function mouseClicked() {
    if (mouseX >= startButton.x &&
        mouseX <= (startButton.x + startButton.sizeX) &&
        mouseY >= startButton.y &&
        mouseY <= (startButton.y + startButton.sizeY)) {

        if (start) {
            start = false;
            startText = "START";
        } else {
            start = true;
            startText = "STOP";
        }
    }
    if (mouseX >= resetButton.x &&
        mouseX <= (resetButton.x + resetButton.sizeX) &&
        mouseY >= resetButton.y &&
        mouseY <= (resetButton.y + resetButton.sizeY)) {

        start = false;
        startText = "START"
        squareY = 200;
        timer = 0;
    }
    /*
    if (mouseX >= 300 && mouseX <= 350 && mouseY >= 325 && mouseY <= 375){
        if(speed < 4){
            speed = speed + 1;
        }
    }
    if (mouseX >= 350 && mouseX <= 400 && mouseY >= 325 && mouseY <= 375){
        if(speed > 1){
            speed = speed - 1;
        }
    }
    */
}