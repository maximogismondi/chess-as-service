import { INFINITO } from "./nomenclatura.js";

export const FUEGO_AMIGO = "friendly_fire";
export const DIRECCION_ADELANTE = "forward";
export const DIMENSION_ADELANTE = "forward_dimention";
export const JUGADORES = "players";

export const JUEGO = {
  [FUEGO_AMIGO]: false,
  [DIMENSION_ADELANTE]: 0,
  [DIRECCION_ADELANTE]: [2, 1],
  [JUGADORES]: 2,
  //se cargan las direcciones que se consideran adelante por equipo
};

export const CASILLERO = {};

export const CAPTURAR = "capture";
export const SOLO_CAPTURAR = "capture_only";
export const EN_PASSANT = "en_passant";
export const SOLO_ADELANTE = "forward_only";

export const MOVIMIENTO = {
  [CAPTURAR]: true,
  [SOLO_CAPTURAR]: false,
  [EN_PASSANT]: false,
  [SOLO_ADELANTE]: false,
};

export const SALTAR = "jump";
export const MOVIMIENTO_EXACTO = "exact";
export const INCREMENTO = "increment";
export const CANTIDAD_MIN = "min_quantity";
export const CANTIDAD_MAX = "max_quantity";

export const PASO = {
  [SALTAR]: false,
  [MOVIMIENTO_EXACTO]: false,
  [INCREMENTO]: 1,
  [CANTIDAD_MIN]: 1,
  [CANTIDAD_MAX]: INFINITO,
};

export const JAQUE = "check";
export const ENROQUE = "castling";
export const PROMOCION = "promotion";

export const PIEZA = {
  [JAQUE]: false,
  [ENROQUE]: false,
  [PROMOCION]: false,
};
