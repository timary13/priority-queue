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
            if (this.left)
                this.left.parent = this.parent;
            if (this.right)
                this.right.parent = this.parent;

            let temp_parent = this.parent.parent;

            if (this.parent.left == this) {
                //and another child
                if (this.parent.right) {
                    this.parent.right.parent = this;
                }

                //node is left for parent
                this.parent.left = this.left;
                let temp = this.parent.right;
                this.parent.right = this.right;
                this.left = this.parent;
                this.right = temp;
            }
            //node is right for parent
            if (this.parent.right == this) {
                if (this.parent.left) {
                    //another child
                    this.parent.left.parent = this;
                }

                let temp = this.parent.left;
                this.parent.left = this.left;
                this.parent.right = this.right;
                this.right = this.parent;
                this.left = temp;
            }

            if (temp_parent) {
                if (temp_parent.left && this.parent == temp_parent.left) {
                    temp_parent.left = this;
                } else if (temp_parent.right && this.parent == temp_parent.right) {
                    temp_parent.right = this;
                }
            }

            this.parent.parent = this;
            this.parent = temp_parent;

        }

    }
}

module.exports = Node;
