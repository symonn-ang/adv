import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",       // your MySQL password
    database: "adv_proj1",  // your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function query(sql, params) {
    const [rows] = await pool.execute(sql, params); // destructure rows here
    return rows;
}

export { query, pool };
