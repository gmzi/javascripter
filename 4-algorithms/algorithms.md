- Abstract data types
  1. STACKS
     [stacks](#stacks)
     - [constraints](#Constraints_stacks)
     - [methods](##Standard_methods_stacks)
     - [implementations](##Efficient_Implementations_stacks)
     - [example](####Example_implementation_stacks)
     - [cool_article](https://medium.com/basecs/stacks-and-overflows-dbcf7854dc67)
  2. QUEUES
     [queues](#queues)
     - [constraints](#Constraints_queues)
     - [methods](##Standard_methods_queues)
     - [implementations](##Efficient_Implementations_queues)
     - [example](#Example_implementation_queues)
     - [cool_article](https://medium.com/basecs/to-queue-or-not-to-queue-2653bcde5b04)
  3. DEQUES
     [deques](#deques)
     - [constraints](#Constraints_deques)
     - [methods](##Standard_methods_deques)
     - [implementations](##Efficient_Implementations_deques)
     - [example](#Example_implementation_deques)
  4. PRIORITY QUEUES
     [priority_queues](#priority_queues)
     - [constraints](#Constraints_P_queues)
     - [methods](##Standard_methods_P_queues)
     - [implementations](##Efficient_Implementations_P_queues)
     - [example](#Example_implementation_P_queues)
  5. LISTS
     [lists](#lists)
     - [linked_lists](##linked_lists)
       - [LLists_runtime](#runtime_ll)
     - [doubly_linked_lists](##douubly_linked_lists)
     - [Nodes](##Nodes)
  6. ARRAYS
     - [arrays](##arrays)
     - [array_runtimes](###array_runtimes)
     - [indirect_arrays](###indirect_arrays)
     - [direct_arrays/vectors](###direct_arrays/vectors)
     - [typed_arrays](###typed_arrays)
- Divide and Conquer
  [binary_search](##binary_search)
  [linear_search](##linear_search)
- Big-O notation
  [functions](##functions)
  [time_complexity](##time_complexity)
  [time_complexity](##space_complexity)
  [log](##log)
  [generalities](##generalities)

# Abstract data types

<a name="stacks"></a>

# stacks

Are a limited data structure. It does just two operations:

- insert
- remove

It's like a stack of books. Add a book at the top, and remove from the top (last in firts out)

<a name="Constraints_stacks"></a>

## Constraints_stacks

- Items added only by pushing them onto the top
- Items removed only by popping them off the top
  So newer items are near top of stack, older items are near the bottom
- LIFO (Last-in, first-out)

<a name="Standard_methods_stacks"></a>

## Standard_methods_stacks

- push(item)
  Add to “top” of stack
- pop()
  Remove & return top item
- peek()
  Return (but don’t remove) top item
- isEmpty()
  Are there items in the stack?

<a name="Efficient_Implementations_stacks"></a>

## Efficient_Implementations_stacks

- Array: yes, both push & pop are O(1)
- Linked List: only adding to the beginning is O(1), don't touch the end, because removing from the end in a Linked List is O(n)
- Doubly Linked List: yes, both push & pop are O(1)
- Object: no, popping is O(n) (have to scan whole obj to find high key)

<a name="Example_implementation_stacks"></a>

#### Example_implementation_stacks

```javascript
// using javascript array:

const myMagazines = [];

myMagazines.push('vogue');
myMagazines.push('el grafico');
myMagazines.push('para ti');

myMagazines; // ["vogue", "el grafico", "para ti"]

myMagazines.pop(); // "para ti"
myMagazines.pop(); // "el grafico"
myMagazines; // [vogue]
```

---

# queues

- add at the end
- remove from the begining

<a name="Constraints_queues"></a>

## Constraints_queues

- Enqueueing: items are added to a queue ONLY at the end.
- Dequeueing: items are removed ONLY at the front.
  So newer items will always be at the back of the queue, and older items near the start.
- FIFO data structure (first in first out)

<a name="Standard_methods_queues"></a>

## Standard_methods_queues

- enqueue(item) / (sometimes called push)
  add to end
- dequeue(item) / (sometimes called pop)
  remove & return first item
- peek()
  Return first item, don't remove it
- isEmpty()
  Are there items in queue?
- .length()

<a name="##Efficient_Implementations_queues"></a>

## Efficient \_Implementations_queues

- Linked List: yes, both enqueue & dequeue are O(1) (we can keep track of the head and the tail of the LL)
- Doubly Linked List: yes, both enqueue & dequeue are O(1)
- Array: no, dequeing would be O(n)
- Object: no, dequeuing is O(n) (have to scan whole obj to find low key)

<a name="Example_implementation_queues"></a>

## Example_implementation_queues

```javascript
// Implement a queue data structure in Javascript

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
}

class Queue {
  constructor() {
    this.data = new LinkedList();
  }
  log() {
    console.log(this);
  }
  push(val) {
    let newNode = new Node(val);
    if (this.data.head === null) this.data.head = newNode;
    if (this.data.tail !== null) this.data.tail.next = newNode;
    this.data.tail = newNode;
    this.data.length++;
  }

  pop() {
    let val = this.data.head.val;
    this.data.head = this.data.head.next;
    this.data.length -= 1;
    if (this.data.length < 2) this.data.tail = this.data.head;
    return val;
  }
}

const waitList = new Queue();
waitList.log();
waitList.push('Tom');
waitList.push('Susan');
console.log(waitList.pop()); //tom
```

---

# deques

Pronounce "decks"
"Double Ended Queue".

- push
- pop
- shift
- unshift

# Constraints_deques

- Can add item to the beginning
- Can remove from the beginning
- Can add to the end
- Can remove from the end

## Standard_methods_deques

- appendleft()
  Add to beginning
- appendright()
  Add to end
- popleft()
  Remove & return from beginning
- popright()
  Remove & return from end
- peekleft()
  Return (don’t remove) beginning
- peekright()
  Return (don’t remove) end
- isEmpty()
  Are there items in the deque?

## Efficient_Implementations_deques

- Doubly Linked List: yes — everything is O(1)
- Linked List: no, popright would be O(n)
- Array: no, appendleft & popleft would be O(n)
- Object: no, popleft & popright would be O(n)

# Example_implementation_deques

Not provided today

---

# priority_queues

It's an ADT for a collection.

- Add item (with priority)
- Remove highest priority item.

# Constraints_P_queues

## Standard_methods_P_queues

## Efficient_Implementations_P_queues

# Example_implementation_P_queues

---

# lists

Are an abstract data type accross languages that can:

Constraints:

- Keep multiple items
- Can insert or delete items at any position
- Can contain duplicates
- Preserves order of items

They have two implementations: arrays and linked lists.

<a name="linked_lists"></a>

## linked_lists

Not built in in Javascript, we have to implement it:

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

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

// -----------------------------------------------------------------
// MORE EQUIPPED EXAMPLE:

/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (this.head === null) this.head = newNode;
    newNode.next = this.head;
    this.head = newNode;
    if (this.tail === null) this.tail = this.head.next;
    this.length++;
  }

  traverse() {
    // prints val and next of each node
    let current = this.head;
    while (current !== null) {
      console.log(current.val);
      current = current.next;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let cur = this.head;
    let count = 0;
    while (cur !== null && count <= idx) {
      if (count === idx) {
        return cur.val;
      }
      count++;
      cur = cur.next;
    }
    return null;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let cur = this.head;
    let count = 0;
    while (cur !== null && count <= idx) {
      if (count === idx) {
        cur.val = val;
      }
      count++;
      cur = cur.next;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index.');
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prev = this._get(idx - 1);

    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error('invalid index.');
    }

    // case remove first item:
    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // case remove tail:
    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // case remove in the middle:
    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let values = 0;
    let cur = this.head;
    while (cur !== null) {
      values += cur.val;
      cur = cur.next;
    }
    return values / this.length;
  }

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }
    return cur;
  }
}

// USE METHODS:
const people = new LinkedList();
people.push('tammy');
people.push('sonia');
people.push('peter');
people.unshift('Rolo!!!');
people.traverse();
people.pop();
console.log(people.average());
```

Check steps in visualgo: https://visualgo.net/en/list
![linked_lists](../images/head-and-tail.png)

Nodes aren’t stored in contiguous memory; instead, each item references the next item in the sequence.Can rearrange without having to move other nodes in memory. It's more efficient than an array if we have to rearrange or move thins around. In an array we would have to shift over every element to insert a new item. In a linked list, we just change the references, and it's constant time. Although is not that efficient for a search by position.

![ll](../images/linked-list.png)

They are linear data structures: there is a sequence and an order to how they are constructed and traversed:
![linear](../images/linear.png)

<a name="runtime_ll"></a>

### runtime of linked lists

- Going to “next” item: O(1)
- Insert node at the beginning: O(1)
- Insert node at end: O(1) if known tail; O(n) if unknown;
- Deleting at start: O(1)
- Deleting at end: O(n) (because nodes desn't know "previous" value)
- Going to item by arbitrary index: O(n)
- Searching for value: O(n)
- General insertion or deletion in the middle of list: O(n)

## douubly_linked_lists

Each node has a "next" and a "previous".

Same principles as the linked lists, except that has the "previous" value. Allows us to traverse backwards, and makes easier to insert in the middle and to delete at the end of list. Can remove from the end in O(1), because can go to the tail, find the previous node and make it tail. The downsize is that you have to update next and previous every time, and you use more space in memory.

![graphic](../images/doubly-linked-lists.png)

## Nodes

The basic unit in a linked list is a node. A basic node has two attributes:

- val (can be string, int, instance, anything)
- next (reference to the next node, if last item, reference to null)

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

let antNode = new Node('ant');
let beeNode = new Node('bee');
let caterpillarNode = new Node('caterpillar');

antNode.next = beeNode;
beeNode.next = caterpillarNode;

// ALTERNATIVE IMPLEMENTATION, ADDING THE NEXT NODE AS ARGUMENT:
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

let antNode = new Node('ant', new Node('bee', new Node('caterpillar')));
```

## arrays

### array_runtimes

- Retrieving by index: O(1)
- Searching: O(n)
- General insertion: O(n) (because all things in array have to be shifted over)
- General deletion: O(n) (all things have to be reaccomodated)
- append to start: O(1)
- append to end: O(1)

Arrangement of items at equally-spaced addresses in memory:

![memory](../images/memory.jpg)

### indirect_arrays

Javascript uses indirect arrays.
In any indirect array, the array doesn’t directly hold the value. It holds the memory address of the real value. This lets an array store different types of data, or different length data.

![graphic](../images/indirect_arr.jpg)

### direct_arrays/vectors

It's a special kind of array. IT ONLY WORKS IF ITEMS ARE ALL THE SAME SIZE:

- all numbers
- all same-length strings

### typed_arrays

Javascript typed arrays are more powerful when working with big loads of data. (numbers, music/video data, etc.)
It's a javascript version of vectors. Used very rarely. They have restrictions on what can be stored in them. (checkout mdn for more)

# Divide-and-conquer-strategy

A problem solving strategy, will apply it for searching algorithms, aiming to optimize time complexity.
The genearl pattern is: given a data set, a divide and conquer algorithm removes a large fraction of the data set from consideration at each step. The data set must have some additional structure (e.g be sorted). Significantly improves time complexity, when it's applicable.

## binary_search

O(log n) time complexity.
Better time complexity, but ONLY FOR SORTED ARRAYS.

- Look at the middle value is the one we're searching for, return.
- If middle value too big, eliminate every value to the right.
- If millde value too small, eliminate every value to the left.

```javascript
function binarySearch(arr, val) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // we found our value!
      return middleIdx;
    }
  }
  // left and right pointers crossed, val isn't in arr
  return -1;
}
```

## linear_search

It's an O(n) algorithm, because we have to compare over each item of the array, we use it for not-sorted arrays:

```javascript
// custom indexOf implementation
function indexOf(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    // if you find the value, return the index
    if (arr[i] === val) return i;
  }

  // if you never find the value, return -1
  return -1;
}

indexOf([4, 8, 15, 16, 23, 42], 15); // 2
indexOf([4, 8, 15, 16, 23, 42], 42); // 5
indexOf([4, 8, 15, 16, 23, 42], 100); // -1
```

# Big-O notation

## functions

f(n) can be:

- `O(1)` CONSTANT (f(n) = 1) (the line is flat)
- `O(n)` LINEAR (f(n) = n) (the line grows constantly and proportional to n)
- `O(n²)`EXPONENTIAL (f(n) = n²) (the line grows twice the increase of n)
- f(n) is something entirely different

These are all functions that describe a line. Checkout this linear calculator: https://www.desmos.com/calculator

Worst case always:
In big-O notation we always calculate over the worst case scenario. The function will execute the maximum number of times it can.

# time_complexity

- Airthmetic and mathematical operations are constant time.
  3 + 3 is always the same operation, doesn't matter the values, will always take the same amount of simple operations. If the values change, the operations will remain the same, so will be constant time.

  ```javascript
  function pucha(num) {
    return num + 223211 - 32 / 332;
  }
  // This will be O(1)
  ```

- Variable assingment is constant time.
  "const x1 = 3", doesn't matter the value of x1, because the variable will always take the same time to be processed (roughly)

  ```javascript
  function toto() {
    const x1 = 33243;
    const x2 = 432;
    const x3 = 3433;
  }
  // O(1)
  ```

- Accessing elements in array BY INDEX or object BY KEY is constant time

```javascript
function getThird(arr) {
  return arr[3];
}
// size of array doesn't matter.

function getKey(key) {
  return obj[key];
}
// size of object doesn't matter.
```

- Loops: no constant. To calculate the time complexity of a loop: take the length of the loop times complexity of whatever happens in loop.
  Can have loops with constant times or number of runs, nested loops also can be constant.

```javascript
function squareAndSumAll(arr) {
  for (let i = 0; i < arr.length; i++) {
    return arr[i] * arr[i] + arr[i];
  }
}
//We loop n times, inside the loop we perform 1 operation, so we simplify: O(n)
```

## space_complexity

How much memory or storage space is needed as the input increases. Is less common than time complexity.

Javascript manages storage with these principles:

- Booleans, numbers, undefined, null --> constant space.
- Strings: O(n) space [as n of characters grow, the storage needed grows.]
- Reference types (arrays, objects): generally, O(n), where n is the length of array, or keys in object.

Examples:

```javascript
function sum(nums) {
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }

  return total;
}

// SPACE COMPLEXITY: O(1)
// TIME COMPLEXITY: O(n)

// -----------------------------
function double(nums) {
  let doubledNums = [];

  for (let i = 0; i < nums.length; i++) {
    doubledNums.push(2 * nums[i]);
  }

  return doubledNums;
}
// O(n) space
```

## log

Examples in base 2:

`log₂8 = 3` How many time do I have to multiply the number 2 by itself to get 8 as a result? Three times (2*2 = 4; 4*2 = 8).

The logarithm of a number roughly measures the number of times you can divide that number by 2 before you get a value that's less than or equal to 1.
`log₂8 = 3` 8/2=4; 4/2=2; 2/2=1

Base 3:
`log₃81 = 4`

![example](/Users/xxx/projects/tester/images/n100.jpg)

Best runtime for sorting is `O(n log₂n)` meaning "n times the logarithm of n".

## general

![complexity_chart](/Users/xxx/projects/tester/images/big-o-complexity-chart.jpg)

We use big-O notation to analyze the performance of an algorithm.

- can give high level understanding of time or space complexity.
- Desn't care about precision, only general trends (linear?, quadratic?, constant?)
- Depends only on algorithm, not hardware used to run code.
- Based on worst-case performance.

Big-O is based on the count of the number of simple operations the computer has to perform to complete the task. More operations, more time and resources.

Examples:

Algorithm 1:

```javascript
function addUpToSecond(n) {
  return (n * (n + 1)) / 2;
}
```

This algorithm runs in `O(1)`, constant time.
This is a `O(1)` function, a "big-O of one" function, meaning that "as the input increases, the number of operations it takes is eventually less than 1 (because it always returns n multiplied by n plus 1 divided by 2, so always operations only)."

Algorithm 2:

```javascript
function addUpToFirst(n) {
  let total = 0;

  for (let i = 1; i <= n; i++) {
    total += i;
  }

  return total;
}
```

This algorithm runs in O(n), linear time.

It's an `O(n)` "a big-O of n function", meaning that as n increases the function will employ an n amount of operations, because the loop will run every time while less than n.

Algorithm 3:

```javascript
function printAllPairs(n) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

This algorithm runs in `O(n²)`. The amount of time grows double times the value of n. Grows "quadratic times". No good.

To simplify your expressions, keep in mind two rules:

- Constants do not matter.
- Smaller terms do not matter.
