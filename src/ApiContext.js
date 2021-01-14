import React from 'react'

export default React.createContext({
  handleDeleteNote: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {},
  folders: [],
  notes: []
})

