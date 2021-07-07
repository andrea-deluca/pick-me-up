import React from 'react';
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession';

// Framer Motion Components
import { motion } from 'framer-motion';

// Custom Components
import View from '../../Utility/View';
import DatiAnagraficiForm from '../../Autenticazione/Registrazione/DatiAnagraficiForm';
import DatiPatenteForm from '../../Autenticazione/Registrazione/DatiPatenteForm';
import CredenzialiForm from '../../Autenticazione/Registrazione/CredenzialiForm';
import RegistrazioneCompletata from '../../Autenticazione/Registrazione/RegistrazioneCompletata';
import SchermataPermessoNegato from '../../SchermataPermessoNegato';

// Util Container
function RegistrazioneContainer(props) {
    return (
        <View>
            <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                {props.children}
            </motion.div>
        </View>
    );
}

export default function SchermataRegistrazioneImpiegati() {
    const history = useHistory()
    const {session, setSession} = useSession()

    if (session.user !== "AMMINISTRATORE") {
        return <SchermataPermessoNegato />
    }

    if (history.location.state) {
        switch (history.location.state.type) {
            case "PATENTE":
                return (
                    <RegistrazioneContainer>
                        <DatiPatenteForm />
                    </RegistrazioneContainer>
                );
            case "CREDENZIALI":
                return (
                    <RegistrazioneContainer>
                        <CredenzialiForm />
                    </RegistrazioneContainer>
                );
            case "COMPLETATO":
                return (
                    <RegistrazioneContainer>
                        <RegistrazioneCompletata />
                    </RegistrazioneContainer>
                );
        }
    } else {
        return (
            <RegistrazioneContainer>
                <DatiAnagraficiForm />
            </RegistrazioneContainer>
        );
    }
}
