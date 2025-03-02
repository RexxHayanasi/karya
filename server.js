const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const karyaRoutes = require("./server/routes/karyaRoutes");

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/karya", karyaRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
