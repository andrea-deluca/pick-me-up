import rect from 'react';
import Navbar from './Navbar';
import HomeCarousel from './HomeCarousel';
import React from 'react';

export default function SchermataPrincipale() {
    return (
        <React.Fragment>
            <div className="d-flex flex-column">
                <div className="flex-grow-0 flex-shrink-1">
                    <Navbar />
                </div>
                <div className="flex-grow-1 flex-shrink-1">
                    <HomeCarousel />
                </div>
            </div>
        </React.Fragment>
    );
}