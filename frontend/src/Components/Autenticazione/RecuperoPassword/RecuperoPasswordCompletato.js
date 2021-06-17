import React from 'react';

import SchermataOperazioneCompletata from '../../Utility/SchermataOperazioneCompletata';

// Schermata Recupero Password Completato
export default function RecuperoPasswordCompletato() {
    return (
        <SchermataOperazioneCompletata
            imagePath={"/assets/svg/email-sent.svg"}
            imageAlt={"Email sent"}
            title={"Recupero password completato"}
            buttonTo={"/login"}
            buttonLabel={"Accedi"}>
            Ti abbiamo inviato una email contenente una nuova password generata dal sistema.
        </SchermataOperazioneCompletata>
    );
}