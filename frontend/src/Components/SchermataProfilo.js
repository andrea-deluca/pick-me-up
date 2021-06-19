import React from 'react'

import { Container, Row, Col, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope, faKey, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Button from "./Utility/Button";
import NavAside from './GestioneAccount/NavAside';

export default function SchermataProfilo() {
    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-center">
                <NavAside />
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }} className="ms-lg-auto">
                    <div className="d-flex justify-content-start align-items-center mb-5">
                        <Image fluid className="col-2 me-3" src="/assets/svg/avatar_male.svg" />
                        <div className="d-flex flex-column">
                            <h6 className="t-light">USER ID #12345</h6>
                            <h1 className="t-bold">Mario Rossi</h1>
                        </div>
                    </div>
                    <Row className="gy-4">
                        <div className="col-6">
                            <h6 className="t-bold">SESSO ANAGRAFICO</h6>
                            <h6 className="t-light">Maschio</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">DATA DI NASCITA</h6>
                            <h6 className="t-light">01/01/1991</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">NAZIONALITÀ</h6>
                            <h6 className="t-light">Italiana</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">NAZIONALITÀ</h6>
                            <h6 className="t-light">Italiana</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">LUOGO DI NASCITA</h6>
                            <h6 className="t-light">Lazio - 00128 Roma (RM)</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">CODICE FISCALE</h6>
                            <h6 className="t-light">DHFLCU76S35G748Q</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">CELLULARE</h6>
                            <h6 className="t-light">3484629540</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">EMAIL</h6>
                            <h6 className="t-light">mariorossi@gmail.com</h6>
                        </div>
                        <div className="col-6">
                            <h6 className="t-bold">PASSWORD</h6>
                            <h6 className="t-light">*******************</h6>
                        </div>
                        <Button variant={"Danger"}><FontAwesomeIcon className="me-2" icon={faTrashAlt} color={"white"} fixedWidth />Elimina account</Button>
                    </Row>
                </Col>
                <Col lg={{ span: 3, offset: 1 }} className="d-none d-lg-block me-auto">
                    <div className="mb-5">
                        <Button variant={"White"} ><FontAwesomeIcon className="me-2" icon={faMobileAlt} fixedWidth/>Modifica cellulare</Button>
                    </div>
                    <div className="mb-5">
                        <Button variant={"White"} className="t-bold py-5"><FontAwesomeIcon className="me-2" icon={faEnvelope} fixedWidth/>Modifica email</Button>
                    </div>
                    <div className="mb-5">
                        <Button variant={"White"} className="t-bold py-5"><FontAwesomeIcon className="me-2" icon={faKey} fixedWidth/>Modifica password</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}