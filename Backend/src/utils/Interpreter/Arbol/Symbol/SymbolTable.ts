import Simbolo from './Symbol';
import Funcion from '../Instructions/Funcion';
import { DataType, tipoErr } from '../Data/Data';
import Error from '../Exceptions/Error';
import { RetornoVal } from '../Abstract/RetornoVal';

export default class SymbolTable{
    private tablaAnterior: SymbolTable | any;
    private tablaActual: Map<String, Simbolo>;
    private tablaFunciones: Map<String, Funcion>;

    constructor(anterior?: SymbolTable){
        this.tablaAnterior = anterior;
        this.tablaActual = new Map<String, Simbolo>();
        this.tablaFunciones = new Map<String, Funcion>();
    }
    public getValor(id: String): any{
        let Valor= this.tablaActual.get(id.toLowerCase());
        if(!Valor){
            let actual: SymbolTable = this.getAnterior();
            while(actual && ! Valor){
                Valor = actual.getValor(id);
                actual = actual.getAnterior();
            }
        }
        return Valor;
    }

    public setValor(id: String, valor: Simbolo, declaration = true): any{
        if(declaration) this.tablaActual.set(id,valor);
        else{
            let actual : SymbolTable = this
            let oldValue = null
            while(actual){
                if(actual.getTabla().get(id)){
                    oldValue = actual.getTabla().get(id);
                    actual.getTabla().delete(id);
                    actual.getTabla().set(id, valor);
                    break;
                }
                actual = actual.getAnterior();
            }
            if(!oldValue) console.log('ERROR LA VARIABLE NO EXISTE');
        }
        return null;
    }
    public getAnterior(){
        return this.tablaAnterior;
    }

    public setAnterior(anterior: SymbolTable){
        this.tablaAnterior = anterior;
    }

    public getTabla(){
        return this.tablaActual;
    }

    public setTabla(Tabla: Map<String, Simbolo>){
        this.tablaActual = Tabla
    }

    public saveSymbol(nombreid: String, value: any, tipo: DataType, linea: number, columna: number){
        console.log("Valor: " + value);
        
        nombreid = nombreid.toLowerCase();
        if(!this.tablaActual.has(nombreid) == true){
            this.tablaActual.set(nombreid, new Simbolo(tipo,nombreid,"Variable",value));
            return true;
        }else{
            return false;
        }
    }

    public getVariable(id: String): any{
        let temp: SymbolTable = this;
        while(temp!= null){
            let sym = temp.tablaActual.get(id.toLowerCase());
            if(sym != null){
                return sym;
            }
            temp = temp.getAnterior();
        }
        return null;
    }

    public getExp(valor: any, tipo: DataType): RetornoVal{
        if(tipo === DataType.CADENA){
            return {value: valor, type: DataType.CADENA};
        }else if(tipo === DataType.ENTERO){
            return {value: valor, type: DataType.ENTERO};
        }else if(tipo === DataType.DECIMAL){
            return {value: valor, type: DataType.DECIMAL};
        }else if(tipo === DataType.BOOLEANO){
            return {value: valor, type: DataType.BOOLEANO};
        }else if(tipo === DataType.CARACTER){         
            return {value: valor, type: DataType.CARACTER};
        }else{
            return {value: null, type: DataType.INDEFINIDO};
        }
    }

    public getTipo(nombreid: String){
        let temp: SymbolTable = this;
        while(temp!= null){
            let sym = temp.tablaActual.get(nombreid.toLowerCase());
            if(sym != null){
                return sym.getType();
            }
            temp = temp.getAnterior();
        }
    }

    public asignar(nombreid: String, valor:any){
        let temp: SymbolTable = this;
        while(temp!= null){
            let sym = temp.tablaActual.get(nombreid.toLowerCase());
            if(sym != null){
                sym.setValor(valor);
            }
            temp = temp.getAnterior();
        }
    }

    public saveFuncion(nombreid: String,met: Funcion){
        if(!this.tablaFunciones.has(nombreid.toLowerCase())){
            this.tablaFunciones.set(nombreid.toLowerCase(),met);
            return true;
        }
    }

    public getFuncion(nombreid: String){
        let temp: SymbolTable = this;
        while(temp!= null){
            if(temp.tablaFunciones.has(nombreid.toLowerCase())){
                return temp.tablaFunciones.get(nombreid.toLowerCase());
            }
            temp = temp.getAnterior();
        }
        return null;
    }

    public validarFuncion(nombreid: String){
        let temp: SymbolTable = this;
        while(temp!= null){
            let sym = temp.tablaFunciones.get(nombreid.toLowerCase());
            if(sym != null){
                return false;
            }
            temp = temp.getAnterior();
        }
        return true;
    }

    public saveVector(nombreid:String, value:any, tipo: DataType, linea: number, columna: number){
        console.log(".,v");
        nombreid = nombreid.toLowerCase();
        let tablaLocal: SymbolTable|null = this;
        while(tablaLocal != null){
            if(tablaLocal.tablaActual.has(nombreid)){
                return new Error(tipoErr.SEMANTICO, "El vector ya existe", linea, columna);
            }
            tablaLocal = tablaLocal.getAnterior();
        }
        this.tablaActual.set(nombreid, new Simbolo(tipo, nombreid, "Vector", value));
        console.log("Vector guardado");
    }

}