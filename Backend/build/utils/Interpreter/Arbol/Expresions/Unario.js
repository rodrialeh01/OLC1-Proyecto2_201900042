"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Unario extends Instruccion_1.Instruccion {
    constructor(operadorDer, fila, columna) {
        super(fila, columna);
        this.operadorDer = operadorDer;
    }
    interpretar(arbol, tabla) {
        let valorDer = this.operadorDer.interpretar(arbol, tabla);
        if (valorDer.type === Data_1.DataType.ENTERO) {
            return {
                "type": Data_1.DataType.ENTERO,
                "value": (-1 * Number(valorDer.value))
            };
        }
        else if (valorDer.type === Data_1.DataType.DECIMAL) {
            return {
                "type": Data_1.DataType.DECIMAL,
                "value": (-1 * Number(valorDer.value))
            };
        }
        else {
            //ERROR SEMANTICO
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
        }
    }
}
exports.default = Unario;
