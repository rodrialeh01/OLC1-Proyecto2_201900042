"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class If extends Instruccion_1.Instruccion {
    constructor(condicion, listainstrucciones, listaelif, listainstruccioneselse, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
        this.listaelif = listaelif;
        this.listainstruccioneselse = listainstruccioneselse;
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
            if (this.listaelif) {
                for (let i of this.listaelif) {
                    const operation = i.interpretar(arbol, tabla);
                    if (operation) {
                        return false;
                    }
                }
            }
            if (this.listainstruccioneselse) {
                const tablaLocal = new SymbolTable_1.default(tabla);
                for (let i of this.listainstruccioneselse) {
                    i.interpretar(arbol, tablaLocal);
                }
                return false;
            }
        }
    }
}
exports.default = If;
