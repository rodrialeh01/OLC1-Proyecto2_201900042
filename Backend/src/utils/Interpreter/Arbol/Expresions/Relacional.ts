import { Instruccion } from "../Abstract/Instruccion";
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import { DataType, tipoRel, tipoErr } from "../Data/Data";
import Error from "../Exceptions/Error";
import get from "lodash/get"

export default class Relacional extends Instruccion {

    constructor(private tipo: tipoRel, private operadorIzq: Instruccion, private operadorDer: Instruccion, fila: number, columna: number){
        super( fila, columna);
    }

    interpretar(arbol: Three, tabla: SymbolTable) {
        if(this.tipo === tipoRel.MAYOR){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) > Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) > Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) > Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) > Number(valorDer.value.charCodeAt(0)))
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }else if(this.tipo === tipoRel.MENOR){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            console.log(valorIzq);
            console.log(valorDer);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) < Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) < Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) < Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.ENTERO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) < Number(valorDer.value.charCodeAt(0)))
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }else if(this.tipo === tipoRel.MAYOR_IGUAL){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) >= Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) >= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) >= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) >= Number(valorDer.value.charCodeAt(0)))
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }else if(this.tipo === tipoRel.MENOR_IGUAL){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) <= Number(valorDer.value.charCodeAt(0)))
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) <= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) <= Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value.charCodeAt(0)) <= Number(valorDer.value.charCodeAt(0)))
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }else if(this.tipo === tipoRel.IGUAL){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) == Number(valorDer.value))
                }
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.BOOLEANO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (valorIzq.value == valorDer.value)
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                }
            }
            //I-CADENA -- D-ANY
            else if (valorIzq.type === DataType.CADENA && valorDer.type===DataType.CARACTER) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                }
            }else if (valorIzq.type === DataType.CADENA && valorDer.type===DataType.CADENA) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) == String(valorDer.value))
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }else if(this.tipo === tipoRel.DIFERENTE){
            let valorIzq = this.operadorIzq.interpretar(arbol, tabla);
            let valorDer = this.operadorDer.interpretar(arbol,tabla);
            if (valorIzq.type===DataType.ENTERO&& valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.ENTERO && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                }
            }
            //I-DECIMAL -- D-ANY
            else if (valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.ENTERO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                }
            }else if(valorIzq.type === DataType.DECIMAL && valorDer.type===DataType.DECIMAL){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (Number(valorIzq.value) != Number(valorDer.value))
                }
            }
            //I-BOOLEANO -- D-ANY
            else if (valorIzq.type === DataType.BOOLEANO && valorDer.type===DataType.BOOLEANO) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (valorIzq.value != valorDer.value)
                }
            }
            //I-CARACTER -- D-ANY
            else if (valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CARACTER) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                }
            }else if(valorIzq.type === DataType.CARACTER && valorDer.type===DataType.CADENA){
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                }
            }
            //I-CADENA -- D-ANY
            else if (valorIzq.type === DataType.CADENA && valorDer.type===DataType.CARACTER) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                }
            }else if (valorIzq.type === DataType.CADENA && valorDer.type===DataType.CADENA) {
                return {
                    "type": DataType.BOOLEANO,
                    "value": (String(valorIzq.value) != String(valorDer.value))
                }
            }else{
                //ERROR SEMANTICO
                throw new Error(tipoErr.SEMANTICO,"Los tipos de datos de los valores escritos no se pueden operar", this.linea, this.columna);
            }
        }
    }
}

