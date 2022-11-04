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

export default class Funcion extends Instruccion{
    identificador: String;
    parametros: String[];
    tipo: DataType;
    listainstrucciones: Instruccion[];
    listaparametros: String[];
    listatipos: DataType[];

    constructor(identificador: String, parametros: String[],tipo: DataType, listainstrucciones: Instruccion[], fila: number, columna: number){
        super(fila, columna);
        this.identificador = identificador;
        this.parametros = parametros;
        this.tipo = tipo;
        this.listainstrucciones = listainstrucciones;
        this.listaparametros = [];
        this.listatipos =[];
    }
    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.tipo === DataType.VOID){
            const valid = tabla.validarFuncion(this.identificador);
            if(valid){
                if(this.parametros != null){
                    for(let i of this.parametros){
                        let id = i.split(",")[0];
                        let tipo = i.split(",")[1].toLowerCase();
                        this.listaparametros.push(id);
                        switch(tipo){
                            case "0":
                                this.listatipos.push(DataType.ENTERO);
                                break;
                            case "1":
                                this.listatipos.push(DataType.CADENA);
                                break;
                            case "2":
                                this.listatipos.push(DataType.DECIMAL);
                                break;
                            case "3":
                                this.listatipos.push(DataType.CARACTER);
                                break;
                            case "4":
                                this.listatipos.push(DataType.BOOLEANO);
                                break;
                            default:
                                throw new Error(tipoErr.SEMANTICO, "El tipo de dato no es válido", this.linea, this.columna);
                        }
                    }
                }
                tabla.saveFuncion(this.identificador,this);
            }else{
                throw new Error(tipoErr.SEMANTICO,"El metodo "+this.identificador+" ya existe",this.linea,this.columna);
            }
        }else if(this.tipo == DataType.BOOLEANO || this.tipo == DataType.CADENA || this.tipo == DataType.CARACTER || this.tipo == DataType.DECIMAL || this.tipo == DataType.ENTERO){
            const valid = tabla.validarFuncion(this.identificador);
            if(valid){
                if(this.parametros != null){
                    for(let i of this.parametros){
                        let id = i.split(",")[0];
                        let tipo = i.split(",")[1].toLowerCase();
                        this.listaparametros.push(id);
                        switch(tipo){
                            case "0":
                                this.listatipos.push(DataType.ENTERO);
                                break;
                            case "1":
                                this.listatipos.push(DataType.CADENA);
                                break;
                            case "2":
                                this.listatipos.push(DataType.DECIMAL);
                                break;
                            case "3":
                                this.listatipos.push(DataType.CARACTER);
                                break;
                            case "4":
                                this.listatipos.push(DataType.BOOLEANO);
                                break;
                            default:
                                throw new Error(tipoErr.SEMANTICO, "El tipo de dato no es válido", this.linea, this.columna);
                        }
                    }
                }
                tabla.saveFuncion(this.identificador,this);
            }else{
                throw new Error(tipoErr.SEMANTICO,"El metodo "+this.identificador+" ya existe",this.linea,this.columna);
            }
        }else{
            throw new Error(tipoErr.SEMANTICO, "El tipo de dato no es válido", this.linea, this.columna);
        }
    }
}