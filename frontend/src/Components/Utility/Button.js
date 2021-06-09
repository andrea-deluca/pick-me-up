import React from 'react'
import { Link } from 'react-router-dom';

// Button
export default function Button(props) {
    const mainButtonClass = "btn";
    const buttonStyle = mainButtonClass + "-" + props.variant.toLowerCase();
    const buttonClasses = mainButtonClass + " " + buttonStyle;

    return (
        <Link to={props.to}>
            <div className="button">
                <button type={props.submit ? "submit" : "button"} className={buttonClasses}>
                    {props.children}
                </button>
            </div>
        </Link>
    );
}