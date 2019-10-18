class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if (!node) return;
		if (this.left == null) {
			this.left = node;
			this.left.parent = this;
		} else
		if (this.right == null) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left.parent = null;
			this.left = null;
		} else
		if (this.right == node) {
			this.right.parent = null;
			this.right = null;
		} else throw new Error;
	}


	remove() {
		if (this.parent){
			 this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}

		let temp = this.parent;
		let tright = null;
		let tleft = null;
		if (temp.right) {
			tright = temp.right;
			tright.remove();
		}
		if (temp.left) {
			tleft = temp.left;
			tleft.remove();
		}

		if (temp.parent) {
			let tparent = temp.parent;
			temp.remove();
			tparent.appendChild(this);
		}


		if (this.left) {
			let cleft = this.left;
			cleft.remove();
			temp.appendChild(cleft);
		}
		if (this.right) {
			let cright = this.right;
			cright.remove();
			temp.appendChild(cright);
		}
		if (tleft) {
			if (tleft == this) {
				this.appendChild(temp);
			} else {
				this.appendChild(tleft);
			}
		}
		if (tright) {
			if (tright == this) {
				this.appendChild(temp);
			} else {
				this.appendChild(tright);
			}
		}
	}
}


module.exports = Node;