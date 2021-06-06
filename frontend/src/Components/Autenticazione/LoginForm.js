import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Image, Form, Container, Col } from "react-bootstrap";

// Custom Components
import Button from "../Utility/Button";

// Custom Actions
import validateEmailFormat from '../../Actions/validateForm';

// Login Form
export default function LoginForm() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
            <Col lg={4} xs={12} className="d-flex flex-column offset-lg-1 me-auto px-3 px-lg-0">
                <h1 className="display-5 text-center t-bold">Accedi</h1>
                <Form method="GET" className="row mx-auto gy-4 py-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required id="email" type="email" placeholder="Inserisci la tua email" onBlur={validateEmailFormat} />
                        <Form.Text id="emailErr" className="text-danger d-none">Formato email non valido!</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control required type="password" placeholder="Inserisci la tua password" />
                    </Form.Group>
                    <Link to="/recupero-password" className="link-secondary">Hai dimenticato la password?</Link>
                    <Button variant={"Primary"} submit>Accedi</Button>
                </Form>
            </Col>
            <Col lg={6} className="d-none d-lg-block me-auto">
                <Image fluid src="/assets/svg/login.svg" alt="Recupero password" />
            </Col>
        </Container>
    );
}