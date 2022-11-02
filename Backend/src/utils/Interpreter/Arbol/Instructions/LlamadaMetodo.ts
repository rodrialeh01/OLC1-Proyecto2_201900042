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

export default class LlamadaMetodo extends Instruccion{
    identificador: String;
    parametros: Instruccion[];

    constructor(identificador: String, parametros: Instruccion[], fila: number, columna: number){
        super(fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
    }
    interpretar(arbol: Three, tabla: SymbolTable) {
        let met = tabla.getMetodo(this.identificador);
        if(met != null){
            if(met.parametros != null){
                if(met.parametros.length == this.parametros.length){
                    for(let i = 0; i < this.parametros.length; i++){
                        let param = this.parametros[i].interpretar(arbol, tabla);
                        if(param.type != met.listatipos[i]){
                            throw new Error(tipoErr.SEMANTICO, "El tipo de parametro no coincide con el tipo de parametro del metodo", this.linea, this.columna);
                        }
                    }
                    let tablaLocal = new SymbolTable(tabla);
                    for(let i = 0; i < met.listaparametros.length; i++){
                        let valor = this.parametros[i].interpretar(arbol, tabla);
                        const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type,this.linea, this.columna);
                        if(!valid){
                            throw new Error(tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
                        }
                    }
                    for(let i of met.listainstrucciones){
                        if(i instanceof Return){
                            if(i.exp == null){
                                return i;
                            }else{
                                throw new Error(tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                            }
                        }
                        i.interpretar(arbol, tablaLocal);
                    }
                }else{
                    throw new Error(tipoErr.SEMANTICO, "La cantidad de parametros no coincide con la cantidad de parametros del metodo", this.linea, this.columna);
                }
            }else{
                let tablaLocal = new SymbolTable(tabla);
                for(let i = 0; i < met.listaparametros.length; i++){
                    let valor = this.parametros[i].interpretar(arbol, tabla);
                    const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type,this.linea, this.columna);
                    if(!valid){
                        throw new Error(tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
                    }
                }
                for(let i of met.listainstrucciones){
                    console.log('-------------')
                    console.log(i);
                    i.interpretar(arbol, tablaLocal);
                    if(i instanceof Return){
                        if(i.exp == null){
                            return i;
                        }else{
                            throw new Error(tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                        }
                    }
                }
            }
        }else{
            throw new Error(tipoErr.SEMANTICO, "El metodo no existe", this.linea, this.columna);
        }
    }
}