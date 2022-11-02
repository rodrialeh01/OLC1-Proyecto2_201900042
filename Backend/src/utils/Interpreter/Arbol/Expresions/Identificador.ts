import { DataType } from "../Data/Data";
import Error from "../Exceptions/Error";
import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';

export default class Identificador extends Instruccion{
    private id: String;

    constructor(id:String, linea:number, columna:number){
        super(linea, columna);
        this.id = id
    }

    public interpretar(arbol: Three, tabla: SymbolTable) {
        let id: any;
        id = tabla.getVariable(this.id);
        if(id != null){
            let id_var = tabla.getVariable(this.id)?.valor;
            let id_tipo = tabla.getVariable(this.id)?.type;
            return tabla.getExp(id_var, id_tipo);
        }else{
            return tabla.getExp(null, DataType.INDEFINIDO);
        }
    }
}