const Token = require('../lexico/Token');
const Lexer = require('../lexico');
const AST = require('../ast');

/**
 * Analisador Sintatico para a linguagem.
 * Converte um conjunto de tokens numa AST.
 *
 * @class
 */
class Parser {
  /**
   * Cria uma nova instancia de parser.
   * Aceita como entrada o codigo fonte de um programa.
   * Ira analisar e retornar uma AST do programa especificado.
   *
   * @param {String} input Codigo fonte do programa.
   * @example
   * const parser = new Parser('2 + 5');
   */
  constructor(input) {
    this.lexer = new Lexer(input);
    this.currentToken = this.lexer.getNextToken();
  }

  /**
   * Consome um tipo de token especificado.
   * Se o tipo do token for diferente do actual, sera lancado um erro.
   * Se consumir um token que nao e esperado, significa que a estrutura sintatica esta errada.
   *
   * @param {String} tokenType Tipo do token
   * @returns {Parser} Retorna a instancia actual do parser
   * @example
   * const parser = new Parser('2 + 5'); // currentToken = INTEGER
   *
   * parser
   *  .eat(Token.INTEGER) // currentToken = PLUS
   *  .eat(Token.PLUS) // currentToken = INTEGER
   *  .eat(Token.PLUS) // lanca um erro, porque currentToken = INTEGER
   */
  eat(tokenType) {
    if (this.currentToken.is(tokenType)) {
      console.log(`Linha ${this.lexer.line} - ${this.currentToken.toString()}`);
      this.currentToken = this.lexer.getNextToken();

    } else {
      Parser.error(`Era esperado um token do tipo "${tokenType}" mas o encontrado foi ${this.currentToken} na linha ${this.lexer.line}`);
    }

    return this;
  }

  /**
   * vazio:
   *
   * @returns {NoOperation}
   */
  empty() {
    return AST.NoOperation.create();
  }

  /**
   * variavel: <identificador>
   *         | <identificador>[<expressao>]
   *
   * @returns {Variable}
   */
  variable() {
    const node = AST.Variable.create(this.currentToken, this.currentToken.getValue());
    this.eat(Token.IDENTIFIER);
    return node;
  }

  /**
   * factor: <variavel>
   *       | <numero>
   *       | (<expressao>)
   *       | nao <factor>
   *
   * @returns {Node}
   */
  factor() {
    const token = this.currentToken;

    if (token.is(Token.INTEGER_LITERAL)) {
      this.eat(Token.INTEGER_LITERAL);
      return AST.Number.create(token);
    } else if (token.is(Token.LEFT_PARENTHESIS)) {
      this.eat(Token.LEFT_PARENTHESIS);
      const node = this.expr();
      this.eat(Token.RIGHT_PARENTHESIS);
      return node;
    } else if (token.is(Token.NOT)) {
      this.eat(Token.NOT);
      return AST.UnaryOperator.create(token, this.factor());
    }

    return this.variable();
  }

  /**
   * termo: <factor> * <factor>
   *     | <factor> div <factor>
   *     | <factor> e <factor>
   *     | <factor>
   *
   * @returns {Node}
   */
  term() {
    let node = this.factor();

    while ([Token.ASTERISK, Token.INTEGER_DIV, Token.AND].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.ASTERISK)) {
        this.eat(Token.ASTERISK);
      } else if (token.is(Token.INTEGER_DIV)) {
        this.eat(Token.INTEGER_DIV);
      } else {
        this.eat(Token.AND);
      }

