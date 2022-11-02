"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Break_1 = __importDefault(require("./Break"));
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class For extends Instruccion_1.Instruccion {
    constructor(insvar, condicion, actualizacion, listainstrucciones, fila, columna) {
        super(fila, columna);
        this.insvar = insvar;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.listainstrucciones = listainstrucciones;
    }
    interpretar(arbol, tabla) {
        let tablaLocal = new SymbolTable_1.default(tabla);
        this.insvar.interpretar(arbol, tablaLocal);
        while (true) {
            let tablaLocal2 = new SymbolTable_1.default(tablaLocal);
            if (this.condicion.interpretar(arbol, tablaLocal).value == true) {
                for (let i of this.listainstrucciones) {
                    let instrucciones = i.interpretar(arbol, tablaLocal2);
                    if (instrucciones instanceof Break_1.default) {
                        return instrucciones;
                    }
                }
                this.actualizacion.interpretar(arbol, tablaLocal2);
            }
            else {
                break;
            }
        }
    }
}
exports.default = For;
