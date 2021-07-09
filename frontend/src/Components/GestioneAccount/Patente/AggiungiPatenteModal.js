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

    function checkValidity() {

        document.querySelector("#dataScadenzaPatente").classList.remove("border-danger", "text-danger")

        const dataScadenzaPatente = document.querySelector("#dataScadenzaPatente")

        //Controllo sulle date inserite
        const now = new Date();
        const dataScadenza = new Date(dataScadenzaPatente.value)
        if (now.getFullYear() > dataScadenza.getFullYear()) {
            return false;
        } else if (now.getFullYear() === dataScadenza.getFullYear()) {
            if (now.getMonth() > dataScadenza.getMonth()) {
                return false
            } else if (now.getMonth() === dataScadenza.getMonth()) {
                if (now.getDate() > dataScadenza.getDate()) {
                    return false
                }
            }
        }

        return true
    }

    function onSubmit(e) {
        e.preventDefault();
        const tipologiaPatenteInput = document.getElementById("tipologiaPatente");
        const numeroPatenteInput = document.getElementById("numeroPatente");
        const dataScadenzaPatente = document.getElementById("dataScadenzaPatente");
        const ufficioRilascioInput = document.getElementById("ufficioRilascio");
        const data = {
            id: session.id,
            patente: {
                numeroPatente: numeroPatenteInput.value,
                tipologiaPatente: tipologiaPatenteInput.value,
                dataScadenza: dataScadenzaPatente.value,
                ufficioRilascio: ufficioRilascioInput.value,
            }
        }

        if (!checkValidity()) {
            dataScadenzaPatente.classList.add("border-danger", "text-danger")
            return
        } else {
            dataScadenzaPatente.classList.add("border-success", "text-success")
        }
        setState({ ...state, submit: true });
        try {
            axios.post("/patente/aggiungiPatente", data)
                .then(res => {
                    console.log(res.data.patente)
                    setSession({ ...session, patente: res.data.patente })
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
            aria-labelledby="aggiungiPatenteModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="aggiungiPatenteModal">
                    Aggiungi patente
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
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 12 }} lg={{ span: 5, offset: 1 }}>
                                <Form.Group controlId="tipologiaPatente">
                                    <Form.Label>Patente di guida</Form.Label>
                                    <Form.Control className="form-select" as="select" required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="AM">AM</option>
                                        <option value="A1">A1</option>
                                        <option value="A2">A2</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                                <Form.Group controlId="numeroPatente">
                                    <Form.Label>Numero Patente</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero di patente" pattern="[a-zA-Z]{2}\d{7}[a-zA-Z]{1}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 5, offset: 1 }} >
                                <Form.Group controlId="dataScadenzaPatente">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control onBlur={() => checkValidity} type="date" placeholder="Inserisci data di scadenza" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 5 }}>
                            <Form.Group controlId="ufficioRilascio">
                                    <Form.Label>Ufficio di rilascio</Form.Label>
                                    <Form.Control className="form-select" as="select" required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="Prefettura">Prefettura</option>
                                        <option value="MCTC">MCTC</option>
                                        <option value="MIT-UCO">MIT-UCO</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offse: 1 }} className="buttonsGroup justify-content-end">
                                <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant={"Primary"} submit>Aggiungi</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}