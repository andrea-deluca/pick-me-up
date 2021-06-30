import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession';
import axios from 'axios'

import { Col, Row, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import Button from '../../Utility/Button';
import InputOrario from '../../Utility/FormsUtility/InputOrario';
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
        } else if (dateRitiro > dateConsegna) {
            return false;
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
                    <Form.Group className="col-6 col-lg-6" controlId="dataRitiro">
                        <Form.Label className="pe-2">Data di ritiro</Form.Label>
                        <OverlayTrigger
                            placement={"top"}
                            overlay={
                                <Tooltip id="dataNascitaInfo">
                                    Formato valido per la data di ritiro: AAAA-MM-GG.
                                </Tooltip>}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </OverlayTrigger>
                        <Form.Control type="date" placeholder="Seleziona data di ritiro" pattern="[0-9]{4}-[0-1][0-9]-[0-3][0-9]" required />
                    </Form.Group>
                    <Col xs={{ span: 6 }}>
                        <InputOrario
                            controlId={"oraRitiro"}
                            default={"Seleziona ora di ritiro"}
                            label={"Ora di ritiro"}
                            required />
                    </Col>
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
                    <Form.Group className="col-6 col-lg-6" controlId="dataConsegna">
                        <Form.Label className="pe-2">Data di consegna</Form.Label>
                        <OverlayTrigger
                            placement={"top"}
                            overlay={
                                <Tooltip id="dataNascitaInfo">
                                    Formato valido per la data di consegna: AAAA-MM-GG.
                                </Tooltip>}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </OverlayTrigger>
                        <Form.Control type="date" placeholder="Seleziona data di consegna" pattern="[0-9]{4}-[0-1][0-9]-[0-3][0-9]" required />
                    </Form.Group>
                    <Col xs={{ span: 6 }}>
                        <InputOrario
                            controlId={"oraConsegna"}
                            default={"Seleziona ora di consegna"}
                            label={"Ora di consegna"}
                            required />
                    </Col>
                    <Button spinner={state.submit} variant={"Primary"} submit >Continua</Button>
                </Row>
            </Form>
        </React.Fragment>
    );
}