import React from 'react'

const ApiContext = React.createContext({
  handleDeleteNote: () => {},
  updateMessage: () => {},
  clearMessage: () => {},
  updateError: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {},
  folders: [],
  notes: []
})

export default ApiContext