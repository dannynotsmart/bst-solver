import type { NextApiRequest, NextApiResponse } from 'next';

type TraversalType = 'inorder' | 'preorder' | 'postorder';

interface SolveRequest {
  data: string[];
  traversal: TraversalType;
}

interface SolveResponse {
  result: string[];
}

class TreeNode {
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: string) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const insertNode = (root: TreeNode | null, value: string): TreeNode => {
  if (!root) return new TreeNode(value);
  if (value < root.value) root.left = insertNode(root.left, value);
  else root.right = insertNode(root.right, value);
  return root;
};

const buildBST = (values: string[]): TreeNode | null => {
  let root: TreeNode | null = null;
  values.forEach(value => {
    root = insertNode(root, value);
  });
  return root;
};

const inorderTraversal = (root: TreeNode | null, result: string[] = []): string[] => {
  if (root) {
    inorderTraversal(root.left, result);
    result.push(root.value);
    inorderTraversal(root.right, result);
  }
  return result;
};

const preorderTraversal = (root: TreeNode | null, result: string[] = []): string[] => {
  if (root) {
    result.push(root.value);
    preorderTraversal(root.left, result);
    preorderTraversal(root.right, result);
  }
  return result;
};

const postorderTraversal = (root: TreeNode | null, result: string[] = []): string[] => {
  if (root) {
    postorderTraversal(root.left, result);
    postorderTraversal(root.right, result);
    result.push(root.value);
  }
  return result;
};

const solveHandler = (req: NextApiRequest, res: NextApiResponse<SolveResponse>) => {
  if (req.method === 'POST') {
    const { data, traversal } = req.body as SolveRequest;
    const bstRoot = buildBST(data);

    let result: string[] = [];
    if (traversal === 'inorder') result = inorderTraversal(bstRoot);
    else if (traversal === 'preorder') result = preorderTraversal(bstRoot);
    else if (traversal === 'postorder') result = postorderTraversal(bstRoot);

    res.status(200).json({ result });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default solveHandler;
