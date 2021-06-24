import React, { useState } from 'react'
import { Redirect } from 'react-router';
import useToken from '../../Hooks/useToken';
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
import NavAside from './NavAside';
import CreditCard from './Wallet/CreditCard';
import AggiungiMetodoModal from './Wallet/AggiungiMetodoModal';

// Schermata Wallet
export default function SchermataWallet() {
    const { token, setToken } = useToken();
    const { session, setSession } = useSession();
    const [modals, setModals] = useState({
        addModal: false,
    })

    if (!token) {
        return <Redirect to={"/login"} />
    } else {
        return (
            <Container fluid className="p-0 h-100">
                <Row className="g-0 h-100 align-items-start ">
                    <NavAside />
                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 4, offset: 1 }} className="ms-lg-auto mt-5">
                        <motion.div
                            initial={{ translateY: 70, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: 70, opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <div className="d-flex justify-content-start align-items-center mb-5">
                                <Image fluid className="col-2 me-3" src="/assets/svg/wallet.svg" />
                                <div className="d-flex flex-column">
                                    <p className="h6 t-light">USER ID #</p>
                                    <h1 className="h1 t-bold">Il mio Wallet</h1>
                                </div>
                            </div>
                            <CardColumns>
                                {session.metodiPagamento.length === 0 ? <h4 className="t-light text-muted">Nessun metodo di pagamento trovato...</h4> :
                                    session.metodiPagamento.map((key) => {
                                        return (<CreditCard key={key}
                                            idCarta={key.id}
                                            numeroCarta={key.numeroCarta}
                                            titolare={key.titolare}
                                            dataScadenza={key.dataScadenzaCarta}
                                            codiceCVV={key.cvv} />)
                                    })}

                            </CardColumns>
                        </motion.div>
                    </Col>
                    <Col lg={{ span: 3, offset: 1 }} className='d-none d-lg-block me-auto mt-5'>
                        <motion.div
                            initial={{ translateY: 100, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: 100, opacity: 0 }}
                            transition={{ dÎuration: 0.3 }}>
                            <Button onClick={() => setModals({ ...modals, addModal: true })} variant={"White"}>
                                <FontAwesomeIcon className="me-2" icon={faPlusCircle} fixedWidth />
                                Inserisci metodo di pagamento
                            </Button>
                            <AggiungiMetodoModal show={modals.addModal} onHide={() => setModals({ ...modals, addModal: false })} />
                        </motion.div>
                    </Col>
                </Row>
            </Container >
        );
    }
}
