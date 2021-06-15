import React from 'react'

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// NAZIONI JSON
import LuogoNascita from './LuogoNascita'


// Options Regioni from JSON
function OptionRegioni(){
    let options = []
    for (let index = 0; index < LuogoNascita.regioni.length; index++) {
        const element = LuogoNascita.regioni[index].nome
        options.push(
            <option value={element.toLowerCase()}>{element.toUpperCase()}</option>
        );
    }
    return options;
}

// Input Nazionalita
export default function InputRegione() {
    return (
        <Form.Group className="col-6 col-lg-3" controlId="">
            <Form.Label>Regione</Form.Label>
            <Form.Control className="form-select" as="select">
                <option value="Seleziona..." disabled selected>Seleziona...</option>
                <OptionRegioni/>
            </Form.Control>
        </Form.Group>
    );
}