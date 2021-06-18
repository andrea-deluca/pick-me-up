import React from 'react'

import { Container, Row, Col, Image, Card, Nav, Tab, Tabs } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faEdit, faTrashAlt, faPlusCircle, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import View from "./Utility/View"
import Button from "./Utility/Button";

export default function SchermataPrenotazioniUtente() {
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
                        <div className="col-12 mb-5 d-flex justify-content-start align-items-center">
                            <Image className="col-3 me-3" fluid src="assets/svg/prenotazioni.svg"></Image>
                            <div className="d-flex flex-column">
                                <p className="h6 t-light">USER ID #12345</p>
                                <h1 className="h1 t-bold">Le mie prenotazioni</h1>
                            </div>
                        </div>

                        <Row>

                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

                                <Tab eventKey="Attive" title="Attive">

                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img className="col-3 me-3" src="" />
                                            </div>

                                            <div className="col-md-8">
                                                <div className="card-body">

                                                    <h5 className="card-title">Volkswagen Up!</h5>
                                                    <Row>

                                                        <div className="d-flex flex-column col-6" >
                                                            <div className="d-flex align-items-center">
                                                                
                                                                <p className="card-text me-2"><FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />Ritiro</p>
                                                            </div>
                                                            <h6>Parcheggio Nord</h6>
                                                        </div>
                                            
                                                        <div className="d-flex flex-column col-6" >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
                                                                <p className="card-text ">Consegna</p>
                                                            </div>
                                                            <h6>Parcheggio Sud</h6>
                                                        </div>

                                                        <div className="align-items-end d-flex">

                                                            <div className="d-flex flex-column col-6" >
                                                                <div className="d-flex align-items-center">
                                                                    <FontAwesomeIcon className="me-2" icon={faCalendarAlt} />
                                                                    <p className="card-text ">Periodo</p>
                                                                </div>
                                                                <h6>28 mag 2021</h6>
                                                                <h6>21:00</h6>
                                                            </div>

                                                            <div className="d-flex flex-column col-6 " >
                                                                <h6>31 mag 2021</h6>
                                                                <h6>13:30</h6>
                                                            </div>

                                                        </div>
                                                        
                                                        <Row>
                                                            <Col className="col-6">
                                                                <Button variant="primary">Estendi noleggio</Button>
                                                            </Col>
                                                            <Col className="col-6">
                                                                <Button variant="primary">Inizia Noleggio</Button>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>

                                <Tab eventKey="Programmate" title="Programmate">

                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img className="col-3 me-3" src="" />
                                            </div>

                                            <div className="col-md-8">
                                                <div className="card-body">

                                                    <h5 className="card-title">Volkswagen Up!</h5>
                                                    <Row>

                                                        <div className="d-flex flex-column col-6" >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
                                                                <p className="card-text ">Ritiro</p>
                                                            </div>
                                                            <h6>Parcheggio Nord</h6>
                                                        </div>
                                            
                                                        <div className="d-flex flex-column col-6" >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
                                                                <p className="card-text ">Consegna</p>
                                                            </div>
                                                            <h6>Parcheggio Sud</h6>
                                                        </div>

                                                        <div className="align-items-end d-flex">

                                                            <div className="d-flex flex-column col-6" >
                                                                <div className="d-flex align-items-center">
                                                                    <FontAwesomeIcon className="me-2" icon={faCalendarAlt} />
                                                                    <p className="card-text ">Periodo</p>
                                                                </div>
                                                                <h6>28 mag 2021</h6>
                                                                <h6>21:00</h6>
                                                            </div>

                                                            <div className="d-flex flex-column col-6 " >
                                                                <h6>31 mag 2021</h6>
                                                                <h6>13:30</h6>
                                                            </div>

                                                        </div>
                                                        
                                                        <Row>
                                                            <Col className="col-6">
                                                                <Button variant="secondary">Estendi noleggio</Button>
                                                            </Col>
                                                            <Col className="col-6">
                                                                <Button variant="danger">Inizia Noleggio</Button>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>

                                <Tab eventKey="Passate" title="Passate">

                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img className="col-3 me-3" src="" />
                                            </div>

                                            <div className="col-md-8">
                                                <div className="card-body">

                                                    <h5 className="card-title">Volkswagen Up!</h5>
                                                    <Row>

                                                        <div className="d-flex flex-column col-6" >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
                                                                <p className="card-text ">Ritiro</p>
                                                            </div>
                                                            <h6>Parcheggio Nord</h6>
                                                        </div>
                                            
                                                        <div className="d-flex flex-column col-6" >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt} />
                                                                <p className="card-text ">Consegna</p>
                                                            </div>
                                                            <h6>Parcheggio Sud</h6>
                                                        </div>

                                                        <div className="align-items-end d-flex">

                                                            <div className="d-flex flex-column col-6" >
                                                                <div className="d-flex align-items-center">
                                                                    <FontAwesomeIcon className="me-2" icon={faCalendarAlt} />
                                                                    <p className="card-text ">Periodo</p>
                                                                </div>
                                                                <h6>28 mag 2021</h6>
                                                                <h6>21:00</h6>
                                                            </div>

                                                            <div className="d-flex flex-column col-6 " >
                                                                <h6>31 mag 2021</h6>
                                                                <h6>13:30</h6>
                                                            </div>

                                                        </div>                                                  
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </View>

    )

}