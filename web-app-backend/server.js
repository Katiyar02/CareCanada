const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());
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

// Endpoint to send email
app.post("/api/send-email", (req, res) => {
    const { to, subject, text } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "canadacare08@gmail.com", // Replace with your email
        pass: "hazd gckp fvar oxyz", // Replace with your email password
      },
    });
  
    const mailOptions = {
      from: "canadacare08@gmail.com",
      to,
      subject,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.json({ success: true, message: "Email sent successfully" });
      }
    });
  });
  
  

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
// ✅ API to Get Important Hospital Details
app.get("/api/hospitals/important", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT hospital_id, name, city, phone, has_emergency, type
            FROM Hospital
            WHERE is_deleted = 'N'
        `);
        res.json({ success: true, hospitals: rows });
    } catch (error) {
        console.error("❌ Error fetching hospitals:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch hospitals" });
    }
});



app.post("/api/doctors", async (req, res) => {
    try {
        const { hospital_id, name, speciality, gender, experience, status, identification, phone, email, wait_time } = req.body;

        const sql = `INSERT INTO Doctor (hospital_id, name, speciality, gender, experience, status, identification, phone, email, wait_time, is_deleted) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N')`;

        await db.query(sql, [hospital_id, name, speciality, gender, experience, status, identification, phone, email, wait_time]);

        res.json({ success: true, message: "Doctor added successfully!" });
    } catch (error) {
        console.error("❌ Error adding doctor:", error);
        res.status(500).json({ success: false, error: "Failed to add doctor" });
    }
});
// ✅ API to Get All Doctors
app.get("/api/doctors", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT d.doctor_id, d.name, d.speciality, d.gender, d.experience, d.status, 
                   d.identification, d.phone, d.email, d.wait_time, 
                   h.name AS hospital_name
            FROM Doctor d
            JOIN Hospital h ON d.hospital_id = h.hospital_id
            WHERE d.is_deleted = 'N'
        `);
        res.json({ success: true, doctors: rows });
    } catch (error) {
        console.error("❌ Error fetching doctors:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch doctors" });
    }
});


// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
