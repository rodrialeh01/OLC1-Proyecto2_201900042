%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const impresion = require('./Instructions/imprimir');
    const impresionconsalto = require('./Instructions/ImprimirConSalto')
%}
%lex 


%options case-insensitive 
//---------------------------------------------ANALIZADOR LEXICO--------------------------------------------------
%%
//COMENTARIOS
[/][/].*                                                                  //comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                                       //comentario multilinea

//PALABRAS RESERVADAS
"Int"                                                                       return 'RINT';
"Double"                                                                    return 'RDOUBLE';
"Boolean"                                                                   return 'RBOOLEAN';
"Char"                                                                      return 'RCHAR';
"String"                                                                    return 'RSTRING';
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
//----ARITMETICOS
"+"                                                                         return 'MAS';
"-"                                                                         return 'MENOS';
"*"                                                                         return 'MULTIPLICACION';
"/"                                                                         return 'DIVISION';
"^"                                                                         return 'POTENCIA';
"="                                                                         return 'IGUAL';
//----RELACIONALES
"%"                                                                         return 'MODULO';
">"                                                                         return 'MAYOR';
"<"                                                                         return 'MENOR';
">="                                                                        return 'MAYOROIGUAL';
"<="                                                                        return 'MENOROIGUAL';
"=="                                                                        return 'IGUALIGUAL';
"!="                                                                        return 'DIFERENTE';
//----TERNARIOS
"?"                                                                         return 'INTERROGACION';
":"                                                                         return 'DOSPUNTOS';
//----LOGICOS
"||"                                                                        return 'OR';
"&&"                                                                        return 'AND';
"!"                                                                         return 'NOT';
//----AGRUPACION
"("                                                                         return 'PARABRE';
")"                                                                         return 'PARCIERRA';
//--FINALIZACIÓN Y ENCAPSULAMIENTO Y PARAMETRIZACION
";"                                                                         return 'PTCOMA';
"{"                                                                         return 'LLAVEA';
"}"                                                                         return 'LLAVEC';
","                                                                         return 'COMA';
"."                                                                         return 'PUNTO';
//--INCREMENTO Y DECREMENTO
"++"                                                                        return 'INCREMENTO';
"--"                                                                        return 'DECREMENTO';
//--VECTORES
"["                                                                         return 'CORABRE';
"]"                                                                         return 'CORCIERRA';


