import React from 'react'

import { Container, Row, Col, Tab, Nav, Image } from 'react-bootstrap';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faListUl, faAddressCard, faWallet, faIdCard, faMobileAlt, faEnvelope, faKey, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Button from '../../Utility/Button'

function AsideLink() {
    return (
        <Nav.Item className="mx-3">
            <Nav.Link className="t-bold py-3" eventKey="prenota">Prenota</Nav.Link>
        </Nav.Item>
    );
}

export default function NavAside() {
    return (
        <Tab.Container fluid id="navAside" defaultActiveKey="prenota">
            <Row className="g-0 mt-5">
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item className="mx-3">
                            <Nav.Link className="t-bold py-3" eventKey="prenota">Prenota</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="m-3">
                            <Nav.Link className="t-bold py-3" eventKey="prenotazioni">Le mie prenotazioni</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="m-3">
                            <Nav.Link className="t-bold py-3" eventKey="profilo">Visualizza profilo</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="m-3">
                            <Nav.Link className="t-bold py-3" eventKey="wallet">Visualizza Wallet</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="m-3">
                            <Nav.Link className="t-bold py-3" eventKey="patente">Visualizza patente</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={{ span: 4, offset: 1 }}>
                    <Tab.Content >
                        <Tab.Pane eventKey="prenota">
                            <div className="d-flex align-items-center">
                                <Image fluid className="col-2 me-3" fluid src="assets/svg/avatar_male.svg" />
                                <div className="d-flex flex-column">
                                    <h6 className="t-light">USER ID #12345</h6>
                                    <h1 className="t-bold">Mario Rossi</h1>
                                </div>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
                <Col sm={{ span: 3, offset: 1 }}>
                    <Tab.Content >
                        <Tab.Pane eventKey="prenota">
                            <AsideLink />
                            <AsideLink />
                            <AsideLink />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}