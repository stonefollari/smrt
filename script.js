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

	class edit{


	}
	function editable(){
		return `\\editable{}`
	}
	function exp( coef=null, exp=null, unit=null, base=null, pad=null ){
		let e = new expnt(coef, exp, unit, base, pad);
		return e;
	}
	function print(obj){
		console.log( obj );
	}
	function unit(txt){
		if( txt.charAt(0) == '\\' ){
			return txt;
		}else{
			return `\\text{${txt}}`;
		}
	}
	function equals(){
		return ' = ';
	}
	function space(){
		return '\\quad';
	}

//#################################################################

const ADD = 0;
const SUB = 1;
const MULT = 2;
const DIV = 3;

let pad = ['',''];

// From Sci Not
// let fromSci = 
// [
// 	[3.6525, 2, 'days'],
// 	[4.13, -3, 'g'],
// 	[2.998, 8, '\\dfrac{\\text{m}}{\\text{s}}'],
// 	[9.99, -6, 'A'],
// 	['-5.00', 0, 'V'],
// 	[3.33, -1, 'm'],
// 	[-8.254, -5, 'J'],
// 	['5.0', 5, 'Hz']
// ]
// From Sci Not
// for( let i=0; i<fromSci.length; i++){
// 	let p = fromSci[i];
// 	print( exp( p[0], p[1], '', 10, pad ) + unit(p[2]) + equals() + editable() + space()+ unit(p[2]) );
// }

// ExpAdj1
// let adj1 = [
// 	['5.302', 6, 4, 'J'],
// 	['5.302', 6, 9, 'J'],
// 	['1.021', -9, -8, '\\dfrac{\\text{cm}}{\\mu\\text{s}}'],
// 	['-0.988', 3, 4, '\\text{N} \\cdot \\text{m}'],
// ]

// for( let i=0; i<adj1.length; i++){
// 	let p = adj1[i];
// 	print( exp( p[0], p[1], '', 10, pad ) + unit(p[3]) + equals() + editable() + space() + exp( '', p[2], '', 10, pad ) + unit(p[3]) );
// }

// ExpAdj2
// let adj2 = [
// 	['0.511', 6, '0.000511', '\\text{N} \\cdot \\text{m}'],
// 	['-3', -7, '-0.0003', 'A'],
// 	['-3', -7, '-300', 'A'],
// 	['6.66667', 2, '66666.7', 'cd'],
// ]
// for( let i=0; i<adj2.length; i++){
// 	let p = adj2[i];
// 	print( exp( p[0], p[1], '', 10, pad ) + unit(p[3]) + equals() + exp( p[2], editable(), '', 10, pad ) + space()+ unit(p[3]) );
// }

/*
Answers
365.25
0.00413
299800000
0.00000999
-5
0.333
-0.00008254
500000

530.2
.005302
.1021
-.0988
9
-3
-5
-2
*/


// // mult
// let mult = [
// 	[ new expression(exp(2,5,'cm')).mult(exp(3,4,'cm')), unit('\\text{cm}^{2}')],
// 	[ new expression(exp(4,11,'kg')).mult( exp(2,-7,'\\text{m}^2/\\text{s}^2')), unit('\\text{N} \\cdot \\text{m/s}')],
// 	[ new expression(exp(9,4,'m/s')).mult( exp('2',4, 's')), unit('m')],
// 	[ new expression(exp(1.5,11,'C')).mult( exp('5.0',3, 'V')), unit('J')],
// 	[ new expression(exp(-4,2,'\\text{m/s}^{2}')).mult( exp(3,-3,'kg')), unit('N')],
// 	[ new expression(exp(-1.3,-2,'N')).mult( exp(-3,4,'m')), unit('J')],
// 	[ new expression(exp(2.5,-5, 'Pa')).mult( exp('3.0',-2,'\\text{m}^{2}')), unit('N')],
// 	[ new expression(exp(2.5,-2,'cm')).mult( exp('4.0',-5,'C/cm')), unit('C')],
// 	[ new expression(exp(2,3,'mm')).mult( exp('2',4,'mm')).mult( exp('2',5,'mm')), unit('\\text{mm}^{3}')],
// 	[ new expression(exp(2,3,'m')).mult( exp('-2',-4,'m')).mult( exp('2',5,'m')), unit('\\text{m}^{3}')],
// 	[ new expression(exp(5,3,'kg')).mult( exp('3',-5,'\\text{m/s}^{2}')).mult( exp('2',-10,'m')), unit('N')],
// ];
// for( let i=0; i<mult.length; i++ ){
// 	let arg = mult[i];
// 	print( arg[0] + equals() + exp(editable(), editable(), arg[1], 10, pad) );
// }


// let div = [
// 	[ new expression(exp(6,5,'km')).div(exp(2,3,'s')), unit('km/s')],
// 	[ new expression(exp(7,-2,'cm')).div( exp(2,3, 's')), unit('cm/s')],
// 	[ new expression(exp(4.5,7,'m/s')).div( exp('1.5',-4, 's')), unit('\\text{m/s}^2')],
// 	[ new expression(exp(9,2,'kg')).div( exp('4',4, 'm')), unit('\\text{kg/m}^3')],
// 	[ new expression(exp(3.9,-7,'V')).div( exp(1.3,-11,'m')), unit('V/m')],
// 	[ new expression(exp(2,4,'J')).div( exp(5,3,'m')), unit('N')],
// 	[ new expression(exp(7,-2, 'J')).div( exp('-2',3,'C')), unit('V')],
// 	[ new expression(exp(-4.2,-11,'J')).div( exp('-1.4',-7,'kg')), unit('\\text{m}^2/\\text{s}^2')],
// 	[ new expression(exp(8.2,7,'N')).div( exp('-0.2',6,'m')), unit('Pa')],
// ]
// for( let i=0; i<div.length; i++ ){
// 	let arg = div[i];
// 	print( arg[0] + equals() + exp(editable(), editable(), arg[1], 10, pad) );
// }

// answers
/*
3	2
3.5	-5
3	11
2.25	-2
3	4
4	0

-3.5	-5
3	-4
4.2	2
*/



let muldiv = [
	[ new expression(exp(3,5)).mult(exp(4,8)).div(exp(6,7,'',10,pad))],
	[ new expression(exp(2,3)).mult(exp(3,-4)).div(exp(5,6,'',10,pad))],
	[ new expression(exp(1.2,12)).mult(exp(4,3)).div(exp(3,-5,'',10,pad))],
	[ new expression(exp(2.4,15, '',10,pad)).div(new expression(exp(3,7)).mult(exp(6,7)))],
	[ new expression(exp(6,-4,'',10,['\\left(','\\right)^{2}'])).div(exp(9,-5,'',10,pad))],
	[ new expression(exp(3,-7)).mult(8,5).div(new expression(exp(4,9)).mult(exp(6,-11)))],
]
for( let i=0; i<muldiv.length; i++ ){
	let arg = muldiv[i];
	print( arg[0] + equals() + exp(editable(), editable(), '', 10, pad) );
}

// answers
/*
2	6
1.5	-7
1.6	20
2	0
4	-3
1	0
*/