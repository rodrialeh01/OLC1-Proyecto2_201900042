%{
    //codigo js
    const controller = require('../../../controller/parser/parser')
    const errores = require('./Exceptions/Error')
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const impresion = require('./Instructions/imprimir');
    const impresionconsalto = require('./Instructions/ImprimirConSalto');
    const DeclaracionAsignacion = require('./Instructions/DeclaracionAsignacion');
    const Declaracion = require('./Instructions/Declaracion');
    const Asignacion = require('./Instructions/Asignacion');
%}
%lex 


%options case-insensitive 
//---------------------------------------------ANALIZADOR LEXICO--------------------------------------------------
%%
//COMENTARIOS
[/][/].*                                                                  //comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                                       //comentario multilinea

//EXPRESIONES REGULARES                                                               
\s+                                                                         //EXPACIOS EN BLANCO

//PALABRAS RESERVADAS
"int"                                                                       {console.log(yytext);return 'RINT'};
"double"                                                                    return 'RDOUBLE';
"boolean"                                                                   return 'RBOOLEAN';
"char"                                                                      return 'RCHAR';
"string"                                                                    return 'RSTRING';
"True"                                                                      return 'RTRUE';
"False"                                                                     return 'RFALSE';
"if"                                                                        return 'RIF';
"else"                                                                      return 'RELSE';
"elif"                                                                      return 'RELIF';
"switch"                                                                    return 'RSWITCH';
"case"                                                                      return 'RCASE';
"default"                                                                   return 'RDEFAULT';
"break"                                                                     return 'RBREAK';
"while"                                                                     return 'RWHILE';
"for"                                                                       return 'RFOR';
"do"                                                                        return 'RDO';
"until"                                                                     return 'RUNTIL';
"continue"                                                                  return 'RCONTINUE';
"return"                                                                    return 'RRETURN';
"void"                                                                      return 'RVOID';
"Print"                                                                     return 'RPRINT';
"Println"                                                                   return 'RPRINTLN';
"toLower"                                                                   return 'RTOLOWER';
"toUpper"                                                                   return 'RTOUPPER';
"round"                                                                     return 'RROUND';
"length"                                                                    return 'RLENGTH';
"typeof"                                                                    return 'RTYPEOF';
"toString"                                                                  return 'RTOSTRING';
"toCharArray"                                                               return 'RTOCHARARRAY';
"push"                                                                      return 'RPUSH';
"pop"                                                                       return 'RPOP';
"run"                                                                       return 'RRUN';
"new"                                                                       return 'RNEW';

//CARACTERES
//--OPERADORES
//--INCREMENTO Y DECREMENTO
"++"                                                                        return 'INCREMENTO';
"--"                                                                        return 'DECREMENTO';
//----RELACIONALES
"%"                                                                         return 'MODULO';
">="                                                                        return 'MAYOROIGUAL';
"<="                                                                        return 'MENOROIGUAL';
"=="                                                                        return 'IGUALIGUAL';
"!="                                                                        return 'DIFERENTE';
">"                                                                         return 'MAYOR';
"<"                                                                         return 'MENOR';
//----ARITMETICOS
"+"                                                                         return 'MAS';
"-"                                                                         return 'MENOS';
"*"                                                                         return 'MULTIPLICACION';
"/"                                                                         return 'DIVISION';
"^"                                                                         return 'POTENCIA';
"="                                                                         {console.log(yytext);return 'IGUAL';}
//----LOGICOS
"||"                                                                        return 'OR';
"&&"                                                                        return 'AND';
"!"                                                                         return 'NOT';
//----TERNARIOS
"?"                                                                         return 'INTERROGACION';
":"                                                                         return 'DOSPUNTOS';
//----AGRUPACION
"("                                                                         return 'PARABRE';
")"                                                                         return 'PARCIERRA';
//--FINALIZACIÓN Y ENCAPSULAMIENTO Y PARAMETRIZACION
";"                                                                         {console.log(yytext);return 'PTCOMA';}
"{"                                                                         return 'LLAVEA';
"}"                                                                         return 'LLAVEC';
","                                                                         return 'COMA';
"."                                                                         return 'PUNTO';
//--VECTORES
"["                                                                         return 'CORABRE';
"]"                                                                         return 'CORCIERRA';

