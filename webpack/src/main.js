import { Tree } from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`); 
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const randomArray = Array.from({ length: 15 }, () =>
  Math.floor(Math.random() * 100)
);
const bst = new Tree(randomArray);

console.log("Initial Tree:");
prettyPrint(bst.root);
console.log("Balanced?", bst.isBalanced());

console.log("Level-order:");
bst.levelOrder((node) => console.log(node.value)); 

console.log("Pre-order:");
bst.preOrder((node) => console.log(node.value)); 

console.log("Post-order:");
bst.postOrder((node) => console.log(node.value)); 

console.log("In-order:");
bst.inOrder((node) => console.log(node.value)); 

bst.insert(120);
bst.insert(130);
bst.insert(140);

console.log("After unbalancing:");
prettyPrint(bst.root);
console.log("Balanced?", bst.isBalanced());

bst.rebalance();

console.log("After rebalancing:");
prettyPrint(bst.root);
console.log("Balanced?", bst.isBalanced());

console.log("Level-order:");
bst.levelOrder((node) => console.log(node.value)); 

console.log("Pre-order:");
bst.preOrder((node) => console.log(node.value)); 

console.log("Post-order:");
bst.postOrder((node) => console.log(node.value)); 

console.log("In-order:");
bst.inOrder((node) => console.log(node.value)); 
