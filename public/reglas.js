import { INFINITO } from "./nomenclatura.js";

export const JUEGO = {
  friendly_fire: false,
};

export const CASILLERO = {};

export const MOVIMIENTO = {
  capture: true,
  capture_only: false,
  en_passant: false,
  forward_only: false,
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

export const PIEZA = {
  check: false,
  castling: false,
  promotion: false,
};
