"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Break_1 = __importDefault(require("./Break"));
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
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
        for (this.insvar.interpretar(arbol, tablaLocal); this.condicion.interpretar(arbol, tablaLocal).value; this.actualizacion.interpretar(arbol, tablaLocal)) {
            for (let i of this.listainstrucciones) {
                let instrucciones1 = i.interpretar(arbol, tablaLocal);
                if (instrucciones1 instanceof Break_1.default) {
                    break;
                }
                else if (instrucciones1 instanceof Return_1.default) {
                    return instrucciones1;
                }
                else if (instrucciones1 instanceof Continue_1.default) {
                    continue;
                }
            }
        }
    }
}
exports.default = For;
