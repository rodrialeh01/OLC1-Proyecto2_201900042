"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenercaracteres = exports.tipoErr = exports.tipoRel = exports.tipoLog = exports.tipoOp = exports.DataType = void 0;
var DataType;
(function (DataType) {
    DataType[DataType["ENTERO"] = 0] = "ENTERO";
    DataType[DataType["CADENA"] = 1] = "CADENA";
    DataType[DataType["DECIMAL"] = 2] = "DECIMAL";
    DataType[DataType["CARACTER"] = 3] = "CARACTER";
    DataType[DataType["BOOLEANO"] = 4] = "BOOLEANO";
    DataType[DataType["IDENTIFICADOR"] = 5] = "IDENTIFICADOR";
    DataType[DataType["INDEFINIDO"] = 6] = "INDEFINIDO";
})(DataType = exports.DataType || (exports.DataType = {}));
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["SUMA"] = 0] = "SUMA";
    tipoOp[tipoOp["RESTA"] = 1] = "RESTA";
    tipoOp[tipoOp["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    tipoOp[tipoOp["DIVISION"] = 3] = "DIVISION";
    tipoOp[tipoOp["POTENCIA"] = 4] = "POTENCIA";
    tipoOp[tipoOp["MODULO"] = 5] = "MODULO";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
var tipoLog;
(function (tipoLog) {
    tipoLog[tipoLog["AND"] = 0] = "AND";
    tipoLog[tipoLog["OR"] = 1] = "OR";
})(tipoLog = exports.tipoLog || (exports.tipoLog = {}));
var tipoRel;
(function (tipoRel) {
    tipoRel[tipoRel["MAYOR"] = 0] = "MAYOR";
    tipoRel[tipoRel["MENOR"] = 1] = "MENOR";
    tipoRel[tipoRel["MAYOR_IGUAL"] = 2] = "MAYOR_IGUAL";
    tipoRel[tipoRel["MENOR_IGUAL"] = 3] = "MENOR_IGUAL";
    tipoRel[tipoRel["IGUAL"] = 4] = "IGUAL";
    tipoRel[tipoRel["DIFERENTE"] = 5] = "DIFERENTE";
})(tipoRel = exports.tipoRel || (exports.tipoRel = {}));
var tipoErr;
(function (tipoErr) {
    tipoErr[tipoErr["LEXICO"] = 0] = "LEXICO";
    tipoErr[tipoErr["SINTACTICO"] = 1] = "SINTACTICO";
    tipoErr[tipoErr["SEMANTICO"] = 2] = "SEMANTICO";
})(tipoErr = exports.tipoErr || (exports.tipoErr = {}));
function obtenercaracteres(car) {
    switch (car) {
        case "\\n": {
            return "\n";
        }
        case "\\\\": {
            return "\\";
        }
        case "\\t": {
            return "\t";
        }
        case "\\r": {
            return "\r";
        }
        case "\\'": {
            return "\'";
        }
        case "\\\"": {
            return "\"";
        }
        default:
            {
                return car;
            }
    }
}
exports.obtenercaracteres = obtenercaracteres;
