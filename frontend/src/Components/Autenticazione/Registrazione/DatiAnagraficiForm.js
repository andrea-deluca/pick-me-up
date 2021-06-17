import React, { useEffect, useState, useContext } from 'react';
import { Router } from '../../../App';

// Bootstrap Components
import { ProgressBar, Container, Row, Col, Form } from 'react-bootstrap';

// Custom Components
import InputDataNascita from '../../Utility/FormsUtility/InputDataNascita';
import InputLuogoNascita from '../../Utility/FormsUtility/InputLuogoNascita';
import Button from '../../Utility/Button';
import { useHistory } from 'react-router-dom';

// Codice Fiscale
const CodiceFiscale = require("codice-fiscale-js");

// Form Registrazione dati anagrafici
export default function DatiAnagraficiForm() {
    const hystory = useHistory();
    const router = useContext(Router)
    const [checkValidate, setCheckValidate] = useState({
        nome: false,
        cognome: false,
        sesso: false,
        possessoPatente: false,
        CF: {
            check: false,
            valid: false
        }
    })
    useEffect(() => {
        let inputNome = document.querySelector("#nome");
        let inputCognome = document.querySelector("#cognome");
        let inputSesso = document.querySelector("#sesso");
        let inputPatente = document.querySelector("#possessoPatente");
        if (checkValidate.nome) {
            inputNome.classList.remove("border-danger", "border-success");
            inputNome.value === "" ? inputNome.classList.add("border-danger") : inputNome.classList.add("border-success");
            setCheckValidate({ ...checkValidate, nome: false });
        }
        if (checkValidate.cognome) {
            inputCognome.classList.remove("border-danger", "border-success")
            inputCognome.value === "" ? inputCognome.classList.add("border-danger") : inputCognome.classList.add("border-success");
            setCheckValidate({ ...checkValidate, cognome: false });
        }
        if (checkValidate.sesso) {
            inputSesso.classList.remove("border-danger", "border-success")
            inputSesso.value === "" ? inputSesso.classList.add("border-danger") : inputSesso.classList.add("border-success");
            setCheckValidate({ ...checkValidate, sesso: false });
        }
        if (checkValidate.possessoPatente) {
            inputPatente.classList.remove("border-danger", "border-success")
            inputPatente.value === "" ? inputPatente.classList.add("border-danger") : inputPatente.classList.add("border-success");
            setCheckValidate({ ...checkValidate, possessoPatente: false });
        }
        if (checkValidate.CF.check) {
            let cf;
            let dataNascita = new Date(document.querySelector("#dataNascita").value);
            let nazionalita = document.querySelector("#nazionalita").value;
            let inputCF = document.querySelector("#CF");
            const data = {
                name: document.querySelector('#nome').value,
                surname: document.querySelector('#cognome').value,
                gender: document.querySelector('#sesso').value,
                day: parseInt(dataNascita.getDate()),
                month: parseInt(dataNascita.getMonth() + 1),
                year: parseInt(dataNascita.getFullYear()),
                birthplace: nazionalita === "ITALIA" ? document.querySelector("#comune").value : nazionalita,
                birthplaceProvincia: nazionalita === "ITALIA" ? document.querySelector("#provincia").value : "EE"
            }
            if ((data.gender === "M" || data.gender === "F") && (!isNaN(dataNascita.getTime())) && (nazionalita !== "") && (data.comune !== "")) {
                cf = CodiceFiscale.compute(data);
            }
            if (cf !== inputCF.value.toUpperCase()) {
                inputCF.classList.add("border-danger");
                inputCF.classList.remove("border-success");
                setCheckValidate({ ...checkValidate, CF: { check: false, valid: false } });
            } else {
                inputCF.classList.add("border-success");
                inputCF.classList.remove("border-danger");
                setCheckValidate({ ...checkValidate, CF: { check: false, valid: true } });
            }

        }
    }, [checkValidate])

    function onSubmit(e) {
        e.preventDefault();
        if (!checkValidate.CF.valid) {
            return
        }
        const userData = {
            nome: document.querySelector("#nome").value,
            cognome: document.querySelector("#cognome").value,
            dataNascita: document.querySelector("#dataNascita").value,
            sesso: document.querySelector("#sesso").value,
            cf: document.querySelector("#CF").value,
            possessoPatente: document.querySelector("#possessoPatente").value
        }
        if (document.querySelector("#possessoPatente").value === "Y") {
            router.dispatch({ type: 'RICHIESTA_PATENTE', payload: userData })
            hystory.push("/signup/richiesta-patente");
        } else{
            router.dispatch({ type: 'CREDENZIALI', payload: userData })
            hystory.push("/signup/credenziali");
        }
    }

    // FIX H1 REGISTRAZIONE //${checkNome ? 'text-danger' : 'text-black'} 
    //inputPatente.classList.add("border-danger")
    // per ora così è la rappresentazione identica no? con le ` ` 
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar className="mb-4" now={25} />
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Form.Group className="col-6 col-lg-6" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo nome" pattern="[A-z]+\ [A-z]+" onBlur={() => setCheckValidate({ ...checkValidate, nome: true })} required />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="cognome">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo cognome" pattern="[A-z]+\ [A-z]+" onBlur={() => setCheckValidate({ ...checkValidate, cognome: true })} required />
                            </Form.Group>
                            <InputDataNascita />
                            <Form.Group className="col-6 col-lg-6" controlId="sesso">
                                <Form.Label>Sesso anagrafico </Form.Label>
                                <Form.Control className="form-select" as="select" onBlur={() => setCheckValidate({ ...checkValidate, sesso: true })} required>
                                    <option value="" disabled selected>Seleziona...</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </Form.Control>
                            </Form.Group>
                            <InputLuogoNascita />
                            <Form.Group className="col-6" controlId="CF">
                                <Form.Label>Codice fiscale</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" onBlur={() => setCheckValidate({ ...checkValidate, CF: { ...checkValidate.CF, check: true } })} required />
                            </Form.Group>
                            <Form.Group className="col-6" controlId="possessoPatente">
                                <Form.Label>Hai la patente di guida? </Form.Label>
                                <Form.Control className="form-select" as="select" onBlur={() => setCheckValidate({ ...checkValidate, possessoPatente: true })} required>
                                    <option value="" disabled selected>Seleziona...</option>
                                    <option value="Y">Si</option>
                                    <option value="N">No</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant={"Primary"} submit >Continua</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}