import React from 'react';

// Custom Components
import Navbar from './Navbar';
import HomeCarousel from './HomeCarousel';

// Schermata Principale
export default function SchermataPrincipale() {
    return (
        <div className="view">
            <Navbar />
            <HomeCarousel />
        </div>
    );
}