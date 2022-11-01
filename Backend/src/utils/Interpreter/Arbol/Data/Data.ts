export enum DataType{
    ENTERO,
    CADENA,
    DECIMAL,
    CARACTER,
    BOOLEANO,
    IDENTIFICADOR,
    INDEFINIDO
}

export enum tipoOp{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}

export enum tipoLog{
    AND,
    OR
}

export enum tipoRel{
    MAYOR,
    MENOR,
    MAYOR_IGUAL,
    MENOR_IGUAL,
    IGUAL,
    DIFERENTE
}

export enum tipoErr{
    LEXICO,
    SINTACTICO,
    SEMANTICO
}

export function obtenercaracteres(car: string): string{
    switch(car){
        case "\\n":{
            return "\n"
        }
        case "\\\\":{
            return "\\"
        }
        case "\\t":{
            return "\t"
        }
        case "\\r":{
            return "\r"
        }
        case "\\'":{
            return "\'"
        }
        case "\\\"":{
            return "\""
        }
        default:
        {
            return car
        }
    }
}