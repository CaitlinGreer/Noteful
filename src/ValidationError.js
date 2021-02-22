import React from 'react'

export default function ValidationError(props) {
    if(props.message) {
        return (
            <div className="error" style={{color: 'rgb(220,20,60)' }}>{props.message}</div>
        );
    }
    return <></>
}  