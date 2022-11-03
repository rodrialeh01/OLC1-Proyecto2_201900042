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
exports.listaErrores = [];
const fs = require('fs');
const parse = (req, res) => {
    exports.listaErrores = new Array();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    let parserast = require('../../utils/Interpreter/Arbol/AST');
    const { peticion } = req.body;
    let salidaconsola = "";
    try {
        const returnThree = parser.parse(peticion);
        let ast = new Three_1.default(returnThree);
        var tabla = new SymbolTable_1.default();
        var raiz = new GenerarAST_1.default();
        raiz.recorrer_arbol(parserast.parse(peticion));
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        ast.settablaGlobal(tabla);
        for (let i of ast.getinstrucciones()) {
            try {
                let interp = i.interpretar(ast, tabla);
                if (interp instanceof Error_1.default) {
                    salidaconsola += interp.returnError();
                    exports.listaErrores.push(interp);
                }
            }
            catch (inter) {
                for (let x = 0; x < exports.listaErrores.length; x++) {
                    salidaconsola += exports.listaErrores[x].returnError();
                }
            }
        }
        salidaconsola += ast.getconsola();
    }
    catch (err) {
        for (let x = 0; x < exports.listaErrores.length; x++) {
            salidaconsola += exports.listaErrores[x].returnError();
        }
    }
    res.json({ consola: salidaconsola, errores: exports.listaErrores, simbolos: [] });
};
exports.parse = parse;
