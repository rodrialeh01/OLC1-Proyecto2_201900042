"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucle = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
const Break_1 = __importDefault(require("./Break"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
exports.bucle = false;
class If extends Instruccion_1.Instruccion {
    constructor(condicion, listainstrucciones, listaelif, listainstruccioneselse, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
        this.listaelif = listaelif;
        this.listainstruccioneselse = listainstruccioneselse;
    }
    interpretar(arbol, tabla) {
        let tablaLocal = new SymbolTable_1.default(tabla);
        let condicion = this.condicion.interpretar(arbol, tabla);
        if (condicion.type == Data_1.DataType.BOOLEANO) {
            if (condicion.value == true) {
                for (let i of this.listainstrucciones) {
                    let instrucciones1 = i.interpretar(arbol, tablaLocal);
                    if (instrucciones1 instanceof Break_1.default) {
                        return instrucciones1;
                    }
                }
            }
            else {
                if (this.listaelif != null) {
                    for (let i of this.listaelif) {
                        let instrucciones2 = i.interpretar(arbol, tablaLocal);
                        if (instrucciones2 instanceof Break_1.default) {
                            return instrucciones2;
                        }
                    }
                }
                if (this.listainstruccioneselse != null) {
                    for (let i of this.listainstruccioneselse) {
                        let instrucciones3 = i.interpretar(arbol, tablaLocal);
                        if (instrucciones3 instanceof Break_1.default) {
                            return instrucciones3;
                        }
                    }
                }
            }
        }
        else {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La condicion no es booleana", this.linea, this.columna);
        }
    }
}
exports.default = If;
