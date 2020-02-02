function setup() {
  rotacion = 90;
  posiciones = [];
  planetas = [
    new Planeta(0.2, 0.1),
    new Planeta(0.5, 0.7),
    new Planeta(0.4, 0.2),
    new Planeta(0.8, 0.5)
  ];
  nave = new Nave;
  cuadro = new Cuadro('Visit the planet?\nPress X');
  menu = new Menu;
  a = 1;
  v = 1;
  botones = [
    new Boton('Start', 2),
    new Boton('Credits', 4),
    new Boton('Exit', 6)
  ];
  hacer = "";
}

function draw() {
  switch(hacer){
    case "":
      menu.display();
      break;
    case "Start":
      espacio();
      break;
    case "Exit":
      botones[2].texto = 'Press Ctrl + W';
      menu.display();
  }
}

class Menu{
  display(){
    createCanvas(windowWidth - 20, windowHeight - 20);
    background('black');
    botones[0].display();
    botones[1].display();
    botones[2].display();
  }
}


class Boton{
  constructor(texto, y){
    this.texto = texto;
    this.y = y;
  }
  display(){
    this.x = width / 3;
    this.h = height / 10;
    push();
    strokeWeight((this.x + this.y) / 100);
    stroke('blue');
    if(!(mouseX > this.x && mouseX < this.x * 2 && mouseY > this.y * this.h && mouseY < (this.y * this.h) + this.h)){
      fill('black');
    }else{
      if(mouseIsPressed){
        hacer = this.texto;
      }
    }
    rect(this.x, this.h * this.y, this.x, this.h, 20);
    pop();
    push();
    translate(this.x, this.h * this.y);
    textAlign(CENTER);
    textSize(this.h / 2);
    fill('red');
    text(this.texto, this.x / 2, this.h * 0.7);
    pop();
  }
}

function espacio(){
  createCanvas(windowWidth - 20, windowHeight - 20);
  background('black');
  dibujarPlanetas(planetas);
  nave.keyPress();
  nave.sobrePlaneta();
}

function velocidad(estado){
  if(estado == 1 && v < 5){
    v *= 1.5;
  }else if(estado == 0 && v > 0.01){
    v *= 0.9;
  }
}

function dibujarPlanetas(planetas){
  for(i in planetas){
    planetas[i].display();
  }
}

class Planeta{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.xp = this.x * width;
    this.yp = this.y * height;
  }

  display(){
    if(width > height){
      this.w = height / 5;
    }else{
      this.w = width / 5;
    }
    this.xp = this.x * width;
    this.yp = this.y * height;
    ellipseMode(CORNER);
    ellipse(this.xp - this.w, this.yp, this.w, this.w);
  }
}

class Nave{

  constructor(){
    this.x = planetas[3].xp;
    this.y = planetas[3].yp - height / 17;
  }

  mover(direccion, v){
  if(rotacion > 270){
      this.x -= v * sin(rotacion - 270) * direccion;
      this.y += v * cos(rotacion - 270) * direccion;
    }else if(rotacion > 180){
      this.x += v * cos(rotacion - 180) * direccion;
      this.y += v * sin(rotacion - 180) * direccion;
    }else if(rotacion > 90){
      this.x += v * sin(rotacion - 90) * direccion;
      this.y -= v * cos(rotacion - 90) * direccion;
    }else if(rotacion > 0){
      this.x -= v * cos(rotacion) * direccion;
      this.y -= v * sin(rotacion) * direccion;
    }
  }

  keyPress(){
    if(rotacion > 360){
      rotacion = 0;
    }else if(rotacion < 0){
      rotacion = 360;
    }
    if(keyIsDown(UP_ARROW)){
      velocidad(1);
      this.mover(1, v);
      a = 1;
    }
    if(keyIsDown(DOWN_ARROW)){
      velocidad(1);
      this.mover(-1, v);
      a = 0;
    }
    if(!keyIsDown(UP_ARROW || DOWN_ARROW)){
      velocidad(0);
      if (a == 0){
        this.mover(-1, v);
      }else{
        this.mover(1, v)
      }
    }
    if(keyIsDown(LEFT_ARROW)){ 
      rotacion -= 1;
    }
    if(keyIsDown(RIGHT_ARROW)){
      rotacion += 1;
    }
    push();
    translate(this.x + height / 17, this.y + height / 20);
    angleMode(DEGREES);
    rotate(rotacion);
    rectMode(CENTER);
    rect(0, 0, height / 17, height / 20);
    pop();
  }

  sobrePlaneta(){
    for(i in planetas){
      if(this.x > planetas[i].xp - planetas[i].w && this.x < planetas[i].xp && this.y > planetas[i].yp && this.y < planetas[i].yp + planetas[i].w){
        cuadro.display();
        if(keyIsDown(88)){
          alert('Funciona');
        }
      }
    }
  }
}

class Cuadro{
  constructor(texto){
    this.texto = texto;
  }
  display(){
    this.x = width / 3;
    this.y = height / 3;
    push();
    fill('black');
    strokeWeight((this.x + this.y) / 100);
    stroke('blue');
    rect(this.x, this.y, this.x, this.y, 20);
    pop();
    push();
    translate(this.x, this.y);
    textAlign(CENTER);
    textSize(this.y / 10);
    fill('red');
    text(this.texto, this.x / 2, this.y / 2 - this.y / 15);
    pop();
  }
}