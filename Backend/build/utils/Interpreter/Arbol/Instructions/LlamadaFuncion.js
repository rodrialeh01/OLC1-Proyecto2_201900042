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
class LlamadaFuncion extends Instruccion_1.Instruccion {
    constructor(identificador, parametros, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
    }
    interpretar(arbol, tabla) {
        let met = tabla.getFuncion(this.identificador);
        if (met != null) {
            if (met.tipo === Data_1.DataType.VOID) {
                if (met.parametros != null) {
                    if (met.parametros.length == this.parametros.length) {
                        for (let i = 0; i < this.parametros.length; i++) {
                            let param = this.parametros[i].interpretar(arbol, tabla);
                            if (param.type != met.listatipos[i]) {
                                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tipo de parametro no coincide con el tipo de parametro del metodo", this.linea, this.columna);
                            }
                        }
                        let tablaLocal = new SymbolTable_1.default(tabla);
                        for (let i = 0; i < met.listaparametros.length; i++) {
                            let valor = this.parametros[i].interpretar(arbol, tabla);
                            const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type, this.linea, this.columna);
                            if (!valid) {
                                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
                            }
                        }
                        for (let i of met.listainstrucciones) {
                            if (i instanceof Return_1.default) {
                                if (i.exp == null) {
                                    return i;
                                }
                                else {
                                    return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                                }
                            }
                            i.interpretar(arbol, tablaLocal);
                        }
                    }
                    else {
                        return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La cantidad de parametros no coincide con la cantidad de parametros del metodo", this.linea, this.columna);
                    }
                }
                else {
                    let tablaLocal = new SymbolTable_1.default(tabla);
                    for (let i = 0; i < met.listaparametros.length; i++) {
                        let valor = this.parametros[i].interpretar(arbol, tabla);
                        const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type, this.linea, this.columna);
                        if (!valid) {
                            return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
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
                                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                            }
                        }
                    }
                }
            }
            else {
                if (met.parametros != null) {
                    if (met.parametros.length == this.parametros.length) {
                        let returns = 0;
                        let ejecutarf;
                        ejecutarf = new Array();
                        for (let i = 0; i < this.parametros.length; i++) {
                            let param = this.parametros[i].interpretar(arbol, tabla);
                            if (param.type != met.listatipos[i]) {
                                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tipo de parametro no coincide con el tipo de parametro de la funcion", this.linea, this.columna);
                            }
                        }
                        let tablaLocal = new SymbolTable_1.default(tabla);
                        for (let i = 0; i < met.listaparametros.length; i++) {
                            let valor = this.parametros[i].interpretar(arbol, tabla);
                            const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type, this.linea, this.columna);
                            if (!valid) {
                                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El parametro ya existe en la funcion", this.linea, this.columna);
                            }
                        }
                        for (let i of met.listainstrucciones) {
                            if (i instanceof Return_1.default) {
                                if (i.exp != null) {
                                    returns += 1;
                                    if (i.exp.interpretar(arbol, tablaLocal).type != met.tipo) {
                                        ejecutarf = null;
                                        return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tipo de retorno no coincide con el tipo de retorno de la funcion", this.linea, this.columna);
                                    }
                                }
                                else {
                                    ejecutarf = null;
                                    return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                                }
                            }
                            i.interpretar(arbol, tablaLocal);
                            ejecutarf === null || ejecutarf === void 0 ? void 0 : ejecutarf.push(i);
                        }
                        if (returns == 0) {
                            return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                        }
                        if (ejecutarf != null) {
                            for (let i of ejecutarf) {
                                let retorno = i.interpretar(arbol, tablaLocal);
                                if (retorno != null) {
                                    return retorno;
                                }
                            }
                        }
                    }
                    else {
                        return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La cantidad de parametros no coincide con la cantidad de parametros del metodo", this.linea, this.columna);
                    }
                }
                else {
                    let returns = 0;
                    let tablaLocal = new SymbolTable_1.default(tabla);
                    for (let i = 0; i < met.listaparametros.length; i++) {
                        let valor = this.parametros[i].interpretar(arbol, tabla);
                        const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type, this.linea, this.columna);
                        if (!valid) {
                            return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El parametro ya existe en la funcion", this.linea, this.columna);
                        }
                    }
                    for (let i of met.listainstrucciones) {
                        if (i instanceof Return_1.default) {
                            console.log(i);
                            if (i.exp != null) {
                                returns += 1;
                                if (i.exp.interpretar(arbol, tablaLocal).type != met.tipo) {
                                    return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El tipo de retorno no coincide con el tipo de retorno de la funcion", this.linea, this.columna);
                                }
                                else {
                                    return i.exp.interpretar(arbol, tablaLocal);
                                }
                            }
                            else {
                                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                            }
                        }
                        i.interpretar(arbol, tablaLocal);
                    }
                    if (returns == 0) {
                        return new Error_1.default(Data_1.tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                    }
                }
            }
        }
        else {
            return new Error_1.default(Data_1.tipoErr.SEMANTICO, "El metodo no existe", this.linea, this.columna);
        }
    }
}
exports.default = LlamadaFuncion;
