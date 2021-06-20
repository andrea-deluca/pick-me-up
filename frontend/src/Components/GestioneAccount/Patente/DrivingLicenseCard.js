import React from 'react';

// Bootstrap Components
import { Row, Col, Card } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faIdCard } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../../Utility/Button";

// Card Patente di guida
export default function DrivingLicenseCard(props) {
    return (
        <Card className="driving-license-card text-primary animation-card p-0 mb-4 shadow">
            <Card.Header className="t-bold">Patente di guida</Card.Header>
            <Card.Body>
                <Card.Title className="t-bold mb-5"><FontAwesomeIcon className="me-2" icon={faIdCard} size={"lg"} fixedWidth />{props.numeroPatente}</Card.Title>
                <Card.Text className="mb-4">
                    <Row>
                        <Col xs={{ span: 12 }}>
                            <h6 className="t-bold">PATENTE</h6>
                            <p className="t-light">{props.tipologiaPatente}</p>
                        </Col>
                        <Col>
                            <h6 className="t-bold">DATA DI SCADENZA</h6>
                            <p className="t-light">{props.dataScadenza}</p>
                        </Col>
                        <Col>
                            <h6 className="t-bold">UFFICIO DI RILASCIO</h6>
                            <p className="t-light ">{props.ufficioRilascio}</p>
                        </Col>
                    </Row>
                </Card.Text>
                <div className="buttonsGroup justify-content-start">
                    <Button variant={"Light"}><FontAwesomeIcon className="me-2" icon={faEdit} fixedWidth />Modifica</Button>
                    <Button variant={"Danger"}> <FontAwesomeIcon className="me-2" icon={faTrashAlt} fixedWidth />Elimina</Button>
                </div>
            </Card.Body>
        </Card>
    );
}