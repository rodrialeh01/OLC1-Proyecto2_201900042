import { DataType } from "../Data/Data";

export default class Symbol{
    private tipo: DataType;
    private identificador: String;
    private valor: any;

    constructor(tipo: DataType, identificador: String, valor?: any){
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }
    public getTipo(): DataType{
        return this.tipo;
    }
    public setTipo(value: DataType){
        this.tipo = value;
    }
    public getIdentificador(): String{
        return this.identificador;
    }
    public setIdentificador(value: String){
        this.identificador = value;
    }
    public getValor(): any{
        return this.valor;
    }
    public setValor(value: any){
        this.valor = value;
    }
}