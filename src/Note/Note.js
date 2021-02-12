import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import './Note.css'

export default function Note(props) {
    return (
        <div className="Note">
            <h2 className="Note-title">
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className="Note-delete" type="button">
                Remove
            </button>
            {/* <div className="Note-dates">
                <div className="Note-dates-modified">
                    Modified
                    {' '}
                    <span className="Date">
                        {format(props.modified, 'Do MMM YYYY')}
                    </span>
                </div> */}
            {/* </div> */}
        </div>
    )
}