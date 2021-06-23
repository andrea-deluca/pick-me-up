import React from 'react';
import { Redirect } from 'react-router-dom';
import useToken from '../Hooks/useToken';

// Custom Components
import HomeCarousel from './Utility/HomeCarousel';

// Schermata Principale
export default function SchermataPrincipale() {
    const { token, setToken } = useToken()

    if (token) {
        return (<Redirect to={"/home"} />);
    } else {
        return <HomeCarousel />
    }
}