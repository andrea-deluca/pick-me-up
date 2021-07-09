import React from 'react'
import { useHistory } from 'react-router-dom';

import { Row, Col, Modal, Form } from 'react-bootstrap'

import Button from '../../Utility/Button';

export default function LasciaManciaModal(props) {
    const history = useHistory()

    function lasciaMancia() {
        const mancia = document.getElementById("manciaInput").value
        history.location.state.payload = {
            ...history.location.state.payload,
            totale: history.location.state.payload.totale + parseInt(mancia)
        }
        console.log(history.location.state.payload.totale)
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="lasciaManciaModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="lasciaManciaModal">
                    Lascia mancia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Row className="gy-4" >
                        <Form.Group controlId="manciaInput">
                            <Form.Label>Importo mancia</Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                        <Col xs={{ span: 12 }} className="buttonsGroup justify-content-end">
                            <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                            <Button variant={"Primary"} onClick={lasciaMancia}>Paga ora</Button>
                        </Col>
                    </Row>
                </Form>

            </Modal.Body>
        </Modal>
    );
}