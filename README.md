# smrt
Utility for creating online learning tools


```

let exp = new expression(); // create new expression
let exp2 = new expression( new expnt(10, 3) ); // set the starting expnt in constructor 

let e1 = new expnt(1,1, `m/s`); // setting the unit (using latex format) -- Creates `\textrm{unit}`
e1.setUnit( `{\\textrm{m/s}^2}` ); // setUnit resets the unit. If \textrm is limiting or not desired


let e2 = new expnt(1,2); // no units
let e3 = new expnt(1,3);

//in order to set the base in constructor, a unit must be set (default to '' normally)
let e4 = new expnt(1,4, unit='', base='e');

// adding operations sequentially
exp.set(e1).add(e2).div(e3).mult(e4).print();

// creating expression with array format input
let expArr = new expression( [[1,2,''], ADD, [1,2,''], DIV, [4,5,'']] );
expArr.print();


// can also be split into mulilines like so
// exp.set(e1);
// exp.add(e2);
// exp.print();

// can do operations with entire expressions
exp2.div(e3).add(exp).print();


eAr = new expnt([1,2, '', 10, ['',''] ]);
eAr.print();


eee = new expnt( 1, 10 );
eee.print();

num.randE();


genExp = new expression();
genExp.generateExpression(['ADD', 'DIV']);
genExp.print();


genComplexExp = new expression();
genComplexExp.generateExpression(['ADD', 'MULT', 'DIV', ['ADD'] ]);
genComplexExp.print();

```