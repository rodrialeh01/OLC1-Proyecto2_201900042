import { tipoErr } from "../Data/Data";

export default class Error {
    private tipoError: tipoErr;
    private desc: String;
    private fila: number;
    private columna: number;

    public getDesc(): String{
        return this.desc;
    }
    public getTipoError(): tipoErr {
        return this.tipoError;
    }
    public getColumna(): number {
        return this.columna;
    }
    public getFila(): number {
        return this.fila;
    }
    constructor(tipo: tipoErr, desc: String, fila: number, columna: number){
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    public returnError(): String {
        if(this.getTipoError() === tipoErr.LEXICO){
            return (
                '<LEXICAL ERROR>: ' + this.desc + 
                ' en la fila: ' + this.fila + 
                ' en la columna: ' + this.columna + '\n'
            );
        }else if(this.getTipoError() === tipoErr.SINTACTICO){
            return (
                '<SINTAX ERROR>: ' + this.desc + 
                ' en la fila: ' + this.fila + 
                ' en la columna: ' + this.columna + '\n'
            );
        }else if(this.getTipoError() === tipoErr.SEMANTICO){
            return (
                '<SEMANTIC ERROR>: ' + this.desc + 
                ' en la fila: ' + this.fila + 
                ' en la columna: ' + this.columna + '\n'
            );
        }else{
            return '';
        }
    }
}