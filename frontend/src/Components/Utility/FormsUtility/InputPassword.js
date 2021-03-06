import React, { useState } from 'react'

// Bootstrap Components
import { Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Input Password
export default function InputPassword(props) {
    const [showPassword, setShowPassoword] = useState(false);

    return (
        <Form.Group >
            <Form.Label className="pe-2">{props.children}</Form.Label>
            {props.tooltip ? <OverlayTrigger
                placement={"top"}
                overlay={
                    <Tooltip id="passwordInfo">
                        Una password per essere valida deve contenere:
                        <br />• Un carattere Maiuscolo (A-Z)
                        <br />• Almeno un carattere numerico (0-9)
                        <br />• Caratteri non alfanumerici, (!,$,#,% ecc..)
                    </Tooltip>
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
            </OverlayTrigger> : null}
            <InputGroup >
                <Form.Control id={props.controlId} type={showPassword ? "text" : "password"} placeholder={props.placeholder} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" required />
                <InputGroup.Append>
                    <InputGroup.Text className="h-100">
                        <FontAwesomeIcon onClick={() => setShowPassoword(!showPassword)} icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                </InputGroup.Append>
                <Form.Text id="passwordFormatError" className="text-danger d-none">Formato password non valido!</Form.Text>
            </InputGroup>
        </Form.Group>
    );
}