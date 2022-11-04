import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
import Error from "../Exceptions/Error";
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
        let tablaLocal = new SymbolTable(tabla);
        let condicion = this.condicion.interpretar(arbol, tabla);

        if(condicion.type == DataType.BOOLEANO){
            if(condicion.value == true){
                for(let i of this.listainstrucciones){
                    let instrucciones1 = i.interpretar(arbol, tablaLocal);
                    if(instrucciones1 instanceof Break){
                        return instrucciones1;
                    }else if(instrucciones1 instanceof Return){
                        return instrucciones1;
                    }else if(instrucciones1 instanceof Continue){
                        return instrucciones1;
                    }
                }
            }
        }else{
            throw new Error(tipoErr.SEMANTICO, "La condicion no es booleana", this.linea, this.columna);
        }
    }
}