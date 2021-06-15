import React, { useEffect, useState, useContext } from 'react';
import { Controllo } from '../../../App';

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
    const stato = useContext(Controllo)
    const [checkNome, setCheckNome] = useState(false);
    const [checkCognome, setCheckCognome] = useState(false);
    const [checkSesso, setCheckSesso] = useState(false);
    const [checkPatente, setCheckPatente] = useState(false);
    const [checkCF, setCheckCF] = useState(false);
    const [validCF, setValidCF] = useState(false);

    /*const [validazione, setValidazione] = useState({
        checkNome: false,
        checkCognome: false,
        checkSesso: false,
    })*/
    // setValidazione({...validazione, checkNome: true})

    // Controllo sul nome
    useEffect(() => {
        let inputNome = document.querySelector("#nome");
        if (checkNome) {
            inputNome.classList.remove("border-danger", "border-success");
            inputNome.value === "" ? inputNome.classList.add("border-danger") : inputNome.classList.add("border-success");
        }
        setCheckNome(false)
    }, [checkNome])

    // Controllo sul cognome
    useEffect(() => {
        let inputCognome = document.querySelector("#cognome");
        if (checkCognome) {
            inputCognome.classList.remove("border-danger", "border-success")
            inputCognome.value === "" ? inputCognome.classList.add("border-danger") : inputCognome.classList.add("border-success");
        }
        setCheckCognome(false)
    }, [checkCognome])

    // Controllo sul sesso
    useEffect(() => {
        let inputSesso = document.querySelector("#sesso");
        if (checkSesso) {
            inputSesso.classList.remove("border-danger", "border-success")
            inputSesso.value === "" ? inputSesso.classList.add("border-danger") : inputSesso.classList.add("border-success");
        }
        setCheckSesso(false)
    }, [checkSesso])

    // Controllo sul possesso della patente
    useEffect(() => {
        let inputPatente = document.querySelector("#possessoPatente");
        if (checkPatente) {
            inputPatente.classList.remove("border-danger", "border-success")
            inputPatente.value === "" ? inputPatente.classList.add("border-danger") : inputPatente.classList.add("border-success");
        }
        setCheckPatente(false)
    }, [checkPatente])

    // Gestisce il controllo del CF
    useEffect(() => {
        if (checkCF) {
            const datadinascita = new Date(document.querySelector('#dataNascita').value);
            const nazionalita = document.querySelector("#nazionalita").value;
            const inputCF = document.querySelector("#CF");
            const data = {
                name: document.querySelector('#nome').value,
                surname: document.querySelector('#cognome').value,
                gender: document.querySelector('#sesso').value,
                day: parseInt(datadinascita.getDate()),
                month: parseInt(datadinascita.getMonth() + 1),
                year: parseInt(datadinascita.getFullYear()),
                birthplace: nazionalita === "ITALIA" ? document.querySelector("#comune").value : nazionalita,
                birthplaceProvincia: nazionalita === "ITALIA" ? document.querySelector("#provincia").value : "EE"
            }
            let cf;
            if ((data.gender === "M" || data.gender === "F") && (!isNaN(datadinascita.getTime())) && (nazionalita !== "") && (data.comune !== "")) {
                cf = CodiceFiscale.compute(data);
                console.log(cf)
            }
            if (cf !== inputCF.value.toUpperCase()) {
                inputCF.classList.add("border-danger");
                inputCF.classList.remove("border-success");
            } else {
                inputCF.classList.add("border-success");
                inputCF.classList.remove("border-danger");
                setValidCF(true);
            }
        }
        setCheckCF(false)
    }, [checkCF])

    function onSubmit(e) {
        e.preventDefault();
        if (!validCF) {
            return
        }
        const user = {
            nome: document.querySelector("#nome").value,
            cognome: document.querySelector("#cognome").value,
            dataNascita: document.querySelector("#dataNascita").value,
            sesso: document.querySelector("#sesso").value,
            cf: document.querySelector("#CF").value,
            possessoPatente: document.querySelector("#possessoPatente").value
        }
        window.localStorage.setItem("user", JSON.stringify(user));
        if (document.querySelector("#possessoPatente").value === "Y") {
            stato.dispatch({ type: 'CONTINUA_CLICKATO', payload: user })
            hystory.push("/signup/richiesta-patente");
        } else {
            window.location.href = "/signup/credenziali"
        }


    }

    // FIX H1 REGISTRAZIONE //${checkNome ? 'text-danger' : 'text-black'} 
    //inputPatente.classList.add("border-danger")
    // per ora così è la rappresentazione identica no? con le ` ` 
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className={`h1 text-center t-bold mb-4 `}>Registrazione</h1>
                    <ProgressBar className="mb-4" now={25} />
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <Form.Group className="col-6 col-lg-6" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo nome" pattern="[A-z]+\ [A-z]+" onBlur={() => setCheckNome(true)} required />
                            </Form.Group>
                            <Form.Group className="col-6 col-lg-6" controlId="cognome">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo cognome" pattern="[A-z]+\ [A-z]+" onBlur={() => setCheckCognome(true)} required />
                            </Form.Group>
                            <InputDataNascita />
                            <Form.Group className="col-6 col-lg-6" controlId="sesso">
                                <Form.Label>Sesso anagrafico </Form.Label>
                                <Form.Control className="form-select" as="select" onBlur={() => setCheckSesso(true)} required>
                                    <option value="" disabled selected>Seleziona...</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </Form.Control>
                            </Form.Group>
                            <InputLuogoNascita />
                            <Form.Group className="col-6" controlId="CF">
                                <Form.Label>Codice fiscale</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" onBlur={() => setCheckCF(true)} required />
                            </Form.Group>
                            <Form.Group className="col-6" controlId="possessoPatente">
                                <Form.Label>Hai la patente di guida? </Form.Label>
                                <Form.Control className="form-select" as="select" onBlur={() => setCheckPatente(true)} required>
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