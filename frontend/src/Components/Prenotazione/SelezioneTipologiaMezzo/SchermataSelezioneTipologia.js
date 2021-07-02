import React, { useState } from 'react'
import { useHistory } from 'react-router';
import useSession from '../../../Hooks/useSession';
import axios from 'axios'

import { motion } from 'framer-motion'

import { Container, Row, Col, Image, Card, CardGroup } from 'react-bootstrap';

import View from "../../Utility/View"
import Button from "../../Utility/Button";

function TipologiaCard(props) {
    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false
        },
        submit: false
    })

    function onClick(e) {
        e.preventDefault();
        const datiPrenotazione = {
            tipologiaMezzo: props.id
        }
        setState({ ...state, submit: true })
        try {
            axios.post("/prenotazione/fetchDepositi", datiPrenotazione)
                .then(res => {
                    if (props.id === "auto") {
                        history.push("/prenota", {
                            payload: {
                                datiPrenotazione: datiPrenotazione,
                                depositi: res.data
                            },
                            type: "RICHIESTA_AUTISTA"
                        })
                    } else {
                        history.push("/prenota", {
                            payload: {
                                datiPrenotazione: datiPrenotazione,
                                depositi: res.data
                            },
                            type: "FORM_PRENOTAZIONE"
                        })
                    }
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} lg={{ span: 3, offset: 0 }}>
            <motion.div
                className="h-100"
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
                transition={{ duration: props.animationDuration }}>
                <Card className="animation-card border-0 shadow mx-auto h-100">
                    <Card.Body className="d-flex flex-column justify-content-evenly">
                        <Image fluid className="col-7 align-self-start" src={props.imageSrc} />
                        <div className="py-4">
                            <Card.Title className="t-bold">
                                {props.title}
                                {props.green ? <h6 className="t-bold text-success">Green 🌲🌿</h6> : null}
                            </Card.Title>
                            <Card.Text className="t-light">{props.text}</Card.Text>
                        </div>
                    </Card.Body>
                    <Button disabled={props.disabled} spinner={state.submit} onClick={onClick} variant="primary">Seleziona</Button>
                </Card>
            </motion.div>
        </Col>
    );
}

export default function SelezioneTipologiaVeicolo() {
    const { session, setSession } = useSession()
    return (
        <View>
            <Container fluid className="mb-5 d-flex flex-column justify-content-center align-items-center">
                <motion.div
                    className="d-flex flex-column align-items-center my-5"
                    initial={{ translateY: 100, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    exit={{ translateY: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <h1 className="t-bold">Prenotazione</h1>
                    <h6 className="text-center t-light">Seleziona la tipologia di veicolo che vuoi noleggiare e continua</h6>
                </motion.div>
                <CardGroup >
                    <Row className="gy-5">
                        <TipologiaCard
                            imageSrc={"/assets/svg/auto.svg"}
                            title={"Automobile 🚗"}
                            text={"Noleggia un auto utilitaria,una berlina o un SUV. Potrai inoltre richiedere la presenza di un autista."}
                            id="auto"
                            disabled={session.patente && session.patente.tipologiaPatente === "B" ? false : true}
                            animationDuration={0.3}
                        />
                        <TipologiaCard
                            imageSrc={"/assets/svg/motore.svg"}
                            title={"Moto 🛵"}
                            text={"Noleggio una Moto o un Motorino e scegli di goderti il vento tra i capelli... Ah no, ricordati di mettere il casco."}
                            id="moto"
                            disabled={session.patente ? false : true}
                            animationDuration={0.4}
                        />
                        <TipologiaCard
                            imageSrc={"/assets/svg/bici.svg"}
                            title={"Bicicletta 🚴‍♀️"}
                            text={"Noleggia una Bicicletta per sentirti libero di muoverti in città senza danneggiare l'ambiente. "}
                            id="bici"
                            green
                            animationDuration={0.5}
                        />
                        <TipologiaCard
                            imageSrc={"/assets/svg/monopattino.svg"}
                            title={"Monopattino Elettrico 🛴"}
                            text={"Noleggia un Monopattino Elettrico e scopri un nuovo modo per spostarsi in città! Una soluzione divertente e semplice da utilizzare."}
                            id="monopattino"
                            green
                            animationDuration={0.6}
                        />
                    </Row>
                </CardGroup>
            </Container>
        </View>
    );
}