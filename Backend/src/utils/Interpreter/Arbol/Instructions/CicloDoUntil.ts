import { Instruccion } from "../Abstract/Instruccion";
import Break from "./Break";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class DoUntil extends Instruccion{
    condicion: Instruccion;
    listainstrucciones: Instruccion[];

    constructor(condicion: Instruccion,listainstrucciones: Instruccion[], fila: number, columna: number){
        super( fila, columna);
        this.condicion = condicion;
        this.listainstrucciones = listainstrucciones;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let tablaLocal = new SymbolTable(tabla);
        let condicion = this.condicion.interpretar(arbol, tablaLocal);
        if(condicion.type == DataType.BOOLEANO){
            while(true){
                let tablaLocal2 = new SymbolTable(tablaLocal);
                for(let i of this.listainstrucciones){
                    let instrucciones = i.interpretar(arbol, tablaLocal2);
                    if(instrucciones instanceof Break){
                        return instrucciones;
                    }
                }
                let condicion = this.condicion.interpretar(arbol, tablaLocal2);
                if(condicion.value == true){
                    break;
                }
            }
        }else{
            throw new Error(tipoErr.SEMANTICO, "La condicion no es booleana", this.linea, this.columna);
        }
    }
}