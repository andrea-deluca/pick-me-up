import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function AggiungiMetodoModal(props) {
    const [state, setState] = useState({
        error: false,
        success: false,
        submit: false
    })
    const { session, setSession } = useSession();
    const history = useHistory()

    function onSubmit(e) {
        e.preventDefault();
        const titolareInput = document.getElementById("titolareCarta");
        const numeroCartaInput = document.getElementById("numeroCarta");
        const dataScadenzaCarta = document.getElementById("dataScadenzaCarta");
        const cvvInput = document.getElementById("codiceCVV");
        const data = {
            id: session.id,
            metodoPagamento: {
                titolare: titolareInput.value,
                numeroCarta: numeroCartaInput.value,
                dataScadenzaCarta: dataScadenzaCarta.value,
                cvv: cvvInput.value,
            }
        }
        setState({ ...state, submit: true });
        try {
            axios.post("/wallet/aggiungiCarta", data)
                .then(res => {
                    if (res.status === 201) {
                        setSession({ ...session, metodiPagamento: [...session.metodiPagamento, res.data]  })
                        setState({ ...state, submit: false, success: true })
                    }
                })
                .catch(err => {
                    if (err.status === 400) {
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
                    Aggiungi metodo di pagamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success || state.error ?
                    <AlertMessage
                        show={state.success || state.error}
                        variant={state.success ? "success" : "danger"}
                        header={state.success ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success ? "Il tuo metodo di pagamento è stato registrato con successo" : "La registrazione del tuo metodo di pagamento non è andata a buon fine."}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: false }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 5, offset: 1 }}>
                                <Form.Group controlId="titolareCarta">
                                    <Form.Label>Titolare</Form.Label>
                                    <Form.Control type="text" placeholder="Nome e cognome del titolare" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 5 }}>
                                <Form.Group controlId="numeroCarta">
                                    <Form.Label>Numero Carta</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero della carta" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 5, offset: 1 }} >
                                <Form.Group controlId="dataScadenzaCarta">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="date" placeholder="Inserisci data di scadenza" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 5 }}>
                                <Form.Group controlId="codiceCVV">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci CVV" pattern="\d{3}" required />
                                </Form.Group>
                            </Col>
                            <div className="buttonsGroup col-10 offset-1 justify-content-end">
                                <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant={"Primary"} submit>Aggiungi</Button>
                            </div>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}