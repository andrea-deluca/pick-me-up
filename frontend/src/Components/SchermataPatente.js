import React from 'react'

import { Container, Row, Col, Image, Card} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faTrashAlt, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
                                <Image className="col-3 me-3" fluid src="assets/svg/patente.svg"></Image>
                                <div className="d-flex flex-column">
                                    <p className="h6 t-light">USER ID #12345</p>
                                    <h1 className="h1 t-bold">La mia patente</h1>
                                </div>
                            </div>
                            <Card className="col-10 mt-3">
                                <Card.Header className="t-bold">Patente di guida</Card.Header>
                                <Card.Body>
                                    <div className="col-12  d-flex justify-content-start align-items-baseline">
                                        <FontAwesomeIcon icon={faIdCard} />
                                        <Card.Title className="ms-3 t-bold">PA534273</Card.Title>
                                    </div>

                                    <Card.Text>
                                        <Row>
                                            <Col className="col-4">
                                                <p className="h6 t-bold mt-2">PATENTE</p>
                                                <p className="h6 t-light">B</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="col-5">
                                                <p className="h6 t-bold mt-2">DATA DI SCADENZA</p>
                                                <p className="h6 t-light">25/01/2024</p>
                                            </Col>
                                            <Col className="col-5">
                                                <p className="h6 t-bold mt-2">UFFICIO DI RILASCIO</p>
                                                <p className="h6 t-light">Motorizzazione</p>
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
                                <p className="ms-3 t-bold">Inserisci patente di guida</p>
                            </div>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </View>

    )

}
