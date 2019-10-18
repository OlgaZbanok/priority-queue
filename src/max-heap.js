const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	push(data, priority) {
		let node = new Node();
		node.data = data;
		node.priority = priority;
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.count++;
	}

	pop() {
		if (this.isEmpty()) {
			return;
		}

		let detach = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detach);
		this.shiftNodeDown(this.root);
		this.count--;
		return detach.data;
	}

	detachRoot() {
		let troot = this.root;
		if (this.parentNodes.includes(this.root)) this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1);
		this.root = null;
		return troot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.parentNodes.length) return;
		let lastNode = this.parentNodes.pop();
		if (lastNode.parent && lastNode.parent != detached && !this.parentNodes.includes(lastNode.parent)) {

			this.parentNodes.unshift(lastNode.parent);
		} else if (lastNode.parent && lastNode.parent == detached && !this.parentNodes.includes(lastNode)) {
			this.parentNodes.unshift(lastNode);
		}
		lastNode.remove();

		this.root = lastNode;
		this.root.appendChild(detached.left);
		this.root.appendChild(detached.right);

		if ((!this.root.left || !this.root.right) && !this.parentNodes.includes(lastNode)) this.parentNodes.unshift(this.root);
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return (!this.root && !this.parentNodes.length);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
		}
		if (this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();

	}


	shiftNodeUp(node) {
		if (node.parent && (node.parent.priority < node.priority)) {
			for (var i = 0; i < this.parentNodes.length; i++) {
				if (this.parentNodes[i] == node.parent) {
					this.parentNodes[i] = node;
				} else if (this.parentNodes[i] == node) {
					this.parentNodes[i] = node.parent;
				}
			}
			node.swapWithParent();
			if (!node.parent) {
				this.root = node;
			}
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		let tnode = null;
		if (!node) return;
		if (node.left && node.right) {
			if (node.left.priority > node.right.priority) {
				tnode = node.left;
			} else {
				tnode = node.right;
			}
		} else if (node.left) {
			tnode = node.left;
		}
		 else return;
		if (node.priority >= tnode.priority) return;
		for (var i = 0; i < this.parentNodes.length; i++) {
			if (this.parentNodes[i] == tnode) {
				this.parentNodes[i] = tnode.parent;
			} else if (this.parentNodes[i] == tnode.parent) {
				this.parentNodes[i] = tnode;
			}
		}

		tnode.swapWithParent();
		if (!tnode.parent) {
			this.root = tnode;
		}
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;