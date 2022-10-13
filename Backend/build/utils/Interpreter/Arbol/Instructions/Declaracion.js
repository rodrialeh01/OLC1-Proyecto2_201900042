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
class Declaracion extends Instruccion_1.Instruccion {
    constructor(ids, tipo, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.tipo = tipo;
    }
    interpretar(arbol, tabla) {
        for (let index = 0; index < this.ids.length; index++) {
            console.log(this.ids[index]);
            console.log(this.tipo);
            if (this.tipo.getTipo() === Type_1.DataType.ENTERO) {
                console.log("entero");
                tabla.setValor(this.ids[index], new Symbol_1.default(this.tipo, this.ids[index], "0"));
            }
            else if (this.tipo.getTipo() === Type_1.DataType.CADENA) {
                tabla.setValor(this.ids[index], new Symbol_1.default(this.tipo, this.ids[index], ""));
            }
            else if (this.tipo.getTipo() === Type_1.DataType.DECIMAL) {
                tabla.setValor(this.ids[index], new Symbol_1.default(this.tipo, this.ids[index], "0.0"));
            }
            else if (this.tipo.getTipo() === Type_1.DataType.CARACTER) {
                tabla.setValor(this.ids[index], new Symbol_1.default(this.tipo, this.ids[index], ""));
            }
            else if (this.tipo.getTipo() === Type_1.DataType.BOOLEANO) {
                tabla.setValor(this.ids[index], new Symbol_1.default(this.tipo, this.ids[index], "true"));
            }
        }
        return null;
    }
}
exports.default = Declaracion;
