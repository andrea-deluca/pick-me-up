import React from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import View from '../../Utility/View';
import VeicoloCard from './VeicoloCard';
import FormRicerca from './FormRicerca';
import RiepilogoCard from './RiepilogoCard';

export default function SelezioneVeicolo() {
    const history = useHistory();
    const datiPrenotazione = history.location.state.payload.datiPrenotazione
    const veicoli = history.location.state.payload.veicoli
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
                                    <Col xs={{ span: 4 }}>
                                        <VeicoloCard
                                            tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                                            idMezzo={key._id}
                                            marca={key.marca}
                                            modello={key.modello}
                                            cambio={key.cambio}
                                            carburante={key.carburante}
                                            cilindrata={key.cilindrata}
                                            numeroPosti={key.numeroPosti}
                                            tariffa={key.tariffaOraria} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                    <Col xs={{ span: 3 }}>
                        <RiepilogoCard 
                        tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                        autista={datiPrenotazione.autista}
                        localitaRitiro={datiPrenotazione.consegna.nome}
                        localitaConsegna={datiPrenotazione.consegna.nome}
                        dataRitiro={datiPrenotazione.ritiro.data}
                        dataConsegna={datiPrenotazione.consegna.data}
                        oraRitiro={datiPrenotazione.ritiro.orario}
                        oraConsegna={datiPrenotazione.consegna.orario}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}