import Nodo from "./Nodo";
var id_n = 1;
export default class GenerarAST{
    cadena:String
    constructor(){
        this.cadena = "graph G {\n";
    }
    recorrer_arbol(nodo: Nodo){
        if(nodo.id == 0){
            nodo.id = id_n;
            id_n++;
        }
        this.cadena+=nodo.id + " [shape=\"circle\" label=\"" + nodo.valor + "\" ];\n";
        nodo.hijos.forEach(element => {
            this.cadena+=nodo.id + " -- " + id_n + ";\n";
            this.recorrer_arbol(element);
        });
    }
}