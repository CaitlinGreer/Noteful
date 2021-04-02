import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import CircleButton from '../CircleButton/CircleButton'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types'
import '../AddFolder/AddFolder.css'

class AddFolder extends Component {
    constructor (props) {
      super(props)
      this.state = {
        name: {
          value: ''
        }
      }
    }
  
    static contextType = ApiContext
  
    // onChange 
  
    updateName (name) {
      this.setState({
        name: {
          value: name
        }
      })
    }
  
    // validation for Form
  
    validateName () {
      const name = this.state.name.value.trim()
      if (name.length === 0) {
        return 'Name is required'
      } else if (name.length < 3) {
        return 'Name must be at least 3 characters long'
      }
    }
  

  
    handleSubmit (event) {
      event.preventDefault()
      const query = this.state.name.value
  
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          folder_name: `${query}`
        })
      }
  
      fetch(`${config.API_ENDPOINT}/folders/`, requestOptions)
        .then(res => {
          if (!res.ok) {
            throw new Error('Something went wrong! Try again later.')
          }
          return res.json()
        })
        .then(() => {
          this.props.history.goBack()
          this.context.fetchNotes()
        })
        .catch(error => {
          console.log('Error: ', error)
        })
    }
  


    render(){
        return (
            <div className='Add_folder'>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__back-button'
                >
                    Back
                </CircleButton>
                
                <form className="add_folder_form" onSubmit={e => this.handleSubmit(e)}>
                    <legend className='add_folder_legend'>Create New Folder</legend>
                        <label className='add_folder_label'>Name:</label>
                        <input 
                            type="text"
                            name="folder-name"
                            id="name"
                            className="add_folder_text"
                            onChange={e => this.updateName(e.target.value)}
                            required
                        >

                        </input>
                        <ValidationError message={this.validateName()} />
                        <button 
                            className="add_folder_button"
                            type='submit'
                        >
                            Add Folder
                        </button>
                    
                </form>
            </div>
        )
    }
}

AddFolder.propTypes = {
    value: PropTypes.object
}


export default AddFolder