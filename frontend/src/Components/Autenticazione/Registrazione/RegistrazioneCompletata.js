import React from 'react';

import SchermataOperazioneCompletata from '../../SchermataOperazioneCompletata';

export default function RegistrazioneCompletata() {
    return (
        <SchermataOperazioneCompletata
            imagePath={"/assets/svg/signup-success.svg"}
            imageAlt={"Registrazione completata"}
            title={"Registrazione completata"}
            buttonTo={"/login"}
            buttonLabel={"Accedi"}>
            Abbiamo inviato una email al tuo indirizzo di posta elettronica per la verifica
            della tua email e della registrazione.<br/>Prima di accedere procedi con la verifica.
        </SchermataOperazioneCompletata>
    );
}