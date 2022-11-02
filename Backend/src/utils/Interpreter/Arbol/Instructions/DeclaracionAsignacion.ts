import { Instruccion } from "../Abstract/Instruccion";
import Operacion from "../Expresions/Native";
import Arbol from "../Symbol/Three";
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from "../Symbol/SymbolTable";
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
const controller = require('../../../../controller/parser/parser')
const errores = require('../Exceptions/Error')

export default class Declaracion_Asignacion extends Instruccion {
    private ids: Array<String>;
    private tipo: DataType;
    private valor: Operacion;

    constructor(ids: Array<String>, tipo: DataType, valor: Operacion, linea: number, columna: number){
        super( linea, columna);
        this.ids = ids;
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valorasig = this.valor.interpretar(arbol,tabla)
        for(let id of this.ids){
            if(valorasig?.type == this.tipo){
                const valid = tabla.saveSymbol(id,valorasig.value, this.tipo, this.linea, this.columna);
                if(valid){  
                    console.log("Se declaro la variable " + id);
                }else{
                    throw new Error(tipoErr.SEMANTICO,"La variable ya fue declarada anteriormente", this.linea, this.columna);
                }
            }else{
                throw new Error(tipoErr.SEMANTICO,"No coinciden los tipos de datos", this.linea, this.columna);
            }
        }
    }
}