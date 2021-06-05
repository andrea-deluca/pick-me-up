import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Form, Container, Col, Row } from "react-bootstrap";

// Custom Components
import Navbar from './Navbar';
import Button from "./Button";

// Schermata Login
export default function SchermataLogin() {
    return (
        <div className="view">
            <Navbar />
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
                                <Form.Control required type="email" placeholder="Inserisci la tua email" />
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
        </div>
    );
}
