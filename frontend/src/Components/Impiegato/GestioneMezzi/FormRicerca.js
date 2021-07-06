import React from 'react'

import { Form, Row, Col } from 'react-bootstrap';

import Button from '../../Utility/Button';

export default function FormRicerca() {

    function onSubmit(e) {
        e.preventDefault()
        const inputMarca = document.getElementById("marcaMezzo").value
        const inputModello = document.getElementById("modelloMezzo").value
        const inputTarga = document.getElementById("targaMezzo").value
        const inputTipologia = document.getElementById("tipologiaMezzo").value
        const inputDeposito = document.getElementById("depositoMezzo").value
        const inputDisponibilita = document.getElementById("disponibilitaMezzo").value

        const table = document.getElementById("mezziTable")
        const tableRows = table.getElementsByTagName("tr")

        for (let i = 0; i < tableRows.length; i++) {
            let tipologia = tableRows[i].getElementsByTagName("td")[1]
            let marca = tableRows[i].getElementsByTagName("td")[2]
            let modello = tableRows[i].getElementsByTagName("td")[3]
            let targa = tableRows[i].getElementsByTagName("td")[4]
            let deposito = tableRows[i].getElementsByTagName("td")[5]
            let disponibilita = tableRows[i].getElementsByTagName("td")[6]
            if (marca && modello && targa && tipologia && deposito && disponibilita) {
                let valueMarca = marca.textContent || marca.innerText
                let valueModello = modello.textContent || modello.innerText
                let valueTarga = targa.textContent || targa.innerText
                let valueTipologia = tipologia.textContent || tipologia.innerText
                let valueDeposito = deposito.textContent || deposito.innerText
                let valueDisponibilita = disponibilita.textContent || disponibilita.innerText
                if (valueMarca.toUpperCase().indexOf(inputMarca.toUpperCase()) > -1
                    && valueModello.toUpperCase().indexOf(inputModello.toUpperCase()) > -1
                    && valueTarga.toUpperCase().indexOf(inputTarga.toUpperCase()) > -1
                    && valueTipologia.toUpperCase().indexOf(inputTipologia.toUpperCase()) > -1
                    && valueDeposito.toUpperCase().indexOf(inputDeposito.toUpperCase()) > -1
                    && valueDisponibilita.toUpperCase().indexOf(inputDisponibilita.toUpperCase()) > -1) {
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
                <Col>
                    <Form.Group controlId="marcaMezzo">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci marca" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="modelloMezzo">
                        <Form.Label>Modello</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci modello" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="targaMezzo">
                        <Form.Label>Targa</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci targa" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tipologiaMezzo">
                        <Form.Label>Tipologia</Form.Label>
                        <Form.Control className="form-select" as="select" >
                            <option value="" selected>Seleziona...</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                            <option value="bici">Bici</option>
                            <option value="monopattino">Monopattino</option>
                        </Form.Control >
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="depositoMezzo">
                        <Form.Label>Deposito</Form.Label>
                        <Form.Control className="form-select" as="select" >
                            <option value="" selected>Seleziona...</option>
                            <option value="porta nuova">Porta Nuova</option>
                            <option value="stadio">Stadio</option>
                            <option value="stazione centrale">Stazione Centrale</option>
                            <option value="forum">Forum</option>
                            <option value="conca d'oro">Conca d'Oro</option>
                            <option value="facoltà di ingegneria">Facoltà di Ingegneria</option>
                            <option value="parcheggio basile">Parcheggio Basile</option>
                            <option value="teatro massimo">Teatro Massimo</option>
                            <option value="giardino inglese">Giardino Inglese</option>
                            <option value="corso calatafimi">Corso Calatafimi</option>
                            <option value="parco uditore">Parco Uditore</option>
                            <option value="piazza politeama">Piazza Politeama</option>
                            <option value="mondello">Mondello</option>
                        </Form.Control >
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="disponibilitaMezzo">
                        <Form.Label>Disponibilità </Form.Label>
                        <Form.Control className="form-select" as="select" >
                            <option value="" selected>Seleziona...</option>
                            <option value="disponibile">Disponibile</option>
                            <option value="non disponibile">Non Disponibile</option>
                        </Form.Control >
                    </Form.Group>
                </Col>
                <Col xs={{ span: 12 }} className="d-flex justify-content-end">
                    <Button variant={"Primary"} submit>Cerca</Button>
                </Col>
            </Row>
        </Form>
    );
}