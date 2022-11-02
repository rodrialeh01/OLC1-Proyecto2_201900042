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
class Asignacion extends Instruccion_1.Instruccion {
    constructor(ids, valor, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valorasig = this.valor.interpretar(arbol, tabla);
        for (let id of this.ids) {
            let variable = tabla.getVariable(id);
            if (variable != null) {
                if (tabla.getTipo(id) == (valorasig === null || valorasig === void 0 ? void 0 : valorasig.type)) {
                    tabla.asignar(id, valorasig.value);
                    console.log("Se asigno a la variable " + id);
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No coinciden los tipos de datos", this.linea, this.columna);
                }
            }
        }
    }
}
exports.default = Asignacion;
