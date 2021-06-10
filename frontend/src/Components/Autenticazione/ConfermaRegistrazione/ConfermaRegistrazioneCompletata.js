import React from 'react';

import SchermataOperazioneCompletata from '../SchermataOperazioneCompletata';

// Schermata Recupero Password Completato
export default function RecuperoPasswordCompletato() {
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