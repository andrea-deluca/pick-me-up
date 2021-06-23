import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function CellulareModal(props) {
    const [state, setState] = useState({
        error: false,
        success: false,
        submit: false
    })
    const { session, setSession } = useSession();
    const history = useHistory()

    function onSubmit(e) {
        e.preventDefault();
        const cellulareInput = document.getElementById("modificaCellulare");
        const data = {
            id: session.id,
            cellulare: cellulareInput.value
        }
        setState({ ...state, submit: true });
        try {
            axios.put("/profilo/modificaCellulare", data)
                .then(res => {
                    if (res.status === 200) {
                        setSession({ ...session, cellulare: res.data.toString() })
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
            aria-labelledby="modificaCellulareModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="modificaCellulareModal">
                    Modifica cellulare
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success || state.error ?
                    <AlertMessage
                        show={state.success || state.error}
                        variant={state.success ? "success" : "danger"}
                        header={state.success ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success ? "La modifica del tuo cellulare è andata a buon fine." : "La modifica del tuo cellulare non è andata a buon fine."}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: false }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 10, offset: 1 }}>
                                <Form.Group controlId="modificaCellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il nuovo numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
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