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
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Unario extends Instruccion_1.Instruccion {
    constructor(operadorDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.operadorDer = operadorDer;
    }
    interpretar(arbol, tabla) {
        let valorDer = this.operadorDer.interpretar(arbol, tabla);
        if (this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
            this.tipoDato.setTipo(Type_1.DataType.ENTERO);
            return (Number(valorDer) * -1);
        }
        else if (this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
            this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
            return (Number(valorDer) * -1);
        }
        else {
            //ERROR SEMANTICO
            this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
            return (null);
        }
    }
}
exports.default = Unario;
