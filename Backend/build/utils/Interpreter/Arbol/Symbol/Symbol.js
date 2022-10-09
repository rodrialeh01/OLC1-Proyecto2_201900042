"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Symbol {
    constructor(tipo, identificador, valor) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(value) {
        this.tipo = value;
    }
    getIdentificador() {
        return this.identificador;
    }
    setIdentificador(value) {
        this.identificador = value;
    }
    getValor() {
        return this.valor;
    }
    setValor(value) {
        this.valor = value;
    }
}
exports.default = Symbol;
