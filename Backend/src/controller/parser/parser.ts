import { Response, Request } from "express";
import Errores from '../../utils/Interpreter/Arbol/Exceptions/Error';
import { tipoErr } from "../../utils/Interpreter/Arbol/Data/Data";
import Three from '../../utils/Interpreter/Arbol/Symbol/Three';
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable";
import { Instruccion } from '../../utils/Interpreter/Arbol/Abstract/Instruccion';
import Error from '../../utils/Interpreter/Arbol/Exceptions/Error';
import GenerarAST from "../../utils/Interpreter/Arbol/GenerarAST";

export let listaErrores: Array<Errores> = []

const fs = require('fs')

export const parse = (req: Request, res: Response): void => {
    listaErrores = new Array<Errores>();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    let parserast = require('../../utils/Interpreter/Arbol/AST');
    const { peticion } = req.body;

    try{
        let ast = new Three(parser.parse(peticion));
        var tabla = new SymbolTable();
        var raiz = new GenerarAST();
        raiz.recorrer_arbol(parserast.parse(peticion));
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        ast.settablaGlobal(tabla);
        for(let i of ast.getinstrucciones()){
            if(i instanceof Errores){
                listaErrores.push(i);
                ast.actualizaConsola((<Errores>i).returnError());
            }
            var resultador = i.interpretar(ast, tabla);
            if(resultador instanceof Errores){
                listaErrores.push(resultador);
                ast.actualizaConsola((<Errores>resultador).returnError());
            }
        }
        res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: [] })
    }catch(err){
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] })
    }
}