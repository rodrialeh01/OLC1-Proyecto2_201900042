"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Imprimir extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Error_1.default)
            return valor;
        arbol.actualizaConsola(String(valor.value));
    }
}
exports.default = Imprimir;
