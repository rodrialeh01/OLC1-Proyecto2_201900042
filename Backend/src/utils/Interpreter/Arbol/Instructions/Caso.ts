import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import Break from "./Break";
import get from "lodash/get"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Caso extends Instruccion{
    condicion: Instruccion;
    instrucciones: Instruccion[];

    constructor(condicion: Instruccion,instrucciones: Instruccion[],fila: number, columna: number){
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let tablalocal = new SymbolTable(tabla);
        if(this.instrucciones != null){
            for(let i of this.instrucciones){
                let ins = i.interpretar(arbol,tablalocal);
                if(ins instanceof Break){
                    return ins;
                }
            }
        }
    }
}