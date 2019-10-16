class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
    }

    removeChild(node) {
        if (this.left && node.data == this.left.data) {
            this.left.parent = null;
            this.left = null;
        } else if (this.right && node.data == this.right.data) {
            this.right.parent = null;
            this.right = null;
        } else {
            throw Error("Not found such child.");
        }
    }

    remove() {
        if (!this.parent) {

        } else {
            this.parent.removeChild(this);
            this.parent = null;
        }
    }

    swapWithParent() {
        if (!this.parent) {
        } else {
            let temp_parent = this.parent.parent;
            let temp_left = this.left;
            let temp_right = this.right;

			if (temp_parent) {
				if (temp_parent.left && this.parent.data == temp_parent.left.data && this.parent.priority == temp_parent.left.priority) {
					temp_parent.left = this;
				} else if (temp_parent.right && this.parent.data == temp_parent.right.data && this.parent.priority == temp_parent.right.priority) {
					temp_parent.right = this;
				}
			}
			this.parent.parent = this;

            if (this.parent.left) {
                if(this.parent.left.data == this.data && this.parent.left.priority == this.priority) {
                    this.left = this.parent;
                    this.right = this.parent.right;
                }
                else {
                    //another child
                    this.parent.left.parent = this;
                }

            } else if (this.parent.right) {
                if(this.parent.right.data == this.data && this.parent.right.priority == this.priority) {
                    this.right = this.parent;
                    this.left = this.parent.left;
                }
                else {
                    //another child
                    this.parent.right.parent = this;
                }
            }
            this.parent.left = temp_left;
            this.parent.right = temp_right;
            this.parent = temp_parent;

        }
    }
}

module.exports = Node;
