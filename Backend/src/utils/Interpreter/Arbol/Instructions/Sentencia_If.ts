import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import get from "lodash/get"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class If extends Instruccion{
    condicion: Instruccion;
    listainstrucciones: Instruccion[];
    listaelif: Instruccion[] | undefined;
    listainstruccioneselse: Instruccion[] | undefined;

    constructor(condicion: Instruccion,listainstrucciones: Instruccion[],listaelif:Instruccion[]| undefined,listainstruccioneselse:Instruccion[]| undefined, fila: number, columna: number){
        super(fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
        this.listaelif = listaelif ;
        this.listainstruccioneselse = listainstruccioneselse ;
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
            if(this.listaelif){
                for(let i of this.listaelif){
                    const operation = i.interpretar(arbol, tabla);
                    if(operation){
                        return false;
                    }
                }
            }
            if(this.listainstruccioneselse){
                const tablaLocal = new SymbolTable(tabla)
                for(let i of this.listainstruccioneselse){
                    i.interpretar(arbol,tablaLocal);
                }
                return false
            }
        }
    }
}