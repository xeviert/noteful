import React, { Component } from "react";
import ApiContext from "../ApiContext";
import NotefulForm from '../NotefulForm/NotefulForm'
import config from '../config'
import './AddNote.css';

export default class AddNote extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
    }

    static contextType = ApiContext;

    handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            title: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
          }
          console.log(newNote)
          fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
          })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then((note) => {
            this.context.handleAddNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
          })
          .catch(error => {
            console.error({ error })
          })
    }


    render() {
      
        const { folders=[] } = this.context;
      console.log(folders)
        return (
            <section className='AddNote'>
            <h2>Create a note</h2>
            <NotefulForm onSubmit={(e) => this.handleSubmit(e)}>
              <div className='field'>
                <label htmlFor='note-name-input'>
                  Name
                </label>
                <input type='text' id='note-name-input' name='note-name' />
              </div>
              <div className='field'>
                <label htmlFor='note-content-input'>
                  Content
                </label>
                <textarea id='note-content-input' name='note-content' />
              </div>
              <div className='field'>
                <label htmlFor='note-folder-select'>
                  Folder
                </label>
                <select id='note-folder-select' name='note-folder-id'>
                  <option value={null}>...</option>
                  {folders.map(folder =>
                    <option key={folder.id} value={folder.id}>
                      {folder.title}
                    </option>
                  )}
                </select>
              </div>
              <div className='buttons'>
                <button type='submit'>
                  Add note
                </button>
              </div>
            </NotefulForm>
          </section>
        )

    }

}