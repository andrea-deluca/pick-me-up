import React from 'react'

import { Container, Row, Col, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faMapPin, faArrowRight, faCalendarAlt, faArrowCircleLeft, faUsers, faCarSide, faGasPump, faWind, faTools, faCog } from '@fortawesome/free-solid-svg-icons';

import View from "../Utility/View"
import Button from "../Utility/Button";

export default function SchermataConfermaPrenotazione() {
    return (
        <View>
            <Container>
                <Row>
                    <Col className="col-3">
                        <Row>
                            <div className="col-12 d-flex justify-content-start align-items-baseline">
                                <FontAwesomeIcon icon={faArrowCircleLeft} />
                                <p className="ms-3 t-bold">Torna indietro</p>
                            </div>
                        </Row>
                    </Col>
                    <Col className="col-9">
                        <Row>
                            <div className="col-12 mb-5 d-flex justify-content-start align-items-center">
                                <div className="d-flex flex-column">
                                    <h1 className="h1 t-bold text-center">Conferma Prenotazione</h1>
                                    <p className="h6 t-bold">Conferma i dati della prenotazione prima di procedere con il pagamento</p>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Col className="col-4">
                                <Card className="col-12 shadow p-3 mb-5">
                                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                                    <Card.Body>
                                        <Card.Title className="t-bold">Volkswagen Up!</Card.Title>
                                        <Card.Text>Utilitaria</Card.Text>
                                    </Card.Body>
                                    <Row>
                                        <p className="t-bold ms-3"> DETTAGLI </p>
                                    </Row>
                                    <Row> {/*Row1*/}
                                        <Col>
                                            <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                <FontAwesomeIcon icon={faUsers} />
                                                <p className="t-light ms-3"> 4 posti </p>
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                <FontAwesomeIcon icon={faCarSide} />
                                                <p className="t-light ms-3"> 3 porte </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row> {/*Row2*/}
                                        <Col>
                                            <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                <FontAwesomeIcon icon={faGasPump} />
                                                <p className="t-light ms-3"> Benzina </p>
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                <FontAwesomeIcon icon={faWind} />
                                                <p className="t-light ms-3"> Aria condizionata </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row> {/*Row3*/}
                                        <Col>
                                            <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                <FontAwesomeIcon icon={faTools} />
                                                <p className="t-light ms-3"> Cambio Manuale </p>
                                            </div>
                                        </Col>

                                        <Col>
                                            <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                <FontAwesomeIcon icon={faCog} />
                                                <p className="t-light ms-3"> 1.8cc - 10 CV </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Row>
                                            <h6 className="t-bold"> TARIFFA </h6>
                                        </Row>
                                        <Row>
                                            <h5 className="t-bold"> 50,00$ / h </h5>
                                        </Row>

                                    </Card.Body>
                                </Card>

                            </Col>

                            <Col className="col-4">
                                <Card className="col-12 shadow p-3 mb-5">
                                    <Card.Body variant="top" className="bg-dark">
                                        <Col>
                                            <Row>
                                                <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                    <FontAwesomeIcon icon={faMapPin} color={"white"} />
                                                    <h6 className="ms-3 text-white t-light"> Ritiro </h6>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                    <h6 className="text-white"> Parcheggio Nord </h6>
                                                </div>
                                            </Row>

                                            <Row className="mt-3">
                                                <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                    <FontAwesomeIcon icon={faMapPin} color={"white"} />
                                                    <h6 className="ms-3 text-white t-light"> Consegna </h6>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="ms-3 d-flex justify-content-start align-items-baseline">
                                                    <h6 className="text-white"> Parcheggio Sud </h6>
                                                </div>
                                            </Row>
                                        </Col>
                                    </Card.Body>


                                    <Card.Body>

                                        <div className="d-flex justify-content-start align-items-baseline">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            <Card.Text className="ms-2">Periodo</Card.Text>
                                        </div>

                                        <Row className="d-flex align-items-center justify-content-between">
                                            <Col className="col-5">
                                                <div className="d-flex flex-column ">
                                                    <p className="h6 t-bold ">28 mag 2021</p>
                                                    <p className="h6 t-light ">21:00</p>

                                                </div>
                                            </Col>
                                            <div className="col-1 mx-auto">

                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </div>

                                            <Col className="col-5">
                                                <div className="d-flex flex-column">
                                                    <p className="h6 t-bold ">31 mag 2021</p>
                                                    <p className="h6 t-light ">13:30</p>
                                                </div>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                    <Card.Body>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <FontAwesomeIcon icon={faSearchPlus} />
                                            <Card.Text className="ms-2">Opzioni</Card.Text>
                                        </div>

                                        <Row className="d-flex align-items-center justify-content-between">
                                            <Col className="col-5">
                                                <div className="d-flex flex-column ">
                                                    <p className="h6 t-bold mt-2">AUTISTA</p>
                                                    <p className="h6 t-light ">no</p>

                                                </div>
                                            </Col>


                                            <Col className="col-5">
                                                <div className="d-flex flex-column">
                                                    <p className="h6 t-bold ">TOTALE</p>
                                                    <p className="h6 t-light ">1800 $</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>


                                </Card>

                            </Col>

                        </Row>
                    </Col>

                    <div className="buttonsGroup d-none d-md-flex justify-content-center">
                        <Button variant="secondary"> Annulla </Button>
                        <Button variant="primary"> Conferma</Button>
                    </div>

                </Row>

            </Container>
        </View>

    )

}