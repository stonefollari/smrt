/**
	 * Class for LaTeX representation of Scientific Notation exponentials.
	 * Has coefficient and exponent.
	 * Base is default 10, can be changed.
	 * Units can be added.
	 */
	class expnt{
		
		constructor(coef=null, exp=null, unit=null, base=null, pad=null){

			// Array construction
			if( coef!==null && Array.isArray( coef ) ){

				let array = coef;
				// Set individual vars, any unset in the array will be null and set in constructor
				this.coef = array[0];
				this.exp = array[1];
				this.unit = array[2];
				this.base = array[3];
				this.pad = array[4];

			// Normal construction
			}else{
				this.coef = coef;
				this.exp = exp;
				this.unit = unit;
				this.base = base;
				this.pad = pad;	
			}

			// Setting all unset class variables to default values.
			this.coef = this.isset(this.coef) ? this.coef : 1;
			this.exp = this.isset(this.exp) ? this.exp : 1;
			this.unit = this.isset(this.unit) ? this.unitF(this.unit) : `\\textrm{}`;
			this.base = this.isset(this.base) ? this.base : 10;
			this.pad = this.isset(this.pad) ? this.pad : [`\\left(`, `\\right)`];
			this.space = ``;//`\\:`;
		}

		isset( param ){
			if( param === null || typeof param === 'undefined' ){
				return false;
			}else{
				return true;
			}
		}

		unitF(u){
			if( u.charAt(0) == '\\' ){
				return u;
			}else{
				return `\\textrm{${u}}`;
			}
		}

		setCoef(coef){
			this.coef = coef;
			return this;
		}
		setExp(exp){
			this.exp = exp;
			return this;
		}
		setUnit(unit){
			this.unit = unit;
			return this;
		}
		setBase(base){
			this.base = base;
			return this;
		}

		/**
		 * Set the padding. Must be array wiht 2 elements. LaTeX Form.
		 */
		setPad(pad){
			this.pad = pad;
		}

		print(){
			console.log( this.toString() );
		}
		toString(){
			return `${this.pad[0]} ${this.coef} \\times ${this.base}^{${this.exp}} ${this.space} ${this.unit} ${this.pad[1]}`;
		}
	}