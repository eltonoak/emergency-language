const Node = require("./Node");

class IfNode extends Node {
    /**
     * 
     * @param {Node} condition 
     * @param {Node} cases 
     * @param {Node} elseCases 
     */
    constructor(condition, cases, elseCases) {
        super(null);
        this.condition = condition;
        this.cases = cases;
        this.elseCases = elseCases;
        this.name = "IfNode";
    }
    getName() {
        return this.name;
    }
    getCondition() {
        return this.condition;
    }
    getCases() {
        return this.cases;
    }
    getElseCases() {
        return this.elseCase;
    }
    static create(condition, cases, elseCases) {
        return new this(condition, cases, elseCases);
    }
}
module.exports = IfNode;