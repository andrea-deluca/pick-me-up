import React, { useEffect, useState } from 'react'

// Bootstrap Components
import { Row, Col, Card } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCreditCard } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../../Utility/Button";
import RimuoviMetodoModal from './RimuoviMetodoModal';

// Card metodo di pagamento
export default function CreditCard(props) {
    const [modals, setModals] = useState({
        updateModal: false,
        deleteModal: false
    })

    return (
        <Card className="credit-card animation-card p-0 mb-4 shadow bg-primary-dark text-white">
            <Card.Header className="text-white t-bold">Metodo di Pagamento</Card.Header>
            <Card.Body>
                <Card.Title className="t-bold mb-5"><FontAwesomeIcon className="me-2" icon={faCreditCard} size={"lg"} fixedWidth />{props.numeroCarta}</Card.Title>
                <Card.Text className="mb-4">
                    <Row>
                        <Col xs={{ span: 12 }}>
                            <h6 className="t-bold">TITOLARE</h6>
                            <p className="t-light">{props.titolare}</p>
                        </Col>
                        <Col>
                            <h6 className="t-bold">DATA DI SCADENZA</h6>
                            <p className="t-light">{props.dataScadenza}</p>
                        </Col>
                        <Col>
                            <h6 className="t-bold">CVV</h6>
                            <p className="t-light ">{props.codiceCVV}</p>
                        </Col>
                    </Row>
                </Card.Text>
                <div className="buttonsGroup justify-content-start">
                    <Button variant={"Light"}>
                        <FontAwesomeIcon className="me-2" icon={faEdit} fixedWidth />
                        Modifica
                    </Button>
                    <Button onClick={() => setModals({ ...modals, deleteModal: true })} variant={"Danger"}>
                        <FontAwesomeIcon className="me-2" icon={faTrashAlt} fixedWidth />
                        Elimina
                    </Button>
                    <RimuoviMetodoModal idCarta={props.idCarta} show={modals.deleteModal} onHide={() => setModals({ ...modals, deleteModal: false })} />
                </div>
            </Card.Body>
        </Card>
    );
}