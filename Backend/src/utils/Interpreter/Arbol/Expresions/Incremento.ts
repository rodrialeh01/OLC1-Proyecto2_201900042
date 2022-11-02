import { DataType, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';

export default class Incremento extends Instruccion{
    private id: String;

    constructor(id:String, linea:number, columna:number){
        super(linea, columna);
        this.id = id
    }

    public interpretar(arbol: Three, tabla: SymbolTable) {
        let variable = tabla.getVariable(this.id);
        if(variable != null){
            if(variable.type == DataType.ENTERO || variable.type == DataType.DECIMAL){
                let valor = variable.valor + 1;
                tabla.asignar(this.id,valor);
                return tabla.getExp(valor, variable.type);
            }else{
                throw new Error(tipoErr.SEMANTICO,"No se puede incrementar una variable que no sea entera o decimal", this.linea, this.columna);
            }
        }else{
            throw new Error(tipoErr.SEMANTICO,"No se encontro la variable", this.linea, this.columna);
        }
    }
}