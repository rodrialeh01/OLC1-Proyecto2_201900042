"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("../Data/Data");
const Instruccion_1 = require("../Abstract/Instruccion");
class Identificador extends Instruccion_1.Instruccion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let id;
        id = tabla.getVariable(this.id);
        if (id != null) {
            let id_var = (_a = tabla.getVariable(this.id)) === null || _a === void 0 ? void 0 : _a.valor;
            let id_tipo = (_b = tabla.getVariable(this.id)) === null || _b === void 0 ? void 0 : _b.type;
            return tabla.getExp(id_var, id_tipo);
        }
        else {
            return tabla.getExp(null, Data_1.DataType.INDEFINIDO);
        }
    }
}
exports.default = Identificador;
