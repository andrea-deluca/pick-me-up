import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Modal, Form, Col, Row } from 'react-bootstrap';

import AlertMessage from '../../Utility/AlertMessage';
import Button from '../../Utility/Button';

export default function CambiaRuoloModal(props) {
    const history = useHistory()
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
        const ruolo = document.querySelector("#ruolo").value
        const data = {
            _id: props.id,
            ruolo: ruolo
        }
        setState({ ...state, submit: true })
        try {
            axios.put("/gestione-impiegati/cambiaRuolo", data)
                .then(res => {
                    setState({ ...state, submit: false, success: { show: true, message: res.data } })
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
            aria-labelledby="cambiaRuoloModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="cambiaRuoloModal">
                    Cambia ruolo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione eseguita con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Chiudi"}
                        onClick={() => { state.success.show ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Form.Group controlId="ruolo">
                                <Form.Label>Nuovo ruolo</Form.Label>
                                <Form.Control as="select" className="form-select" required>
                                    <option value="" disabled selected>Seleziona ruolo</option>
                                    <option value="AMMINISTRATORE">Amministratore</option>
                                    <option value="GESTORE_MEZZI">Gestore mezzi</option>
                                    <option value="AUTISTA">Autista</option>
                                </Form.Control>
                            </Form.Group>
                            <Col xs={{ span: 12 }} className="buttonsGroup justify-content-end">
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