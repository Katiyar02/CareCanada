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
        const [rows] = await db.query(`
            SELECT d.doctor_id, d.name, d.speciality, d.gender, d.experience, d.status, 
                   d.identification, d.phone, d.email, d.wait_time, 
                   h.name AS hospital_name , COUNT(a.patient_id) AS patient_count
            FROM Doctor d
            left JOIN Hospital h ON d.hospital_id = h.hospital_id
            LEFT JOIN Appointment a ON d.doctor_id = a.doctor_id
            where d.is_deleted = 'N' and a.status = 'Scheduled'
            GROUP BY h.name, d.doctor_id
            ORDER BY h.name, patient_count DESC;
        `);
        res.json({ success: true, doctors: rows });
    } catch (error) {
        console.error("❌ Error fetching doctors:", error.message);
        res.status(500).json({ success: false, error: "Failed to fetch doctors" });
    }
});

function haversineDistance(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (degrees) => degrees * (Math.PI / 180);
  
    const R = 6371; // Earth's radius in kilometers
  
    // Convert latitude and longitude to radians
    const radLat1 = toRadians(lat1);
    const radLon1 = toRadians(lon1);
    const radLat2 = toRadians(lat2);
    const radLon2 = toRadians(lon2);
  
    // Differences in latitude and longitude
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
  
    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radLat1) * Math.cos(radLat2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Distance in kilometers
    const distance = R * c;
    return distance;
  }

  // Define a route to get doctors within 100 km of a reference point
  app.get('/api/hospitalsWithin', async (req, res) => {
    const { latitude, longitude, selectedSpeciality, radius } = req.query;  // Access latitude and longitude from query parameters
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
  
    const referenceLat = latitude;  // Example: Toronto's latitude
    const referenceLon = longitude;  // Example: Toronto's longitude
    doctor_results = []
    try {
      // Query all hospitals from the MySQL database using await
      const [results] = await db.query('SELECT * FROM Hospital');
  
      const hospitalsWithin100km = [];
  
      // Loop through each hospital and calculate the distance
      for (const hospital of results) {
        const lat = hospital.latitude;
        const lon = hospital.longitude;
  
        if (lat && lon) {
          const distance = haversineDistance(lat, lon, referenceLat, referenceLon);
  
          if (distance <= 10000000) {
            const [doctor_results_within] =  await db.query("SELECT d.doctor_id, d.name, \
                d.speciality, d.gender, d.experience, d.status, \
                   d.identification, d.phone, d.email, d.wait_time, \
                   h.name AS hospital_name , COUNT(a.patient_id) AS patient_count\
            FROM Doctor d\
            left JOIN Hospital h ON d.hospital_id = h.hospital_id\
            LEFT JOIN Appointment a ON d.doctor_id = a.doctor_id\
            where d.is_deleted = 'N' and a.status = 'Scheduled'\
            and h.hospital_id = "+hospital.hospital_id+" \
            and speciality = \""+selectedSpeciality+"\" \
            GROUP BY h.name, d.doctor_id \
            ORDER BY h.name, patient_count DESC;");
            for (const doctor of doctor_results_within) 
                doctor_results.push({
                 Doctor_name: doctor.name,
                  Wait_time: doctor.wait_time * doctor.patient_count,
                  distance: distance.toFixed(2),
                  hospital_name: hospital.name,
                });
          }
          
        }
      }
  
      // Send the results back as a JSON response
      res.json(doctor_results);
    } catch (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  


// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
