import React from 'react'

// Framer Motion Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image, CardColumns } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "./Utility/Button";
import NavAside from './GestioneAccount/NavAside';
import DrivingLicenseCard from './GestioneAccount/Patente/DrivingLicenseCard';

// Schermata Patente
export default function SchermataPatente() {
    const userData = {
        userID: 12345
    }
    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-start ">
                <NavAside />
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }} className="ms-lg-auto mt-5">
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <Image fluid className="col-2 me-3" src="/assets/svg/patente.svg"></Image>
                            <div className="d-flex flex-column">
                                <p className="h6 t-light">USER ID #{userData.userID}</p>
                                <h1 className="h1 t-bold">La mia patente</h1>
                            </div>
                        </div>
                        <CardColumns>
                            <DrivingLicenseCard
                                numeroPatente={"AA1234567B"}
                                tipologiaPatente={"B"}
                                dataScadenza={"01/01/2022"}
                                ufficioRilascio={"Motorizzazione"} />
                        </CardColumns>
                    </motion.div>
                </Col>
                <Col lg={{ span: 3, offset: 1 }} className='d-none d-lg-block me-auto mt-5'>
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ dÎuration: 0.3 }}>
                        <Button variant={"White"}><FontAwesomeIcon className="me-2" icon={faPlusCircle} fixedWidth />Inserisci metodo di pagamento</Button>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}