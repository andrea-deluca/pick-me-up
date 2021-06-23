import React from 'react'

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import InputEmail from '../../Utility/FormsUtility/InputEmail';

export default function CellulareModal(props) {
    function onSubmit(e) {
        e.preventDefult();
        console.log("submit")
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="modificaCellulareModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="modificaCellulareModal">
                    Modifica cellulare
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="gy-4" >
                        <Col xs={{ span: 10, offset: 1 }}>
                            <InputEmail controlId={"signupEmail"} />
                        </Col>
                        <div className="buttonsGroup col-10 offset-1 justify-content-end">
                            <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                            <Button variant={"Primary"} submit>Modifica</Button>
                        </div>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}