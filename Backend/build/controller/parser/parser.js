"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.listaErrores = void 0;
const Three_1 = __importDefault(require("../../utils/Interpreter/Arbol/Symbol/Three"));
const SymbolTable_1 = __importDefault(require("../../utils/Interpreter/Arbol/Symbol/SymbolTable"));
const Error_1 = __importDefault(require("../../utils/Interpreter/Arbol/Exceptions/Error"));
const GenerarAST_1 = __importDefault(require("../../utils/Interpreter/Arbol/GenerarAST"));
const Funcion_1 = __importDefault(require("../../utils/Interpreter/Arbol/Instructions/Funcion"));
const Declaracion_1 = __importDefault(require("../../utils/Interpreter/Arbol/Instructions/Declaracion"));
const Asignacion_1 = __importDefault(require("../../utils/Interpreter/Arbol/Instructions/Asignacion"));
const DeclaracionAsignacion_1 = __importDefault(require("../../utils/Interpreter/Arbol/Instructions/DeclaracionAsignacion"));
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
            try {
                if (i instanceof Funcion_1.default) {
                    i.interpretar(ast, tabla);
                }
                else if (i instanceof Declaracion_1.default || i instanceof DeclaracionAsignacion_1.default || i instanceof Asignacion_1.default) {
                    i.interpretar(ast, tabla);
                }
            }
            catch (error) {
                if (error instanceof Error_1.default) {
                    exports.listaErrores.push(error);
                }
                else {
                    console.log(error);
                }
            }
        }
        console.log("errores: " + exports.listaErrores.length);
        for (let er of exports.listaErrores) {
            console.log(er);
        }
        res.json({ consola: ast.getconsola(), errores: exports.listaErrores, simbolos: [] });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.parse = parse;
