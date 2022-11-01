"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Asignacion extends Instruccion_1.Instruccion {
    constructor(ids, valor, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        /*
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
                    throw new Error(new errores.default('ERROR SEMANTICO', "No existe la variable", this.linea, this.columna));
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(new errores.default('ERROR SEMANTICO', "No existe la variable", this.linea, this.columna));
            }
        }
        return null;
        */
    }
}
exports.default = Asignacion;
