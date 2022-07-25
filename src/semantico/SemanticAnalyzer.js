const SymbolTable = require('../simbolos/SymbolTable');
const VariableSymbol = require('../simbolos/VariableSymbol');
// const TypeSymbol = require('../simbolos/TypeSymbol');
const ProcedureSymbol = require('../simbolos/ProcedureSymbol');

class SemanticAnalyzer {
  /**
   * Cria uma nova instancia de Analisador Semantico.
   */
  constructor() {
    this.scope = null;
  }

  /**
   * Pega e chama o visitante para um no especificado.
   *
   * @param {Node} node
   */
  visit(node) {
    const visitor = this[`on${node.constructor.name}`];
    // console.log(node);
    return visitor.call(this, node);
  }

  /**
   * Visitante para o no Bloco.
   *
   * @param {Block} node
   */
  onBlock(node) {
    node.getDeclarations().forEach(node => this.visit(node));
    this.visit(node.getCompound());
  }

  /**
   * Visitante para o no Programa.
   *
   * @param {Program} node
   */
  onProgram(node) {
    this.scope = SymbolTable.create('global', 1, this.scope);
    this.visit(node.getBlock());
    this.scope = this.scope.enclosingScope;
  }

  /**
   * Visitante para o no Declaracao de procedimento.
   *
   * @param {ProcedureDecl} node
   */
  onProcedureDecl(node) {
    const procedureName = node.getName();
    const procedureSymbol = ProcedureSymbol.create(procedureName);
    if (this.scope.lookup(procedureName, true))
      SemanticAnalyzer.error(`Declaracao duplicada de procedimento "${procedureName}"!`);
    this.scope.define(procedureSymbol);
    this.scope = SymbolTable.create(procedureName, this.scope.scopeLevel + 1, this.scope);

    node.getParams().forEach(param => {
      const paramType = this.scope.lookup(param.getType().getValue());
      const paramName = param.getVariable().getName();
      const varSymbol = VariableSymbol.create(paramName, paramType);

      this.scope.define(varSymbol);
      procedureSymbol.params.push(varSymbol);
    });

    this.visit(node.getBlock());
    this.scope = this.scope.enclosingScope;
  }
  /**
   * Visitante para o no Chamada de procedimento.
   *
   * @param {ProcedureCall} node
   */
  onProcedureCall(node) {
    const procedureName = node.getName();
    const procedure = this.scope.lookup(procedureName, false);
    if (!procedure)
      SemanticAnalyzer.error(`Procedimento "${procedureName}" não existe nas declarações!`);
    // if (procedure.getName() == 'escreva' || procedure.getName() == 'leia')
    //   const params = node.getParams();
    // console.log(procedure.getParams().length, params.length);
  }

  /**
   * Visitante para o no Comando composto.
   *
   * @param {Compound} node
   */
  onCompound(node) {
    node.getChildren().forEach(node => this.visit(node));
  }

  /**
   * Visitante para o no Sem Operacao.
   *
   * @param {NoOperation} node
   */
  onNoOperation(node) {
    return node;
  }

  /**
   * Visitante para o no Declaracao de variaveis.
   *
   * @param {VarDecl} node
   */
  onVarDecl(node) {
    const typeName = node.getType().getValue();
    const typeSymbol = this.scope.lookup(typeName);

    const varName = node.getVariable().getName();

    const varSymbol = VariableSymbol.create(varName, typeSymbol);

    if (this.scope.lookup(varName, true))
      SemanticAnalyzer.error(`Declaração duplicada da variável "${varName}"!`);

    this.scope.define(varSymbol);
  }

  /**
   * Visitante para o no Variavel.
   *
   * @param {Variable} node
   */
  onVariable(node) {
    const varName = node.getName();
    const varSymbol = this.scope.lookup(varName);
    if (!varSymbol)
      SemanticAnalyzer.error(`Variável "${varName}" não existe nas declarações!`);
  }

  /**
   * Visitante para o no Atribuicao.
   *
   * @param {Assign} node
   */
  onAssign(node) {
    this.visit(node.getVariable());
    this.visit(node.getExpression());
  }
  /**
  * Visitante para o no Operacao Unaria.
  *
  * @param {UnaryOperator} node
  */
  onUnaryOperator(node) {
    return node;
  }
  /**
  * Visitante para o no comando condicional.
  *
  * @param {IfNode} node
  */
  onIfNode(node) {
    this.visit(node.getCondition());
    this.visit(node.getCases());
    if (node.getElseCases())
      this.visit(node.getElseCases());
  }
  /**
  * Visitante para o no comando de repeticao.
  *
  * @param {WhileNode} node
  */
  onWhileNode(node) {
    this.visit(node.getCondition());
    this.visit(node.getBodyNode());
  }
  /**
  * Visitante para o no Numero.
  *
  * @param {Number} node
  */
  onNumber(node) {
    return node;
  }
  /**
 * Visitante para o no Numero.
 *
 * @param {Number} node
 */
  onBoolean(node) {
    return node;
  }
  /**
   * Visitante para o no Operacao binaria.
   *
   * @param {BinaryOperator} node
   */
  onBinaryOperator(node) {
    this.visit(node.getLHS());
    this.visit(node.getRHS());
  }

  /**
   * Static helper for creating an instance.
   *
   * @static
   * @returns {SemanticAnalyzer}
   */
  static create() {
    return new this();
  }
  static error(msg) {
    throw new Error(`[Analisador Semântico]\n${msg}`);
  }
}

module.exports = SemanticAnalyzer;
