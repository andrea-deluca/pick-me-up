import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Router } from "../../../App";

// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import InputPassword from '../../Utility/FormsUtility/InputPassword';

var CryptoJS = require("crypto-js");

// Form credenziali di accesso
export default function CredenzialiForm() {
    const router = useContext(Router)
    const history = useHistory()

    if (!router.router.registrazione.richiestaPatente) {
        history.push('/signup');
    }

    function onSubmit(e){
        e.preventDefault(); //password //confermapassword
        if(document.querySelector("#password").value !== document.querySelector("#confermaPassword").value){
            document.querySelector("#confermaPasswordError").classList.remove("d-none");
            return
        }
        else {
            const encryptedPassword = CryptoJS.SHA256(document.querySelector("#password").value).toString();
            const userData = {
            ...router.router.userData,
            credenziali: {
                email: document.querySelector("#email").value,
                password: encryptedPassword,
                cellulare: document.querySelector("#cellulare").value,
            }
        }
        console.log(userData);}      
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar now={80} className="mb-4" />
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <InputEmail />
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <InputPassword />
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