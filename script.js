	/**
	 * Creates LaTeX formatted expressions.
	 */
	class expression{
		constructor( input=null ){

			if( input === null ){
				this.expnts = [];
				this.ops = [];
			}else if( Array.isArray( input ) ){
				this.expnts = [];
				this.ops = [];

				let new_op;
				for(let i=0;i<input.length;i++){
					if( i%2 == 0 ){

						let new_expnt = new expnt( input[i] );
						this.expnts.push( new_expnt );
					}else{

						let opVal = input[i];
						this.ops.push( opVal );
					}
				}

			}else{
				this.expnts = [input];
				this.ops = [];
			}

			this.ADDITION = 0;
			this.SUBTRACTION = 1;
			this.MULTIPLICATION = 2;
			this.DIVISION = 3; 
		}

		generateExpression( opArray ){

			// Reset any preconditions.
			this.clear();

			// Set base expnt.
			this.set( this.randExpnt() );

			// Loop through operation array.
			for(let i=0;i<opArray.length;i++){

				let new_expnt;
				// If array, recurse to create complex expnt
				if( Array.isArray( opArray[i] ) ){
					let new_expr = new expression();
					new_expnt = new_expr.generateExpression( opArray[i] );
				}else{
					// Create expnt
					new_expnt = this.randExpnt();
				}
				// Push new expnt.
				this.expnts.push( new_expnt );

				// Push new op.
				let opVal = this.decodeOpString( opArray[i] );
				this.ops.push( opVal );
			}
		}

		randExpnt(){
			let coef = num.randC();
			let exp = num.randE();
			let e = new expnt( coef, exp );
			return e;
		}

		decodeOpString( opStr ){
			let op;
			switch( opStr ){
				case 'ADD' ://|| 'add' || 'PLUS' || 'plus':
					op = this.ADDITION;
					break;
				case 'SUB' ://|| 'sub' || 'MINUS' || 'minus':
					op = this.SUBTRACTION;
					break;
				case 'MULT' :// || 'mult':
					op = this.MULTIPLICATION;
					break;
				case 'DIV' ://|| 'div':
					op = this.DIVISION;
					break;
				default:
					op = this.ADDITION;
					break;
			}
			return op;
		}

		set(expnt){
			if( this.expnts.length == 0){
				this.expnts.push(expnt);
				return this;
			}
		}

		add(expnt){
			this.expnts.push(expnt);
			this.ops.push( this.ADDITION );
			return this;
		}
		sub(expnt){
			this.expnts.push(expnt);
			this.ops.push( this.SUBTRACTION );
			return this;
		}
		mult(expnt){
			this.expnts.push(expnt);
			this.ops.push( this.MULTIPLICATION );
			return this;
		}
		div(expnt){
			this.expnts.push(expnt);
			this.ops.push( this.DIVISION );
			return this;
		}

		addString( e1, e2 ){
			let formatAdd = `+`;
			return `${e1} ${formatAdd} ${e2}`;
		}
		subString( e1, e2 ){
			let formatSub = `-`;
			return `${e1} ${formatSub} ${e2}`;
		}
		multString( e1, e2 ){
			let formatMult = `\\cdot`;
			return `${e1} ${formatMult} ${e2}`;
		}
		divString( e1, e2 ){
			let formatDiv = ``;
			return `\\dfrac{${e1}}{${e2}}`;
		}

		formExpression( e1, e2, op ){
			
			let expressionString = ``;
			switch( op ){
				case this.ADDITION:
					expressionString = this.addString( e1, e2 );
					break;
				case this.SUBTRACTION:
					expressionString = this.subString( e1, e2 );
					break;
				case this.MULTIPLICATION:
					expressionString = this.multString( e1, e2 );
					break;
				case this.DIVISION:
					expressionString = this.divString( e1, e2 );
					break;
			}
			return expressionString;
		}

		createExpressionString(){

			let cur_exp = this.expnts[ 0 ];
			let op_exp;
			let op;
			for(let i=0;i<this.ops.length;i++){
				op = this.ops[i];
				op_exp = this.expnts[i+1];
								
				cur_exp = this.formExpression( cur_exp, op_exp, op );
			}
			return cur_exp;
			
		}

		clear(){
			this.expnts = [];
			this.ops = [];
		}

		toString(){
			return this.createExpressionString();
		}

		print(){
			console.log( this.toString() );
		}

	}

	/**
	 * Holds banks of numbers for use in math problems.
	 */
	class num{

		constructor(){
			this.nums = nums;
			this.addBank = this.nums;
			this.subBank = this.addBank;
			this.multBank = this.addBank;
			this.divBank = this.multBank;
		}

		static rand( numArray ){
			let rand = Math.floor(Math.random() * numArray.length);
			return numArray[rand];
		}

		static randC(){
			let coefNums = [1,2,3,4,5,6,7,8,9,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5,
							-1,-2,-3,-4,-5,-6,-7,-8,-9,-1.5,-2.5,-3.5,-4.5,-5.5,-6.5,-7.5,-8.5,-9.5];
			return num.rand(coefNums);
		}
		static randE(){
			let expNums = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,0,1,2,3,4,5,6,7,8,9,10,11,12];
			return num.rand(expNums);
		}


	}


//#################################################################

const ADD = 0;
const SUB = 1;
const MULT = 2;
const DIV = 3;

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