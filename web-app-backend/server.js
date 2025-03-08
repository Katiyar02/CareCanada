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
            WHERE is_deleted = 'N' ORDER BY hospital_id DESC limit 5 
        `);
        res.json({ success: true, hospitals: rows });
    } catch (error) {
        console.error("❌ Error fetching hospitals:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch hospitals" });
    }
});

app.get("/api/hospitals/emergency", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT hospital_id, name, city, phone, has_emergency, type
            FROM Hospital
            WHERE is_deleted = 'N' and has_emergency = 1 ORDER BY hospital_id DESC limit 5 
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
        console.log("🔍 Fetching doctors with hospital names...");

        const [rows] = await db.query(`
            SELECT d.doctor_id, d.name, d.speciality, d.gender, d.experience, d.status, 
                   d.identification, d.phone, d.email, d.wait_time, 
                   d.hospital_id, COALESCE(h.name, 'Not Assigned') AS hospital_name
            FROM Doctor d
            LEFT JOIN Hospital h ON d.hospital_id = h.hospital_id
            WHERE d.is_deleted = 'N'
        `);

        console.log("✅ Doctors fetched:", rows);
        res.json({ success: true, doctors: rows });

    } catch (error) {
        console.error("❌ Error fetching doctors:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch doctors" });
    }
});




// ✅ API to Update Doctor Details
app.put("/api/doctors/:doctor_id", async (req, res) => {
    try {
        const { doctor_id } = req.params;
        const { hospital_id, name, speciality, gender, experience, status, identification, phone, email, wait_time } = req.body;

        // 🔹 Check if Doctor Exists
        const [doctor] = await db.query("SELECT * FROM Doctor WHERE doctor_id = ?", [doctor_id]);
        if (doctor.length === 0) {
            return res.status(404).json({ success: false, message: "Doctor not found!" });
        }

        // 🔹 Update Doctor Details
        const sql = `
            UPDATE Doctor 
            SET hospital_id = ?, name = ?, speciality = ?, gender = ?, experience = ?, status = ?, 
                identification = ?, phone = ?, email = ?, wait_time = ?
            WHERE doctor_id = ?`;

        await db.query(sql, [hospital_id, name, speciality, gender, experience, status, identification, phone, email, wait_time, doctor_id]);

        res.json({ success: true, message: "Doctor details updated successfully!" });
    } catch (error) {
        console.error("❌ Error updating doctor details:", error);
        res.status(500).json({ success: false, error: "Failed to update doctor details" });
    }
});

// ✅ User Signup API (Admin & Patient)
app.post("/api/signup", async (req, res) => {
    try {
        const { name, dob, gender, phone, email, address, emergency_contact, emergency_name, emergency_relation, postal_code, password, is_admin } = req.body;

        // 🔹 Check if email already exists
        const [existingUser] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "Email already exists!" });
        }

        // 🔹 Insert User into Database
        const sql = `INSERT INTO Users (name, dob, gender, phone, email, address, emergency_contact, emergency_name, emergency_relation, postal_code, password, is_admin, is_deleted) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N')`;

        await db.query(sql, [name, dob, gender, phone, email, address, emergency_contact, emergency_name, emergency_relation, postal_code, password, is_admin]);

        res.json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("❌ Error signing up:", error);
        res.status(500).json({ success: false, error: "Failed to register user" });
    }
});

// ✅ User Login API
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Check if User Exists
        const [user] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(401).json({ success: false, message: "User not found!" });
        }

        const validUser = user[0];

        // 🔹 Check Password (No Hashing)
        if (validUser.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid password!" });
        }

        res.json({ success: true, message: "Login successful!", user: validUser });
    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ success: false, error: "Login failed" });
    }
});

// ✅ Get User Profile (Admin & Patient)
app.get("/api/profile/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const [user] = await db.query("SELECT * FROM Users WHERE user_id = ?", [user_id]);

        if (user.length === 0) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        res.json({ success: true, user: user[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch user profile" });
    }
});

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
