import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
const insbreak = require('./Break');
import get from "lodash/get"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Switch extends Instruccion{
    condicion: Instruccion;
    listacasos: Instruccion[];
    listainsdefault: Instruccion[] | undefined;
    listainstruccioneselse: Instruccion[] | undefined;

    constructor(condicion: Instruccion,listacasos: Instruccion[],listainsdefault: Instruccion[],fila: number, columna: number){
        super(fila, columna);
        this.condicion = condicion;
        this.listacasos = listacasos;
        this.listainsdefault = listainsdefault ;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let tablalocal = new SymbolTable(tabla);
        let entrar = false;
        let breakint = false;
        for(let caso of this.listacasos){
            let valid = this.condicion.interpretar(arbol,tabla);
            let expcaso = caso.interpretar(arbol,tabla);
            if(valid == expcaso || entrar){
                entrar = true;
                let ejecutar = caso.interpretar(arbol,tablalocal);
                if(ejecutar instanceof insbreak.Break){
                    breakint = true;
                    return ejecutar;
                }
            }
        }   
    }
}