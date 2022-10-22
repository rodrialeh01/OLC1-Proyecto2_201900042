import Simbolo from './Symbol';

export default class SymbolTable{
    private tablaAnterior: SymbolTable | any;
    private tablaActual: Map<String, Simbolo>;

    constructor(anterior?: SymbolTable){
        this.tablaAnterior = anterior;
        this.tablaActual = new Map<String, Simbolo>();
    }
    public getValor(id: String): any{
        let Valor= this.tablaActual.get(id);
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
}