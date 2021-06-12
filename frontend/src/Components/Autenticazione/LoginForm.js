import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Bootstrap Components
import { Image, Form, Container, Row, Col } from "react-bootstrap";

// Custom Components
import Button from "../Utility/Button";
import InputEmail from '../Utility/InputEmail';
import InputPassword from '../Utility/InputPassword';

// Login Form
export default function LoginForm() {
    function onSubmit(e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
        try {
            axios.post("/", email)
                .then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    if (err.response.status == 400) {
                        console.log("400");
                    }
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
                    <Form action="/" onSubmit={onSubmit}>
                        <Row className="gy-4">
                            <InputEmail />
                            <InputPassword />
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