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
    const { session, setSession } = useSession();
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false,
        },
        submit: false
    })

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
                    setSession({ ...session, cellulare: res.data.cellulare.toString() })
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } });
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
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <Form.Group controlId="modificaCellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il nuovo numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
                            </Col>
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