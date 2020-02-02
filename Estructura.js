class Estructura {
  constructor(x, radio_planeta, imagenes) {
    // posición x relativa al centro del planeta
    this.x = x;
    
    // polo del planeta al que pertenece
    this.polo = -1;

    this.estado = 'destruido'; // destruido, reparando o reparado

    this.radio_planeta = radio_planeta;

    this.imagenes = {
      'destruido': null,
      'reparando': null,
      'reparado' : null
    };

    this.tiempo_necesario = floor(random(3, 6));
    this.tiempo_reparando = 0;
  }
  get color() {
    switch (this.estado) {
      case 'destruido': return 'red';
      case 'reparando': return 'grey';
      case 'reparado' : return 'green';
    }
  }
  get y() {
    // calcular posición Y
    let cat2 = this.x * this.x;
    let hip2 = (this.radio_planeta - 55) * (this.radio_planeta - 55);

    let res = Math.sqrt(Math.abs(hip2 - cat2));

    return res * this.polo;
  }
  display() {
    fill(this.color);
    rect(this.x, this.y, 55, 45);
  }
  puede_repararse() {
    return this.estado == "destruido" || this.estado == 'reparando';
  }
  reparar() {
    // devolver true cuando finalice la reparación
    this.estado = 'reparando';
    this.tiempo_reparando += 0.1;

    if (this.tiempo_reparando > this.tiempo_necesario) {
      this.tiempo_reparando = 0
      this.estado = 'reparado';
      return true;
    }
  }
  no_reparar() {
    // reiniciar estado de reparación
    if (this.estado == 'reparado') return 0;
    this.estado = 'destruido';
    this.tiempo_reparando = 0;
  }
}