[\"](((\\\')|(\\\")|(\\n)|(\\t)|(\\))|[^\\\"\n])*[\"]	                    { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+"."[0-9]+\b                                                           {console.log(yytext);return 'DECIMAL';}
[0-9]+\b                                                                    {console.log(yytext);return 'ENTERO';}
\'(([^\"\'\\\\]{0,1}|\\\'|\\\"|\\n|\\r|\\t|\\\\))\'                         { yytext=yytext.substr(1,yyleng-2); return 'CARACTER'; }
([a-zA-Z_$])[a-zA-Z0-9_]*                                                   {console.log(yytext);return 'IDENTIFICADOR';}

<<EOF>>                                                                     return 'EOF';
.                                                                           return 'INVALID';

/lex
//PRECEDENCIA DE OPERADORES
%right INCREMENTO,DECREMENTO
%left INTERROGACION,DOSPUNTOS
%left OR
%left AND
%right NOT
%left IGUALIGUAL,DIFERENTE,MENOR,MENOROIGUAL,MAYOR,MAYOROIGUAL
%left MAS,MENOS
%left DIVISION,MULTIPLICACION, MODULO
%left POTENCIA
%nonassoc PARABRE, PARCIERRA
%right NEGATIVO

%start INIT
//Inicio
//Definicion de gramatica
%%

INIT: INSTRUCCIONES EOF                                                     {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES AMBITO_GLOBAL                                 {$1.push($2); $$=$1;}
              | AMBITO_GLOBAL                                               {$$=[$1];}
;

AMBITO_GLOBAL : IMPRIMIR                                                    {$$=$1;}
              | DECLARACION_ASIGNACION                                      {$$=$1;}
              | DECLARACION                                                 {$$=$1;}
              | ASIGNACION                                                  {$$=$1;}
              | error PTCOMA                                                {;}                                               
;

IMPRIMIR : RPRINT PARABRE EXPRESION PARCIERRA PTCOMA                        {$$=new impresion.default($3,@1.first_line,@1.first_column);}
         | RPRINTLN PARABRE EXPRESION PARCIERRA PTCOMA                      {$$=new impresionconsalto.default($3,@1.first_line,@1.first_column);}
;

DECLARACION : RINT LISTA_IDENTIFICADORES PTCOMA                             {$$= new Declaracion.default($2, new Tipo.default(Tipo.DataType.ENTERO), @1.first_line,@1.first_column);}
            | RDOUBLE LISTA_IDENTIFICADORES PTCOMA                          {$$= new Declaracion.default($2, new Tipo.default(Tipo.DataType.DECIMAL), @1.first_line,@1.first_column);}
            | RCHAR LISTA_IDENTIFICADORES PTCOMA                            {$$= new Declaracion.default($2, new Tipo.default(Tipo.DataType.CADENA), @1.first_line,@1.first_column);}
            | RSTRING LISTA_IDENTIFICADORES PTCOMA                          {$$= new Declaracion.default($2, new Tipo.default(Tipo.DataType.CARACTER), @1.first_line,@1.first_column);}
            | RBOOLEAN LISTA_IDENTIFICADORES PTCOMA                         {$$= new Declaracion.default($2, new Tipo.default(Tipo.DataType.BOOLEANO), @1.first_line,@1.first_column);}
;

ASIGNACION : LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA                                                   {$$= new Asignacion.default($1, $3, @1.first_line, @1.first_column);}
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA                               {;}
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA   {;}
;

DECLARACION_ASIGNACION : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA      {$$=new DeclaracionAsignacion.default($2, new Tipo.default(Tipo.DataType.ENTERO), $4, @1.first_line, @1.first_column);}
                       | RDOUBLE LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {$$=new DeclaracionAsignacion.default($2, new Tipo.default(Tipo.DataType.DECIMAL), $4, @1.first_line, @1.first_column);}
                       | RSTRING LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {$$=new DeclaracionAsignacion.default($2, new Tipo.default(Tipo.DataType.CADENA), $4, @1.first_line, @1.first_column);}
                       | RCHAR LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA     {$$=new DeclaracionAsignacion.default($2, new Tipo.default(Tipo.DataType.CARACTER), $4, @1.first_line, @1.first_column);}
                       | RBOOLEAN LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA  {$$=new DeclaracionAsignacion.default($2, new Tipo.default(Tipo.DataType.BOOLEANO), $4, @1.first_line, @1.first_column);}
;

LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR            {$1.push($3); $$=$1;console.log($$)}
                      | IDENTIFICADOR                                       {$$=[$1];}
;

EXPRESION : ENTERO                                                          {$$ = new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);console.log("a");}
          | CADENA                                                          {$$ = new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
          | CARACTER                                                        {$$ = new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1, @1.first_line, @1.first_column);}
          | DECIMAL                                                         {$$ = new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1, @1.first_line, @1.first_column);}
          | IDENTIFICADOR                                                   {$$ = new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR), $1, @1.first_line, @1.first_column);}
          | RTRUE                                                           {$$ = new nativo.default(new Tipo.default(Tipo.DataType.BOOLEANO),$1, @1.first_line, @1.first_column);}
          | RFALSE                                                          {$$ = new nativo.default(new Tipo.default(Tipo.DataType.BOOLEANO),$1, @1.first_line, @1.first_column);}
          | EXPRESION MAS EXPRESION                                         {;}
          | EXPRESION MENOS EXPRESION                                       {;}
          | EXPRESION MULTIPLICACION EXPRESION                              {;}
          | EXPRESION DIVISION EXPRESION                                    {;}
          | EXPRESION MODULO EXPRESION                                      {;}
          | EXPRESION POTENCIA EXPRESION                                    {;}
          | MENOS EXPRESION %prec NEGATIVO                                  {;}
          | PARABRE EXPRESION PARCIERRA                                     {;}
          | EXPRESION OR EXPRESION                                          {;}
          | EXPRESION AND EXPRESION                                         {;}
          | NOT EXPRESION                                                   {;}
          | EXPRESION IGUALIGUAL EXPRESION                                  {;}
          | EXPRESION DIFERENTE EXPRESION                                   {;}
          | EXPRESION MENOR EXPRESION                                       {;}
          | EXPRESION MAYOR EXPRESION                                       {;}
          | EXPRESION MENOROIGUAL EXPRESION                                 {;}
          | EXPRESION MAYOROIGUAL EXPRESION                                 {;}
          | IDENTIFICADOR INCREMENTO                                        {;}
          | IDENTIFICADOR DECREMENTO                                        {;}
          | LLAMADA                                                         {;}
          | OPERADOR_TERNARIO                                               {;}
          | CASTEOS                                                         {;}
          | ACCESO_VECTORES                                                 {;}
          | FUNCIONES_NATIVAS                                               {;}
;