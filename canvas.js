let squareY = 200;
let reverse = false;
let start = false;
var startText = "START";

function setup() {
    createCanvas(500, 500);
    background(255);
    frameRate(60);
    textAlign(CENTER, CENTER);
}

function draw() {

    background(230);
    fill(255, 255, 255)
    square(0, 0, 400)
    let c = color(200);
    fill(c);

    //Movimiento de la masa
    if (start) {
        if (squareY >= 200 && squareY <= 300) {
            if (reverse) {
                squareY = squareY - 2;
            } else {
                squareY = squareY + 2;
            }
        } else {
            reverse = !reverse;
            if (squareY == 302) {
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

    //M rotativa de la polea
    fill(0)
    translate(238, 112);
    rotate(PI*(squareY - 200)/100);
    textSize(32);
    text("M", 0, 0);

    //rotate(-1*squareY / (10 * PI))

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
    }
}