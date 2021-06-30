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

    
    function checkValidity(){
        
        document.querySelector("#dataScadenzaCarta").classList.remove("border-danger", "text-danger")

        const dataScadenzaCarta = document.querySelector("#dataScadenzaCarta")
    
        //Controllo sulle date inserite
        const now = new Date();
        const dataScadenza = new Date(dataScadenzaCarta.value)
        if(now.getFullYear() > dataScadenza.getFullYear()) {
            return false;
        } else if(now.getFullYear() === dataScadenza.getFullYear()){
            if(now.getMonth() > dataScadenza.getMonth()){
                return false
            } else if(now.getMonth() === dataScadenza.getMonth()) {
                if(now.getDate() > dataScadenza.getDate()) {
                    return false
                }
            }
        }

        return true
    }
    

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
        
        if(!checkValidity()) {
            dataScadenzaCarta.classList.add("border-danger", "text-danger")
            return
        } else {
            dataScadenzaCarta.classList.add("border-success", "text-success")
        }
        setState({ ...state, submit: true });
        try {
            axios.post("/wallet/aggiungiCarta", data)
                .then(res => {
                    setSession({ ...session, metodiPagamento: [...session.metodiPagamento, res.data.metodoPagamento] })
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
            aria-labelledby="aggiungiMetodoModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="aggiungiMetodoModal">
                    Aggiungi metodo di pagamento
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
                            <Col xs={{ span: 5, offset: 1 }}>
                                <Form.Group controlId="titolareCarta">
                                    <Form.Label>Titolare</Form.Label>
                                    <Form.Control type="text" placeholder="Nome e cognome del titolare" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 5 }}>
                                <Form.Group controlId="numeroCarta">
                                    <Form.Label>Numero Carta</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il numero della carta" pattern="\d{12}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 5, offset: 1 }} >
                                <Form.Group controlId="dataScadenzaCarta">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control onBlur={() => checkValidity} type="date" placeholder="Inserisci data di scadenza" required />
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