"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Declaracion_Asignacion extends Instruccion_1.Instruccion {
    constructor(ids, tipo, valor, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        let valorasig = this.valor.interpretar(arbol, tabla);
        /*
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
        */
    }
}
exports.default = Declaracion_Asignacion;
