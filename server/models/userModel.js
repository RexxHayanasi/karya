const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Donasi = require("./donasiModel");
const Karya = require("./karyaModel");

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
    followers: {  // Tambahkan kolom followers
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

// Relasi dengan Karya
User.hasMany(Karya, { foreignKey: "userId", as: "karya" });
Karya.belongsTo(User, { foreignKey: "userId", as: "kreator" });

// Relasi dengan Donasi
User.hasMany(Donasi, { foreignKey: "userId", as: "donasi" });
Donasi.belongsTo(User, { foreignKey: "userId", as: "kreator" });

module.exports = User;
