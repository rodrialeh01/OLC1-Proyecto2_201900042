import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import { obtenercaracteres } from "../Data/Data";
import get from "lodash/get"

export default class Nativo extends Instruccion {

    constructor(private tipo: DataType,private valor: any, fila: number, columna: number){
        super(fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.tipo === DataType.ENTERO){
            return {
                "type": DataType.ENTERO,
                "value": Number(this.valor)
            };
        }else if(this.tipo === DataType.CADENA){
            return {
                "type":DataType.CADENA,
                "value":this.valor.toString().replaceAll("\\n","\n").replaceAll("\\t","\t").replaceAll("\\r","\r").replaceAll("\\\\","\\").replaceAll("\\\"","\"").replaceAll("\\'","\'")
            };
        }else if(this.tipo === DataType.DECIMAL){
            return {
                "type": DataType.DECIMAL,
                "value": Number(this.valor)
            };
        }else if(this.tipo === DataType.CARACTER){
            return {
                "type":DataType.CARACTER, 
                "value":obtenercaracteres(this.valor.toString())
            };
        }else if(this.tipo === DataType.BOOLEANO){
            if(this.valor.toString().toUpperCase()==="TRUE"){
                return {
                    "type":DataType.BOOLEANO,
                    "value": true
                };
            }else if(this.valor.toString().toUpperCase()==="FALSE"){
                return {
                    "type":DataType.BOOLEANO,
                    "value": false
                };
            }
        }else{
            return {
                "type":DataType.INDEFINIDO,
                "value": null
            };
        }
    }
    
}