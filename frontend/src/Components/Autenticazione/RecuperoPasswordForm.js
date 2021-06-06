import React from 'react';

// Bootstrap Components
import { Image, Form, Container, Col } from 'react-bootstrap';

// Custom Components
import Button from '../Utility/Button'

// Custom Action
import validateEmailFormat from '../../Actions/validateForm';

// Recupero Password Form
export default function RecuperoPasswordForm() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
            <Col lg={4} xs={12} className="d-flex flex-column offset-lg-1 me-auto px-3 px-lg-0">
                <h1 className="display-5 text-center t-bold">Recupero password</h1>
                <p className="t-light text-center">Inserisci l'indirizzo email con cui ti sei registrato per continuare</p>
                <Form method="GET" className="row mx-auto gy-4 py-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required id="email" type="email" placeholder="Inserisci la tua email" onBlur={validateEmailFormat} />
                        <Form.Text id="emailErr" className="text-danger d-none">Formato email non valido!</Form.Text>
                    </Form.Group>
                    <Button  variant={"Primary"} submit >Continua</Button>
                </Form>
            </Col>
            <Col lg={6} className="d-none d-lg-block me-auto">
                <Image fluid src="/assets/svg/recovery.svg" alt="Recupero password" />
            </Col>
        </Container>
    );
}