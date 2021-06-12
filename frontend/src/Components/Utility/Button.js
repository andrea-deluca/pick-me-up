import React from 'react'
import { Link } from 'react-router-dom';

// Button
export default function Button(props) {
    const mainButtonClass = "btn";
    const buttonStyle = mainButtonClass + "-" + props.variant.toLowerCase();
    const buttonClasses = mainButtonClass + " " + buttonStyle;

    if (props.to) {
        return (
            <div className="button">
                <Link to={props.to}>
                    <button type={props.submit ? "submit" : "button"} className={buttonClasses}>
                        {props.children}
                    </button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="button">
                <button type={props.submit ? "submit" : "button"} className={buttonClasses}>
                    {props.children}
                </button>
            </div>
        );
    }
}