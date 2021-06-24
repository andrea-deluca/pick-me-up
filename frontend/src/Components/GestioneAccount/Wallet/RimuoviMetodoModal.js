import React, { useState } from 'react'
import { useHistory } from 'react-router';
import useSession from '../../../Hooks/useSession';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal, Form } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function RimuoviMetodoModal(props) {
    const [state, setState] = useState({
        error: false,
        success: false,
        submit: false
    })

    const { session, setSession } = useSession();
    const history = useHistory();

    function onClick(e) {
        e.preventDefault();
        const data = {
            id: session.id,
            idCarta: props.idCarta
        }
        setState({ ...state, submit: true });
        try {
            axios.delete("/wallet/eliminaCarta", { data: data })
                .then(res => {
                    if (res.status === 200) {
                        setSession({ ...session, metodiPagamento: res.data })
                        setState({ ...state, success: true })
                    }
                })

        } catch (error) {
            console.log(error.resposnse.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="eliminaCartaModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="eliminaCartaModal">
                    Elimina metodo di pagamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success || state.error ?
                    <AlertMessage
                        show={state.success || state.error}
                        variant={state.success ? "success" : "danger"}
                        header={state.success ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success ? "Il tuo metodo di pagamento è stato rimosso con successo." : "La cancellazione del tuo metodo di pagamento non è andata a buon fine."}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: false }) }} />
                    : <Row className="gy-4" >
                        <Col xs={{ span: 10, offset: 1 }}>
                            <h3 className="t-bold text-center h5">Sei sicuro di voler eliminare il tuo metodo di pagamento?</h3>
                        </Col>
                        <div className="buttonsGroup col-10 offset-1 justify-content-end">
                            <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                            <Button spinner={state.submit} variant={"Danger"} onClick={onClick}>Elimina</Button>
                        </div>
                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}