import { io, Socket } from 'socket.io-client'

const socketConnected = (url: string): Socket => {
  const socket = io(url)
  socket.on('connect_error', (err) => {
    return err
  })

  return socket
}

export { socketConnected }
