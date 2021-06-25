import React from 'react'
import { useHistory } from 'react-router';

import { Container, Row, Col, Image, Card, CardGroup } from 'react-bootstrap';

import View from "../../Utility/View"
import Button from "../../Utility/Button";

function TipologiaCard(props) {
    const history = useHistory();

    function onClick(e) {
        e.preventDefault();
        const datiPrenotazione = {
            tipologiaMezzo: props.id
        }
        if (props.id === "auto") {
            history.push("/prenota", {
                payload: datiPrenotazione,
                type: "RICHIESTA_AUTISTA"
            })
        } else {
            history.push("/prenota", {
                payload: datiPrenotazione,
                type: "FORM_PRENOTAZIONE"
            })
        }
    }

    return (
        <Col xs={{ span: 10, offset: 1 }} lg={{ span: 3, offset: 0 }}>
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
                    <Button onClick={onClick} variant="primary">{props.button}</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default function SelezioneTipologiaVeicolo() {
    return (
        <View>
            <Container fluid className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center my-5">
                    <h1 className="t-bold">Prenotazione</h1>
                    <h6 className="t-light">Seleziona la tipologia di veicolo che vuoi noleggiare e continua</h6>
                </div>
                <CardGroup >
                    <Row className="gy-5">
                        <TipologiaCard
                            imageSrc={"/assets/svg/auto.svg"}
                            title={"Automobile 🚗"}
                            text={"Scegli di noleggiare un auto utilitaria,una berlina o un SUV. Inoltre potrai anche richiedere la presenza di un autista."}
                            button={"Seleziona"}
                            id="auto"
                        />
                        <TipologiaCard
                            imageSrc={"/assets/svg/motore.svg"}
                            title={"Moto 🛵"}
                            text={"Noleggio un motore e scegli di goderti il vento tra i capelli... Ah no, ricordati di mettere il casco."}
                            button={"Seleziona"}
                            id="moto"
                        />
                        <TipologiaCard
                            imageSrc={"/assets/svg/bici.svg"}
                            title={"Bicicletta 🚴‍♀️"}
                            text={"Noleggia una bicicletta per sentirti libero di muoverti in città senza danneggiare l'ambiente. "}
                            button={"Seleziona"}
                            id="bici"
                            green
                        />
                        <TipologiaCard
                            imageSrc={"/assets/svg/monopattino.svg"}
                            title={"Monopattino Elettrico 🛴"}
                            text={"Scegli di noleggiare un Monopattino Elettrico e scopri così un nuovo modo per spostarsi in città! Una soluzione divertente, economica e semplice da utilizzare. L'ambiente che ci circonda ti ringrazierà! "}
                            button={"Seleziona"}
                            id="monopattino"
                            green
                        />

                    </Row>
                </CardGroup>
            </Container>
        </View>
    );
}