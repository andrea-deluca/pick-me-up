import React from 'react'
import { useHistory } from 'react-router-dom';

import { Col, Card, Row, Image } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGasPump, faTools } from '@fortawesome/free-solid-svg-icons';

import Button from '../../Utility/Button';

export default function VeicoloCard(props) {
    const history = useHistory();

    function onClick(e) {
        e.preventDefault()
        const datiPrenotazione = {
            ...history.location.state.payload.datiPrenotazione,
            mezzo: {
                idMezzo: props.idMezzo,
                marca: props.marca,
                modello: props.modello,
                posti: props.numeroPosti,
                carburante: props.carburante,
                cambio: props.cambio,
                cilindrata: props.cilindrata,
                tariffa: props.tariffa
            }
        }
        history.push("/prenota", {
            payload: datiPrenotazione,
            type: "CONFERMA_PRENOTAZIONE"
        })
    }

    return (

        <Card className="animation-card border-0 mx-auto h-100 shadow">
            <Card.Body className="d-flex flex-column justify-content-evenly">
                <Image flui className="col-12 align-self-center pb-4" src={`/assets/veicoli/${props.tipologiaMezzo}/${props.idMezzo}.png`} alt="..." />
                <Card.Title>
                    <h5 className="t-light">{props.marca}</h5>
                    <h5 className="t-bold">{props.modello}</h5>
                </Card.Title>
                <Card.Text className="t-light">
                    <Row className="py-2">
                        {props.numeroPosti ?
                            <Col xs={{ span: 6 }}>
                                <p>
                                    <FontAwesomeIcon icon={faUsers} className='me-2' />
                                    {props.numeroPosti} posti
                                </p>
                            </Col> : null}
                        {props.carburante ?
                            <Col xs={{ span: 6 }}>
                                <p>
                                    <FontAwesomeIcon icon={faGasPump} className='me-2' />
                                    {props.carburante}
                                </p>
                            </Col> : null}
                        {props.cilindrata ?
                            <Col xs={{ span: 6 }}>
                                <p>
                                    <FontAwesomeIcon icon={faTools} className='me-2' />
                                    {props.cilindrata}cc
                                </p>
                            </Col> : null}
                        {props.cambio ?
                            <Col xs={{ span: 12 }}>
                                <p>
                                    <FontAwesomeIcon icon={faTools} className='me-2' />
                                    Cambio {props.cambio}
                                </p>
                            </Col> : null}
                    </Row>
                    <h4 className="t-bold">Tariffa oraria</h4>
                    <h5 className="t-light">€{props.tariffa}</h5>
                </Card.Text>
                {props.noButton ? null : <Button onClick={onClick} variant="primary">Seleziona</Button>}
            </Card.Body>
        </Card>

    );
}