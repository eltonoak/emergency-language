# GRAMÁTICA EMERGENCY LANGUE
## Programa e Bloco
1. \<programa> ::= **program** \<identificador> **;** \<bloco>**.**
2. \<bloco> ::= [<parte de declarações de variáveis>]   
$~~~~~~~~~~~~~~~~~$ [<parte de declarações de sub-rotinas>]   
$~~~~~~~~~~~~~~~~~$ \<comando composto>
## Declarações
3. <parte de declarações de variáveis> ::=
<declaração de variáveis> {**;** <declaração de variáveis>};
4. <declaração de variáveis>::= \<tipo> <lista de identificadores>
5. <lista de identificadores> ::= \<identificador> {**,** \<identificador>}
6. <parte de declarações de subrotinas> ::= {declaração de procedimento> **;**}
7. <declaração de procedimento> ::= **procedimento** \<identificador> [<parâmetros formais>] ;
\<bloco>
8. <parâmetros formais> ::= **(** \<seção de parâmetros formais> { **;** <seção de parâmetros formais>} **)**
9. \<seção de parâmetros formais> ::=
[**var**] \<lista de identificadores> **:** \<identificador>

## Comandos
10.  <comando composto >::= **inicio** \<comando> { **;** \<comando>} **fim**
11.  \<comando> ::=
\<atribuição>
| \<chamada de procedimento>
| \<comando composto>
| \<comando condicional 1>
| \<comando repetitivo 1>
12. \<atribuição>::= \<variável> := \<expressão>
13. \<chamada de procedimento> ::= \<identificador> [ **(** \<lista de expressões> **)** ]
14. \<comando condicional 1> ::= **se** \<expressão> **entao** \<comando>
[**senao** \<comando>]
15. \<comando repetitivo 1> ::= **enquanto** \<expressão> **faca** \<comando>
## Expressões
16.  \<expressão> ::= \<expressão simples> [\<relação> \<expressão simples>]
17.  \<relação> ::= **=** | **<>** | **<** | **<=** | **>=** | **>**
18.  \<expressão simples> ::= [**+** | **-**] \<termo> {(**+** | **-** | **ou**) \<termo>}
19.  \<termo> ::= \<fator> {(* | **div** | **e** ) \<fator> }
20.  \<fator> ::=
\<variavel>
| \<número>
| **(** \<expressão> **)**
| **nao** \<fator>
21. \<variável> ::= \<identificador> | \<identificador> [ \<expressão> ]
22. \<lista de expressões> ::= \<expressão> {**,** \<expressão>}
## Números e Identificadores
23.  \<número> ::= \<dígito> {\<dígito>}
24.  \<dígito> ::= **0** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9**
25.  \<identificador> ::= \<letra> {\<letra> | \<dígito>}
26.  \<letra> ::= **_**| **a**-**z** |**A**-**Z**    
    
**EBNF**:
[α] = significa um item opcional
{α} = repetição da cadeia α zero ou mais vezes α | β =
α ou β devem ser escolhidos
Não terminais aparecem entre < e > e terminais aparecem em negrito.
Obs 2: o comentário de código na linguagem EMERGENCY LANGUE inicia-se por { e finaliza-se com }
para múltiplas linhas e // no caso de uma única linha.