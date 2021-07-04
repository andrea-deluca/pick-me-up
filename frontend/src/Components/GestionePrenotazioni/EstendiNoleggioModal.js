import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../Utility/Button';
import AlertMessage from '../Utility/AlertMessage';
import InputDataPrenotazione from '../Utility/FormsUtility/InputDataPrenotazione'

export default function EstendiNoleggioModal(props) {
    const history = useHistory()
    const { session, setSession } = useSession()
    const [state, setState] = useState({
        error: {
            show: false
        },
        success: {
            show: false
        },
        submit: false
    })

    function onSubmit(e) {
        e.preventDefault()
        const dataConsegnaEstensione = document.querySelector("#dataConsegnaEstensione")
        const orarioConsegnaEstensione = document.querySelector("#orarioConsegnaEstensione")
        const dataConsegna = new Date(dataConsegnaEstensione.value + "T" + orarioConsegnaEstensione.value + ":00")
        setState({ ...state, submit: true })
        try {
            axios.put("/gestione-prenotazione/estendiNoleggio", { _id: props.id, dataConsegna: dataConsegna, idUtente: session.id })
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
            aria-labelledby="estendiNoleggioModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="estendiNoleggioModal">
                    Estendi noleggio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Indietro"}
                        onClick={() => { state.success.show ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <InputDataPrenotazione
                                controlDataId={"dataConsegnaEstensione"}
                                labelData={"Data di consegna"}
                                placeholderData={"Inserisci la nuova data di consegna"}
                                controlOrarioId={"orarioConsegnaEstensione"}
                                labelOrario={"Ora di consegna"}
                                defaultOrario={"Seleziona nuova ora di consegna"}
                                dataConsegna={props.dataConsegna} />
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant={"Primary"} submit>Conferma</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}