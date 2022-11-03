"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nodo {
    constructor(valor, tipo) {
        this.id = 0;
        this.valor = valor;
        this.tipo = tipo;
        this.hijos = [];
    }
    getValor() {
        return this.valor;
    }
    getTipo() {
        return this.tipo;
    }
    agregarHijo(nodo) {
        this.hijos.push(nodo);
    }
}
exports.default = Nodo;
