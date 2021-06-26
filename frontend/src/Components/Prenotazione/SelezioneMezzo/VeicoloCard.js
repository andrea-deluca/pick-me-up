import React from 'react'

import { Col, Card, Row, Image } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGasPump, faTools } from '@fortawesome/free-solid-svg-icons';

import Button from '../../Utility/Button';

export default function VeicoloCard(props) {
    console.log(props)
    return (
        <Col xs={{ span: 4 }}>
            <Card className="animation-card border-0 mx-auto h-100 shadow">
                <Card.Body className="d-flex flex-column justify-content-evenly">
                    <Image flui className="col-12 align-self-center pb-4" src={`/assets/veicoli/${props.tipologiaMezzo}/${props.idMezzo}.png`} alt="..." />
                    <Card.Title>
                        <h5 className="t-light">Fiat</h5>
                        <h5 className="t-bold">Fiat 500 Cabrio</h5>
                    </Card.Title>
                    <Card.Text className="t-light">
                        <Row className="py-2">
                            <Col xs={{ span: 6 }}>
                                <p><FontAwesomeIcon icon={faUsers} className='me-2' />4 posti</p>
                            </Col>
                            <Col xs={{ span: 6 }}>
                                <p><FontAwesomeIcon icon={faGasPump} className='me-2' />Ibrida</p>
                            </Col>
                            <Col xs={{ span: 12 }}>
                                <p><FontAwesomeIcon icon={faTools} className='me-2' />Cambio Manuale</p>
                            </Col>
                        </Row>
                        <h4 className="t-bold">Tariffa oraria</h4>
                        <h5 className="t-light">€50.00</h5>
                    </Card.Text>
                    <Button variant="primary">Seleziona</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}