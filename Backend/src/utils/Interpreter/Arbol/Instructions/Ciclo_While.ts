import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';
import cloneDeep from "lodash/cloneDeep"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class While extends Instruccion{
    condicion: Instruccion;
    listainstrucciones: Instruccion[];

    constructor(condicion: Instruccion,listainstrucciones: Instruccion[], fila: number, columna: number){
        super(new Type(DataType.INDEFINIDO), fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        const tablaLocal = new SymbolTable(tabla);
        if(typeof cloneDeep(this.condicion).interpretar(arbol,tablaLocal) == "boolean"){
            while(cloneDeep(this.condicion).interpretar(arbol,tablaLocal)){
                const instrucciones = cloneDeep(this.listainstrucciones);
                for(let i of instrucciones){
                    i.interpretar(arbol,tablaLocal);
                }
            }
        }
        return null;
    }
}