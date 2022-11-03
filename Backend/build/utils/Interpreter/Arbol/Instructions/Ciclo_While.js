"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Break_1 = __importDefault(require("./Break"));
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class While extends Instruccion_1.Instruccion {
    constructor(condicion, listainstrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }
    interpretar(arbol, tabla) {
        let condiciontemp = true;
        Continuacion: while (condiciontemp) {
            let condicion = this.condicion.interpretar(arbol, tabla);
            if (condicion.type == Data_1.DataType.BOOLEANO) {
                if (condicion.value == true) {
                    const tablaLocal = new SymbolTable_1.default(tabla);
                    for (let i of this.listainstrucciones) {
                        let instrucciones = i.interpretar(arbol, tablaLocal);
                        if (instrucciones instanceof Break_1.default) {
                            return instrucciones;
                        }
                        else if (instrucciones instanceof Continue_1.default) {
                            continue Continuacion;
                        }
                        else if (instrucciones instanceof Return_1.default) {
                            return instrucciones;
                        }
                    }
                }
                else {
                    condiciontemp = false;
                    break;
                }
            }
            else {
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La condicion no es booleana", this.linea, this.columna);
            }
        }
    }
}
exports.default = While;
