import { query } from "@/helpers/dbconnection";

export default async function handler(req, res) {
    if(req.method == "GET") {
        return getAllCategories(req, res);
    } else if (req.method == "POST") {
        return insertCategory(req, res);
    }

    res.status(405).json({ error: "Method Not Allowed" });
}

async function insertCategory(req, res) {
  const { name } = req.body;

  try {
    await query("INSERT INTO categories (name) VALUES (?)", [name]);
    const rows = await query("SELECT * FROM categories");
    res.status(201).json(rows);
  } catch (err) {
    console.error(err); // log actual error for debugging
    res.status(500).json({ error: "Database connection failed." });
  }
}

async function getAllCategories(req, res) {
  try {
    const rows = await query("SELECT * FROM categories");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed." });
  }
}
