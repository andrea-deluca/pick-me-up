import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Row, Col, Card, Image } from 'react-bootstrap'

import Button from '../Utility/Button';
import AnnullaPrenotazioneModal from './AnnullaPrenotazioneModal';

export default function PrenotazioneCard(props) {
    const history = useHistory()
    const [showModals, setShowModals] = useState({
        deleteModal: false,
        updateModal: false
    })

    function modificaPrenotazione(e) {
        e.preventDefault();
        const datiPrenotazione = {
            _id: props.id,
            opCode: "MODIFICA",
            tipologiaMezzo: props.tipologiaMezzo,
            autista: props.autista
        }
        try {
            axios.post("/prenotazione/fetchDepositi", datiPrenotazione)
                .then(res => {
                    history.push("/prenota", {
                        payload: {
                            datiPrenotazione: datiPrenotazione,
                            depositi: res.data
                        },
                        type: "FORM_PRENOTAZIONE"
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    function cambiaMezzo(e) {
        e.preventDefault()
        const datiPrenotazione = {
            _id: props.id,
            opCode: "CAMBIA_MEZZO",
            tipologiaMezzo: props.tipologiaMezzo,
            autista: props.autista,
            ritiro: {
                localita: props.idRitiro,
                nome: props.ritiro,
                data: props.dataRitiro
            },
            consegna: {
                localita: props.idConsegna,
                nome: props.consegna,
                data: props.dataConsegna
            }
        }
        try {
            axios.post("/prenotazione/fetchVeicoliDisponibili", datiPrenotazione)
                .then(res => {
                    history.push("/prenota", {
                        payload: {
                            datiPrenotazione: datiPrenotazione,
                            veicoli: res.data
                        },
                        type: "SELEZIONE_MEZZO"
                    })
                })
                .catch(err => {

                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Card className="col-10 offset-1 my-4 mt-lg-0 animation-card border-0 shadow">
            <Card.Body>
                <Row className="align-items-center">
                    <Card.Title>
                        <Row className="justify-content-between">
                            <Col>
                                <h5 className="t-bold">Prenotazione #{props.id}</h5>
                                <h5 className="t-light">Data di prenotazione {props.dataPrenotazione}</h5>
                            </Col>
                            <Col>
                                <h6 className="text-xl-end t-bold text-success">{props.stato}</h6>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Col xs={{ span: 12 }} lg={{ span: 5 }} className="mb-5">
                        <Image fluid src={props.path} alt="..." />
                    </Col>
                    <Col xs={{ span: 12 }} lg={{ span: 7 }}>
                        <Card.Text>
                            <Row className="gy-3">
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">MEZZO</h6>
                                    <p className="h6 t-light">{props.marca} {props.modello}</p>
                                    <p className="h6 t-light">Cod. {props.code}</p>
                                </Col>
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">AUTISTA</h6>
                                    <p className="h6 t-light">{props.autista ? "Si" : "No"}</p>
                                </Col>
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">RITIRO</h6>
                                    <p className="h6 t-light">{props.dataRitiro}</p>
                                    <p className="h6 t-light">presso {props.ritiro}</p>
                                </Col>
                                <Col xs={{ span: 6 }}>
                                    <h6 className="t-bold">CONSEGNA</h6>
                                    <p className="h6 t-light">{props.dataConsegna}</p>
                                    <p className="h6 t-light">presso {props.consegna}</p>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Col>
                    {props.stato === "ATTIVA" ?
                        <div className="col-12 buttonsGroup justify-content-end mt-4">
                            <Button variant={"Light"}>Estendi noleggio</Button>
                            <Button variant={"Primary"}>Inizia noleggio</Button>
                        </div>
                        : props.stato === "PROGRAMMATA" ?
                            <div className="col-12 buttonsGroup justify-content-end mt-4">
                                <Button onClick={cambiaMezzo} variant={"Light"}>Cambia mezzo</Button>
                                <Button onClick={modificaPrenotazione} variant={"Light"}>Modifica</Button>
                                <Button onClick={() => setShowModals({ ...showModals, deleteModal: true })} variant={"Danger"}>Annulla noleggio</Button>
                                <AnnullaPrenotazioneModal id={props.id} show={showModals.deleteModal} onHide={() => setShowModals({ ...showModals, deleteModal: false })} />
                            </div> : null}
                </Row>
            </Card.Body>
        </Card >
    );
}