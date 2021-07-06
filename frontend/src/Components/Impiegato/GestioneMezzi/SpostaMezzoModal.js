import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Modal, Form, Col, Row } from 'react-bootstrap';

import AlertMessage from '../../Utility/AlertMessage';
import Button from '../../Utility/Button';
import axios from 'axios';

export default function SpostaMezzoModal(props) {
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

    console.log(props.key)

    function onSubmit(e) {
        e.preventDefault()
        const nuovoDeposito = document.querySelector("#nuovoDeposito").value
        const data = {
            ...props.data,
            nuovoDeposito: nuovoDeposito
        }
        try {
            axios.put("/gestione-mezzi/spostaMezzo", data)
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
            aria-labelledby="spostaMezzoModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="spostaMezzoModal">
                    Sposta mezzo
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
                            <Form.Group controlId="nuovoDeposito">
                                <Form.Label>Nuovo deposito</Form.Label>
                                <Form.Control as="select" className="form-select" required>
                                    <option value="" disabled selected>Seleziona deposito</option>
                                    {props.depositi && props.depositi.map(key => {
                                        return (
                                            <option value={key._id}>{key.nome}</option>
                                        );
                                    })}
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