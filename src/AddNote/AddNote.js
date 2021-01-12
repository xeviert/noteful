import React from "react";
import ApiContext from "../ApiContext";
import ValidateError from "../ValidateError";
import PropTypes from "prop-types";
import './AddNote.css';

export default class AddNote extends React.Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
    }

    static contextType = ApiContext;

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            title: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
          }
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
          .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
          })
          .catch(error => {
            console.error({ error })
          })
    }

        // handleAddNote = (e) => {
    //     e.preventDefault();

    //     // const { touched, ...rest } = this.state
    //     // let newNote = JSON.stringify(rest);
    //     const noteName = this.state.noteName.value;
    //     const content = this.state.content.value;
    //     const folderId = e.currentTarget.querySelector('select').value;
    //     const modified = new Date();
    //     // 
    //     const obj = {
    //         name: noteName,
    //         content,
    //         folderId,
    //         modified,
    //     }

    //     const newNote = JSON.stringify(obj);

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: newNote
    //     }

    //     fetch('http://localhost:9090/notes', options)
    //         .then(res => res.json())
    //         .then((data) => { 
    //             this.context.handleAddNote(data);
    //             this.props.history.push('/'); 
    //         })
    // }

    render() {
        const { folders=[] } = this.context;

        return (
            <section className='AddNote'>
            <h2>Create a note</h2>
            <NotefulForm onSubmit={this.handleSubmit}>
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

    
    // handleNoteName = (noteName) => {
    //     this.setState({
    //       noteName: {
    //         value: noteName,
    //         touched: true,
    //       }
    //     })
    // }

    // handleNoteDescription = (content) => {
    //     this.setState({
    //         content: {
    //             value: content,
    //             touched: true,
    //         }
    //     });
    // }

    // handleAddNote = (e) => {
    //     e.preventDefault();

    //     // const { touched, ...rest } = this.state
    //     // let newNote = JSON.stringify(rest);
    //     const noteName = this.state.noteName.value;
    //     const content = this.state.content.value;
    //     const folderId = e.currentTarget.querySelector('select').value;
    //     const modified = new Date();
    //     // 
    //     const obj = {
    //         name: noteName,
    //         content,
    //         folderId,
    //         modified,
    //     }

    //     const newNote = JSON.stringify(obj);

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: newNote
    //     }

    //     fetch('http://localhost:9090/notes', options)
    //         .then(res => res.json())
    //         .then((data) => { 
    //             this.context.handleAddNote(data);
    //             this.props.history.push('/'); 
    //         })
    // }

    // folderChoice = () => {
    //     const { folders } = this.context;

    //     return folders.map((folder) => (
    //         <option key={folder.id} name={folder.id} value={folder.id}>
    //             {folder.name}
    //         </option>
    //     ))
    // }

    // validateNoteName = () => {
    //     const noteName = this.state.noteName.value.trim();

    //     if (noteName.length === 0) {
    //         return 'Enter note name';
    //     } else if (noteName.length < 3) {
    //         return 'Name must be at least 3 characters long';
    //     }
    // }

    // validateDescription() {
    //     const content = this.state.content.value.trim();
    //     if (content.length === 0) {
    //         return "Notes need content!";
    //     } 
    // }


}