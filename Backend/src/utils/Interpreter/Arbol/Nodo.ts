

export default class Nodo{
    valor: String;
    tipo: String;
    hijos:Nodo[];
    id: number;
    constructor(valor:any, tipo:any){
        this.id = 0;
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = [];
    }
    getValor(){
        return this.valor;
    }
    getTipo(){
        return this.tipo;
    }
    agregarHijo(nodo:Nodo){
        this.hijos.push(nodo);
    }
}