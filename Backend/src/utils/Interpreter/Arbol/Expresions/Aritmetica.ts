import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoOp, tipoErr } from '../Data/Data';
import Error from "../Exceptions/Error";
import get from "lodash/get"

export default class Aritmetica extends Instruccion {

    constructor(private tipo: tipoOp, private operadorIzq: Instruccion, private operadorDer: Instruccion, fila: number, columna: number){
        super(fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.tipo = tipo;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        //* ---------------------- SUMA ---------------------------
        if(this.tipo === tipoOp.SUMA){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value.charCodeAt(0)))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value)+String(valorDer.value))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value.charCodeAt(0)))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value)+String(valorDer.value))
                }
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value)+String(valorDer.value))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value.charCodeAt(0)) + Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }
            //I-CADENA -- D-ANY
            else if (valorIzq.type === DataType.CADENA && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CADENA && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CADENA && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CADENA && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CADENA && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.CADENA,
                    "value": (String(valorIzq.value) + String(valorDer.value))
                }
            }else{
                //ERROR SEMANTICO
                return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        //* ---------------------- RESTA ---------------------------
        }else if (this.tipo === tipoOp.RESTA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) - Number(valorDer.value))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value.charCodeAt(0)) - Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) - Number(valorDer.value.charCodeAt(0)))
                }
            }else{
                //ERROR SEMANTICO
                return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        //* ---------------------- MULTIPLICACION ---------------------------
        }else if (this.tipo === tipoOp.MULTIPLICACION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) * Number(valorDer.value))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value.charCodeAt(0)) * Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) * Number(valorDer.value.charCodeAt(0)))
                }
            }else{
                //ERROR SEMANTICO
                return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        //* ---------------------- DIVISION ---------------------------
        }else if (this.tipo === tipoOp.DIVISION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if(!(Number(valorDer.value) === 0)){
                if (valorIzq.type===DataType.ENTERO && valorDer.type===DataType.ENTERO) {
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.BOOLEANO){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value.charCodeAt(0)))
                    }
                }
                //I-DECIMAL -- D-ANY
                else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.BOOLEANO){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value.charCodeAt(0)))
                    }
                }
                //I-BOOLEANO -- D-ANY
                else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.ENTERO) {
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.DECIMAL){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value) / Number(valorDer.value))
                    }
                }
                //I-CARACTER -- D-ANY
                else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value.charCodeAt(0)) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value.charCodeAt(0)) / Number(valorDer.value))
                    }
                }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                    return {
                        "type": DataType.DECIMAL,
                        "value": (Number(valorIzq.value.charCodeAt(0)) / Number(valorDer.value.charCodeAt(0)))
                    }
                }else{
                    //ERROR SEMANTICO
                    return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
                }
            }else{
                return  new Error(tipoErr.SEMANTICO,"No se puede dividir con 0", this.linea, this.columna);
            }
        //* ---------------------- POTENCIA ---------------------------
        }else if(this.tipo === tipoOp.POTENCIA){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);

            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else if(valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.BOOLEANO){
                return {
                    "type": DataType.ENTERO,
                    "value": (Math.pow(Number(valorIzq.value), Number(valorDer.value)))
                }
            }else{
                //ErrorL SEMANTICO
                return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        //* ---------------------- MODULO ---------------------------
        }else if(this.tipo === tipoOp.MODULO){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": (Number(valorIzq.value) % Number(valorDer.value))
                }
            }else{
                //ErrorL SEMANTICO
                return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }

    }
}

