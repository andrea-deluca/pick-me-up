import React from 'react';
import Navbar from './Navbar';

import { Form, Container, Col, Row } from "react-bootstrap";
import Button from "./Button";


export default function SchermataLogin() {
    return (
        <React.Fragment>
            <Navbar />
                <Container className="login d-flex justify-content-center align-items-center">
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col xs={4}>
                            <div className="d-flex flex-column justify-content-between align-items-start">
                                <h1 className="t-bold pb-4">Accedi</h1>
                                <Form className="">
                                    <Form.Group className="pb-4" controlId="formBasicEmail">
                                        <Form.Label className="pb-2">Email</Form.Label>
                                        <Form.Control type="email" placeholder="Inserisci la tua email" />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="pb-4" controlId="formBasicPassword">
                                        <Form.Label className="pb-2">Password</Form.Label>
                                        <Form.Control type="password" placeholder="Inserisci la tua password" />
                                    </Form.Group>
                                    <div className="d-flex flex-column justify-content-center align-items-start">
                                        <a className="pb-3" href="">Hai dimenticato la password?</a>
                                        <div className="button">
                                            <Button text={"Accedi"} style={"Primary"} />
                                        </div>

                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div>
                                <img className="img-fluid" src="/assets/svg/login.svg" alt="cassaforte" />
                            </div>
                        </Col>
                    </Row>
                </Container>
        </React.Fragment>
    );
}
