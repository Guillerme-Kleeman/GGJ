class Robot {
  constructor(x, radio_planeta, imagen) {
    this.x = 0;
    
    this.polo = -1; // ubicar al norte del planeta

    // this.radio_planeta = radio_planeta;
    this.radio_planeta = width*0.4
    this.acc = 5;

    this.reparando = false;
    this.estructuras_reparadas = [0, 0, 0, 0];

    this.materiales_disp = 100;
    this.combustible = 100;

    //this.imagen = imagen;
  }
  display() {
    if (frameCount % 1000 == 0) {
      this.combustible -= 0.2;
    }
    this.control();
    
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, 40, 40);
    //imageMode(CENTER);
    // image(this.imagen, this.x, this.y, 50, 50);
  }
  
  get y() {
    let cat2 = this.x * this.x;
    let hip2 = (this.radio_planeta + 60) * (this.radio_planeta + 60);
    let res = Math.sqrt(Math.abs(hip2 - cat2));

    return res * this.polo;
  }
  mostrar_info(objetivo) {
    stroke(255);
    fill(255);
    textSize(20);
    strokeWeight(1);
    text(`Repaired constructions: ${this.estructuras_reparadas[estado.planeta_idx]}/${objetivo}`, 30, 30)
    text(`Materiales available: ${floor(this.materiales_disp)}`, 30, 55);
    text(`Fuel: ${floor(this.combustible)}`, 30, 80);

    if (this.x > -100 && this.x < 100) {
      textAlign(CENTER);
      text(`Press S to explore other planets`, width/2, 30);
      if (keyIsDown(83)) {
        estado.planeta_idx = -1;
        estado.mostrar = 'universo';
      }
    }

    if (this.materiales_disp * this.combustible < 0 ) {
      noLoop();
      setTimeout(finDelJuego, 1000);
    }
  }
  distancia_a(estructura) {
    // devuelve la distancia entre el robot y una estructura
    return int(dist(this.x, this.y, estructura.x, estructura.y));
  }
  intentar_reparar(estructura) {
    if (this.distancia_a(estructura) < 130 && estructura.puede_repararse()){
      let reparado = estructura.reparar();
      
      if (reparado) {
        this.estructuras_reparadas[estado.planeta_idx]++;
      } else {
        // aún no se terminó la reparación
        this.materiales_disp -= 0.2;
      }
    } 
    else {
      estructura.no_reparar();
    }
  }
  control() {
    if (keyIsDown(LEFT_ARROW)) {
      this.acc = -5;
      this.combustible -= 0.02;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.acc = 5;
      this.combustible -= 0.02; 
    }

    this.x += this.acc;
    this.acc = 0;

    if (this.x < -this.radio_planeta) {
      this.x = -this.radio_planeta;
    }
  }
}
function finDelJuego() {
  clear();
  push();
  background(0);
  textSize(32);
  textAlign(CENTER);
  text("You Lose :(", floor(width/2), floor(height/2));
  pop();
}
