import { Instruccion } from "../Abstract/Instruccion";
import Errores from '../Exceptions/Error';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";

export default class Imprimir extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number){
        super(linea, columna);
        this.expresion = expresion;
    }

    public interpretar(arbol: Three, tabla: SymbolTable) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if(valor instanceof Errores) return valor;
        arbol.actualizaConsola(String(valor.value));
    }
}