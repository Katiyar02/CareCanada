const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Allow requests from frontend

// ✅ Connect to AWS RDS MySQL Database
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// ✅ Test Database Connection
async function testDBConnection() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Connected to AWS RDS MySQL Database");
        connection.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
}
testDBConnection();

// ✅ Sample Route to Check Connection
app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await db.query("SHOW TABLES");
        res.json({ success: true, tables: rows });
    } catch (error) {
        res.status(500).json({ error: "Database connection failed", message: error.message });
    }
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
