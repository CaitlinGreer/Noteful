import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

export default function NoteListNav(props) {
    return (
        <div className='NoteListNav'>
            <ul className="NoteListNav-list">
                {props.folders.map(folder => 
                    <li key={folder.id}>
                        <NavLink 
                            className='NoteListNav-folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='NoteListNav-num-notes'>
                                {countNotesForFolder(props.notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>
                  )}
            </ul>
            <div className='NoteListNav-button'>
                <button type='button'>
                    Add Folder
                </button>
            </div>
        </div>
    )
}

NoteListNav.defaultProps = {
    folders: []
}