import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import Break from "./Break";
import Error from "../Exceptions/Error";
import Caso from "./Caso";
import get from "lodash/get"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Switch extends Instruccion{
    condicion: Instruccion;
    listacasos: Caso[];
    listainsdefault: Instruccion[] | undefined;
    listainstruccioneselse: Instruccion[] | undefined;

    constructor(condicion: Instruccion,listacasos: Caso[],listainsdefault: Instruccion[],fila: number, columna: number){
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
            if(this.condicion.interpretar(arbol,tabla).type == caso.condicion.interpretar(arbol, tabla).type){
                let condswitch = this.condicion.interpretar(arbol,tabla).value;
                let condcaso = caso.condicion.interpretar(arbol,tabla).value;
                if(condswitch == condcaso || entrar){
                    entrar = true;
                    let ejecutar = caso.interpretar(arbol,tablalocal);
                    if(ejecutar instanceof Break){
                        breakint = true;
                        return ejecutar;
                    }
                }
            }else{
                return  new Error(tipoErr.SEMANTICO, "La condicion no concuerda con el tipo del dato del caso", this.linea, this.columna);
            }
        }
        //DEFAULT
        if(!breakint){
            if(this.listainsdefault != null){
                for(let i of this.listainsdefault){
                    let instrucciones1 = i.interpretar(arbol, tablalocal);
                    if(instrucciones1 instanceof Break){
                        return instrucciones1;
                    }
                }
            }
        } 
    }
}