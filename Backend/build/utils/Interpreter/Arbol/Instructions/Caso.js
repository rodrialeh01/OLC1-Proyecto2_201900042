"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Break_1 = __importDefault(require("./Break"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Caso extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(arbol, tabla) {
        let tablalocal = new SymbolTable_1.default(tabla);
        if (this.instrucciones != null) {
            for (let i of this.instrucciones) {
                let ins = i.interpretar(arbol, tablalocal);
                if (ins instanceof Break_1.default) {
                    return ins;
                }
            }
        }
    }
}
exports.default = Caso;
