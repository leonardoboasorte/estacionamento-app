const mongoose = require("mongoose")

function connectToDatabase() {
    mongoose.connect(process.env.DATABASE_URL)
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log ("Conectado ao banco de dados"))
}

module.exports = connectToDatabase;