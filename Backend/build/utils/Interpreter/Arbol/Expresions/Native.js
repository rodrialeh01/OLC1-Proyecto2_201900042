"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Data_2 = require("../Data/Data");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.tipo === Data_1.DataType.ENTERO) {
            return {
                "type": Data_1.DataType.ENTERO,
                "value": Number(this.valor)
            };
        }
        else if (this.tipo === Data_1.DataType.CADENA) {
            return {
                "type": Data_1.DataType.CADENA,
                "value": this.valor.toString().replaceAll("\\n", "\n").replaceAll("\\t", "\t").replaceAll("\\r", "\r").replaceAll("\\\\", "\\").replaceAll("\\\"", "\"").replaceAll("\\'", "\'")
            };
        }
        else if (this.tipo === Data_1.DataType.DECIMAL) {
            return {
                "type": Data_1.DataType.DECIMAL,
                "value": Number(this.valor)
            };
        }
        else if (this.tipo === Data_1.DataType.CARACTER) {
            return {
                "type": Data_1.DataType.CARACTER,
                "value": (0, Data_2.obtenercaracteres)(this.valor.toString())
            };
        }
        else if (this.tipo === Data_1.DataType.BOOLEANO) {
            if (this.valor.toString().toUpperCase() === "TRUE") {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": true
                };
            }
            else if (this.valor.toString().toUpperCase() === "FALSE") {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": false
                };
            }
        }
        else {
            return {
                "type": Data_1.DataType.INDEFINIDO,
                "value": null
            };
        }
    }
}
exports.default = Nativo;
