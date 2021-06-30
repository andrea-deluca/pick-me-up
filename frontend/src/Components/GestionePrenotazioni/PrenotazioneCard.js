import React from 'react'

import { Row, Col, Card, Image } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Utility/Button';

export default function PrenotazioneCard(props) {
    return (
        <Card className="col-10 offset-1 my-4 mt-lg-0 animation-card border-0 shadow">
            <Card.Body>
                <Row className="align-items-center">
                    <Card.Title>
                        <Row className="justify-content-between">
                            <Col>
                                <h5 className="t-bold">Prenotazione #{props.id}</h5>
                                <h5 className="t-light">Data di prenotazione {props.dataPrenotazione}</h5>
                            </Col>
                            <Col>
                                <h6 className="text-xl-end t-bold text-success">{props.stato}</h6>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Col xs={{ span: 12 }} lg={{ span: 5 }} className="mb-5">
                        <Image fluid src={`/assets/veicoli/${props.tipologiaMezzo}/${props.idMezzo}.png`} alt="..." />
                    </Col>
                    <Col xs={{ span: 12 }} lg={{ span: 7 }}>
                        <Card.Text>
                            <Row className="gy-3">
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">MEZZO</h6>
                                    <p className="h6 t-light">{props.marca} {props.modello}</p>
                                    <p className="h6 t-light">Cod. {props.code}</p>
                                </Col>
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">AUTISTA</h6>
                                    <p className="h6 t-light">{props.autista ? "Si" : "No"}</p>
                                </Col>
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">RITIRO</h6>
                                    <p className="h6 t-light">{props.dataRitiro}</p>
                                    <p className="h6 t-light">presso {props.ritiro}</p>
                                </Col>
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">CONSEGNA</h6>
                                    <p className="h6 t-light">{props.dataConsegna}</p>
                                    <p className="h6 t-light">presso {props.consegna}</p>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Col>
                    {props.stato === "ATTIVA" ?
                        <div className="col-12 buttonsGroup justify-content-end mt-4">
                            <Button variant={"Light"}>Estendi noleggio</Button>
                            <Button variant={"Primary"}>Inizia noleggio</Button>
                        </div>
                        : props.stato === "PROGRAMMATA" ?
                            <div className="col-12 buttonsGroup justify-content-end mt-4">
                                <Button variant={"Light"}>Cambia mezzo</Button>
                                <Button variant={"Light"}>Modifica</Button>
                                <Button variant={"Danger"}>Annulla noleggio</Button>
                            </div> : null}
                </Row>
            </Card.Body>
        </Card>
    );
}