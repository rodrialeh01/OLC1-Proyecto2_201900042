"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
const Instruccion_1 = require("../Abstract/Instruccion");
class Decremento extends Instruccion_1.Instruccion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    interpretar(arbol, tabla) {
        let variable = tabla.getVariable(this.id);
        if (variable != null) {
            if (variable.type == Data_1.DataType.ENTERO || variable.type == Data_1.DataType.DECIMAL) {
                let valor = variable.valor - 1;
                tabla.asignar(this.id, valor);
                return tabla.getExp(valor, variable.type);
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede decrementar una variable que no sea entera o decimal", this.linea, this.columna);
            }
        }
        else {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se encontro la variable", this.linea, this.columna);
        }
    }
}
exports.default = Decremento;
