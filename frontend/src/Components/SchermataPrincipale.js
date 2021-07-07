import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuthentication from '../Hooks/useAuthentication';

// Custom Components
import HomeCarousel from './Utility/HomeCarousel';

// Schermata Principale
export default function SchermataPrincipale() {
    const { auth, setAuth } = useAuthentication()

    if (auth) {
        return (<Redirect to={"/home"} />);
    } else {
        return <HomeCarousel />
    }
}