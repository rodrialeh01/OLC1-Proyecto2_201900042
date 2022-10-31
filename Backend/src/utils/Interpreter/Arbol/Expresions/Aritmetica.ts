import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from "lodash/get"

export default class Aritmetica extends Instruccion {
    operadorIzq: Instruccion;
    operadorDer: Instruccion;
    tipo: tipoOp;

    constructor(tipo: tipoOp, operadorIzq: Instruccion, operadorDer: Instruccion, fila: number, columna: number){
        super(new Type(DataType.INDEFINIDO), fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.tipo = tipo;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.tipo === tipoOp.SUMA){
            console.log("-----------------------------");
            console.log(tabla);
            console.log(this.operadorIzq);
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            console.log("VALOR IZQ: " + valorIzq)
            console.log(this.operadorIzq.tipoDato.getTipo())
            console.log(this.operadorDer);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            console.log("VALOR DER: " + valorDer)
            console.log(this.operadorDer.tipoDato.getTipo())
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                console.log(this.operadorIzq);
                console.log("OP1: " + valorIzq);
                console.log("OP2: " + valorDer);
                return (Number(valorIzq) + Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)+Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq)+Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq)+Number(valorDer.charCodeAt(0)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq) + Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)+Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)+Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)+valorDer.charCodeAt(0));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq) + Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)+Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) + Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq.charCodeAt(0))+Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }
            //I-CADENA -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq) + String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.CADENA);
                return (String(valorIzq)+String(valorDer));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if (this.tipo === tipoOp.RESTA) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);

            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq) - Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)-Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq)-Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq)-Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq) - Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)-Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)-Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)-valorDer.charCodeAt(0));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq) - Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)-Number(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) - Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq.charCodeAt(0))-Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0))-Number(valorDer.charCodeAt(0)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if (this.tipo === tipoOp.MULTIPLICACION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);

            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq) * Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)*Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq)*Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq)*Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq) * Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)*Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)*Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)*valorDer.charCodeAt(0));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq) * Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)*Number(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0)) * Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq.charCodeAt(0))*Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Number(valorIzq.charCodeAt(0))*Number(valorDer.charCodeAt(0)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if (this.tipo === tipoOp.DIVISION) {
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if(valorDer != Number(0)){
                if(Number(valorDer.charCodeAt(0)) != 0){
                    //I-ENTERO -- D-ANY
                    if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/Number(valorDer.charCodeAt(0)));
                    }
                    //I-DECIMAL -- D-ANY
                    else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/valorDer.charCodeAt(0));
                    }
                    //I-BOOLEANO -- D-ANY
                    else if (this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq) / Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq)/Number(valorDer));
                    }
                    //I-CARACTER -- D-ANY
                    else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq.charCodeAt(0)) / Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq.charCodeAt(0))/Number(valorDer));
                    }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                        this.tipoDato.setTipo(DataType.DECIMAL);
                        return (Number(valorIzq.charCodeAt(0))/Number(valorDer.charCodeAt(0)));
                    }else{
                        //ERROR SEMANTICO
                        this.tipoDato.setTipo(DataType.INDEFINIDO);
                        return (null);
                    }
                }else{
                    //ERROR SEMANTICO
                    this.tipoDato.setTipo(DataType.INDEFINIDO);
                    return (null);
                }
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoOp.POTENCIA){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);

            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }
            //I-BOOLEANO -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.ENTERO);
                return (Math.pow(Number(valorIzq),Number(valorDer)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoOp.MODULO){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);

            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)%Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)%Number(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)%Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.DECIMAL);
                return (Number(valorIzq)%Number(valorDer));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }

    }
}

export enum tipoOp{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}