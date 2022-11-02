"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Continue extends Instruccion_1.Instruccion {
    constructor(fila, columna) {
        super(fila, columna);
    }
    interpretar(arbol, tabla) {
        return this;
    }
}
exports.default = Continue;
