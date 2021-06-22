import React from 'react';
import { Col, Row, div, Container, Form } from 'react-bootstrap'
import Maps from './Maps';
import Button from './Utility/Button';


export default function SchermataMappa() {
    return (
        <Container fluid className="p-0 h-100 align-items-center justify-content-center">
            <Row className="h-100 g-0 align-items-center">
                <Col xs={{ span: 5 }} className="mx-auto">
                    <h1 className="h1 text-center t-bold mb-4">Prenotazione</h1>
                    <Form>
                        <Row className="gy-4">
                            <Form.Group controlId="">
                                <Form.Label>Località di ritiro</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci località di ritiro, un indirizzo o seleziona un marker dalla mappa" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="">
                                <Form.Label>Data di ritiro</Form.Label>
                                <Form.Control type="date" placeholder="Seleziona data di ritiro" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="">
                                <Form.Label>Ora di ritiro</Form.Label>
                                <Form.Control type="time" placeholder="Seleziona ora di ritiro" />
                            </Form.Group>
                            <Form.Group controlId="">
                                <Form.Label>Località di consegna</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci località di consegna, un indirizzo o seleziona un marker dalla mappa" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="">
                                <Form.Label>Data di consegna</Form.Label>
                                <Form.Control type="date" placeholder="Seleziona data di consegna" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="">
                                <Form.Label>Ora di consegna</Form.Label>
                                <Form.Control type="time" placeholder="Seleziona ora di consegna" />
                            </Form.Group>
                            <Button variant={"Primary"} submit >Continua</Button>
                        </Row>
                    </Form>
                </Col>
                <Col xs={{ span: 6 }} className="h-100">
                    <Maps />
                </Col>
            </Row>
        </Container>

    );
}