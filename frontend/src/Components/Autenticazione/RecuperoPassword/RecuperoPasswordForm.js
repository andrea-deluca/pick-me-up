import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { Image, Form, Container, Row, Col, Spinner } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button'
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import AlertErroreRecuperoPassword from './AlertErroreRecuperoPassword';

// Recupero Password Form
export default function RecuperoPasswordForm() {
    const [error, setError] = useState({
        show: false,
    });
    const [submit, setSubmit] = useState(false);
    const history = useHistory()

    function onSubmit(e) {
        e.preventDefault();
        setSubmit(true)
        const data = {
            email: document.getElementById("recuperoPasswordEmail").value,
        }
        try {
            axios.post("/autenticazione/recupero-password", data)
                .then(res => {
                    if (res.status === 201) {
                        history.push("/recupero-password/completato");
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError({
                            show: true,
                            message: `Non è stato trovato nessun account associato
                            all'email fornita.`
                        })
                        setSubmit(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="align-items-center gy-4">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <AlertErroreRecuperoPassword show={error.show} message={error.message} />
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h1 className="h1 text-center t-bold">Recupero password</h1>
                    <p className="h6 text-muted t-light text-center mb-4">Inserisci l'indirizzo email con cui ti sei registrato per continuare</p>
                    <Form onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <InputEmail controlId={"recuperoPasswordEmail"} />
                            <Button spinner={submit} variant={"Primary"} submit>Continua</Button>
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