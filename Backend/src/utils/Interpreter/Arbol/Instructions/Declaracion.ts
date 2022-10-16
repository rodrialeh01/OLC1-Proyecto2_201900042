import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from '../Symbol/Type';

export default class Declaracion extends Instruccion {
    private ids: Array<String>;
    private tipo: Tipo;

    constructor(ids: Array<String>, tipo: Tipo, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.tipo = tipo;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for (let index = 0; index < this.ids.length; index++) {
            console.log(this.ids[index]);
            console.log(this.tipo)
            if (this.tipo.getTipo() === DataType.ENTERO) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index],0));
            }else if (this.tipo.getTipo() === DataType.CADENA) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index],""));
            }else if (this.tipo.getTipo() === DataType.DECIMAL) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index],0.0));
            }else if (this.tipo.getTipo() === DataType.CARACTER) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index],'0'));
            }else if (this.tipo.getTipo() === DataType.BOOLEANO) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index],true));
            }
        }
        
        return null;
    }
}