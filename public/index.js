LETRAS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

NUMEROS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
];

COLORES = ["W", "B"];

DIRECCIONES = ["N", "S", "E", "W", "NE", "NO", "SE", "SO"];

NOMENCLATURA_REY = "K";
NOMENCLATURA_REINA = "Q";
NOMENCLATURA_TORRE = "R";
NOMENCLATURA_ALFIL = "B";
NOMENCLATURA_CABALLO = "N";
NOMENCLATURA_PEON = "P";

NOMENCLATURA_CONECTOR = "+";
NOMENCLATURA_SEPARADOR = "-";
NOMENCLATURA_INFINITO = "∞";
NOMENCLATURA_EXCLUSIVO = "*";

REGLAS_MOVIMIENTO_DEFECTO = {
  forward_only: false,
  capture: true,
  capture_only: false,
  en_passant: false,
};
REGLAS_PIEZA_DEFECTO = {
  check: false,
  castling: false,
  jump: false,
  promotion: false,
};

class Juego {
  constructor(largo, alto) {
    this.tablero = [];
    LETRAS.slice(0, largo).forEach((letra) => {
      this.tablero.push([]);
      NUMEROS.slice(0, alto).forEach((numero) => {
        this.tablero[this.tablero.length - 1] = new Casillero(letra, numero);
      });
    });
  }

  agregar_pieza(letra, numero, pieza) {
    //el casillero debe estar vacio?
    //no puede haber 2 piezas con la misma nomenclatura y color
    this.tablero[LETRAS.indexOf(letra)][
      [NUMEROS.indexOf(numero)]
    ].actualizar_contenido(pieza);
  }

  obtener_casillero(letra, numero) {
    return this.tablero[LETRAS.indexOf(letra)][NUMEROS.indexOf(numero)];
  }

  obtener_pieza(letra, numero) {
    if (this.obtener_casillero(letra, numero).esta_vacio()) {
      return null;
    }
    this.obtener_casillero(letra, numero).contenido;
  }
}

class Casillero {
  constructor(letra, numero, contenido = null) {
    this.letra = letra;
    this.numero = numero;
    this.contenido = contenido;
  }

  nomenclatura() {
    return letra + this.numero;
  }
  esta_vacio() {
    return this.contenido == null;
  }
  actualizar_contenido(pieza = null) {
    this.contenido = pieza;
  }
}

class Movimiento {
  constructor(direcciones, reglas = {}) {
    this.direcciones = direcciones;

    REGLAS_MOVIMIENTO_DEFECTO.forEach((value, key) => {
      if (!reglas.has(key)) {
        reglas[key] = value;
      }
    });

    this.reglas = reglas;
  }
  nomenclatura() {
    return this.direcciones
      .map((direccion) => {
        return direccion.nomenclatura();
      })
      .join(NOMENCLATURA_CONECTOR);
  }
}

class Paso {
  constructor(direccion, cantidad_casillas = NOMENCLATURA_INFINITO) {
    this.direccion = direccion;
    this.cantidad_casillas = cantidad_casillas;
  }
  nomenclatura() {
    let nomenclatura = [this.direccion];
    if (this.cantidad_casillas != NOMENCLATURA_INFINITO) {
      nomenclatura.push(this.cantidad_casillas);
    }
    return nomenclatura.join(NOMENCLATURA_SEPARADOR);
  }
}

class Pieza {
  constructor(color, nombre, numero) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
    this.posibles_movimientos = [];
    this.reglas = REGLAS_PIEZA_DEFECTO;
  }
  nomenclatura() {
    return [color, nombre, numero].join(NOMENCLATURA_SEPARADOR);
  }
  obtener_posibles_movimientos() {
    return this.posibles_movimientos.map((movimiento) => {
      return movimiento.nomenclatura();
    });
  }
}

class Rey extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA_REY, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(DIRECCIONES[0], 1)]),
      new Movimiento([new Paso(DIRECCIONES[1], 1)]),
      new Movimiento([new Paso(DIRECCIONES[2], 1)]),
      new Movimiento([new Paso(DIRECCIONES[3], 1)]),
      new Movimiento([new Paso(DIRECCIONES[4], 1)]),
      new Movimiento([new Paso(DIRECCIONES[5], 1)]),
      new Movimiento([new Paso(DIRECCIONES[6], 1)]),
      new Movimiento([new Paso(DIRECCIONES[7], 1)]),
    ];
    this.reglas["check"] = true;
    this.reglas["castling"] = true;
  }
}

class Reina extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA_REINA, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(DIRECCIONES[0])]),
      new Movimiento([new Paso(DIRECCIONES[1])]),
      new Movimiento([new Paso(DIRECCIONES[2])]),
      new Movimiento([new Paso(DIRECCIONES[3])]),
      new Movimiento([new Paso(DIRECCIONES[4])]),
      new Movimiento([new Paso(DIRECCIONES[5])]),
      new Movimiento([new Paso(DIRECCIONES[6])]),
      new Movimiento([new Paso(DIRECCIONES[7])]),
    ];
  }
}

class Torre extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA_TORRE, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(DIRECCIONES[0])]),
      new Movimiento([new Paso(DIRECCIONES[1])]),
      new Movimiento([new Paso(DIRECCIONES[2])]),
      new Movimiento([new Paso(DIRECCIONES[3])]),
    ];
    this.reglas["castling"] = true;
  }
}

class Alfil extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA_ALFIL, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(DIRECCIONES[4])]),
      new Movimiento([new Paso(DIRECCIONES[5])]),
      new Movimiento([new Paso(DIRECCIONES[6])]),
      new Movimiento([new Paso(DIRECCIONES[7])]),
    ];
  }
}

class Caballo extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA_CABALLO, numero);
    this.posibles_movimientos = [
      new Movimiento(
        [new Paso(DIRECCIONES[0], 1), new Paso(DIRECCIONES[2], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[0], 1), new Paso(DIRECCIONES[3], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[0], 2), new Paso(DIRECCIONES[2], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[0], 2), new Paso(DIRECCIONES[3], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[1], 1), new Paso(DIRECCIONES[2], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[1], 1), new Paso(DIRECCIONES[3], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[1], 2), new Paso(DIRECCIONES[2], 2)],
        { exact: true }
      ),
      new Movimiento(
        [new Paso(DIRECCIONES[1], 2), new Paso(DIRECCIONES[3], 2)],
        { exact: true }
      ),
    ];
    this.reglas["jump"] = true;
  }
}

class Peon extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA_ALFIL, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(DIRECCIONES[0], 1)], {
        forward_only: true,
        capture: false,
      }),
      new Movimiento([new Paso(DIRECCIONES[0], 2)], {
        forward_only: true,
        capture: false,
        en_passant: true,
      }),
      new Movimiento([new Paso(DIRECCIONES[1], 1)], {
        forward_only: true,
        capture: false,
      }),
      new Movimiento([new Paso(DIRECCIONES[1], 2)], {
        forward_only: true,
        capture: false,
        en_passant: true,
      }),
      new Movimiento([new Paso(DIRECCIONES[4], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso(DIRECCIONES[5], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso(DIRECCIONES[6], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso(DIRECCIONES[7], 1)], {
        forward_only: true,
        capture_only: true,
      }),
    ];
    this.reglas = { promotion: true };
  }
}

let juego = new Juego(8, 8);
juego.agregar_pieza("a", "1", new Rey(COLORES[0], 1));
console.log(juego.obtener_pieza("a", "1").obtener_posibles_movimientos());
