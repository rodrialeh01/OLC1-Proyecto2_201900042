import { Response, Request } from "express";
import { tipoErr } from "../../utils/Interpreter/Arbol/Data/Data";
import Three from '../../utils/Interpreter/Arbol/Symbol/Three';
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable";
import { Instruccion } from '../../utils/Interpreter/Arbol/Abstract/Instruccion';
import Error from '../../utils/Interpreter/Arbol/Exceptions/Error';
import GenerarAST from "../../utils/Interpreter/Arbol/GenerarAST";
import Funcion from '../../utils/Interpreter/Arbol/Instructions/Funcion';
import Declaracion from '../../utils/Interpreter/Arbol/Instructions/Declaracion';
import Asignacion from "../../utils/Interpreter/Arbol/Instructions/Asignacion";
import Declaracion_Asignacion from "../../utils/Interpreter/Arbol/Instructions/DeclaracionAsignacion";

export let listaErrores: Array<any> = []

const fs = require('fs')

export const parse = (req: Request, res: Response): void => {
    listaErrores = new Array<Error>();
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
            try{
                if(i instanceof Funcion){
                    i.interpretar(ast, tabla);
                }else if(i instanceof Declaracion || i instanceof Declaracion_Asignacion || i instanceof Asignacion){
                    i.interpretar(ast, tabla);
                }
            }catch(error: any){
                if(error instanceof Error){
                    listaErrores.push(error);
                }else{
                    console.log(error);
                }
            }
        }
        console.log("errores: " + listaErrores.length);
        for(let er of listaErrores){
            console.log(er);
        }
        res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: [] })
    }catch(err){
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] })
    }
}