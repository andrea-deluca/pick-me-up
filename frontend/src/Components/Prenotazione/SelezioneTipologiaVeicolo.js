import React from 'react'

import { Container, Row, Col, Image, Card, CardGroup, CardDeck } from 'react-bootstrap';


import View from "../Utility/View"
import Button from "../Utility/Button";

export default function SelezioneTipologiaVeicolo() {
    return (
        <View>
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center my-5">
                    <h1 className="t-bold">Prenotazione</h1>
                    <h6 className="t-light">Seleziona la tipologia di veicolo che vuoi noleggiare e continua</h6>
                </div>
                <CardGroup >
                    <Row className="gy-5">
                        <Card className="animation-card border-0 shadow col-5 mx-auto offset-1">
                                <Image fluid className="col-6 align-self-start" src="/assets/svg/auto.svg" />
                                <Card.Body >
                                    <Card.Title>Automobile</Card.Title>
                                    <Card.Text>
                                        Scegli di noleggiare un auto utilitaria,una berlina o un SUV.
                                        Inoltre puoi sceglieredi richiedere la presenza di un autista.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                        </Card>
                        <Card className="animation-card border-0 shadow col-5 mx-auto">
                            <Image className="col-8 align-self-start" src="/assets/svg/motore.svg" />
                            <Card.Body >
                                <Card.Title>Motore</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        <Card className="animation-card border-0 shadow col-5 mx-auto offset-1">
                            <Image className="col-6 align-self-start" src="/assets/svg/bici.svg" />
                            <Card.Body>
                                <Card.Title>Bicicletta</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        <Card className="animation-card border-0 shadow col-5 mx-auto">
                            <Image className="col-6 align-self-start" src="/assets/svg/monopattino.svg" />
                            <Card.Body>
                                <Card.Title>Monopattino</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </CardGroup>
            </Container>
        </View>
    );
}