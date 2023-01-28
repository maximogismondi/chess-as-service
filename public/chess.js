import * as NOMENCLATURA from "./nomenclatura.js";
import * as REGLAS from "./reglas.js";

function flattenArray(arr) {
  let flatArray = [];

  arr.forEach((elem) => {
    if (Array.isArray(elem)) {
      flatArray = flatArray.concat(flattenArray(elem));
    } else {
      flatArray.push(elem);
    }
  });

  return flatArray;
}

export class Juego {
  constructor(casilleros_dimension) {
    this.reglas = REGLAS.JUEGO;
    this.dimension = casilleros_dimension.length;
    this.tablero = this._crear_tablero([], casilleros_dimension);
  }

  _crear_tablero(posicion_acumulada, casilleros_dimension) {
    let dimension_actual = posicion_acumulada.length;
    let dimension_total = casilleros_dimension.length;

    if (dimension_actual == dimension_total) {
      return new Casillero(posicion_acumulada);
    }

    return Array.from(
      Array(casilleros_dimension[dimension_actual]).keys(),
      (i) => {
        return this._crear_tablero(
          posicion_acumulada.concat(i),
          casilleros_dimension
        );
      }
    );
  }

  agregar_pieza(posicion, pieza) {
    //el casillero debe estar vacio?
    //no puede haber 2 piezas con la misma nomenclatura y color
    this.obtener_casillero(posicion).actualizar_contenido(pieza);
  }

  obtener_casillero(posicion) {
    let elemento = posicion.reduce(
      (casillero, indice) => casillero[indice],
      this.tablero
    );
    return elemento;
  }

  obtener_pieza(letra, numero) {
    if (this.obtener_casillero(letra, numero).esta_vacio()) {
      return null;
    }
    this.obtener_casillero(letra, numero).obtener_contenido();
  }

  obtener_casilleros() {
    return flattenArray(this.tablero);
  }
}

export class Casillero {
  constructor(posicion, contenido = null) {
    this.posicion = posicion;
    this.dimension = posicion.length;
    this.contenido = contenido;
  }

  nomenclatura() {
    return this.posicion.join(NOMENCLATURA.NOMENCLATURA.CONECTOR);
  }
  esta_vacio() {
    return this.contenido == null;
  }
  actualizar_contenido(pieza = null) {
    this.contenido = pieza;
  }
  obtener_contenido() {
    return this.contenido;
  }
}

export class Movimiento {
  constructor(direcciones, reglas = {}) {
    this.direcciones = direcciones;
    this.reglas = Object.assign({ ...REGLAS.MOVIMIENTO }, reglas);
  }
  nomenclatura() {
    return this.direcciones
      .map((direccion) => {
        return direccion.nomenclatura();
      })
      .join(NOMENCLATURA.CONECTOR);
  }
}

export class Paso {
  constructor(direccion, cantidad_casillas = NOMENCLATURA.INFINITO) {
    this.direccion = direccion;
    this.cantidad_casillas = cantidad_casillas;
  }
  nomenclatura() {
    let nomenclatura = [this.direccion];
    if (this.cantidad_casillas != NOMENCLATURA.INFINITO) {
      nomenclatura.push(this.cantidad_casillas);
    }
    return nomenclatura.join(NOMENCLATURA.SEPARADOR);
  }
}

export class Pieza {
  constructor(
    color,
    nombre,
    numero,
    posibles_movimientos = [],
    reglas = { ...REGLAS.PIEZA }
  ) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
    this.posibles_movimientos = posibles_movimientos;
    this.reglas = reglas;
  }
  nomenclatura() {
    return [color, nombre, numero].join(NOMENCLATURA.SEPARADOR);
  }
  obtener_posibles_movimientos() {
    return this.posibles_movimientos.map((movimiento) => {
      return movimiento.nomenclatura();
    });
  }
}

export class Rey extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.REY, numero, {
      check: true,
      castling: true,
    });
    this.posibles_movimientos = [
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[0], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[1], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[2], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[3], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[4], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[5], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[6], 1)]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[7], 1)]),
    ];
    Object.assign(this.reglas, {
      check: true,
      castling: true,
    });
  }
}

export class Reina extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.REINA, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[0])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[1])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[2])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[3])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[4])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[5])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[6])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[7])]),
    ];
  }
}

export class Torre extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.TORRE, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[0])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[1])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[2])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[3])]),
    ];
    Object.assign(this.reglas, {
      castling: true,
    });
  }
}

export class Alfil extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.ALFIL, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[4])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[5])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[6])]),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[7])]),
    ];
  }
}

export class Caballo extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.CABALLO, numero);
    this.posibles_movimientos = [
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[0], 1),
          new Paso(NOMENCLATURA.DIRECCIONES[2], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[0], 1),
          new Paso(NOMENCLATURA.DIRECCIONES[3], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[0], 2),
          new Paso(NOMENCLATURA.DIRECCIONES[2], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[0], 2),
          new Paso(NOMENCLATURA.DIRECCIONES[3], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[1], 1),
          new Paso(NOMENCLATURA.DIRECCIONES[2], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[1], 1),
          new Paso(NOMENCLATURA.DIRECCIONES[3], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[1], 2),
          new Paso(NOMENCLATURA.DIRECCIONES[2], 2),
        ],
        { exact: true }
      ),
      new Movimiento(
        [
          new Paso(NOMENCLATURA.DIRECCIONES[1], 2),
          new Paso(NOMENCLATURA.DIRECCIONES[3], 2),
        ],
        { exact: true }
      ),
    ];
    Object.assign(this.reglas, {
      jump: true,
    });
  }
}

export class Peon extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.PEON, numero);
    this.posibles_movimientos = [
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[0], 1)], {
        forward_only: true,
        capture: false,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[0], 2)], {
        forward_only: true,
        capture: false,
        en_passant: true,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[1], 1)], {
        forward_only: true,
        capture: false,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[1], 2)], {
        forward_only: true,
        capture: false,
        en_passant: true,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[4], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[5], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[6], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso(NOMENCLATURA.DIRECCIONES[7], 1)], {
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

// console.log(juego.obtener_pieza(0, 0).obtener_posibles_movimientos());
