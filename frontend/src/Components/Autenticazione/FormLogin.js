import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Form, Container, Col, Row } from "react-bootstrap";

// Custom Components
import Button from "../Utility/Button";

export default function FormLogin() {

    function validateFormat() {
        let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        let emailField = document.querySelector("#email");
        let textMuted = document.querySelector("#emailErr");
        emailField.classList.remove("border-danger", "text-danger");
        textMuted.classList.add("d-none");
        let match = emailRegex.test(emailField.value);
        if (!match) {
            emailField.classList.add("border-danger", "text-danger");
            textMuted.classList.remove("d-none");
        } else {
            emailField.classList.remove("border-danger", "text-danger");
            emailField.classList.add("border-success", "text-success");
            textMuted.classList.add("d-none");
        }
    }

    return (
        <Container className="gx-0 h-100 d-flex justify-content-center align-items-center">
            <Row className="gx-5 align-items-center">
                <Col lg={{ span: false, offset: 1, order: "last" }} className="d-lg-block d-none">
                    <img className="img-fluid" src="/assets/svg/login.svg" alt="cassaforte" />
                </Col>
                <Col lg={4} xs={12} className="px-lg-0 px-5">
                    <Form method="GET" className="row gy-4">
                        <h1 className="display-3 text-center t-bold">Accedi</h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required id="email" type="email" placeholder="Inserisci la tua email" onBlur={validateFormat} />
                            <Form.Text id="emailErr" className="text-danger d-none">Formato email non valido!</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label >Password</Form.Label>
                            <Form.Control required type="password" placeholder="Inserisci la tua password" />
                        </Form.Group>
                        <Link to="/recoveryPassword" className="link-secondary">Hai dimenticato la password?</Link>
                        <Button text={"Accedi"} variant={"Primary"} submit />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}