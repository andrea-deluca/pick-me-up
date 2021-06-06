import React from 'react';

// Custom Components
import Navbar from './Utility/Navbar';
import HomeCarousel from './HomeCarousel';

// Schermata Principale
export default function SchermataPrincipale() {
    return (
        <React.Fragment>
            <Navbar/>
            <HomeCarousel />
        </React.Fragment>
    );
}