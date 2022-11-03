import { Instruccion } from "../Abstract/Instruccion";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
import SymbolTable from '../Symbol/SymbolTable';
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class DeclaracionVector1D1 extends Instruccion {
    private id: String;
    private tipo: DataType;
    private cantidad: Instruccion;

    constructor(id: String, tipo: DataType,cantidad:Instruccion, linea: number, columna: number){
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.cantidad = cantidad;
    }

    interpretar(arbol: Arbol, tabla: SymbolTable) {
        console.log("entro a declaracion vector 1d");
        const tamanio = this.cantidad.interpretar(arbol,tabla);
        if(tamanio.type != DataType.ENTERO){
            return  new Error(tipoErr.SEMANTICO,"El tamaño del vector debe ser un entero", this.linea, this.columna);
        }
        if(this.tipo === DataType.ENTERO){
            let temporal = [];
            for(let i = 0; i < tamanio.value; i++){
                temporal.push(0);
            }
            tabla.saveVector(this.id,temporal,DataType.ENTERO,this.linea,this.columna);
        }else if(this.tipo === DataType.DECIMAL){
            let temporal = [];
            for(let i = 0; i < tamanio.value; i++){
                temporal.push(0.0);
            }
            tabla.saveVector(this.id,temporal,DataType.DECIMAL,this.linea,this.columna);
        }else if(this.tipo === DataType.BOOLEANO){
            let temporal = [];
            for(let i = 0; i < tamanio.value; i++){
                temporal.push(true);
            }
            tabla.saveVector(this.id,temporal,DataType.BOOLEANO,this.linea,this.columna);
        }else if(this.tipo === DataType.CADENA){
            let temporal = [];
            for(let i = 0; i < tamanio.value; i++){
                temporal.push('');
            }
            tabla.saveVector(this.id,temporal,DataType.CADENA,this.linea,this.columna);
        }else if(this.tipo === DataType.CARACTER){
            let temporal = [];
            for(let i = 0; i < tamanio.value; i++){
                temporal.push("");
            }
            tabla.saveVector(this.id,temporal,DataType.CARACTER,this.linea,this.columna);
        }
    }
}