import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';
import InputPassword from '../../Utility/FormsUtility/InputPassword';

const CryptoJS = require("crypto-js");

export default function PasswordModal(props) {
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: false,
        submit: false
    })
    const { session, setSession } = useSession();
    const history = useHistory()

    function onSubmit(e) {
        e.preventDefault();
        const vecchiaPasswordInput = document.getElementById("vecchiaPassword");
        const nuovaPasswordInput = document.getElementById("nuovaPassword");
        const confermaPasswordInput = document.getElementById("confermaNuovaPassword");
        if (nuovaPasswordInput.value !== confermaPasswordInput.value) {
            setState({ ...state, error: { show: true, message: "La nuova password e la conferma non coincidono." } })
            return
        }
        const encryptedVecchiaPassword = CryptoJS.AES.encrypt(vecchiaPasswordInput.value, "pick-me-up").toString()
        const encryptedNuovaPassword = CryptoJS.AES.encrypt(nuovaPasswordInput.value, "pick-me-up").toString()
        const data = {
            id: session.id,
            vecchiaPassword: encryptedVecchiaPassword,
            nuovaPassword: encryptedNuovaPassword
        }
        setState({ ...state, submit: true });
        try {
            axios.put("/profilo/modificaPassword", data)
                .then(res => {
                    if (res.status === 200) {
                        setState({ ...state, submit: false, success: true })
                    }
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setState({ ...state, error: { show: true, message: "Password errata. Riprova." }, submit: false });
                    } else {
                        setState({ ...state, error: { show: true, message: "La modifica della password non è andata a buon fine." }, submit: false });
                    }
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="modificaPasswordModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="modificaPasswordModal">
                    Modifica password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success || state.error.show ?
                    <AlertMessage
                        show={state.success || state.error.show}
                        variant={state.success ? "success" : "danger"}
                        header={state.success ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success ? "La modifica della tua email è andata a buon fine." : state.error.message}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 10, offset: 1 }}>
                                <InputPassword controlId={"vecchiaPassword"} placeholder={"Inserisci la tua password attuale"}>
                                    Vecchia password
                                </InputPassword>
                            </Col>
                            <Col xs={{ span: 10, offset: 1 }}>
                                <InputPassword tooltip controlId={"nuovaPassword"} placeholder={"Inserisci la tua nuova password"}>
                                    Nuova password
                                </InputPassword>
                            </Col>
                            <Col xs={{ span: 10, offset: 1 }}>
                                <InputPassword controlId={"confermaNuovaPassword"} placeholder={"Conferma la tua password"}>
                                    Conferma password
                                </InputPassword>
                            </Col>
                            <div className="buttonsGroup col-10 offset-1 justify-content-end">
                                <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                <Button variant={"Primary"} submit>Modifica</Button>
                            </div>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}