import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../Utility/Button';
import InputDataPrenotazione from '../../Utility/FormsUtility/InputDataPrenotazione';
import AlertMessage from '../../Utility/AlertMessage'

export default function FormPrenotazione() {
    const history = useHistory()
    const [state, setState] = useState({
        submit: false,
        error: {
            show: false,
        },
    })

    function checkValidity() {

        document.querySelector("#dataRitiro").classList.remove("border-danger", "text-danger")
        document.querySelector("#dataConsegna").classList.remove("border-danger", "text-danger")
        document.querySelector("#oraRitiro").classList.remove("border-danger", "text-danger")
        document.querySelector("#oraConsegna").classList.remove("border-danger", "text-danger")
        document.querySelector("#dataRitiro").classList.remove("border-success", "text-success")
        document.querySelector("#dataConsegna").classList.remove("border-success", "text-success")
        document.querySelector("#oraRitiro").classList.remove("border-success", "text-success")
        document.querySelector("#oraConsegna").classList.remove("border-success", "text-success")

        const dataRitiro = document.querySelector("#dataRitiro")
        const dataConsegna = document.querySelector("#dataConsegna")

        // Controllo sulle date inserite
        const now = new Date();
        const dateRitiro = new Date(dataRitiro.value)
        const dateConsegna = new Date(dataConsegna.value)
        if (now.getFullYear() > dateRitiro.getFullYear()) {
            return false;
        } else if (now.getFullYear() === dateRitiro.getFullYear()) {
            if (now.getMonth() > dateRitiro.getMonth()) {
                return false
            } else if (now.getMonth() === dateRitiro.getMonth()) {
                if (now.getDate() > dateRitiro.getDate()) {
                    return false
                }
            }
        } else if (now.getFullYear() > dateConsegna.getFullYear()) {
            return false;
        } else if (now.getFullYear() === dateConsegna.getFullYear()) {
            if (now.getMonth() > dateConsegna.getMonth()) {
                return false
            } else if (now.getMonth() === dateConsegna.getMonth()) {
                if (now.getDate() > dateConsegna.getDate()) {
                    return false
                }
            }
        } else if (dateRitiro.getFullYear() > dateConsegna.getFullYear()) {
            return false;
        } else if (dateRitiro.getFullYear() === dateConsegna.getFullYear()) {
            if (dateRitiro.getMonth() > dateConsegna.getMonth()) {
                return false
            } else if (dateRitiro.getMonth() === dateConsegna.getMonth()) {
                if (dateRitiro.getDate() > dateConsegna.getDate()) {
                    return false
                }
            }
        }

        const orarioRitiro = document.querySelector("#oraRitiro")
        const orarioConsegna = document.querySelector("#oraConsegna")
        const oraRitiro = parseInt(orarioRitiro.value.split(":")[0]);
        const minutiRitiro = parseInt(orarioRitiro.value.split(":")[1]);
        const oraConsegna = parseInt(orarioConsegna.value.split(":")[0]);
        const minutiConsegna = parseInt(orarioConsegna.value.split(":")[1]);

        // Controllo sugli orari inseriti
        if (new Date(dataRitiro.value).toString() === new Date(dataConsegna.value).toString()) {
            if (oraRitiro > oraConsegna) {
                return false
            } else if ((oraRitiro === oraConsegna) && (minutiRitiro >= minutiConsegna)) {
                return false
            }
        }
        return true
    }

    function onSubmit(e) {
        e.preventDefault()
        const localitaRitiro = document.querySelector("#ritiro")
        const localitaConsegna = document.querySelector("#consegna")
        const dataRitiro = document.querySelector("#dataRitiro")
        const dataConsegna = document.querySelector("#dataConsegna")
        const orarioRitiro = document.querySelector("#oraRitiro")
        const orarioConsegna = document.querySelector("#oraConsegna")

        if (!checkValidity()) {
            dataRitiro.classList.add("border-danger", "text-danger")
            dataConsegna.classList.add("border-danger", "text-danger")
            orarioRitiro.classList.add("border-danger", "text-danger")
            orarioConsegna.classList.add("border-danger", "text-danger")
            return
        } else {
            dataRitiro.classList.add("border-success", "text-success")
            dataConsegna.classList.add("border-success", "text-success")
            orarioRitiro.classList.add("border-success", "text-success")
            orarioConsegna.classList.add("border-success", "text-success")
            const datiPrenotazione = {
                ...history.location.state.payload.datiPrenotazione,
                ritiro: {
                    localita: localitaRitiro.value,
                    nome: localitaRitiro.options[localitaRitiro.selectedIndex].text,
                    data: new Date(dataRitiro.value + "T" + orarioRitiro.value + ":00"),
                },
                consegna: {
                    localita: localitaConsegna.value,
                    nome: localitaConsegna.options[localitaConsegna.selectedIndex].text,
                    data: new Date(dataConsegna.value + "T" + orarioConsegna.value + ":00"),
                }
            }
            setState({ ...state, submit: true })

            try {
                axios.post("/prenotazione/fetchVeicoliDisponibili", datiPrenotazione)
                    .then(res => {
                        history.push("/prenota", {
                            payload: {
                                datiPrenotazione: datiPrenotazione,
                                veicoli: res.data
                            },
                            type: "SELEZIONE_MEZZO"
                        })
                    })
                    .catch(err => {
                        setState({ submit: false, error: { show: true, message: err.response.data } })
                    })
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    return (
        <React.Fragment>
            <AlertMessage
                show={state.error.show}
                variant={"danger"}
                header={"Operazione fallita!"}
                body={state.error.message}
                button={"Chiudi"}
                onClick={() => setState({ ...state, error: { show: false } })} />
            <Form onSubmit={onSubmit}>
                <Row className="gy-4">
                    <Col xs={{ span: 12 }}>
                        <Form.Group controlId="ritiro">
                            <Form.Label>Località di ritiro</Form.Label>
                            <Form.Control as="select" className="form-select" required>
                                <option value="" disabled selected>Seleziona località di ritiro</option>
                                {history.location.state.payload.depositi.map(key => {
                                    return (
                                        <option value={key._id}>{key.nome}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <InputDataPrenotazione
                        controlDataId={"dataRitiro"}
                        labelData={"Data di ritiro"}
                        placeholderData={"Seleziona data di ritiro"}
                        controlOrarioId={"oraRitiro"}
                        defaultOrario={"Seleziona ora di ritiro"}
                        labelOrario={"Ora di ritiro"} />
                    <Col xs={{ span: 12 }}>
                        <Form.Group controlId="consegna">
                            <Form.Label>Località di consegna</Form.Label>
                            <Form.Control as="select" className="form-select" required>
                                <option value="" disabled selected>Seleziona località di consegna</option>
                                {history.location.state.payload.depositi.map(key => {
                                    return (
                                        <option value={key._id}>{key.nome}</option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <InputDataPrenotazione
                        controlDataId={"dataConsegna"}
                        labelData={"Data di consegna"}
                        placeholderData={"Seleziona data di consegna"}
                        controlOrarioId={"oraConsegna"}
                        defaultOrario={"Seleziona ora di consegna"}
                        labelOrario={"Ora di consegna"} />
                    <div className="d-flex justify-content-end mt-5">
                        <Button onClick={() => history.push("/prenota")} variant={"Secondary"} >Annulla</Button>
                        <Button spinner={state.submit} variant={"Primary"} submit >Continua</Button>
                    </div>
                </Row>
            </Form>
        </React.Fragment>
    );
}