import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);

    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (value === node.value) return node; 
    if (value < node.value) return this.find(value, node.left);  
    return this.find(value, node.right);  
  }  

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required.");
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        callback(current);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
  }

  inOrder(callback, node = this.root) {
    if (!node) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!node) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!node) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) return null;
    if (value === node.value) return currentDepth;

    if (value < node.value)
      return this.depth(value, node.left, currentDepth + 1);
    return this.depth(value, node.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  getValuesInOrder() {
    const values = [];
    this.inOrder(node => values.push(node.value));
    return values;
  }  

  rebalance() {
    const sortedValues = this.getValuesInOrder();
    this.root = this.buildTree(sortedValues);
  }  
}

