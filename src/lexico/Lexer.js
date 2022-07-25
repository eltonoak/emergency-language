const Token = require('./Token');

/**
 * Analisador Lexico da linguagem.
 *
 * @class
 */
class Lexer {
  /**
   * Cria uma nova instancia de Lexer.
   * Quando uma nova instancia e criada, precisas de chamar {@link Lexer#getNextToken} para obter o token.
   *
   * @param {String} input Codigo fonte do programa
   * @example
   * const lexer = new Lexer('2 + 5');
   */
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.line = 1;
    this.currentChar = this.input[this.position];
  }

  /**
   *
   * @returns {Lexer} Retorna a instancia actual do lexer
   * @example
   * const lexer = new Lexer('2 + 5'); // position = 0, currentChar = '2'
   *
   * lexer
   *  .advance() // position = 1, currentChar = ' '
   *  .advance() // position = 2, currentChar = '+'
   *  .advance() // position = 3, currentChar = ' '
   *  .advance() // position = 4, currentChar = '5'
   *  .advance() // position = 5, currentChar = null
   *  .advance() // position = 6, currentChar = null
   */
  advance() {
    if (this.currentChar == "\n")
      this.line++;
    this.position += 1;

    if (this.position > this.input.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.input[this.position];
    }

    return this;
  }

  /**
   * Olha o proximo caractere do input
   * @returns {String}
   * @example
   * const lexer = new Lexer('2 + 5'); // pointer = 0, currentChar = '2'
   *
   * lexer
   *  .peek() // pointer = 0, currentChar = '2', retorna ' '
   *  .advance() // pointer = 1, currentChar = ' '
   *  .peek() // pointer = 1, currentChar = ' ', retorna '+'
   */
  peek() {
    const position = this.position + 1;

    if (position > this.input.length - 1) return null;

    return this.input[position];
  }

  /**
   * Pula todos os espacos em branco no codigo fonte.
   *
   * @returns {Lexer} RRetorna uma nova instancia de Lexer
   */
  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }

    return this;
  }

  /**
   * Ignora todos os comentarios no codigo fonte.
   *
   * @returns {Lexer}
   */
  skipComment(char) {
    while (this.currentChar && this.currentChar !== char) {
      this.advance();
    }

    return this.advance();
  }

  /**
   * Analisa um numero do codigo fonte.
   *
   * @returns {Number}
   */
  number() {
    let number = '';

    while (this.currentChar && /\d/.test(this.currentChar)) {
      number += this.currentChar;
      this.advance();
    }

    if (this.currentChar === '.') {
      Lexer.error(`Caractere inesperado: "${this.currentChar}" na posicao (${this.line},${this.position})`);
    }

    return Token.create(Token.INTEGER_LITERAL, parseInt(number));
  }

  /**
   * Analisa uma sequencia de caracteres alfanumericos e retorna um token.
   *
   * @returns {Token}
   * @example
   * const lexer = new Lexer('inicio x fim');
   *
   * lexer.identifier(); // Token(BEGIN, inicio)
   * lexer.identifier(); // Token(IDENTIFIER, x)
   * lexer.identifier(); // Token(END, fim)
   */
  identifier() {
    let identifier = '';

    while (this.currentChar && /[a-zA-Z0-9]/.test(this.currentChar)) {
      identifier += this.currentChar;
      this.advance();
    }

    return Token.RESERVED_WORDS[identifier] || Token.create(Token.IDENTIFIER, identifier);
  }

  /**
   * Retorna o proximo token no programa fonte.
   *
   * @returns {Token}
   * @example
   * const lexer = new Lexer('2 + 5');
   *
   * lexer.getNextToken(); // Token(INTEGER, 2)
   * lexer.getNextToken(); // Token(PLUS, +)
   * lexer.getNextToken(); // Token(INTEGER, 5)
   * lexer.getNextToken(); // Token(EOF, null)
   * lexer.getNextToken(); // Token(EOF, null)
   */
  getNextToken() {
    while (this.currentChar) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }
      if (this.currentChar == "\n") {
        this.advance();
        this.line = this.line + 1;
      }

      if (this.currentChar === '{') {
        this.advance();
        this.skipComment('}');
        continue;
      }
      if (this.currentChar === '/' && this.peek() == '/') {
        this.advance();
        this.skipComment('\n');
        continue;
      }

      if (/\d/.test(this.currentChar)) {
        return this.number();
      }

      if (/[a-zA-Z]/.test(this.currentChar)) {
        return this.identifier();
      }

      if (this.currentChar === ':' && this.peek() === '=') {
        this.advance().advance();
        return Token.create(Token.ASSIGN, ':=');
      }
      if (this.currentChar === '=') {
        this.advance();
        return Token.create(Token.EQ, '=');
      }

      if (this.currentChar === '>' && this.peek() === '=') {
        this.advance().advance();
        return Token.create(Token.GTE, '>=');
      }

      if (this.currentChar === '<' && this.peek() === '=') {
        this.advance().advance();
        return Token.create(Token.LTE, '<=');
      }

      if (this.currentChar === '<' && this.peek() === '>') {
        this.advance().advance();
        return Token.create(Token.DIFF, '<>');
      }
      if (this.currentChar === '>') {
        this.advance();
        return Token.create(Token.GT, '>');
      }
      if (this.currentChar === '<') {
        this.advance();
        return Token.create(Token.LT, '<');
      }

      if (this.currentChar === ':') {
        this.advance();
        return Token.create(Token.COLON, ':');
      }

      if (this.currentChar === ',') {
        this.advance();
        return Token.create(Token.COMMA, ',');
      }

      if (this.currentChar === ';') {
        this.advance();
        return Token.create(Token.SEMICOLON, ';');
      }

      if (this.currentChar === '.') {
        this.advance();
        return Token.create(Token.DOT, '.');
      }

      if (this.currentChar === '+') {
        this.advance();
        return Token.create(Token.PLUS, '+');
      }

      if (this.currentChar === '-') {
        this.advance();
        return Token.create(Token.MINUS, '-');
      }

      if (this.currentChar === '*') {
        this.advance();
        return Token.create(Token.ASTERISK, '*');
      }

      if (this.currentChar === '/') {
        this.advance();
        return Token.create(Token.SLASH, '/');
      }

      if (this.currentChar === '(') {
        this.advance();
        return Token.create(Token.LEFT_PARENTHESIS, '(');
      }

      if (this.currentChar === ')') {
        this.advance();
        return Token.create(Token.RIGHT_PARENTHESIS, ')');
      }

      Lexer.error(`Caractere inesperado: "${this.currentChar}" na linha ${this.line}`);
    }

    return Token.create(Token.EOF, null);
  }

  /**
   * Lanca um erro no contexto do analisador lexico.
   *
   * @static
   * @param {String} msg Uma mensagem de erro
   */
  static error(msg) {
    throw new Error(`[Analisador Lexico]\n${msg}`);
  }
}

module.exports = Lexer;
