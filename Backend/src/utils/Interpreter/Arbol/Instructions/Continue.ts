import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType } from "../Data/Data";
import cloneDeep from "lodash/cloneDeep"
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Continue extends Instruccion{

    constructor(fila: number, columna: number){
        super( fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        return this;
    }
}