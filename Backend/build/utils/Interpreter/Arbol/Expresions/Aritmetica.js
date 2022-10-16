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
exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Aritmetica extends Instruccion_1.Instruccion {
    constructor(tipo, operadorIzq, operadorDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.tipo = tipo;
    }
    interpretar(arbol, tabla) {
        if (this.tipo === tipoOp.SUMA) {
            console.log("-----------------------------");
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            console.log(this.operadorIzq.tipoDato.getTipo());
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            console.log(this.operadorDer.tipoDato.getTipo());
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                console.log("TIPO DE DATO: " + this.tipoDato.getTipo());
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) + Number(valorDer.charCodeAt(0)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) + valorDer.charCodeAt(0));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq.charCodeAt(0)) + Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            //I-CADENA -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
        else if (this.tipo === tipoOp.RESTA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) - Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) - valorDer.charCodeAt(0));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) - Number(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq.charCodeAt(0)) - Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) - Number(valorDer.charCodeAt(0)));
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
        else if (this.tipo === tipoOp.MULTIPLICACION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) * Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) * valorDer.charCodeAt(0));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) * Number(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq.charCodeAt(0)) * Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) * Number(valorDer.charCodeAt(0)));
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
        else if (this.tipo === tipoOp.DIVISION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            if (valorDer != Number(0)) {
                if (Number(valorDer.charCodeAt(0)) != 0) {
                    //I-ENTERO -- D-ANY
                    if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer.charCodeAt(0)));
                    }
                    //I-DECIMAL -- D-ANY
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / valorDer.charCodeAt(0));
                    }
                    //I-BOOLEANO -- D-ANY
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }
                    //I-CARACTER -- D-ANY
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq.charCodeAt(0)) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq.charCodeAt(0)) / Number(valorDer));
                    }
                    else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                        this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                        return (Number(valorIzq.charCodeAt(0)) / Number(valorDer.charCodeAt(0)));
                    }
                    else {
                        //ERROR SEMANTICO
                        this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                        return (null);
                    }
                }
                else {
                    //ERROR SEMANTICO
                    this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                    return (null);
                }
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
        else if (this.tipo === tipoOp.POTENCIA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return (Math.pow(Number(valorIzq), Number(valorDer)));
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
        else if (this.tipo === tipoOp.MODULO) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) % Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) % Number(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) % Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato.setTipo(Type_1.DataType.DECIMAL);
                return (Number(valorIzq) % Number(valorDer));
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
    }
}
exports.default = Aritmetica;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["SUMA"] = 0] = "SUMA";
    tipoOp[tipoOp["RESTA"] = 1] = "RESTA";
    tipoOp[tipoOp["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    tipoOp[tipoOp["DIVISION"] = 3] = "DIVISION";
    tipoOp[tipoOp["POTENCIA"] = 4] = "POTENCIA";
    tipoOp[tipoOp["MODULO"] = 5] = "MODULO";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
