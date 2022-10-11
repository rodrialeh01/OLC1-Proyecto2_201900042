"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
class Type {
    constructor(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Type;
var DataType;
(function (DataType) {
    DataType[DataType["ENTERO"] = 0] = "ENTERO";
    DataType[DataType["CADENA"] = 1] = "CADENA";
    DataType[DataType["DECIMAL"] = 2] = "DECIMAL";
    DataType[DataType["CARACTER"] = 3] = "CARACTER";
    DataType[DataType["BOOLEANO"] = 4] = "BOOLEANO";
    DataType[DataType["IDENTIFICADOR"] = 5] = "IDENTIFICADOR";
    DataType[DataType["INDEFINIDO"] = 6] = "INDEFINIDO";
})(DataType = exports.DataType || (exports.DataType = {}));
