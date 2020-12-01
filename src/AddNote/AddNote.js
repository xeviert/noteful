import React from "react";
import ApiContext from "../ApiContext";
import ValidateError from "../ValidateError";
import PropTypes from "prop-types";
import './AddNote.css';

export default class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
          noteName: {
            value: "",
            touched: false,
          },
          content: {
            value: "",
            touched: false,
          },
          folderId: " ",
        }
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    handleNoteName = (noteName) => {
        this.setState({
          noteName: {
            value: noteName,
            touched: true,
          }
        })
    }

    handleNoteDescription = (content) => {
        this.setState({
            content: {
                value: content,
                touched: true,
            }
        });
    }

    handleAddNote = (e) => {
        e.preventDefault();

        const { touched, ...rest } = this.state
        let newNote = JSON.stringify(rest);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: newNote
        }

        fetch('http://localhost:9090/notes', options)
            .then(res => res.json())
            .then((data) => { this.context.handleAddNote(data) })
            .then(() => this.props.history.push('/'))
            .catch(error => this.context.updateError(error.message));
    }

    folderChoice = () => {
        const { folders } = this.context;

        return folders.map((folder) => (
            <option key={folder.id} name={folder.id} value={folder.id}>
                {folder.name}
            </option>
        ))
    }

    validateNoteName = () => {
        const noteName = this.state.noteName.value.trim();

        if (noteName.length === 0) {
            return 'Enter note name';
        } else if (noteName.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    validateDescription() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Notes need content!";
        } 
    }

    render() {
        const nameError = this.validateNoteName();
        const descriptionError = this.validateDescription();

        return (

            <form 
            className='add-note'
            onSubmit={(e) => this.handleAddNote(e)}
            >
                <h2>Add Note</h2>

                <p>Note Name:</p>
                <label htmlFor='note-name' className='note-name'>
                    {this.state.noteName.touched && (
                    <ValidateError message={nameError} />
                    )}
                </label>
                <input
                 type='text'
                 className='note-name'
                 onChange={(e) => this.handleNoteName(e.target.value)}
                 required
                 />
                            
                <p>Note Description:</p>
                <label htmlFor="note-name" className="note-name">
                    {this.state.noteName.touched && (
                        <ValidateError message={descriptionError} />
                    )}
                </label>
                <input
                    className='note-description'
                    type='text'
                    onChange={(e) => this.handleNoteDescription(e.target.value)}
                    required
                />

                <p>Select Folder:</p>
                <select className='select-folder'>
                    {this.folderChoice()}
                </select>

                <button type='submit'>Submit</button>
            </form>
        )

    }

}