class PriorityQueue {
  constructor() {
    this.values = [];
    // formula to find index in array:
    // left child: 2 * i + 1
    // right child: 2 * i + 2;
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    // add to the end of array/bottom of heap:
    this.values.push(newNode);
    // bubble it up baby:
    this.bubbleUp();
  }

  printQueue() {
    console.log(this.values.map(({ val, priority }) => `${priority} - ${val}`));
  }

  // for min heap, lower value at the top.:
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      this.printQueue();
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
  // Mind this one is made for max heap. Have to adapt it to min heap to work
  poll() {
    let maxIdx = 0;
    let maxPriority = this.data[0].priority;
    for (let i = 1; i < this.data.length; i++) {
      if (this.data[i].priority > maxPriority) {
        maxPriority = this.data[i].priority;
        maxIdx = i;
      }
    }
    return this.data.splice(maxIdx, 1)[0].value;
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

// lowest value higher priority
let ER = new PriorityQueue();
ER.enqueue('common cold', 5); // not that urgent
ER.enqueue('gunshot wound', 1); // very urgent
ER.enqueue('high fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);

ER.values; /**
0: Node {val: "gunshot wound", priority: 1}
1: Node {val: "broken arm", priority: 2}
2: Node {val: "high fever", priority: 4}
3: Node {val: "common cold", priority: 5}
4: Node {val: "glass in foot", priority: 3}
*/
