const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Donasi = require("./donasiModel");  // Import model Donasi
const Karya = require("./karyaModel");    // Import model Karya

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// 🔗 **Relasi dengan Karya** (User bisa mengunggah banyak karya)
User.hasMany(Karya, { foreignKey: "userId", as: "karya" });
Karya.belongsTo(User, { foreignKey: "userId", as: "kreator" });

// 🔗 **Relasi dengan Donasi** (User bisa menerima banyak donasi)
User.hasMany(Donasi, { foreignKey: "userId", as: "donasi" });
Donasi.belongsTo(User, { foreignKey: "userId", as: "kreator" });

module.exports = User;
