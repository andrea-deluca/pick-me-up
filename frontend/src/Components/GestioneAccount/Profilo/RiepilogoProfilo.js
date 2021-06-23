import React, { useState } from 'react';
import useSession from '../../../Hooks/useSession';

// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../../Utility/Button";
import EliminaAccountModal from './EliminaAccountModal'

// Riepilogo profilo
export default function RiepilogoProfilo() {
    const { session, setSession } = useSession();
    const [eliminaAccountModal, setEliminaAccountModal] = useState(false)
    return (
        <Row className="gy-4">
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">SESSO ANAGRAFICO</h6>
                <p className="t-light">{session.sesso}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">DATA DI NASCITA</h6>
                <p className="t-light">{session.dataNascita}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">NAZIONALITÀ</h6>
                <p className="t-light">{session.luogoNascita.nazione}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">LUOGO DI NASCITA</h6>
                <p className="t-light">{`${session.luogoNascita.regione} | ${session.luogoNascita.citta} (${session.luogoNascita.provincia})`}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CODICE FISCALE</h6>
                <p className="t-light">{session.codiceFiscale}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CELLULARE</h6>
                <p className="t-light">{session.cellulare}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">EMAIL</h6>
                <p className="t-light">{session.email}</p>
            </Col>
            <Button variant={"Danger"} onClick={() => setEliminaAccountModal(true)}>
                <FontAwesomeIcon className="me-2" icon={faTrashAlt} color={"white"} fixedWidth />
                Elimina account
            </Button>
            <EliminaAccountModal show={eliminaAccountModal} onHide={() => setEliminaAccountModal(false)} />
        </Row>
    );
}