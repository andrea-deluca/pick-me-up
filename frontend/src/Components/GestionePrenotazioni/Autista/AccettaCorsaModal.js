import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function AccettaCorsaModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: true,
        },
        submit: false
    })

    function accettaCorsa(e) {
        e.preventDefault()
        setState({ ...state, submit: true })
        try {
            axios.put("/gestione-corse/accettaCorsa", { id: props.id })
                .then(res => {
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="accettaCorsaModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="accettaCorsaModal">
                    Accetta corsa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.error.show || state.success.show ?
                    <AlertMessage
                        show={state.error.show || state.success.show}
                        variant={state.error.show ? "danger" : "success"}
                        header={state.error.show ? "Operazione fallita!" : "Operazione eseguita con successo"}
                        body={state.error.show ? state.error.message : state.success.message}
                        button={"Indietro"}
                        onClick={state.error.show ? () => { setState({ ...state, error: { show: false } }) } : () => history.go(0)} />
                    : <Row className="gy-4" >
                        <Col >
                            <h3 className="t-bold text-center h5">Sei sicuro di voler accettare la corsa?</h3>
                        </Col>
                        <div className="buttonsGroup mx-auto">
                            <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                            <Button spinner={state.submit} variant={"Success"} onClick={accettaCorsa}>Conferma</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}