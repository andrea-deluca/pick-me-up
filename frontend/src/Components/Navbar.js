import React from 'react';

// Bootstrap Components
import { Container } from 'react-bootstrap';

// Components
import Button from './Button'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// Navbar
export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark py-3">
            <Container className="d-flex justify-content-between">
                <h2 className="logo">PickMeUp!</h2>
                <FontAwesomeIcon icon={faHome} size="lg" color="white" />
                <div className="buttonsGroup d-flex align-items-center justify-content-center">
                    <div className="button">
                        <Button text={"Registrati"} style={"Dark"} />
                    </div>
                    <div className="button">
                        <Button text={"Accedi"} style={"Light"} />
                    </div>
                </div>
            </Container>
        </nav>
    );
}