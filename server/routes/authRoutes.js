const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ username, email, password: hashedPassword });
        res.redirect("/login");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Email atau password salah");
    }
    req.session.userId = user.id;
    res.redirect("/dashboard");
});

module.exports = router;
