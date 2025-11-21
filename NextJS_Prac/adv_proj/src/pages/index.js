import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  async function addCategory() {
    if (!name) return;
    try {
      const res = await axios.post("/api/categories", { name });
      setCategories(res.data);
      setName("");
    } catch (err) {
      console.error("Failed to add category", err);
    }
  }

  return (
    <>
      <Head>
        <title>proj</title>
        <meta name="description" content="This is my Next.js project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
        <h1 className="text-4xl font-bold text-center mb-4 max-w-lg">
          Welcome to Our Website!
        </h1>
        <p className="text-zinc-600 text-center mb-10 max-w-md">
          Get started by logging in or creating a new account.
        </p>

        <div className="flex gap-4 mb-6">
          <a href="/login" className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition">
            Login
          </a>
          <a href="/register" className="px-6 py-3 border border-black rounded-lg font-medium hover:bg-zinc-100 transition">
            Register
          </a>
        </div>

        {/* Add Category Form */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New category"
            className="border border-zinc-300 p-2 rounded-lg"
          />
          <button
            onClick={addCategory}
            className="bg-black text-white px-4 rounded-lg hover:bg-zinc-800 transition"
          >
            Add
          </button>
        </div>

        {/* Categories List */}
        <ul className="w-full max-w-sm space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="border border-zinc-200 p-2 rounded">
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
