import React from 'react';
import { useHistory } from 'react-router-dom';

// Bootstrap Components
import { Container, Row, Col, ProgressBar, Image } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

export default function SchermataRichiestaAutista() {
    const history = useHistory()

    function richiediAutista(e) {
        e.preventDefault();
        const datiPrenotazione = {
            ...history.location.state.payload,
            autista: true
        }
        history.push("/prenota", {
            payload: datiPrenotazione,
            type: "FORM_PRENOTAZIONE"
        });
    }

    function procediSenzaAutista(e) {
        e.preventDefault();
        const datiPrenotazione = {
            ...history.location.state.payload,
            autista: false
        }
        history.push("/prenota", {
            payload: datiPrenotazione,
            type: "FORM_PRENOTAZIONE"
        });
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="gy-3">
                <div className="col-3 mx-auto">
                    <Image fluid className="" src="/assets/svg/autista.svg" />
                </div>
                <h1 className="h1 t-bold text-center">Desideri richiedere la presenza di un autista?</h1>
                <p className="h6 text-center t-light">Per continuare con la prenotazione dell'auto specifica se desideri la presenza di un autista</p>
                <div className="buttonsGroup">
                    <Button onClick={richiediAutista} variant={"Primary"}>Richiedi autista</Button>
                    <Button onClick={procediSenzaAutista} variant={"Secondary"}>Procedi senza autista</Button>
                </div>
            </Row>
        </Container>
    );
}