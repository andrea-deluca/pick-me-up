import React from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Card, Form, Image } from 'react-bootstrap';


import View from '../../Utility/View';
import VeicoloCard from './VeicoloCard';
import FormRicerca from './FormRicerca';
import RiepilogoCard from './RiepilogoCard';

export default function SelezioneVeicolo() {
    const history = useHistory();
    const datiPrenotazione = history.location.state.payload.datiPrenotazione
    const veicoli = history.location.state.payload.veicoli
    console.log(datiPrenotazione)
    console.log(veicoli)
    return (
        <React.Fragment>
            <View>
                <Container>
                    <h1 className="t-bold text-center my-5">Seleziona veicolo</h1>
                    <FormRicerca />
                </Container>
            </View>
            <Container className="mt-5">
                <Row>
                    <Col xs={{ span: 9 }}>
                        <Row className="gy-4 mb-5">
                            {veicoli.map(key => {
                                return (
                                    <VeicoloCard
                                        tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                                        idMezzo={key._id} />
                                );
                            })}
                        </Row>
                    </Col>
                    <Col xs={{ span: 3 }}>
                        <RiepilogoCard />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}