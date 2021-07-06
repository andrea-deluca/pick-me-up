import React from 'react'

import { Row, Col, Form } from 'react-bootstrap'

import Button from '../../Utility/Button';
import InputEmail from '../../Utility/FormsUtility/InputEmail'

export default function FormRicerca() {

    function onSubmit(e) {
        e.preventDefault()
        const idPrenotazione = document.getElementById("idPrenotazione").value
        const idCliente = document.getElementById("idCliente").value
        const emailCliente = document.getElementById("emailCliente").value
        const dataPrenotazione = document.getElementById("dataPrenotazione").value

        const table = document.getElementById("prenotazioniTable")
        const tableRows = table.getElementsByTagName("tr")

        for (let i = 0; i < tableRows.length; i++) {
            let prenotazione = tableRows[i].getElementsByTagName("td")[1]
            let cliente = tableRows[i].getElementsByTagName("td")[2]
            let email = tableRows[i].getElementsByTagName("td")[3]
            let data = tableRows[i].getElementsByTagName("td")[4]
            if (prenotazione && cliente && email && data) {
                let valuePrenotazione = prenotazione.textContent || prenotazione.innerText
                let valueCliente = cliente.textContent || cliente.innerText
                let valueEmail = email.textContent || email.innerText
                let valueData = data.textContent || data.innerText
                if (valuePrenotazione.toUpperCase().indexOf(idPrenotazione.toUpperCase()) > -1 
                && valueCliente.toUpperCase().indexOf(idCliente.toUpperCase()) > -1
                && valueEmail.toUpperCase().indexOf(emailCliente.toUpperCase()) > -1
                && valueData.toUpperCase().indexOf(dataPrenotazione.toUpperCase()) > -1) {
                    tableRows[i].style.display = ""
                } else {
                    tableRows[i].style.display = "none"
                }
            }
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Row className="gy-3 align-items-end">
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="idPrenotazione">
                        <Form.Label>Prenotazione</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci ID prenotazione" />
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="idCliente">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci ID cliente" />
                    </Form.Group>
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <InputEmail controlId={"emailCliente"} placeholder={"Inserisci email cliente"} />
                </Col>
                <Col lg={{ span: 6 }} xl={{ span: 3 }}>
                    <Form.Group controlId="dataPrenotazione">
                        <Form.Label>Data di prenotazione</Form.Label>
                        <Form.Control type="date" placeholder="Inserisci data di prenotazione" />
                    </Form.Group>
                </Col>
                <Col xs={{ span: 12 }} className="justify-content-end d-flex">
                    <Button variant={"Primary"} submit>Cerca</Button>
                </Col>
            </Row>
        </Form>
    );
}