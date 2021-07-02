import React, { useState } from 'react';
import useSession from '../../../Hooks/useSession';

// Bootstrap Components
import { Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faKey } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from "../../Utility/Button";
import EliminaAccountModal from './EliminaAccountModal'
import EmailModal from './EmailModal';
import CellulareModal from './CellulareModal';
import PasswordModal from './PasswordModal';

// Riepilogo profilo
export default function RiepilogoProfilo() {
    const { session, setSession } = useSession();
    const [eliminaAccountModal, setEliminaAccountModal] = useState(false)
    const [modals, setModals] = useState({
        cellulareModal: false,
        emailModal: false,
        passwordModal: false
    })
    return (
        <Row className="gy-4">
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">SESSO ANAGRAFICO</h6>
                <p className="t-light">{session.sesso}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">DATA DI NASCITA</h6>
                <p className="t-light">{new Date(session.dataNascita).toLocaleDateString("it-IT")}</p>
            </Col>
            <Col xs={{ span: 12 }}>
                <h6 className="t-bold">LUOGO DI NASCITA</h6>
                <p className="t-light">{`${session.luogoNascita.nazione} - ${session.luogoNascita.regione} | ${session.luogoNascita.citta} (${session.luogoNascita.provincia})`}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">CODICE FISCALE</h6>
                <p className="t-light">{session.codiceFiscale}</p>
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">
                    CELLULARE
                    <FontAwesomeIcon onClick={() => setModals({ ...modals, cellulareModal: true })} className="ms-2 d-lg-none" icon={faEdit} color={"black"} fixedWidth />
                </h6>
                <p className="t-light">{session.cellulare}</p>
                <CellulareModal show={modals.cellulareModal} onHide={() => setModals({ ...modals, cellulareModal: false })} />
            </Col>
            <Col xs={{ span: 6 }}>
                <h6 className="t-bold">
                    EMAIL
                    <FontAwesomeIcon onClick={() => setModals({ ...modals, emailModal: true })} className="ms-2 d-lg-none" icon={faEdit} color={"black"} fixedWidth />
                </h6>
                <p className="t-light">{session.email}</p>
                <EmailModal show={modals.emailModal} onHide={() => setModals({ ...modals, emailModal: false })} />
            </Col>
            <Button className="d-lg-none" variant={"Light"} onClick={() => setModals({ ...modals, passwordModal: true })}>
                <FontAwesomeIcon className="me-2" icon={faKey} color={"black"} fixedWidth />
                Modifica password
            </Button>
            <PasswordModal show={modals.passwordModal} onHide={() => setModals({ ...modals, passwordModal: false })} />
            <Button variant={"Danger"} onClick={() => setEliminaAccountModal(true)}>
                <FontAwesomeIcon className="me-2" icon={faTrashAlt} color={"white"} fixedWidth />
                Elimina account
            </Button>
            <EliminaAccountModal show={eliminaAccountModal} onHide={() => setEliminaAccountModal(false)} />
        </Row>
    );
}