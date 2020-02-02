let planeta, planeta_img;

function preload() {
  planeta_img = loadImage("https://images.vexels.com/media/users/3/152418/isolated/preview/098366e6994dd75ab46b47cd27b2c9d4-icono-de-planeta-tierra-by-vexels.png");
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  
  planeta = new Planeta(floor(width/2), -height, width*0.8, planeta_img);
}

function draw() {
  clear();
  background(20);

  planeta.display();
}
