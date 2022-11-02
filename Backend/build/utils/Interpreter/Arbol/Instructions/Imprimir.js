"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
class Imprimir extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        console.log(this.expresion);
        let valor = this.expresion.interpretar(arbol, tabla);
        console.log(valor);
        arbol.actualizaConsola(String(valor.value));
    }
}
exports.default = Imprimir;
