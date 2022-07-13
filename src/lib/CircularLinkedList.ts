class CirculatNode<T> {
  element: T;
  next: CirculatNode<T> | null;
  constructor(element: T) {
    this.element = element;
    this.next = null;
  }
}

export class CircularLinkedList<T> {
  constructor() {}

  length = 0;
  head: any = null;

  //Other methods go here
  //Get element at specific index
  getElementAt(index: number) {
    if (index >= 0 && index <= this.length) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  //Add new node
  append(element: T) {
    //Create new node
    const node = new CirculatNode(element);
    let current;

    //If head is empty
    //Then make new node head
    if (this.head === null) {
      this.head = node;
    } else {
      //Else add the new node as the next node
      //And mark the next of new node to the head
      current = this.getElementAt(this.length - 1);
      current.next = node;
    }

    node.next = this.head;
    this.length++;
  }

  //   //Insert at given position
  //   this.insert = function (element, index) {
  //     if (index >= 0 && index <= length) {
  //       const node = new Node(element);
  //       let current = head;

  //       //Insert at head
  //       if (index === 0) {
  //         if (head === null) {
  //           head = node;
  //           node.next = head;
  //         } else {
  //           node.next = current;
  //           current = this.getElementAt(length);
  //           head = node;
  //           current.next = head;
  //         }
  //       } else {
  //         //Insert at given index (middle or end)
  //         const previous = this.getElementAt(index - 1);
  //         node.next = previous.next;
  //         previous.next = node;
  //       }

  //       length++;
  //       return true;
  //     }
  //     return false;
  //   };

  //   //Remove at any position
  //   this.removeAt = function (index) {
  //     if (index >= 0 && index < length) {
  //       let current = head;

  //       //Remove from head
  //       if (index === 0) {
  //         if (length === 1) {
  //           head = undefined;
  //         } else {
  //           const removed = head;
  //           current = this.getElementAt(length - 1);
  //           head = head.next;
  //           current.next = head;
  //           current = removed;
  //         }
  //       } else {
  //         //Remove at given index (middle or end)
  //         const previous = this.getElementAt(index - 1);
  //         current = previous.next;
  //         previous.next = current.next;
  //       }

  //       length--;
  //       return current.element;
  //     }
  //     return undefined;
  //   };

  //   //Get the indexOf item
  //   this.indexOf = function (elm) {
  //     let current = head,
  //       index = -1;

  //     //If element found then return its position
  //     while (current) {
  //       if (elm === current.element) {
  //         return ++index;
  //       }

  //       index++;
  //       current = current.next;
  //     }

  //     //Else return -1
  //     return -1;
  //   };

  //   //Find the item in the list
  //   this.isPresent = (elm) => {
  //     return this.indexOf(elm) !== -1;
  //   };

  //   //Get the head
  getHead() {
    return this.head;
  }

  //   //Delete an item from the list
  //   this.delete = (elm) => {
  //     return this.removeAt(this.indexOf(elm));
  //   };

  //   //Delete the first item from the list
  //   this.deleteHead = function () {
  //     this.removeAt(0);
  //   };

  //   //Print item of the string
  //   this.toString = function () {
  //     let current = head,
  //       string = "";
  //     const temp = head.element;

  //     while (current) {
  //       if (temp === current.next.element) {
  //         string += current.element + (current.next ? "\n" : "");
  //         break;
  //       }

  //       string += current.element + (current.next ? "\n" : "");
  //       current = current.next;
  //     }

  //     return string;
  //   };

  //   //Convert list to array
  //   this.toArray = function () {
  //     let arr = [],
  //       current = head;
  //     const temp = head.element;

  //     while (current) {
  //       //Break if first element detected
  //       if (temp === current.next.element) {
  //         arr.push(current.element);
  //         break;
  //       }

  //       arr.push(current.element);
  //       current = current.next;
  //     }

  //     return arr;
  //   };

  //   //Check if list is empty
  //   this.isEmpty = function () {
  //     return length === 0;
  //   };

  //   //Get the size of the list
  //   this.size = function () {
  //     return length;
  //   };
}

// let cLL = new CircularLinkedList();
// cLL.append(20);
// cLL.append(30);
// cLL.append(40);
// cLL.append(50);
// console.log(cLL.removeAt(3));
// cLL.insert(70, 3);
// cLL.deleteHead();
// cLL.delete(70);
// console.log(cLL.toString());
// let current = cLL.getHead();

// while (current.next) {
//   console.log(current.element);
//   current = current.next;
// }
