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
class DeclaracionVector1D1 extends Instruccion_1.Instruccion {
    constructor(id, tipo, cantidad, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.cantidad = cantidad;
    }
    interpretar(arbol, tabla) {
        console.log("entro a declaracion vector 1d");
        const tamanio = this.cantidad.interpretar(arbol, tabla);
        if (tamanio.type != Data_1.DataType.ENTERO) {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tamaño del vector debe ser un entero", this.linea, this.columna);
        }
        if (this.tipo === Data_1.DataType.ENTERO) {
            let temporal = [];
            for (let i = 0; i < tamanio.value; i++) {
                temporal.push(0);
            }
            tabla.saveVector(this.id, temporal, Data_1.DataType.ENTERO, this.linea, this.columna);
        }
        else if (this.tipo === Data_1.DataType.DECIMAL) {
            let temporal = [];
            for (let i = 0; i < tamanio.value; i++) {
                temporal.push(0.0);
            }
            tabla.saveVector(this.id, temporal, Data_1.DataType.DECIMAL, this.linea, this.columna);
        }
        else if (this.tipo === Data_1.DataType.BOOLEANO) {
            let temporal = [];
            for (let i = 0; i < tamanio.value; i++) {
                temporal.push(true);
            }
            tabla.saveVector(this.id, temporal, Data_1.DataType.BOOLEANO, this.linea, this.columna);
        }
        else if (this.tipo === Data_1.DataType.CADENA) {
            let temporal = [];
            for (let i = 0; i < tamanio.value; i++) {
                temporal.push('');
            }
            tabla.saveVector(this.id, temporal, Data_1.DataType.CADENA, this.linea, this.columna);
        }
        else if (this.tipo === Data_1.DataType.CARACTER) {
            let temporal = [];
            for (let i = 0; i < tamanio.value; i++) {
                temporal.push("");
            }
            tabla.saveVector(this.id, temporal, Data_1.DataType.CARACTER, this.linea, this.columna);
        }
    }
}
exports.default = DeclaracionVector1D1;
