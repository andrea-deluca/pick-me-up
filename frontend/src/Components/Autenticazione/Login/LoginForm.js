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
import AlertMessage from '../../Utility/AlertMessage';

var CryptoJS = require("crypto-js");

// Login Form
export default function LoginForm() {
    const history = useHistory();
    const { session, setSession } = useSession()
    const { token, setToken } = useToken();
    const [state, setState] = useState({
        error: {
            show: false
        },
        submit: false
    });

    function onSubmit(e) {
        e.preventDefault();
        setState({ ...state, submit: true });
        let email = document.getElementById("loginEmail").value;
        let encryptedPassword = CryptoJS.AES.encrypt(document.querySelector("#loginPassword").value, "pick-me-up").toString();
        const credenziali = {
            email: email,
            encryptedPassword: encryptedPassword
        }
        try {
            axios.post("/autenticazione/accedi", credenziali)
                .then((res) => {
                    setSession(res.data.user)
                    setToken(res.data.token);
                    history.push("/home");
                })
                .catch(err => {
                    setState({
                        error: {
                            show: true,
                            message: err.response.data
                        },
                        submit: false
                    })
                })
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center gy-4">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <AlertMessage
                        show={state.error.show}
                        variant={"danger"}
                        header={"Accesso fallito!"}
                        body={state.error.message}
                        to={"/signup"}
                        button={"Registrati"} />
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h1 className="h1 text-center t-bold mb-4">Accedi</h1>
                    <Form onSubmit={onSubmit} onClick={() => setState({ ...state, error: { show: false } })}>
                        <Row className="gy-4">
                            <InputEmail controlId={"loginEmail"} />
                            <InputPassword controlId={"loginPassword"} placeholder={"Inserisci la tua password"}>
                                Password
                            </InputPassword>
                            <Link to="/recupero-password" className="link-secondary">Hai dimenticato la password?</Link>
                            <Button spinner={state.submit} variant={"Primary"} submit>Accedi</Button>
                        </Row>
                    </Form>
                </Col>
                <Col lg={{ span: 5, offset: 1 }} className="d-none d-lg-block">
                    <Image fluid src="/assets/svg/login.svg" alt="Login" />
                </Col>
            </Row>
        </Container >
    );
}