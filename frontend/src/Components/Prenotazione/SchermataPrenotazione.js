import React from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

import SchermataSelezioneTipologia from './SelezioneTipologiaMezzo/SchermataSelezioneTipologia'
import SchermataRichiestaAutista from './RichiestaAutista/SchermataRichiestaAutista'
import SchermataFormPrenotazione from './FormPrenotazione/SchermataFormPrenotazione'
import SchermataSelezioneMezzo from './SelezioneMezzo/SchermataSelezioneMezzo'
import SchermataConfermaPrenotazione from './ConfermaPrenotazione/SchermataConfermaPrenotazione'


export default function SchermataPrenotazione() {
    const { token, setToken } = useToken();
    const history = useHistory();
    // CAMBIARE IN !TOKEN <===========================
    if (token) {
        return (<Redirect to={"/login"} />)
    } else {
        if (history.location.state) {
            switch (history.location.state.type) {
                case "RICHIESTA_AUTISTA":
                    return (
                        <SchermataRichiestaAutista />
                    );
                case "FORM_PRENOTAZIONE":
                    return (
                        <SchermataFormPrenotazione />
                    );
                case "SELEZIONE_MEZZO":
                    return (
                        <SchermataSelezioneMezzo />
                    );
                case "CONFERMA_PRENOTAZIONE":
                    return (
                        <SchermataConfermaPrenotazione />
                    );
            }
        } else {
            return (
                <SchermataSelezioneTipologia />
            );
        }
    }
}