const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database error:", err));

module.exports = sequelize;
