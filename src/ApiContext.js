import React from 'react'

const ApiContext = React.createContext({
  handleDelete: () => {},
  updateMessage: () => {},
  clearMessage: () => {},
  updateError: () => {},
  handleAddFolder: () => {},
  handleNoteFolder: () => {},
  "folders": [],
  "notes": []
})

export default ApiContext