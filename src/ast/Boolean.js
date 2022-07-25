const Node = require('./Node');

/**
 * Class for representing logico in AST.
 *
 * @class
 */
class Boolean extends Node {
  /**
   * Creates a new instance of Number Node.
   * That's just a thin wrapper around {@link Token} instance.
   * It was created just for case, if we will need more complex logic for get its value.
   *
   * @param {Token} token {@link Token} that represents a number
   * @example
   * const token = Token.create(Token.BOOLEAN, verdadeiro);
   */
  constructor(token) {
    super(token);

    this.value = token.getValue();
  }

  /**
   * Get a value of a number as integer.
   *
   * @returns {Number}
   */
  getValue() {
    return this.value;
  }

  /**
   * Static helper for creating this node.
   *
   * @param {Token} token
   * @returns {Number}
   */
  static create(token) {
    return new this(token);
  }
}

module.exports = Boolean;
