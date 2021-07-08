import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion'

import { Container, Row, Col, CardGroup } from 'react-bootstrap';

import Button from "../../Utility/Button";
import VeicoloCard from '../SelezioneMezzo/VeicoloCard';
import RiepilogoCard from '../SelezioneMezzo/RiepilogoCard';
import ModificaPrenotazioneModal from '../../GestionePrenotazioni/ModificaPrenotazioneModal';
import CambiaMezzoModal from '../../GestionePrenotazioni/CambiaMezzoModal';

export default function SchermataConfermaPrenotazione() {
    const history = useHistory()
    const datiPrenotazione = history.location.state.payload
    const tempoNoleggio = (new Date(datiPrenotazione.consegna.data) - new Date(datiPrenotazione.ritiro.data)) / (1000 * 3600)
    const importoTotale = datiPrenotazione.mezzo.tariffa * tempoNoleggio
    const [showModal, setShowModal] = useState({
        modificaModal: false,
        cambiaMezzoModal: false
    })

    function onClick(e) {
        e.preventDefault()
        if (datiPrenotazione.opCode === "MODIFICA") {
            setShowModal({ ...showModal, modificaModal: true })
        } else if (datiPrenotazione.opCode === "CAMBIA_MEZZO") {
            setShowModal({ ...showModal, cambiaMezzoModal: true })
        } else {
            history.push("/prenota", {
                payload: {
                    ...datiPrenotazione,
                    totale: importoTotale
                },
                type: "EFFETTUA_PAGAMENTO"
            })
        }
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
            <ModificaPrenotazioneModal show={showModal.modificaModal} onHide={() => { setShowModal({...showModal, modificaModal: false}) }} />
            <CambiaMezzoModal show={showModal.cambiaMezzoModal} onHide={() => { setShowModal({...showModal, cambiaMezzoModal: false}) }} />
            <motion.div
                className="d-flex flex-column"
                initial={{ translateY: -50, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}>
                <h1 className="t-bold text-center">Conferma Prenotazione</h1>
                <h6 className="t-light text-center">Conferma i dati della prenotazione prima di procedere con il pagamento</h6>
            </motion.div>
            <CardGroup className="mb-5">
                <Row className="gy-5 align-items-center mt-2 mt-lg-5 mb-100">
                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 0 }}>
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
                            path={datiPrenotazione.mezzo.path}
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
                            dataRitiro={new Date(datiPrenotazione.ritiro.data).toLocaleString("it-IT")}
                            dataConsegna={new Date(datiPrenotazione.consegna.data).toLocaleString("it-IT")}
                            totale={importoTotale}
                        />
                    </Col>
                    <motion.div
                        className="d-none d-lg-flex buttonsGroup justify-content-end"
                        initial={{ translateX: 50, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        exit={{ translateX: 50, opacity: 0 }}
                        transition={{ duration: 0.4 }}>
                        <Button onClick={() => history.push("/prenota")} variant="secondary"> Annulla </Button>
                        <Button onClick={onClick} variant="primary"> Conferma</Button>
                    </motion.div>
                </Row>
            </CardGroup>
        </Container>
    )
}