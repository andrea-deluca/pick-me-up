import React from 'react'

// Framer Motion Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "./Utility/Button";
import NavAside from './GestioneAccount/NavAside';
import RiepilogoProfilo from './GestioneAccount/Profilo/RiepilogoProfilo';

// Schermata profilo
export default function SchermataProfilo() {
    const userData = {
        userID: 12345,
        nomeCompleto: "Mario Rossi"
    }

    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-center">
                <NavAside />
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }} className="ms-lg-auto mt-5 mt-lg-0">
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <Image fluid className="col-2 me-3" src="/assets/svg/avatar_male.svg" />
                            <div className="d-flex flex-column">
                                <h6 className="t-light">USER ID #{userData.userID}</h6>
                                <h1 className="t-bold">{userData.nomeCompleto}</h1>
                            </div>
                        </div>
                        <RiepilogoProfilo
                            sesso={"Maschile"}
                            dataNascita={"01/01/1991"}
                            nazionalita={"Italiana"}
                            luogoNascita={"Lazio | Roma (RM)"}
                            codiceFiscale={"AAABBB91A01C123D"}
                            cellulare={"333 1234567"}
                            email={"mariorossi@mail.com"}
                            password={"••••••••••••"} />
                    </motion.div>
                </Col>
                <Col lg={{ span: 3, offset: 1 }} className="d-none d-lg-block me-auto">
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="mb-5">
                            <Button variant={"White"} ><FontAwesomeIcon className="me-2" icon={faMobileAlt} fixedWidth />Modifica cellulare</Button>
                        </div>
                        <div className="mb-5">
                            <Button variant={"White"} className="t-bold py-5"><FontAwesomeIcon className="me-2" icon={faEnvelope} fixedWidth />Modifica email</Button>
                        </div>
                        <div className="mb-5">
                            <Button variant={"White"} className="t-bold py-5"><FontAwesomeIcon className="me-2" icon={faKey} fixedWidth />Modifica password</Button>
                        </div>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}