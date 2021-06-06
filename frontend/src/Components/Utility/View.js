import React from 'react';

// View Component
export default function View(props){
    return (
        <div className="view">
            {props.children}
        </div>
    );
}