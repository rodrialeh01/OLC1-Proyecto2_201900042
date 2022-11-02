import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
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
        for(let id of this.ids){
            if(this.tipo === DataType.ENTERO){
                const validar = tabla.saveSymbol(id,0,DataType.ENTERO,this.linea,this.columna);
                if(validar){

                }else{
                    throw new Error(tipoErr.SEMANTICO,"La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }else if(this.tipo === DataType.DECIMAL){
                const validar = tabla.saveSymbol(id,0.0,DataType.DECIMAL,this.linea,this.columna);
                if(validar){

                }else{
                    throw new Error(tipoErr.SEMANTICO,"La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }else if(this.tipo === DataType.BOOLEANO){
                const validar = tabla.saveSymbol(id,true,DataType.BOOLEANO,this.linea,this.columna);
                if(validar){

                }else{
                    throw new Error(tipoErr.SEMANTICO,"La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }else if(this.tipo === DataType.CARACTER){
                const validar = tabla.saveSymbol(id,"0",DataType.CARACTER,this.linea,this.columna);
                if(validar){

                }else{
                    throw new Error(tipoErr.SEMANTICO,"La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }else if(this.tipo === DataType.CADENA){
                const validar = tabla.saveSymbol(id,"",DataType.CADENA,this.linea,this.columna);
                if(validar){

                }else{
                    throw new Error(tipoErr.SEMANTICO,"La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }else{
                throw new Error(tipoErr.SEMANTICO,"Tipo de dato mal ingresado", this.linea, this.columna);
            }
        }
    }
}