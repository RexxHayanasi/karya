const express = require("express");
const karyaController = require("../controllers/karyaController");

const router = express.Router();

router.post("/upload", karyaController.uploadKarya);

module.exports = router;
