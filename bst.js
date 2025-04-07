class Node {
constructor(data,left=null, right=null){
this.left=left;
this.right=right;
this.data=data;
}
}  //end of node class
class Tree {
	constructor(array){
		 this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
	}
	buildTree(array){
		if (array.length == 0) return null
		let mid = Math.floor(array.length/2);
		const root = new Node(array[mid]);
		root.left = this.buildTree(array.slice(0, mid));
		root.right=this.buildTree(array.slice(mid+1));
		return root;
	}	
	insert(value){
	if (root === null) return new Node(value);
	if(value<root.left) this.insert(value, root.left);
	else if (value>root.right) this.insert(value, root.right);
	return root;
	}
	
	delete(value, root=this.root){
		if(root === null) return null; // no children
		if(value< root.data) root.left= this.delete(value, root.left); //one child
		else if(value> root.data) root.right=this.delete(value, root.right); //one child
		else { 
			if (root.left==null) return root.right;
			if(root.right==null) return root.left;
		}
	}
	find(value, root=this.root){
		if(root===null) return null;
		if (value== root.data) return root;
		if(value<root.data) return this.find(value, root.left)
		return this.find(value, root.right);
	}
	levelOrder(callback){
	if(typeof callbacl !== "function") {
		throw new error("A callback function is required");
	}
		const queue = [this.root];
		while (queue.length > 0) {
			const current=queue.shift();
			callback(current);
			if (current.left) queue.push(current.left);
			if(current.right)queue.push(current.right);
		}
	}
	inOrder(callback, node = this.root){
		if(typeof callback != "function")  throw new Error ("Cllaback function is required");
		if (node){
		this.inOrder(callback, node.left);
		callback(node);
		this.inOrder(callback, node.right);
		}
	}
	preOrder(callback, node=this.root){
		if(typeof callback !== "function") throw new Error("Callback function is equired");
		callback(node); //call on current node
		this.preOrder(callback, node.left); // recurse on left child
		this.preOrder(callback, node.right); // recurse on right child
	}
	postOrder(callback, node= this.root) {
		if (node == null) return;
		if(typeof callback !== "function") throw new Error("callback function is required");
		this.postOrder(callback,node.left)
		this.postOrder(callback, node.right);
		callback(node)
	}
	height(node=this.root) {
		if (node === null)  return -1; // base case
		const leftHeight=this.height(node.left);
		const rightHeight=this.height(node.right);
		return Math.max(leftHeight, rightHeight)+1;
	}
	depth(node, current=this.root, currentDepth=0){
		if (current===null) return -1;  // base case
		if(current===node) return currentDepth;
		// search in left subtree
		const left = this.depth(node, current.left, currentDepth+1);
		if(left !==-1) return left;
		//serach in right subtree
		return this.depth(node, current.right, currentDepth+1);
	}

	isBalanced(node=this.root){

	if(node==null) return null;
	const leftHeight=this.isBalanced(node.left);
	if (leftHeight == -1) return -1;
	const rightHeight = this.isBalanced(node.right);
	if(rightHeight == -1) return -1;
	if(Math.abs(leftHeight-rightHeight) > 1) return -1;
	return Math.max(leftHeight, rightHeight) +1;
	}

	checkBalanced(){
	return this.isBalanced() !== -1;
	}
	inorderTraversal(node=this.root, result=[]) {
		if (node == null) return result;
		this.inorderTraversal(node.left, result);
		result.push(node.data);
		this.inorderTraversal(node.right, result);
		return result;
	} // inorder traversal
	rebalance() {
		let sortedValues=this.inorderTraversal(); // get sorted array of the tree
		this.root = this.buildTree(sortedValues); // rebuild tree with sorted array
	}
	 prettyPrint = (node, prefix = "", isLeft = true) => {
		    if (node === null) {
			         return;
			       }
		    if (node.right !== null) {
			         prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
			       }
		    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		    if (node.left !== null) {
			         prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
			       }
		  }

} //end of tree class
values=[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree=new Tree(values);
console.log("initial tree");
const height = tree.height()
const depth=tree.depth(tree.root.left.right);
console.log(depth);
if (tree.checkBalanced()) console.log("tree is balanced");
else console.log("tree is not balanced");
tree.rebalance();
console.log("is tree rebalanced: " + tree.checkBalanced());
//console.log("height of tree is " + height);
//tree.postOrder((node)=>{  console.log(node.data)});
