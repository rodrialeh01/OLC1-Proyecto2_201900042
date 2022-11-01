"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Elif extends Instruccion_1.Instruccion {
    constructor(condicion, listainstrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }
    interpretar(arbol, tabla) {
        const operacion = this.condicion.interpretar(arbol, tabla);
        if (operacion) {
            const tablaLocal = new SymbolTable_1.default(tabla);
            for (let i of this.listainstrucciones) {
                i.interpretar(arbol, tablaLocal);
            }
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = Elif;
