import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import Tipo, { DataType } from '../Symbol/Type';
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Asignacion extends Instruccion {
    private ids: Array<String>;
    private valor: Instruccion;

    constructor(ids: Array<String>, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.ids = ids;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const valorset = this.valor.interpretar(arbol,tabla);
        for (let index = 0; index < this.ids.length; index++) {
            if(tabla.getValor(this.ids[index]) != null){
                if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.ENTERO && this.valor.tipoDato.getTipo()===DataType.ENTERO){
                    tabla.setValor(this.ids[index],new Simbolo(this.valor.tipoDato,this.ids[index], valorset), false);
                    console.log(tabla.getValor(this.ids[index]));
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.DECIMAL && this.valor.tipoDato.getTipo()===DataType.DECIMAL){
                    tabla.setValor(this.ids[index],new Simbolo(this.valor.tipoDato,this.ids[index], valorset), false);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.CADENA && this.valor.tipoDato.getTipo()===DataType.CADENA){
                    tabla.setValor(this.ids[index],new Simbolo(this.valor.tipoDato,this.ids[index], valorset), false);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.BOOLEANO && this.valor.tipoDato.getTipo()===DataType.BOOLEANO){
                    tabla.setValor(this.ids[index],new Simbolo(this.valor.tipoDato,this.ids[index], valorset), false);
                }else if(tabla.getValor(this.ids[index]).tipo.getTipo()===DataType.CARACTER && this.valor.tipoDato.getTipo()===DataType.CARACTER){
                    tabla.setValor(this.ids[index],new Simbolo(this.valor.tipoDato,this.ids[index], valorset), false);
                }else{
                    controller.listaErrores.push(new Error(new errores.default('ERROR SEMANTICO', "No coinciden los tipos de datos", this.linea, this.columna)))
                }
            }else{
                //ERROR SEMANTICO
                controller.listaErrores.push(new Error(new errores.default('ERROR SEMANTICO', "No se encontro el identificador", this.linea, this.columna)))
            }
        }
        return null;
    }
}