import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import get from "lodash/get"
import Error from "../Exceptions/Error";
import Break from './Break';
import Continue from "./Continue";
import Return from "./Return";
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')
export let bucle = false;

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
            }else{
                if(this.listaelif != null){
                    for(let i of this.listaelif){
                        i.interpretar(arbol, tablaLocal);
                    }
                }
                if(this.listainstruccioneselse != null){
                    for(let i of this.listainstruccioneselse){
                        let instrucciones3 = i.interpretar(arbol, tablaLocal);
                        if(instrucciones3 instanceof Break){
                            return instrucciones3;
                        }else if(instrucciones3 instanceof Return){
                            return instrucciones3;
                        }else if(instrucciones3 instanceof Continue){
                            return instrucciones3;
                        }
                    }
                }
            }
        }else{
            throw new Error(tipoErr.SEMANTICO, "La condicion no es booleana", this.linea, this.columna);
        }
    }
}