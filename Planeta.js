class Planeta {

  x = floor(width/2);
  y = floor(height*1.1);
  diametro = width*0.8;

  constructor(robot, imagen) {
    // this.x = x;
    // this.y = this.altura_final;
    // this.diametro = diametro;
    this.radio = round(this.diametro * 0.5);
    this.imagen = imagen;
    this.robot = robot;

    this.randomizar_estructuras();
  }
  randomizar_estructuras() {
    let cantidad = floor(random(4, 6));
    this.cantidad_estructuras = cantidad;

    let pos1 = random(-this.radio*0.75, this.radio*0.75);

    this.estructuras = [new Estructura(pos1, this.radio)];
    
    let new_pos;

    for (let i = 1; i < cantidad; i++) {
      new_pos = random(-this.radio*0.75, this.radio*0.75);      
      this.estructuras.push(new Estructura(new_pos, this.radio));
    }
  }  
  display() {
    push();

    this.robot.mostrar_info(this.cantidad_estructuras);

    translate(this.x, this.y);

    // // elipse del planeta
    // fill(200);
    // ellipse(0, 0, this.diametro);

    // mostrar robot
    this.robot.display();

    // mostrar planeta
    imageMode(CENTER);
    image(this.imagen, 0, 0, this.diametro + 100, this.diametro + 100);

    // mostrar estructuras
    this.estructuras.forEach(estructura => {
      estructura.display();

      if (keyIsDown("32")) {
        this.robot.intentar_reparar(estructura);
      }

    });

    pop();
  }
}