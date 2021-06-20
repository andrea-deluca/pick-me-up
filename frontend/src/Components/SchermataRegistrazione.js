import React, { useContext } from 'react';
import { Router } from '../App';

import { motion } from 'framer-motion';

import View from './Utility/View';
import DatiAnagraficiForm from './Autenticazione/Registrazione/DatiAnagraficiForm';
import RichiestaRegistrazionePatente from './Autenticazione/Registrazione/RichiestaRegistrazionePatente';
import DatiPatenteForm from './Autenticazione/Registrazione/DatiPatenteForm';
import CredenzialiForm from './Autenticazione/Registrazione/CredenzialiForm';
import RegistrazioneCompletata from './Autenticazione/Registrazione/RegistrazioneCompletata';

function RegistrazioneContainer(props){
    return(
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

export default function SchermataRegistrazione() {
    const router = useContext(Router);
    if(router.router.registrazione.richiestaPatente){
        return(
            <RegistrazioneContainer>
                <RichiestaRegistrazionePatente/>
            </RegistrazioneContainer>
        );
    } else if(router.router.registrazione.patente){
        return(
            <RegistrazioneContainer>
                <DatiPatenteForm/>
            </RegistrazioneContainer>
        );
    } else if(router.router.registrazione.credenziali){
        return(
            <RegistrazioneContainer>
                <CredenzialiForm/>
            </RegistrazioneContainer>
        );
    } else if(router.router.registrazione.completato){
        return(
            <RegistrazioneContainer>
                <RegistrazioneCompletata/>
            </RegistrazioneContainer>
        );
    } else{
        return(
            <RegistrazioneContainer>
                <DatiAnagraficiForm/>
            </RegistrazioneContainer>
        );
    }
}