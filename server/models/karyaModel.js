const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./userModel");

const Karya = sequelize.define("Karya", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
});

User.hasMany(Karya, { foreignKey: "userId" });
Karya.belongsTo(User, { foreignKey: "userId" });

module.exports = Karya;
