import React, { useContext } from 'react';

import { ProgressBar, Container, Col, Form } from 'react-bootstrap';

import Button from '../../Utility/Button';

export default function DatiPatenteForm() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
            <Col lg={10} className="d-flex flex-column mx-auto">
                <h1 className="display-5 text-center t-bold">Registrazione</h1>
                <ProgressBar className="col-10 mx-auto" now={60} />
                <Form className="row gy-4 py-5">
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="tipologiaPatente">
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
                        <Form.Group className="col-3" controlId="numeroPatente">
                            <Form.Label>Numero Patente</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il numero di patente" pattern="[a-zA-Z]{2}\d{7}[a-zA-Z]{1}" required/>
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="dataScadenza">
                            <Form.Label>Data di scadenza</Form.Label>
                            <Form.Control type="date" placeholder="Inserisci data di scadenza" required/>
                        </Form.Group>
                        <Form.Group className="col-3" controlId="ufficioRilascio">
                            <Form.Label>Ufficio di rilascio</Form.Label>
                            <Form.Control className="form-select" as="select" required>
                                <option value="" disabled selected>Città</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-auto offset-2">
                        <Button variant={"Primary"} submit>Continua</Button>
                    </div>
                </Form>
            </Col>
        </Container>
    );
}