const Node = require('./Node');

class ProcedureCall extends Node {
    /**
     * @param {Node} nodeToCall 
     * @param {Node[]} argNodes 
     */
    constructor(nodeToCall, argNodes) {
        super();
        this.nodeToCall = nodeToCall;
        this.argNodes = argNodes;
        this.name = "ProcedureCall";
    }
    /**
   * Returns procedure name.
   *
   * @returns {String}
   */
    getName() {
        return this.nodeToCall;
    }

    /**
     * Get params of a procedure.
     *
     * @returns {Array<Param>}
     */
    getParams() {
        return this.argNodes;
    }

    /**
     * Static helper for creating new ProcedureDecl node.
     *
     * @static
     * @param {String} name Procedure name
     * @param {Array<Param>} params Array of Param nodes
     * @param {Block} block
     * @returns {ProcedureDecl}
     */
    static create(nodeToCall, argNodes) {
        return new this(nodeToCall, argNodes);
    }

}
module.exports = ProcedureCall;