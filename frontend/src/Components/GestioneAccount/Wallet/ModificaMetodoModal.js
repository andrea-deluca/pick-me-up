import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function ModificaMetodoModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory()
    const metodoPagamento = session.metodiPagamento[props.index]
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
        const meseInput = document.querySelector("#meseScadenza")
        const annoInput = document.querySelector("#annoScadenza")

        meseInput.classList.remove("border-danger", "text-danger")
        annoInput.classList.remove("border-danger", "text-danger")

        if (parseInt(meseInput.value) > 12 || parseInt(meseInput.value) < 1) {
            return false
        } else if (parseInt(annoInput.value) < new Date().getFullYear()) {
            return false
        } else if (parseInt(annoInput.value) === new Date().getFullYear()) {
            if (parseInt(meseInput.value) <= (new Date().getMonth() + 1)) {
                return false
            }
        }
        return true
    }

    function onSubmit(e) {
        e.preventDefault();
        e.preventDefault();
        const titolareInput = document.getElementById("titolareCarta");
        const numeroCartaInput = document.getElementById("numeroCarta");
        const meseScadenza = document.getElementById("meseScadenza");
        const annoScadenza = document.getElementById("annoScadenza");
        const cvvInput = document.getElementById("codiceCVV");
        const dataScadenza = meseScadenza.value + "/" + annoScadenza.value

        const data = {
            id: session.id,
            idCarta: props.idCarta,
            metodoPagamento: {
                titolare: titolareInput.value,
                numeroCarta: numeroCartaInput.value,
                dataScadenzaCarta: dataScadenza,
                cvv: cvvInput.value,
            },
        }

        if (!checkValidity()) {
            meseScadenza.classList.add("border-danger", "text-danger")
            annoScadenza.classList.add("border-danger", "text-danger")
            return
        } else {
            meseScadenza.classList.add("border-success", "text-success")
            annoScadenza.classList.add("border-success", "text-success")
        }

        setState({ ...state, submit: true });
        try {
            axios.put("/wallet/modificaCarta", data)
                .then(res => {
                    setSession({ ...session, metodiPagamento: res.data.metodiPagamento })
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
            aria-labelledby="modificaMetodoModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="modificaMetodoModal">
                    Modifica metodo di pagamento
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
                                <Form.Group controlId="titolareCarta">
                                    <Form.Label>Titolare</Form.Label>
                                    <Form.Control type="text" placeholder="Nome e cognome del titolare" placeholder={metodoPagamento.titolare} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                                <Form.Group controlId="numeroCarta">
                                    <Form.Label className="me-2" >Numero Carta</Form.Label>
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="numeroCartaInfo">
                                                Il numero della carta per essere valida deve contenere:
                                                <br />• 16 cifre
                                            </Tooltip>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </OverlayTrigger>
                                    <Form.Control type="text" placeholder="Inserisci il numero della carta" placeholder={metodoPagamento.numeroCarta} pattern="\d{16}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 2, offset: 1 }}>
                                <Form.Group controlId="meseScadenza">
                                    <Form.Label>Mese</Form.Label>
                                    <Form.Control onBlur={() => checkValidity} type="text" placeholder="Mese" pattern="\d{2}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 3 }}>
                                <Form.Group controlId="annoScadenza">
                                    <Form.Label>Anno</Form.Label>
                                    <Form.Control onBlur={() => checkValidity} type="text" placeholder="Anno" pattern="\d{4}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                                <Form.Group controlId="codiceCVV">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci CVV" pattern="\d{3}" placeholder={metodoPagamento.cvv} required />
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