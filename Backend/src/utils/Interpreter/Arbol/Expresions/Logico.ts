import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoLog, tipoErr} from '../Data/Data';
import Error from "../Exceptions/Error";
import get from "lodash/get"

export default class Logico extends Instruccion {

    constructor(private tipo: tipoLog,private operadorIzq: Instruccion, private operadorDer: Instruccion, fila: number, columna: number){
        super(fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
        let valorDer = this.operadorDer.interpretar(arbol,tabla);
        if(this.tipo === tipoLog.OR){
            return {
                "type": DataType.BOOLEANO,
                "value": (valorIzq.value || valorDer.value)
            }
        }else if(this.tipo === tipoLog.AND){
            return {
                "type": DataType.BOOLEANO,
                "value": (valorIzq.value && valorDer.value)
            }
        }else{
            throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
        }
    }
}

