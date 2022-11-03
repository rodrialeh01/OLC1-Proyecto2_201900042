import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoLog, tipoErr} from '../Data/Data';
import Error from "../Exceptions/Error";
import get from "lodash/get"

export default class Op_Ternario extends Instruccion {

    constructor(private condicion: Instruccion, private ins1: Instruccion,private ins2: Instruccion, fila: number, columna: number){
        super(fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        const cond = this.condicion.interpretar(arbol,tabla);
        if(cond.type === DataType.BOOLEANO){
            if(cond.value == true){
                return this.ins1.interpretar(arbol,tabla);
            }else{
                return this.ins2.interpretar(arbol,tabla);
            }
        }else{
            return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
        }
    }
}