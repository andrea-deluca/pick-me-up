import React from 'react';


import { ProgressBar, Container, Col, Form } from 'react-bootstrap';

import Button from '../Utility/Button';

export default function DatiAnagraficiForm() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
            <Col lg={10} className="d-flex flex-column mx-auto">
                <h1 className="display-5 text-center t-bold">Registrazione</h1>
                <ProgressBar className="col-10 mx-auto" now={25} />
                <Form method="GET" className="row gy-4 py-5">
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Nome </Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo nome" />
                        </Form.Group>
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo cognome" />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control type="date" placeholder="Inserisci data di nascita" />
                        </Form.Group>
                        <Form.Group className="col-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Nazionalità</Form.Label>
                            <Form.Control className="form-select" as="select">
                                <option value="0" disabled selected>Seleziona...</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Luogo di nascita </Form.Label>
                            <Form.Control className="form-select" as="select">
                                <option value="0" disabled selected>Provincia</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="col-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Città</Form.Label>
                            <Form.Control className="form-select" as="select">
                                <option value="0" disabled selected>Città</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Sesso anagrafico </Form.Label>
                            <Form.Control className="form-select" as="select">
                                <option value="0" disabled selected>Seleziona...</option>
                                <option>M</option>
                                <option>F</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Codice fiscale</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-between align-items-end mx-auto">
                        <Form.Group className="col-3 offset-2" controlId="exampleForm.ControlSelect1">
                            <Form.Label>Hai la patente di guida? </Form.Label>
                            <Form.Control className="form-select" as="select">
                                <option value="" disabled selected>Seleziona...</option>
                                <option>Si</option>
                                <option>No</option>
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