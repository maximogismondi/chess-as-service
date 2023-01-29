import { Juego, Paso, Pieza, Movimiento } from "./chess.js";
import { Rey, Reina, Alfil, Torre, Peon, Caballo } from "./piezas.js";

let juego = new Juego([8, 8]);
// juego.agregar_pieza([0, 0], new Torre(0, 0));
// juego.agregar_pieza([0, 7], new Torre(0, 1));
// juego.agregar_pieza([7, 0], new Torre(1, 0));
// juego.agregar_pieza([7, 7], new Torre(1, 1));
// juego.agregar_pieza([0, 1], new Alfil(0, 0));
// juego.agregar_pieza([0, 6], new Alfil(0, 1));
// juego.agregar_pieza([7, 1], new Alfil(1, 0));
// juego.agregar_pieza([7, 6], new Alfil(1, 1));
// juego.agregar_pieza([0, 2], new Caballo(0, 0));
// juego.agregar_pieza([0, 5], new Caballo(0, 1));
// juego.agregar_pieza([7, 2], new Caballo(1, 0));
// juego.agregar_pieza([7, 5], new Caballo(1, 1));
// juego.agregar_pieza([0, 3], new Reina(0, 0));
// juego.agregar_pieza([7, 3], new Reina(1, 0));
// juego.agregar_pieza([0, 4], new Rey(0, 0));
// juego.agregar_pieza([7, 4], new Rey(1, 0));
// juego.agregar_pieza([1, 0], new Peon(0, 0));
// juego.agregar_pieza([1, 1], new Peon(0, 1));
// juego.agregar_pieza([1, 2], new Peon(0, 2));
// juego.agregar_pieza([1, 3], new Peon(0, 3));
// juego.agregar_pieza([1, 4], new Peon(0, 4));
// juego.agregar_pieza([1, 5], new Peon(0, 5));
// juego.agregar_pieza([1, 6], new Peon(0, 6));
// juego.agregar_pieza([1, 7], new Peon(0, 7));
// juego.agregar_pieza([6, 0], new Peon(1, 0));
// juego.agregar_pieza([6, 1], new Peon(1, 1));
// juego.agregar_pieza([6, 2], new Peon(1, 2));
// juego.agregar_pieza([6, 3], new Peon(1, 3));
// juego.agregar_pieza([6, 4], new Peon(1, 4));
// juego.agregar_pieza([6, 5], new Peon(1, 5));
// juego.agregar_pieza([6, 6], new Peon(1, 6));
// juego.agregar_pieza([6, 7], new Peon(1, 7));

let posicion = [3, 3];

let pieza = new Pieza(0, "B", 0, [
  new Movimiento([
    new Paso([1, 0]),
    new Paso([0, 1]),
    new Paso([2, 0]),
    new Paso([0, 2]),
  ]),
]);

console.log(pieza);

juego.agregar_pieza(posicion, pieza);
juego
  .obtener_pieza(posicion)
  .proyeccion_movimientos(posicion, juego)
  .forEach((proyeccion) => {
    let casillero = document.getElementById(
      "fila" + proyeccion[0] + "columna" + proyeccion[1]
    );
    casillero.className = "rojo";
  });

juego_a_html(juego);

function juego_a_html(juego) {
  juego.obtener_casilleros().forEach((casillero) => {
    if (!casillero.esta_vacio()) {
      let caracter;
      switch (casillero.obtener_contenido().nombre) {
        case "K":
          caracter = "♚";
          break;
        case "Q":
          caracter = "♛";
          break;
        case "R":
          caracter = "♜";
          break;
        case "B":
          caracter = "♝";
          break;
        case "N":
          caracter = "♞";
          break;
        case "P":
          caracter = "♟";
          break;
      }
      let texto = document.createTextNode(caracter);
      let casilla = document.getElementById(
        "fila" + casillero.posicion[0] + "columna" + casillero.posicion[1]
      );
      casilla.appendChild(texto);
    }
  });
}
