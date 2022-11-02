"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const SymbolTable_1 = __importDefault(require("../Symbol/SymbolTable"));
const Data_1 = require("../Data/Data");
const Break_1 = __importDefault(require("./Break"));
const Error_1 = __importDefault(require("../Exceptions/Error"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Switch extends Instruccion_1.Instruccion {
    constructor(condicion, listacasos, listainsdefault, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.listacasos = listacasos;
        this.listainsdefault = listainsdefault;
    }
    interpretar(arbol, tabla) {
        let tablalocal = new SymbolTable_1.default(tabla);
        let entrar = false;
        let breakint = false;
        for (let caso of this.listacasos) {
            if (this.condicion.interpretar(arbol, tabla).type == caso.condicion.interpretar(arbol, tabla).type) {
                let condswitch = this.condicion.interpretar(arbol, tabla).value;
                let condcaso = caso.condicion.interpretar(arbol, tabla).value;
                if (condswitch == condcaso || entrar) {
                    entrar = true;
                    let ejecutar = caso.interpretar(arbol, tablalocal);
                    if (ejecutar instanceof Break_1.default) {
                        breakint = true;
                        return ejecutar;
                    }
                }
            }
            else {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "La condicion no concuerda con el tipo del dato del caso", this.linea, this.columna);
            }
        }
        //DEFAULT
        if (!breakint) {
            if (this.listainsdefault != null) {
                for (let i of this.listainsdefault) {
                    let instrucciones1 = i.interpretar(arbol, tablalocal);
                    if (instrucciones1 instanceof Break_1.default) {
                        return instrucciones1;
                    }
                }
            }
        }
    }
}
exports.default = Switch;
