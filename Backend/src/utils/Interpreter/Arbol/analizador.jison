%{
    //codigo js
    const controller = require('../../../controller/parser/parser');
    const Errores = require('./Exceptions/Error');
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Data/Data');
    const impresion = require('./Instructions/imprimir');
    const impresionconsalto = require('./Instructions/ImprimirConSalto');
    const DeclaracionAsignacion = require('./Instructions/DeclaracionAsignacion');
    const Declaracion = require('./Instructions/Declaracion');
    const Asignacion = require('./Instructions/Asignacion');
    const Aritmetica = require('./Expresions/Aritmetica');
    const Unario = require('./Expresions/Unario');
    const Not = require('./Expresions/Not');
    const Relacional = require('./Expresions/Relacional');
    const Logico = require('./Expresions/Logico');
    const insif = require('./Instructions/Sentencia_If');
    const simbolo = require('./Symbol/Symbol');
    const elif = require('./Instructions/Elif');
    const inswhile = require('./Instructions/Ciclo_While');
    const insbreak = require('./Instructions/Break');
    const inswitch = require('./Instructions/Sentencia_Switch');
    const inscase = require('./Instructions/Caso');
    const opternario = require('./Expresions/Operador_Ternario');
    const identificador = require('./Expresions/Identificador');
    const casteo = require('./Expresions/Casteo');
    const increment = require('./Expresions/Incremento');
    const decrement = require('./Expresions/Decremento');
    const insfor = require('./Instructions/Ciclo_For');
    const insdowhile = require('./Instructions/CicloDoWhile');
    const insdountil = require('./Instructions/CicloDoUntil');
    const insreturn = require('./Instructions/Return');
    const inscontinue = require('./Instructions/Continue');
    const funcion = require('./Instructions/Funcion');
    const llamada = require('./Instructions/LlamadaFuncion');
    const decv1f1 = require('./Instructions/DeclaracionVector1D1');
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
"int"                                                                       return 'RINT';
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
.                                                                           {controller.listaErrores.push(new Errores.default(Tipo.tipoErr.LEXICO, "No se esperaba el caracter " + yytext, yylloc.first_line, yylloc.first_column));}

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
              | DECLARACION_VARIABLES                                       {$$=$1;}
              | SENTENCIA_IF                                                {$$=$1;}
              | CICLO_WHILE                                                 {$$=$1;}
              | SENTENCIA_SWITCH                                            {$$=$1;}
              | CICLO_FOR                                                   {$$=$1;}
              | CICLO_DO_WHILE                                              {$$=$1;}
              | CICLO_DO_UNTIL                                              {$$=$1;}
              | RBREAK PTCOMA                                               {$$=new insbreak.default(@1.first_line,@1.first_column);}
              | RCONTINUE PTCOMA                                            {$$=new inscontinue.default(@1.first_line,@1.first_column);}
              | INS_RETURN                                                  {$$=$1;}
              | LLAMADA PTCOMA                                              {$$=$1;}
              | METODO                                                      {$$=$1;}
              | FUNCION                                                     {$$=$1;}
              | error                                                       {controller.listaErrores.push(new Errores.default(Tipo.tipoErr.SINTACTICO, "Se esperaba token " + $1, @1.first_line, @1.first_column));}                                                      
;

LLAMADA : IDENTIFICADOR PARABRE PARCIERRA                             {$$= new llamada.default($1,null,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE LISTA_EXPRESIONES PARCIERRA           {$$= new llamada.default($1,$3,@1.first_line,@1.first_column);}
;

LISTA_EXPRESIONES : LISTA_EXPRESIONES COMA EXPRESION                        {$1.push($3); $$=$1;}
                  | EXPRESION                                               {$$=[$1];}
;

METODO : IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RVOID ENCAPSULAMIENTO   {$$ = new funcion.default($1,$3,Tipo.DataType.VOID,$7,@1.first_line,@1.first_column);}
       | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA ENCAPSULAMIENTO                   {$$ = new funcion.default($1,$3,Tipo.DataType.VOID,$5,@1.first_line,@1.first_column);}
       | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RVOID ENCAPSULAMIENTO                    {$$ = new funcion.default($1,null,Tipo.DataType.VOID,$6,@1.first_line,@1.first_column);}
       | IDENTIFICADOR PARABRE PARCIERRA ENCAPSULAMIENTO                                    {$$ = new funcion.default($1,null,Tipo.DataType.VOID,$4,@1.first_line,@1.first_column);}
;

FUNCION : IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RINT ENCAPSULAMIENTO       {$$ = new funcion.default($1,$3,Tipo.DataType.ENTERO,$7,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RDOUBLE ENCAPSULAMIENTO    {$$ = new funcion.default($1,$3,Tipo.DataType.DECIMAL,$7,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RSTRING ENCAPSULAMIENTO    {$$ = new funcion.default($1,$3,Tipo.DataType.CADENA,$7,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RCHAR ENCAPSULAMIENTO      {$$ = new funcion.default($1,$3,Tipo.DataType.CARACTER,$7,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RBOOLEAN ENCAPSULAMIENTO   {$$ = new funcion.default($1,$3,Tipo.DataType.BOOLEANO,$7,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RINT ENCAPSULAMIENTO                        {$$ = new funcion.default($1,null,Tipo.DataType.ENTERO,$6,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RSTRING ENCAPSULAMIENTO                     {$$ = new funcion.default($1,null,Tipo.DataType.ENTERO,$6,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RCHAR ENCAPSULAMIENTO                       {$$ = new funcion.default($1,null,Tipo.DataType.ENTERO,$6,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RDOUBLE ENCAPSULAMIENTO                     {$$ = new funcion.default($1,null,Tipo.DataType.ENTERO,$6,@1.first_line,@1.first_column);}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RBOOLEAN ENCAPSULAMIENTO                    {$$ = new funcion.default($1,null,Tipo.DataType.ENTERO,$6,@1.first_line,@1.first_column);}
;

LISTA_PARAMETROS : LISTA_PARAMETROS COMA TIPO_DATO IDENTIFICADOR            {$1.push($4 + "," + $3); $$ = $1}
                 | TIPO_DATO IDENTIFICADOR                                  {$$= [$2 + "," + $1];}
;

TIPO_DATO : RINT                                                            {$$=Tipo.DataType.ENTERO;}
          | RSTRING                                                         {$$=Tipo.DataType.CADENA;}
          | RCHAR                                                           {$$=Tipo.DataType.CARACTER;}
          | RDOUBLE                                                         {$$=Tipo.DataType.DECIMAL;}
          | RBOOLEAN                                                        {$$=Tipo.DataType.BOOLEANO;}
;

IMPRIMIR : RPRINT PARABRE EXPRESION PARCIERRA PTCOMA                        {$$=new impresion.default($3,@1.first_line,@1.first_column);}
         | RPRINTLN PARABRE EXPRESION PARCIERRA PTCOMA                      {$$=new impresionconsalto.default($3,@1.first_line,@1.first_column);}
;

DECLARACION_VARIABLES: DECLARACION                                           {$$=$1;}
                     | ASIGNACION                                            {$$=$1;}
                     | DECLARACION_ASIGNACION                                {$$=$1;}
                     | DECLARACION_VECTOR1                                   {$$=$1;}
;


DECLARACION : RINT LISTA_IDENTIFICADORES PTCOMA                             {$$= new Declaracion.default($2,Tipo.DataType.ENTERO, @1.first_line,@1.first_column);}
            | RDOUBLE LISTA_IDENTIFICADORES PTCOMA                          {$$= new Declaracion.default($2,Tipo.DataType.DECIMAL, @1.first_line,@1.first_column);}
            | RCHAR LISTA_IDENTIFICADORES PTCOMA                            {$$= new Declaracion.default($2,Tipo.DataType.CARACTER, @1.first_line,@1.first_column);}
            | RSTRING LISTA_IDENTIFICADORES PTCOMA                          {$$= new Declaracion.default($2,Tipo.DataType.CARACTER, @1.first_line,@1.first_column);}
            | RBOOLEAN LISTA_IDENTIFICADORES PTCOMA                         {$$= new Declaracion.default($2,Tipo.DataType.BOOLEANO, @1.first_line,@1.first_column);}                          
;

ASIGNACION : LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA                                                   {$$= new Asignacion.default($1, $3, @1.first_line, @1.first_column);}
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA                               {;}
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA   {;}
           | IDENTIFICADOR INCREMENTO PTCOMA                                                                {$$ = new increment.default($1,@1.first_line,@1.first_column);}
           | IDENTIFICADOR DECREMENTO PTCOMA                                                                {$$ = new decrement.default($1,@1.first_line,@1.first_column);}
;

DECLARACION_ASIGNACION : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA      {$$=new DeclaracionAsignacion.default($2,Tipo.DataType.ENTERO, $4, @1.first_line, @1.first_column);}
                       | RDOUBLE LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {$$=new DeclaracionAsignacion.default($2,Tipo.DataType.DECIMAL, $4, @1.first_line, @1.first_column);}
                       | RSTRING LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {$$=new DeclaracionAsignacion.default($2,Tipo.DataType.CADENA, $4, @1.first_line, @1.first_column);}
                       | RCHAR LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA     {$$=new DeclaracionAsignacion.default($2,Tipo.DataType.CARACTER, $4, @1.first_line, @1.first_column);}
                       | RBOOLEAN LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA  {$$=new DeclaracionAsignacion.default($2,Tipo.DataType.BOOLEANO, $4, @1.first_line, @1.first_column);}
;

DECLARACION_VECTOR1 : RINT CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RINT CORABRE EXPRESION CORCIERRA PTCOMA           {$$=new decv1f1.default($4,Tipo.DataType.ENTERO,$9,@1.first_line,@1.first_column);}
                    | RDOUBLE CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA PTCOMA    {$$=new decv1f1.default($4,Tipo.DataType.DECIMAL,$9,@1.first_line,@1.first_column);}
                    | RSTRING CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RSTRING RCORABRE EXPRESION CORCIERRA PTCOMA    {$$=new decv1f1.default($4,Tipo.DataType.CADENA,$9,@1.first_line,@1.first_column);}
                    | RCHAR CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RCHAR RCORABRE EXPRESION CORCIERRA PTCOMA        {$$=new decv1f1.default($4,Tipo.DataType.CARACTER,$9,@1.first_line,@1.first_column);}
                    | RBOOLEAN CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RBOOLEAN RCORABRE EXPRESION CORCIERRA PTCOMA  {$$=new decv1f1.default($4,Tipo.DataType.BOOLEANO,$9,@1.first_line,@1.first_column);}
;

ENCAPSULAMIENTO : LLAVEA INSTRUCCIONES LLAVEC                               {$$=$2;}
                | LLAVEA LLAVEC                                             {$$=[];}
;

LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR            {$1.push($3); $$=$1;}
                      | IDENTIFICADOR                                       {$$=[$1];}
;

SENTENCIA_IF : RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO                                  {$$=new insif.default($3,$5,null,null,@1.first_line,@1.first_column);}
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO RELSE ENCAPSULAMIENTO            {$$=new insif.default($3,$5,null,$7,@1.first_line,@1.first_column);}
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_ELIF                       {$$=new insif.default($3,$5,$6,null,@1.first_line,@1.first_column);}
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_ELIF RELSE ENCAPSULAMIENTO {$$=new insif.default($3,$5,$6,$8,@1.first_line,@1.first_column);}
;

LISTA_ELIF : LISTA_ELIF RELIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO   {$1.push(new elif.default($4,$6,@1.first_line,@1.first_column)); $$=$1}
           | RELIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO              {$$=[new elif.default($3,$5,@1.first_line,@1.first_column)];}
;

INS_RETURN : RRETURN PTCOMA                                                 {$$=new insreturn.default(null,@1.first_line,@1.first_column);}
           | RRETURN EXPRESION PTCOMA                                       {$$=new insreturn.default($2,@1.first_line,@1.first_column);}
;

SENTENCIA_SWITCH : RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA LISTA_CASES LLAVEC                                    {$$=new inswitch.default($3,$6,null,@1.first_line,@1.first_column);}
                 | RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA LISTA_CASES RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVEC    {$$= new inswitch.default($3,$6,$9,@1.first_line,@1.first_column);}
                 | RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVEC                {$$= new inswitch.default($3,null,$8,@1.first_line,@1.first_column);}
;

LISTA_CASES : LISTA_CASES RCASE EXPRESION DOSPUNTOS INSTRUCCIONES            {$1.push(new inscase.default($3,$5,@1.first_line,@1.first_column)); $$=$1;}
            | RCASE EXPRESION DOSPUNTOS INSTRUCCIONES                        {$$=[new inscase.default($2,$4,@1.first_line,@1.first_column)];}
;

CICLO_WHILE : RWHILE PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO            {$$ = new inswhile.default($3,$5,@1.first_line,@1.first_column);}
;

CICLO_FOR : RFOR PARABRE DECLARACION_ASIG_FOR PTCOMA EXPRESION PTCOMA ACTUALIZACION_FOR PARCIERRA ENCAPSULAMIENTO {$$= new insfor.default($3,$5,$7,$9,@1.first_line,@1.first_column);}
;

CICLO_DO_WHILE : RDO ENCAPSULAMIENTO RWHILE PARABRE EXPRESION PARCIERRA PTCOMA  {$$= new insdowhile.default($5,$2,@1.first_line,@1.first_column);}
;

CICLO_DO_UNTIL : RDO ENCAPSULAMIENTO RUNTIL PARABRE EXPRESION PARCIERRA PTCOMA  {$$= new insdountil.default($5,$2,@1.first_line,@1.first_column);}
;

DECLARACION_ASIG_FOR : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION           {$$=new DeclaracionAsignacion.default($2,Tipo.DataType.ENTERO, $4, @1.first_line, @1.first_column);}
                    | IDENTIFICADOR IGUAL EXPRESION                         {$$= new Asignacion.default($1, $3, @1.first_line, @1.first_column);}
;

ACTUALIZACION_FOR : LISTA_IDENTIFICADORES IGUAL EXPRESION                   {$$= new Asignacion.default($1, $3, @1.first_line, @1.first_column);}
                  | IDENTIFICADOR INCREMENTO                                {$$ = new increment.default($1,@1.first_line,@1.first_column);}
                  | IDENTIFICADOR DECREMENTO                                {$$ = new decrement.default($1,@1.first_line,@1.first_column);}
;

EXPRESION : ENTERO                                                          {$$ = new nativo.default(Tipo.DataType.ENTERO,$1, @1.first_line, @1.first_column);}
          | CADENA                                                          {$$ = new nativo.default(Tipo.DataType.CADENA,$1, @1.first_line, @1.first_column);}
          | CARACTER                                                        {$$ = new nativo.default(Tipo.DataType.CARACTER,$1, @1.first_line, @1.first_column);}
          | DECIMAL                                                         {$$ = new nativo.default(Tipo.DataType.DECIMAL,$1, @1.first_line, @1.first_column);}
          | IDENTIFICADOR                                                   {$$ = new identificador.default($1, @1.first_line, @1.first_column);}
          | RTRUE                                                           {$$ = new nativo.default(Tipo.DataType.BOOLEANO,$1, @1.first_line, @1.first_column);}
          | RFALSE                                                          {$$ = new nativo.default(Tipo.DataType.BOOLEANO,$1, @1.first_line, @1.first_column);}
          | EXPRESION MAS EXPRESION                                         {$$ = new Aritmetica.default(Tipo.tipoOp.SUMA,$1,$3,@1.first_line, @1.first_column);}
          | EXPRESION MENOS EXPRESION                                       {$$ = new Aritmetica.default(Tipo.tipoOp.RESTA,$1,$3,@1.first_line, @1.first_column);}
          | EXPRESION MULTIPLICACION EXPRESION                              {$$ = new Aritmetica.default(Tipo.tipoOp.MULTIPLICACION,$1,$3,@1.first_line, @1.first_column);}
          | EXPRESION DIVISION EXPRESION                                    {$$ = new Aritmetica.default(Tipo.tipoOp.DIVISION,$1,$3,@1.first_line, @1.first_column);}
          | EXPRESION MODULO EXPRESION                                      {$$ = new Aritmetica.default(Tipo.tipoOp.MODULO,$1,$3,@1.first_line, @1.first_column);}
          | EXPRESION POTENCIA EXPRESION                                    {$$ = new Aritmetica.default(Tipo.tipoOp.POTENCIA,$1,$3,@1.first_line, @1.first_column);}
          | MENOS EXPRESION %prec NEGATIVO                                  {$$ = new Unario.default($2,@1.first_line, @1.first_column);}
          | PARABRE EXPRESION PARCIERRA                                     {$$ = $2;}
          | EXPRESION OR EXPRESION                                          {$$ = new Logico.default(Tipo.tipoLog.OR, $1, $3, @1.first_line, @1.first_column);}
          | EXPRESION AND EXPRESION                                         {$$ = new Logico.default(Tipo.tipoLog.AND, $1, $3, @1.first_line, @1.first_column);}
          | NOT EXPRESION                                                   {$$ = new Not.default($2,@1.first_line, @1.first_column);}
          | EXPRESION IGUALIGUAL EXPRESION                                  {$$ = new Relacional.default(Tipo.tipoRel.IGUAL, $1, $3, @1.first_line, @1.first_column);}
          | EXPRESION DIFERENTE EXPRESION                                   {$$ = new Relacional.default(Tipo.tipoRel.DIFERENTE, $1, $3, @1.first_line, @1.first_column);}
          | EXPRESION MENOR EXPRESION                                       {$$ = new Relacional.default(Tipo.tipoRel.MENOR, $1, $3, @1.first_line, @1.first_column);}
          | EXPRESION MAYOR EXPRESION                                       {$$ = new Relacional.default(Tipo.tipoRel.MAYOR, $1, $3, @1.first_line, @1.first_column);}
          | EXPRESION MENOROIGUAL EXPRESION                                 {$$ = new Relacional.default(Tipo.tipoRel.MENOR_IGUAL, $1, $3, @1.first_line, @1.first_column);}
          | EXPRESION MAYOROIGUAL EXPRESION                                 {$$ = new Relacional.default(Tipo.tipoRel.MAYOR_IGUAL, $1, $3, @1.first_line, @1.first_column);}
          | IDENTIFICADOR INCREMENTO                                        {$$ = new increment.default($1,@1.first_line,@1.first_column);}
          | IDENTIFICADOR DECREMENTO                                        {$$ = new decrement.default($1,@1.first_line,@1.first_column);}
          | LLAMADA                                                         {$$=$1;}
          | OPERADOR_TERNARIO                                               {$$=$1;}
          | CASTEOS                                                         {$$=$1;}
          | ACCESO_VECTORES                                                 {;}
          | FUNCIONES_NATIVAS                                               {;}
;

OPERADOR_TERNARIO : EXPRESION INTERROGACION EXPRESION DOSPUNTOS EXPRESION   {$$ = new opternario.default($1,$3,$5,@1.first_line,@1.first_column);}
;

CASTEOS : PARABRE RINT PARCIERRA EXPRESION                                  {$$= new casteo.default(Tipo.DataType.ENTERO,$4,@1.first_line,@1.first_column);}
        | PARABRE RSTRING PARCIERRA EXPRESION                               {$$= new casteo.default(Tipo.DataType.CADENA,$4,@1.first_line,@1.first_column);}
        | PARABRE RCHAR PARCIERRA EXPRESION                                 {$$= new casteo.default(Tipo.DataType.CARACTER,$4,@1.first_line,@1.first_column);}
        | PARABRE RBOOLEAN PARCIERRA EXPRESION                              {$$= new casteo.default(Tipo.DataType.BOOLEANO,$4,@1.first_line,@1.first_column);}
        | PARABRE RDOUBLE PARCIERRA EXPRESION                               {$$= new casteo.default(Tipo.DataType.DECIMAL,$4,@1.first_line,@1.first_column);}
;