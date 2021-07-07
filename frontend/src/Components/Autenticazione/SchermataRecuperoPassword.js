import React from 'react';
import { Redirect } from 'react-router';
import useAuthentication from '../../Hooks/useAuthentication';

// Framer Motion Components
import { motion } from 'framer-motion';

// Custom Components
import RecuperoPasswordForm from './RecuperoPassword/RecuperoPasswordForm';
import View from '../Utility/View';

// Schermata Recupero Password
export default function SchermataRecuperoPassword() {
    const { auth, setAuth } = useAuthentication()

    if (auth) {
        return <Redirect to={"/home"} />
    }

    return (
        <View>
            <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <RecuperoPasswordForm />
            </motion.div>
        </View>
    );
}