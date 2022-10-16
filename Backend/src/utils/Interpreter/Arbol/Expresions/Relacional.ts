import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from "lodash/get"

export default class Aritmetica extends Instruccion {
    operadorIzq: Instruccion;
    operadorDer: Instruccion;
    tipo: tipoRel;

    constructor(tipo: tipoRel, operadorIzq: Instruccion, operadorDer: Instruccion, fila: number, columna: number){
        super(new Type(DataType.INDEFINIDO), fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.tipo = tipo;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.tipo === tipoRel.MAYOR){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) > Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) > Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))>Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))>Number(valorDer.charCodeAt(0)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoRel.MENOR){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) < Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) < Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))<Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))<Number(valorDer.charCodeAt(0)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoRel.MAYOR_IGUAL){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>=Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>=Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) >= Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>=Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)>=valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) >= Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))>=Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))>=Number(valorDer.charCodeAt(0)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoRel.MENOR_IGUAL){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<=Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<=Number(valorDer.charCodeAt(0)));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) <= Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<=Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)<=valorDer.charCodeAt(0));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0)) <= Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))<=Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq.charCodeAt(0))<=Number(valorDer.charCodeAt(0)));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoRel.IGUAL){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) == Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)==Number(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) == Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)==Number(valorDer));
            }
            //I-BOOLEAN -- D-BOOLEAN
            else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Boolean(valorIzq)==Boolean(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (valorIzq == valorDer);
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (String(valorIzq) == String(valorDer));
            }
            //I-CADENA -- D-ANY
            else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (String(valorIzq) == String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (String(valorIzq) == String(valorDer));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }else if(this.tipo === tipoRel.DIFERENTE){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            //I-ENTERO -- D-ANY
            if (this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) != Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.ENTERO && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)!=Number(valorDer));
            }
            //I-DECIMAL -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq) != Number(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.DECIMAL && this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Number(valorIzq)!=Number(valorDer));
            }
            //I-BOOLEAN -- D-BOOLEAN
            else if(this.operadorIzq.tipoDato.getTipo() === DataType.BOOLEANO && this.operadorDer.tipoDato.getTipo()===DataType.BOOLEANO){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (Boolean(valorIzq)!=Boolean(valorDer));
            }
            //I-CARACTER -- D-ANY
            else if (this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER) {
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (valorIzq != valorDer);
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CARACTER && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (String(valorIzq) != String(valorDer));
            }
            //I-CADENA -- D-ANY
            else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.CARACTER){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (String(valorIzq) != String(valorDer));
            }else if(this.operadorIzq.tipoDato.getTipo() === DataType.CADENA && this.operadorDer.tipoDato.getTipo()===DataType.CADENA){
                this.tipoDato.setTipo(DataType.BOOLEANO);
                return (String(valorIzq) != String(valorDer));
            }else{
                //ERROR SEMANTICO
                this.tipoDato.setTipo(DataType.INDEFINIDO);
                return (null);
            }
        }
    }
}

export enum tipoRel{
    MAYOR,
    MENOR,
    MAYOR_IGUAL,
    MENOR_IGUAL,
    IGUAL,
    DIFERENTE
}