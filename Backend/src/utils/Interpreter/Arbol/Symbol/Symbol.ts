import Tipo from './Type';

export default class Symbol{
    private tipo: Tipo;
    private identificador: String;
    private valor: any;

    constructor(tipo: Tipo, identificador: String, valor?: any){
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }
    public getTipo(): Tipo{
        return this.tipo;
    }
    public setTipo(value: Tipo){
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