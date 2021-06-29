const { jsPDF } = require("jspdf")
const mailModel = require("./Mail")

module.exports = {
    generaConfermaPrenotazione: async function (data) {
        const doc = new jsPDF()

        doc.setFontSize(36)
        doc.text("PickMeUp!", 10, 20)
        doc.setFontSize(18)
        doc.text("Grazie per la tua prenotazione", 10, 30)
        doc.setFontSize(10)
        doc.text(`ID PRENOTAZIONE: ${data.prenotazione._id}\nPrenotazione effettuata ${(new Date()).toLocaleDateString("it-IT")}`, 10, 35)
        doc.setFontSize(16)
        doc.text("Dati dell'utente", 10, 50)
        doc.setFontSize(10)
        doc.text(
            `ID UTENTE: ${data.utente._id}\nNOME E COGNOME: ${data.utente.nome} ${data.utente.cognome}\nDATA DI NASCITA: ${data.utente.dataNascita}\nLUOGO DI NASCITA: ${data.utente.luogoNascita.nazione}\nCODICE FISCALE: ${data.utente.codiceFiscale}\nCELLULARE: ${data.utente.credenziali.cellulare}\nEMAIL: ${data.utente.credenziali.email}`, 10, 60)
        doc.setFontSize(14)
        doc.text("Patente", 10, 100)
        doc.setFontSize(10)
        doc.text(
            `PATENTE: ${data.utente.patente.tipologiaPatente}\nNUMERO: ${data.utente.patente.numeroPatente}\nDATA DI SCADENZA: ${data.utente.patente.dataScadenza}\nUFFICIO DI RILASCIO: ${data.utente.patente.ufficioRilascio}\n`, 10, 110)
        doc.setFontSize(16)
        doc.text("Dati della prenotazione", 10, 140)
        doc.setFontSize(10)
        doc.text(
            `TIPOLOGIA MEZZO: ${data.prenotazione.mezzo.tipologia}\nDETTAGLI: ${data.prenotazione.mezzo.marca} ${data.prenotazione.mezzo.modello}, ${data.prenotazione.mezzo.posti} posti, ${data.prenotazione.mezzo.carburante}, cambio ${data.prenotazione.mezzo.cambio}\nRITIRO: ${data.prenotazione.ritiro.data} alle ore ${data.prenotazione.ritiro.orario} presso ${data.prenotazione.ritiro.nome}\nCONSEGNA: ${data.prenotazione.consegna.data} alle ore ${data.prenotazione.consegna.orario} presso ${data.prenotazione.consegna.nome}`, 10, 150)
        doc.setFontSize(16)
        doc.text("Dettagli pagamento", 10, 180)
        doc.setFontSize(10)
        doc.text(
            `TARIFFA ORARIA: € ${data.prenotazione.mezzo.tariffa}\nTOTALE IMPORTO: € ${data.prenotazione.pagamento.importoTotale}\n`, 10, 190)
        doc.setFontSize(14)
        doc.text("Metodo di pagamento", 10, 210)
        doc.setFontSize(10)
        doc.text(
            `TITOLARE: ${data.utente.metodiPagamento.titolare}\nNUMERO: ${data.utente.metodiPagamento.numeroCarta}\nDATA DI SCADENZA: ${data.utente.metodiPagamento.dataScadenzaCarta}\nCVV: ${data.utente.metodiPagamento.cvv}\n`, 10, 220)
        doc.save(`./public/${data.prenotazione._id}.pdf`)
        mailModel.inviaConfermaPrenotazione({
            email: data.utente.credenziali.email,
            prenotazione: data.prenotazione._id
        })
    }
}