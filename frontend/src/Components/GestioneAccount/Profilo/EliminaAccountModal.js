import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';

export default function CellulareModal(props) {
    const [state, setState] = useState({
        error: false,
        success: false,
        submit: false
    })
    const { session, setSession } = useSession();
    const history = useHistory()

    function onClick(e) {
        e.preventDefault();
        const data = {
            id: session.id,
        }
        setState({ ...state, submit: true });
        try {
            axios.post("/profilo/eliminaAccount", data)
                .then(res => {
                    if (res.status === 200) {
                        window.sessionStorage.clear();
                        history.push("/");
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {

                    }
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="eliminaAccountModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="eliminaAccountModal">
                    Elimina Account
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="gy-4" >
                    <Col xs={{ span: 10, offset: 1 }}>
                        <h3 className="t-bold text-center h5">Sei sicuro di voler eliminare il tuo account?</h3>
                    </Col>
                    <div className="buttonsGroup col-10 offset-1 justify-content-end">
                        <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                        <Button spinner={state.submit} variant={"Danger"} onClick={onClick}>Elimina</Button>
                    </div>
                </Row>
            </Modal.Body>
        </Modal>
    );
}