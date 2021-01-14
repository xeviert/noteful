import React from "react";
import ApiContext from '../ApiContext';
import config from '../config';
import NotefulForm from '../NotefulForm/NotefulForm'

import '../AddFolder/AddFolder.css';


export default class AddFolder extends React.Component {
    
    static defaultProps = {
        history: {
            push: () => {}
        }
      }
    

    static contextType = ApiContext;

    handleAddFolder = (e) => {
        e.preventDefault();

        const folder = {title: e.target['folder-name'].value}

        fetch(`${config.API_ENDPOINT}/folders`, {
            
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(folder),
        })
            .then(res => res.json())
            .then((data) => { 
                this.context.handleAddFolder(data);
                this.props.history.push(`/folders/${folder.id}`);
             })
            .catch((error) => console.error('errorrrrr', error))
    }

    render() {

        return (
            <section className='AddFolder'>
            <h2>Add folder</h2>
            <NotefulForm onSubmit={this.handleAddFolder}>
              <div className='field'>
                <label htmlFor='folder-name-input'>
                  Name
                </label>
                <input type='text' id='folder-name-input' title='folder-name' />
              </div>
              <div className='buttons'>
                <button type='submit'>
                  Add folder
                </button>
              </div>
            </NotefulForm>
          </section>
        )
    }

}