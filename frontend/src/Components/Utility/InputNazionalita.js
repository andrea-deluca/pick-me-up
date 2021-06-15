import React from 'react'

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// NAZIONI JSON
import Nazioni from './Nazioni'

// Options Nazioni from JSON
function OptionNazioni(){
    let options = []
    for (let index = 0; index < Object.keys(Nazioni).length; index++) {
        const element = Object.keys(Nazioni)[index];
        options.push(
            <option value={element.toLowerCase()}>{element}</option>
        );
    }
    return options;
}

// Input Nazionalita
export default function InputNazionalita() {
    return (
        <Form.Group className="col-6 col-lg-3" controlId="nazionalita">
            <Form.Label>Nazionalità</Form.Label>
            <Form.Control className="form-select" as="select">
                <option value="Seleziona..." disabled selected>Seleziona...</option>
                <OptionNazioni/>
            </Form.Control>
        </Form.Group>
    );
}