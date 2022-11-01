"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
class Not extends Instruccion_1.Instruccion {
    constructor(operadorDer, fila, columna) {
        super(fila, columna);
        this.operadorDer = operadorDer;
    }
    interpretar(arbol, tabla) {
        let valorDer = this.operadorDer.interpretar(arbol, tabla);
        return {
            "type": Data_1.DataType.BOOLEANO,
            "value": (!(valorDer.value))
        };
    }
}
exports.default = Not;
