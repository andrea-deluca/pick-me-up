import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import InputPassword from '../../Utility/FormsUtility/InputPassword';
import ErroreRegistrazione from './ErroreRegstrazione';

var CryptoJS = require("crypto-js");

// Form credenziali di accesso
export default function CredenzialiForm() {
    const [error, setError] = useState(false);
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        if (document.querySelector("#signupPassword").value !== document.querySelector("#confermaPassword").value) {
            document.querySelector("#confermaPasswordError").classList.remove("d-none");
            return
        }
        else {
            const encryptedPassword = CryptoJS.AES.encrypt(document.querySelector("#signupPassword").value, "pick-me-up").toString();
            const userData = {
                ...history.location.state.payload,
                credenziali: {
                    cellulare: document.querySelector("#cellulare").value,
                    email: document.querySelector("#signupEmail").value,
                    password: encryptedPassword,
                }
            }
            try {
                axios.post("/autenticazione/registraUtente", userData)
                    .then((res) => {
                        if (res.status === 201) {
                            //router.dispatch({ type: 'COMPLETATO' });
                            history.push("/signup", {
                                type: "COMPLETATO"
                            });
                        }
                    })
                    .catch(err => {
                        setError(true)
                    })
            } catch (err) {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="gy-5">
                <Col xs={{ span: 10, offset: 1 }}>
                    <ErroreRegistrazione show={error} />
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar now={80} className="mb-4" />
                    <Form onSubmit={onSubmit} onClick={() => setError(false)}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <InputEmail controlId={"signupEmail"}/>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <InputPassword controlId={"signupPassword"}/>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="confermaPassword">
                                    <Form.Label>Conferma password</Form.Label>
                                    <Form.Control type="password" placeholder="Conferma la tua password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" required />
                                    <Form.Text id="confermaPasswordError" className="d-none text-danger">Le password non coincidono!</Form.Text>
                                </Form.Group>
                            </Col>
                            <Button variant={"Primary"} submit>Continua</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
}