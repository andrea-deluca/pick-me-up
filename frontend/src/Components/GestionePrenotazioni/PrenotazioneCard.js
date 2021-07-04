import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../Hooks/useSession';
import axios from 'axios';

import { Row, Col, Card, Image } from 'react-bootstrap'

import Button from '../Utility/Button';
import AnnullaPrenotazioneModal from './AnnullaPrenotazioneModal';
import AlertMessage from '../Utility/AlertMessage';
import TerminaNoleggioModal from './TerminaNoleggioModal';
import EstendiNoleggioModal from './EstendiNoleggioModal'

export default function PrenotazioneCard(props) {
    const history = useHistory()
    const { session, setSession } = useSession()
    const [showModals, setShowModals] = useState({
        deleteModal: false,
        terminaModal: {
            show: false
        },
        estendiModal: false
    })
    const [state, setState] = useState({
        error: {
            show: false
        },
        success: {
            show: false
        },
        submit: false
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

    function iniziaNoleggio(e) {
        e.preventDefault()
        setState({ ...state, submit: true })
        try {
            axios.put("/gestione-prenotazione/iniziaNoleggio", { _id: props.id, idUtente: session.id })
                .then(res => {
                    window.sessionStorage.setItem("prenotazioni", JSON.stringify(res.data.prenotazioni))
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    function terminaNoleggio(e) {
        e.preventDefault()
        setState({ ...state, submit: true })
        try {
            axios.post("/prenotazione/fetchDepositi", { tipologiaMezzo: props.tipologiaMezzo })
                .then(res => {
                    setShowModals({ ...showModals, terminaModal: { show: true, depositi: res.data } })
                    setState({ ...state, submit: false })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <React.Fragment>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 0 }} lg={{ span: 10, offset: 1 }} className="my-4">
                <Card className="animation-card border-0 shadow">
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Chiudi"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
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
                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <h6 className="t-bold">MEZZO</h6>
                                            <p className="h6 t-light">{props.marca} {props.modello}</p>
                                            <p className="h6 t-light">Cod. {props.targa}</p>
                                        </Col>
                                        <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                            <h6 className="t-bold">AUTISTA</h6>
                                            <p className="h6 t-light">{props.autista ? "Si" : "No"}</p>
                                        </Col>
                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <h6 className="t-bold">RITIRO</h6>
                                            <p className="h6 t-light">{props.dataRitiro}</p>
                                            <p className="h6 t-light">presso {props.ritiro}</p>
                                        </Col>
                                        <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                            <h6 className="t-bold">CONSEGNA</h6>
                                            <p className="h6 t-light">{props.dataConsegna}</p>
                                            <p className="h6 t-light">presso {props.consegna}</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Col>
                            {props.stato === "IN PREPARAZIONE" || props.stato === "ATTIVA" || props.stato === "INIZIATA" ?
                                <div className="buttonsGroup justify-content-end mt-4">
                                    <Button onClick={() => setShowModals({ ...showModals, estendiModal: true })} variant={"Light"}>Estendi noleggio</Button>
                                    <Button spinner={state.submit} variant={"Primary"}
                                        disabled={props.stato === "ATTIVA" || props.stato === "INIZIATA" ? false : true}
                                        onClick={props.stato === "ATTIVA" ? iniziaNoleggio : terminaNoleggio}>
                                        {props.stato === "INIZIATA" ? "Termina noleggio" : "Inizia noleggio"}
                                    </Button>
                                    <TerminaNoleggioModal id={props.id} depositi={showModals.terminaModal.depositi}
                                        show={showModals.terminaModal.show}
                                        onHide={() => setShowModals({ ...showModals, terminaModal: { show: false } })} />
                                    <EstendiNoleggioModal id={props.id} dataConsegna={props.dataConsegna} show={showModals.estendiModal} onHide={() => setShowModals({ ...showModals, estendiModal: false })} />
                                </div>
                                : props.stato === "PROGRAMMATA" ?
                                    <div className="buttonsGroup gy-3 justify-content-end mt-4">
                                        <Button onClick={cambiaMezzo} variant={"Light"}>Cambia mezzo</Button>
                                        <Button onClick={modificaPrenotazione} variant={"Light"}>Modifica</Button>
                                        <Button onClick={() => setShowModals({ ...showModals, deleteModal: true })} variant={"Danger"}>Annulla noleggio</Button>
                                        <AnnullaPrenotazioneModal id={props.id} show={showModals.deleteModal} onHide={() => setShowModals({ ...showModals, deleteModal: false })} />
                                    </div> : null}
                        </Row>
                    </Card.Body>
                </Card >
            </Col>
        </React.Fragment >
    );
}