import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import get from "lodash/get"

export default class Not extends Instruccion {
    operadorDer: Instruccion;

    constructor( operadorDer: Instruccion, fila: number, columna: number){
        super( fila, columna);
        this.operadorDer = operadorDer;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let valorDer = this.operadorDer.interpretar(arbol,tabla);
        return {
            "type": DataType.BOOLEANO,
            "value": (!(valorDer.value))
        }
    }
}