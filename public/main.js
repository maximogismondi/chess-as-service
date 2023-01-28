import * as chess from "./chess.js";

let juego = new chess.Juego([8, 8]);
juego.agregar_pieza([0, 0], new chess.Torre(0, 0));
juego.agregar_pieza([0, 7], new chess.Torre(0, 1));
juego.agregar_pieza([7, 0], new chess.Torre(1, 0));
juego.agregar_pieza([7, 7], new chess.Torre(1, 1));
juego.agregar_pieza([0, 1], new chess.Alfil(0, 0));
juego.agregar_pieza([0, 6], new chess.Alfil(0, 1));
juego.agregar_pieza([7, 1], new chess.Alfil(1, 0));
juego.agregar_pieza([7, 6], new chess.Alfil(1, 1));
juego.agregar_pieza([0, 2], new chess.Caballo(0, 0));
juego.agregar_pieza([0, 5], new chess.Caballo(0, 1));
juego.agregar_pieza([7, 2], new chess.Caballo(1, 0));
juego.agregar_pieza([7, 5], new chess.Caballo(1, 1));
juego.agregar_pieza([0, 3], new chess.Reina(0, 0));
juego.agregar_pieza([7, 3], new chess.Reina(1, 0));
juego.agregar_pieza([0, 4], new chess.Rey(0, 0));
juego.agregar_pieza([7, 4], new chess.Rey(1, 0));
juego.agregar_pieza([1, 0], new chess.Peon(0, 0));
juego.agregar_pieza([1, 1], new chess.Peon(0, 1));
juego.agregar_pieza([1, 2], new chess.Peon(0, 2));
juego.agregar_pieza([1, 3], new chess.Peon(0, 3));
juego.agregar_pieza([1, 4], new chess.Peon(0, 4));
juego.agregar_pieza([1, 5], new chess.Peon(0, 5));
juego.agregar_pieza([1, 6], new chess.Peon(0, 6));
juego.agregar_pieza([1, 7], new chess.Peon(0, 7));
juego.agregar_pieza([6, 0], new chess.Peon(1, 0));
juego.agregar_pieza([6, 1], new chess.Peon(1, 1));
juego.agregar_pieza([6, 2], new chess.Peon(1, 2));
juego.agregar_pieza([6, 3], new chess.Peon(1, 3));
juego.agregar_pieza([6, 4], new chess.Peon(1, 4));
juego.agregar_pieza([6, 5], new chess.Peon(1, 5));
juego.agregar_pieza([6, 6], new chess.Peon(1, 6));
juego.agregar_pieza([6, 7], new chess.Peon(1, 7));

juego_a_html(juego);

function juego_a_html(juego) {
  juego.obtener_casilleros().forEach((casillero) => {
    let pieza = casillero.obtener_contenido();
    if (pieza) {
      let caracter;
      switch (pieza.nombre) {
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
