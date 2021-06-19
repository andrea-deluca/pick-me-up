import React from 'react'

import { Container, Row, Col, Image, Card, CardColumns } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt, faEdit, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import Button from "./Utility/Button";
import NavAside from './GestioneAccount/NavAside';

export default function SchermataWallet() {
    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-center">
                <NavAside />
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }} className="ms-lg-auto">
                    <div className="d-flex justify-content-start align-items-center mb-5">
                        <Image fluid className="col-2 me-3" src="/assets/svg/wallet.svg"></Image>
                        <div className="d-flex flex-column">
                            <p className="h6 t-light">USER ID #12345</p>
                            <h1 className="h1 t-bold">Il mio Wallet</h1>
                        </div>
                    </div>
                    <CardColumns>
                        <Card className="p-0 mb-4">
                            <Card.Header className="t-bold">Metodo di Pagamento</Card.Header>
                            <Card.Body>
                                <Card.Title className="t-bold mb-5"><FontAwesomeIcon className="me-2" icon={faCreditCard} size={"lg"} fixedWidth />5336 •••• •••• 6678</Card.Title>
                                <Card.Text className="mb-4">
                                    <Row>
                                        <Col>
                                            <h6 className="t-bold">DATA DI SCADENZA</h6>
                                            <p className="t-light">25/01/2024</p>
                                        </Col>
                                        <Col>
                                            <h6 className="t-bold">CVV</h6>
                                            <p className="t-light ">222</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <div className="buttonsGroup justify-content-start">
                                    <Button variant={"Light"}><FontAwesomeIcon className="me-2" icon={faEdit} fixedWidth />Modifica</Button>
                                    <Button variant={"Danger"}> <FontAwesomeIcon className="me-2" icon={faTrashAlt} fixedWidth />Elimina</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="p-0">
                            <Card.Header className="t-bold">Metodo di Pagamento</Card.Header>
                            <Card.Body>
                                <Card.Title className="t-bold mb-5"><FontAwesomeIcon className="me-2" icon={faCreditCard} size={"lg"} fixedWidth />5336 •••• •••• 6678</Card.Title>
                                <Card.Text className="mb-4">
                                    <Row>
                                        <Col>
                                            <h6 className="t-bold">DATA DI SCADENZA</h6>
                                            <p className="t-light">25/01/2024</p>
                                        </Col>
                                        <Col>
                                            <h6 className="t-bold">CVV</h6>
                                            <p className="t-light ">222</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <div className="buttonsGroup justify-content-start">
                                    <Button variant={"Light"}><FontAwesomeIcon className="me-2" icon={faEdit} fixedWidth />Modifica</Button>
                                    <Button variant={"Danger"}> <FontAwesomeIcon className="me-2" icon={faTrashAlt} fixedWidth />Elimina</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </CardColumns>
                </Col>
                <Col lg={{ span: 3, offset: 1 }} className='d-none d-lg-block me-auto'>
                    <div>
                        <Button variant={"White"}><FontAwesomeIcon className="me-2" icon={faPlusCircle} fixedWidth />Inserisci metodo di pagamento</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
