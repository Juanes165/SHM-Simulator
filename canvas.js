var squareY = 200;
var invert = false;
var start = false;
var startText = "START";

var speed = 5;

var mass;
var pulleyMass;
var springConstant;
var naturalFreq;
var freq;
var per;
var phi;
var apm;

var time = 0;
var disp;
var vel;
var kineticE;
var potentialE;

var timeSeconds = time / 15;

function setup() {
    createCanvas(1000, 700);
    background(255);
    frameRate(15);
    textAlign(CENTER, CENTER);
}

function draw() {

    background(230);
    fill(255, 255, 255)
    rect(0, 0, 450, 400)
    let c = color(200);
    fill(c);
    textAlign(CENTER, CENTER);

    fill(255)
    rect(475, 25, 150, 150)
    fill(0)
    textSize(12)
    text("Aqui va la grafica de energia", 475, 25, 150, 150)
    fill(255)
    rect(475, 200, 350, 150)
    fill(0)
    text("Aqui va la grafica del movimiento", 475, 200, 350, 150)


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
    rect(20, 325, 80, 50)
    fill(0)
    textSize(20);
    text(startText, 60, 350)

    //Boton de reset
    fill(255);
    rect(120, 325, 80, 50)
    fill(0)
    text("RESET", 160, 350)

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
    
    

    mass = document.getElementById("mass").value;
    pulleyMass = document.getElementById("pulleyMass").value;
    springConstant = document.getElementById("springConstant").value;
    naturalFreq = naturalFrequency(springConstant, mass, pulleyMass);
    freq = frequency(naturalFreq);
    per = period(freq);
    phi = phiCalc(springConstant, 1, 0);
    amp = amplitude(springConstant, 1, 0);

    
    disp = displacement(amp, springConstant, timeSeconds, phi)
    vel = velocity(amp, springConstant, timeSeconds, phi)
    kineticE = kineticEnergy(mass, pulleyMass, vel);
    potentialE = potentialEnergy(springConstant, disp)


    textSize(15);
    textAlign(LEFT, CENTER);
    text("Masa: " + mass + " Kg", 25, 415);
    text("Masa de la polea: " + pulleyMass + " Kg", 25, 430);
    text("Constante elástica: " + springConstant + " N/m", 25, 445);
    text("Frecuencia natural: " + naturalFreq + " Rad/s", 25, 460);
    text("Frecuencia: " + freq + " Hz", 25, 475);
    text("Periodo: " + per + " seg", 25, 490);
    text("Phi: " + phi, 25, 505);
    text("Amplitud: " + amp, 25, 520);
    text("Desplazamiento: " + roundByDecimals(disp, 3) + " mts", 25, 535);
    text("Velocidad: " + roundByDecimals(vel, 3) + " mts/seg", 25, 550);
    text("Energía Cinética: " + roundByDecimals(kineticE, 3) + " Joules", 25, 565);
    text("Energía Potencial: " + roundByDecimals(potentialE, 3) + " Joules", 25, 580);
    text("Time: " + roundByDecimals(timeSeconds, 1) + " seg", 25, 595);
    
    
    //text(Math.trunc(millis()/1000), 25, 490)


    //M rotativa de la polea
    fill(0)
    textAlign(CENTER, CENTER);
    translate(238, 112);
    rotate(PI*(squareY - 200)/100);
    textSize(32);
    text("M", 0, 0);

    rotate(-PI*(squareY - 200)/100);

    if(start){
        time = time + 1;
    }
    timeSeconds = time/15;
    
}

function mouseClicked() {
    if (mouseX >= 20 && mouseX <= 100 && mouseY >= 325 && mouseY <= 375) {
        if (start) {
            start = false;
            startText = "START";
        } else {
            start = true;
            startText = "STOP";
        }
    }
    if (mouseX >= 120 && mouseX <= 200 && mouseY >= 325 && mouseY <= 375) {
        start = false;
        startText = "START"
        squareY = 200;
        time = 0;
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