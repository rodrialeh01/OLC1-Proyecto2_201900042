"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucle = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
exports.bucle = false;
class Metodo extends Instruccion_1.Instruccion {
    constructor(identificador, parametros, tipo, listainstrucciones, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
        this.tipo = tipo;
        this.listainstrucciones = listainstrucciones;
        this.listaparametros = [];
        this.listatipos = [];
    }
    interpretar(arbol, tabla) {
        console.log("a: " + this.listainstrucciones);
        if (this.tipo === Data_1.DataType.VOID) {
            const valid = tabla.validarMetodo(this.identificador);
            if (valid) {
                if (this.parametros != null) {
                    for (let i of this.parametros) {
                        let id = i.split(",")[0];
                        let tipo = i.split(",")[1].toLowerCase();
                        this.listaparametros.push(id);
                        switch (tipo) {
                            case "0":
                                this.listatipos.push(Data_1.DataType.ENTERO);
                                break;
                            case "1":
                                this.listatipos.push(Data_1.DataType.CADENA);
                                break;
                            case "2":
                                this.listatipos.push(Data_1.DataType.DECIMAL);
                                break;
                            case "3":
                                this.listatipos.push(Data_1.DataType.CARACTER);
                                break;
                            case "4":
                                this.listatipos.push(Data_1.DataType.BOOLEANO);
                                break;
                            default:
                                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tipo de dato no es válido", this.linea, this.columna);
                        }
                    }
                }
                tabla.saveMetodo(this.identificador, this);
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo " + this.identificador + " ya existe", this.linea, this.columna);
            }
        }
    }
}
exports.default = Metodo;
