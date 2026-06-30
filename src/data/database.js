const sqlite3 = require("sqlite3");
const { open } = require("sqlite")

async function connectDB() {
    const db = await open({
        filename: "./src/data/database.db",
        driver: sqlite3.Database
    })

    return db;
}

module.exports = {
    connectDB
};