import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { Image, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button'
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import AlertMessage from '../../Utility/AlertMessage';

// Recupero Password Form
export default function RecuperoPasswordForm() {
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        submti: false
    });

    function onSubmit(e) {
        e.preventDefault();
        setState({...state, submit: true})
        const data = {
            email: document.getElementById("recuperoPasswordEmail").value,
        }
        try {
            axios.post("/autenticazione/recupero-password", data)
                .then(res => {
                    history.push("/recupero-password/completato");
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
                        header={"Recupero password fallito!"}
                        body={state.error.message}
                        to={"/signup"}
                        button={"Registrati"} />
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }}>
                    <h1 className="h1 text-center t-bold">Recupero password</h1>
                    <p className="h6 text-muted t-light text-center mb-4">Inserisci l'indirizzo email con cui ti sei registrato per continuare</p>
                    <Form onSubmit={onSubmit} onClick={() => setState({...state, error: { show: false }})}>
                        <Row className="gy-4">
                            <InputEmail controlId={"recuperoPasswordEmail"} required />
                            <Button spinner={state.submit} variant={"Primary"} submit>Continua</Button>
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