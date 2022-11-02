"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucle = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
const Return_1 = __importDefault(require("./Return"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
exports.bucle = false;
class LlamadaMetodo extends Instruccion_1.Instruccion {
    constructor(identificador, parametros, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
    }
    interpretar(arbol, tabla) {
        let met = tabla.getMetodo(this.identificador);
        if (met != null) {
            if (met.parametros != null) {
                if (met.parametros.length == this.parametros.length) {
                    for (let i = 0; i < this.parametros.length; i++) {
                        let param = this.parametros[i].interpretar(arbol, tabla);
                        if (param.type != met.listatipos[i]) {
                            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tipo de parametro no coincide con el tipo de parametro del metodo", this.linea, this.columna);
                        }
                    }
                    let tablaLocal = new SymbolTable_1.default(tabla);
                    for (let i = 0; i < met.listaparametros.length; i++) {
                        let valor = this.parametros[i].interpretar(arbol, tabla);
                        const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type, this.linea, this.columna);
                        if (!valid) {
                            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
                        }
                    }
                    for (let i of met.listainstrucciones) {
                        if (i instanceof Return_1.default) {
                            if (i.exp == null) {
                                return i;
                            }
                            else {
                                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                            }
                        }
                        i.interpretar(arbol, tablaLocal);
                    }
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La cantidad de parametros no coincide con la cantidad de parametros del metodo", this.linea, this.columna);
                }
            }
            else {
                let tablaLocal = new SymbolTable_1.default(tabla);
                for (let i = 0; i < met.listaparametros.length; i++) {
                    let valor = this.parametros[i].interpretar(arbol, tabla);
                    const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type, this.linea, this.columna);
                    if (!valid) {
                        throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
                    }
                }
                for (let i of met.listainstrucciones) {
                    console.log('-------------');
                    console.log(i);
                    i.interpretar(arbol, tablaLocal);
                    if (i instanceof Return_1.default) {
                        if (i.exp == null) {
                            return i;
                        }
                        else {
                            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                        }
                    }
                }
            }
        }
        else {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo no existe", this.linea, this.columna);
        }
    }
}
exports.default = LlamadaMetodo;