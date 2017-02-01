module.exports = (function() {

	return class Stack {
		constructor(n) {
			this._name = n;
			this.clear();
		}
		clear() {
			this.arr = [];
			this.index = -1;
		}

		push(val) {
			this.arr[++this.index] = val;
		}

		pop() {
			let tmp = this.arr[this.index];
			this.arr[this.index--] = void 0;
			return tmp;
		}

		empty() {
			return this.index < 0;
		}

		peek() {
			return this.arr[this.index];
		}

		name() {
			return this._name;
		}

		toArr() {
			return this.arr.slice().filter((a) => a);;
		}
	};
})();