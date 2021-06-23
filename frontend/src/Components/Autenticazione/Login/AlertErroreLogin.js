import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Alert } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

// Errore Registrazione
export default function AlertErroreLogin(props) {
    return (
        <Alert show={props.show} variant="danger">
            <Alert.Heading className="t-bold">Accesso fallito!</Alert.Heading>
            <p className="t-light">
                {props.message}
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button to="/signup" variant="outline-danger">Registrati</Button>
            </div>
        </Alert>
    );
}