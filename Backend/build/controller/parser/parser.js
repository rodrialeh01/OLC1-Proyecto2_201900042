"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.listaErrores = void 0;
const Error_1 = __importDefault(require("../../utils/Interpreter/Arbol/Exceptions/Error"));
const Three_1 = __importDefault(require("../../utils/Interpreter/Arbol/Symbol/Three"));
const SymbolTable_1 = __importDefault(require("../../utils/Interpreter/Arbol/Symbol/SymbolTable"));
const GenerarAST_1 = __importDefault(require("../../utils/Interpreter/Arbol/GenerarAST"));
exports.listaErrores = [];
const fs = require('fs');
const parse = (req, res) => {
    exports.listaErrores = new Array();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    let parserast = require('../../utils/Interpreter/Arbol/AST');
    const { peticion } = req.body;
    try {
        let ast = new Three_1.default(parser.parse(peticion));
        var tabla = new SymbolTable_1.default();
        var raiz = new GenerarAST_1.default();
        raiz.recorrer_arbol(parserast.parse(peticion));
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        ast.settablaGlobal(tabla);
        for (let i of ast.getinstrucciones()) {
            if (i instanceof Error_1.default) {
                exports.listaErrores.push(i);
                ast.actualizaConsola(i.returnError());
            }
            var resultador = i.interpretar(ast, tabla);
            if (resultador instanceof Error_1.default) {
                exports.listaErrores.push(resultador);
                ast.actualizaConsola(resultador.returnError());
            }
        }
        res.json({ consola: ast.getconsola(), errores: exports.listaErrores, simbolos: [] });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.parse = parse;
