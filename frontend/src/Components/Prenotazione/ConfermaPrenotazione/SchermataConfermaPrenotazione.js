import React from 'react'
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion'

import { Container, Row, Col, CardGroup } from 'react-bootstrap';

import View from "../../Utility/View"
import Button from "../../Utility/Button";
import VeicoloCard from '../SelezioneMezzo/VeicoloCard';
import RiepilogoCard from '../SelezioneMezzo/RiepilogoCard';

export default function SchermataConfermaPrenotazione() {
    const history = useHistory()
    const datiPrenotazione = history.location.state.payload

    const tempoNoleggio = (new Date(datiPrenotazione.consegna.data) - new Date(datiPrenotazione.ritiro.data)) / (1000 * 3600)
    const importoTotale = datiPrenotazione.mezzo.tariffa * tempoNoleggio

    function onClick(e) {
        e.preventDefault()
        history.push("/prenota", {
            payload: {
                ...datiPrenotazione,
                totale: importoTotale
            },
            type: "EFFETTUA_PAGAMENTO"
        })
    }

    return (
        <Container className="d-flex flex-column justify-content-start align-items-center mt-5">
            <motion.div
                className="d-flex flex-column"
                initial={{ translateY: -50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}>
                <h1 className="t-bold text-center">Conferma Prenotazione</h1>
                <h6 className="t-light text-center">Conferma i dati della prenotazione prima di procedere con il pagamento</h6>
            </motion.div>
            <CardGroup>
                <Row className="gy-5 align-items-center">
                    <Col xs={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 0 }}>
                        <VeicoloCard
                            tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                            idMezzo={datiPrenotazione.mezzo.idMezzo}
                            marca={datiPrenotazione.mezzo.marca}
                            modello={datiPrenotazione.mezzo.modello}
                            cambio={datiPrenotazione.mezzo.cambio}
                            carburante={datiPrenotazione.mezzo.carburante}
                            cilindrata={datiPrenotazione.mezzo.cilindrata}
                            numeroPosti={datiPrenotazione.mezzo.posti}
                            tariffa={datiPrenotazione.mezzo.tariffa}
                            noButton />
                        <motion.div
                            className="d-lg-none mt-4 buttonsGroup justify-content-center"
                            initial={{ translateX: 50, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            exit={{ translateX: 50, opacity: 0 }}
                            transition={{ duration: 0.4 }}>
                            <Button variant="secondary"> Annulla </Button>
                            <Button onClick={onClick} variant="primary"> Conferma</Button>
                        </motion.div>
                    </Col>
                    <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                        <RiepilogoCard
                            tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                            autista={datiPrenotazione.autista}
                            localitaRitiro={datiPrenotazione.ritiro.nome}
                            localitaConsegna={datiPrenotazione.consegna.nome}
                            dataRitiro={datiPrenotazione.ritiro.data.toLocaleString("it-IT")}
                            dataConsegna={datiPrenotazione.consegna.data.toLocaleString("it-IT")}
                            totale={importoTotale}
                        />
                    </Col>
                    <motion.div
                        className="d-none d-lg-flex buttonsGroup justify-content-end"
                        initial={{ translateX: 50, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        exit={{ translateX: 50, opacity: 0 }}
                        transition={{ duration: 0.4 }}>
                        <Button variant="secondary"> Annulla </Button>
                        <Button onClick={onClick} variant="primary"> Conferma</Button>
                    </motion.div>
                </Row>
            </CardGroup>
        </Container>

    )
}