//EXPRESIONES REGULARES
[ \r\t]+ { }
\n {}                                                                       //saltos de linea
[\"](((\\\')|(\\\")|(\\n)|(\\t)|(\\))|[^\\\"\n])*[\"]	                    { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+"."[0-9]+\b                                                           return 'DECIMAL';
[0-9]+\b                                                                    return 'ENTERO';
\'(([^\"\'\\\\]{0,1}|\\\'|\\\"|\\n|\\r|\\t|\\\\))\'                         { yytext=yytext.substr(1,yyleng-2); return 'CARACTER'; }
[a-zA-Z][a-zA-Z0-9_]+                                                       return 'IDENTIFICADOR';


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
              | INVALID                                                     {;}
              | error PTCOMA                                                {;}
;

AMBITO_GLOBAL : DECLARACION
              | DECLARACION_ASIGNACION
              | DECLARACION_VECTOR1
              | DECLARACION_VECTOR2
              | ASIGNACION
              | FUNCION 
              | METODO
              | RUN
              | IMPRIMIR                                                    {$$=$1;}                                               
;

DECLARACION : RINT LISTA_IDENTIFICADORES PTCOMA                             {;}
            | RDOUBLE LISTA_IDENTIFICADORES PTCOMA                          {;}
            | RCHAR LISTA_IDENTIFICADORES PTCOMA                            {;}
            | RSTRING LISTA_IDENTIFICADORES PTCOMA                          {;}
            | RBOOLEAN LISTA_IDENTIFICADORES PTCOMA                         {;}
;

LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR            {;}
                      | IDENTIFICADOR                                       {;}
;

ASIGNACION : LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA                                                   {;}
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA                               {;}
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA   {;}
;

DECLARACION_ASIGNACION : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA      {;}
                       | RDOUBLE LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {;}
                       | RSTRING LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {;}
                       | RCHAR LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA     {;}
                       | RBOOLEAN LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA  {;}
;

FUNCION : IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RINT ENCAPSULAMIENTO       {;}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RDOUBLE ENCAPSULAMIENTO    {;}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RSTRING ENCAPSULAMIENTO    {;}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RCHAR ENCAPSULAMIENTO      {;}
        | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RBOOLEAN ENCAPSULAMIENTO   {;}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RINT ENCAPSULAMIENTO                        {;}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RSTRING ENCAPSULAMIENTO                     {;}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RCHAR ENCAPSULAMIENTO                       {;}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RDOUBLE ENCAPSULAMIENTO                     {;}
        | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RBOOLEAN ENCAPSULAMIENTO                    {;}
;

METODO : IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RVOID ENCAPSULAMIENTO   {;}
       | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA ENCAPSULAMIENTO                   {;}
       | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RVOID ENCAPSULAMIENTO                    {;}
       | IDENTIFICADOR PARABRE PARCIERRA ENCAPSULAMIENTO                                    {;}
;

LISTA_PARAMETROS : LISTA_PARAMETROS COMA TIPO_DATO IDENTIFICADOR            {;}
                 | TIPO_DATO IDENTIFICADOR                                  {;}
;

TIPO_DATO : RINT                                                            {;}
          | RSTRING                                                         {;}
          | RCHAR                                                           {;}
          | RDOUBLE                                                         {;}
          | RBOOLEAN                                                        {;}
;

RUN : RRUN LLAMADA PTCOMA                                                   {;}
;

LLAMADA : IDENTIFICADOR PARABRE PARCIERRA                                   {;}
        | IDENTIFICADOR PARABRE LISTA_EXPRESIONES PARCIERRA                 {;}
;

LISTA_EXPRESIONES : LISTA_EXPRESIONES COMA EXPRESION                        {;}
                  | EXPRESION                                               {;}
;

ENCAPSULAMIENTO : LLAVEA AMBITO_LOCAL LLAVEC                                {;}
                | LLAVEA LLAVEC                                             {;}
;

AMBITO_LOCAL : AMBITO_LOCAL ENTORNO_LOCAL                                   {;}
             | ENTORNO_LOCAL                                                {;}
;

ENTORNO_LOCAL : DECLARACION
              | DECLARACION_ASIGNACION
              | ASIGNACION
              | DECLARACION_VECTOR1
              | DECLARACION_VECTOR2
              | SENTENCIA_IF
              | SENTENCIA_SWITCH
              | CICLO_WHILE
              | CICLO_FOR
              | CICLO_DO_WHILE
              | CICLO_DO_UNTIL
              | INSERCION_ELIMINACION_VECTORES
              | RRETURN EXPRESION PTCOMA                                    {;}
              | RRETURN PTCOMA                                              {;}
              | RBREAK PTCOMA                                               {;}
              | RCONTINUE PTCOMA                                            {;}
;

DECLARACION_VECTOR1 : RINT CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RINT CORABRE EXPRESION CORCIERRA PTCOMA           {;}
                    | RINT CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_EXPRESIONES LLAVEC PTCOMA                 {;}
                    | RDOUBLE CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA PTCOMA    {;}
                    | RDOUBLE CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_EXPRESIONES LLAVEC PTCOMA              {;}
                    | RSTRING CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA PTCOMA    {;}
                    | RSTRING CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_EXPRESIONES LLAVEC PTCOMA              {;}
                    | RCHAR CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA PTCOMA      {;}
                    | RCHAR CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_EXPRESIONES LLAVEC PTCOMA                {;}
                    | RCHAR CORABRE CORCIERRA IDENTIFICADOR IGUAL RTOCHARARRAY PARABRE EXPRESION PARCIERRA PTCOMA       {;}
                    | RBOOLEAN CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA PTCOMA   {;}
                    | RBOOLEAN CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_EXPRESIONES LLAVEC PTCOMA             {;}
;

DECLARACION_VECTOR2 : RINT CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RINT CORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA PTCOMA             {;}
                    | RINT CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_VECTORES LLAVEC PTCOMA                                                  {;}
                    | RDOUBLE CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA PTCOMA      {;}
                    | RDOUBLE CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_VECTORES LLAVEC PTCOMA                                               {;}
                    | RSTRING CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA PTCOMA      {;}
                    | RSTRING CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_VECTORES LLAVEC PTCOMA                                               {;}
                    | RCHAR CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA PTCOMA        {;}
                    | RCHAR CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_VECTORES LLAVEC PTCOMA                                                 {;}
                    | RBOOLEAN CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL RNEW RDOUBLE RCORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA PTCOMA     {;}
                    | RBOOLEAN CORABRE CORCIERRA CORABRE CORCIERRA IDENTIFICADOR IGUAL LLAVEA LISTA_VECTORES LLAVEC PTCOMA                                              {;}
;

LISTA_VECTORES : LISTA_VECTORES COMA LLAVEA LISTA_EXPRESIONES LLAVEC        {;}
               | LLAVEA LISTA_EXPRESIONES LLAVEC                            {;}
;

ACCESO_VECTORES : IDENTIFICADOR CORABRE EXPRESION CORCIERRA                             {;}
                | IDENTIFICADOR CORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA {;}
;

EXPRESION : ENTERO                                                          {$$ = new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
          | CADENA                                                          {$$ = new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
          | CARACTER                                                        {$$ = new nativo.default(new Tipo.default(Tipo.DataType.CARACTER),$1, @1.first_line, @1.first_column);}
          | DECIMAL                                                         {$$ = new nativo.default(new Tipo.default(Tipo.DataType.DECIMAL),$1, @1.first_line, @1.first_column);}
          | IDENTIFICADOR                                                   {;}
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

OPERADOR_TERNARIO : EXPRESION INTERROGACION EXPRESION DOSPUNTOS EXPRESION   {;}
;

CASTEOS : PARABRE RINT PARCIERRA EXPRESION                                  {;}
        | PARABRE RSTRING PARCIERRA EXPRESION                               {;}
        | PARABRE RCHAR PARCIERRA EXPRESION                                 {;}
        | PARABRE RBOOLEAN PARCIERRA EXPRESION                              {;}
        | PARABRE RDOUBLE PARCIERRA EXPRESION                               {;}
;

FUNCIONES_NATIVAS : RTOLOWER PARABRE EXPRESION PARCIERRA                     {;}
                  | RTOUPPER PARABRE EXPRESION PARCIERRA                     {;}
                  | RROUND PARABRE EXPRESION PARCIERRA                      {;}
                  | RLENGTH PARABRE EXPRESION PARCIERRA                     {;}
                  | RTYPEOF PARABRE EXPRESION PARCIERRA                     {;}
                  | RTOSTRING PARABRE EXPRESION PARCIERRA                   {;}
;

SENTENCIA_IF : RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO                                  {;}
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO RELSE ENCAPSULAMIENTO            {;}
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_ELIF                       {;}
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_ELIF RELSE ENCAPSULAMIENTO {;}
;

LISTA_ELIF : LISTA_ELIF RELIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO   {;}
           | RELIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO              {;}
;

SENTENCIA_SWITCH : RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA LISTA_CASES LLAVEC                                    {;}
                 | RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA LISTA_CASES RDEFAULT DOSPUNTOS AMBITO_LOCAL LLAVEC    {;}
                 | RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA RDEFAULT DOSPUNTOS AMBITO_LOCAL LLAVEC                {;}
;

LISTA_CASES : LISTA_CASES RCASE EXPRESION DOSPUNTOS AMBITO_LOCAL            {;}
            | RCASE EXPRESION DOSPUNTOS AMBITO_LOCAL                        {;}
;

CICLO_WHILE : RWHILE PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO            {;}
;

CICLO_FOR : RFOR PARABRE DECLARACION_ASIGNACION_FOR PTCOMA EXPRESION ACTUALIZACION_FOR ENCAPSULAMIENTO {;}
;

DECLARACION_ASIGNACION_FOR : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION     {;}
                           | IDENTIFICADOR IGUAL EXPRESION                  {;}
;

ACTUALIZACION_FOR : IDENTIFICADOR INCREMENTO                                {;}
                  | IDENTIFICADOR DECREMENTO                                {;}
                  | IDENTIFICADOR IGUAL EXPRESION                           {;}
;

CICLO_DO_WHILE : RDO ENCAPSULAMIENTO RWHILE PARABRE EXPRESION PARCIERRA PTCOMA  {;}
;

CICLO_DO_UNTIL : RDO ENCAPSULAMIENTO RUNTIL PARABRE EXPRESION PARCIERRA PTCOMA  {;}
;

IMPRIMIR : RPRINT PARABRE EXPRESION PARCIERRA PTCOMA                        {$$=new impresion.default($3,@1.first_line,@1.first_column);}
         | RPRINTLN PARABRE EXPRESION PARCIERRA PTCOMA                      {$$=new impresionconsalto.default($3,@1.first_line,@1.first_column);}
;

INSERCION_ELIMINACION_VECTORES : IDENTIFICADOR PUNTO RPUSH PARABRE EXPRESION PARCIERRA PTCOMA   {;}
                               | IDENTIFICADOR PUNTO RPOP PARABRE PARCIERRA PTCOMA              {;}
;