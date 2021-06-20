const { MongoClient } = require("mongodb");

exports.makeDb = async function (config) {
    const client = new MongoClient(config.uri, config.params)
    try {
        await client.connect();
        const db = client.db(config.database);
        console.log("Connected to database")
        return db;
    } catch (err) {
        console.log(err)
    } 
}