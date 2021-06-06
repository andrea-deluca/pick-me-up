import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Image, Container, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

// Custom Components
import Button from '../Utility/Button'

// Schermata Recupero Password Completato
export default function RecuperoPasswordCompletato() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-75">
            <div className="d-flex flex-column align-items-center">
                <Col xs={6}>
                    <Image fluid src="/assets/svg/email-sent.svg" alt="Email inviata" />
                </Col>
                <Col className="d-flex flex-column align-items-center py-4">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#198754" />
                        <h1 className="ps-3 t-subtitle text-success t-bold text-center">Recupero password completato</h1>
                    </div>
                    <p className="text-center text-success t-light">Ti abbiamo inviato una email contenente una nuova password generata dal sistema.</p>
                    <Link to="/login">
                        <Button variant={"Success"}>Accedi</Button>
                    </Link>
                </Col>
            </div>
        </Container>
    );
}