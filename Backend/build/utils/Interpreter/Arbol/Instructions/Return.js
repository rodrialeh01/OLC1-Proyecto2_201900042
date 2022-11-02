"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Return extends Instruccion_1.Instruccion {
    constructor(exp, fila, columna) {
        super(fila, columna);
        this.exp = exp;
    }
    interpretar(arbol, tabla) {
        if (this.exp != null) {
            return this.exp.interpretar(arbol, tabla);
        }
        else {
            return this;
        }
    }
}
exports.default = Return;
