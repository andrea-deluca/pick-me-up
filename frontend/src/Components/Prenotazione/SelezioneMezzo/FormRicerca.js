import React from 'react'

import { Form, Row } from 'react-bootstrap';

import Button from '../../Utility/Button';

export default function FormRicerca(props) {
    return (
        <Form>
            <Row>
                <Form.Group className='col-lg-4'>
                    <Form.Label>Cerca veicolo</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci il nome del veicolo" required />
                </Form.Group>
                <Form.Group className='col-lg-3'>
                    <Form.Label>Numero di Posti </Form.Label>
                    <Form.Control className="form-select" as="select" required >
                        <option value="" disabled selected>Seleziona...</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control >
                </Form.Group>
                <Form.Group className='col-lg-2'>
                    <Form.Label>Carburante </Form.Label>
                    <Form.Control className="form-select" as="select" required >
                        <option value="" disabled selected>Seleziona...</option>
                        <option value="Ben">Benzina</option>
                        <option value="Gas">Gasolio</option>
                        <option value="GPL">GPL</option>
                        <option value="Met">Metano</option>
                        <option value="Ele">Elettricità</option>
                    </Form.Control >
                </Form.Group>
                <Form.Group className='col-lg-2'>
                    <Form.Label>Cambio </Form.Label>
                    <Form.Control className="form-select" as="select" required >
                        <option value="" disabled selected>Seleziona...</option>
                        <option value="Man">Manuale</option>
                        <option value="Auto">Automatico</option>
                    </Form.Control>
                </Form.Group>
                <div className='col-auto align-self-end'>
                    <Button variant={"Primary"}>Cerca</Button>
                </div>
            </Row>
        </Form>
    );
}