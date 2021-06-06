import React from 'react';

// Custom Components
import Navbar from './Utility/Navbar';
import FormLogin from './Autenticazione/FormLogin';

// Schermata Login
export default function SchermataLogin() {
    return (
        <React.Fragment>
            <Navbar />
            <FormLogin/>
        </React.Fragment>
    );
}
