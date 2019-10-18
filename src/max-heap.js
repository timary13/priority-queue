const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.last = 0;

    }

    push(data, priority) {
        let node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
        this.last++;
    }

    pop() {
        if (!this.isEmpty()) {
            let lastRoot = this.detachRoot();
            this.restoreRootFromLastInsertedNode(lastRoot);
            this.shiftNodeDown(this.root);
            this.last--;
            return lastRoot.data;
        }
    }

    //"delete" root
    detachRoot() {
        if (this.parentNodes.includes(this.root)) {
            this.parentNodes.shift();
        }
        let lastRoot = this.root;
        this.root = null;
        console.log("detach " + lastRoot.data);
        return lastRoot;
    }

    restoreRootFromLastInsertedNode(lastRoot) {
        if (!this.isEmpty()) {

            console.log("---------------------");
            for (let x = 0; x < this.parentNodes.length; x++) {
                console.log(this.parentNodes[x].data);
            }
            console.log("---------------------");

            let lastNode = this.parentNodes.pop();
            console.log("lastNode pop=" + lastNode.data);
            //situation1: lastRoot - parent lastNode
            if (!lastNode.parent) {
                console.log("!lastNode.parent");
                this.root = lastNode;
                return;
            }
            //situation2.1: lastNode was right child -> add parent in parentNodes at start
            if (lastNode.parent != lastRoot && lastNode == lastNode.parent.right)
                this.parentNodes.unshift(lastNode.parent);
            lastNode.remove();

            //situation2: lastRoot - not parent lastNode
            if (lastNode.parent != lastRoot) {
                console.log("there");
                if (lastRoot.left) {
                    lastNode.appendChild(lastRoot.left);
                    console.log("appendChild lastNode=" + lastRoot.left.data);
                }
                if (lastRoot.right) {
                    lastNode.appendChild(lastRoot.right);
                    console.log("appendChild lastNode=" + lastRoot.right.data);
                }


            }
            //lastNode.parent = null;
            //need lastNode in parentNodes?
            if (!lastNode.right) {
                this.parentNodes.unshift(lastNode);
            }
            console.log("new root lastNode " + lastNode.data);
            this.root = lastNode;
        }
    }

    size() {
        return this.last;
    }

    isEmpty() {
        //no root as main check, length for restoreRootFromLastInsertedNode(cal after "delete" root)
        return (this.root == null && this.parentNodes.length === 0);
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.last = 0;
    }

    insertNode(node) {
        console.log("add" + node.data);

        if (this.isEmpty()) {
            this.root = node;
            this.parentNodes.push(node);
        } else {
            this.parentNodes.push(node);
            this.parentNodes[0].appendChild(node);
        }
        //if there are left and right childs
        if (this.parentNodes[0].left && this.parentNodes[0].right) {
            //delete parent
            this.parentNodes.splice(0, 1);
        }
    }

    swap(parentIndex, nodeIndex) {
        console.log("swap parent " + parentIndex + " node " + nodeIndex);

        //nodeIndex in parentNodes
        if (nodeIndex != -1) {
            //parentIndex in parentNodes
            if (parentIndex != -1) {
                let temp = this.parentNodes[nodeIndex];
                this.parentNodes[nodeIndex] = this.parentNodes[parentIndex];
                this.parentNodes[parentIndex] = temp;
                return 1;
            } else {
                return 0;
            }
        }
    }

    shiftNodeUp(node) {
        let currentPosition;
        let parentPosition;

        if (node.parent) {
            parentPosition = this.parentNodes.indexOf(node.parent);
            currentPosition = this.parentNodes.indexOf(node);

            if (node.parent.priority >= node.priority) {
                return;
            }
            //if no node in parentNodes
            if (!this.swap(parentPosition, currentPosition)) {
                this.parentNodes[currentPosition] = node.parent;
            }
            node.swapWithParent();

            //currentPosition = parentPosition;
            this.shiftNodeUp(node);
        } else {
            this.root = node;
        }
    }

    getChild(node) {
        if (node.left && node.right) {
            if (node.left.priority > node.right.priority)
                return node.left;
            else
                return node.right;
        } else
            return node.left;
    }

    shiftNodeDown(node) {
        if (!this.isEmpty() && node.left) {
            const child = this.getChild(node);
            if (node.priority < child.priority) {
                let nodeIndex = this.parentNodes.indexOf(node);
                let childIndex = this.parentNodes.indexOf(child);
                if (node == this.root) {
					this.root = child;
				}
                if(!this.swap(childIndex, nodeIndex)) {
					this.parentNodes[childIndex] = node;
				}
                child.swapWithParent();
                this.shiftNodeDown(node);
            }
        }
    }
}

module.exports = MaxHeap;
