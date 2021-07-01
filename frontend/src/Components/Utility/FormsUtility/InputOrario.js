import React, { useEffect, useState } from 'react'

import { Form } from 'react-bootstrap';

export default function InputOrario(props) {
    const now = new Date()
    //const data = document.querySelector(props.dataId)

    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as="select" classe="form-select" placeholder={props.placeholder} required={props.required}>
                <option value="" disabled selected>{props.default}</option>
                <option value="05:00" disabled={false && (now.getHours() > 5 || (now.getHours() === 5 && now.getMinutes() >= 30)) ? true : false}>5:00</option>
                <option value="05:30" disabled={false && (now.getHours() > 5) ? true : false}>5:30</option>
                <option value="06:00" disabled={false && (now.getHours() > 6 || (now.getHours() === 6 && now.getMinutes() > 30)) ? true : false}>6:00</option>
                <option value="06:30" disabled={false && (now.getHours() > 6) ? true : false}>6:30</option>
                <option value="07:00" disabled={false && (now.getHours() > 7 || (now.getHours() === 7 && now.getMinutes() >= 30)) ? true : false}>7:00</option>
                <option value="07:30" disabled={false && (now.getHours() > 7) ? true : false}>7:30</option>
                <option value="08:00" disabled={false && (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 30)) ? true : false}>8:00</option>
                <option value="08:30" disabled={false && (now.getHours() > 8) ? true : false}>8:30</option>
                <option value="09:00" disabled={false && (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() >= 30)) ? true : false}>9:00</option>
                <option value="09:30" disabled={false && (now.getHours() > 9) ? true : false}>9:30</option>
                <option value="10:00" disabled={false && (now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() >= 30)) ? true : false}>10:00</option>
                <option value="10:30" disabled={false && (now.getHours() > 10) ? true : false}>10:30</option>
                <option value="11:00" disabled={false && (now.getHours() > 11 || (now.getHours() === 11 && now.getMinutes() >= 30)) ? true : false}>11:00</option>
                <option value="11:30" disabled={false && (now.getHours() > 11) ? true : false}>11:30</option>
                <option value="12:00" disabled={false && (now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() >= 30)) ? true : false}>12:00</option>
                <option value="12:30" disabled={false && (now.getHours() > 12) ? true : false}>12:30</option>
                <option value="13:00" disabled={false && (now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() >= 30)) ? true : false}>13:00</option>
                <option value="13:30" disabled={false && (now.getHours() > 13) ? true : false}>13:30</option>
                <option value="14:00" disabled={false && (now.getHours() > 14 || (now.getHours() === 14 && now.getMinutes() >= 30)) ? true : false}>14:00</option>
                <option value="14:30" disabled={false && (now.getHours() > 14) ? true : false}>14:30</option>
                <option value="15:00" disabled={false && (now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() >= 30)) ? true : false}>15:00</option>
                <option value="15:30" disabled={false && (now.getHours() > 15) ? true : false}>15:30</option>
                <option value="16:00" disabled={false && (now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 30)) ? true : false}>16:00</option>
                <option value="16:30" disabled={false && (now.getHours() > 16) ? true : false}>16:30</option>
                <option value="17:00" disabled={false && (now.getHours() > 17 || (now.getHours() === 17 && now.getMinutes() >= 30)) ? true : false}>17:00</option>
                <option value="17:30" disabled={false && (now.getHours() > 17) ? true : false}>17:30</option>
                <option value="18:00" disabled={false && (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() >= 30)) ? true : false}>18:00</option>
                <option value="18:30" disabled={false && (now.getHours() > 18) ? true : false}>18:30</option>
                <option value="19:00" disabled={false && (now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() >= 30)) ? true : false}>19:00</option>
                <option value="19:30" disabled={false && (now.getHours() > 19) ? true : false}>19:30</option>
                <option value="20:00" disabled={false && (now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() >= 30)) ? true : false}>20:00</option>
                <option value="20:30" disabled={false && (now.getHours() > 20) ? true : false}>20:30</option>
                <option value="21:00" disabled={false && (now.getHours() > 21 || (now.getHours() === 21 && now.getMinutes() >= 30)) ? true : false}>21:00</option>
                <option value="21:30" disabled={false && (now.getHours() > 21) ? true : false}>21:30</option>
                <option value="22:00" disabled={false && (now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() >= 30)) ? true : false}>22:00</option>
                <option value="22:30" disabled={false && (now.getHours() > 22) ? true : false}>22:30</option>
                <option value="23:00" disabled={false && (now.getHours() > 23 || (now.getHours() === 23 && now.getMinutes() >= 30)) ? true : false}>23:00</option>
                <option value="23:30" disabled={false && (now.getHours() > 23) ? true : false}>23:30</option>
            </Form.Control>
        </Form.Group>
    );
}