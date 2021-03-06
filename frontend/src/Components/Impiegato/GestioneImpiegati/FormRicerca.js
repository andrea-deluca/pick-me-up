import React from 'react'

import { Form, Row, Col } from 'react-bootstrap';

import Button from '../../Utility/Button';

export default function FormRicerca() {

    function onSubmit(e) {
        e.preventDefault()
        const inputCodiceUtente = document.getElementById("idImpiegato").value
        const inputNome = document.getElementById("nomeImpiegato").value
        const inputCognome = document.getElementById("cognomeImpiegato").value
        const inputEmail = document.getElementById("emailImpiegato").value
        const inputCodiceFiscale = document.getElementById("codiceFiscaleImpiegato").value

        const table = document.getElementById("impiegatiTable")
        const tableRows = table.getElementsByTagName("tr")

        for (let i = 0; i < tableRows.length; i++) {
            let codiceUtente = tableRows[i].getElementsByTagName("td")[1]
            let nome = tableRows[i].getElementsByTagName("td")[2]
            let cognome = tableRows[i].getElementsByTagName("td")[3]
            let email = tableRows[i].getElementsByTagName("td")[4]
            let codiceFiscale = tableRows[i].getElementsByTagName("td")[5]
            if (codiceUtente && nome && cognome && email && codiceFiscale) {
                let valueCodiceUtente = codiceUtente.textContent || codiceUtente.innerText
                let valueNome = nome.textContent || nome.innerText
                let valueCognome = cognome.textContent || cognome.innerText
                let valueEmail = email.textContent || email.innerText
                let valueCodiceFiscale = codiceFiscale.textContent || codiceFiscale.innerText
                if (valueCodiceUtente.toUpperCase().indexOf(inputCodiceUtente.toUpperCase()) > -1
                    && valueNome.toUpperCase().indexOf(inputNome.toUpperCase()) > -1
                    && valueCognome.toUpperCase().indexOf(inputCognome.toUpperCase()) > -1
                    && valueEmail.toUpperCase().indexOf(inputEmail.toUpperCase()) > -1
                    && valueCodiceFiscale.toUpperCase().indexOf(inputCodiceFiscale.toUpperCase()) > -1) {
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
                <Col lg={{span: 12}} xl={{span: 3}}>
                    <Form.Group controlId="idImpiegato">
                        <Form.Label>ID impiegato</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci ID" />
                    </Form.Group>
                </Col>
                <Col lg={{span: 6}} xl={{span: 2}}>
                    <Form.Group controlId="nomeImpiegato">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci nome" />
                    </Form.Group>
                </Col>
                <Col lg={{span: 6}} xl={{span: 2}}>
                    <Form.Group controlId="cognomeImpiegato">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci cognome" />
                    </Form.Group>
                </Col>
                <Col lg={{span: 6}} xl={{span: 3}}>
                    <Form.Group controlId="emailImpiegato">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci email" />
                    </Form.Group>
                </Col>
                <Col lg={{span: 6}} xl={{span: 2}}>
                    <Form.Group controlId="codiceFiscaleImpiegato">
                        <Form.Label>Codice Fiscale</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci CF"/>
                    </Form.Group>
                </Col>
                <Col xs={{ span: 12 }} className="d-flex justify-content-end">
                    <Button variant={"Primary"} submit>Cerca</Button>
                </Col>
            </Row>
        </Form>
    );
}