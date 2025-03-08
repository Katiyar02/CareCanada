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

// ✅ API to Insert a New Hospital
app.post("/api/hospitals", async (req, res) => {
    try {
        const {
            name,
            address,
            city,
            province,
            postal_code,
            phone,
            has_emergency,
            type,
            email,
            website
        } = req.body;

        console.log("Received Data (Backend):", req.body); // 🛠 Debugging Step

        // ✅ Ensure has_emergency is stored as a number (1 for Yes, 0 for No)
        const hasEmergencyValue = parseInt(has_emergency, 10) === 1 ? 1 : 0;

        console.log("Processed has_emergency Value:", hasEmergencyValue); // Debugging Step

        // SQL Query
        const sql = `
            INSERT INTO Hospital (name, address, city, province, postal_code, phone, has_emergency, type, email, website, is_deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N')`;

        // Execute Query
        const [result] = await db.query(sql, [
            name, address, city, province, postal_code, phone, hasEmergencyValue, type, email, website
        ]);

        res.json({ success: true, message: "Hospital added successfully!", hospital_id: result.insertId });

    } catch (error) {
        console.error("❌ Error adding hospital:", error.message);
        res.status(500).json({ success: false, error: "Failed to add hospital" });
    }
});






// ✅ API to Get All Hospitals
app.get("/api/hospitals", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Hospital WHERE is_deleted = 'N'");
        res.json({ success: true, hospitals: rows });
    } catch (error) {
        console.error("❌ Error fetching hospitals:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch hospitals" });
    }
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
