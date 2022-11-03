import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
import get from "lodash/get"

export default class Unario extends Instruccion {

    constructor(private operadorDer: Instruccion, fila: number, columna: number){
        super( fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        let valorDer = this.operadorDer.interpretar(arbol,tabla);
        if (valorDer.type ===DataType.ENTERO) {
            return {
                "type": DataType.ENTERO,
                "value": (-1*Number(valorDer.value))
            }
        }else if(valorDer.type===DataType.DECIMAL){
            return {
                "type": DataType.DECIMAL,
                "value": (-1*Number(valorDer.value))
            }
        }else{
            //ERROR SEMANTICO
            return  new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
        }
    }
}