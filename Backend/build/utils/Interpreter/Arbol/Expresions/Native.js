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
const Type_1 = __importStar(require("../Symbol/Type"));
const get_1 = __importDefault(require("lodash/get"));
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
            return Number(this.valor);
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CADENA) {
            return this.valor.toString().replaceAll("\\n", "\n").replaceAll("\\t", "\t").replaceAll("\\r", "\r").replaceAll("\\\\", "\\").replaceAll("\\\"", "\"").replaceAll("\\'", "\'");
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
            return Number(this.valor);
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
            return this.obtenercaracteres(this.valor.toString());
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
            if (this.valor.toString().toUpperCase() === "TRUE") {
                return true;
            }
            else if (this.valor.toString().toUpperCase() === "FALSE") {
                return false;
            }
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.IDENTIFICADOR) {
            let value = tabla.getValor(this.valor);
            this.tipoDato = (0, get_1.default)(value, 'tipo', new Type_1.default(Type_1.DataType.INDEFINIDO));
            return (0, get_1.default)(value, 'valor');
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
