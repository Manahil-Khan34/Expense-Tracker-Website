require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");

const incomeRoutes = require("./routes/incomeRoutes.js");

const expanceRoutes = require("./routes/expanceRoutes.js");

const dashboardRoutes = require("./routes/dashboardRoutes.js");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

connectDB();


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expance", expanceRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

//serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
    res.send('API is running successfully...');
  });
  
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`));
