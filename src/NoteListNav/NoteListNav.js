import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import { countNotesForFolder } from '../notes-helpers'
import ApiContext from '../ApiContext'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
    static contextType = ApiContext;

    render () {
        const { folders=[], notes=[] } = this.context
        return (
        <div className='NoteListNav'>
            <ul className="NoteListNav-list">
                {folders.map(folder => 
                    <li key={folder.id}>
                        <NavLink 
                            className='NoteListNav-folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='NoteListNav-num-notes'>
                                {countNotesForFolder(notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>
                  )}
            </ul>
            <div className='NoteListNav-button'>
                <button 
                    tag={Link}
                    to='add/folder'
                    type='button'
                >
                    Add Folder
                </button>
            </div>
        </div>
    )
  }
}