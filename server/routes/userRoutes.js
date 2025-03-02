const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send("User tidak ditemukan");
        res.json(user);
    } catch (error) {
        res.status(500).send("Terjadi kesalahan server");
    }
});

module.exports = router;
