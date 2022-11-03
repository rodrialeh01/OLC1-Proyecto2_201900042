import * as health from './health/ping'
import * as parser from './parser/parser'
import * as arbolast from './AST/Arbol_AST';

export default {
    ...health,
    ...parser,
    ...arbolast
}