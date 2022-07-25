const fs = require('fs');
const SemanticAnalyzer = require('./semantico/SemanticAnalyzer');
const Parser = require('./sintatico');
let programa = fs.readFileSync(`${process.argv[2]}`, { encoding: "utf-8" });
const ast = new Parser(programa).parse();
const analyzer = new SemanticAnalyzer(programa);
analyzer.visit(ast);