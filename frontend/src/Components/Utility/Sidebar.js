import React from 'react';

// Bootstrap Components
import { Row } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Sidebar
export default function Sidebar(props) {

    function closeSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "0px";
    }

    return (
        <div id="sidebar" className="sidebar shadow-lg">
            <div className="d-flex flex-column px-4 py-5">
                <FontAwesomeIcon onClick={() => closeSidebar()} className="iconButton ms-3" icon={faTimes} size="lg" color="black" />
                <Row onClick={() => closeSidebar()} className="buttonsSidebar my-3 gy-3">
                    {props.children}
                </Row>
            </div>
        </div>
    );
}