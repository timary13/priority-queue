const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize = 30) {
        this.maxSize = maxSize;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap.size() < this.maxSize) {
            this.heap.push(data, priority);
        } else {
            throw Error("MaxSize limit!");
        }

    }

    shift() {
        if (this.heap.isEmpty()) {
            throw Error("Empty!");
        } else {
            return this.heap.pop();
        }
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;
