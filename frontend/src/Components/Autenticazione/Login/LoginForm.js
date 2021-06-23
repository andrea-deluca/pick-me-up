import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession';
import useToken from '../../../Hooks/useToken';
import axios from 'axios';


// Bootstrap Components
import { Image, Form, Container, Row, Col } from "react-bootstrap";

// Custom Components
import Button from "../../Utility/Button";
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import InputPassword from '../../Utility/FormsUtility/InputPassword';
import AlertErroreLogin from './AlertErroreLogin';

var CryptoJS = require("crypto-js");

// Login Form
export default function LoginForm() {
    const [error, setError] = useState({
        show: false,
    });
    const [submit, setSubmit] = useState(false);
    const history = useHistory();
    const { session, setSession } = useSession()
    const { token, setToken } = useToken();

    function onSubmit(e) {
        e.preventDefault();
        setSubmit(true);
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
                        setSession(res.data.user)
                        setToken(res.data.token);
                        history.push("/home");
                    }
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setError({
                            show: true,
                            message: `Password errata.`
                        })
                    } else if (err.response.status === 404) {
                        setError({
                            show: true,
                            message: `Non è stato trovato nessun account associato
                            all'email fornita. Procedi prima con la registrazione`
                        })
                    } else if (err.response.status === 405) {
                        setError({
                            show: true,
                            message: `Il tuo account non risulta essere attivato.
                            Procedi con la verifica via email prima di accedere`
                        })
                    }
                    setSubmit(false);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center gy-4">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <AlertErroreLogin show={error.show} message={error.message} />
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h1 className="h1 text-center t-bold mb-4">Accedi</h1>
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <InputEmail controlId={"loginEmail"} />
                            <InputPassword controlId={"loginPassword"} placeholder={"Inserisci la tua password"}>
                                Password
                            </InputPassword>
                            <Link to="/recupero-password" className="link-secondary">Hai dimenticato la password?</Link>
                            <Button spinner={submit} variant={"Primary"} submit>Accedi</Button>
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