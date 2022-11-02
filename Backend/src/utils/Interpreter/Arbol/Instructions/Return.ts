import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import cloneDeep from "lodash/cloneDeep"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Return extends Instruccion{
    public exp: Instruccion;
    constructor(exp: Instruccion,fila: number, columna: number){
        super( fila, columna);
        this.exp = exp;
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.exp != null){
            return this.exp.interpretar(arbol,tabla);
        }else{
            return this;
        }
    }
}