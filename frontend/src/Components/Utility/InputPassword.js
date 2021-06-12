import React, { useState } from 'react'

// Bootstrap Components
import { Form, InputGroup, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Input Password
export default function InputPassword() {
    const [showPassword, setShowPassoword] = useState(false);

    return (
        <Col xs={12}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <InputGroup controlId="password">
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Inserisci la tua password" />
                    <InputGroup.Append>
                        <InputGroup.Text className="h-100"><FontAwesomeIcon onClick={() => setShowPassoword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} /></InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
                </InputGroup>
            </Form.Group>
        </Col>
    );
}