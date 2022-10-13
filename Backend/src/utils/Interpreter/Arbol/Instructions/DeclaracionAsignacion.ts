import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from '../Symbol/Type';

export default class Declaracion_Asignacion extends Instruccion {
    private ids: Array<String>;
    private tipo: Tipo;
    private valor: Operacion;

    constructor(ids: Array<String>, tipo: Tipo, valor: Operacion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for (let index = 0; index < this.ids.length; index++) {
            console.log(this.ids[index]);
            console.log(this.tipo)
            tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index], this.valor.interpretar(arbol, tabla)));
        }
        return null;
    }
}