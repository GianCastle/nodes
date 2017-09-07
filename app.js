 let canvas,
     maxParticles, 
     particleBreakDistance, 
     repelDist,
     particles = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    console.log("Canvas Size :" + width + "x" + height);
    canvas.parent('particles');
    frameRate(60);
    strokeWeight(2);
    stroke(2);

    maxParticles = 300;
    repelDist = max(width, height)/8;
    particleBreakDistance = max(width, height) / 40;
    while (particles.length < maxParticles) {
        obj = [createVector(random(width), random(height)), createVector(random(4) - 2, random(4) - 2)];
        particles.push(obj);
    }
}

function drawParticles() {

    colorMode(HSB, 100);
        particles.forEach((element, i) => {
            let posi = particles[i][0];
            let speed = particles[i][1];
            let randSize = 3 + random(4);
            
            ellipse(posi.x, posi.y, randSize, randSize);
            posi.add(speed);

            if (posi.x > width) {
                posi.x -= width;
                posi.y += random(height / 10) - height / 20;
            }
            else if (posi.x < 0) {
                posi.x += width;
                posi.y += random(height / 10) - height / 20;
            }
    
            if (posi.y > height) {
                posi.y -= height;
                posi.x += random(width / 10) - width / 20;
            }
            else if (posi.y < 0) {
                posi.y += height;
                posi.x += random(width / 10) - width / 20;
            }
    
            particles.map((elem, j) =>{
                if(i % 2 == 1) {
                    let posj = particles[j][0];
                    let dist = posi.dist(posj);

                    if(dist <= particleBreakDistance) {
                        strokeWeight(1-(dist/particleBreakDistance));
                        stroke(100*(posi.x/width), 90, 90, 255 - 255*dist/particleBreakDistance );
                        line(posi.x, posi.y, posj.x, posj.y);
                    }    
                }
            });
        });

    colorMode(RGB, 255);
    fill(255, 255, 255, 200);
    noStroke();   

}

function mouseClicked() {
    console.log('created new node')
    let newNode = [createVector(random(width), random(height)), createVector(random(4) - 2, random(4) - 2)];
    particles.push(newNode);
}

function draw() {

    background(15, 15, 20);

    drawParticles();
    particleBreakDistance = min(particleBreakDistance + 1, width / 15);
    //Metroid Prime Song for a more dramatic look
    //audio.play();
    
}

function downloadImageFromCanvas() {
    const source = document.getElementById('defaultCanvas0');
    let download = source.toDataURL('image/png');
    download = download.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    download = download.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

    this.href = download;   
}

document.getElementById("download").addEventListener('click', downloadImageFromCanvas, false);

shortcut.add('Ctrl+x', function() {
    document.getElementById('download').click();

});

