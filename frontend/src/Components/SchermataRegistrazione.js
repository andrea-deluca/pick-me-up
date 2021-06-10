import React from 'react';


import View from './Utility/View';
import DatiAnagraficiForm from './Autenticazione/Registrazione/DatiAnagraficiForm';
import RichiestaRegistrazionePatente from './Autenticazione/Registrazione/RichiestaRegistrazionePatente';
import DatiPatenteForm from './Autenticazione/Registrazione/DatiPatenteForm';
import CredenzialiForm from './Autenticazione/Registrazione/CredenzialiForm';
import RegistrazioneCompletata from './Autenticazione/Registrazione/RegistrazioneCompletata';


export default function SchermataRegistrazione() {
    return (
        <View>
            <RegistrazioneCompletata />
        </View>
    );
}