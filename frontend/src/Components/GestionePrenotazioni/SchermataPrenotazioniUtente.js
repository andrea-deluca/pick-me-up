import React from 'react'
import useSession from '../../Hooks/useSession'

import SchermataPrenotazioniCliente from './SchermataPrenotazioniCliente';
import SchermataPrenotazioniAmministratore from './SchermataPrenotazioniAmministratore';

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
    }
}