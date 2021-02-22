import React from 'react'
import Moment from 'react-moment'
import ApiContext from '../ApiContext'
import {findNote} from '../notes-helpers'
import PropTypes from 'prop-types'
import config from '../config'
import './MainNote.css'

class MainNote extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goBack: () => { }
    }
  }

  static contextType = ApiContext

  
  render () {
    const {notes = []} = this.context
    const {noteId} = this.props.match.params

    const note = findNote(notes, noteId || {content: ''})

    return (
      <section className='main_note'>
        <div>
          <h3>{note.name}</h3>
          <Moment format='MMM D YYYY'>{note.modified}</Moment>
          <p>{note.content}</p>
        </div>
      </section>
    )
  }
}

MainNote.propTypes = {
  match: PropTypes.object
}


export default MainNote