import React from 'react'

// Bootstrap COmponents
import { Container, Row, Col, Image, Card, CardGroup } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faListUl, faCar, faWallet, faIdCard } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import View from "./Utility/View"
import Button from "./Utility/Button";

// Schermata personale utente
export default function SchermataPersonaleUtente() {
    return (
        <React.Fragment>
            <View>
                <Container fluid className="d-flex justify-content-center align-items-center my-5">
                    <Col xs={{ span: 2 }} lg={{ span: 1 }} className="me-3">
                        <Image fluid className="" src="assets/svg/avatar_male.svg" />
                    </Col>
                    <div className="d-flex flex-column align-items-start">
                        <h1 className="h1 t-bold">Bentornato, Mario!</h1>
                        <div className="d-none d-lg-flex buttonsGroup">
                            <Button to="/gestione-account/profilo" variant={"Light"}><FontAwesomeIcon className="me-2" icon={faAddressCard} fixedWidth /> Visualizza Profilo</Button>
                            <Button to="/gestione-prenotazioni" variant={"Light"}><FontAwesomeIcon className="me-2" icon={faListUl} fixedWidth /> Le mie prenotazioni</Button>
                        </div>
                    </div>
                </Container >
            </View>
            <View>
                <Container className="d-flex justify-content-center mb-5">
                    <CardGroup >
                        <Row className="gy-5 align-items-center justify-content-center">
                            <Col xs={{ span: 10 }} lg={{ span: 4 }} >
                                <Card className="animation-card border-0 shadow">
                                    <Card.Body>
                                        <Image fluid src="assets/svg/prenota_card.svg" className="col-5" alt="..." />
                                        <div className="py-5">
                                            <h5 className="card-title">Noleggia</h5>
                                            <p className="card-text">Auto, moto, bici o monopattino? Scegli e prenota in un attimo. </p>
                                        </div>
                                        <Button to="/prenota" variant={"Primary"}><FontAwesomeIcon className="me-2" icon={faCar} fixedWidth /> Prenota</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={{ span: 10 }} lg={{ span: 4 }} >
                                <Card className="animation-card border-0 shadow">
                                    <Card.Body>
                                        <Image fluid src="assets/svg/wallet_card.svg" className="col-4" alt="..." />
                                        <div className="py-5">
                                            <h5 className="card-title">Wallet</h5>
                                            <p className="card-text">Accedi al tuo Wallet per gestire i tuoi metodi di pagamento.</p>
                                        </div>
                                        <Button to="/gestione-account/wallet" variant={"Primary"}><FontAwesomeIcon className="me-2" icon={faWallet} fixedWidth />Visualizza Wallet</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={{ span: 10 }} lg={{ span: 4 }} >
                                <Card className="animation-card border-0 shadow">
                                    <Card.Body>
                                        <Image fluid src="assets/svg/patente_card.svg" className="col-8" alt="..." />
                                        <div className="py-5">
                                            <h5 className="card-title">Patente</h5>
                                            <p className="card-text">Gestisci la tua patente di guida oppure, se l'hai e se vuoi, aggiungila. Decidi tu!</p>
                                        </div>
                                        <Button to="/gestione-account/patente" variant={"Primary"}><FontAwesomeIcon className="me-2" icon={faIdCard} fixedWidth /> Visualizza Patente</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </CardGroup>
                </Container>
            </View>
        </React.Fragment>
    );
}