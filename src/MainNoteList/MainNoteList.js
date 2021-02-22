import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import ApiContext from '../ApiContext'
import {getNotesForFolder} from '../notes-helpers'
import config from '../config'
import './MainNoteList.css'

class MainNoteList extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext

  deleteNoteRequest = (noteId) => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.context.fetchNotes()
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    const {notes = []} = this.context
    const {folderId} = this.props.match.params

    const folderNotes = getNotesForFolder(notes, folderId)

    return (
      <ApiContext.Consumer>
        {(context) => (
          <section className='main_note_list'>
            <ul>
              {folderNotes.map(note =>
                <li key={note.id} className='main_list_item'>
                  <Link to={`/note/${note.id}`}>
                    <h3>{note.name}</h3>
                    <Moment format='MMM D YYYY'>{note.modified}</Moment>
                  </Link>
                  <div className='main_list_delete'>
                    <button className='main_list_delete_btn' onClick={() => {
                      this.deleteNoteRequest(
                        note.id,
                        context.deleteNote
                      )
                    }}>
                      Delete
                    </button>
                  </div>
                </li>
              )}
            </ul>
            <div className='add_note'>
              <Link to='/add-note'>
                <button className="add_note_btn">
                  Add Note
                </button>
              </Link>
            </div>
          </section>
        )}
      </ApiContext.Consumer>
    )
  }
}



export default MainNoteList