import React from 'react'

import { Container, Row, Col, Image, Card, Nav, Tab, Tabs , CardDeck , Overlays } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faEdit, faTrashAlt, faPlusCircle, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import View from "./Utility/View"
import Button from "./Utility/Button";

export default function SelezioneTipologiaVeicolo() {
    return (
        <View>
            <Container>
                <Row>
                   <Col className="col-12">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <div className="d-flex flex-column">
                                <h1 className="h1 t-bold">Prenotazione</h1>
                                <h6>Seleziona la tipologia di veicolo che vuoi noleggiare e continua</h6>
                            </div>
                        </div>
                   </Col>

                   <Col className="col-12 mt-5">
                        <CardDeck className="d-flex flex-row">

                            
                                <Card className="bg-dark text-white col-3 ">
                                    <Card.Img src="/assets/auto.jpg" alt="..." /> 
                                    <Card.ImgOverlay>
                                        <Card.Title>Automobile</Card.Title>
                                        <Card.Text>
                                        Scegli di noleggiare un auto utilitaria,una berlina o un SUV.
                                        Inoltre puoi sceglieredi richiedere la presenza di un autista.
                                        </Card.Text>
                                        
                                    </Card.ImgOverlay>
                                </Card>

                                <Card className="bg-dark text-white col-3 ">
                                    <Card.Img src="/assets/moto.jpg" alt="..." />
                                    <Card.ImgOverlay>
                                        <Card.Title>Motore</Card.Title>
                                        <Card.Text>
                                        Scegli di noleggiare un auto utilitaria,una berlina o un SUV.
                                        Inoltre puoi sceglieredi richiedere la presenza di un autista.
                                        </Card.Text>
                                        
                                    </Card.ImgOverlay>
                                </Card>

                                <Card className="bg-dark text-white col-3 ">
                                    <Image src="/assets/bici.jpg" alt="..." />
                                    <Card.ImgOverlay>
                                        <Card.Title>Bicicletta</Card.Title>
                                        <Card.Text>
                                        Scegli di noleggiare un auto utilitaria,una berlina o un SUV.
                                        Inoltre puoi sceglieredi richiedere la presenza di un autista.
                                        </Card.Text>
                                        
                                    </Card.ImgOverlay>
                                </Card>

                                <Card className="bg-dark text-white col-3 ">
                                    <Card.Img src="/assets/monopattino.jpg" alt="..." />
                                    <Card.ImgOverlay>
                                        <Card.Title>Monopattino</Card.Title>
                                        <Card.Text>
                                        Scegli di noleggiare un auto utilitaria,una berlina o un SUV.
                                        Inoltre puoi sceglieredi richiedere la presenza di un autista.
                                        </Card.Text>
                                        
                                    </Card.ImgOverlay>
                                </Card>
                            

                        </CardDeck>

                        
                        
                   </Col> 

                   <Col className="col-12 ms-7 mt-3">
                        
                        <div className="buttonsGroup d-none d-md-flex justify-content-end">
                                <Button variant="primary"> Continua </Button>
                        </div>
                             
                    </Col>
                </Row>
            </Container>
        </View>

    )

}