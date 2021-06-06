import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Row } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Custom Components
import Button from './Button';

// Sidebar
export default function Sidebar() {

    function closeSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "0px";
    }

    return (
        <div id="sidebar" className="sidebar shadow-lg">
            <div className="d-flex flex-column px-4 py-5">
                <FontAwesomeIcon onClick={() => closeSidebar()} className="iconButton ms-3" icon={faTimes} size="lg" color="black" />
                <Row onClick={() => closeSidebar()} className="my-3 gy-3">
                    <Link to="/">
                        <Button variant={"Light"} submit>Home</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant={"Light"} submit>Registrati</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant={"Dark"} submit>Accedi</Button>
                    </Link>
                </Row>
            </div>
        </div>
    );
}