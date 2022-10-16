import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from "lodash/get"

export default class Unario extends Instruccion {
    operadorDer: Instruccion;

    constructor( operadorDer: Instruccion, fila: number, columna: number){
        super(new Type(DataType.INDEFINIDO), fila, columna);
        this.operadorDer = operadorDer;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let valorDer = this.operadorDer.interpretar(arbol,tabla);
        if (this.operadorDer.tipoDato.getTipo()===DataType.ENTERO) {
            this.tipoDato.setTipo(DataType.ENTERO);
            return (Number(valorDer)*-1);
        }else if(this.operadorDer.tipoDato.getTipo()===DataType.DECIMAL){
            this.tipoDato.setTipo(DataType.DECIMAL);
            return (Number(valorDer)*-1);
        }else{
            //ERROR SEMANTICO
            this.tipoDato.setTipo(DataType.INDEFINIDO);
            return (null);
        }
    }
}