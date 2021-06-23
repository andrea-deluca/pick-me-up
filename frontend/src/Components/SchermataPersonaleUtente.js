import React from 'react'
import { Redirect } from 'react-router';
import useToken from '../Hooks/useToken';

// Motion Framer Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image, Card, CardGroup } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faListUl, faCar, faWallet, faIdCard } from '@fortawesome/free-solid-svg-icons';

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
    const { token, setToken } = useToken();
    const { session, setSession } = useSession();

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
                            <Col xs={{ span: 2 }} lg={{ span: 1 }} className="me-3">
                                <Image fluid className="" src={session.sesso === "M" ? "/assets/svg/avatar_male.svg" : "/assets/svg/avatar_female.svg"} />
                            </Col>
                            <div className="d-flex flex-column align-items-start">
                                <h1 className="h1 t-bold">{`Bentornato, ${session.nome}!`}</h1>
                                <div className="d-none d-lg-flex buttonsGroup">
                                    <Button to="/gestione-account/profilo" variant={"Light"}><FontAwesomeIcon className="me-2" icon={faAddressCard} fixedWidth /> Visualizza Profilo</Button>
                                    <Button to="/gestione-prenotazioni" variant={"Light"}><FontAwesomeIcon className="me-2" icon={faListUl} fixedWidth /> Le mie prenotazioni</Button>
                                </div>
                            </div>
                        </Container >
                    </motion.div>
                </View>
                <View>
                    <Container className="d-flex justify-content-center mb-5">
                        <CardGroup >
                            <Row className="gy-5 align-items-center justify-content-center">
                                <LinkCard
                                    imageSrc={"/assets/svg/prenota_card.svg"}
                                    imageAlt={"Carta prenotazione"}
                                    imageCol={5}
                                    title={"Noleggio"}
                                    text={"Auto, moto, bici o monopattino? Scegli e prenota in un attimo."}
                                    icon={faCar}
                                    to={"/prenota"}
                                    buttonLabel={"Prenota"}
                                    animationDuration={0.3} />
                                <LinkCard
                                    imageSrc={"/assets/svg/wallet_card.svg"}
                                    imageAlt={"Carta Wallet"}
                                    imageCol={4}
                                    title={"Wallet"}
                                    text={"Accedi al tuo Wallet per gestire i tuoi metodi di pagamento."}
                                    icon={faWallet}
                                    to={"/gestione-account/wallet"}
                                    buttonLabel={"Visualizza Wallet"}
                                    animationDuration={0.4} />
                                <LinkCard
                                    imageSrc={"/assets/svg/patente_card.svg"}
                                    imageAlt={"Carta patente"}
                                    imageCol={8}
                                    title={"Patente"}
                                    text={"Gestisci la tua patente di guida oppure, se l'hai e se vuoi, aggiungila. Decidi tu!"}
                                    icon={faIdCard}
                                    to={"/gestione-account/patente"}
                                    buttonLabel={"Visualizza Patente"}
                                    animationDuration={0.5} />
                            </Row>
                        </CardGroup>
                    </Container>
                </View>
            </React.Fragment>
        );
    }
}