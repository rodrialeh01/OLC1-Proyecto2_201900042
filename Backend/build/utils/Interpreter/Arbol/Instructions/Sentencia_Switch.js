"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const insbreak = require('./Break');
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Switch extends Instruccion_1.Instruccion {
    constructor(condicion, listacasos, listainsdefault, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listacasos = listacasos;
        this.listainsdefault = listainsdefault;
    }
    interpretar(arbol, tabla) {
        let tablalocal = new SymbolTable_1.default(tabla);
        let entrar = false;
        let breakint = false;
        for (let caso of this.listacasos) {
            let valid = this.condicion.interpretar(arbol, tabla);
            let expcaso = caso.interpretar(arbol, tabla);
            if (valid == expcaso || entrar) {
                entrar = true;
                let ejecutar = caso.interpretar(arbol, tablalocal);
                if (ejecutar instanceof insbreak.Break) {
                    breakint = true;
                    return ejecutar;
                }
            }
        }
    }
}
exports.default = Switch;
