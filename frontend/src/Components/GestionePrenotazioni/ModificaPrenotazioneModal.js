import React, { useState } from 'react'
import { useHistory } from 'react-router';
import useSession from '../../Hooks/useSession';
import axios from 'axios';

import { Row, Col, Modal } from 'react-bootstrap'

import Button from '../Utility/Button';
import AlertMessage from '../Utility/AlertMessage';

export default function ModificaPrenotazioneModal(props) {
    const history = useHistory()
    const { session, setSession } = useSession()
    const datiPrenotazione = history.location.state.payload
    const [state, setState] = useState({
        error: {
            show: false
        },
        success: {
            show: false
        },
        submit: false
    })

    function onClick(e) {
        e.preventDefault()
        const utente = {
            id: session.id,
            nome: session.nome,
            cognome: session.cognome,
            codiceFiscale: session.codiceFiscale,
            cellulare: session.cellulare,
            email: session.email,
        }
        setState({ ...state, submit: true })
        try {
            axios.put("/gestione-prenotazione/modificaPrenotazione", { utente: utente, prenotazione: datiPrenotazione })
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

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="modificaPrenotazioneModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="ModificaPrenotazioneModal">
                    Modifica prenotazione
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Prenotazione modificata con successo" : "Operazione fallita!"}
                        body={state.success ? state.success.message : state.error.message}
                        button={"Le mie prenotazioni"}
                        onClick={() => { history.push("/gestione-prenotazioni") }} />
                    : <Row className="gy-4" >
                        <Col xs={{ span: 10, offset: 1 }}>
                            <h3 className="t-bold text-center h5">Sei sicuro di voler modificare la tua prenotazione?</h3>
                            <h6 className="t-light text-center text-muted">
                                L'operazione potrebbe comportare un sovrapprezzo
                                o un rimborso parziale a seconda delle modifiche apportate.
                            </h6>
                        </Col>
                        <div className="buttonsGroup col-10 offset-1 justify-content-end">
                            <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                            <Button spinner={state.submit} variant={"Primary"} onClick={onClick}>Conferma</Button>
                        </div>
                    </Row>}
            </Modal.Body>
        </Modal>
    );
}