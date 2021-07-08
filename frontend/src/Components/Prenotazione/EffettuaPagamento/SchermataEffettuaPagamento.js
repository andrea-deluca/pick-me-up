import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

import { motion } from 'framer-motion';

import { Container, Row, Col, Image, Form } from 'react-bootstrap';

import Button from '../../Utility/Button';
import AggiungiMetodoModal from '../../GestioneAccount/Wallet/AggiungiMetodoModal'

export default function SchermataEffettuaPagamento() {
    const history = useHistory()
    const { session, setSession } = useSession()
    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState({
        submit: false
    })

    function onSubmit(e) {
        e.preventDefault()
        const datiPrenotazione = {
            ...history.location.state.payload,
            metodoPagamento: document.querySelector("#metodoPagamentoPrenotazione").value,
            idUtente: session.id
        }
        setState({ ...state, submit: true })
        try {
            axios.post("/prenotazione/confermaPrenotazione", datiPrenotazione)
                .then(res => {
                    history.push("/prenota", {
                        type: "PRENOTAZIONE_COMPLETATA"
                    })
                })
                .catch(err => {

                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center h-100">
            <motion.div
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <Row className="gy-4">
                    <Col xs={{ span: 6 }} lg={{ span: 3 }} className="mx-auto">
                        <Image fluid className="" src="/assets/svg/pagamento.svg" alt="effettua pagamento" />
                    </Col>
                    <div>
                        <h1 className="h1 t-bold text-center">Effettua pagamento</h1>
                        <p className="h6 text-center t-light">Effettua il pagamento per completare la tua prenotazione.</p>
                    </div>
                    <Col xs={{ span: 11 }} lg={{ span: 8 }} className="mx-auto">
                        {session.metodiPagamento.length === 0 ?
                            <div className="d-flex flex-column align-items-center">
                                <h3 className="t-light text-muted text-center mb-4">Nessun metodo di pagamento trovato...</h3>
                                <Button onClick={() => setShowModal(true)} variant={"Primary"}>Aggiungi metodo di pagamento</Button>
                                <AggiungiMetodoModal show={showModal} onHide={() => setShowModal(false)} />
                            </div> :
                            <Form onSubmit={onSubmit} >
                                <Form.Group controlId="metodoPagamentoPrenotazione">
                                    <Form.Label>Metodo di pagamento</Form.Label>
                                    <Form.Control className="form-select" as="select" required >
                                        <option value="" disabled selected>Seleziona metodo di pagamento</option>
                                        {session.metodiPagamento.map(key => {
                                            return (
                                                <option value={key._id}>
                                                    {key.numeroCarta} | {key.titolare}
                                                </option>
                                            )
                                        })}
                                    </Form.Control >
                                </Form.Group>
                                <div className="buttonsGroup mt-4 flex-column flex-lg-row align-items-end">
                                    <Button className="mb-3" onClick={() => setShowModal(true)} variant={"Light"}>Aggiungi metodo di pagamento</Button>
                                    <Button className="mb-3" onClick={() => history.push("/prenota")} variant={"Secondary"} submit>Annulla</Button>
                                    <Button className="mb-3" spinner={state.submit} variant={"Primary"} submit>Effettua pagamento</Button>
                                    <AggiungiMetodoModal show={showModal} onHide={() => setShowModal(false)} />
                                </div>
                            </Form>
                        }
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
}