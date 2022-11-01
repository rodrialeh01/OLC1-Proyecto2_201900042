"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("../Data/Data");
class Error {
    constructor(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getColumna() {
        return this.columna;
    }
    getFila() {
        return this.fila;
    }
    returnError() {
        if (this.getTipoError() === Data_1.tipoErr.LEXICO) {
            return ('Se obtuvo: ERROR LEXICO' +
                ' desc: {' + this.desc +
                '} en la fila: ' + this.fila +
                ' en la columna: ' + this.columna + '\n');
        }
        else if (this.getTipoError() === Data_1.tipoErr.SINTACTICO) {
            return ('Se obtuvo: ERROR SINTACTICO' +
                ' desc: {' + this.desc +
                '} en la fila: ' + this.fila +
                ' en la columna: ' + this.columna + '\n');
        }
        else if (this.getTipoError() === Data_1.tipoErr.SEMANTICO) {
            return ('Se obtuvo: ERROR SEMANTICO' +
                ' desc: {' + this.desc +
                '} en la fila: ' + this.fila +
                ' en la columna: ' + this.columna + '\n');
        }
        else {
            return '';
        }
    }
}
exports.default = Error;
