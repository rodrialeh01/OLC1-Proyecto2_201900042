import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import get from "lodash/get"

export default class Nativo extends Instruccion {
    valor: any;

    constructor(tipo: Type, valor: any, fila: number, columna: number){
        super(tipo, fila, columna);
        this.valor = valor;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.tipoDato.getTipo()===DataType.ENTERO){
            return this.valor;
        }else if(this.tipoDato.getTipo()===DataType.CADENA){
            return this.valor.toString().replaceAll("\\n","\n").replaceAll("\\t","\t").replaceAll("\\r","\r").replaceAll("\\\\","\\").replaceAll("\\\"","\"").replaceAll("\\'","\'");
        }else if(this.tipoDato.getTipo()===DataType.DECIMAL){
            return this.valor;
        }else if(this.tipoDato.getTipo()===DataType.CARACTER){
            return this.obtenercaracteres(this.valor.toString());
        }else if(this.tipoDato.getTipo()===DataType.BOOLEANO){
            if(this.valor.toString().toUpperCase()==="TRUE"){
                return "true";
            }else if(this.valor.toString().toUpperCase()==="FALSE"){
                return "false";
            }
        }else if(this.tipoDato.getTipo()===DataType.IDENTIFICADOR){
            let value = tabla.getValor(this.valor)
            return get(value, 'valor');
        }
    }
    obtenercaracteres(car: string): string{
        switch(car){
            case "\\n":{
                return "\n"
            }
            case "\\\\":{
                return "\\"
            }
            case "\\t":{
                return "\t"
            }
            case "\\r":{
                return "\r"
            }
            case "\\'":{
                return "\'"
            }
            case "\\\"":{
                return "\""
            }
            default:
            {
                return car
            }
        }
    }
}