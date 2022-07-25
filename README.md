# Simple Lexer, Parser and Semantic Analyzer for Emergency Language

## About the project
**EMERGENCY LANGUAGE** is a **Pascal** based language.   

This project was forked from [Ghaiklor Pascal Interpreter](https://github.com/ghaiklor/pascal-interpreter) and used for educational purposes. Was implemented only the compiler front-end, there is no *code generation* or *code interpretation*.   


You can see the [Emergency grammar here](./GRAMATICA.md)   

## What's new?
Based on the [Ghaiklor Pascal Interpreter](https://github.com/ghaiklor/pascal-interpreter) was added: 
- The syntax is a little bit different.  
- IF instruction **[DONE]**
- WHILE instruction **[DONE]**

## Code example
```pascal
  program correto;
  inteiro a, b, c;
  logico d, e6, f;
  {Comentário correto}
  inicio
    a:=1;
    enquanto (a>1) faca
    inicio
      se (b>10) entao
        b:=2;
      a:=a-1;
    fim //Outro comentario correcto.
  fim.
```

## How to run

### Pre-requisites
1. **NodeJS** installed.

### Run
1. Clone the repository or download as .zip
2. Open the terminal
3. Go to **src** in the project folder
4. Execute the command ` node index.js "source file name"`   
  Eg: ` node index.js programaCorrecto.txt` 

You can write your own program, enjoy.