import React from 'react'

import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGasPump, faCarSide, faWind, faTools, faCog } from '@fortawesome/free-solid-svg-icons';


import View from '../Utility/View';
import Button from '../Utility/Button';

export default function SelezioneVeicolo() {
    return (
        <View>
            <Container fluid>
                <h1 className="h1 t-bold text-center mt-3">Seleziona veicolo</h1>
                <Form className="d-flex flex-row justify-content-center">
                    <Row className="align-items-end">
                        <Form.Group className='col-auto'>
                            <Form.Label>Cerca veicolo</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il nome del veicolo" required />
                        </Form.Group>
                        <Form.Group className='col-auto'>
                            <Form.Label>Numero di Posti </Form.Label>
                            <Form.Control className="form-select" as="select" required >
                                <option value="" disabled selected>Seleziona...</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control >
                        </Form.Group>
                        <Form.Group className='col-auto'>
                            <Form.Label>Carburante </Form.Label>
                            <Form.Control className="form-select" as="select" required >
                                <option value="" disabled selected>Seleziona...</option>
                                <option value="Ben">Benzina</option>
                                <option value="Gas">Gasolio</option>
                                <option value="GPL">GPL</option>
                                <option value="Met">Metano</option>
                                <option value="Ele">Elettricità</option>
                            </Form.Control >
                        </Form.Group>
                        <Form.Group className='col-auto'>
                            <Form.Label>Cambio </Form.Label>
                            <Form.Control className="form-select" as="select" required >
                                <option value="" disabled selected>Seleziona...</option>
                                <option value="Man">Manuale</option>
                                <option value="Auto">Automatico</option>
                            </Form.Control>
                        </Form.Group>
                        <div className='col-auto'>
                            <Button variant="primary">Cerca</Button>
                        </div>
                    </Row>
                </Form>

                <Row className=" d-flex  justify-content-center mt-4    ">
                    <Col className="col-9 d-flex justify-content-evenly">

                        <Card className="col-3 mt-3">
                            <Card.Img variant="top" src="/assets/svg/wallet.svg" alt="..." />
                            <Card.Title className="t-bold">
                                <p className="h5 mt-2">Fiat 500 Cabrio</p>
                                <p className="h6 t-light">Utilitaria</p>
                            </Card.Title>

                            <Card.Body>
                                <Card.Text>
                                    <Row>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faUsers} className='me-2' />4 posti</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faCarSide} className='me-2' />3 porte</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faGasPump} className='me-2' />Ibrida</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faWind} className='me-2' />Aria Condizionata</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faTools} className='me-2' />Cambio Manuale</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faCog} className='me-2' />1.8cc - 10CV</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <p className='h4'>Tariffa</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <p className='h6'>50,00/H</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="col-3 mt-3 ">
                            <Card.Title className="t-bold">
                                <p className="h5 mt-2">Peugeout 2008</p>
                                <p className="h6 t-light">Suv</p>
                            </Card.Title>
                            <Card.Body>
                                <img></img>
                                <Card.Text>
                                    <Row>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faUsers} className='me-2' />5 posti</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faCarSide} className='me-2' />5 porte</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faGasPump} className='me-2' />Diesel</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faWind} className='me-2' />Aria Condizionata</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faTools} className='me-2' />Cambio Manuale</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faCog} className='me-2' /> 1.8cc - 10CV</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <p className='h4'>Tariffa</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <p className='h6'>50,00/H</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="col-3 mt-3">
                            <Card.Title className="t-bold">
                                <p className="h5 mt-2">Wolswagen Up!</p>
                                <p className="h6 t-light">Utilitaria</p>
                            </Card.Title>
                            <Card.Body>
                                <img></img>
                                <Card.Text>
                                    <Row>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faUsers} className='me-2' />4 posti</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faCarSide} className='me-2' />3 porte</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faGasPump} className='me-2' />Benzina</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faWind} className='me-2' />Aria Condizionata</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faTools} className='me-2' />Cambio Manuale</p>
                                        </Col>
                                        <Col className="col-6">
                                            <p><FontAwesomeIcon icon={faCog} className='me-2' />1.8cc - 10CV</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <p className='h4'>Tariffa</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <p className='h6'>50,00/H</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-3">
                        <Card className="mt-3">
                            <Card.Title className="t-bold">
                                <p className="h5 mt-2">Ritiro</p>
                                <p className="h6 t-light">Parcheggio Nord</p>
                                <p className="h5 mt-2">Consegna</p>
                                <p className="h6 t-light">Parcheggio Sud</p>
                            </Card.Title>
                            <Card.Body>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            <p>Opzioni</p>
                                            <p>AUTISTA</p>
                                            <p>No</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </View>
    );
}