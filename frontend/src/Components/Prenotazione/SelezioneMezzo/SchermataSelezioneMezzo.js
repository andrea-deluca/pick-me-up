import React from 'react'
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion'

import { Container, Row, Col } from 'react-bootstrap';

import View from '../../Utility/View';
import VeicoloCard from './VeicoloCard';
import RiepilogoCard from './RiepilogoCard';

export default function SelezioneVeicolo() {
    const history = useHistory();
    const datiPrenotazione = history.location.state.payload.datiPrenotazione
    const veicoli = history.location.state.payload.veicoli
    
    return (
        <React.Fragment>
            <View>
                <Container className="mt-5">
                    <motion.div
                        initial={{ translateY: -50, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: -50, opacity: 0 }}
                        transition={{ duration: 0.4 }}>
                        <h1 className="t-bold text-center my-5">Seleziona veicolo</h1>
                        {/* <FormRicerca /> */}
                    </motion.div>
                </Container>
            </View>
            <Container className="mt-2 mb-5">
                <Row className="mb-100">
                    <Col xs={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 9 }}>
                        <Row className="gy-4 mb-5">
                            {veicoli.map((key, index) => {
                                return (
                                    <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} xl={{ span: 4 }}>
                                        <VeicoloCard
                                            index={index}
                                            tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                                            idMezzo={key._id}
                                            marca={key.dati[0].marca}
                                            modello={key.dati[0].modello}
                                            cambio={key.dati[0].cambio}
                                            carburante={key.dati[0].carburante}
                                            cilindrata={key.dati[0].cilindrata}
                                            numeroPosti={key.dati[0].numeroPosti}
                                            tariffa={key.dati[0].tariffaOraria}
                                            path={key.dati[0].path} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                    <Col lg={{ span: 4 }} xl={{ span: 3 }}>
                        <RiepilogoCard
                            tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                            autista={datiPrenotazione.autista}
                            localitaRitiro={datiPrenotazione.ritiro.nome}
                            localitaConsegna={datiPrenotazione.consegna.nome}
                            dataRitiro={datiPrenotazione.ritiro.data.toLocaleString("it-IT")}
                            dataConsegna={datiPrenotazione.consegna.data.toLocaleString("it-IT")}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}