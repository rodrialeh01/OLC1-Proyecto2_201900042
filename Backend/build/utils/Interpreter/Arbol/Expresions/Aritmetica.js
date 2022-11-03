"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Aritmetica extends Instruccion_1.Instruccion {
    constructor(tipo, operadorIzq, operadorDer, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.tipo = tipo;
    }
    interpretar(arbol, tabla) {
        //* ---------------------- SUMA ---------------------------
        if (this.tipo === Data_1.tipoOp.SUMA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value.charCodeAt(0)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value.charCodeAt(0)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value.charCodeAt(0)) + Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            //I-CADENA -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
            //* ---------------------- RESTA ---------------------------
        }
        else if (this.tipo === Data_1.tipoOp.RESTA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value.charCodeAt(0)) - Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) - Number(valorDer.value.charCodeAt(0)))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
            //* ---------------------- MULTIPLICACION ---------------------------
        }
        else if (this.tipo === Data_1.tipoOp.MULTIPLICACION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value.charCodeAt(0)) * Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) * Number(valorDer.value.charCodeAt(0)))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
            //* ---------------------- DIVISION ---------------------------
        }
        else if (this.tipo === Data_1.tipoOp.DIVISION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (!(Number(valorDer.value) === 0)) {
                if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.BOOLEANO) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value.charCodeAt(0)))
                    };
                }
                //I-DECIMAL -- D-ANY
                else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.BOOLEANO) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value.charCodeAt(0)))
                    };
                }
                //I-BOOLEANO -- D-ANY
                else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.ENTERO) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.DECIMAL) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    };
                }
                //I-CARACTER -- D-ANY
                else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value.charCodeAt(0)) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value.charCodeAt(0)) / Number(valorDer.value))
                    };
                }
                else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                    return {
                        "type": Data_1.DataType.DECIMAL,
                        "value": (Number(valorIzq.value.charCodeAt(0)) / Number(valorDer.value.charCodeAt(0)))
                    };
                }
                else {
                    //ERROR SEMANTICO
                    return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
                }
            }
            else {
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "No se puede dividir con 0", this.linea, this.columna);
            }
            //* ---------------------- POTENCIA ---------------------------
        }
        else if (this.tipo === Data_1.tipoOp.POTENCIA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                };
            }
            else {
                //ErrorL SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
            //* ---------------------- MODULO ---------------------------
        }
        else if (this.tipo === Data_1.tipoOp.MODULO) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.DECIMAL,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                };
            }
            else {
                //ErrorL SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
    }
}
exports.default = Aritmetica;
