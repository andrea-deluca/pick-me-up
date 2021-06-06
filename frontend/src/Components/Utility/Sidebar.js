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
                <Row className="my-3 gy-3">
                    <Link onClick={() => closeSidebar()} to="/">
                        <Button text={"Home"} variant={"Light"} />
                    </Link>
                    <Link to="/signup">
                        <Button text={"Registrati"} variant={"Light"} />
                    </Link>
                    <Link to="/login">
                        <Button text={"Accedi"} variant={"Dark"} />
                    </Link>
                </Row>
            </div>
        </div>
    );
}