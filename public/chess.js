import * as NOMENCLATURA from "./nomenclatura.js";
import * as REGLAS from "./reglas.js";

export class Juego {
  constructor(dimension) {
    this.tablero = this._crear_tablero([], dimension);
    this.dimension = dimension;
    this.reglas = { ...REGLAS.JUEGO };
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
  constructor(posicion, contenido = null, reglas = { ...REGLAS.CASILLERO }) {
    this.posicion = posicion;
    this.contenido = contenido;
    this.reglas = reglas;
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
  constructor(
    color,
    nombre,
    numero,
    movimientos = [],
    reglas = { ...REGLAS.PIEZA }
  ) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
    this.movimientos = movimientos;
    this.reglas = reglas;
  }
  nomenclatura() {
    return [color, nombre, numero].join(NOMENCLATURA.SEPARADOR);
  }

  proyecciones_combinacion_pasos(
    movimiento,
    pasos_acumulados,
    posicion,
    juego
  ) {
    let pasos_restantes = movimiento.pasos.length - pasos_acumulados.length;

    if (pasos_restantes < 1) {
      return [movimiento.proyectar(posicion, pasos_acumulados)];
    }

    let proyecciones = [];
    let casilleros_paso_actual = 1;
    let paso_actual = movimiento.pasos[pasos_acumulados.length];
    let proyeccion = movimiento.proyectar(
      posicion,
      pasos_acumulados.concat(
        casilleros_paso_actual,
        ...Array.from({ length: pasos_restantes - 1 }, () => 1)
      )
    );

    while (
      (paso_actual.casilleros == NOMENCLATURA.INFINITO ||
        casilleros_paso_actual <= paso_actual.casilleros) &&
      juego.posicion_esta_en_tablero(proyeccion)
    ) {
      proyecciones = proyecciones.concat(
        this.proyecciones_combinacion_pasos(
          movimiento,
          pasos_acumulados.concat(casilleros_paso_actual),
          posicion,
          juego
        )
      );
      casilleros_paso_actual++;
      proyeccion = movimiento.proyectar(posicion, [
        ...pasos_acumulados,
        casilleros_paso_actual,
        ...Array.from({ length: pasos_restantes - 1 }, () => 1),
      ]);
    }
    return proyecciones;
  }

  proyeccion_movimientos(posicion, juego) {
    return Array.from(this.movimientos, (movimiento) => {
      let proyecciones_por_movimiento = [];
      if (movimiento.reglas[REGLAS.MOVIMIENTO_EXACTO]) {
        let proyeccion = [...posicion];

        proyecciones_por_movimiento = [
          movimiento.proyectar(
            proyeccion,
            Array.from(movimiento.pasos, (paso) => {
              return paso.casilleros;
            })
          ),
        ];
      } else {
        proyecciones_por_movimiento = this.proyecciones_combinacion_pasos(
          movimiento,
          [],
          posicion,
          juego
        );
      }

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
    let proyeccion = [...posicion];
    this.pasos.forEach((paso, i) => {
      paso.direccion.forEach((direccion, j) => {
        if (direccion == 1) {
          proyeccion[j] += casilleros[i];
        } else if (direccion == 2) {
          proyeccion[j] -= casilleros[i];
        }
      });
    });
    return proyeccion;
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
  constructor(direccion, casilleros = NOMENCLATURA.INFINITO) {
    // direccion viene en forma de array y con la direccion por dimension (0,1,2)
    this.direccion = direccion;
    this.casilleros = casilleros;
  }

  // nomenclatura() {
  //   let nomenclatura = [this.direccion];
  //   if (this.cantidad_casillas != NOMENCLATURA.INFINITO) {
  //     nomenclatura.push(this.cantidad_casillas);
  //   }
  //   return nomenclatura.join(NOMENCLATURA.SEPARADOR);
  // }
}
