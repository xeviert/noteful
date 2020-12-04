import React from "react";
import ApiContext from '../ApiContext';
import ValidateError from '../ValidateError';
import config from '../config';
import PropTypes from 'prop-types';

import '../AddFolder/AddFolder.css';


export default class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folderName: {
            value: '',
            touched: false
        }
      }
    }

    static contextType = ApiContext;

    updateFolder = (foldername) => {
        this.setState({
            folderName: {
                value: foldername,
                touched: true
            }
        })
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    handleAddFolder = (e) => {
        e.preventDefault();

        const foldername = this.state.folderName.value;

        fetch(`${config.API_ENDPOINT}/folders`, {
            
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({ name: foldername }),
        })
            .then(res => res.json())
            .then((data) => { 
                this.context.handleAddFolder(data);
                this.props.history.push('/');
             })
            .catch((error) => console.error('errorrrrr', error))
    }

    validateFolderName = () => {
        const folderName = this.state.folderName.value.trim();

        if (folderName.length === 0) {
            return 'Folders must have names';
          } else if (folderName.length < 3) {
            return "Name must be at least 3 characters long";
          } 
    }

    render() {
        const nameError = this.validateFolderName();

        return (

            <form
                className='add-folder'
                onSubmit={(e) => this.handleAddFolder(e)}
            >
                <h2>Add Folder</h2>
                
                <input className='folder-name' type='text' name='folder-name' id='folder-name'
                onChange={(e) => this.updateFolder(e.target.value)}
                required>
                </input>

                <label htmlFor='name' className='notice'>
                {this.state.folderName.touched && (
                    <ValidateError message={nameError} />
                )}
                </label>

                <button type='submit' className='add-folder'
                disabled={this.validateFolderName()}>
                    Submit
                </button>

            </form>
        )
    }

}