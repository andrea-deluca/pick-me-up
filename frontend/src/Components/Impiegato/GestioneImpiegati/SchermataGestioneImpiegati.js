import React from 'react'
import { Redirect } from 'react-router';
import useToken from '../../../Hooks/useToken';
import useSession from '../../../Hooks/useSession';

import { motion } from 'framer-motion';

import { Container, Row, Col, Image } from 'react-bootstrap';

import NavAside from '../../Utility/NavAside';
import FormRicerca from '../GestioneImpiegati/FormRicerca';
import ListaImpiegati from '../GestioneImpiegati/ListaImpiegati';

export default function SchermataGestioneImpiegati() {
    const { token, settoken } = useToken()
    const { session, setSession } = useSession()

    if (!token) {
        return <Redirect to={"/login"} />
    } else {
        return (
            <Container fluid className="p-0 h-100">
                <Row className="g-0 h-100 align-items-center">
                    <NavAside />
                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 0 }} className="mx-auto ms-lg-auto mt-5">
                        <motion.div
                            initial={{ translateY: 70, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: 70, opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <div className="d-flex justify-content-start align-items-center mb-5">
                                <Image fluid className="col-3 col-lg-2 me-3" src="/assets/svg/gestione-impiegati.svg" />
                                <div className="d-flex flex-column">
                                    <p className="h6 t-light">USER ID #{session.id}</p>
                                    <h1 className="h1 t-bold">Gestione impiegati</h1>
                                </div>
                            </div>
                            <FormRicerca />
                            <ListaImpiegati />
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        );
    }
}