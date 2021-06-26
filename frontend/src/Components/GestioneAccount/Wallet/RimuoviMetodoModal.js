import React, { useState } from 'react'
import { useHistory } from 'react-router';
import useSession from '../../../Hooks/useSession';
import axios from 'axios';

// Bootstrap Components
import { Row, Col, Modal } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function RimuoviMetodoModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory();
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false
        },
        submit: false
    })

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
                    setSession({ ...session, metodiPagamento: res.data.metodiPagamento })
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error.resposnse.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="eliminaMetodoModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="eliminaMetodoModal">
                    Elimina metodo di pagamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success ? state.success.message : state.error.message}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
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