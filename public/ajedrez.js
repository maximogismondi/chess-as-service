import * as NOMENCLATURA from "./nomenclatura.js";
import * as REGLAS from "./reglas.js";

// alert("agregar proyectar por pasos y un proyectar general, seria genial");

export class Juego {
  constructor(dimension, reglas = REGLAS.JUEGO) {
    this.tablero = this._crear_tablero([], dimension);
    this.dimension = dimension;
    this.reglas = Object.assign({}, REGLAS.JUEGO, reglas);
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

  obtener_pieza(posicion) {
    if (this.obtener_casillero(posicion).esta_vacio()) {
      return null;
    }
    return this.obtener_casillero(posicion).obtener_contenido();
  }

  obtener_casilleros() {
    return this.tablero.flat(this.dimension.length - 1);
  }

  posicion_esta_en_tablero(posicion) {
    if (
      !posicion.map((pos, i) => pos < this.dimension[i]).every((val) => val)
    ) {
      return false;
    }
    if (!posicion.map((pos) => pos >= 0).every((val) => val)) {
      return false;
    }

    //checkear si el casillero esta habilitado o si no es una forma regular

    return true;
  }

  movimiento_valido(pieza, origen, destino) {
    if (origen.every((value, index) => value === destino[index])) {
      return false;
    }

    if (!this.posicion_esta_en_tablero(destino)) {
      return false;
    }

    //no haya una pieza aliada
    //verifiaca el camino si no salta
    //pueda comer
    //no pueda comer
    return true;
  }
}

export class Casillero {
  constructor(posicion, contenido = null, reglas = REGLAS.CASILLERO) {
    this.posicion = posicion;
    this.contenido = contenido;
    this.reglas = Object.assign({}, REGLAS.CASILLERO, reglas);
  }

  nomenclatura() {
    return this.posicion.join(NOMENCLATURA.NOMENCLATURA_CONECTOR);
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

export class Pieza {
  constructor(color, nombre, numero, movimientos = [], reglas = REGLAS.PIEZA) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
    this.movimientos = movimientos;
    this.reglas = Object.assign({}, REGLAS.PIEZA, reglas);
  }
  nomenclatura() {
    return [color, nombre, numero].join(NOMENCLATURA.SEPARADOR);
  }

  combinaciones_pasos(movimiento, pasos_acumulados, posicion, juego) {
    if (movimiento.pasos.length == pasos_acumulados.length) {
      return [pasos_acumulados];
    }

    let combinaciones = [];
    let paso_actual = movimiento.pasos[pasos_acumulados.length];

    for (
      let casilleros_paso_actual = paso_actual.cant_casilleros_minima();
      paso_actual.casilleros_correctos(casilleros_paso_actual) &&
      juego.posicion_esta_en_tablero(
        paso_actual.proyectar(posicion, casilleros_paso_actual)
      );
      casilleros_paso_actual += paso_actual.incremento()
    ) {
      combinaciones.push(
        ...this.combinaciones_pasos(
          movimiento,
          pasos_acumulados.concat(casilleros_paso_actual),
          paso_actual.proyectar(posicion, casilleros_paso_actual),
          juego
        )
      );
    }
    return combinaciones;
  }

  proyeccion_movimientos(posicion, juego) {
    return Array.from(this.movimientos, (movimiento) => {
      let combinaciones = this.combinaciones_pasos(
        movimiento,
        [],
        posicion,
        juego
      );
      let proyecciones_por_movimiento = Array.from(
        combinaciones,
        (combinacion) => {
          return movimiento.proyectar(posicion, combinacion);
        }
      );

      //me faltaria verificar para cada camino posible hacia la proyeccion

      return proyecciones_por_movimiento.filter((proyeccion) => {
        return juego.movimiento_valido(this, posicion, proyeccion);
      });
    }).flat();
  }
}

export class Movimiento {
  constructor(pasos, reglas = {}) {
    this.pasos = pasos;
    this.reglas = Object.assign({ ...REGLAS.MOVIMIENTO }, reglas);
  }

  proyectar(posicion, casilleros) {
    //validar
    return this.pasos.reduce(
      (proyeccion, paso, index) => {
        return paso.proyectar(proyeccion, casilleros[index]);
      },
      [...posicion]
    );

    // this.pasos.forEach((paso, i) => {
    //   proyeccion = paso.proyectar(proyeccion, casilleros[i]);
    // });
    // return proyeccion;
  }

  // nomenclatura() {
  //   return this.direcciones
  //     .map((direccion) => {
  //       return direccion.nomenclatura();
  //     })
  //     .join(NOMENCLATURA.CONECTOR);
  // }
}

export class Paso {
  constructor(direccion, reglas = REGLAS.PASO) {
    // direccion viene en forma de array y con la direccion por dimension (0,1,2)
    this.direccion = direccion;
    this.reglas = Object.assign({}, REGLAS.PASO, reglas);
  }

  proyectar(posicion, casilleros) {
    //validar
    let proyeccion = [...posicion];

    this.direccion.forEach((direccion, index) => {
      if (direccion == 1) {
        proyeccion[index] += casilleros;
      } else if (direccion == 2) {
        proyeccion[index] -= casilleros;
      }
    });
    return proyeccion;
  }

  casilleros_correctos(casilleros) {
    if (this.reglas[REGLAS.MOVIMIENTO_EXACTO]) {
      return casilleros == this.reglas[REGLAS.CANTIDAD_MAX];
    }
    if (this.reglas[REGLAS.CANTIDAD_MAX] != NOMENCLATURA.INFINITO) {
      return casilleros <= this.reglas[REGLAS.CANTIDAD_MAX];
    }
    return true;
  }

  cant_casilleros_minima() {
    if (this.reglas[REGLAS.MOVIMIENTO_EXACTO]) {
      return this.reglas[REGLAS.CANTIDAD_MAX];
    }
    //podria agregar una regla para 0 casilleros
    return this.reglas[REGLAS.CANTIDAD_MIN];
  }

  incremento() {
    //pondria reglas para aumentar de a dos o cosas de esas
    return this.reglas[REGLAS.INCREMENTO];
  }

  // nomenclatura() {
  //   let nomenclatura = [this.direccion];
  //   if (this.cantidad_casillas != NOMENCLATURA.INFINITO) {
  //     nomenclatura.push(this.cantidad_casillas);
  //   }
  //   return nomenclatura.join(NOMENCLATURA.SEPARADOR);
  // }
}
