import React from 'react'
import { Redirect } from 'react-router';
import useToken from '../Hooks/useToken';

// Motion Framer Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image, Card, CardGroup } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faListUl, faCar, faWallet, faIdCard, faPeopleArrows, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import View from "./Utility/View"
import Button from "./Utility/Button";
import useSession from '../Hooks/useSession';

// Util Card
function LinkCard(props) {
    return (
        <Col xs={{ span: 10 }} lg={{ span: 4 }} >
            <motion.div
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
                transition={{ duration: props.animationDuration }}>
                <Card className="animation-card border-0 shadow">
                    <Card.Body>
                        <Image fluid src={props.imageSrc} className={`col-${props.imageCol}`} alt={props.imageAlt} />
                        <div className="py-5">
                            <h5 className="card-title">{props.title}</h5>
                            <p className="card-text">{props.text}</p>
                        </div>
                        <Button to={props.to} variant={"Primary"}><FontAwesomeIcon className="me-2" icon={props.icon} fixedWidth />{props.buttonLabel}</Button>
                    </Card.Body>
                </Card>
            </motion.div>
        </Col>
    );
}

// Schermata personale utente
export default function SchermataPersonaleUtente() {
    const { token } = useToken();
    const { session } = useSession();

    if (!token) {
        return (<Redirect to={"/login"} />)
    } else {
        return (
            <React.Fragment>
                <View>
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <Container fluid className="d-flex justify-content-center align-items-center my-5">
                            <Col xs={{ span: 2, offset: 1 }} sm={{ span: 1, offset: 0 }} className="me-3">
                                <Image fluid src={session.sesso === "M" ? "/assets/svg/avatar_male.svg" : "/assets/svg/avatar_female.svg"} />
                            </Col>
                            <div className="d-flex flex-column align-items-start">
                                <h1 className="t-bold">{`Bentornato, ${session.nome}!`}</h1>
                            </div>
                        </Container >
                        <div className="buttonsGroup offset-1 offset-sm-0 flex-column flex-sm-row align-items-start mb-5">
                            <Button to="/gestione-account/profilo" className="mb-2" variant={"Light"}><FontAwesomeIcon className="me-2" icon={faAddressCard} fixedWidth /> Visualizza Profilo</Button>
                            <Button
                                to={session.user === "CLIENTE" ? "/gestione-prenotazioni" : "/gestione-impiegati"}
                                variant={"Light"}>
                                <FontAwesomeIcon className="me-2" icon={session.user === "CLIENTE" ? faListUl : faPeopleArrows} fixedWidth />
                                {session.user === "CLIENTE" ? "Le mie prenotazioni" : "Cambia ruoli"}
                            </Button>
                            <Button className="mt-2 m-lg-0"
                                to={session.user === "AMMINISTRATORE" ? "gestione-utente" : null}
                                variant={"Light"}>
                                <FontAwesomeIcon className="me-2" icon={faUserEdit} fixedWidth />
                                {session.user === "AMMINISTRATORE" ? "Modifica utente" : null}
                            </Button>
                        </div>
                    </motion.div>
                </View>
                <View>
                    <Container className="d-flex justify-content-center mb-5">
                        <CardGroup >
                            <Row className="gy-5 align-items-center justify-content-center">
                                <LinkCard
                                    imageSrc={"/assets/svg/prenota_card.svg"}
                                    imageAlt={session.user === "CLIENTE" ? "Carta prenotazione" : "Gestione prenotazioni"}
                                    imageCol={5}
                                    title={session.user === "CLIENTE" ? "Noleggio" : "Gestione prenotazioni"}
                                    text={session.user === "CLIENTE" ? "Auto, moto, bici o monopattino? Scegli e prenota in un attimo." : "Ricerca e gestisci le prenotazioni dei clienti."}
                                    icon={session.user === "CLIENTE" ? faCar : faListUl}
                                    to={"/gestione-prenotazioni"}
                                    buttonLabel={session.user === "CLIENTE" ? "Prenota" : "Gestione noleggi"}
                                    animationDuration={0.3} />
                                <LinkCard
                                    imageSrc={session.user === "CLIENTE" ? "/assets/svg/wallet_card.svg" : "/assets/svg/gestione-mezzi.svg"}
                                    imageAlt={session.user === "CLIENTE" ? "Carta Wallet" : "Gestione mezzi"}
                                    imageCol={session.user === "CLIENTE" ? 4 : 8}
                                    title={session.user === "CLIENTE" ? "Wallet" : "Gestione mezzi"}
                                    text={session.user === "CLIENTE" ? "Accedi al tuo Wallet per gestire i tuoi metodi di pagamento." : "Ricerca e gestisci i veicoli dell'azienda."}
                                    icon={session.user === "CLIENTE" ? faWallet : faCar}
                                    to={session.user === "CLIENTE" ? "/gestione-account/wallet" : "/gestione-mezzi"}
                                    buttonLabel={session.user === "CLIENTE" ? "Visualizza Wallet" : "Ricerca mezzi"}
                                    animationDuration={0.4} />
                                <LinkCard
                                    imageSrc={session.user === "CLIENTE" ? "/assets/svg/patente_card.svg" : "/assets/svg/registrazione-impiegato.svg"}
                                    imageAlt={session.user === "CLIENTE" ? "Carta patente" : "Registrazione impiegato"}
                                    imageCol={session.user === "CLIENTE" ? 8 : 6}
                                    title={session.user === "CLIENTE" ? "Patente" : "Registra impiegato"}
                                    text={session.user === "CLIENTE" ? "Gestisci la tua patente di guida oppure, se l'hai e se vuoi, aggiungila. Decidi tu!" : "Registra un nuovo impiegato dell'azienda."}
                                    icon={session.user === "CLIENTE" ? faIdCard : faUserPlus}
                                    to={session.user === "CLIENTE" ? "/gestione-account/patente" : "registrazione-impiegato"}
                                    buttonLabel={session.user === "CLIENTE" ? "Visualizza Patente" : "Registra impiegato"}
                                    animationDuration={0.5} />
                            </Row>
                        </CardGroup>
                    </Container>
                </View>
            </React.Fragment>
        );
    }
}