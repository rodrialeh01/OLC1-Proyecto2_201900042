"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Symbol {
    constructor(type, identificador, tipo, valor) {
        this.type = type;
        this.identificador = identificador;
        this.valor = valor;
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(value) {
        this.tipo = value;
    }
    getType() {
        return this.type;
    }
    setType(value) {
        this.type = value;
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
