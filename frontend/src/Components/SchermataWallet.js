import React from 'react'

import { Container, Row, Col, Image, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faMobileAlt, faEnvelope, faKey, faPlusCircle, faTrashAlt, faEdit, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import View from "./Utility/View"
import Button from "./Utility/Button";

export default function SchermataWallet() {
    return (
        <View>
            <Container>
                <Row>
                    <Col className="col-3">
                        <Row>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faCar} />
                                <p className="ms-3 t-bold">Prenota</p>
                            </div>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faListUl} />
                                <p className="ms-3 t-bold">Le Mie Prenotazioni</p>
                            </div>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faAddressCard} />
                                <p className="ms-3 t-bold">Visualizza Profilo</p>
                            </div>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faWallet} />
                                <p className="ms-3 t-bold">Visualizza Wallet</p>
                            </div>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faIdCard} />
                                <p className="ms-3 t-bold"> Visualizza Patente</p>
                            </div>
                        </Row>
                    </Col>
                    <Col className="col-6">
                        <Row>
                            <div className="col-12 mb-5 d-flex justify-content-start align-items-center">
                                <Image className="col-3 me-3" fluid src="assets/svg/wallet.svg"></Image>
                                <div className="d-flex flex-column">
                                    <p className="h6 t-light">USER ID #12345</p>
                                    <h1 className="h1 t-bold">Il mio Wallet</h1>
                                </div>
                            </div>
                            <Card className="col-10 mt-3">
                                <Card.Header className="t-bold">Metodo di Pagamento</Card.Header>
                                <Card.Body>
                                    <div className="col-12  d-flex justify-content-start align-items-baseline">
                                        <FontAwesomeIcon icon={faCreditCard} />
                                        <Card.Title className="ms-3 t-bold">5336 •••• •••• 6678</Card.Title>
                                    </div>

                                    <Card.Text>
                                        <Row>
                                            <Col className="col-4">
                                                <p className="h6 t-bold mt-2">DATA DI SCADENZA</p>
                                                <p className="h6 t-light">25/01/2024</p>
                                            </Col>
                                            <Col className="col-4">
                                                <p className="h6 t-bold mt-2 ms-5">CVV</p>
                                                <p className="h6 t-light ms-5">222</p>
                                            </Col>
                                        </Row>
                                    </Card.Text>

                                    <Row>
                                        <Col className="col-4">
                                            <Button variant="light"><FontAwesomeIcon icon={faEdit} /> Modifica</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="danger"> <FontAwesomeIcon icon={faTrashAlt} color={"white"} /> Elimina</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Card className="col-10 mt-3">
                                <Card.Header className="t-bold">Metodo di Pagamento</Card.Header>
                                <Card.Body>
                                    <div className="col-12  d-flex justify-content-start align-items-baseline">
                                        <FontAwesomeIcon icon={faCreditCard} />
                                        <Card.Title className="ms-3 t-bold">5336 •••• •••• 6678</Card.Title>
                                    </div>

                                    <Card.Text>
                                        <Row>
                                            <Col className="col-4">
                                                <p className="h6 t-bold mt-2">DATA DI SCADENZA</p>
                                                <p className="h6 t-light">25/01/2024</p>
                                            </Col>
                                            <Col className="col-4">
                                                <p className="h6 t-bold mt-2 ms-5">CVV</p>
                                                <p className="h6 t-light ms-5">222</p>
                                            </Col>
                                        </Row>
                                    </Card.Text>

                                    <Row>
                                        <Col className="col-4">
                                            <Button variant="light"><FontAwesomeIcon icon={faEdit} /> Modifica</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="danger"> <FontAwesomeIcon icon={faTrashAlt} color={"white"} /> Elimina</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col className='col-3'>
                        <Row>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <p className="ms-3 t-bold">Inserisci metodo di pagamento</p>
                            </div>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </View>

    )

}
