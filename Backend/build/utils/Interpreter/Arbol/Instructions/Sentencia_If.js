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
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Type_1 = __importStar(require("../Symbol/Type"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class If extends Instruccion_1.Instruccion {
    constructor(condicion, listainstrucciones, listaelif, listainstruccioneselse, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
        this.listaelif = listaelif;
        this.listainstruccioneselse = listainstruccioneselse;
    }
    interpretar(arbol, tabla) {
        const operacion = this.condicion.interpretar(arbol, tabla);
        if (operacion) {
            const tablaLocal = new SymbolTable_1.default(tabla);
            for (let i of this.listainstrucciones) {
                i.interpretar(arbol, tablaLocal);
            }
            return true;
        }
        else {
            if (this.listaelif) {
                for (let i of this.listaelif) {
                    const operation = i.interpretar(arbol, tabla);
                    if (operation) {
                        return false;
                    }
                }
            }
            if (this.listainstruccioneselse) {
                const tablaLocal = new SymbolTable_1.default(tabla);
                for (let i of this.listainstruccioneselse) {
                    i.interpretar(arbol, tablaLocal);
                }
                return false;
            }
        }
    }
}
exports.default = If;
