const mongoose = require("mongoose");

// Connection URI
const url = "mongodb+srv://pick-me-up:bytecoders2021!@cluster0.z1tlr.mongodb.net/pick-me-up?retryWrites=true&w=majority"

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

const makeDb = mongoose.connect(url, connectionParams)
    .then(() => {
        console.log("Connected to database ")
        let connection = mongoose.connection;
        console.log(connection.model("Utente"))
    })
    .catch((err) => {
        console.error("Error connecting to the database\n" + err);
    })


