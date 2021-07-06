import React from 'react';
import { Redirect } from 'react-router';
import useSession from '../../../Hooks/useSession';
import useToken from '../../../Hooks/useToken';

// Motion Framer Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image } from 'react-bootstrap';


// Custom Components
import NavAside from '../../GestioneAccount/NavAside';
import FormRicerca from './FormRicerca';
import ListaMezzi from './ListaMezzi';

export default function SchermataGestioneMezzi() {
    const { token, setToken } = useToken()
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
                                <Image fluid className="col-3 col-lg-2 me-3" src="/assets/svg/gestione-mezzi.svg" />
                                <div className="d-flex flex-column">
                                    <p className="h6 t-light">USER ID #{session.id}</p>
                                    <h1 className="h1 t-bold">Gestione mezzi</h1>
                                </div>
                            </div>
                            <FormRicerca />
                            <ListaMezzi />
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        );
    }
}