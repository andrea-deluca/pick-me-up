import React from 'react';

import SchermataOperazioneCompletata from '../../Utility/SchermataOperazioneCompletata';

// Schermata Conferma Registrazione
export default function SchermataConfermaRegistrazione() {
    return (
        <SchermataOperazioneCompletata
            imagePath={"/assets/svg/verifica-success.svg"}
            imageAlt={"Verifica completata"}
            title={"Account verificato con successo"}
            buttonTo={"/login"}
            buttonLabel={"Accedi"}>
            La tua email e la tua registrazione sono stati verificati con successo<br/>Procedi con l'accesso.
        </SchermataOperazioneCompletata>
    );
}