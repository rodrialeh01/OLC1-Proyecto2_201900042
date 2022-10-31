import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from '../Symbol/Type';
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

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
        let valorasig = this.valor.interpretar(arbol,tabla)
        if(this.tipo.getTipo() == DataType.ENTERO && this.valor.tipoDato.getTipo() == DataType.ENTERO){
            for (let index = 0; index < this.ids.length; index++) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index], this.valor.interpretar(arbol, tabla)));
            }
        }else if(this.tipo.getTipo() == DataType.DECIMAL && this.valor.tipoDato.getTipo() == DataType.DECIMAL){
            for (let index = 0; index < this.ids.length; index++) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index], this.valor.interpretar(arbol, tabla)));
            }
        }else if(this.tipo.getTipo() == DataType.CARACTER && this.valor.tipoDato.getTipo() == DataType.CARACTER){
            for (let index = 0; index < this.ids.length; index++) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index], this.valor.interpretar(arbol, tabla)));
            }
        }else if(this.tipo.getTipo() == DataType.CADENA && this.valor.tipoDato.getTipo() == DataType.CADENA){
            for (let index = 0; index < this.ids.length; index++) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index], this.valor.interpretar(arbol, tabla)));
            }
        }else if(this.tipo.getTipo() == DataType.BOOLEANO && this.valor.tipoDato.getTipo() == DataType.BOOLEANO){
            for (let index = 0; index < this.ids.length; index++) {
                tabla.setValor(this.ids[index], new Simbolo(this.tipo, this.ids[index], this.valor.interpretar(arbol, tabla)));
            }
        }else{
            //ERROR SEMANTICO
            controller.listaErrores.push(new Error(new errores.default('ERROR SEMANTICO', "No coinciden los tipos de datos", this.linea, this.columna)))
        }
        return null;
    }
}