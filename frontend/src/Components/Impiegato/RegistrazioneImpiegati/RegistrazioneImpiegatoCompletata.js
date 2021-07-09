import React from 'react';

// Custom Components
import SchermataOperazioneCompletata from '../../Utility/SchermataOperazioneCompletata';

// Schermata Registrazione Completata
export default function RegistrazioneImpiegatoCompletata() {
    return (
        <SchermataOperazioneCompletata
            imagePath={"/assets/svg/signup-success.svg"}
            imageAlt={"Registrazione impiegato completata"}
            title={"Registrazione impiegato completata"}
            buttonTo={"/registrazione-impiegato"}
            buttonLabel={"Registra impiegato"}>
            Registrazione impiegato completata con successo. È stata inviata un email al nuovo
            impiegato per informarlo dell'avvenuta registrazione.
        </SchermataOperazioneCompletata>
    );
}