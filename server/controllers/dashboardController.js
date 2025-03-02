const User = require("../models/userModel");
const Donasi = require("../models/donasiModel");
const Karya = require("../models/karyaModel");

exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.session.userId;

        // Ambil data kreator
        const user = await User.findByPk(userId, {
            include: [
                { model: Donasi, as: "donasi" },
                { model: Karya, as: "karya" },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Hitung total donasi
        const totalDonasi = user.donasi.reduce((sum, donasi) => sum + donasi.jumlah, 0);
        
        // Hitung jumlah karya yang diunggah
        const totalKarya = user.karya.length;

        // Kirim data ke dashboard
        res.render("dashboard", {
            username: user.username,
            totalDonasi,
            totalKarya,
            followers: user.followers,
        });

    } catch (error) {
        console.error("Error mengambil data dashboard:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
