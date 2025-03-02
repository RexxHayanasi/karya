const Karya = require('../models/karyaModel');
const User = require('../models/userModel');
const Donasi = require('../models/donasiModel');

exports.getDashboard = async (req, res) => {
    try {
        // Ambil semua karya dari user yang sedang login
        const karya = await Karya.findAll({ where: { userId: req.user.id } });

        // Hitung jumlah pengikut kreator
        const kreator = await User.findByPk(req.user.id, { include: 'followers' });
        const totalPengikut = kreator.followers.length;

        // Hitung total donasi kreator
        const totalDonasi = await Donasi.sum('jumlah', { where: { userId: req.user.id } });

        res.render('dashboard', {
            user: req.user,
            karya,
            karyaCount: karya.length,
            totalPengikut,
            totalDonasi: totalDonasi || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Terjadi kesalahan saat mengambil data.");
    }
};
