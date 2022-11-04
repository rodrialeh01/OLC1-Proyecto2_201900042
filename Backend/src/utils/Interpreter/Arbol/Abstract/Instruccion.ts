import Arbol from '../Symbol/Three';
import TablaSimbolo from '../Symbol/SymbolTable';

export abstract class Instruccion {
    public linea: number;
    public columna: number;
    exp: any;

    constructor(linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract interpretar(arbol: Arbol, tabla: TablaSimbolo): any;
}