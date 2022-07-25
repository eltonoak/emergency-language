const Symbol = require('./Symbol');

/**
 * Symbol for representing type symbols in a program.
 *
 * @class
 * @since 1.0.0
 */
class ConstantSymbol extends Symbol {
  /**
   * Helper for representing this type symbol as a string.
   *
   * @returns {String}
   */
  toString() {
    return `ConstantSymbol(${this.name}, ${this.type})`;
  }

  /**
   * Static helper for creating new ConstantSymbol.
   *
   * @static
   * @param {String} name
   * @returns {ConstantSymbol}
   */
  static create(name, type) {
    return new this(name, type);
  }
}

module.exports = ConstantSymbol;
