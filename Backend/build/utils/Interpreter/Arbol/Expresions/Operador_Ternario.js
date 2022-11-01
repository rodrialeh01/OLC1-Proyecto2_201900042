"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Op_Ternario extends Instruccion_1.Instruccion {
    constructor(condicion, ins1, ins2, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.ins1 = ins1;
        this.ins2 = ins2;
    }
    interpretar(arbol, tabla) {
        const cond = this.condicion.interpretar(arbol, tabla);
        if (cond.type === Data_1.DataType.BOOLEANO) {
            if (cond.value == true) {
                return this.ins1.interpretar(arbol, tabla);
            }
            else {
                return this.ins2.interpretar(arbol, tabla);
            }
        }
        else {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
        }
    }
}
exports.default = Op_Ternario;
