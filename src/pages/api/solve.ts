import type { NextApiRequest, NextApiResponse } from 'next';

type TraversalType = 'inorder' | 'preorder' | 'postorder';

interface SolveRequest {
  data: string[];
  traversal: TraversalType;
}

interface SolveResponse {
  result: string[];
}

const solveHandler = (req: NextApiRequest, res: NextApiResponse<SolveResponse>) => {
  if (req.method === 'POST') {
    const { data, traversal } = req.body as SolveRequest;

    const result = data;

    res.status(200).json({ result });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default solveHandler;
