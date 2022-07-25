
/**
 * Representa um token no codigo fonte do programa.
 *
 * @class
 */
class Token {
  /**
   * Cria uma nova instancia de Token
   *
   * @param {String} type tipo de Token
   * @param {String} value valor do Token
   * @example
   * new Token(Token.INTEGER, '1234');
   * new Token(Token.PLUS, '+');
   * new Token(Token.INTEGER, '5678');
   */
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  /**
   * Retorna um tipo de um token.
   *
   * @returns {String}
   */
  getType() {
    return this.type || null;
  }

  /**
   * Retorna um valor de um token.
   *
   * @returns {String}
   */
  getValue() {
    return this.value || null;
  }

  /**
   * Verifica se o tipo de um token especificado e este token.
   *
   * @param {String} tokenType Tipo do token
   * @returns {Boolean} Retorna true se o tipo especificado e igual ao tipo deste token
   * @example
   * const token = Token.create(Token.INTEGER, '234');
   *
   * token.is(Token.INTEGER); // true
   * token.is(Token.ASTERISK); // false
   */
  is(tokenType) {
    return this.getType() === tokenType;
  }
  /**
   * Converte um token numa representacao de string.
   * O formato da string e a seguinte: Token(<tipo>, <valor>).
   *
   * @returns {String} Retorna umaa string no formato Token(<tipo>, <valor>)
   * @example
   * const token = Token.create(Token.INTEGER, '1234');
   *
   * console.log(token); // Token(INTEGER, 1234)
   */
  toString() {
    return `Token<${this.getType()}, ${this.getValue()}>`;
  }

  /**
   * Cria uma nova instancia de Token.
   *
   * @static
   * @param {String} type Tipo do token
   * @param {String} value Valor do token
   * @returns {Token} retorna o Token instanciado
   * @example
   * Token.create(Token.INTEGER, 1234);
   * Token.create(Token.PLUS, '+');
   * Token.create(Token.INTEGER, 5678);
   */
  static create(type, value) {
    return new this(type, value);
  }

  /**
   * Retorna o tipo de Token para o simbolo mais (+).
   *
   * @static
   * @returns {String}
   */
  static get PLUS() {
    return 'MAIS';
  }

  /**
   * Retorna o tipo de Token para o simbolo menos (-).
   *
   * @static
   * @returns {String}
   */
  static get MINUS() {
    return 'MENOS';
  }

  /**
   * Retorna o tipo de Token para o simbolo asterisco(multiplicacao) (*).
   *
   * @static
   * @returns {String}
   */
  static get ASTERISK() {
    return 'MULTIPLICAÇÃO';
  }

  /**
   * Retorna o tipo de Token para o sinal de maior (>).
   *
   * @static
   * @returns {String}
   */
  static get GT() {
    return 'MAIOR';
  }
  /**
    * Retorna o tipo de Token para o sinal de menor (<).
    *
    * @static
    * @returns {String}
    */
  static get LT() {
    return 'MENOR';
  }
  /**
  * Retorna o tipo de Token para o sinal de igual (=).
  *
  * @static
  * @returns {String}
  */
  static get EQ() {
    return 'IGUAL';
  }
  /**
  * Retorna o tipo de Token para o sinal de diferente (<>).
  *
  * @static
  * @returns {String}
  */
  static get DIFF() {
    return 'DIFERENTE';
  }
  /**
  * Retorna o tipo de Token para o sinal de maior ou igual (>=).
  *
  * @static
  * @returns {String}
  */
  static get GTE() {
    return 'MAIOR_OU_IGUAL';
  }
  /**
    * Retorna o tipo de Token para o sinal de menor ou igual (<=).
    *
    * @static
    * @returns {String}
    */
  static get LTE() {
    return 'MENOR_OU_IGUAL';
  }

  /**
   * Retorna o tipo de Token para o sinal barra (/).
   *
   * @static
   * @returns {String}
   */
  static get SLASH() {
    return 'BARRA';
  }
  /**
   * Retorna o tipo de Token para o simbolo virgula (,).
   *
   * @static
   * @returns {String}
   */
  static get COMMA() {
    return 'VIRGULA';
  }

  /**
   * Retorna o tipo de Token para o simbolo ponto (.).
   *
   * @static
   * @returns {String}
   */
  static get DOT() {
    return 'PONTO';
  }

  /**
   * Retorna o tipo de Token para o simbolo dois pontos (:).
   *
   * @static
   * @returns {String}
   */
  static get COLON() {
    return 'DOIS_PONTOS';
  }

  /**
   * Retorna o tipo de Token para o simbolo ponto e virgula (;).
   *
   * @static
   * @returns {String}
   */
  static get SEMICOLON() {
    return 'PONTO_E_VIRGULA';
  }

  /**
   * Retorna o tipo de Token para o parentesis esquerdo "(".
   *
   * @static
   * @returns {String}
   */
  static get LEFT_PARENTHESIS() {
    return 'ABRIR_PARENTESIS';
  }

  /**
   * Retorna o tipo de Token para o parentesis direito ")".
   *
   * @static
   * @returns {String}
   */
  static get RIGHT_PARENTHESIS() {
    return 'FECHAR_PARENTESIS';
  }

