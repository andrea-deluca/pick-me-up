import React, { useEffect, useState } from 'react';

import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

import Button from '../../Utility/Button';
import InputLuogoNascita from '../../Utility/InputLuogoNascita';
var CodiceFiscale = require('codice-fiscale-js');

export default function DatiAnagraficiForm() {
    const [checkCF, setCheckCF] = useState(false);

    useEffect(() => {
        // let cf = CodiceFiscale.compute(nome, cognome, sesso, giorno, mese, anno, comune, provincia );
        if (checkCF) {
            let datadinascita = new Date(document.querySelector('#dataNascita').value);
            let nome = document.querySelector('#nome').value;
            let cognome = document.querySelector('#cognome').value;
            let sesso = document.querySelector('#sesso').value;
            let giorno = parseInt(datadinascita.getDate());
            let mese = parseInt(datadinascita.getMonth() + 1);
            let anno = parseInt(datadinascita.getFullYear());
            let nazionalita = document.querySelector("#nazionalita").value;
            let comune = nazionalita === "ITALIA" ? document.querySelector("#comune").value : nazionalita;
            let provincia = nazionalita === "ITALIA" ? document.querySelector("#provincia").value : "EE";
                
            let cf = CodiceFiscale.compute({
                name: nome,
                surname: cognome,
                gender: sesso,
                day: giorno,
                month: mese,
                year: anno,
                birthplace: comune,
                birthplaceProvincia: provincia
            });
            console.log(cf);
        }
        setCheckCF(false)
    }, [checkCF])

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar className="mb-4" now={25} />
                    <Form method="GET">
                        <Row className="gy-4">
                            <Form.Group className="col-6 col-lg-6" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo nome" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="cognome">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo cognome" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="dataNascita">
                                <Form.Label>Data di nascita</Form.Label>
                                <Form.Control type="date" placeholder="Inserisci data di nascita" />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="sesso">
                                <Form.Label>Sesso anagrafico </Form.Label>
                                <Form.Control className="form-select" as="select">
                                    <option value="0" disabled selected>Seleziona...</option>
                                    <option>M</option>
                                    <option>F</option>
                                </Form.Control>
                            </Form.Group>
                            <InputLuogoNascita />
                            <Form.Group className="col-6" controlId="formBasicEmail">
                                <Form.Label>Codice fiscale</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" onBlur={() => setCheckCF(true)} />
                            </Form.Group>
                            <Form.Group className="col-6" controlId="exampleForm.ControlSelect1">
                                <Form.Label>Hai la patente di guida? </Form.Label>
                                <Form.Control className="form-select" as="select">
                                    <option value="" disabled selected>Seleziona...</option>
                                    <option>Si</option>
                                    <option>No</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant={"Primary"} submit>Continua</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}