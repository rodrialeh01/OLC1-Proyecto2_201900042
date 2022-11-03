"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class Relacional extends Instruccion_1.Instruccion {
    constructor(tipo, operadorIzq, operadorDer, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
    }
    interpretar(arbol, tabla) {
        if (this.tipo === Data_1.tipoRel.MAYOR) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) > Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) > Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) > Number(valorDer.value.charCodeAt(0)))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
        else if (this.tipo === Data_1.tipoRel.MENOR) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            console.log(valorIzq);
            console.log(valorDer);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) < Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) < Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) < Number(valorDer.value.charCodeAt(0)))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
        else if (this.tipo === Data_1.tipoRel.MAYOR_IGUAL) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) >= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) >= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) >= Number(valorDer.value.charCodeAt(0)))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
        else if (this.tipo === Data_1.tipoRel.MENOR_IGUAL) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value.charCodeAt(0)))
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) <= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) <= Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) <= Number(valorDer.value.charCodeAt(0)))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
        else if (this.tipo === Data_1.tipoRel.IGUAL) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                };
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (valorIzq.value == valorDer.value)
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                };
            }
            //I-CADENA -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
        else if (this.tipo === Data_1.tipoRel.DIFERENTE) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.ENTERO && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                };
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.ENTERO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.DECIMAL && valorDer.type === Data_1.DataType.DECIMAL) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                };
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === Data_1.DataType.BOOLEANO && valorDer.type === Data_1.DataType.BOOLEANO) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (valorIzq.value != valorDer.value)
                };
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CARACTER && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                };
            }
            //I-CADENA -- D-ANY
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.CARACTER) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                };
            }
            else if (valorIzq.type === Data_1.DataType.CADENA && valorDer.type === Data_1.DataType.CADENA) {
                return {
                    "type": Data_1.DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                };
            }
            else {
                //ERROR SEMANTICO
                return new Error_1.default(Data_1.tipoErr.SEMANTICO, "Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
    }
}
exports.default = Relacional;
