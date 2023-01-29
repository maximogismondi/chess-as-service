import { Pieza, Movimiento, Paso } from "./chess.js";
import * as NOMENCLATURA from "./nomenclatura.js";

export class Rey extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.REY, numero, {
      check: true,
      castling: true,
    });
    this.movimientos = [
      new Movimiento([new Paso([0, 1], 1)]),
      new Movimiento([new Paso([0, 2], 1)]),
      new Movimiento([new Paso([1, 0], 1)]),
      new Movimiento([new Paso([2, 0], 1)]),
      new Movimiento([new Paso([1, 1], 1)]),
      new Movimiento([new Paso([1, 2], 1)]),
      new Movimiento([new Paso([2, 1], 1)]),
      new Movimiento([new Paso([2, 2], 1)]),
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
    this.movimientos = [
      new Movimiento([new Paso([0, 1])]),
      new Movimiento([new Paso([0, 2])]),
      new Movimiento([new Paso([1, 0])]),
      new Movimiento([new Paso([2, 0])]),
      new Movimiento([new Paso([1, 1])]),
      new Movimiento([new Paso([1, 2])]),
      new Movimiento([new Paso([2, 1])]),
      new Movimiento([new Paso([2, 2])]),
    ];
  }
}

export class Torre extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.TORRE, numero);
    this.movimientos = [
      new Movimiento([new Paso([0, 1])]),
      new Movimiento([new Paso([0, 2])]),
      new Movimiento([new Paso([1, 0])]),
      new Movimiento([new Paso([2, 0])]),
    ];
    Object.assign(this.reglas, {
      castling: true,
    });
  }
}

export class Alfil extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.ALFIL, numero);
    this.movimientos = [
      new Movimiento([new Paso([1, 1])]),
      new Movimiento([new Paso([1, 2])]),
      new Movimiento([new Paso([2, 1])]),
      new Movimiento([new Paso([2, 2])]),
    ];
  }
}

export class Caballo extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.CABALLO, numero);
    this.movimientos = [
      new Movimiento([new Paso([0, 1], 1), new Paso([1, 0], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([1, 0], 1), new Paso([0, 1], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([0, 2], 1), new Paso([2, 0], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([2, 0], 1), new Paso([0, 2], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([0, 1], 1), new Paso([2, 0], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([1, 0], 1), new Paso([0, 2], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([0, 2], 1), new Paso([1, 0], 2)], {
        exact: true,
      }),
      new Movimiento([new Paso([2, 0], 1), new Paso([0, 1], 2)], {
        exact: true,
      }),
    ];
    Object.assign(this.reglas, {
      jump: true,
    });
  }
}

export class Peon extends Pieza {
  constructor(color, numero) {
    super(color, NOMENCLATURA.PEON, numero);
    this.movimientos = [
      new Movimiento([new Paso([1, 0], 1)], {
        forward_only: true,
        capture: false,
      }),
      new Movimiento([new Paso([1, 0], 2)], {
        forward_only: true,
        capture: false,
        en_passant: true,
      }),
      new Movimiento([new Paso([2, 0], 1)], {
        forward_only: true,
        capture: false,
      }),
      new Movimiento([new Paso([2, 0], 2)], {
        forward_only: true,
        capture: false,
        en_passant: true,
      }),
      new Movimiento([new Paso([1, 1], 1)], {
        forward_only: true,
        capture_only: false,
      }),
      new Movimiento([new Paso([2, 2], 1)], {
        forward_only: true,
        capture_only: false,
      }),
      new Movimiento([new Paso([1, 2], 1)], {
        forward_only: true,
        capture_only: true,
      }),
      new Movimiento([new Paso([2, 1], 1)], {
        forward_only: true,
        capture_only: false,
      }),
    ];
    Object.assign(this.reglas, {
      promotion: true,
    });
  }
}
