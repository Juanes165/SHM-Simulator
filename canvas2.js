function setup() {
    let canvas = createCanvas(500, 600);
    background(230);
    frameRate(60);
    textAlign(CENTER, CENTER);
    strokeWeight(2);
    canvas.parent('canvas2');
}

function draw(){
    background(255);
    
    //Free body diagram
    line(400, 25, 400, 145);
    line(340, 85, 460, 85);
}