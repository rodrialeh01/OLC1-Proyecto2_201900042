"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Casteo extends Instruccion_1.Instruccion {
    constructor(tipo, expresion, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let exp = this.expresion.interpretar(arbol, tabla);
        if (this.tipo == Data_1.DataType.ENTERO) {
            if (exp.type == Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": Number(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": Math.trunc(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": exp.value.charCodeAt(0)
                };
            }
            else if (exp.type == Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": Number(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.BOOLEANO) {
                if (exp.value == true) {
                    return {
                        "type": Data_1.DataType.ENTERO,
                        "value": 1
                    };
                }
                else {
                    return {
                        "type": Data_1.DataType.ENTERO,
                        "value": 0
                    };
                }
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a entero", this.linea, this.columna);
            }
        }
        else if (this.tipo == Data_1.DataType.DECIMAL) {
            if (exp.type == Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": Number(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": Number(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": Number(exp.value)
                };
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a decimal", this.linea, this.columna);
            }
        }
        else if (this.tipo == Data_1.DataType.BOOLEANO) {
            if (exp.type == Data_1.DataType.ENTERO) {
                if (exp.value == 0) {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": false
                    };
                }
                else if (exp.value == 1) {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": true
                    };
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }
            else if (exp.type == Data_1.DataType.DECIMAL) {
                if (exp.value == 0.0) {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": false
                    };
                }
                else if (exp.value == 1.0) {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": true
                    };
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }
            else if (exp.type == Data_1.DataType.CARACTER) {
                if (exp.value == '0' || exp.value == "0") {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": false
                    };
                }
                else if (exp.value == '1' || exp.value == "1") {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": true
                    };
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }
            else if (exp.type == Data_1.DataType.CADENA) {
                if (exp.value == "0" || String(exp.value).toLowerCase() == "false") {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": false
                    };
                }
                else if (exp.value == "1" || String(exp.value).toLowerCase() == "true") {
                    return {
                        "type": Data_1.DataType.BOOLEANO,
                        "value": true
                    };
                }
                else {
                    throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }
            else if (exp.type == Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": exp.value
                };
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
            }
        }
        else if (this.tipo == Data_1.DataType.CARACTER) {
            if (exp.type == Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.CARACTER,
                    "value": String.fromCharCode(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.CARACTER,
                    "value": String.fromCharCode(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.CARACTER,
                    "value": exp.value
                };
            }
            else if (exp.type == Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CARACTER,
                    "value": exp.value.charAt(0)
                };
            }
            else if (exp.type == Data_1.DataType.BOOLEANO) {
                if (exp.value == true) {
                    return {
                        "type": Data_1.DataType.CARACTER,
                        "value": "1"
                    };
                }
                else {
                    return {
                        "type": Data_1.DataType.CARACTER,
                        "value": "0"
                    };
                }
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a caracter", this.linea, this.columna);
            }
        }
        else if (this.tipo == Data_1.DataType.CADENA) {
            if (exp.type == Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": String(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": String(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": String(exp.value)
                };
            }
            else if (exp.type == Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": exp.value
                };
            }
            else if (exp.type == Data_1.DataType.BOOLEANO) {
                if (exp.value == true) {
                    return {
                        "type": Data_1.DataType.CADENA,
                        "value": "true"
                    };
                }
                else {
                    return {
                        "type": Data_1.DataType.CADENA,
                        "value": "false"
                    };
                }
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear a cadena", this.linea, this.columna);
            }
        }
        else {
            throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede castear la expresion", this.linea, this.columna);
        }
    }
}
exports.default = Casteo;
