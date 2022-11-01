import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import get from "lodash/get"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Elif extends Instruccion{
    condicion: Instruccion;
    listainstrucciones: Instruccion[];

    constructor(condicion: Instruccion,listainstrucciones: Instruccion[], fila: number, columna: number){
        super( fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        const operacion=this.condicion.interpretar(arbol,tabla);
        if (operacion) {
            const tablaLocal = new SymbolTable(tabla);
            for(let i of this.listainstrucciones){
                i.interpretar(arbol,tablaLocal);
            }
            return true
        }else{
            return false
        }
    }
}