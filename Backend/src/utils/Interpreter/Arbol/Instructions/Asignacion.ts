import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from '../Symbol/Type';

export default class Asignacion extends Instruccion {
    private ids: Array<String>;
    private valor: Operacion;

    constructor(ids: Array<String>, valor: Operacion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for (let index = 0; index < this.ids.length; index++) {
            console.log(this.valor);
            console.log(tabla.getValor(this.ids[index]).getValor());
            tabla.getValor(this.ids[index])?.setValor(this.valor.valor);
        }
        return null;
    }
}