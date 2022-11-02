import { DataType } from "../Data/Data";

export default class Symbol{
    private type: DataType;
    private identificador: String;
    private valor: any;
    private tipo: String;

    constructor(type: DataType, identificador: String, tipo: String, valor?: any){
        this.type = type;
        this.identificador = identificador;
        this.valor = valor;
        this.tipo = tipo;
    }
    public getTipo(): String{
        return this.tipo;
    }
    public setTipo(value: String){
        this.tipo = value;
    }
    public getType(): DataType{
        return this.type;
    }
    public setType(value: DataType){
        this.type = value;
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