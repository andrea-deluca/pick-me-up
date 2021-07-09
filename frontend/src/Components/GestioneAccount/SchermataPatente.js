import React, { useState } from 'react'
import useSession from '../../Hooks/useSession';

// Framer Motion Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Container, Row, Col, Image, CardColumns } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../Utility/Button";
import NavAside from '../Utility/NavAside';
import DrivingLicenseCard from './Patente/DrivingLicenseCard';
import AggiungiPatenteModal from "./Patente/AggiungiPatenteModal";
import AlertMessage from '../Utility/AlertMessage';
import SchermataPermessoNegato from '../SchermataPermessoNegato'

// Schermata Patente
export default function SchermataPatente() {
    const { session, setSession } = useSession();
    const [modals, setModals] = useState({
        addModal: false,
        error: false
    })

    function onClickAggiungiPatente(e) {
        e.preventDefault();
        if (session.patente) {
            setModals({ ...modals, error: true })
        } else {
            setModals({ ...modals, addModal: true });
        }
    }

    if (session.user !== "CLIENTE" && session.user !== "AUTISTA") {
        return <SchermataPermessoNegato />
    }

    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-start ">
                <NavAside />
                <Col xs={{ span: 12 }} lg={{ span: 5 }} className="mx-auto ms-lg-auto mt-5">
                    <motion.div
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="d-flex justify-content-start align-items-center mb-5 col-10 offset-1">
                            <Image fluid className="col-3 me-3" src="/assets/svg/patente.svg"></Image>
                            <div className="d-flex flex-column">
                                <p className="h6 t-light">USER ID #{session.id}</p>
                                <h1 className="h1 t-bold">La mia patente</h1>
                            </div>
                        </div>
                        <div className="col-10 offset-1 mb-5 d-lg-none" onClick={onClickAggiungiPatente}>
                            <h6 className="t-bold">
                                <FontAwesomeIcon className="me-2" icon={faPlusCircle} fixedWidth />
                                Aggiungi patente di guida
                            </h6>
                        </div>
                        <AlertMessage
                            className="d-lg-none"
                            show={modals.error}
                            variant={"danger"}
                            header={"Operazione non consentita!"}
                            body={"Non è possibile aggiungere più di una patente."}
                            button={"Chiudi"}
                            onClick={() => setModals({ ...modals, error: false })} />
                        <CardColumns className="col-10 offset-1">
                            {!session.patente ? <h4 className="t-light text-muted">Nessuna patente trovata...</h4> :
                                <DrivingLicenseCard
                                    numeroPatente={session.patente.numeroPatente}
                                    tipologiaPatente={session.patente.tipologiaPatente}
                                    dataScadenza={session.patente.dataScadenza}
                                    ufficioRilascio={session.patente.ufficioRilascio} />
                            }
                        </CardColumns>
                    </motion.div>
                </Col>
                {session.user === "CLIENTE" && <Col lg={{ span: 3 }} className='d-none d-lg-block me-auto mt-5'>
                    <motion.div
                        className="mb-5"
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 100, opacity: 0 }}
                        transition={{ dÎuration: 0.3 }}>
                        <Button onClick={onClickAggiungiPatente} variant={"White"}>
                            <FontAwesomeIcon className="me-2" icon={faPlusCircle} fixedWidth />
                            Aggiungi patente di guida
                        </Button>
                        <AggiungiPatenteModal show={modals.addModal} onHide={() => setModals({ ...modals, addModal: false })} />
                    </motion.div>
                    <AlertMessage
                        className="d-none d-lg-block"
                        show={modals.error}
                        variant={"danger"}
                        header={"Operazione non consentita!"}
                        body={"Non è possibile aggiungere più di una patente."}
                        button={"Chiudi"}
                        onClick={() => setModals({ ...modals, error: false })} />
                </Col>}
            </Row>
        </Container>
    );
}