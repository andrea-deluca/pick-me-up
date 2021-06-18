import React from 'react'

import { Container, Row, Col, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faMobileAlt, faEnvelope, faKey, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import View from "./Utility/View"
import Button from "./Utility/Button";
import NavAside from './Autenticazione/GestioneAccount/NavAside';

export default function SchermataProfilo() {
    return (
        <React.Fragment>


            <NavAside/>


            <Container fluid>
                <Row>
                    
                    <Col className="mx-auto col-6">
                        <Row className="justify-content-center">


                            <div className="col-6 mb-3">
                                <h6 className="t-bold">SESSO ANAGRAFICO</h6>
                                <h6 className="t-light">Maschio</h6>
                            </div>
                            <div className="col-6 mb-3">
                                <h6 className="t-bold">DATA DI NASCITA</h6>
                                <h6 className="t-light">01/01/1991</h6>
                            </div>
                            <div className="col-6 mb-3">
                                <h6 className="t-bold">NAZIONALITÀ</h6>
                                <h6 className="t-light">Italiana</h6>
                            </div>
                            <div className="col-6 mb-3">
                                <h6 className="t-bold">NAZIONALITÀ</h6>
                                <h6 className="t-light">Italiana</h6>
                            </div>
                            <div className="col-12 mb-3">
                                <h6 className="t-bold">LUOGO DI NASCITA</h6>
                                <h6 className="t-light">Lazio - 00128 Roma (RM)</h6>
                            </div>
                            <div className="col-12 mb-3">
                                <h6 className="t-bold">CODICE FISCALE</h6>
                                <h6 className="t-light">DHFLCU76S35G748Q</h6>
                            </div>
                            <div className="col-12 mb-3">
                                <h6 className="t-bold">CELLULARE</h6>
                                <h6 className="t-light">3484629540</h6>
                            </div>
                            <div className="col-6 mb-3">
                                <h6 className="t-bold">EMAIL</h6>
                                <h6 className="t-light">mariorossi@gmail.com</h6>
                            </div>
                            <div className="col-6 mb-3">
                                <h6 className="t-bold">LUOGO DI NASCITA</h6>
                                <h6 className="t-light">*******************</h6>
                            </div>
                            <div className="col-12">
                                <Button variant={"danger"}><FontAwesomeIcon icon={faTrashAlt} color={"white"} /> Elimina account</Button>
                            </div>
                        </Row>
                    </Col>




                    <Col className='d-none col-3'>
                        <div className="col-12 d-flex justify-content-start align-items-baseline">
                            <FontAwesomeIcon icon={faMobileAlt} />
                            <p className="ms-3 t-bold">Modifica Cellulare</p>
                        </div>
                        <div className="col-12 d-flex justify-content-start align-items-baseline">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p className="ms-3 t-bold">Modifica Email</p>
                        </div>
                        <div className="col-12 d-flex justify-content-start align-items-baseline">
                            <FontAwesomeIcon icon={faKey} />
                            <p className="ms-3 t-bold">Modifica Password</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>

    )

}