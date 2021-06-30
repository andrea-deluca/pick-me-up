const { jsPDF } = require("jspdf")
const mailModel = require("./Mail")
const logoConfig = require("../public/images/logo")

module.exports = {
    generaConfermaPrenotazione: async function (data) {
        const doc = new jsPDF()

        //immagine base64
        var img = logoConfig.logo.uri
        doc.addImage(img, 'png', 10, 10, 65, 18)
        doc.setFontSize(18)
        doc.text("Grazie per la tua prenotazione", 10, 40)
        doc.setFontSize(10)
        doc.text(
            `ID PRENOTAZIONE: ${data.prenotazione._id}\nPrenotazione effettuata ${new Date(data.dataPrenotazione).toLocaleString("it-IT")}`, 10, 45)
        doc.setFontSize(16)
        doc.text("Dati dell'utente", 10, 60)
        doc.setFontSize(10)
        doc.text(
            `ID UTENTE: ${data.utente._id}\nNOME E COGNOME: ${data.utente.nome} ${data.utente.cognome}\nDATA DI NASCITA: ${data.utente.dataNascita}\nLUOGO DI NASCITA: ${data.utente.luogoNascita.nazione}\nCODICE FISCALE: ${data.utente.codiceFiscale}\nCELLULARE: ${data.utente.credenziali.cellulare}\nEMAIL: ${data.utente.credenziali.email}`, 10, 70)
        doc.setFontSize(14)
        doc.text("Patente", 10, 110)
        doc.setFontSize(10)
        doc.text(
            `PATENTE: ${data.utente.patente.tipologiaPatente}\nNUMERO: ${data.utente.patente.numeroPatente}\nDATA DI SCADENZA: ${data.utente.patente.dataScadenza}\nUFFICIO DI RILASCIO: ${data.utente.patente.ufficioRilascio}\n`, 10, 120)
        doc.setFontSize(16)
        doc.text("Dati della prenotazione", 10, 150)
        doc.setFontSize(10)
        doc.text(
            `TIPOLOGIA MEZZO: ${data.prenotazione.mezzo.tipologia}\nDETTAGLI: ${data.prenotazione.mezzo.marca} ${data.prenotazione.mezzo.modello} (Cod.${data.prenotazione.mezzo.code}), ${data.prenotazione.mezzo.posti} posti, ${data.prenotazione.mezzo.carburante}, cambio ${data.prenotazione.mezzo.cambio}\nRITIRO: ${new Date(data.prenotazione.ritiro.data).toLocaleString("it-IT")} presso ${data.prenotazione.ritiro.nome}\nCONSEGNA: ${new Date(data.prenotazione.consegna.data).toLocaleString("it-IT")} presso ${data.prenotazione.consegna.nome}`, 10, 160)
        doc.setFontSize(16)
        doc.text("Dettagli pagamento", 10, 190)
        doc.setFontSize(10)
        doc.text(
            `TARIFFA ORARIA: € ${data.prenotazione.mezzo.tariffa}\nTOTALE IMPORTO: € ${data.prenotazione.pagamento.importoTotale}\n`, 10, 200)
        doc.setFontSize(14)
        doc.text("Metodo di pagamento", 10, 220)
        doc.setFontSize(10)
        doc.text(
            `TITOLARE: ${data.utente.metodiPagamento.titolare}\nNUMERO: ${data.utente.metodiPagamento.numeroCarta}\nDATA DI SCADENZA: ${data.utente.metodiPagamento.dataScadenzaCarta}\nCVV: ${data.utente.metodiPagamento.cvv}\n`, 10, 230)
        doc.save(`./public/pdf/${data.prenotazione._id}.pdf`)
        mailModel.inviaConfermaPrenotazione({
            email: data.utente.credenziali.email,
            prenotazione: data.prenotazione._id
        })
    },

    generaAnnullaPrenotazione: async function (data) {
        const doc = new jsPDF()

        //immagine base64
        var img = logoConfig.logo.uri
        doc.addImage(img, 'png', 10, 10, 65, 18)
        doc.setFontSize(18)
        doc.text("Prenotazione annullata", 10, 40)
        doc.setFontSize(10)
        doc.text(
            `ID PRENOTAZIONE: ${data.prenotazione._id}\nPrenotazione effettuata ${(new Date(data.prenotazione.dataPrenotazione)).toLocaleString("it-IT")}\nPrenotazione annullata ${new Date().toLocaleString("it-IT")}`, 10, 45)
        doc.setFontSize(16)
        doc.text("Dati dell'utente", 10, 70)
        doc.setFontSize(10)
        doc.text(
            `ID UTENTE: ${data.utente.id}\nNOME E COGNOME: ${data.utente.nome} ${data.utente.cognome}\nCODICE FISCALE: ${data.utente.codiceFiscale}\nCELLULARE: ${data.utente.cellulare}\nEMAIL: ${data.utente.email}`, 10, 80)
        doc.setFontSize(14)
        doc.setFontSize(16)
        doc.text("Dati della prenotazione", 10, 110)
        doc.setFontSize(10)
        doc.text(
            `TIPOLOGIA MEZZO: ${data.prenotazione.mezzo.tipologia}\nDETTAGLI: ${data.prenotazione.mezzo.marca} ${data.prenotazione.mezzo.modello} (Cod.${data.prenotazione.mezzo.code}), ${data.prenotazione.mezzo.posti} posti, ${data.prenotazione.mezzo.carburante}, cambio ${data.prenotazione.mezzo.cambio}\nRITIRO: ${new Date(data.prenotazione.ritiro.data).toLocaleString("it-IT")} presso ${data.prenotazione.ritiro.nome}\nCONSEGNA: ${new Date(data.prenotazione.consegna.data).toLocaleString("it-IT")} presso ${data.prenotazione.consegna.nome}`, 10, 120)
        doc.setFontSize(16)
        doc.text("Dettagli pagamento", 10, 150)
        doc.setFontSize(10)
        doc.text(
            `TARIFFA ORARIA: € ${data.prenotazione.mezzo.tariffa}\nTOTALE IMPORTO RIMBORSATO: € ${data.prenotazione.pagamento.importoTotale}\n`, 10, 160)
        doc.setFontSize(14)
        doc.text("Metodo di pagamento", 10, 190)
        doc.setFontSize(10)
        doc.text(
            `TITOLARE: ${data.utente.metodoPagamento.titolare}\nNUMERO: ${data.utente.metodoPagamento.numeroCarta}\nDATA DI SCADENZA: ${new Date(data.utente.metodoPagamento.dataScadenzaCarta).toLocaleDateString("it-IT")}\nCVV: ${data.utente.metodoPagamento.cvv}\n`, 10, 200)
        doc.save(`./public/pdf/${data.prenotazione._id}.pdf`)
        mailModel.inviaAnnullaPrenotazione({
            email: data.utente.email,
            prenotazione: data.prenotazione._id
        })
    },

    generaModificaPrenotazione: async function (data) {
        const doc = new jsPDF()

        //immagine base64
        var img = logoConfig.logo.uri
        doc.addImage(img, 'png', 10, 10, 65, 18)
        doc.setFontSize(18)
        doc.text("Prenotazione modificata", 10, 40)
        doc.setFontSize(10)
        doc.text(
            `ID PRENOTAZIONE: ${data.prenotazione._id}\nPrenotazione effettuata ${(new Date(data.prenotazione.dataPrenotazione)).toLocaleString("it-IT")}`, 10, 45)
        doc.setFontSize(16)
        doc.text("Dati dell'utente", 10, 70)
        doc.setFontSize(10)
        doc.text(
            `ID UTENTE: ${data.utente.id}\nNOME E COGNOME: ${data.utente.nome} ${data.utente.cognome}\nCODICE FISCALE: ${data.utente.codiceFiscale}\nCELLULARE: ${data.utente.cellulare}\nEMAIL: ${data.utente.email}`, 10, 80)
        doc.setFontSize(14)
        doc.setFontSize(16)
        doc.text("Dati della prenotazione", 10, 110)
        doc.setFontSize(10)
        doc.text(
            `TIPOLOGIA MEZZO: ${data.prenotazione.mezzo.tipologia}\nDETTAGLI: ${data.prenotazione.mezzo.marca} ${data.prenotazione.mezzo.modello} (Cod.${data.prenotazione.mezzo.code}), ${data.prenotazione.mezzo.posti} posti, ${data.prenotazione.mezzo.carburante}, cambio ${data.prenotazione.mezzo.cambio}\nRITIRO: ${new Date(data.prenotazione.ritiro.data).toLocaleString("it-IT")} presso ${data.prenotazione.ritiro.nome}\nCONSEGNA: ${new Date(data.prenotazione.consegna.data).toLocaleString("it-IT")} presso ${data.prenotazione.consegna.nome}`, 10, 120)
        doc.setFontSize(16)
        doc.text("Dettagli pagamento", 10, 150)
        doc.setFontSize(10)
        doc.text(
            `TARIFFA ORARIA: € ${data.prenotazione.mezzo.tariffa}\nTOTALE IMPORTO AGGIORNATO: € ${data.prenotazione.pagamento.importoTotale}\nDIFFERENZA: € ${data.differenzaImporto}`, 10, 160)
        doc.setFontSize(14)
        doc.text("Metodo di pagamento", 10, 190)
        doc.setFontSize(10)
        doc.text(
            `TITOLARE: ${data.utente.metodoPagamento.titolare}\nNUMERO: ${data.utente.metodoPagamento.numeroCarta}\nDATA DI SCADENZA: ${new Date(data.utente.metodoPagamento.dataScadenzaCarta).toLocaleDateString("it-IT")}\nCVV: ${data.utente.metodoPagamento.cvv}\n`, 10, 200)
        doc.save(`./public/pdf/${data.prenotazione._id}.pdf`)
        mailModel.inviaModificaPrenotazione({
            email: data.utente.email,
            prenotazione: data.prenotazione._id
        })
    }
}