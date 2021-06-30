import React from 'react'

import SchermataOperazioneCompletata from '../Utility/SchermataOperazioneCompletata';

export default function SchermataPrenotazioneCompletata() {
    return (
        <SchermataOperazioneCompletata
            imagePath={"/assets/svg/prenotazione-success.svg"}
            imageAlt={"Prenotazione completata"}
            title={"Prenotazione effettuata con successo"}
            buttonTo={"/gestione-prenotazioni"}
            buttonLabel={"Le mie prenotazioni"}>
            Abbiamo inviato una email al tuo indirizzo di posta elettronica contenente il riepilogo
            e la fattura della prenotazione appena efftuata.
        </SchermataOperazioneCompletata>
    );
}