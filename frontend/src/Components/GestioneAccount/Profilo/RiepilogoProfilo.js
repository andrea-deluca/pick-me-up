import React from 'react';

// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../../Utility/Button";

// Riepilogo profilo
export default function RiepilogoProfilo(props) {
    return (
        <Row className="gy-4">
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">SESSO ANAGRAFICO</h6>
                <p className="t-light">{props.sesso}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">DATA DI NASCITA</h6>
                <p className="t-light">{props.dataNascita}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">NAZIONALITÀ</h6>
                <p className="t-light">{props.nazionalita}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">LUOGO DI NASCITA</h6>
                <p className="t-light">{props.luogoNascita}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CODICE FISCALE</h6>
                <p className="t-light">{props.codiceFiscale}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CELLULARE</h6>
                <p className="t-light">{props.cellulare}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">EMAIL</h6>
                <p className="t-light">{props.email}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">PASSWORD</h6>
                <p className="t-light">{props.password}</p>
            </Col>
            <Button variant={"Danger"}><FontAwesomeIcon className="me-2" icon={faTrashAlt} color={"white"} fixedWidth />Elimina account</Button>
        </Row>
    );
}