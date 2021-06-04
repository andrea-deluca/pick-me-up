import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import "./Navbar.css"

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
                <Link to="/">
                    <FontAwesomeIcon className="homebutton" icon={faHome} size="lg" color="white" />
                </Link>
                <div className="buttonsGroup">

                    <div className="button">
                        <Link to="/signup">
                            <Button text={"Registrati"} style={"Dark"} />
                        </Link>
                    </div>
                    <div className="button">
                        <Link to="/login">
                            <Button text={"Accedi"} style={"Light"} />
                        </Link>
                    </div>
                </div>
            </Container>
        </nav>
    );
}