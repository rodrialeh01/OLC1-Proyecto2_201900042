import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import get from "lodash/get"
import Error from "../Exceptions/Error";
import Break from './Break';
import Continue from "./Continue";
import Return from "./Return";
import Switch from './Sentencia_Switch';
import If from './Sentencia_If';
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')
export let bucle = false;

export default class LlamadaFuncion extends Instruccion{
    identificador: String;
    parametros: Instruccion[];

    constructor(identificador: String, parametros: Instruccion[], fila: number, columna: number){
        super(fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
    }
    interpretar(arbol: Three, tabla: SymbolTable) {
        let met = tabla.getFuncion(this.identificador);
        if(met != null){
            if(met.tipo === DataType.VOID){
                if(met.parametros != null){
                    if(met.parametros.length == this.parametros.length){
                        for(let i = 0; i < this.parametros.length; i++){
                            let param = this.parametros[i].interpretar(arbol, tabla);
                            if(param.type != met.listatipos[i]){
                                return  new Error(tipoErr.SEMANTICO, "El tipo de parametro no coincide con el tipo de parametro del metodo", this.linea, this.columna);
                            }
                        }
                        let tablaLocal = new SymbolTable(tabla);
                        for(let i = 0; i < met.listaparametros.length; i++){
                            let valor = this.parametros[i].interpretar(arbol, tabla);
                            const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type,this.linea, this.columna);
                            if(!valid){
                                return  new Error(tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
                            }
                        }
                        for(let i of met.listainstrucciones){
                            if(i instanceof Return){
                                if(i.exp == null){
                                    return i;
                                }else{
                                    return  new Error(tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                                }
                            }
                            i.interpretar(arbol, tablaLocal);
                        }
                    }else{
                        return  new Error(tipoErr.SEMANTICO, "La cantidad de parametros no coincide con la cantidad de parametros del metodo", this.linea, this.columna);
                    }
                }else{
                    let tablaLocal = new SymbolTable(tabla);
                    for(let i = 0; i < met.listaparametros.length; i++){
                        let valor = this.parametros[i].interpretar(arbol, tabla);
                        const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type,this.linea, this.columna);
                        if(!valid){
                            return  new Error(tipoErr.SEMANTICO, "El parametro ya existe en el metodo", this.linea, this.columna);
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
                                return  new Error(tipoErr.SEMANTICO, "El metodo no puede retornar un valor", this.linea, this.columna);
                            }
                        }
                    }
                }
            }else{
                if(met.parametros != null){
                    if(met.parametros.length == this.parametros.length){
                        let returns = 0;
                        let ejecutarf: Array<Instruccion> | null;
                        ejecutarf = new Array<Instruccion>();
                        for(let i = 0; i < this.parametros.length; i++){
                            let param = this.parametros[i].interpretar(arbol, tabla);
                            if(param.type != met.listatipos[i]){
                                return  new Error(tipoErr.SEMANTICO, "El tipo de parametro no coincide con el tipo de parametro de la funcion", this.linea, this.columna);
                            }
                        }
                        let tablaLocal = new SymbolTable(tabla);
                        for(let i = 0; i < met.listaparametros.length; i++){
                            let valor = this.parametros[i].interpretar(arbol, tabla);
                            const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type,this.linea, this.columna);
                            if(!valid){
                                return  new Error(tipoErr.SEMANTICO, "El parametro ya existe en la funcion", this.linea, this.columna);
                            }
                        }
                        for(let i of met.listainstrucciones){
                            if(i instanceof Return){
                                if(i.exp != null){
                                    returns+= 1;
                                    if(i.exp.interpretar(arbol, tablaLocal).type != met.tipo){
                                        ejecutarf = null;
                                        return  new Error(tipoErr.SEMANTICO, "El tipo de retorno no coincide con el tipo de retorno de la funcion", this.linea, this.columna);
                                    }
                                }else{
                                    ejecutarf = null;
                                    return  new Error(tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                                }
                            }
                            i.interpretar(arbol, tablaLocal);
                            ejecutarf?.push(i);
                        }
                        if(returns == 0){
                            return  new Error(tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                        }
                        if(ejecutarf != null){
                            for(let i of ejecutarf){
                                let retorno = i.interpretar(arbol, tablaLocal);
                                if(retorno != null){
                                    return retorno;
                                }
                            }
                        }
                    }else{
                        return  new Error(tipoErr.SEMANTICO, "La cantidad de parametros no coincide con la cantidad de parametros del metodo", this.linea, this.columna);
                    }
                }else{
                    let returns = 0;
                    let tablaLocal = new SymbolTable(tabla);
                    for(let i = 0; i < met.listaparametros.length; i++){
                        let valor = this.parametros[i].interpretar(arbol, tabla);
                        const valid = tablaLocal.saveSymbol(met.listaparametros[i], valor.value, valor.type,this.linea, this.columna);
                        if(!valid){
                            return  new Error(tipoErr.SEMANTICO, "El parametro ya existe en la funcion", this.linea, this.columna);
                        }
                    }
                    for(let i of met.listainstrucciones){
                        if(i instanceof Return){
                            console.log(i);
                            if(i.exp != null){
                                returns+= 1;
                                if(i.exp.interpretar(arbol, tablaLocal).type != met.tipo){
                                    return  new Error(tipoErr.SEMANTICO, "El tipo de retorno no coincide con el tipo de retorno de la funcion", this.linea, this.columna);
                                }else{
                                    return i.exp.interpretar(arbol, tablaLocal);
                                }
                            }else{
                                return  new Error(tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                            }
                        }
                        i.interpretar(arbol, tablaLocal);
                    }
                    if(returns == 0){
                        return  new Error(tipoErr.SEMANTICO, "La funcion debe retornar un valor", this.linea, this.columna);
                    }
                }
            }
        }else{
            return  new Error(tipoErr.SEMANTICO, "El metodo no existe", this.linea, this.columna);
        }
    }
}