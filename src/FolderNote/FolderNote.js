import React from 'react'
import './FolderNote.css'
import ApiContext from '../ApiContext'
import {findNote, findFolder} from '../notes-helpers'

class FolderNote extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }

  static contextType = ApiContext

  render () {
    const {folders, notes} = this.context
    const {noteId} = this.props.match.params

    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)

    return (
      <div className='Folder_note'>
        <div className='Folder_back_btn'>
          <button onClick={() => this.props.history.goBack()}>
            Go Back
          </button>
        </div>
        {folder && (
          <h3>{folder.name}</h3>
        )}
      </div>
    )
  }
}


export default FolderNote
