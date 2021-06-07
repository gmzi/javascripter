class BinarySearchNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  search(sought) {
    let currentNode = this;
    while (currentNode) {
      if (currentNode.val === sought) return currentNode;
      if (currentNode.val > sought) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }
}

const E = new BinarySearchNode('E');
const A = new BinarySearchNode('A');
const B = new BinarySearchNode('B');
const C = new BinarySearchNode('C');
const D = new BinarySearchNode('D');
const F = new BinarySearchNode('F');
const G = new BinarySearchNode('G');

E.left = B;
E.right = G;
B.left = A;
B.right = D;
G.left = F;

const josh = new BinarySearchTree(E);

E.search('D'); // BinarySearchNode {val: "D", left: null, right: null}
