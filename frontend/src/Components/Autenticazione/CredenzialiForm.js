import React, { useEffect, useState } from 'react';

import { ProgressBar, Container, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Button from '../Utility/Button';
import InputEmail from '../Utility/InputEmail';

export default function CredenzialiForm() {
    const [showPassword, setShowPassoword] = useState(false);


    return (
        <Container fluid className="d-flex align-items-center justify-content-between h-100">
            <Col lg={10} className="d-flex flex-column mx-auto">
                <h1 className="display-5 text-center t-bold">Registrazione</h1>
                <ProgressBar className="col-10 mx-auto" now={80} />
                <Form method="GET" className="row gy-4 py-5">
                    <div className="d-flex justify-content-evenly">
                        <div className="col-3">
                            <InputEmail />
                        </div>
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Cellulare</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il numero di cellulare" />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-evenly">
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <FontAwesomeIcon onClick={() => setShowPassoword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} />
                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Inserisci una password valida" />
                        </Form.Group>
                        <Form.Group className="col-3" controlId="formBasicEmail">
                            <Form.Label>Conferma password</Form.Label>
                            <Form.Control type="password" placeholder="Conferma la tua password" />
                        </Form.Group>
                    </div>
                    <div className="col-auto offset-2">
                        <Button variant={"Primary"} submit>Continua</Button>
                    </div>
                </Form>
            </Col>
        </Container>
    );
}