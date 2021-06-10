import React, { useState } from 'react'

// Bootstrap Components
import { Col, Form, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function InputPassword() {
    const [showPassword, setShowPassoword] = useState(false);

    return (
        <Col>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Inserisci una password valida" />
                    <InputGroup.Append>
                        <InputGroup.Text className="h-100"><FontAwesomeIcon onClick={() => setShowPassoword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} /></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Col>
    );
}