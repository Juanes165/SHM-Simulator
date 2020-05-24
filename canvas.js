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

function setup() {
    let canvas = createCanvas(1000, 700);
    background(255);
    frameRate(15);
    textAlign(CENTER, CENTER);
    canvas.parent('prueba');
}

function draw() {

    mass = document.getElementById("mass").value * 1;
    pulleyMass = document.getElementById("pulleyMass").value * 1;
    springConstant = document.getElementById("springConstant").value * 1;
    initialDisplacement = document.getElementById("initialDisplacement").value * 1;
    initialVelocity = document.getElementById("initialVelocity").value * 1;

    naturalFrequency = naturalFrequencyCalc(springConstant, mass, pulleyMass);
    frequency = frequencyCalc(springConstant, mass, pulleyMass);
    period = periodCalc(springConstant, mass, pulleyMass);
    phi = phiCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity);
    amplitude = amplitudeCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity);

    displacement = displacementCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    velocity = velocityCalc(springConstant, mass, pulleyMass, initialDisplacement, initialVelocity, timeSeconds);
    kineticE = kineticEnergy(mass, pulleyMass, velocity);
    potentialE = potentialEnergy(springConstant, displacement);


    background(230);
    fill(255, 255, 255)
    rect(0, 0, 450, 400)
    let c = color(200);
    fill(c);
    textAlign(LEFT, CENTER);

    //Energy graph (pie chart)
    const totalEnergy = kineticE + potentialE;
    textSize(15)
    fill(255, 100, 100)
    circle(550, 100, 150)
    fill(255, 0, 0)
    text("Energía cinética", 635, 85)

    fill(150, 255, 150)
    arc(550, 100, 150, 150, 0, potentialE * 2 * PI / totalEnergy)
    fill(0, 255, 0)
    text("Energía potencial", 635, 115)
    fill(0)

    //
    fill(255)
    rect(475, 200, 350, 150)
    fill(0)
    text("Aqui va la grafica del movimiento", 475, 200, 350, 150)

    textAlign(CENTER, CENTER)
    fill(c)

    //Movimiento de la masa
    if (start) {
        if (squareY >= 200 && squareY <= 300) {
            if (invert) {
                squareY = squareY - speed;
            } else {
                squareY = squareY + speed;
            }
        } else {
            invert = !invert;
            if (squareY - speed == 300) {
                squareY = 300

            } else {
                squareY = 200
            }
        }
    }

    line(25, 25, 25, 125) //Pared

    line(238, 75, 25, 75); //Cuerda Resorte-Polea

    circle(238, 112, 75); //Masa

    line(275, 112, 275, squareY); //Cuerda Polea - Masa

    square(250, squareY, 50); //Masa

    fill(0);
    textSize(30);
    text("M", 275, squareY + 25)

    //Boton de start
    fill(255);
    rect(startButton.x, startButton.y, startButton.sizeX, startButton.sizeY)
    fill(0)
    textSize(20);
    text(startText, startButton.x, startButton.y, startButton.sizeX, startButton.sizeY)

    //Boton de reset
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
    text("Masa: " + mass + " Kg", 25, 415);
    text("Masa de la polea: " + pulleyMass + " Kg", 25, 430);
    text("Constante elástica: " + springConstant + " N/m", 25, 445);
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
    translate(238, 112);
    rotate(PI * (squareY - 200) / 100);
    textSize(32);
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