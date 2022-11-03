%{
    //codigo js
    const Nodo = require('./Nodo');
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

INIT: INSTRUCCIONES EOF                                                     {$$=new Nodo.default("INICIO","");
                                                                            $$.agregarHijo($1);
                                                                            return $$;
                                                                            }  
;

INSTRUCCIONES : INSTRUCCIONES AMBITO_GLOBAL                                 {$$=new Nodo.default("INSTRUCCIONES","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo($2);
                                                                            }                   
              | AMBITO_GLOBAL                                               {$$=new Nodo.default("INSTRUCCIONES","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | INVALID                                                     {$$=new Nodo.default("INSTRUCCIONES","");
                                                                            $$.agregarHijo(new Nodo.default("ERROR LEXICO",""));
                                                                            }
              | error PTCOMA                                                {$$=new Nodo.default("INSTRUCCIONES","");
                                                                            $$.agregarHijo(new Nodo.default("ERROR SEMANTICO",""));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
;

AMBITO_GLOBAL : IMPRIMIR                                                    {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | DECLARACION_ASIGNACION                                      {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | DECLARACION                                                 {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | ASIGNACION                                                  {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            } 
              | SENTENCIA_IF                                                {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | CICLO_WHILE                                                 {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | SENTENCIA_SWITCH                                            {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | CICLO_FOR                                                   {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | CICLO_DO_WHILE                                              {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | CICLO_DO_UNTIL                                              {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | RBREAK PTCOMA                                               {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo(new Nodo.default("break","BREAK"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
              | RCONTINUE PTCOMA                                            {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo(new Nodo.default("continue","CONTINUE"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
              | INS_RETURN                                                  {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | LLAMADA                                                     {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }
              | METODO                                                      {$$=new Nodo.default("AMBITO LOCAL","");
                                                                            $$.agregarHijo($1);
                                                                            }                                                      
;

LLAMADA : IDENTIFICADOR PARABRE PARCIERRA PTCOMA                            {$$= new Nodo.default("LLAMADA","");
                                                                            $$.agregarHijo(new Nodo.default("IDENTIFICADOR", $1));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
        | IDENTIFICADOR PARABRE LISTA_EXPRESIONES PARCIERRA PTCOMA          {$$= new Nodo.default("LLAMADA","");
                                                                            $$.agregarHijo(new Nodo.default("IDENTIFICADOR", $1));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
;

LISTA_EXPRESIONES : LISTA_EXPRESIONES COMA EXPRESION                        {$$ = new Nodo.default("LISTA_EXPRESIONES", "");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default(",","COMA"));
                                                                            $$.agregarHijo($3);
                                                                            }
                  | EXPRESION                                               {$$ = new Nodo.default("LISTA_EXPRESIONES", "");
                                                                            $$.agregarHijo($1);
                                                                            }
;

METODO : IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA DOSPUNTOS RVOID ENCAPSULAMIENTO   {$$ = new Nodo.default("METODO","");
                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                            $$.agregarHijo($3);
                                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                                            $$.agregarHijo(new Nodo.default("void","RVOID"));
                                                                                            $$.agregarHijo($6);
                                                                                            }
       | IDENTIFICADOR PARABRE LISTA_PARAMETROS PARCIERRA ENCAPSULAMIENTO                   {$$ = new Nodo.default("METODO","");
                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                            $$.agregarHijo($3);
                                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                            $$.agregarHijo($5);
                                                                                            }
       | IDENTIFICADOR PARABRE PARCIERRA DOSPUNTOS RVOID ENCAPSULAMIENTO                    {$$ = new Nodo.default("METODO","");
                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                                            $$.agregarHijo(new Nodo.default("void","RVOID"));
                                                                                            $$.agregarHijo($6);
                                                                                            }
       | IDENTIFICADOR PARABRE PARCIERRA ENCAPSULAMIENTO                                    {$$ = new Nodo.default("METODO","");
                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                            $$.agregarHijo($4);
                                                                                            }
;

LISTA_PARAMETROS : LISTA_PARAMETROS COMA TIPO_DATO IDENTIFICADOR            {$$=new Nodo.default("LISTA_PARAMETROS","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default(",","COMA"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default($4,"IDENTIFICADOR"));
                                                                            }
                 | TIPO_DATO IDENTIFICADOR                                  {$$=new Nodo.default("LISTA_PARAMETROS","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default($2,"IDENTIFICADOR"));
                                                                            }
;

TIPO_DATO : RINT                                                            {$$=new Nodo.default("TIPO_DATO","");
                                                                            $$.agregarHijo(new Nodo.default("int","RINT"));
                                                                            }
          | RSTRING                                                         {$$=new Nodo.default("TIPO_DATO","");
                                                                            $$.agregarHijo(new Nodo.default("string","RSTRING"));
                                                                            }
          | RCHAR                                                           {$$=new Nodo.default("TIPO_DATO","");
                                                                            $$.agregarHijo(new Nodo.default("char","RCHAR"));
                                                                            }
          | RDOUBLE                                                         {$$=new Nodo.default("TIPO_DATO","");
                                                                            $$.agregarHijo(new Nodo.default("double","RDOUBLE"));
                                                                            }
          | RBOOLEAN                                                        {$$=new Nodo.default("TIPO_DATO","");
                                                                            $$.agregarHijo(new Nodo.default("boolean","RBOOLEAN"));
                                                                            }
;

IMPRIMIR : RPRINT PARABRE EXPRESION PARCIERRA PTCOMA                        {$$=new Nodo.default("IMPRIMIR","");
                                                                            $$.agregarHijo(new Nodo.default("print","RPRINT"));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
         | RPRINTLN PARABRE EXPRESION PARCIERRA PTCOMA                      {$$=new Nodo.default("IMPRIMIR","");
                                                                            $$.agregarHijo(new Nodo.default("println","RPRINT"));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
;

DECLARACION : RINT LISTA_IDENTIFICADORES PTCOMA                             {$$=new Nodo.default("DECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("int",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
            | RDOUBLE LISTA_IDENTIFICADORES PTCOMA                          {$$=new Nodo.default("DECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("double",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
            | RCHAR LISTA_IDENTIFICADORES PTCOMA                            {$$=new Nodo.default("DECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("char",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
            | RSTRING LISTA_IDENTIFICADORES PTCOMA                          {$$=new Nodo.default("DECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("string",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
            | RBOOLEAN LISTA_IDENTIFICADORES PTCOMA                         {$$=new Nodo.default("DECLARACION","");
                                                                            $$.agregarHijo(new Nodo.default("boolean",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }
;

ASIGNACION : LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA                                                   {$$=new Nodo.default("ASIGNACION","");
                                                                                                            $$.agregarHijo($1);
                                                                                                            $$.agregarHijo(new Nodo.default("IGUAL","="));
                                                                                                            $$.agregarHijo($3);
                                                                                                            $$.agregarHijo(new Nodo.default("PTCOMA",";"));
                                                                                                            }
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA                               {$$=new Nodo.default("ASIGNACION","");
                                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                                            $$.agregarHijo(new Nodo.default("[","CORABRE"));
                                                                                                            $$.agregarHijo($3);
                                                                                                            $$.agregarHijo(new Nodo.default("]","CORCIERRA"));
                                                                                                            $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                                            $$.agregarHijo($6);
                                                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                                            }
           | IDENTIFICADOR CORABRE EXPRESION CORCIERRA CORABRE EXPRESION CORCIERRA IGUAL EXPRESION PTCOMA   {$$=new Nodo.default("ASIGNACION","");
                                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                                            $$.agregarHijo(new Nodo.default("[","CORABRE"));
                                                                                                            $$.agregarHijo($3);
                                                                                                            $$.agregarHijo(new Nodo.default("]","CORCIERRA"));
                                                                                                            $$.agregarHijo(new Nodo.default("[","CORABRE"));
                                                                                                            $$.agregarHijo($6);
                                                                                                            $$.agregarHijo(new Nodo.default("]","CORCIERRA"));
                                                                                                            $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                                            $$.agregarHijo($9);
                                                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                                            }
           | IDENTIFICADOR INCREMENTO PTCOMA                                                                {$$=new Nodo.default("ASIGNACION","");
                                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                                            $$.agregarHijo(new Nodo.default("++","INCREMENTO"));
                                                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                                            }
           | IDENTIFICADOR DECREMENTO PTCOMA                                                                {$$=new Nodo.default("ASIGNACION","");
                                                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                                                            $$.agregarHijo(new Nodo.default("--","DECREMENTO"));
                                                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                                            }
;

DECLARACION_ASIGNACION : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA      {$$=new Nodo.default("DECLARACION_ASIGNACION","");
                                                                                $$.agregarHijo(new Nodo.default("int","RINT"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                $$.agregarHijo($4);
                                                                                $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                }
                       | RDOUBLE LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {$$=new Nodo.default("DECLARACION_ASIGNACION","");
                                                                                $$.agregarHijo(new Nodo.default("double","RDOUBLE"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                $$.agregarHijo($4);
                                                                                $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                }
                       | RSTRING LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA   {$$=new Nodo.default("DECLARACION_ASIGNACION","");
                                                                                $$.agregarHijo(new Nodo.default("string","RSTRING"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                $$.agregarHijo($4);
                                                                                $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                }
                       | RCHAR LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA     {$$=new Nodo.default("DECLARACION_ASIGNACION","");
                                                                                $$.agregarHijo(new Nodo.default("char","RCHAR"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                $$.agregarHijo($4);
                                                                                $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                }
                       | RBOOLEAN LISTA_IDENTIFICADORES IGUAL EXPRESION PTCOMA  {$$=new Nodo.default("DECLARACION_ASIGNACION","");
                                                                                $$.agregarHijo(new Nodo.default("int","RBOOLEAN"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                                $$.agregarHijo($4);
                                                                                $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                                }
;
ENCAPSULAMIENTO : LLAVEA INSTRUCCIONES LLAVEC                               {$$=new Nodo.default("ENCAPSULAMIENTO", "");
                                                                            $$.agregarHijo(new Nodo.default("{", "LLAVEA"));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default("}", "LLAVEC"));
                                                                            }
                | LLAVEA LLAVEC                                             {$$=new Nodo.default("ENCAPSULAMIENTO", "");
                                                                            $$.agregarHijo(new Nodo.default("{", "LLAVEA"));
                                                                            $$.agregarHijo(new Nodo.default("}", "LLAVEC"));
                                                                            }
;

LISTA_IDENTIFICADORES : LISTA_IDENTIFICADORES COMA IDENTIFICADOR            {$$=new Nodo.default("LISTA_IDENTIFICADORES", "");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default(",", "COMA"));
                                                                            $$.agregarHijo(new Nodo.default($3, "IDENTIFICADOR"));
                                                                            }
                      | IDENTIFICADOR                                       {$$=new Nodo.default("LISTA_IDENTIFICADORES", "");
                                                                            $$.agregarHijo(new Nodo.default($1, "IDENTIFICADOR"));
                                                                            }
;

SENTENCIA_IF : RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO                                  {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                }
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO RELSE ENCAPSULAMIENTO            {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo(new Nodo.default("else","RELSE"));
                                                                                                $$.agregarHijo($7);
                                                                                                }
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_ELIF                       {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo($6);
                                                                                                }
             | RIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO LISTA_ELIF RELSE ENCAPSULAMIENTO {$$ = new Nodo.default("SENTENCIA IF","");
                                                                                                $$.agregarHijo(new Nodo.default("if","IF"));
                                                                                                $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                $$.agregarHijo($3);
                                                                                                $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo($6);
                                                                                                $$.agregarHijo(new Nodo.default("else","RELSE"));
                                                                                                $$.agregarHijo($8);
                                                                                                }
;

LISTA_ELIF : LISTA_ELIF RELIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO   {$$ = new Nodo.default("LISTA ELIF","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("elif","ELIF"));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($4);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo($6);
                                                                            }
           | RELIF PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO              {$$ = new Nodo.default("LISTA ELIF","");
                                                                            $$.agregarHijo(new Nodo.default("elif","ELIF"));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo($5);
                                                                            }
;

INS_RETURN : RRETURN PTCOMA                                                 {$$=new Nodo.default("INS RETURN","");
                                                                            $$.agregarHijo(new Nodo.default("return","RETURN"));
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            }   
           | RRETURN EXPRESION PTCOMA                                       {$$=new Nodo.default("INS RETURN","");
                                                                            $$.agregarHijo(new Nodo.default("return","RETURN"));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(";","PTCOMA"));
                                                                            } 
;

SENTENCIA_SWITCH : RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA LISTA_CASES LLAVEC                                    {$$=new Nodo.default("SENTENCIA SWITCH","");
                                                                                                                    $$.agregarHijo(new Nodo.default("switch","SWITCH"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("{","LLAVEA"));
                                                                                                                    $$.agregarHijo($6);
                                                                                                                    $$.agregarHijo(new Nodo.default("}","LLAVEC"));
                                                                                                                    }
                 | RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA LISTA_CASES RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVEC    {$$=new Nodo.default("SENTENCIA SWITCH","");
                                                                                                                    $$.agregarHijo(new Nodo.default("switch","SWITCH"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("{","LLAVEA"));
                                                                                                                    $$.agregarHijo($6);
                                                                                                                    $$.agregarHijo(new Nodo.default("default","RDEFAULT"));
                                                                                                                    $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                                                                    $$.agregarHijo($9);
                                                                                                                    $$.agregarHijo(new Nodo.default("}","LLAVEC"));
                                                                                                                    }
                 | RSWITCH PARABRE EXPRESION PARCIERRA LLAVEA RDEFAULT DOSPUNTOS INSTRUCCIONES LLAVEC                {$$=new Nodo.default("SENTENCIA SWITCH","");
                                                                                                                    $$.agregarHijo(new Nodo.default("switch","SWITCH"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("{","LLAVEA"));
                                                                                                                    $$.agregarHijo(new Nodo.default("default","RDEFAULT"));
                                                                                                                    $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                                                                    $$.agregarHijo($8);
                                                                                                                    $$.agregarHijo(new Nodo.default("}","LLAVEC"));
                                                                                                                    }
;

LISTA_CASES : LISTA_CASES RCASE EXPRESION DOSPUNTOS INSTRUCCIONES            {$$= new Nodo.default("LISTA_CASES","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("case","RCASE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                            $$.agregarHijo($5);
                                                                            }
            | RCASE EXPRESION DOSPUNTOS INSTRUCCIONES                        {$$= new Nodo.default("LISTA_CASES","");
                                                                            $$.agregarHijo(new Nodo.default("case","RCASE"));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                            $$.agregarHijo($4);
                                                                            }
;

CICLO_WHILE : RWHILE PARABRE EXPRESION PARCIERRA ENCAPSULAMIENTO            {$$ = new Nodo.default("CICLO WHILE","");
                                                                            $$.agregarHijo(new Nodo.default("while","WHILE"));
                                                                            $$.agregarHijo(new Nodo.default("(","PARABRE"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                            $$.agregarHijo($5);
                                                                            }
;

CICLO_FOR : RFOR PARABRE DECLARACION_ASIG_FOR PTCOMA EXPRESION PTCOMA ACTUALIZACION_FOR PARCIERRA ENCAPSULAMIENTO {$$= new Nodo.default("CICLO FOR","");
                                                                                                                    $$.agregarHijo(new Nodo.default("for","FOR"));
                                                                                                                    $$.agregarHijo(new Nodo.default("(","("));
                                                                                                                    $$.agregarHijo($3);
                                                                                                                    $$.agregarHijo(new Nodo.default(";",";"));
                                                                                                                    $$.agregarHijo($5);
                                                                                                                    $$.agregarHijo(new Nodo.default(";",";"));
                                                                                                                    $$.agregarHijo($7);
                                                                                                                    $$.agregarHijo(new Nodo.default(")","PARCIERRA"));
                                                                                                                    $$.agregarHijo($9);
                                                                                                                    }
;

CICLO_DO_WHILE : RDO ENCAPSULAMIENTO RWHILE PARABRE EXPRESION PARCIERRA PTCOMA  {$$= new Nodo.default("CICLO DO_WHILE", "");
                                                                                $$.agregarHijo(new Nodo.default("do", "DO"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("while", "WHILE"));
                                                                                $$.agregarHijo(new Nodo.default("(", "("));
                                                                                $$.agregarHijo($5);
                                                                                $$.agregarHijo(new Nodo.default(")", ")"));
                                                                                $$.agregarHijo(new Nodo.default(";", ";"));
                                                                                }
;

CICLO_DO_UNTIL : RDO ENCAPSULAMIENTO RUNTIL PARABRE EXPRESION PARCIERRA PTCOMA  {$$= new Nodo.default("CICLO DO_UNTIL","");
                                                                                $$.agregarHijo(new Nodo.default("do","DO"));
                                                                                $$.agregarHijo($2);
                                                                                $$.agregarHijo(new Nodo.default("until","UNTIL"));
                                                                                $$.agregarHijo(new Nodo.default("(","("));
                                                                                $$.agregarHijo($5);
                                                                                $$.agregarHijo(new Nodo.default(")",""));
                                                                                $$.agregarHijo(new Nodo.default(";",";"));
                                                                                }
;

DECLARACION_ASIG_FOR : RINT LISTA_IDENTIFICADORES IGUAL EXPRESION           {$$=new Nodo.default("DECLARACION_ASIG_FOR","");
                                                                            $$.agregarHijo(new Nodo.default("int","RINT"));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                            $$.agregarHijo($4);
                                                                            }
                    | IDENTIFICADOR IGUAL EXPRESION                         {$$= new Nodo.default("DECLARACION_ASIG_FOR","");
                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                            $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                            $$.agregarHijo(new Nodo.default($3,"EXPRESION"));
                                                                            }
;

ACTUALIZACION_FOR : LISTA_IDENTIFICADORES IGUAL EXPRESION                   {$$= new Nodo.default("ACTUALIZACION_FOR","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("=","IGUAL"));
                                                                            $$.agregarHijo($3);
                                                                            }   
                  | IDENTIFICADOR INCREMENTO                                {$$= new Nodo.default("ACTUALIZACION_FOR","");
                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                            $$.agregarHijo(new Nodo.default("++","INCREMENTO"));
                                                                            }
                  | IDENTIFICADOR DECREMENTO                                {$$ = new Nodo.default("ACTUALIZACION_FOR","");
                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));
                                                                            $$.agregarHijo(new Nodo.default("--","DECREMENTO"));
                                                                            }
;

EXPRESION : ENTERO                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"ENTERO"));}
          | CADENA                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"CADENA"));}
          | CARACTER                                                        {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"CARACTER"));}
          | DECIMAL                                                         {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"DECIMAL"));}
          | IDENTIFICADOR                                                   {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,"IDENTIFICADOR"));}
          | RTRUE                                                           {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,""));}
          | RFALSE                                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default($1,""));}
          | EXPRESION MAS EXPRESION                                         {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("+","MAS"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MENOS EXPRESION                                       {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("-","MENOS"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MULTIPLICACION EXPRESION                              {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("*","MULTIPLICACION"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION DIVISION EXPRESION                                    {$$ = new Nodo.default("/","DIVISION");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("+","MAS"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MODULO EXPRESION                                      {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("%","MODULO"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION POTENCIA EXPRESION                                    {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("^","POTENCIA"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | MENOS EXPRESION %prec NEGATIVO                                  {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default("-","NEGATIVO"));
                                                                            $$.agregarHijo($2);
                                                                            }
          | PARABRE EXPRESION PARCIERRA                                     {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo($2);
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            }
          | EXPRESION OR EXPRESION                                          {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("||","OR"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION AND EXPRESION                                         {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("&&","AND"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | NOT EXPRESION                                                   {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo(new Nodo.default("!","NOT"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION IGUALIGUAL EXPRESION                                  {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("==","IGUALIGUAL"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION DIFERENTE EXPRESION                                   {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("!=","DIFERENTE"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MENOR EXPRESION                                       {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("<","MENOR"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MAYOR EXPRESION                                       {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default(">","MAYOR"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MENOROIGUAL EXPRESION                                 {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("<=","MENOR O IGUAL"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | EXPRESION MAYOROIGUAL EXPRESION                                 {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default(">=","MAYOR O IGUAL"));
                                                                            $$.agregarHijo($3);
                                                                            }
          | IDENTIFICADOR INCREMENTO                                        {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("++","INCREMENTO"));
                                                                            }
          | IDENTIFICADOR DECREMENTO                                        {$$ = new Nodo.default("EXPRESION","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("--","DECREMENTO"));
                                                                            }
          | LLAMADA                                                         {;}
          | OPERADOR_TERNARIO                                               {$$=$1;}
          | CASTEOS                                                         {$$=$1;}
          | ACCESO_VECTORES                                                 {;}
          | FUNCIONES_NATIVAS                                               {;}
;

OPERADOR_TERNARIO : EXPRESION INTERROGACION EXPRESION DOSPUNTOS EXPRESION   {$$ = new Nodo.default("OPERADOR_TERNARIO","");
                                                                            $$.agregarHijo($1);
                                                                            $$.agregarHijo(new Nodo.default("?","INTERROGACION"));
                                                                            $$.agregarHijo($3);
                                                                            $$.agregarHijo(new Nodo.default(":","DOSPUNTOS"));
                                                                            $$.agregarHijo($5);
                                                                            }
;

CASTEOS : PARABRE RINT PARCIERRA EXPRESION                                  {$$= new Nodo.default("CASTEOS","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo(new Nodo.default("int","RINT"));
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            $$.agregarHijo($4);
                                                                            }
          | PARABRE RFLOAT PARCIERRA EXPRESION                              {$$= new Nodo.default("CASTEOS","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo(new Nodo.default("float","RFLOAT"));
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            $$.agregarHijo($4);
                                                                            }
          | PARABRE RSTRING PARCIERRA EXPRESION                             {$$= new Nodo.default("CASTEOS","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo(new Nodo.default("string","RSTRING"));
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            $$.agregarHijo($4);
                                                                            }
          | PARABRE RBOOL PARCIERRA EXPRESION                               {$$= new Nodo.default("CASTEOS","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo(new Nodo.default("bool","RBOOL"));
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            $$.agregarHijo($4);
                                                                            }
          | PARABRE RCHAR PARCIERRA EXPRESION                               {$$= new Nodo.default("CASTEOS","");
                                                                            $$.agregarHijo(new Nodo.default("(",""));
                                                                            $$.agregarHijo(new Nodo.default("char","RCHAR"));
                                                                            $$.agregarHijo(new Nodo.default(")",""));
                                                                            $$.agregarHijo($4);
                                                                            }
;