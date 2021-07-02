import React from 'react';

import { motion } from 'framer-motion'

import { Col, Row, Container } from 'react-bootstrap'

import Map from './Map';
import FormPrenotazione from './FormPrenotazione';

export default function SchermataFormPrenotazione() {
    return (
        <Container fluid className="p-0 h-100 align-items-center justify-content-center">
            <Row className="h-100 g-0 align-items-center">
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 5 }} className="mx-auto my-5">
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <h1 className="h1 text-center t-bold mb-4">Prenotazione</h1>
                        <FormPrenotazione />
                    </motion.div>
                </Col>
                <Col xs={{ span: 6 }} lg={{ span: 6 }} className="h-100 d-none d-lg-block">
                    <Map />
                </Col>
            </Row>
        </Container>
    );
}