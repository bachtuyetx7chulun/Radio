import ListTrack from '@components/List'
import SOCKET from '@contexts/socket.context'
import { CssBaseline } from '@nextui-org/react'
import React, { FC, ReactElement, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from '@styles/App.module.scss'
import SearchBox from '@components/Search'

const App: FC = (): ReactElement => {
  const socket = io('http://localhost:3000/booking')

  useEffect(() => {
    socket.on('clients', (data: number) => {
      // const client = document.getElementById('client') as HTMLElement
      // client.innerHTML = `${data}`
    })
    return () => {
      socket.close()
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <SOCKET.Provider value={socket}>
        <div className={styles.App}>
          {/* <SideBar /> */}
          <div className={styles.Main}>main</div>
          <SearchBox />
          <ListTrack />
        </div>
      </SOCKET.Provider>
    </>
  )
}

export default App
