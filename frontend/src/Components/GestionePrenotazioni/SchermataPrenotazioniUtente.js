import React from 'react'

import { motion } from 'framer-motion';

import { Container, Row, Col, Image, CardColumns, Card, Nav, Tab } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import NavAside from "../GestioneAccount/NavAside"
import Button from "../Utility/Button";

export default function SchermataPrenotazioniUtente() {
    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-start">
                <NavAside />
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 1 }} className="mx-lg-auto mt-5">
                    <motion.div
                        initial={{ translateY: 70, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 70, opacity: 0 }}
                        transition={{ dÎuration: 0.3 }}>
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <Image fluid className="col-2 me-3" src="/assets/svg/prenotazioni.svg" />
                            <div className="d-flex flex-column">
                                <p className="h6 t-light">USER ID #12345</p>
                                <h1 className="h1 t-bold">Le mie prenotazioni</h1>
                            </div>
                        </div>
                        <Tab.Container defaultActiveKey="attive" id="listaPrenotazioni">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column t-bold">
                                        <Nav.Item>
                                            <Nav.Link eventKey="attive">Attive</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="programmate">Programmate</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="passate">Passate</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content eventKey="attive">
                                        <Tab.Pane eventKey="attive">
                                            <CardColumns>
                                                <Card className="p-0 mb-4 shadow">
                                                    <Card.Header className="t-bold">Prenotazione attiva</Card.Header>
                                                    <Card.Body>
                                                        <Card.Title className="t-bold mb-5">Volskwagen Up!</Card.Title>
                                                        <Card.Text className="mb-4">
                                                            <Row className="align-items-start">
                                                                <Image fluid className="col-4" src="/assets/svg/prenotazioni.svg" />
                                                                <Col xs={{ span: 3 }}>
                                                                    <h6 className="t-bold">RITIRO</h6>
                                                                    <p className="t-light">data</p>
                                                                    <h6 className="t-bold">INIZIO</h6>
                                                                    <p className="t-light ">data</p>
                                                                </Col>
                                                                <Col className="mt-3">
                                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                                </Col>
                                                                <Col xs={{ span: 3 }}>
                                                                    <h6 className="t-bold">CONSEGNA</h6>
                                                                    <p className="t-light ">data</p>
                                                                    <h6 className="t-bold">INIZIO</h6>
                                                                    <p className="t-light ">data</p>
                                                                </Col>
                                                            </Row>
                                                        </Card.Text>
                                                        <div className="buttonsGroup justify-content-end">
                                                            <Button variant={"Light"}>Estendi noleggio</Button>
                                                            <Button variant={"Primary"}>Inizia noleggio</Button>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </CardColumns>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );

}