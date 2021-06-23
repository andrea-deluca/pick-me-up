import React from 'react';
import { Redirect } from 'react-router';
import useToken from '../../Hooks/useToken';

// Framer Motion Components
import { motion } from 'framer-motion';

// Custom Components
import LoginForm from './Login/LoginForm';
import View from '../Utility/View';

// Schermata Login
export default function SchermataLogin() {
    const { token, setToken } = useToken();
    if (token) {
        return (<Redirect to={"/home"} />)
    } else {
        return (
            <View>
                <motion.div
                    initial={{ translateX: -100, opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    exit={{ translateX: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <LoginForm />
                </motion.div>
            </View>
        );
    }
}
