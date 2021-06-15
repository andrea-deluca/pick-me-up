import React from 'react';

// Bootstrap Components
import { Image, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button'
import InputEmail from '../../Utility/FormsUtility/InputEmail';

// Recupero Password Form
export default function RecuperoPasswordForm() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h1 className="h1 text-center t-bold">Recupero password</h1>
                    <p className="h6 text-muted t-light text-center mb-4">Inserisci l'indirizzo email con cui ti sei registrato per continuare</p>
                    <Form method="GET">
                        <Row className="gy-4">
                            <InputEmail />
                            <Button to="/" variant={"Primary"} submit>Continua</Button>
                        </Row>
                    </Form>
                </Col>
                <Col lg={{ span: 5, offset: 1 }} className="d-none d-lg-block">
                    <Image fluid src="/assets/svg/recovery.svg" alt="Recupero password" />
                </Col>
            </Row>
        </Container>
    );
}