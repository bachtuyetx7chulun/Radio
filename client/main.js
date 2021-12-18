/* eslint-disable no-undef */
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
const socket = io('http://localhost:3000/booking')

window.addEventListener('load', () => {
  socket.on('connect', () => {
    const client = document.getElementById('client')
    client.innerHTML = `Your id: ${socket.id}`
    socket.emit('clients')
  })

  socket.on('clients', function (data) {
    const online = document.getElementById('online')
    const initial = { online: data }
    anime({
      targets: initial,
      online: data,
      easing: 'linear',
      round: 1,
      update: function () {
        online.innerHTML = `Current online: ${initial.online}`
      },
    })

    // online.innerHTML = `Currren client online: ${data}`
  })

  socket.on('exception', function (data) {
    console.log('event', data)
  })
  socket.on('disconnect', function () {
    console.log('Disconnected')
  })
})
