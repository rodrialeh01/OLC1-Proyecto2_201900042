import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Asignacion extends Instruccion {
    private ids: Array<String>;
    private valor: Instruccion;

    constructor(ids: Array<String>, valor: Instruccion, linea: number, columna: number){
        super(linea, columna);
        this.ids = ids;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorasig = this.valor.interpretar(arbol,tabla);
        for(let id of this.ids){
            let variable = tabla.getVariable(id);
            if(variable != null){
                if(tabla.getTipo(id) == valorasig?.type){
                    tabla.asignar(id,valorasig.value);
                    console.log("Se asigno a la variable " + id)
                }else{
                    throw new Error(tipoErr.SEMANTICO,"No coinciden los tipos de datos", this.linea, this.columna);
                }
            }
        }
    }
}