import React, { useState } from 'react'

import { Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function InputDataPrenotazione(props) {
    const [flag, setFlag] = useState(true)
    const now = new Date()
    const maxDate = new Date((new Date().setDate(new Date().getDate() + 23))).toISOString().substring(0, 10)

    let minDate
    if (props.dataConsegna && parseInt(props.dataConsegna.substring(3, 4)) > 9) {
        minDate = props.dataConsegna.substring(5, 9) + "-" + props.dataConsegna.substring(3, 5) + "-" + props.dataConsegna.substring(0, 2)
    } else if (props.dataConsegna && parseInt(props.dataConsegna.substring(3, 4)) < 10) {
        minDate = props.dataConsegna.substring(5, 9) + "-0" + props.dataConsegna.substring(3, 4) + "-" + props.dataConsegna.substring(0, 2)
    } else {
        minDate = null
    }

    function checkDate() {
        const data = document.getElementById(props.controlDataId).value
        if (now.toDateString() === new Date(data).toDateString()) {
            setFlag(true)
        } else {
            setFlag(false)
        }
    }

    return (
        <React.Fragment>
            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Group controlId={props.controlDataId}>
                    <Form.Label className="pe-2">{props.labelData}</Form.Label>
                    <OverlayTrigger
                        placement={"top"}
                        overlay={
                            <Tooltip id="dataRitiroInfo">
                                Formato valido: AAAA-MM-GG.
                            </Tooltip>}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </OverlayTrigger>
                    <Form.Control onBlur={checkDate} type="date" placeholder={props.placeholderData}
                        min={new Date().toISOString().substring(0, 10)}
                        max={maxDate} pattern="[0-9]{4}-[0-1][0-9]-[0-3][0-9]" required />
                </Form.Group>
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Group controlId={props.controlOrarioId}>
                    <Form.Label>{props.labelOrario}</Form.Label>
                    <Form.Control as="select" classe="form-select" required>
                        <option value="" disabled selected>{props.defaultOrario}</option>
                        <option value="05:00" disabled={flag && (now.getHours() > 4 || (now.getHours() === 4 && now.getMinutes() > 40)) ? true : false}>5:00</option>
                        <option value="05:30" disabled={flag && (now.getHours() > 5 || (now.getHours() === 5 && now.getMinutes() > 10)) ? true : false}>5:30</option>
                        <option value="06:00" disabled={flag && (now.getHours() > 5 || (now.getHours() === 5 && now.getMinutes() > 40)) ? true : false}>6:00</option>
                        <option value="06:30" disabled={flag && (now.getHours() > 6 || (now.getHours() === 6 && now.getMinutes() > 10)) ? true : false}>6:30</option>
                        <option value="07:00" disabled={flag && (now.getHours() > 6 || (now.getHours() === 6 && now.getMinutes() > 40)) ? true : false}>7:00</option>
                        <option value="07:30" disabled={flag && (now.getHours() > 7 || (now.getHours() === 7 && now.getMinutes() > 10)) ? true : false}>7:30</option>
                        <option value="08:00" disabled={flag && (now.getHours() > 7 || (now.getHours() === 7 && now.getMinutes() > 40)) ? true : false}>8:00</option>
                        <option value="08:30" disabled={flag && (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 10)) ? true : false}>8:30</option>
                        <option value="09:00" disabled={flag && (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 40)) ? true : false}>9:00</option>
                        <option value="09:30" disabled={flag && (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 10)) ? true : false}>9:30</option>
                        <option value="10:00" disabled={flag && (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 40)) ? true : false}>10:00</option>
                        <option value="10:30" disabled={flag && (now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() > 10)) ? true : false}>10:30</option>
                        <option value="11:00" disabled={flag && (now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() > 40)) ? true : false}>11:00</option>
                        <option value="11:30" disabled={flag && (now.getHours() > 11 || (now.getHours() === 11 && now.getMinutes() > 10)) ? true : false}>11:30</option>
                        <option value="12:00" disabled={flag && (now.getHours() > 11 || (now.getHours() === 11 && now.getMinutes() > 40)) ? true : false}>12:00</option>
                        <option value="12:30" disabled={flag && (now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() > 10)) ? true : false}>12:30</option>
                        <option value="13:00" disabled={flag && (now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() > 40)) ? true : false}>13:00</option>
                        <option value="13:30" disabled={flag && (now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() > 10)) ? true : false}>13:30</option>
                        <option value="14:00" disabled={flag && (now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() > 40)) ? true : false}>14:00</option>
                        <option value="14:30" disabled={flag && (now.getHours() > 14 || (now.getHours() === 14 && now.getMinutes() > 10)) ? true : false}>14:30</option>
                        <option value="15:00" disabled={flag && (now.getHours() > 14 || (now.getHours() === 14 && now.getMinutes() > 40)) ? true : false}>15:00</option>
                        <option value="15:30" disabled={flag && (now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() > 10)) ? true : false}>15:30</option>
                        <option value="16:00" disabled={flag && (now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() > 40)) ? true : false}>16:00</option>
                        <option value="16:30" disabled={flag && (now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() > 10)) ? true : false}>16:30</option>
                        <option value="17:00" disabled={flag && (now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() > 40)) ? true : false}>17:00</option>
                        <option value="17:30" disabled={flag && (now.getHours() > 17 || (now.getHours() === 17 && now.getMinutes() > 10)) ? true : false}>17:30</option>
                        <option value="18:00" disabled={flag && (now.getHours() > 17 || (now.getHours() === 17 && now.getMinutes() > 40)) ? true : false}>18:00</option>
                        <option value="18:30" disabled={flag && (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() > 10)) ? true : false}>18:30</option>
                        <option value="19:00" disabled={flag && (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() > 40)) ? true : false}>19:00</option>
                        <option value="19:30" disabled={flag && (now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() > 10)) ? true : false}>19:30</option>
                        <option value="20:00" disabled={flag && (now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() > 40)) ? true : false}>20:00</option>
                        <option value="20:30" disabled={flag && (now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() > 10)) ? true : false}>20:30</option>
                        <option value="21:00" disabled={flag && (now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() > 40)) ? true : false}>21:00</option>
                        <option value="21:30" disabled={flag && (now.getHours() > 21 || (now.getHours() === 21 && now.getMinutes() > 10)) ? true : false}>21:30</option>
                        <option value="22:00" disabled={flag && (now.getHours() > 21 || (now.getHours() === 21 && now.getMinutes() > 40)) ? true : false}>22:00</option>
                        <option value="22:30" disabled={flag && (now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() > 10)) ? true : false}>22:30</option>
                        <option value="23:00" disabled={flag && (now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() > 40)) ? true : false}>23:00</option>
                        <option value="23:30" disabled={flag && (now.getHours() > 23 || (now.getHours() === 23 && now.getMinutes() > 10)) ? true : false}>23:30</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </React.Fragment>
    );
}