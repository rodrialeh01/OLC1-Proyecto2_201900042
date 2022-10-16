import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from '../Symbol/Type';

export default class Asignacion extends Instruccion {
    private ids: Array<String>;
    private valor: Instruccion;

    constructor(ids: Array<String>, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorset = this.valor.interpretar(arbol,tabla);
        for (let index = 0; index < this.ids.length; index++) {
            if(tabla.getValor(this.ids[index]) != null){
                if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.ENTERO && this.valor.tipoDato.getTipo()===DataType.ENTERO){
                    tabla.getValor(this.ids[index]).setValor(valorset);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.DECIMAL && this.valor.tipoDato.getTipo()===DataType.DECIMAL){
                    tabla.getValor(this.ids[index]).setValor(valorset);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.CADENA && this.valor.tipoDato.getTipo()===DataType.CADENA){
                    tabla.getValor(this.ids[index]).setValor(valorset);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.BOOLEANO && this.valor.tipoDato.getTipo()===DataType.BOOLEANO){
                    tabla.getValor(this.ids[index]).setValor(valorset);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.CARACTER && this.valor.tipoDato.getTipo()===DataType.CARACTER){
                    tabla.getValor(this.ids[index]).setValor(valorset);
                }
            }else{
                //ERROR SEMANTICO
            }
        }
        return null;
    }
}