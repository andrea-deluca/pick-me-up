import React from 'react'
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, CardGroup } from 'react-bootstrap';

import View from "../../Utility/View"
import Button from "../../Utility/Button";
import VeicoloCard from '../SelezioneMezzo/VeicoloCard';
import RiepilogoCard from '../SelezioneMezzo/RiepilogoCard';

export default function SchermataConfermaPrenotazione() {
    const history = useHistory()
    const datiPrenotazione = history.location.state.payload

    const dataRitiro = (datiPrenotazione.ritiro.data + "T" + datiPrenotazione.ritiro.orario);
    const dataConsegna = (datiPrenotazione.consegna.data + "T" + datiPrenotazione.consegna.orario);
    const tempoNoleggio = (new Date(dataConsegna) - new Date(dataRitiro)) / (1000 * 3600)
    const importoTotale = datiPrenotazione.mezzo.tariffa * tempoNoleggio
    
    function onClick(e){
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
        <View>
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column my-5">
                    <h1 className="t-bold text-center">Conferma Prenotazione</h1>
                    <h6 className="t-light">Conferma i dati della prenotazione prima di procedere con il pagamento</h6>
                </div>
                <CardGroup>
                    <Row className="gy-5 align-items-center">
                        <Col xs={{ span: 6 }}>
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
                        </Col>
                        <Col xs={{ span: 6 }}>
                            <RiepilogoCard
                                tipologiaMezzo={datiPrenotazione.tipologiaMezzo}
                                autista={datiPrenotazione.autista}
                                localitaRitiro={datiPrenotazione.ritiro.nome}
                                localitaConsegna={datiPrenotazione.consegna.nome}
                                dataRitiro={datiPrenotazione.ritiro.data}
                                dataConsegna={datiPrenotazione.consegna.data}
                                oraRitiro={datiPrenotazione.ritiro.orario}
                                oraConsegna={datiPrenotazione.consegna.orario}
                                totale={importoTotale}
                            />
                        </Col>
                        <div className="buttonsGroup justify-content-end">
                            <Button variant="secondary"> Annulla </Button>
                            <Button onClick={onClick} variant="primary"> Conferma</Button>
                        </div>
                    </Row>
                </CardGroup>
            </Container>
        </View>
    )
}