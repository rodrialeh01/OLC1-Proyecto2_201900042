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
class Declaracion_Asignacion extends Instruccion_1.Instruccion {
    constructor(ids, tipo, valor, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valorasig = this.valor.interpretar(arbol, tabla);
        for (let id of this.ids) {
            if ((valorasig === null || valorasig === void 0 ? void 0 : valorasig.type) == this.tipo) {
                const valid = tabla.saveSymbol(id, valorasig.value, this.tipo, this.linea, this.columna);
                if (valid) {
                    console.log("Se declaro la variable " + id);
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No coinciden los tipos de datos", this.linea, this.columna);
            }
        }
    }
}
exports.default = Declaracion_Asignacion;
