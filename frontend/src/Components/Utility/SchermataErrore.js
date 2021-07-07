import React from 'react';

import { motion } from 'framer-motion';

// Bootstrap Components
import { Image, Container, Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'

// Custom Components
import Button from './Button'

export default function SchermataErrore(props) {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <Row className="gy-3">
                    <Col xs={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                        <Image fluid src={props.imagePath} alt={props.imageAlt} />
                    </Col>
                    <h1 className="h1 text-danger t-bold text-center">
                        <FontAwesomeIcon icon={faTimesCircle} size="sm" color="#fe6d73" /> {props.title}
                    </h1>
                    <p className="h6 text-center text-danger t-light">{props.children}</p>
                    <Col className="d-flex justify-content-center">
                        <Button to={props.buttonTo} variant={"Danger"}>{props.buttonLabel}</Button>
                    </Col>
                </Row>
            </motion.div>
        </Container>
    );
}