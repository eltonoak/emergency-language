const Node = require("./Node");

class WhileNode extends Node {
    /**
     * @param {Node} conditionNode 
     * @param {Node} bodyNode 
     */
    constructor(condition, bodyNode) {
        super(null);
        this.condition = condition;
        this.bodyNode = bodyNode;
        this.name = "WhileNode";
    }
    getCondition() {
        return this.condition;
    }
    getBodyNode() {
        return this.bodyNode;
    }
    static create(condition, bodyNode) {
        return new this(condition, bodyNode);
    }
}
module.exports = WhileNode;