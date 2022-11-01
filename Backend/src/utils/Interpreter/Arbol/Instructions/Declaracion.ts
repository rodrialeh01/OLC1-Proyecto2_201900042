import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import { DataType } from "../Data/Data";
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Declaracion extends Instruccion {
    private ids: Array<String>;
    private tipo: DataType;

    constructor(ids: Array<String>, tipo: DataType, linea: number, columna: number){
        super(linea, columna);
        this.ids = ids;
        this.tipo = tipo;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
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