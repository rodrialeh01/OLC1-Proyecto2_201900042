"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var id_n = 1;
class GenerarAST {
    constructor() {
        this.cadena = "graph G {\n";
    }
    recorrer_arbol(nodo) {
        if (nodo.id == 0) {
            nodo.id = id_n;
            id_n++;
        }
        this.cadena += nodo.id + " [shape=\"circle\" label=\"" + nodo.valor + "\" ];\n";
        nodo.hijos.forEach(element => {
            this.cadena += nodo.id + " -- " + id_n + ";\n";
            this.recorrer_arbol(element);
        });
    }
}
exports.default = GenerarAST;
