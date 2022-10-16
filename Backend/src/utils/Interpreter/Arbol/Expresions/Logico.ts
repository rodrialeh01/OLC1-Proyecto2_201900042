import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from "lodash/get"

export default class Aritmetica extends Instruccion {
    operadorIzq: Instruccion;
    operadorDer: Instruccion;
    tipo: tipoLog;

    constructor(tipo: tipoLog, operadorIzq: Instruccion, operadorDer: Instruccion, fila: number, columna: number){
        super(new Type(DataType.INDEFINIDO), fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.tipo = tipo;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
        let valorDer = this.operadorDer.interpretar(arbol,tabla);
        if(this.tipo === tipoLog.OR){
            this.tipoDato.setTipo(DataType.BOOLEANO);
            return (valorIzq || valorDer); 
        }else if(this.tipo === tipoLog.AND){
            this.tipoDato.setTipo(DataType.BOOLEANO);
            return (valorIzq && valorDer); 
        }
    }
}

export enum tipoLog{
    AND,
    OR
}