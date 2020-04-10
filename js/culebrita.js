var velocidad = 60;
var tamanho = 10;
var contador = 0;

class objeto {
    constructor() {
        this.tamanho = tamanho;
    }
    colicion(obj) {
        //ABS = Absoluto , se usara para no obtener negativos
        var diferenciaX = Math.abs(this.x - obj.x);
        var diferenciaY = Math.abs(this.y - obj.y);
        if (diferenciaX >= 0 && diferenciaX < tamanho && diferenciaY >= 0 && diferenciaY < tamanho) {
            return true;
        } else {
            return false;
        }

    }
}
class Cola extends objeto {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.siguiente = null;
    }

    dibujar(ctx) {
        if (this.siguiente != null) {
            this.siguiente.dibujar(ctx);
        }
        ctx.fillStyle = "#38ef7d"
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho)
    }
    setxy(x, y) {
        if (this.siguiente != null) {
            this.siguiente.setxy(this.x, this.y);
        }
        this.x = x;
        this.y = y;
    }
    anhadir() {
        if (this.siguiente == null) {
            this.siguiente = new Cola(this.x, this.y)
        } else {
            this.siguiente.anhadir();
        }
    }
    versiguiente() {
        return this.siguiente
    }
}
class Comida extends objeto {
    constructor() {
        super();
        this.x = this.generar();
        this.y = this.generar();
    }
    generar() {
        var num = Math.floor(Math.random() * 29) * 10
        return num
    }
    colocar() {
        this.x = this.generar();
        this.y = this.generar();
    }
    dibujar(ctx) {
        ctx.fillStyle = "#ff00ff"
        ctx.fillRect(this.x, this.y, this.tamanho, this.tamanho)
    }
}
//objetos del juego 
var cabeza = new Cola(140, 140)
var comida = new Comida();
var ejex = true;
var ejey = true;
var direccionX = 0;
var direccionY = 0;

function movimiento() {
    var nuevax = cabeza.x + direccionX;
    var nuevay = cabeza.y + direccionY;
    cabeza.setxy(nuevax, nuevay)
}

function gameover() {
    direccionY = 0;
    direccionX = 0;
    ejey = true
    ejex = true
    cabeza = new Cola(140, 140)
    comida = new Comida()
    this.contador=0
    document.getElementById("contador").innerHTML="Game over"
}

function choquepared() {
    if (cabeza.x < 0) {
        cabeza.x = 290
    }
    if (cabeza.x > 290) {
        cabeza.x = 0
    }
    if (cabeza.y < 0) {
        cabeza.y = 290
    }
    if (cabeza.y > 290) {
        cabeza.y = 0
    }

}

function chocarcola() {
    var temp = null;
    try {
        temp = cabeza.versiguiente().versiguiente()
    } catch (error) {
        temp = null
    }
    while (temp != null) {
        if (cabeza.colicion(temp)) {
            gameover()
        } else {
            temp = temp.versiguiente()
        }
    }
}

function teclado(event) {
    var cod = event.keyCode;
    if (ejex) {
        if (cod == 38) {
            direccionY = -tamanho;
            direccionX = 0;
            ejex = false;
            ejey = true;
            
        }
        if (cod == 40) {
            direccionY = tamanho;
            direccionX = 0;
            ejex = false;
            ejey = true;
        }
    }
    if (ejey) {
        if (cod == 37) {
            direccionY = 0;
            direccionX = -tamanho;
            ejey = false;
            ejex = true;
        }
        if (cod == 39) {
            direccionX = tamanho;
            direccionY = 0;
            ejex = true;
            ejey = false;
        }
    }
}
function direccion(i) {
    if (ejex) {
        if (i == 1) {
            direccionY = -tamanho;
            direccionX = 0;
            ejex = false;
            ejey = true;
            
        }
        if (i == 2) {
            direccionY = tamanho;
            direccionX = 0;
            ejex = false;
            ejey = true;
        }
    }
    if (ejey) {
        if (i == 3) {
            direccionY = 0;
            direccionX = -tamanho;
            ejey = false;
            ejex = true;
        }
        if (i == 4) {
            direccionX = tamanho;
            direccionY = 0;
            ejex = true;
            ejey = false;
        }
    }
}


function dibujar() {
    var lienzo = document.getElementById("lienzo");
    //acceder al contecto grafico del canvas 
    var ctx = lienzo.getContext("2d");
    //cuadro de limpieza 
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    //dibujar elementos
    cabeza.dibujar(ctx)
    comida.dibujar(ctx)
}

function main() {
     chocarcola();
    choquepared()
    dibujar();
    movimiento();
    if (cabeza.colicion(comida)) {
        comida.colocar()
        cabeza.anhadir()
        this.contador = contador + 1
        document.getElementById("contador").innerHTML = "Puntuacion:" + contador
  
    }
}
setInterval("main()", velocidad);
//conttol+shift+u (odigo asii hexa)
// > = 3e
// < =3c