import React from 'react'
import { Redirect } from 'react-router';
import useSession from '../../../Hooks/useSession';

import { motion } from 'framer-motion';

import { Container, Row, Col, Image } from 'react-bootstrap';

import NavAside from '../../Utility/NavAside';
import FormRicerca from './FormRicerca';
import ListaPrenotazioni from './ListaPrenotazioni';

export default function SchermataPrenotazioniAmministratore() {
    const { session, setSession } = useSession()

    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-start">
                <NavAside />
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 0 }} className="mx-auto ms-lg-auto mt-5">
                    <motion.div
                        initial={{ translateY: 70, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 70, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <Image fluid className="col-3 col-lg-2 me-3" src="/assets/svg/prenotazioni.svg" />
                            <div className="d-flex flex-column">
                                <p className="h6 t-light">USER ID #{session.id}</p>
                                <h1 className="h1 t-bold">Gestione prenotazioni</h1>
                            </div>
                        </div>
                        <FormRicerca />
                        <ListaPrenotazioni />
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}