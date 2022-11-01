"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Declaracion extends Instruccion_1.Instruccion {
    constructor(ids, tipo, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.tipo = tipo;
    }
    interpretar(arbol, tabla) {
        /*
        for (let index = 0; index < this.ids.length; index++) {
            if(tabla.getValor(this.ids[index]) == null){
                if (this.tipo.getTipo() === DataType.ENTERO) {
                    tabla.setValor(this.ids[index].toLowerCase(), new Simbolo(this.tipo, this.ids[index],0));
                }else if (this.tipo.getTipo() === DataType.CADENA) {
                    tabla.setValor(this.ids[index].toLowerCase(), new Simbolo(this.tipo, this.ids[index],""));
                }else if (this.tipo.getTipo() === DataType.DECIMAL) {
                    tabla.setValor(this.ids[index].toLowerCase(), new Simbolo(this.tipo, this.ids[index],0.0));
                }else if (this.tipo.getTipo() === DataType.CARACTER) {
                    tabla.setValor(this.ids[index].toLowerCase(), new Simbolo(this.tipo, this.ids[index],'0'));
                }else if (this.tipo.getTipo() === DataType.BOOLEANO) {
                    tabla.setValor(this.ids[index].toLowerCase(), new Simbolo(this.tipo, this.ids[index],true));
                }
            }else{
                controller.listaErrores.push(new Error(new errores.default('ERROR SEMANTICO', "Ya existe un identificador con este nombre", this.linea, this.columna)))
            }
        }
        */
        return null;
    }
}
exports.default = Declaracion;
