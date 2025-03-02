const Karya = require("../models/karyaModel");

exports.uploadKarya = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const userId = req.session.userId;
        await Karya.create({ title, description, imageUrl, userId });
        res.redirect("/dashboard");
    } catch (error) {
        res.status(400).send(error.message);
    }
};
