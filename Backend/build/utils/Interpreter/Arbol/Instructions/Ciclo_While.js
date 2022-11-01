"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class While extends Instruccion_1.Instruccion {
    constructor(condicion, listainstrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }
    interpretar(arbol, tabla) {
        const tablaLocal = new SymbolTable_1.default(tabla);
        if (typeof (0, cloneDeep_1.default)(this.condicion).interpretar(arbol, tablaLocal) == "boolean") {
            while ((0, cloneDeep_1.default)(this.condicion).interpretar(arbol, tablaLocal)) {
                const instrucciones = (0, cloneDeep_1.default)(this.listainstrucciones);
                for (let i of instrucciones) {
                    if (i instanceof Instruccion_1.Instruccion) {
                        console.log("Instruccion: ", (i.constructor.name));
                        if (i.constructor.name == "Break") {
                            return i.interpretar(arbol, tablaLocal);
                        }
                        i.interpretar(arbol, tablaLocal);
                    }
                }
            }
        }
    }
}
exports.default = While;
