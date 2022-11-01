"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Logico extends Instruccion_1.Instruccion {
    constructor(tipo, operadorIzq, operadorDer, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
    }
    interpretar(arbol, tabla) {
        let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
        let valorDer = this.operadorDer.interpretar(arbol, tabla);
        if (this.tipo === Data_1.tipoLog.OR) {
            return {
                "type": Data_1.DataType.BOOLEANO,
                "value": (valorIzq.value || valorDer.value)
            };
        }
        else if (this.tipo === Data_1.tipoLog.AND) {
            return {
                "type": Data_1.DataType.BOOLEANO,
                "value": (valorIzq.value && valorDer.value)
            };
        }
        else {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
        }
    }
}
exports.default = Logico;