  /**
   * Retorna o tipo de Token para o sinal de atribuicao (:=).
   *
   * @static
   * @returns {String}
   */
  static get ASSIGN() {
    return 'ATRIBUIÇÃO';
  }

  /**
   * Retorna o tipo de token para o fim do arquivo (end-of-file).
   *
   * @static
   * @returns {String}
   */
  static get EOF() {
    return 'EOF';
  }

  /**
   * Retorna o tipo de Token para a palavra reservada INICIO.
   *
   * @static
   * @returns {String}
   */
  static get BEGIN() {
    return 'INICIO';
  }

  /**
   * Retorna o tipo de Token para a palavra reservada FIM.
   *
   * @static
   * @returns {String}
   */
  static get END() {
    return 'FIM';
  }

  /**
   * Retorna o tipo de Token para identificadores no programa.
   *
   * @static
   * @returns {String}
   */
  static get IDENTIFIER() {
    return 'IDENTIFICADOR';
  }

  /**
   * Retorna o tipo de Token para a palavra reservada PROGRAM.
   *
   * @static
   * @returns {String}
   */
  static get PROGRAM() {
    return 'PROGRAM';
  }

  /**
   * Retorna o tipo de Token para a palavra reservada VAR.
   *
   * @static
   * @returns {String}
   */
  static get VAR() {
    return 'VAR';
  }

  /**
   * Retorna o tipo de Token para o tipo INTEIRO.
   *
   * @static
   * @returns {String}
   */
  static get INTEGER_TYPE() {
    return 'INTEIRO';
  }
  /**
  * Retorna o tipo de Token para o tipo LOGICO.
  *
  * @static
  * @returns {String}
  */
  static get BOOLEAN() {
    return 'LÓGICO';
  }

  /**
   * Retorna o tipo de Token para inteiros literais.
   *
   * @static
   * @returns {String}
   */
  static get INTEGER_LITERAL() {
    return 'INTEIRO_LITERAL';
  }

  /**
   * Retorna o tipo de Token para a divisao inteira (DIV).
   *
   * @static
   * @returns {String}
   */
  static get INTEGER_DIV() {
    return 'DIVISAO_INTEIRA';
  }
  /**
  * Retorna o tipo de Token para a palavra reservada SE.
  *
  * @static
  * @returns {String}
  */
  static get IF() {
    return 'SE';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada ENTAO.
   *
   * @static
   * @returns {String}
   */
  static get THEN() {
    return 'ENTÃO';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada SENAO.
   *
   * @static
   * @returns {String}
   */
  static get ELSE() {
    return 'SENÃO';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada ENQUANTO.
   *
   * @static
   * @returns {String}
   */
  static get WHILE() {
    return 'ENQUANTO';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada FACA.
   *
   * @static
   * @returns {String}
   */
  static get DO() {
    return 'FAÇA';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada E.
   *
   * @static
   * @returns {String}
   */
  static get AND() {
    return 'E';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada OU.
   *
   * @static
   * @returns {String}
   */
  static get OR() {
    return 'OU';
  }
  /**
   * Retorna o tipo de Token para a palavra reservada NAO.
   *
   * @static
   * @returns {String}
   */
  static get NOT() {
    return 'NÃO';
  }

  /**
   * Retorna o tipo de Token para a palavra reservada PROCEDIMENTO.
   *
   * @static
   * @returns {String}
   */
  static get PROCEDURE() {
    return 'PROCEDIMENTO';
  }
  static get BOOLEAN_LITERAL() {
    return 'LÓGICO_LITERAL';
  }

  /**
   * Retorna um dicionario de palavras reservadas dessa linguagem.
   *
   * @static
   * @returns {Object}
   */
  static get RESERVED_WORDS() {
    return {
      program: this.create(this.PROGRAM, 'program'),
      var: Token.create(Token.VAR, 'var'),
      div: Token.create(Token.INTEGER_DIV, 'div'),
      inteiro: Token.create(Token.INTEGER_TYPE, 'inteiro'),
      logico: Token.create(Token.BOOLEAN, 'logico'),
      e: Token.create(Token.AND, 'e'),
      ou: Token.create(Token.OR, 'ou'),
      nao: Token.create(Token.NOT, 'nao'),
      se: Token.create(Token.IF, 'se'),
      entao: Token.create(Token.THEN, 'entao'),
      senao: Token.create(Token.ELSE, 'senao'),
      enquanto: Token.create(Token.WHILE, 'enquanto'),
      faca: Token.create(Token.DO, 'faca'),
      leia: Token.create(Token.IDENTIFIER, 'leia'),
      escreva: Token.create(Token.IDENTIFIER, 'escreva'),
      inicio: Token.create(Token.BEGIN, 'inicio'),
      fim: Token.create(Token.END, 'fim'),
      procedimento: Token.create(Token.PROCEDURE, 'procedimento'),
      verdadeiro: Token.create(Token.BOOLEAN_LITERAL, 'verdadeiro'),
      falso: Token.create(Token.BOOLEAN_LITERAL, 'falso')
    }
  }
}

module.exports = Token;
