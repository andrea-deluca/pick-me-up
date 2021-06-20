const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");

module.exports = {
    registraUtente: async function (datiUtente, callback) {
        const db = await makeDb(config);
        try {
            //Controllo se esiste un account associato all'email fornita
            db.collection("Utente").findOne({
                "credenziali.email": datiUtente.credenziali.email
            }, (err, result) =>{
                if (err) throw err;
                // Se non esiste un account, effettuo registrazione
                if (!result) {
                    results = db.collection("Utente").insertOne({...datiUtente, verificato: false})
                        .catch(err => { throw createError(500) });
                    return (callback(201))
                } else {
                    return (callback(400))
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}