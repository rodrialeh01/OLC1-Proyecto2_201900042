"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const Type_1 = __importStar(require("../Symbol/Type"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Asignacion extends Instruccion_1.Instruccion {
    constructor(ids, valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        const valorset = this.valor.interpretar(arbol, tabla);
        for (let index = 0; index < this.ids.length; index++) {
            if (tabla.getValor(this.ids[index]) != null) {
                if (tabla.getValor(this.ids[index]).tipo.getTipo() === Type_1.DataType.ENTERO && this.valor.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    tabla.setValor(this.ids[index], new Symbol_1.default(this.valor.tipoDato, this.ids[index], valorset), false);
                    console.log(tabla.getValor(this.ids[index]));
                }
                else if (tabla.getValor(this.ids[index]).tipo.getTipo() === Type_1.DataType.DECIMAL && this.valor.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                    tabla.setValor(this.ids[index], new Symbol_1.default(this.valor.tipoDato, this.ids[index], valorset), false);
                }
                else if (tabla.getValor(this.ids[index]).tipo.getTipo() === Type_1.DataType.CADENA && this.valor.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                    tabla.setValor(this.ids[index], new Symbol_1.default(this.valor.tipoDato, this.ids[index], valorset), false);
                }
                else if (tabla.getValor(this.ids[index]).tipo.getTipo() === Type_1.DataType.BOOLEANO && this.valor.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                    tabla.setValor(this.ids[index], new Symbol_1.default(this.valor.tipoDato, this.ids[index], valorset), false);
                }
                else if (tabla.getValor(this.ids[index]).tipo.getTipo() === Type_1.DataType.CARACTER && this.valor.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                    tabla.setValor(this.ids[index], new Symbol_1.default(this.valor.tipoDato, this.ids[index], valorset), false);
                }
                else {
                    controller.listaErrores.push(new Error(new errores.default('ERROR SEMANTICO', "No coinciden los tipos de datos", this.linea, this.columna)));
                }
            }
            else {
                //ERROR SEMANTICO
                controller.listaErrores.push(new Error(new errores.default('ERROR SEMANTICO', "No se encontro el identificador", this.linea, this.columna)));
            }
        }
        return null;
    }
}
exports.default = Asignacion;
