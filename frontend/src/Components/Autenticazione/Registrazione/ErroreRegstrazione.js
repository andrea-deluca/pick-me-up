import React from 'react';

// Bootstrap Components
import { Alert } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

// Errore Registrazione
export default function ErroreRegistrazione(props) {
    return (
        <Alert show={props.show} variant="danger">
            <Alert.Heading className="t-bold">Registrazione fallita!</Alert.Heading>
            <p className="t-light">
                L'email fornita risulta essere già associata ad un account esistente.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button to="/login" variant="outline-danger">Login</Button>
            </div>
        </Alert>
    );
}