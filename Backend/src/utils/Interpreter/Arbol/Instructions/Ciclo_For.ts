import { Instruccion } from "../Abstract/Instruccion";
import Break from "./Break";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
import Incremento from '../Expresions/Incremento';
import Decremento from '../Expresions/Decremento';
import Asignacion from './Asignacion';
import Declaracion_Asignacion from './DeclaracionAsignacion';
import Continue from "./Continue";
import Return from "./Return";
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class For extends Instruccion{
    insvar: Declaracion_Asignacion | Asignacion;
    condicion: Instruccion;
    actualizacion: Incremento | Decremento | Asignacion;
    listainstrucciones: Instruccion[];

    constructor(insvar: Declaracion_Asignacion | Asignacion,condicion: Instruccion,actualizacion: Incremento | Decremento | Asignacion,listainstrucciones: Instruccion[], fila: number, columna: number){
        super( fila, columna);
        this.insvar = insvar;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.listainstrucciones = listainstrucciones;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let tablaLocal = new SymbolTable(tabla);
        for(this.insvar.interpretar(arbol, tablaLocal); this.condicion.interpretar(arbol, tablaLocal).value; this.actualizacion.interpretar(arbol, tablaLocal)){
            for(let i of this.listainstrucciones){
                let instrucciones1 = i.interpretar(arbol, tablaLocal);
                if(instrucciones1 instanceof Break){
                    break;
                }else if(instrucciones1 instanceof Return){
                    return instrucciones1;
                }else if(instrucciones1 instanceof Continue){
                    continue;
                }
            }
        }
    }
}