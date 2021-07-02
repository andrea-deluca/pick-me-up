import React from 'react';
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion'

// Bootstrap Components
import { Container, Row, Col, Image } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

export default function SchermataRichiestaAutista() {
    const history = useHistory()

    function richiediAutista(e) {
        e.preventDefault();
        const datiPrenotazione = {
            ...history.location.state.payload,
            datiPrenotazione: {
                ...history.location.state.payload.datiPrenotazione,
                autista: true
            }
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
            datiPrenotazione: {
                ...history.location.state.payload.datiPrenotazione,
                autista: false
            }
        }
        history.push("/prenota", {
            payload: datiPrenotazione,
            type: "FORM_PRENOTAZIONE"
        });
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <motion.div
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <Row className="gy-3">
                    <Col xs={{ span: 6 }} lg={{ span: 3 }} className="mx-auto">
                        <Image fluid src="/assets/svg/autista.svg" alt="richiesta autista" />
                    </Col>
                    <h1 className="h1 t-bold text-center">Desideri richiedere la presenza di un autista?</h1>
                    <p className="h6 text-center t-light">Per continuare con la prenotazione dell'auto specifica se desideri la presenza di un autista</p>
                    <div className="buttonsGroup flex-column flex-sm-row">
                        <Button className="mb-2 mb-sm-0" onClick={richiediAutista} variant={"Primary"}>Richiedi autista</Button>
                        <Button onClick={procediSenzaAutista} variant={"Secondary"}>Procedi senza autista</Button>
                    </div>
                </Row>
            </motion.div>
        </Container>
    );
}