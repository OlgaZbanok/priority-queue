const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}

		this.heap = new MaxHeap();
		this.count = 0;

	}

	push(data, priority) {
		if (this.size() >= this.maxSize) throw new Error;
		this.heap.push(data, priority);

	}

	shift() {
		if (this.isEmpty()) throw new Error;
		let value = this.heap.pop();
		return value;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;