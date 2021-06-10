import React from 'react';

import { Container, Col, ProgressBar } from 'react-bootstrap';
import Button from '../../Utility/Button';


export default function RichiestaRegistrazionePatente() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-75">
            <div className="d-flex flex-column">
                <Col className="d-flex flex-column align-items-center">
                    <div className="d-flex align-items-center py-3">
                        <h1 className="t-subtitle t-bold text-center">Registrazione</h1>
                    </div>
                    <ProgressBar className="col-12" now={50} />
                    <p className="text-center t-light py-3">Se desideri registrare la tua patente di guida in questo momento clicca il tasto
            "Inserisci ora",<br /> altrimenti potrai farlo in seguito dalla gestione del tuo account.</p>
                    <div className="buttonsGroup">
                        <Button to={"login"} variant={"Primary"}>Inserisci ora</Button>
                        <Button to={"login"} variant={"Secondary"}>Salta questo passaggio</Button>
                    </div>
                </Col>
            </div>
        </Container>
    );
}