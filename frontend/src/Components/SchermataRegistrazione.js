import React from 'react';


import View from './Utility/View';
import DatiAnagraficiForm from './Autenticazione/RichiestaRegistrazionePatente';
import RichiestaRegistrazionePatente from './Autenticazione/RichiestaRegistrazionePatente';
import DatiPatenteForm from './Autenticazione/DatiPatenteForm';
import CredenzialiForm from './Autenticazione/CredenzialiForm';


export default function SchermataRegistrazione() {
    return (
        <React.Fragment>
            <View>
               <CredenzialiForm/>
            </View>
        </React.Fragment>
    );
}