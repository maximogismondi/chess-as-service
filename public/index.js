NOMENCLATURA_CASILLEROS = [
  [
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
  ],
  [
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
  ],
  [
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "ζ",
    "η",
    "θ",
    "ι",
    "κ",
    "λ",
    "μ",
    "ν",
    "ξ",
    "ο",
    "π",
    "ρ",
    "σ",
    "τ",
    "υ",
    "φ",
    "χ",
    "ψ",
    "ω",
  ],
];

// ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"]
// ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω']
// ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
// ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"]

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

REGLAS_JUEGO_DEFECTO = {};
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
  constructor(casilleros_dimension) {
    this.reglas = REGLAS_JUEGO_DEFECTO;
    this.dimension = casilleros_dimension.length;
    this.tablero = new Map();
    this._crear_tablero([], casilleros_dimension);
  }

  _crear_tablero(nomenclatura_acumulada, casilleros_dimension) {
    let dimension_actual = nomenclatura_acumulada.length;
    let dimension_total = casilleros_dimension.length;

    if (dimension_actual == dimension_total - 1) {
      for (let i = 0; i < casilleros_dimension[dimension_actual]; i++) {
        this.tablero.set(
          nomenclatura_acumulada.concat(i).join(NOMENCLATURA_SEPARADOR),
          new Casillero(nomenclatura_acumulada.concat(i))
        );
      }
      return;
    }

    for (let i = 0; i < casilleros_dimension[dimension_actual]; i++) {
      this._crear_tablero(
        nomenclatura_acumulada.concat(i),
        casilleros_dimension
      );
    }
  }

  agregar_pieza(posicion, pieza) {
    //el casillero debe estar vacio?
    //no puede haber 2 piezas con la misma nomenclatura y color
    this.tablero
      .get(posicion.join(NOMENCLATURA_SEPARADOR))
      .actualizar_contenido(pieza);
  }

  obtener_casillero(letra, numero) {
    return this.tablero[letra][numero];
  }

  obtener_pieza(letra, numero) {
    if (this.obtener_casillero(letra, numero).esta_vacio()) {
      return null;
    }
    this.obtener_casillero(letra, numero).contenido;
  }
}

class Casillero {
  constructor(posicion, contenido = null) {
    this.posicion = posicion;
    this.dimension = posicion.length;
    this.contenido = contenido;
  }

  nomenclatura() {
    return this.posicion.join(NOMENCLATURA_CONECTOR);
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
    this.reglas = Object.assign({ ...REGLAS_MOVIMIENTO_DEFECTO }, reglas);
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
  constructor(
    color,
    nombre,
    numero,
    posibles_movimientos = [],
    reglas = { ...REGLAS_PIEZA_DEFECTO }
  ) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
    this.posibles_movimientos = posibles_movimientos;
    this.reglas = reglas;
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
    super(color, NOMENCLATURA_REY, numero, {
      check: true,
      castling: true,
    });
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
    Object.assign(this.reglas, {
      check: true,
      castling: true,
    });
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
    Object.assign(this.reglas, {
      castling: true,
    });
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
    Object.assign(this.reglas, {
      jump: true,
    });
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
    Object.assign(this.reglas, {
      promotion: true,
    });
  }
}

console.log("numero: le pondria otro nombre a eso");

TAMANO = [8, 8];

let juego = new Juego(TAMANO);
juego.agregar_pieza([0, 0], new Rey(0, 1));
juego.agregar_pieza([0, 1], new Caballo(0, 1));
console.log(juego);
// console.log(juego.obtener_pieza(0, 0).obtener_posibles_movimientos());
