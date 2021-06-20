import React from 'react';

import { motion } from 'framer-motion';

import View from './Utility/View';
import DatiAnagraficiForm from './Autenticazione/Registrazione/DatiAnagraficiForm';
import RichiestaRegistrazionePatente from './Autenticazione/Registrazione/RichiestaRegistrazionePatente';
import DatiPatenteForm from './Autenticazione/Registrazione/DatiPatenteForm';
import CredenzialiForm from './Autenticazione/Registrazione/CredenzialiForm';
import RegistrazioneCompletata from './Autenticazione/Registrazione/RegistrazioneCompletata';


export default function SchermataRegistrazione() {
    return (
        <View>
            <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <DatiAnagraficiForm />
            </motion.div>
        </View>
    );
}