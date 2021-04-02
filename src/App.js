import React from 'react'
import {Route, Link} from 'react-router-dom'
import MainNoteList from './MainNoteList/MainNoteList' // list of all notes
import FolderList from './FolderList/FolderList' // list of all folders
import MainNote from './MainNote/MainNote' // single note selected
import FolderNote from './FolderNote/FolderNote' // when single note selected
import AddFolder from './AddFolder/AddFolder' // Add Folder Page
import AddNote from './AddNote/AddNote' // Add Note Page
import NotesError from './NotesError/NotesError' //Notes Error Boundaries
import FolderError from './FolderError/FolderError' //Folder Error Boundaries
import ApiContext from './ApiContext'
import config from './config'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount () {
    this.fetchAllData()
  }

  fetchAllData = () => {
    Promise.all([
      this.fetchFolders(),
      this.fetchNotes()
    ])
      .then(([folders, notes]) => {
        this.setState({
          folders,
          notes
        })
      })
      .catch(error => {
        this.setState({error})
      })
  }

  fetchFolders = () => {
    return fetch(`${config.API_ENDPOINT}/folders`)
      .then(res => res.json())
  }

  fetchNotes = () => {
    return fetch(`${config.API_ENDPOINT}/notes`)
      .then(res => res.json())
  }

  renderFolderRoutes () {
    return (
      <FolderError>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={FolderList}
          />
        ))}
        <Route path='/note/:noteId' component={FolderNote}/>
        </FolderError>
    )
  }

  renderNoteRoutes () {
    return (
      <NotesError>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={MainNoteList}
          />
        ))}
        <Route path='/note/:noteId' component={MainNote}/>
        <Route path='/add-note' component={AddNote}/>
        <Route path='/add-folder' component={AddFolder}/>
      </NotesError>
    )
  }

  render () {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      fetchNotes: this.fetchAllData
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <header className="App_header">
            <Link to='/'><h1>Noteful</h1></Link>
          </header>
          <div className='App_sections'>
            <nav className='App_nav'>
              {this.renderFolderRoutes()}
            </nav>
            <main className='App_main'>
              {this.renderNoteRoutes()}
            </main>
          </div>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App