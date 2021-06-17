import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Router } from "../../../App";

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';

// Form dati patente
export default function DatiPatenteForm() {
    const router = useContext(Router)
    const history = useHistory()

    if (!router.router.registrazione.patente) {
        history.push('/signup')
    }

    function onSubmit(e){
        e.preventDefault();
        const userData = {
            ...router.router.userData,
            patente: {
                tipologia: document.querySelector("#tipologiaPatente").value,
                codicePatente: document.querySelector("#numeroPatente").value,
                dataScadenza: document.querySelector("#dataScadenza").value,
                ufficiorilascio: document.querySelector("#ufficioRilascio").value
            }
        }
        router.dispatch({ type: 'REGISTRAZIONE_CREDENZIALI', payload: userData });
        history.push('/signup/credenziali');
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
            <Row>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className="h1 text-center t-bold">Registrazione</h1>
                    <ProgressBar className="mb-4" now={60} />
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="tipologiaPatente">
                                    <Form.Label>Patente di guida</Form.Label>
                                    <Form.Control className="form-select" as="select" required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="AM">AM</option>
                                        <option value="A1">A1</option>
                                        <option value="A2">A2</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="numeroPatente">
                                    <Form.Label>Numero Patente</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero di patente" pattern="[a-zA-Z]{2}\d{7}[a-zA-Z]{1}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="dataScadenza">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="date" placeholder="Inserisci data di scadenza" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="ufficioRilascio">
                                    <Form.Label>Ufficio di rilascio</Form.Label>
                                    <Form.Control className="form-select" as="select" required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="Ufficio competente">Ufficio competente</option>
                                        <option value="Questura">Questura</option>
                                        <option value="Motorizzazione">Motorizzazione</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Button variant={"Primary"} submit>Continua</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}