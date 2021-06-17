import React from 'react';

// Bootstrap Components
import { Image, Container, Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

// Custom Components
import Button from './Button'

export default function SchermataOperazioneCompletata(props) {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="gy-3">
                <Col xs={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <Image fluid src={props.imagePath} alt={props.imageAlt} />
                </Col>
                <h1 className="h1 text-success t-bold text-center">
                    <FontAwesomeIcon icon={faCheckCircle} size="sm" color="#17c3b2" /> {props.title}
                </h1>
                <p className="h6 text-center text-success t-light">{props.children}</p>
                <Col className="d-flex justify-content-center">
                    <Button to={props.buttonTo} variant={"Success"}>{props.buttonLabel}</Button>
                </Col>
            </Row>
        </Container>
    )
}