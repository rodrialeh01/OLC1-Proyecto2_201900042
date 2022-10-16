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
        this.tipoDato.setTipo(DataType.BOOLEANO);
        return(!valorDer);
    }
}