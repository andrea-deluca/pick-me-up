import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';
import InputEmail from '../../Utility/FormsUtility/InputEmail';

export default function EmailModal(props) {
    const [state, setState] = useState({
        error: false,
        success: false,
        submit: false
    })
    const { session, setSession } = useSession();
    const history = useHistory()

    function onSubmit(e) {
        e.preventDefault();
        const emailInput = document.getElementById("modificaEmail");
        const data = {
            id: session.id,
            email: emailInput.value
        }
        setState({ ...state, submit: true });
        try {
            axios.put("/profilo/modificaEmail", data)
                .then(res => {
                    if (res.status === 200) {
                        setSession({ ...session, email: res.data.toString() })
                        setState({ ...state, submit: false, success: true })
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setState({ ...state, error: true, submit: false });
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
            aria-labelledby="modificaEmailModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="modificaEmailModal">
                    Modifica Email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success || state.error ?
                    <AlertMessage
                        show={state.success || state.error}
                        variant={state.success ? "success" : "danger"}
                        header={state.success ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success ? "La modifica della tua email è andata a buon fine." : "La modifica della tua email non è andata a buon fine."}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: false }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 10, offset: 1 }}>
                                <InputEmail controlId={"modificaEmail"} />
                            </Col>
                            <div className="buttonsGroup col-10 offset-1 justify-content-end">
                                <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant={"Primary"} submit>Modifica</Button>
                            </div>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}