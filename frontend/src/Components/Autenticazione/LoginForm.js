import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Image, Form, Container, Row, Col } from "react-bootstrap";

// Custom Components
import Button from "../Utility/Button";
import InputEmail from '../Utility/InputEmail';
import InputPassword from '../Utility/InputPassword';

// Login Form
export default function LoginForm() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
                <Col lg={4} xs={12} className="d-flex flex-column offset-lg-1 me-auto px-3 px-lg-0">
                    <h1 className="display-5 text-center t-bold">Accedi</h1>
                    <Form method="GET" className="row d-flex flex-column mx-auto gy-4 py-5">
                            <InputEmail />
                            <InputPassword />
                        <div className="">
                            <Link to="/recupero-password" className="link-secondary">Hai dimenticato la password?</Link>
                        </div>
                        <Button variant={"Primary"} submit>Accedi</Button>
                    </Form>
                </Col>
                <Col lg={6} className="d-none d-lg-block me-auto">
                    <Image fluid src="/assets/svg/login.svg" alt="Recupero password" />
                </Col>
        </Container>
    );
}