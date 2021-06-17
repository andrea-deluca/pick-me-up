import React from 'react'

import { Container, Row, Col, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faMobileAlt, faEnvelope, faKey, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import View from "./Utility/View"
import Button from "./Utility/Button";

export default function SchermataProfiloUtente() {
    return (
        <View>
            <Container>
                <Row>
                    <Col className="col-4">
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
                    <Col className="col-5">
                        <Row>
                            <div className="col-12 mb-5 d-flex justify-content-start align-items-center">
                                <Image className="col-3 me-3" fluid src="assets/svg/avatar_male.svg"></Image>
                                <div className="d-flex flex-column">
                                    <p className="h6 t-light">USER ID #12345</p>
                                    <h1 className="h1 t-bold">Mario Rossi</h1>
                                </div>
                            </div>

                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">SESSO ANAGRAFICO</p>
                                <p className="h6 t-light">Maschio</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">DATA DI NASCITA</p>
                                <p className="h6 t-light">01/01/1991</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">NAZIONALITÀ</p>
                                <p className="h6 t-light">Italiana</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">NAZIONALITÀ</p>
                                <p className="h6 t-light">Italiana</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">LUOGO DI NASCITA</p>
                                <p className="h6 t-light">Lazio - 00128 Roma (RM)</p>
                            </div>
                            <div className="col-12 mb-3">
                                <p className="h6 t-bold">CODICE FISCALE</p>
                                <p className="h6 t-light">DHFLCU76S35G748Q</p>
                            </div>
                            <div className="col-12 mb-3">
                                <p className="h6 t-bold">CELLULARE</p>
                                <p className="h6 t-light">3484629540</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">EMAIL</p>
                                <p className="h6 t-light">mariorossi@gmail.com</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="h6 t-bold">LUOGO DI NASCITA</p>
                                <p className="h6 t-light">*******************</p>
                            </div>
                            <div className="col-12">
                                <Button variant={"danger"}><FontAwesomeIcon icon={faTrashAlt} color={"white"} /> Elimina account</Button>
                            </div>

                        </Row>
                    </Col>
                    <Col className='col-3'>
                        <Row>
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
                        </Row>
                    </Col>
                </Row>
            </Container>
        </View>

    )

}