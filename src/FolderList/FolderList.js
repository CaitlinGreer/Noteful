import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import ApiContext from '../ApiContext'
import {countNotesForFolder} from '../notes-helpers'

import './FolderList.css'

class FolderList extends React.Component {
  static contextType = ApiContext

  render () {
    const {folders = [], notes = []} = this.context

    return (
      <div className='folder_list'>
        <ul>
          {folders.map(folder =>
            <li key={folder.id} className='folder_list_item'>
              <NavLink to={`/folder/${folder.id}`}>
                {folder.folder_name}
                <span className='note_count'>{countNotesForFolder(notes, folder.id)}</span>
              </NavLink>
            </li>
          )}
        </ul>
        <div className='add_folder'>
          <Link to={'/add-folder'}>
            <button className="add_folder_btn">
              Add Folder 
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default FolderList