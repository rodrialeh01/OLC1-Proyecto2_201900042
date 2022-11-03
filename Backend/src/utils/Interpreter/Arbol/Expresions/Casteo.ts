import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoLog, tipoErr } from '../Data/Data';
import Error from "../Exceptions/Error";
import get from "lodash/get"

export default class Casteo extends Instruccion {

    constructor(private tipo:DataType, private expresion: Instruccion, fila: number, columna: number){
        super(fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let exp = this.expresion.interpretar(arbol,tabla);
        if(this.tipo == DataType.ENTERO){
            if(exp.type == DataType.ENTERO){
                return {
                    "type": DataType.ENTERO,
                    "value": Number(exp.value)
                }
            }else if(exp.type == DataType.DECIMAL){
                return {
                    "type": DataType.ENTERO,
                    "value": Math.trunc(exp.value)
                }
            }else if(exp.type == DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": exp.value.charCodeAt(0)
                }
            }else if(exp.type == DataType.CADENA){
                return {
                    "type": DataType.ENTERO,
                    "value": Number(exp.value)
                }
            }else if(exp.type == DataType.BOOLEANO){
                if(exp.value == true){
                    return {
                        "type": DataType.ENTERO,
                        "value": 1
                    }
                }else{
                    return {
                        "type": DataType.ENTERO,
                        "value": 0
                    }
                }
            }else{
                return  new Error(tipoErr.SEMANTICO, "No se puede castear a entero", this.linea, this.columna);
            }
        }else if(this.tipo == DataType.DECIMAL){
            if(exp.type == DataType.ENTERO){
                return {
                    "type": DataType.DECIMAL,
                    "value": Number(exp.value)
                }
            }else if(exp.type == DataType.DECIMAL){
                return {
                    "type": DataType.DECIMAL,
                    "value": Number(exp.value)
                }
            }else if(exp.type == DataType.CADENA){
                return {
                    "type": DataType.DECIMAL,
                    "value": Number(exp.value)
                }
            }else{
                return  new Error(tipoErr.SEMANTICO, "No se puede castear a decimal", this.linea, this.columna);
            }
        }else if(this.tipo == DataType.BOOLEANO){
            if(exp.type == DataType.ENTERO){
                if(exp.value == 0){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": false
                    }
                }else if(exp.value == 1){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": true
                    }
                }else{
                    return  new Error(tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }else if(exp.type == DataType.DECIMAL){
                if(exp.value == 0.0){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": false
                    }
                }else if(exp.value == 1.0){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": true
                    }
                }else{
                    return  new Error(tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }else if(exp.type == DataType.CARACTER){
                if(exp.value == '0' || exp.value == "0" ){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": false
                    }
                }else if(exp.value == '1' || exp.value == "1" ){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": true
                    }
                }else{
                    return  new Error(tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }else if(exp.type == DataType.CADENA){
                if(exp.value == "0" || String(exp.value).toLowerCase() == "false"){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": false
                    }
                }else if(exp.value == "1" || String(exp.value).toLowerCase() == "true"){
                    return {
                        "type": DataType.BOOLEANO,
                        "value": true
                    }
                }else{
                    return  new Error(tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
                }
            }else if(exp.type == DataType.BOOLEANO){
                return {
                    "type": DataType.BOOLEANO,
                    "value": exp.value
                }
            }else{
                return  new Error(tipoErr.SEMANTICO, "No se puede castear a booleano", this.linea, this.columna);
            }
        }else if(this.tipo == DataType.CARACTER){
            if(exp.type == DataType.ENTERO){
                return {
                    "type": DataType.CARACTER,
                    "value": String.fromCharCode(exp.value)
                }
            }else if(exp.type == DataType.DECIMAL){
                return {
                    "type": DataType.CARACTER,
                    "value": String.fromCharCode(exp.value)
                }
            }else if(exp.type == DataType.CARACTER){
                return {
                    "type": DataType.CARACTER,
                    "value": exp.value
                }
            }else if(exp.type == DataType.CADENA){
                return {
                    "type": DataType.CARACTER,
                    "value": exp.value.charAt(0)
                }
            }else if(exp.type == DataType.BOOLEANO){
                if(exp.value == true){
                    return {
                        "type": DataType.CARACTER,
                        "value": "1"
                    }
                }else{
                    return {
                        "type": DataType.CARACTER,
                        "value": "0"
                    }
                }
            }else{
                return  new Error(tipoErr.SEMANTICO, "No se puede castear a caracter", this.linea, this.columna);
            }
        }else if(this.tipo == DataType.CADENA){
            if(exp.type == DataType.ENTERO){
                return {
                    "type": DataType.CADENA,
                    "value": String(exp.value)
                }
            }else if(exp.type == DataType.DECIMAL){
                return {
                    "type": DataType.CADENA,
                    "value": String(exp.value)
                }
            }else if(exp.type == DataType.CARACTER){
                return {
                    "type": DataType.CADENA,
                    "value": String(exp.value)
                }
            }else if(exp.type == DataType.CADENA){
                return {
                    "type": DataType.CADENA,
                    "value": exp.value
                }
            }else if(exp.type == DataType.BOOLEANO){
                if(exp.value == true){
                    return {
                        "type": DataType.CADENA,
                        "value": "true"
                    }
                }else{
                    return {
                        "type": DataType.CADENA,
                        "value": "false"
                    }
                }
            }else{
                return  new Error(tipoErr.SEMANTICO, "No se puede castear a cadena", this.linea, this.columna);
            }
        }else{          
            return  new Error(tipoErr.SEMANTICO, "No se puede castear la expresion", this.linea, this.columna);
        }
    }
}