"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Symbol_1 = __importDefault(require("./Symbol"));
const Data_1 = require("../Data/Data");
const Error_1 = __importDefault(require("../Exceptions/Error"));
class SymbolTable {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.tablaFunciones = new Map();
    }
    getValor(id) {
        let Valor = this.tablaActual.get(id.toLowerCase());
        if (!Valor) {
            let actual = this.getAnterior();
            while (actual && !Valor) {
                Valor = actual.getValor(id);
                actual = actual.getAnterior();
            }
        }
        return Valor;
    }
    setValor(id, valor, declaration = true) {
        if (declaration)
            this.tablaActual.set(id, valor);
        else {
            let actual = this;
            let oldValue = null;
            while (actual) {
                if (actual.getTabla().get(id)) {
                    oldValue = actual.getTabla().get(id);
                    actual.getTabla().delete(id);
                    actual.getTabla().set(id, valor);
                    break;
                }
                actual = actual.getAnterior();
            }
            if (!oldValue)
                console.log('ERROR LA VARIABLE NO EXISTE');
        }
        return null;
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(Tabla) {
        this.tablaActual = Tabla;
    }
    saveSymbol(nombreid, value, tipo, linea, columna) {
        console.log("Valor: " + value);
        nombreid = nombreid.toLowerCase();
        if (!this.tablaActual.has(nombreid) == true) {
            this.tablaActual.set(nombreid, new Symbol_1.default(tipo, nombreid, "Variable", value));
            return true;
        }
        else {
            return false;
        }
    }
    getVariable(id) {
        let temp = this;
        while (temp != null) {
            let sym = temp.tablaActual.get(id.toLowerCase());
            if (sym != null) {
                return sym;
            }
            temp = temp.getAnterior();
        }
        return null;
    }
    getExp(valor, tipo) {
        if (tipo === Data_1.DataType.CADENA) {
            return { value: valor, type: Data_1.DataType.CADENA };
        }
        else if (tipo === Data_1.DataType.ENTERO) {
            return { value: valor, type: Data_1.DataType.ENTERO };
        }
        else if (tipo === Data_1.DataType.DECIMAL) {
            return { value: valor, type: Data_1.DataType.DECIMAL };
        }
        else if (tipo === Data_1.DataType.BOOLEANO) {
            return { value: valor, type: Data_1.DataType.BOOLEANO };
        }
        else if (tipo === Data_1.DataType.CARACTER) {
            return { value: valor, type: Data_1.DataType.CARACTER };
        }
        else {
            return { value: null, type: Data_1.DataType.INDEFINIDO };
        }
    }
    getTipo(nombreid) {
        let temp = this;
        while (temp != null) {
            let sym = temp.tablaActual.get(nombreid.toLowerCase());
            if (sym != null) {
                return sym.getType();
            }
            temp = temp.getAnterior();
        }
    }
    asignar(nombreid, valor) {
        let temp = this;
        while (temp != null) {
            let sym = temp.tablaActual.get(nombreid.toLowerCase());
            if (sym != null) {
                sym.setValor(valor);
            }
            temp = temp.getAnterior();
        }
    }
    saveFuncion(nombreid, met) {
        if (!this.tablaFunciones.has(nombreid.toLowerCase())) {
            this.tablaFunciones.set(nombreid.toLowerCase(), met);
            return true;
        }
    }
    getFuncion(nombreid) {
        let temp = this;
        while (temp != null) {
            if (temp.tablaFunciones.has(nombreid.toLowerCase())) {
                return temp.tablaFunciones.get(nombreid.toLowerCase());
            }
            temp = temp.getAnterior();
        }
        return null;
    }
    validarFuncion(nombreid) {
        let temp = this;
        while (temp != null) {
            let sym = temp.tablaFunciones.get(nombreid.toLowerCase());
            if (sym != null) {
                return false;
            }
            temp = temp.getAnterior();
        }
        return true;
    }
    saveVector(nombreid, value, tipo, linea, columna) {
        console.log(".,v");
        nombreid = nombreid.toLowerCase();
        let tablaLocal = this;
        while (tablaLocal != null) {
            if (tablaLocal.tablaActual.has(nombreid)) {
                throw new Error_1.default(Data_1.tipoErr.SEMANTICO, "El vector ya existe", linea, columna);
            }
            tablaLocal = tablaLocal.getAnterior();
        }
        this.tablaActual.set(nombreid, new Symbol_1.default(tipo, nombreid, "Vector", value));
        console.log("Vector guardado");
    }
}
exports.default = SymbolTable;
