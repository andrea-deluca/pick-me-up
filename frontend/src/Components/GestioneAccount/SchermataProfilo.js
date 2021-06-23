import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import useToken from '../../Hooks/useToken';
import useSession from '../../Hooks/useSession';

// Framer Motion Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../Utility/Button";
import NavAside from './NavAside';
import RiepilogoProfilo from './Profilo/RiepilogoProfilo';
import EmailModal from './Profilo/EmailModal';
import CellulareModal from './Profilo/CellulareModal';
import PasswordModal from './Profilo/PasswordModal';

// Schermata profilo
export default function SchermataProfilo() {
    const { token, setToken } = useToken();
    const { session, setSession } = useSession()
    const [modals, setModals] = useState({
        cellulareModal: false,
        emailModal: false,
        passwordModal: false
    })

    if (!token) {
        return (<Redirect to={"/login"} />);
    } else {
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
                                <Image fluid className="col-2 me-3" src={session.sesso === "M" ? "/assets/svg/avatar_male.svg" : "/assets/svg/avatar_female.svg"} />
                                <div className="d-flex flex-column">
                                    <h6 className="t-light">USER ID #</h6>
                                    <h1 className="t-bold">{session.nome + " " + session.cognome}</h1>
                                </div>
                            </div>
                            <RiepilogoProfilo/>
                        </motion.div>
                    </Col>
                    <Col lg={{ span: 3, offset: 1 }} className="d-none d-lg-block me-auto">
                        <motion.div
                            initial={{ translateY: 100, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: 100, opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <div className="mb-5">
                                <Button variant={"White"} onClick={() => setModals({ ...modals, cellulareModal: true })}>
                                    <FontAwesomeIcon className="me-2" icon={faMobileAlt} fixedWidth />Modifica cellulare
                                </Button>
                                <CellulareModal show={modals.cellulareModal} onHide={() => setModals({ ...modals, cellulareModal: false })} />
                            </div>
                            <div className="mb-5">
                                <Button variant={"White"} className="t-bold py-5" onClick={() => setModals({ ...modals, emailModal: true })}>
                                    <FontAwesomeIcon className="me-2" icon={faEnvelope} fixedWidth />Modifica email
                                </Button>
                                <EmailModal show={modals.emailModal} onHide={() => setModals({ ...modals, emailModal: false })} />
                            </div>
                            <div className="mb-5">
                                <Button variant={"White"} className="t-bold py-5" onClick={() => setModals({ ...modals, passwordModal: true })}>
                                    <FontAwesomeIcon className="me-2" icon={faKey} fixedWidth />Modifica password
                                </Button>
                                <PasswordModal show={modals.passwordModal} onHide={() => setModals({ ...modals, passwordModal: false })} />
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        );
    }

}