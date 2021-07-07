import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import useAuthentication from '../../Hooks/useAuthentication';

// Framer Motion Components
import { motion } from 'framer-motion';

// Custom Components
import View from '../Utility/View';
import DatiAnagraficiForm from './Registrazione/DatiAnagraficiForm';
import RichiestaRegistrazionePatente from './Registrazione/RichiestaRegistrazionePatente';
import DatiPatenteForm from './Registrazione/DatiPatenteForm';
import CredenzialiForm from './Registrazione/CredenzialiForm';
import RegistrazioneCompletata from './Registrazione/RegistrazioneCompletata';

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

// Dynamic SchermataRegistrazione
export default function SchermataRegistrazione() {
    const history = useHistory();
    const {auth, setAuth} = useAuthentication()

    if(auth){
        return <Redirect to={"/home"}/>
    }

    if (history.location.state) {
        switch (history.location.state.type) {
            case "RICHIESTA_PATENTE":
                return (
                    <RegistrazioneContainer>
                        <RichiestaRegistrazionePatente />
                    </RegistrazioneContainer>
                );
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
