import React from 'react'
const CONTEXT = React.createContext<any>({
  socket: null,
  videos: null,
  setVideo: () => {},
})

export default CONTEXT
