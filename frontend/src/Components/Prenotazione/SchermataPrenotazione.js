import React from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../Hooks/useSession';

import SchermataSelezioneTipologia from './SelezioneTipologiaMezzo/SchermataSelezioneTipologia'
import SchermataRichiestaAutista from './RichiestaAutista/SchermataRichiestaAutista'
import SchermataFormPrenotazione from './FormPrenotazione/SchermataFormPrenotazione'
import SchermataSelezioneMezzo from './SelezioneMezzo/SchermataSelezioneMezzo'
import SchermataConfermaPrenotazione from './ConfermaPrenotazione/SchermataConfermaPrenotazione'
import SchermataEffettuaPagamento from './EffettuaPagamento/SchermataEffettuaPagamento'
import SchermataPrenotazioneCompletata from './SchermataPrenotazioneCompletata'

import SchermataPermessoNegato from '../SchermataPermessoNegato';

export default function SchermataPrenotazione() {
    const history = useHistory();
    const { session, setSession } = useSession()

    if (session.user !== "CLIENTE" && session.user !== "AMMINISTRATORE") {
        return <SchermataPermessoNegato />
    }

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
            case "EFFETTUA_PAGAMENTO":
                return (
                    <SchermataEffettuaPagamento />
                );
            case "PRENOTAZIONE_COMPLETATA":
                return (
                    <SchermataPrenotazioneCompletata />
                );
        }
    } else {
        return (
            <SchermataSelezioneTipologia />
        );
    }
}