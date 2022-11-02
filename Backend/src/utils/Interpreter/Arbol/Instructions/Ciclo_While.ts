import { Instruccion } from "../Abstract/Instruccion";
import Break from "./Break";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
import Continue from './Continue';
import Return from "./Return";
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
        let condiciontemp = true
        Continuacion: while(condiciontemp){
            let condicion = this.condicion.interpretar(arbol, tabla);
            if(condicion.type == DataType.BOOLEANO){
                if(condicion.value == true){
                    const tablaLocal = new SymbolTable(tabla);
                    for(let i of this.listainstrucciones){
                        let instrucciones = i.interpretar(arbol, tablaLocal);
                        if(instrucciones instanceof Break){
                            return instrucciones;
                        }else if(instrucciones instanceof Continue){
                            continue Continuacion;
                        }else if(instrucciones instanceof Return){
                            return instrucciones;
                        }
                    }
                }else{
                    condiciontemp = false
                    break;
                }
            }else{
                throw new Error(tipoErr.SEMANTICO, "La condicion no es booleana", this.linea, this.columna);
            }
        }
    }
}