import React from 'react'
import useSession from '../../Hooks/useSession'

import SchermataPrenotazioniCliente from './Cliente/SchermataPrenotazioniCliente';
import SchermataPrenotazioniAmministratore from './Amministratore/SchermataPrenotazioniAmministratore';
import SchermataPrenotazioniAutista from './Autista/SchermataPrenotazioniAutista';

import SchermataPermessoNegato from '../SchermataPermessoNegato';

export default function SchermataPrenotazioniUtente() {
    const { session, setSession } = useSession()

    switch (session.user) {
        case "CLIENTE":
            return (
                <SchermataPrenotazioniCliente />
            );
        case "AMMINISTRATORE":
            return (
                <SchermataPrenotazioniAmministratore />
            );
        case "AUTISTA":
            return (
                <SchermataPrenotazioniAutista />
            );
        default:
            return <SchermataPermessoNegato />
    }
}