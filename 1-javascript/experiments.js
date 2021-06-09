// Will use the Adjacency List approach to represent the friend nodes:
class PersonNode {
  constructor(name, adjacent = new Set()) {
    this.name = name;
    this.adjacent = adjacent;
  }
}

class FriendGraph {
  constructor() {
    this.nodes = new Set();
  }

  // add single person
  addPerson(node) {
    this.nodes.add(node);
  }

  // add an array of people
  addPeople(peopleList) {
    for (let node of peopleList) {
      this.addPerson(node);
    }
  }

  // set adjacency
  setFriends(person1, person2) {
    person1.adjacent.add(person2);
    person2.adjacent.add(person1);
  }

  // To traverse, since there are cycles, we need to make sure we don't visit the same vertice
  // more than once, so we have to mark it as visited.

  // BFS traversal
  areConnectedBFS(person1, person2) {
    const toVisitQueue = [person1];
    const visited = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      let currPerson = toVisitQueue.shift();

      if (currPerson === person2) return true;

      for (let edge of currPerson.adjacent) {
        if (!visited.has(edge)) {
          toVisitQueue.push(edge);
          visited.add(edge); // add it to 'visited' in order to not visit it twice.
        }
      }
    }
    return false;
  }

  // DFS traversal (recursive)
  areConnectedRecursive(person1, person2, visited = new Set([person1])) {
    if (person1 === person2) return true;
    for (let edge of person1.adjacent) {
      if (!visited.has(edge)) {
        visited.add(edge);
        if (this.areConnectedRecursive(edge, person2, visited)) {
          return true;
        }
      }
    }
    return false;
  }

  // DFS traversal (iterative)
  areConnectedDFS(person1, person2) {
    const toVisitStack = [person1];
    const visited = new Set(toVisitStack);

    while (toVisitStack.length) {
      let currPerson = toVisitStack.pop();

      if (currPerson === person2) return true;

      for (let edge of currPerson.adjacent) {
        if (!visited.has(edge)) {
          toVisitStack.push(edge);
          visited.add(edge);
        }
      }
    }
    return false;
  }
}

// define nodes:
const homer = new PersonNode('homer');
const marge = new PersonNode('marge');
const maggie = new PersonNode('maggie');
const lisa = new PersonNode('lisa');
const grampa = new PersonNode('grampa');

const moe = new PersonNode('moe');
const barney = new PersonNode('barney');
const lenny = new PersonNode('lenny');

// define graph:
const friends = new FriendGraph();

// add people to the graph:
friends.addPeople([homer, marge, maggie, lisa, grampa]);

friends.addPeople([moe, barney, lenny]);

// define the adjacencies:
friends.setFriends(homer, marge);
friends.setFriends(homer, lisa);
friends.setFriends(homer, maggie);
friends.setFriends(marge, maggie);
friends.setFriends(maggie, lisa);
friends.setFriends(lisa, grampa);

friends.setFriends(moe, barney);
friends.setFriends(barney, lenny);

// methods:
friends.areConnectedRecursive(barney, lisa); // false
friends.areConnectedBFS(homer, barney); //false
friends.areConnectedDFS(homer, lisa); // true
