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
exports.tipoRel = void 0;
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
        if (this.tipo === tipoRel.MAYOR) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) > valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) > Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) > Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) > Number(valorDer.charCodeAt(0)));
            }
            else {
                //ERROR SEMANTICO
                return (null);
            }
        }
        else if (this.tipo === tipoRel.MENOR) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) < valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) < Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) < Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) < Number(valorDer.charCodeAt(0)));
            }
            else {
                //ERROR SEMANTICO
                return (null);
            }
        }
        else if (this.tipo === tipoRel.MAYOR_IGUAL) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) >= valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) >= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) >= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) >= Number(valorDer.charCodeAt(0)));
            }
            else {
                //ERROR SEMANTICO
                return (null);
            }
        }
        else if (this.tipo === tipoRel.MENOR_IGUAL) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) <= valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) <= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) <= Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) <= Number(valorDer.charCodeAt(0)));
            }
            else {
                //ERROR SEMANTICO
                return (null);
            }
        }
        else if (this.tipo === tipoRel.IGUAL) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) == Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) == Number(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) == Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) == Number(valorDer));
            }
            //I-BOOLEAN -- D-BOOLEAN
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Boolean(valorIzq) == Boolean(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (valorIzq == valorDer);
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (String(valorIzq) == String(valorDer));
            }
            //I-CADENA -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (String(valorIzq) == String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (String(valorIzq) == String(valorDer));
            }
            else {
                //ERROR SEMANTICO
                this.tipoDato.setTipo(Type_1.DataType.INDEFINIDO);
                return (null);
            }
        }
        else if (this.tipo === tipoRel.DIFERENTE) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol, tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) != Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.ENTERO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) != Number(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) != Number(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.DECIMAL && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Number(valorIzq) != Number(valorDer));
            }
            //I-BOOLEAN -- D-BOOLEAN
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.BOOLEANO) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (Boolean(valorIzq) != Boolean(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (valorIzq != valorDer);
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CARACTER && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (String(valorIzq) != String(valorDer));
            }
            //I-CADENA -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (String(valorIzq) != String(valorDer));
            }
            else if (this.operadorIzq.tipoDato.getTipo() === Type_1.DataType.CADENA && this.operadorDer.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return (String(valorIzq) != String(valorDer));
            }
            else {
                //ERROR SEMANTICO
                return (null);
            }
        }
    }
}
exports.default = Aritmetica;
var tipoRel;
(function (tipoRel) {
    tipoRel[tipoRel["MAYOR"] = 0] = "MAYOR";
    tipoRel[tipoRel["MENOR"] = 1] = "MENOR";
    tipoRel[tipoRel["MAYOR_IGUAL"] = 2] = "MAYOR_IGUAL";
    tipoRel[tipoRel["MENOR_IGUAL"] = 3] = "MENOR_IGUAL";
    tipoRel[tipoRel["IGUAL"] = 4] = "IGUAL";
    tipoRel[tipoRel["DIFERENTE"] = 5] = "DIFERENTE";
})(tipoRel = exports.tipoRel || (exports.tipoRel = {}));
