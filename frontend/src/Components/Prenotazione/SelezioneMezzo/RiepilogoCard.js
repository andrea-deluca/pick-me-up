import React from 'react'

import { Card } from 'react-bootstrap';

export default function RiepilogoCard(props) {
    return (
        <Card className="animation-card border-0 shadow">
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                    <h3 className="t-bold pb-4">Riepilogo</h3>
                    <div className="pb-3">
                        <h5 className="t-bold">Tipologia veicolo</h5>
                        <h6 className="t-light">Auto</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">Richiesta autista</h5>
                        <h6 className="t-light">Si</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">Ritiro</h5>
                        <h6 className="t-light">2020-10-03 alle ore 20:30</h6>
                        <h6 className="t-light">presso Stadio</h6>
                    </div>
                    <div>
                        <h5 className="t-bold">Consegna</h5>
                        <h6 className="t-light">2020-11-04 alle ore 15:00</h6>
                        <h6 className="t-light">presso Forum</h6>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}