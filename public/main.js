import { Juego, Paso, Pieza, Movimiento } from "./ajedrez.js";
import { Rey, Reina, Alfil, Torre, Peon, Caballo } from "./piezas.js";
import * as REGLAS from "./reglas.js";

let juego = new Juego([8, 8]);
juego.agregar_pieza([0, 0], new Torre(1, 0));
juego.agregar_pieza([0, 7], new Torre(1, 1));
juego.agregar_pieza([7, 0], new Torre(0, 0));
juego.agregar_pieza([7, 7], new Torre(0, 1));
juego.agregar_pieza([0, 1], new Alfil(1, 0));
juego.agregar_pieza([0, 6], new Alfil(1, 1));
juego.agregar_pieza([7, 1], new Alfil(0, 0));
juego.agregar_pieza([7, 6], new Alfil(0, 1));
juego.agregar_pieza([0, 2], new Caballo(1, 0));
juego.agregar_pieza([0, 5], new Caballo(1, 1));
juego.agregar_pieza([7, 2], new Caballo(0, 0));
juego.agregar_pieza([7, 5], new Caballo(0, 1));
juego.agregar_pieza([0, 3], new Reina(1, 0));
juego.agregar_pieza([7, 3], new Reina(0, 0));
juego.agregar_pieza([0, 4], new Rey(1, 0));
juego.agregar_pieza([7, 4], new Rey(0, 0));
juego.agregar_pieza([1, 0], new Peon(1, 0));
juego.agregar_pieza([1, 1], new Peon(1, 1));
juego.agregar_pieza([1, 2], new Peon(1, 2));
juego.agregar_pieza([1, 3], new Peon(1, 3));
juego.agregar_pieza([1, 4], new Peon(1, 4));
juego.agregar_pieza([1, 5], new Peon(1, 5));
juego.agregar_pieza([1, 6], new Peon(1, 6));
juego.agregar_pieza([1, 7], new Peon(1, 7));
juego.agregar_pieza([6, 0], new Peon(0, 0));
juego.agregar_pieza([6, 1], new Peon(0, 1));
juego.agregar_pieza([6, 2], new Peon(0, 2));
juego.agregar_pieza([6, 3], new Peon(0, 3));
juego.agregar_pieza([6, 4], new Peon(0, 4));
juego.agregar_pieza([6, 5], new Peon(0, 5));
juego.agregar_pieza([6, 6], new Peon(0, 6));
juego.agregar_pieza([6, 7], new Peon(0, 7));

let posicion = [2, 2];

let pieza = new Pieza(0, "B", 0, [
  new Movimiento([
    new Paso([2, 1], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([2, 0], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([2, 2], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([2, 0], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([1, 1], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([1, 0], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([1, 2], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([1, 0], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([2, 2], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([0, 2], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([1, 2], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([0, 2], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([1, 1], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([0, 1], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
  new Movimiento([
    new Paso([2, 1], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.CANTIDAD_MAX]: 1 }),
    new Paso([0, 1], { [REGLAS.CANTIDAD_MIN]: 0, [REGLAS.INCREMENTO]: 2 }),
  ]),
]);

// juego.agregar_pieza(posicion, pieza);

document.querySelectorAll(".casillero").forEach((casillero) => {
  casillero.addEventListener("click", function () {
    let posicion = this.id.match(/\d+/g).map(Number);
    reset();

    if (!juego.obtener_casillero(posicion).esta_vacio()) {
      juego
        .obtener_pieza(posicion)
        .proyeccion_movimientos(posicion, juego)
        .forEach((proyeccion) => {
          marcar_casillero(proyeccion);
        });
    }
  });
});

function marcar_casillero(posicion) {
  let casillero = document.getElementById(
    "fila" + posicion[0] + "columna" + posicion[1]
  );
  casillero.classList.add("rojo");
}

function reset() {
  document.querySelectorAll(".casillero").forEach((pieza) => {
    pieza.classList.remove("rojo");
  });
}

juego_a_html(juego);

document.getElementById("crear_pieza").addEventListener("click", function () {
  var fila = document.getElementById("fila").value;
  var columna = document.getElementById("columna").value;
  var pieza = document.getElementById("pieza").value;
  var equipo = document.getElementById("equipo").value;
  // Utiliza un switch para asignar el carácter Unicode correcto de acuerdo a la pieza seleccionada
  switch (pieza) {
    case "rey":
      juego.agregar_pieza(
        [fila, columna],
        new Rey(equipo == "blanco" ? 0 : 1, 0)
      );
      break;
    case "reina":
      juego.agregar_pieza(
        [fila, columna],
        new Reina(equipo == "blanco" ? 0 : 1, 0)
      );
      break;
    case "torre":
      juego.agregar_pieza(
        [fila, columna],
        new Torre(equipo == "blanco" ? 0 : 1, 0)
      );
      break;
    case "alfil":
      juego.agregar_pieza(
        [fila, columna],
        new Alfil(equipo == "blanco" ? 0 : 1, 0)
      );
      break;
    case "caballo":
      juego.agregar_pieza(
        [fila, columna],
        new Caballo(equipo == "blanco" ? 0 : 1, 0)
      );
      break;
    case "peon":
      juego.agregar_pieza(
        [fila, columna],
        new Peon(equipo == "blanco" ? 0 : 1, 0)
      );
      break;
  }
  mostrar_pieza([fila, columna]);
});

function mostrar_pieza(posicion) {
  let casillero = juego.obtener_casillero(posicion);
  let source = "./resources/";
  if (casillero.obtener_contenido().equipo == 1) {
    source += "b";
  } else {
    source += "w";
  }
  switch (casillero.obtener_contenido().nombre) {
    case "K":
      source += "k";
      break;
    case "Q":
      source += "q";
      break;
    case "R":
      source += "r";
      break;
    case "B":
      source += "b";
      break;
    case "N":
      source += "n";
      break;
    case "P":
      source += "p";
      break;
  }
  source += ".png";

  let img = document.createElement("img");
  img.setAttribute("src", source);
  img.classList.add("pieza");
  let casilla = document.getElementById(
    "fila" + casillero.posicion[0] + "columna" + casillero.posicion[1]
  );
  casilla.innerHTML = "";
  casilla.appendChild(img);
}

function juego_a_html(juego) {
  juego.obtener_casilleros().forEach((casillero) => {
    if (!casillero.esta_vacio()) {
      mostrar_pieza(casillero.posicion);
    }
  });
}
