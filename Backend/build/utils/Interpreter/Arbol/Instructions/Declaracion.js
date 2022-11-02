"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Declaracion extends Instruccion_1.Instruccion {
    constructor(ids, tipo, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.tipo = tipo;
    }
    interpretar(arbol, tabla) {
        for (let id of this.ids) {
            if (this.tipo === Data_1.DataType.ENTERO) {
                const validar = tabla.saveSymbol(id, 0, Data_1.DataType.ENTERO, this.linea, this.columna);
                if (validar) {
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }
            else if (this.tipo === Data_1.DataType.DECIMAL) {
                const validar = tabla.saveSymbol(id, 0.0, Data_1.DataType.DECIMAL, this.linea, this.columna);
                if (validar) {
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }
            else if (this.tipo === Data_1.DataType.BOOLEANO) {
                const validar = tabla.saveSymbol(id, true, Data_1.DataType.BOOLEANO, this.linea, this.columna);
                if (validar) {
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }
            else if (this.tipo === Data_1.DataType.CARACTER) {
                const validar = tabla.saveSymbol(id, "0", Data_1.DataType.CARACTER, this.linea, this.columna);
                if (validar) {
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }
            else if (this.tipo === Data_1.DataType.CADENA) {
                const validar = tabla.saveSymbol(id, "", Data_1.DataType.CADENA, this.linea, this.columna);
                if (validar) {
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "Tipo de dato mal ingresado", this.linea, this.columna);
            }
        }
    }
}
exports.default = Declaracion;