      node = AST.BinaryOperator.create(node, token, this.factor());
    }

    return node;
  }

  /**
   * Expressao simples: [+ | -] <termo> {(+ | - |ou) <termo>}
   *
   * @returns {Node}
   */
  simpleExpr() {
    if (this.currentToken.is(Token.PLUS))
      this.eat(Token.PLUS);
    if (this.currentToken.is(Token.MINUS))
      this.eat(Token.MINUS);
    let node = this.term();

    while ([Token.PLUS, Token.MINUS, Token.OR].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.PLUS)) {
        this.eat(Token.PLUS);
      } else if (token.is(Token.MINUS)) {
        this.eat(Token.MINUS);
      } else {
        this.eat(Token.OR);
      }

      node = AST.BinaryOperator.create(node, token, this.term());
    }

    return node;
  }
  /**
   * expressao: <expressao simples> [<relacao> <expressao simples>]
   *
   * @returns {Node}
   */
  expr() {
    let node = this.simpleExpr();

    while ([Token.EQ, Token.DIFF, Token.GT, Token.GTE, Token.LT, Token.LTE].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.EQ)) {
        this.eat(Token.EQ);
      } else if (token.is(Token.DIFF)) {
        this.eat(Token.DIFF);
      } else if (token.is(Token.GT)) {
        this.eat(Token.GT);
      } else if (token.is(Token.GTE)) {
        this.eat(Token.GTE);
      } else if (token.is(Token.LT)) {
        this.eat(Token.LT);
      } else if (token.is(Token.LTE)) {
        this.eat(Token.LTE);
      }

      node = AST.BinaryOperator.create(node, token, this.simpleExpr());
    }

    return node;
  }
  /**
   * comando condicional 1: se <expressao> entao <comando>
   *                        [senao <comando>]
   * @returns {conditionalStatement}
   */
  conditionalStatement() {
    let elseCases = null;
    this.eat(Token.IF);
    const condition = this.expr();
    this.eat(Token.THEN);
    const cases = this.statement();
    if (this.currentToken.is(Token.ELSE)) {
      this.eat(Token.ELSE)
      elseCases = this.statement();
    }
    return AST.IfNode.create(condition, cases, elseCases);

  }

  /**
   * comando de repeticao 1: enquanto <expressao> faca <comando>
   * @returns {repeatStatement}
   */
  repeatStatement() {
    this.eat(Token.WHILE);
    const condition = this.expr();
    this.eat(Token.DO);
    const body = this.statement();

    return AST.WhileNode.create(condition, body);

  }
  procedureCall() {
    let args = [];
    // console.log(this.currentToken.getValue());
    const procedureName = this.currentToken.getValue();
    this.eat(Token.IDENTIFIER);
    if (this.currentToken.is(Token.LEFT_PARENTHESIS)) {
      this.eat(Token.LEFT_PARENTHESIS);
      if (this.currentToken.is(Token.IDENTIFIER)) {
        args.push(this.currentToken.getValue());
        this.eat(Token.IDENTIFIER);
        while (this.currentToken.is(Token.COMMA)) {
          this.eat(Token.COMMA);
          args.push(this.currentToken.getValue());
          this.eat(Token.IDENTIFIER);
        }
      }
      this.eat(Token.RIGHT_PARENTHESIS);
    }
    return AST.ProcedureCall.create(procedureName, args)
  }

  /**
   * atribuicao: <variavel> := <expressao>
   *
   * @returns {Assign}
   */
  assignmentStatement() {
    let expression;
    const variable = this.variable();
    this.eat(Token.ASSIGN);
    const token = this.currentToken;
    if (this.currentToken.is(Token.BOOLEAN_LITERAL)) {
      expression = AST.Boolean.create(token);
      this.eat(Token.BOOLEAN_LITERAL);
    } else {
      expression = this.expr();
    }


    return AST.Assign.create(variable, token, expression);
  }

  /**
   * comando composto: inicio <lista de comandos> fim
   *
   * @returns {Compound}
   */
  compoundStatement() {
    this.eat(Token.BEGIN);
    const nodes = this.statementList();
    this.eat(Token.END);

    const root = AST.Compound.create();
    nodes.forEach(node => root.append(node));

    return root;
  }

  /**
   * comando: <atribuicao>
   *          | <comando composto>
   *          | <chamada de procedimento>
   *          | <comando condicional 1>
   *          | <comando repetitivo 1>
   *
   * @returns {Node}
   */
  statement() {
    let node;

    if (this.currentToken.is(Token.BEGIN)) {
      node = this.compoundStatement();
    } else if (this.currentToken.is(Token.IDENTIFIER)) {
      if (this.lexer.peek() == ':' || this.lexer.peek() == '=') {
        // console.log(this.lexer.peek());
        node = this.assignmentStatement();
      } else {
        node = this.procedureCall();
      }
    }// } else if (this.currentToken.is(Token.PROCEDURE)) {
    //   node = this.procedureCall();
    // } 
    else if (this.currentToken.is(Token.IF)) {
      node = this.conditionalStatement()
    } else if (this.currentToken.is(Token.WHILE)) {
      node = this.repeatStatement();
    } else {
      node = this.empty();
    }

    return node;
  }

  /**
   * lista de comandos: <comando>
   *              | <comando>; <lista de comandos>
   *
   * @returns {Array<Node>}
   */
  statementList() {
    const node = this.statement();
    const nodes = [node];

    while (this.currentToken.is(Token.SEMICOLON)) {
      this.eat(Token.SEMICOLON);
      nodes.push(this.statement());
    }

    if (this.currentToken.is(Token.IDENTIFIER)) {
      Parser.error(`Identificador inesperado na producao "Lista de comandos": ${this.currentToken} linha ${this.lexer.line}`);
    }

    return nodes;
  }

  /**
   * tipos: inteiro
   *      | logico
   *
   * @returns {Type}
   */
  typeSpec() {
    const token = this.currentToken;

    if (token.is(Token.INTEGER_TYPE)) {
      this.eat(Token.INTEGER_TYPE);
    } else {
      this.eat(Token.BOOLEAN);
    }
    return AST.Type.create(token);
  }

  /**
   * declaracao de variaveis: <tipo> <identificador>{, <identificador>}
   *
   * @returns {Array<VarDecl>}
   */
  variableDeclaration() {
    const typeNode = this.typeSpec();
    const varNodes = [AST.Variable.create(this.currentToken.getType(), this.currentToken.getValue())];
    this.eat(Token.IDENTIFIER);
    if (this.currentToken.is(Token.ASSIGN)) {
      this.eat(Token.ASSIGN);
      this.expr();
    }
    while (this.currentToken.is(Token.COMMA)) {
      this.eat(Token.COMMA);
      varNodes.push(AST.Variable.create(this.currentToken.getType(), this.currentToken.getValue()));
      this.eat(Token.IDENTIFIER);
      if (this.currentToken.is(Token.ASSIGN)) {
        this.eat(Token.ASSIGN);
        this.expr();
      }
    }
    return varNodes.map(node => AST.VarDecl.create(node, typeNode));
  }

  /**
   * declaracao de procedimento: procedimento <identificador>[<parametros formais>]; <bloco>
   *
   * @returns {Array<ProcedureDecl>}
   */
  procedureDeclaration() {
    let params = [];
    this.eat(Token.PROCEDURE);

    const procedureName = this.currentToken.getValue();
    this.eat(Token.IDENTIFIER);

    if (this.currentToken.is(Token.LEFT_PARENTHESIS)) {
      this.eat(Token.LEFT_PARENTHESIS);
      params = this.formalParameterList();
      this.eat(Token.RIGHT_PARENTHESIS);
    }

    this.eat(Token.SEMICOLON);
    const blockNode = this.block();
    this.eat(Token.SEMICOLON);

    return AST.ProcedureDecl.create(procedureName, params, blockNode);
  }

  /**
   * parametros formais: (<secao de parametros formais>{; <secao de parametros formais>})
   *
   * @returns {Array<Param>}
   */
  formalParameters() {
    if (this.currentToken.is(Token.VAR))
      this.eat(Token.VAR)
    const varNodes = [AST.Variable.create(this.currentToken, this.currentToken.getValue())];
    this.eat(Token.IDENTIFIER);

    while (this.currentToken.is(Token.COMMA)) {
      this.eat(Token.COMMA);
      varNodes.push(AST.Variable.create(this.currentToken, this.currentToken.getValue()));
      this.eat(Token.IDENTIFIER);
    }

    this.eat(Token.COLON);

    const typeNode = this.typeSpec();

    return varNodes.map(varNode => AST.Param.create(varNode, typeNode));
  }

  /**
   * secao de parametros formais: [var] <lista de identificadores> : <identificador>
   *                    | formalParameters SEMICOLON formalParameterList
   *
   * @returns {Array<Param>}
   */
  formalParameterList() {
    let params = this.formalParameters();

    while (this.currentToken.is(Token.SEMICOLON)) {
      this.eat(Token.SEMICOLON);
      params = params.concat(this.formalParameters());
    }

    return params;
  }

  /**
   * declaracoes: [<declaracoes de variaveis>]
   *              [<declaracoes de procedimentos>]
   *
   * @returns {Array}
   */
  declarations() {
    let declarations = [];

    while (this.currentToken.is(Token.INTEGER_TYPE) || this.currentToken.is(Token.BOOLEAN)) {
      const varDecl = this.variableDeclaration();
      declarations = declarations.concat(varDecl);
      this.eat(Token.SEMICOLON);
    }

    while (this.currentToken.is(Token.PROCEDURE)) {
      const procedureDecl = this.procedureDeclaration();
      declarations = declarations.concat(procedureDecl);
    }

    return declarations;
  }

  /**
   * bloco: [<declaracoes>] <comando composto>
   *
   * @returns {Block}
   */
  block() {
    const declarations = this.declarations();
    const compoundStatement = this.compoundStatement();

    return AST.Block.create(declarations, compoundStatement);
  }

  /**
   * programa: program <identificador> ; <bloco> .
   *
   * @returns {Node}
   */
  program() {
    this.eat(Token.PROGRAM);

    const variableNode = this.variable();
    const programName = variableNode.getName();

    this.eat(Token.SEMICOLON);

    const blockNode = this.block();
    const programNode = AST.Program.create(programName, blockNode);
    this.eat(Token.DOT);

    return programNode;
  }

  /**
   * Parses an input source program and returns an AST.
   * It uses all the grammar rules above to parse tokens and build AST from it.
   *
   * @returns {Node}
   * @example
   * const parser = new Parser('BEGIN END.');
   *
   * parser.parse(); // return an object that represents an AST of source program
   */
  parse() {
    return this.program();
  }

  /**
   * Static helper for notifying about an error, during parsing.
   *
   * @static
   * @param {String} msg Error message
   */
  static error(msg) {
    throw new Error(`[Analisador Sintatico - Parser]\n${msg}`);
  }
}

module.exports = Parser;
