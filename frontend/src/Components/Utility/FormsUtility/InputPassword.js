import React, { useState } from 'react'

// Bootstrap Components
import { Form, InputGroup, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Input Password
export default function InputPassword() {
    const [showPassword, setShowPassoword] = useState(false);

    return (
        <Col xs={12}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label className="pe-2">Password</Form.Label>
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id="passwordInfo">
                            Una password per essere valida deve contenere:
                             <br/>• Un carattere Maiuscolo (A-Z)
                             <br/>• Almeno un carattere numerico (0-9)
                             <br/>• Caratteri non alfanumerici, (!,$,#,% ecc..)
                        </Tooltip>
                    }
                >
                    <FontAwesomeIcon icon={faInfoCircle} />
                </OverlayTrigger>
                <InputGroup controlId="password">
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Inserisci la tua password" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" required />
                    <InputGroup.Append>
                        <InputGroup.Text className="h-100"><FontAwesomeIcon onClick={() => setShowPassoword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} /></InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
                </InputGroup>
            </Form.Group>
        </Col>
    );
}