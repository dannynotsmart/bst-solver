import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState("");
  const [inorderResult, setInorderResult] = useState<string[]>([]);
  const [preorderResult, setPreorderResult] = useState<string[]>([]);
  const [postorderResult, setPostorderResult] = useState<string[]>([]);

  const handleSolve = async () => {
    const dataArray = data.split(" ");

    try {
      const inorderResponse = await axios.post("/api/solve", {
        data: dataArray,
        traversal: "inorder"
      });
      setInorderResult(inorderResponse.data.result);

      const preorderResponse = await axios.post("/api/solve", {
        data: dataArray,
        traversal: "preorder"
      });
      setPreorderResult(preorderResponse.data.result);

      const postorderResponse = await axios.post("/api/solve", {
        data: dataArray,
        traversal: "postorder"
      });
      setPostorderResult(postorderResponse.data.result);
    } catch (error) {
      console.error("Error solving the BST:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Binary Search Tree Solver</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Link href="https://github.com/dannynotsmart/bst-solver"><h1 className="text-2xl font-bold mb-4">Binary Search Tree Solver</h1></Link>
        <input
          type="text"
          className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter BST data (space separated)"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleSolve}
        >
          Solve
        </button>
        <div className="w-full max-w-md">
          <p className="font-semibold">Inorder:</p>
          <p className="mb-2">{inorderResult.join(" ")}</p>
          <p className="font-semibold">Preorder:</p>
          <p className="mb-2">{preorderResult.join(" ")}</p>
          <p className="font-semibold">Postorder:</p>
          <p>{postorderResult.join(" ")}</p>
        </div>
      </main>
    </>
  );
}
