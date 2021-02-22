import React, { Component } from 'react'
import CircleButton from '../CircleButton/CircleButton'
import config from '../config'
import '../AddNote/AddNote.css'
import ApiContext from '../ApiContext'


class AddNote extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: {
                value: ''
            },
            content: {
                value: ''
            },
            folder: {
                value: ''
            }
        }
    }
    
    static contextType = ApiContext
    
    updateName(name) {
        this.setState({
            name: {
                value: name
            }
        })
    }
    updateContent(content) {
        this.setState({
            content: {
                value: content
            }
        })
    }
    updateFolder(folder) {
        this.setState({
            folder: {
                value: folder            
            }
        })
    }


    static defaultProps = {
        history: {
          goBack: () => { }
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const name = this.state.name.value
        const content = this.state.content.value
        const folder = this.state.folder.value
        

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: `${name}`,
                content: `${content}`,
                folderId: `${folder}`
            })
        }

        fetch(`${config.API_ENDPOINT}/notes/`, requestOptions) 
            .then(res => {
                if (!res.ok) 
                    return res.json().then(e => Promise.reject(e))
                    return res.json()
                    
            })
            .then(() => {
                this.props.history.goBack()
                this.context.fetchNotes()
            })
            .catch(error => {
                console.log('Error:', error)
            })
        }
    

    render(){
        const { folders=[] } = this.context
        return (
            <div>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'
                >
                    Back
                </CircleButton>

                <form className='add_note_form' onSubmit={e => this.handleSubmit(e)}>
                    <legend>Create A Note</legend>
                    
                    <br />
                    
                    <label>Note Name:</label>

                    <br />

                    <input 
                        type='text'
                        name='name'
                        id='name'
                        className='add_note'
                        onChange={e => this.updateName(e.target.value)}
                        required
                    >
                    </input>

                    <br />

                    <label>Content:</label>
                    
                    <br />
                    
                    <textarea
                        type='text'
                        name='content'
                        id='content'
                        className="add_note"
                        onChange={e => this.updateContent(e.target.value)}
                        required
                    >
                    </textarea>

                    <br />

                    <label>Select A Folder</label>
                    <br />
                    <select
                        id='folder'
                        name='folder'
                        onChange={ e => this.updateFolder(e.target.value)}
                        
                    >
                        <option className='select_folder' value={null}>Select one...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>
                            {folder.name}
                            </option>
                        )}
                        
                    </select>

                    <br />

                    <button type='submit' className='add_note_btn'>Add Note</button>
                </form>
            </div>
            
        )
    }
}
AddNote.defaultProps = {
    folders: []
  }

export default AddNote