import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { Image, Form, Container, Row, Col } from "react-bootstrap";

// Custom Components
import Button from "../../Utility/Button";
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import InputPassword from '../../Utility/FormsUtility/InputPassword';

var CryptoJS = require("crypto-js");

// Login Form
export default function LoginForm() {
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        let email = document.getElementById("loginEmail").value;
        let encryptedPassword = CryptoJS.AES.encrypt(document.querySelector("#loginPassword").value, "pick-me-up").toString();
        const credenziali = {
            email: email,
            encryptedPassword: encryptedPassword
        }
        try {
            axios.post("/autenticazione/accedi", credenziali)
                .then((res) => {
                    if (res.status === 202) {
                        console.log(res.data)
                        window.sessionStorage.setItem("utente", JSON.stringify(res.data));
                        console.log(window.sessionStorage.getItem("utente"))
                        history.push("/home");
                    }
                })
                .catch(err => {
                    console.log(":(");
                })
        } catch (error) {
            console.log("errore");
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h1 className="h1 text-center t-bold mb-4">Accedi</h1>
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <InputEmail controlId={"loginEmail"} />
                            <InputPassword controlId={"loginPassword"} />
                            <Link to="/recupero-password" className="link-secondary">Hai dimenticato la password?</Link>
                            <Button variant={"Primary"} submit>Accedi</Button>
                        </Row>
                    </Form>
                </Col>
                <Col lg={{ span: 5, offset: 1 }} className="d-none d-lg-block">
                    <Image fluid src="/assets/svg/login.svg" alt="Login" />
                </Col>
            </Row>
        </Container>
    );
}