const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const karyaRoutes = require("./server/routes/karyaRoutes");
const dashboardRoutes = require("./server/routes/dashboardRoutes");

dotenv.config();

const app = express();

// Setup view engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Pastikan folder views ada

// Middleware untuk parsing request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Setup session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "defaultsecret",
        resave: false,
        saveUninitialized: false,
    })
);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/karya", karyaRoutes);
app.use("/dashboard", dashboardRoutes);

// Route utama
app.get("/", (req, res) => {
    res.render("index"); // Pastikan views/index.ejs ada
});

// Server untuk Vercel
module.exports = app;
