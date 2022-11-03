"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbolast = exports.listaErrores = void 0;
const GenerarAST_1 = __importDefault(require("../../utils/Interpreter/Arbol/GenerarAST"));
exports.listaErrores = [];
const fs = require('fs');
const arbolast = (req, res) => {
    let parserast = require('../../utils/Interpreter/Arbol/AST');
    const { peticion } = req.body;
    try {
        var raiz = new GenerarAST_1.default();
        raiz.recorrer_arbol(parserast.parse(peticion));
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        res.json({ grafo: arbol });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.arbolast = arbolast;
