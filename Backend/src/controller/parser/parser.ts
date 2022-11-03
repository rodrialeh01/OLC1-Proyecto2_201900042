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
    let salidaconsola = "";
    var tabla = new SymbolTable();
    var raiz = new GenerarAST();
    try{
        const returnThree = parser.parse(peticion);
        let ast = new Three(returnThree);
        raiz.recorrer_arbol(parserast.parse(peticion));
        var arbol = raiz.cadena + "}";
        console.log(arbol);
        ast.settablaGlobal(tabla);
        for(let i of ast.getinstrucciones()){
            try{
                let interp = i.interpretar(ast,tabla);
                if(interp instanceof Error){
                    salidaconsola += interp.returnError();
                    listaErrores.push(interp);
                }
            }catch(inter){
                for(let x = 0; x<listaErrores.length; x++){
                    salidaconsola+=listaErrores[x].returnError();
                }
            }
        }
        salidaconsola+= ast.getconsola();
    }catch(err){
        for(let x = 0; x<listaErrores.length; x++){
            salidaconsola+=listaErrores[x].returnError();
        }
    }
    let simbolos = []
    for(let z of tabla.getTabla()){
        simbolos.push(z[1]);
    }
    res.json({ consola: salidaconsola, errores: listaErrores, simbolos: simbolos })
}