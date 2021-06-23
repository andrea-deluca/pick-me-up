import React from 'react';
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

// Schermata Richiesta Registrazione Patente
export default function RichiestaRegistrazionePatente() {
    const history = useHistory()

    function mostraRegistrazionePatente(e) {
        e.preventDefault();
        // Visualizza la schermata per inserire la patente
        history.push("/signup", {
            payload: history.location.state.payload,
            type: "PATENTE"
        });
    }

    function mostraRegistrazioneCredenziali(e) {
        e.preventDefault();
        // Visualizza la schermata per registrare le credenziali
        history.push("/signup", {
            payload: history.location.state.payload,
            type: "CREDENZIALI"
        });
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="gy-4">
                <h1 className="h1 t-bold text-center">Registrazione</h1>
                <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                    <ProgressBar variant="primary" className="" now={50} />
                </Col>
                <p className="h6 text-center t-light">Se desideri registrare la tua patente di guida in questo momento clicca il tasto
                    "Inserisci ora",<br /> altrimenti potrai farlo in seguito dalla gestione del tuo account.</p>
                <div className="buttonsGroup">
                    <div onClick={mostraRegistrazionePatente}>
                        <Button variant={"Primary"}>Inserisci ora</Button>
                    </div>
                    <div onClick={mostraRegistrazioneCredenziali}>
                        <Button variant={"Secondary"}>Salta questo passaggio</Button>
                    </div>
                </div>
            </Row>
        </Container>
    );
}