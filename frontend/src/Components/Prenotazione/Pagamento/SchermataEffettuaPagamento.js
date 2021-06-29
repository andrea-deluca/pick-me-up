import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

import { Container, Row, Col, Image, Form } from 'react-bootstrap';

import Button from '../../Utility/Button';
import AggiungiMetodoModal from '../../GestioneAccount/Wallet/AggiungiMetodoModal'

export default function SchermataEffettuaPagamento() {
    const history = useHistory()
    const { session, setSession } = useSession()
    const [showModal, setShowModal] = useState(false);


    function onClick(e) {
        e.preventDefault()
        const datiPrenotazione = {
            ...history.location.state.payload,
            metodoPagamento: document.querySelector("#metodoPagamentoPrenotazione").value,
            idUtente: session.id 
        }
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
            <Row className="gy-4">
                <div className="col-3 mx-auto">
                    <Image fluid className="" src="/assets/svg/pagamento.svg" alt="effettua pagamento" />
                </div>
                <div>
                    <h1 className="h1 t-bold text-center">Effettua pagamento</h1>
                    <p className="h6 text-center t-light">Effettua il pagamento per completare la tua prenotazione.</p>
                </div>
                <Col xs={{ span: 8 }} className="mx-auto">
                    <Form>
                        <Form.Group controlId="metodoPagamentoPrenotazione">
                            <Form.Label>Metodo di pagamento</Form.Label>
                            <Form.Control className="form-select" as="select" required >
                                <option value="" disabled selected>Seleziona metodo di pagamento</option>
                                {session.metodiPagamento.map(key => {
                                    return (
                                        <option value={key.id}>
                                            {key.numeroCarta} | {key.titolare}
                                        </option>
                                    )
                                })}
                            </Form.Control >
                        </Form.Group>
                    </Form>
                </Col>
                <div className="buttonsGroup">
                    <Button onClick={() => setShowModal(true)} variant={"Light"}>Aggiungi metodo di pagamento</Button>
                    <Button onClick={onClick} variant={"Primary"}>Effettua pagamento</Button>
                    <AggiungiMetodoModal show={showModal} onHide={() => setShowModal(false)} />
                </div>
            </Row>
        </Container>
    );
}