import { Instruccion } from "../Abstract/Instruccion";
import Break from "./Break";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import cloneDeep from "lodash/cloneDeep"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class While extends Instruccion{
    condicion: Instruccion;
    listainstrucciones: Instruccion[];

    constructor(condicion: Instruccion,listainstrucciones: Instruccion[], fila: number, columna: number){
        super( fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        const tablaLocal = new SymbolTable(tabla);
        if(typeof cloneDeep(this.condicion).interpretar(arbol,tablaLocal) == "boolean"){
            while(cloneDeep(this.condicion).interpretar(arbol,tablaLocal)){
                const instrucciones = cloneDeep(this.listainstrucciones);
                for(let i of instrucciones){
                    if(i instanceof Instruccion){
                        console.log("Instruccion: ",(i.constructor.name));
                        if(i.constructor.name == "Break"){
                            return i.interpretar(arbol,tablaLocal);
                        }
                        i.interpretar(arbol,tablaLocal);
                    }
                }
            }
        }
    }
}