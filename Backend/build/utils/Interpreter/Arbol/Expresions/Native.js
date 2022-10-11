"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = require("../Symbol/Type");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
            return this.valor;
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CADENA) {
            return this.valor.toString().replaceAll("\\n", "\n").replaceAll("\\t", "\t").replaceAll("\\r", "\r").replaceAll("\\\\", "\\").replaceAll("\\\"", "\"").replaceAll("\\'", "\'");
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
            return this.valor;
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
            return this.obtenercaracteres(this.valor.toString());
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
            if (this.valor.toString().toUpperCase() === "TRUE") {
                return "true";
            }
            else if (this.valor.toString().toUpperCase() === "FALSE") {
                return "false";
            }
        }
    }
    obtenercaracteres(car) {
        switch (car) {
            case "\\n": {
                return "\n";
            }
            case "\\\\": {
                return "\\";
            }
            case "\\t": {
                return "\t";
            }
            case "\\r": {
                return "\r";
            }
            case "\\'": {
                return "\'";
            }
            case "\\\"": {
                return "\"";
            }
            default:
                {
                    return car;
                }
        }
    }
}
exports.default = Nativo;
