import React from 'react';

// Bootstrap Components
import { Image, Container, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

// Custom Components
import Button from './Utility/Button'

export default function SchermataOperazioneCompletata(props) {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <div className="d-flex flex-column align-items-center">
                <Col xs={6}>
                    <Image fluid src={props.imagePath} alt={props.imageAlt} />
                </Col>
                <Col className="d-flex flex-column align-items-center py-4">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#17c3b2" />
                        <h1 className="ps-3 t-subtitle text-success t-bold text-center">{props.title}</h1>
                    </div>
                    <p className="text-center text-success t-light">{props.children}</p>
                    <Button to={props.buttonTo} variant={"Success"}>{props.buttonLabel}</Button>
                </Col>
            </div>
        </Container>
    )
}