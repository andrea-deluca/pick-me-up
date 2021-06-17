import React from 'react'

import { Container, Row, Col, Image } from 'react-bootstrap';

import View from "./Utility/View"
import Button from "./Utility/Button";

// Schermata Principale
export default function SchermataPrincipale() {
    return (
        <View>
            <Container fluid className="d-flex flex-column align-items-center justify-content-center">
                <Row className="my-5">
                    <Col className="d-flex align-items-center justify-content-start">
                        <Image className="col-2 me-3" fluid src="assets/svg/avatar_male.svg"></Image>
                        <div className="d-flex flex-column justify-content-start">
                            <h1 className="h1 t-bold">Bentornato, Mario!</h1>
                            <div className="buttonsGroup ">
                                {/*Fontawesome icon*/}
                                <Button variant={"Light"}>Visualizza Profilo</Button>
                                {/*Fontawesome icon*/}
                                <Button variant={"Light"}>Le mie prenotazioni</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex align-items-baseline ">
                    <Col xs={{ span: 4 }}>
                        <Image className="col-3 mb-3" fluid src="assets/svg/prenota_card.svg"></Image>
                        <h1 className="h3 t-bold">Noleggia</h1>
                        <p className="h6 t-light mb-3">Auto, moto, bici o monopattino? Scegli e prenota subito il tuo prossimo noleggio in un attimo.</p>
                        <Button variant={"Light"}>Prenota</Button>
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <Image className="col-3 mb-3" fluid src="assets/svg/wallet_card.svg"></Image>
                        <h1 className="h3 t-bold">Wallet</h1>
                        <p className="h6 t-light mb-3">Accedi al tuo Wallet per gestire i tuoi metodi di pagamento.</p>
                        {/* FontAwesome icon */}
                        <Button variant={"Light"}>Visualizza Wallet</Button>
                    </Col>
                    <Col xs={{ span: 4 }}>
                        <Image className="col-3 mb-3" fluid src="assets/svg/patente_card.svg"></Image>
                        <h1 className="h3 t-bold">Patente</h1>
                        <p className="h6 t-light mb-3">Gestisci la tua patente di guida oppure, se l'hai e se vuoi, aggiungila. Decidi tu.</p>
                        {/* FontAwesome icon */}
                        <Button variant={"Light"}>Visualizza Patente</Button>
                    </Col>
                </Row>
            </Container >
        </View >
    );
}