class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// let antNode = new Node('ant');
// let beeNode = new Node('bee');
// let caterpillarNode = new Node('caterpillar');

// antNode.next = beeNode;
// beeNode.next = caterpillarNode;

// let antNode = new Node('ant', new Node('bee', new Node('caterpillar')));

// ----------------------------------

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(val) {
    // adds node at the end of list
    let newNode = new Node(val);
    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  remove(val) {
    /** if removing the only item in linked list
            Don’t forget to update head and tail to null
      if removing first item:
          Don’t forget to update the head!
      if removing the last item:
          Don’t forget to update the tail!
       */
  }

  find(val) {
    // finds given value in list, => true/false
    let current = this.head;
    while (current !== null) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }

  traverse() {
    // prints val and next of each node
    let current = this.head;
    while (current !== null) {
      console.log(current.val);
      current = current.next;
    }
  }
}

const insects = new LinkedList();
// insects.head = antNode;

// use methods:
insects.push('ant');
insects.push('bee');
insects.push('caterpillar');
insects.push('dragonfly');
insects.push('wasp');

insects.traverse(); // ant, bee, caterpillar, dragonfly

insects.find('fly'); // false
insects.find('bee'); // true

// now the Nodes follow their own chaining through their "next" value:
// insects.head.next; // bee
// insects.head.next.next; // catarpillar
// insects.head.next.next.next; // null
