import React, { useContext } from 'react';
import { Router } from '../../../App';
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

export default function RichiestaRegistrazionePatente() {
    const router = useContext(Router)
    const history = useHistory()

    if (!router.router.registrazione.richiestaPatente) {
        history.push('/signup');
    }

    function mostraRegistrazionePatente(e) {
        e.preventDefault();
        router.dispatch({ type: 'REGISTRAZIONE_PATENTE', payload: router.router.userData });
        history.push('/signup/patente');
    }

    function mostraRegistrazioneCredenziali(e) {
        e.preventDefault();
        router.dispatch({ type: 'REGISTRAZIONE_CREDENZIALI', payload: router.router.userData });
        history.push('/signup/credenziali');
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
                        <Button to={"login"} variant={"Secondary"}>Salta questo passaggio</Button>
                    </div>
                </div>
            </Row>
        </Container>
    );
}